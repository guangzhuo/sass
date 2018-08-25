<template>
  <div class="manage-template_my">
    <sas-breadcrumb class="thatPage">
      <sas-breadcrumb-item>合同模板</sas-breadcrumb-item>
      <sas-breadcrumb-item>我的模板</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class='row templateHeader'>
      <div class="topNewsContain">
        <div class="paddLr">
          <span class="blueClum">
          我的模板列表
        </span>
          <lvx-upload
            class="uploadContainer"
            :action="UploadAjax"
            :show-file-list="false"
            :data="fileData"
            :before-upload="beforeUpload"
            :on-success="onSuccessFile"
          >
            <sas-button class="newsBtn" type="primary" icon="lvx-icon-circle-plus" size="mini">新增模板</sas-button>
          </lvx-upload>

        </div>
      </div>
      <div class="bottomSerachContainer">
        <div class="SerachRight">
          <div class="inlineBock">
            <searchInput v-model="searchValue" placeholder="请输入合同模板名称" @after-search="defaultSerch"/>
          </div>
        </div>
      </div>
    </div>

    <div class="row templateHeader templateEmpty">
      <div class="MainBg">
        <exhibition
          :items="item"
          :indexs="index"
          v-for="(item,index) in sysData"
          :key="index"
          @removeDialog ='showRemoveDialog'></exhibition>

        <div class="CentNoContract" v-if="sysData.length === 0">
          <img src="~assets/img/src/template/noContract.png" alt="">
          <span class="noContractFt">暂无模板</span>
        </div>
      </div>
    </div>
    <div class="rightBlock">
      <sas-pagination class="rightPagin"
                      :total="total"
                      v-if="total > 15"
                      :pageSize="15"
                      @current-change="pageChange">
      </sas-pagination>
    </div>
    <sas-dialog
      :show.sync="centerDialogVisible"
      :title="dialogTitle"
      width="30%">
      <div class="dialogWrap">
        <div class="infoFt">{{dialogMain}}</div>
        <sas-button class="dialogBtn" type="primary" @click="hideBtn">确定</sas-button>
      </div>

    </sas-dialog>

    <!--删除dialog-->
    <sas-confirm title="删除" smallTitle="你确定要删除该模板吗？" :isShow.sync="removeDialogVisible" @enSure="removeBtn"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  import searchInput from '~/components/common/search-input'
  import exhibition from '~/components/sysTemplate/exhibition_list'
  let loading = null
  export default {
    name: 'manage-template_my',
    layout: 'manager',
    extends: base,
    metaInfo: {
      title: '我的模板—云合同'
    },
    data () {
      return {
        searchValue:'',
        total:0,
        sysData:[],
        UploadAjax:apis.setUpload, //文件上传地址
        fileData: {
          'token': 'lvxuntoken',
          'meta': 'true',
          'mode': 'private'
        }, //文件参数
        currentPage: 0, //当前页 -1
        oneClick: false, //防止多次点击
        centerDialogVisible:false,
        dialogTitle:"",
        dialogMain:'',
        removeDialogVisible:false,
        removedialogTitle:'删除',
        removedialogMain:'你确定要删除该模板吗？',
        fileId:'' //删除时对应的id
      }
    },
    computed: {
      ...mapState({
      })
    },
    watch: {
    },
    created () {
      this.defaultSerch()
    },
    mounted () {
    },
    methods: {
      //初始查询数据
      async defaultSerch () {
        const dataList = await this.$axios.get(apis.getMyTemplate, {
          params: {
            order:'asc',
            limit:15,
            offset:this.currentPage * 15,
            isMySelf:0,
            search: this.searchValue,
          }
        }).then( (data) => {
          this.sysData = data.data.data.rows;
          this.total = data.data.data.total
        })
      },
      beforeUpload (file) {
        let d = file.name.lastIndexOf("\.");
        let upFileSuffixes = ".doc .docx";
        let fileSize = file.size == 0 ? true : false
        let fileBigSize = file.size > 1024 * 1024 * 10 ? true : false
        let fileSub = file.name.substr(0, d).length > 64 ? true : false
        let fileSuff = (d < 0 || upFileSuffixes.indexOf(file.name.substr(d)) < 0) ? true : false
        //空文件
        if (fileSize) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '不能上传空文件'
          });
          return false
        }
        //大于10兆文件
        if (fileBigSize) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '上传文件大小不能大于10M，请重新选择文件。'
          });
          return false
        }
        //文件名称字节大于64位
        if (fileSub) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '文件名称不能超过64个字符，请修改文件名称后重新上传！'
          });
          return false
        }
        //是否为world文档
        if (fileSuff) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '不支持的文件格式，请上传.doc或.docx类型的文档。'
          });
          return false
        }
        loading = this.$createLoading({
          spinnerText: '正在上传文件，请稍等'
        })
        this.defaultSerch()
      },
      //上传成功后文件
      async onSuccessFile (response, file, fileList) {
        let data = {
          uuid: response.uuid,
          fileName: response.name,
          dataSize: Number(response.size)
        }
      await this.$axios.post( apis.setFile, data )
        .then((data) => {
          loading.close()
          if (data.data.code == 200 || data.data.code == 1) {
            const message = this.$createMessage({
              type:'success',
              duration:3000,
              spinnerText:'上传成功'
            })
            this.defaultSerch()
          } else {
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'上传失败'
            })
          }
        })
        .catch((error) => {
          loading.close()
          console.log(error)
          const message = this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:"上传失败！错误原因" + error.error
          })
        })
      },
      hideBtn () {
        this.enterDialogVisible = false;
      },
      pageChange (current) {
        this.currentPage = current - 1
        this.defaultSerch()
      },

      /***删除操作***/
      showRemoveDialog(item) {
        this.removeDialogVisible = true
        this.fileId = item.id
      },
     async removeBtn() {
        loading = this.$createLoading({
          spinnerText: '正在删除文件，请稍等'
        })
        if(this.oneClick) return false
        this.oneClick = true
        let data = {
          id: this.fileId
        }
       await this.$axios.post(apis.removeFile,data)
          .then( (data) => {
            let code = data.data.code
            if( code === 200 ) {
              loading.close()
              this.removeDialogVisible = false
              const message = this.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:"删除成功"
              })
              this.defaultSerch();
              this.oneClick = false
            } else {
              this.oneClick = false
              this.removeDialogVisible = false
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:data.data.result
              })
            }
          })
          .catch( (error)=>{
            this.oneClick = false
            this.removeDialogVisible = false
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'删除失败，错误！'
            })
          })
      },
      hideDialog() {
        this.removeDialogVisible = false
      }
      /***删除操作***/
    },
    components: {
      exhibition,
      searchInput
    }
  }
