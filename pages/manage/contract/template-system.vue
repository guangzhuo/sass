<template>
  <div class="manage-template_my">
    <sas-breadcrumb class="thatPage">
      <sas-breadcrumb-item>合同模板</sas-breadcrumb-item>
      <sas-breadcrumb-item>系统模板</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class='templateHeader'>
      <div class="topNewsContain">
        <div class="paddLr">
          <span class="blueClum">
            系统模板列表
          </span>
        </div>
      </div>
      <div class="bottomSerachContainer">
        <div class="SerachLeft">
          <span class="casFt">模板分类：</span>
          <lvx-cascader
            placeholder="全部"
            expand-trigger="hover"
            :options="options"
            :show-all-levels="false"
            :change-on-select="false"
            v-model="selectedOptions2"
            @change="handleChange"
            ref="cascad"
          >
          </lvx-cascader>
        </div>
        <div class="SerachRight">
         <!-- <lvx-input v-xss class="iptSerach" v-model="searchValue" placeholder="请输入合同模板名称"></lvx-input>
          <sas-button class="searchBtn" type="primary" @click="defaultSerch">搜索</sas-button>-->
          <div class="inlineBock">
            <searchInput v-model="searchValue"  placeholder="请输入合同模板名称" @after-search="defaultSerch"/>
          </div>

        </div>
      </div>
    </div>

    <div class="templateHeader templateEmpty">
      <div class="MainBg">
        <exhibition
          :items="item"
          :indexs="index"
          v-for="(item,index) in sysData"
          :key="index"
          ifreMove="hide"></exhibition>
        <div class="CentNoContract" v-if="sysData.length === 0">
          <img src="~assets/img/src/template/noContract.png" alt="">
          <span class="noContractFt">暂无模板</span>
        </div>
      </div>
    </div>
    <div class="rightBlock" v-show="total>15">
      <sas-pagination class="rightPagin" :pageSize="15" :total="total" @current-change="pageChange"></sas-pagination>
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
      title: '系统模板—云合同'
    },
    data () {
      return {
        searchValue:'',
        options:[
          {
            value: 1,
            label: '全部'
          },
          {
            value: 2,
            label: '劳动合同'
          },
          {
            value: 3,
            label: '买卖合同'
          },
          {
            value: 4,
            label: '借贷抵押'
          },
          {
            value: 5,
            label: '租赁合同'
          },
          {
            value: 6,
            label: '服务合同'
          },
          {
            value: 7,
            label: '委托合同'
          },
          {
            value: 8,
            label: '加工承揽'
          },
          {
            value: 9,
            label: '知识产权'
          },
          {
            value: 10,
            label: '技术合同'
          },
          {
            value: 11,
            label: '广告合同'
          },
          {
            value: 12,
            label: '运输合同'
          },
          {
            value: 13,
            label: '居间行纪'
          },
          {
            value: 14,
            label: '赠与合同'
          },
          {
            value: 15,
            label: '公司管理'
          },
          {
            value: 16,
            label: '婚姻家庭'
          },
          {
            value: 17,
            label: '旅游合同'
          },
          {
            value: 18,
            label: '担保合同'
          },
          {
            value: 19,
            label: '债券融资'
          }
        ],
        selectedOptions2:[],
        total:0,
        sysData:[],
        centerDialogVisible:false,
        dialogTitle:"",
        dialogMain:'',
        currentPage: 0, //当前页 -1
        isMySelf: 1
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
            isMySelf: this.isMySelf,
            search: this.searchValue,
          }
        }).then( (data) => {
          this.sysData = data.data.data.rows;
          this.total = data.data.data.total
        })
      },
      //上传成功后文件
      hideBtn () {
        this.centerDialogVisible = false;
      },
      pageChange (current) {
        this.currentPage = current - 1
        this.defaultSerch()
      },
      handleChange(val) {
        this.isMySelf = Number.isFinite( val[0] ) ?  val[0]: val[1]
        this.searchValue = ''
        this.defaultSerch()
      }
    },
    components: {
      exhibition,
      searchInput
    }
  }
</script>

<style lang="scss"  scoped >
  .manage-template_my{
    height: 100%;
    min-width:1000px;
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
        padding:0px 7px;
        .blueClum{
          padding:0px 20px 0px 9px;
          font-size: 16px;
          border-left: 4px solid #4081ff;

        }
        .newsBtn{
          padding:6px 8px;
          font-size: 13px;
        }
      }
    }
    .bottomSerachContainer{
      padding:6px;
      height:52px;
      .SerachLeft{
        width:50%;
        display: inline-block;
        vertical-align: middle;
      }
      .SerachRight{
        width:47%;
        /*float: right;*/
        vertical-align: middle;
        text-align: right;
        display: inline-block;
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

</style>
<style lang="scss">
  .SerachLeft{
  }
</style>