</script>

<style lang="scss"  scoped >
  .manage-template_my{
    min-width:1000px;
    height: 100%;
    margin:0 auto;
  }
  .thatPage{
    color:#4081ff;
    padding-bottom: 15px;
    display: inline-block;
  }

  .templateHeader{
    width:100%;
    border:1px solid #c1c1c1;
    background:#fff;
    margin-bottom: 8px;
    .topNewsContain{
      height:50px;
      line-height: 50px;
      border-bottom: 1px solid #c1c1c1;
      .paddLr{
        padding:0 7px;
        .blueClum{
          padding:0 20px 0 9px;
          font-size: 16px;
          border-left: 4px solid #4081ff;

        }
        .newsBtn{
          padding:6px 8px;
          font-size: 13px;
        }
      }
      .uploadContainer{
        display:inline-block;
      }
    }
    .bottomSerachContainer{
      padding:10px 0;
      .SerachRight{
        width:97%;
        text-align: right;
        .inlineBock{
          display: inline-block;
          vertical-align: middle;
        }
        .iptSerach{
          width:60%;
        }
        .searchBtn{
          width:100px;
        }
      }
    }
  }
  .templateEmpty{min-height: calc(100% - 190px)}
  .MainBg{
    padding:20px 18px;
    /*width:1200px;*/
    margin:0 auto;
    .CentNoContract{
      text-align: center;
      .noContractFt{
        font-size: 14px;
        display: block;
        padding-top:12px;
      }
    }
  }
  @media(max-width: 1366px){
    .thatPage{
      padding-bottom: 10px;
    }
    .templateHeader{
      .topNewsContain {
        height: 40px;
        line-height: 40px;
      }
      .bottomSerachContainer{
        padding:3px 6px;
        height:47px;
      }
    }
    .MainBg{padding:10px 18px 0;}
  }
  .rightBlock{
    text-align: right;
  }
  .rightPagin{
    &:after{
      content:'';
      display:block;
      clear: both;
    }
  }

  .dialogWrap{
    padding:20px 0px;
    .infoFt{
      padding:20px 6px;
      word-break: break-all;
      text-align: center;
      font-size: 16px;
    }
    .dialogBtn{
      width:84%;
      margin: 0 auto;
      display: block;
    }
  }
  .infoFt{
    padding:20px 6px;
    word-break: break-all;
    text-align: center;
    font-size: 16px;
  }
  .dialogRemoveWrap{
    padding:0px 6px 6px 6px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .dialogRemoveBtn{
      width: 50%;
    }

  }
</style>
