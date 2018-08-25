<template>
  <div class="manage-contract-task-manage">
    <sas-breadcrumb separator=">">
      <sas-breadcrumb-item>合同管理</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ name: 'manage-contract-contract' }">我的合同</sas-breadcrumb-item>
      <sas-breadcrumb-item>提醒列表</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="container-content-bg-w">
      <div class="container-content-white">
        <section class="contract-table">
          <lvx-table
            :data="tastlist.listMap"
            style="width: 100%"
            header-row-class-name="con-th-d"
            stripe
          >
          <template slot="empty">
            <img src="~assets/img/src/contract/noMessage.png" />
            <p class="nomessage">没有找到匹配的记录</p>
          </template>
            <lvx-table-column
              prop="title"
              label="合同标题">
            </lvx-table-column>
            <lvx-table-column
              prop="toUids"
              label="操作" width="280">
              <template slot-scope="scope">
                <lvx-button @click="handleClick(scope.row.id)" type="text" size="small">设置提醒</lvx-button>
              </template>
            </lvx-table-column>
            <lvx-table-column
              label="合同状态" width="200">
              <template slot-scope="scope">
                已完成<lvx-button type="text" size="small">{{scope.row.noticed}}</lvx-button>/{{scope.row.totalNotice}}
              </template>
            </lvx-table-column>
          </lvx-table>
        </section>
        <footer class="page-position" v-if="tastlist.total > pageSize">
          <sas-pagination :total="tastlist.total" :currentPage="currentPage" :pageSize="pageSize" @current-change="pageChange"></sas-pagination>
        </footer>
      </div>
    </div>
    <div>
      <sas-dialog-remind :show.sync="SetNoticeVisible" :cid.sync="tempcid" @after-close="closeNoticeDialog"></sas-dialog-remind>
      <!-- <sas-dialog
        :show.sync="SetNoticeVisible"
        title="提醒列表"
        width="700px"
        @close="closeNoticeDialog">
      
        <div class="auth-view-alert-w">
          <table>
            <thead style="background: #f9fcfe;height:52px;">
            <tr style="color: #131313;font-size: 16px;">
            <th style="width: 258px; text-indent: 25px;line-height: 40px;">提醒信息</th>
            <th style="width: 180px;text-align: center">推送时间</th>
            <th style="width: 100px;text-align: center">状态</th>
            </tr>
            </thead>
            <tbody style="line-height: 100px; text-align: left;">
              <tr v-for="(item, index) in msglist" :key="index" style="line-height: 34px;font-size: 15px;color: #7a7a7a;border-top: none;border-bottom: 1px dashed #b8c6dc;">
              <td style="text-indent: 23px;" :title="item.msgTitle">{{item.msgTitle | subformat}}</td>
              <td style="text-align:center;">{{item.msgPushTime | dateFormatter}}</td>
              <td style="text-align: center;text-indent: 20px;color:#4181ff;">
                <span style="cursor:pointer" @click="deleteMsgTask(item.id)">
                  <lvx-badge is-dot v-if="item.msgStatus == 0" class="item" >删除</lvx-badge>
                  <lvx-badge is-dot v-else class="item" hidden>删除</lvx-badge>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <footer style="width:100%;text-align:center;margin:20px auto;padding-bottom:20px;">
          <sas-button category="primary" @click="createTask">创建提醒</sas-button>
          <sas-button category="primary" @click="SetNoticeVisible = false;">完成</sas-button>
        </footer>
      </sas-dialog>
      <sas-dialog
        :show.sync="createvisible"
        title="创建提醒"
        width="598px"
        class="swlogin-dialog"
        @close="createvisible = false">
      
        <div class="content">
          <lvx-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="creatform" :label-position="labelPosition">
              <lvx-form-item label="提醒信息:" prop="msgTaskTitle">
                  <lvx-input v-model="ruleForm.msgTaskTitle" placeholder="请输入提醒信息" max="70"></lvx-input>
              </lvx-form-item>
              <lvx-form-item label="推送时间:" prop="alertTime">
                  <lvx-date-picker align='left' :picker-options="pickerOptions" value-format="yyyy-MM-dd" :editable='false' v-model="ruleForm.alertTime" type="date" placeholder="请选择推送的时间"></lvx-date-picker>
              </lvx-form-item>
            </lvx-form>
        <div slot="footer" class="dialog-footer">
          <lvx-button type="primary" @click="addremind">确 定</lvx-button>
          <lvx-button type="primary" @click="createvisible = false">退 出</lvx-button>
        </div>
        </div>
      </sas-dialog> -->
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import $ from 'jquery'
  import dialogRemind from '~/components/dialog/dialog-remind'
  export default {
    name: 'manage-contract-task-manage',
    layout: 'manager',
    metaInfo: {
      title: "提醒列表—云合同",
    },
    async fetchData(to, context){
      let self = context;
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 304) / 66);
      const List = await self.$axios.get(apis.queryContractsByExistMsgTask, {
        params: {
          offset:0,
          limit:limitvalue
        }
      }).then((data) => data.data.data);

      self.$store.state.Contract.list.contracttast = {
        listMap: List.rows,
        total: List.total,
      };
    },
    data () {
      return {
        // listMap: [],
        // totalNum: 0,
        pickerOptions:{
          disabledDate(time){
            return time.getTime() < Date.now();
          }
        },
        currentPage:1,
        pageSize:8,
        SetNoticeVisible: false,
        modalContent:'',
        tempcid:'',
        createvisible: false,
        labelPosition:'right',
        msglist:[],
        ruleForm:{
          alertTime:'',
          msgTaskTitle:'',
        },
        rules: {
            msgTaskTitle: [
              { required: true, message: '请填写有效合同提醒的内容', trigger: 'blur' },
            ],
            alertTime:[
              { required: true, message: '请选择有效合同提醒时间', trigger: 'blur' },
            ],
        }
      }
    },
    computed: {
      ...mapState({
        tastlist: state => state.Contract.list.contracttast,
      })
    },
    watch: {
    },
    filters:{
      dateFormatter(time) {
        var day = new Date(time);
        var Year = 0, Month = 0, Day = 0, Hour = 0, Minutes = 0, Seconds = 0;
        var CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth() + 1;
        Day = day.getDate();
        Hour = day.getHours();
        Minutes = day.getMinutes();
        Seconds = day.getSeconds();
        CurrentDate += Year + "-";
        (Month >= 10) ? CurrentDate += Month + "-" : CurrentDate += "0" + Month + "-";
        (Day >= 10) ? CurrentDate += Day + " " : CurrentDate += "0" + Day + " ";
        CurrentDate += Hour + ":";
        (Minutes >= 10) ? CurrentDate += Minutes  : CurrentDate += "0" + Minutes;

        return CurrentDate;
      },
      subformat(val){
        if(val.length > 20){
          return val.substr(0,20)+"...";
        }else{
          return val;
        }
      },
    },
    mounted () {
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 304) / 66);
      this.pageSize = limitvalue;
      const that = this;
      // window.onresize = function(){
      //   let whiteheight = $(".container-content-white").height();
      //   if(whiteheight > 244){
      //       that.pageSize = Math.floor((whiteheight - 142) / 66);
      //   }else{
      //       that.pageSize = 1;
      //   }
      //   that.confresh();
      // }

    },
    methods: {
      /*描述：关闭设置提醒弹窗
      */
      closeNoticeDialog() {
        this.confresh();
        this.SetNoticeVisible = false;
      },
      classheader({ row, rowIndex }){
        if (rowIndex ==0) {
          return 'con-th-d'
        } else {
          return ''
        }
      },
      async handleClick(id){
        // const List = await this.$axios.get(apis.query, {
        //   params: {
        //     cid:id
        //   }
        // }).then((res) => res.data.data);
        // this.msglist = List;

        this.tempcid = id;
        this.SetNoticeVisible = true;

      },
      /*
      描述：刷新当前列表数据
      */
      async confresh(){
        const List = await this.$axios.get(apis.queryContractsByExistMsgTask, {
          params:{
            offset: (this.currentPage-1) * this.pageSize,
            limit: this.pageSize,
          }
        }).then((res)=> res.data.data);

        this.$store.state.Contract.list.contracttast = {
          listMap: List.rows,
          total: List.total,
        }
      },
      async pageChange(val){
        this.currentPage=val;
        //let clientheight = document.documentElement.clientHeight;
       // let limitvalue = Math.floor((clientheight - 304) / 66);
       // this.pageSize = limitvalue;
        let offsevalue = (this.currentPage-1) * this.pageSize;
        const List = await this.$axios.get(apis.queryContractsByExistMsgTask, {
          params: {
            offset:offsevalue,
            limit:this.pageSize,
          }
        }).then((data) => data.data.data);

        this.$store.state.Contract.list.contracttast = {
        listMap: List.rows,
        total: List.total,
      };
      },
      formatDate(time) {
        var day = new Date(time);
        var Year = 0, Month = 0, Day = 0, Hour = 0;
        var CurrentDate = "";
        //初始化时间
        Year = day.getFullYear();//ie火狐下都可以
        Month = day.getMonth() + 1;
        Day = day.getDate();
        Hour = day.getHours();
        // Minute = day.getMinutes();
        // Second = day.getSeconds();
        CurrentDate += Year + "年";
        if (Month >= 10) {
          CurrentDate += Month + "月";
        } else {
          CurrentDate += "0" + Month + "月";
        }
        if (Day >= 10) {
          CurrentDate += Day + "日 ";
        } else {
          CurrentDate += "0" + Day + "日 ";
        }
        /*        if (Hour >= 10) {
         CurrentDate += Hour+ "时";
         } else {
         CurrentDate += "0" + Hour+ "时";
         }*/
        return CurrentDate;
      },
      deleteMsgTask(id) {
        const self = this;
        self.$axios.post(apis.msgtaskdelete, {

            id: id//cid

        }).then((res) =>{
          if (res.data.code == 200) {
            self.handleClick(self.tempcid);
          } else {
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'消息提醒删除失败,请重新删除'
            })
          }

        });
      },
      async createTask(){

       // var num = this.msgTaskCount();
        let msgTaskCount = 0;
        const self = this;
        const num = await this.$axios.get(apis.query, {
          params: {
            cid: self.tempcid//cid
          }
        }).then((res) => res.data );

        if (num.code == 200) {
            msgTaskCount = num.data.length;
          } else {
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'消息提醒删除失败,请重新删除'
            })
          }
        if (msgTaskCount >= 10) {
          self.$createMessage({
              type:'warning',
              duration:3000,
              spinnerText:'可设置的消息提醒已满，不能再添加'
            })

        } else {
          this.createvisible = true;
          this.$refs['ruleForm'].resetFields();
          // $("#createTaskModal").modal({backdrop: 'static', keyboard: false});
          // $("#msgTaskTitle").val("");
          // $("#msgTaskContent").val("");
          // $("#alertTime").val("");
        }
      },
      addremind(){

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const self = this;
            self.$axios.post(apis.addMsgTask,{
              cid: self.tempcid,
              msgTaskTitle: self.ruleForm.msgTaskTitle,
              alertTime: self.ruleForm.alertTime,
            }).then((res) => {
              if( res.data.code == 200 ){
                  self.createvisible = false;
                  self.handleClick(self.tempcid);
              }else{
                  self.$alert('消息提醒设置失败,请重新添加', '设置失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                      return;
                    }
                  });
              }

            });

          } else {
            return false;
          }
        });
      }
    },
    components: {
      'sas-dialog-remind': dialogRemind
    }
  }
</script>
<style lang="scss">
  .container-content-bg-w{
    .lvx-table thead {
      font-size: 12px;
      color: #333;
      font-weight: 500;
    }
    .lvx-table th, .lvx-table td {
      padding: 0px 18px;
      min-width: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
    }
    .lvx-table th > .cell{
      height: 40px;
      line-height: 40px;
    }
    .lvx-cascader__label{
      text-align: center;
      padding: 6px 25px 0 15px;
    }
    .lvx-input__suffix{
      right: 10px;
    }
    .lvx-table th div{
      width: 200px;
    }
    .lvx-table td{
      padding-left: 40px;
      height: 66px;
      font-size: 12px;
      border-bottom:none;
    }
    .lvx-table th{
      padding-left: 40px;
    }
    .lvx-table .con-th-d{
      background-color: #e8f0f9;
      height: 40px;
    }
    .lvx-table__empty-block{
      overflow: hidden;
      min-height: 350px;
    }
    .lvx-badge__content.is-fixed.is-dot {
      top: 6px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .manage-contract-task-manage{
    .container-header-w{
      padding-bottom:20px;
      color: #333;
      position: relative;
      a{ color: #333;
        &:hover{ color: #333;}
      }
      span{color: #4081ff; }
      // &.arrow-icon{width: 10px; height: 15px; display: inline-block; background: rgba(0, 0, 0, 0) url("../images/saas/arrow-icon.png") no-repeat scroll 3px 4px;}
    }

    //列表内容
    .container-content-bg-w{
      width: calc(100vw - 200px);
      height: calc(100vh - 106px);
      padding: 15px 0px;
      .container-content-white{
        background-color: $body-bg;
        width: calc(100% - 32px);
        height: 100%;
        padding: 18px 18px 0 18px;
      }
      .contract-table{
        margin: 20px 0;
      }
    }
    @media  (max-width: 1366px) {
      .container-content-bg-w{
        width: calc(100vw - 180px);
      }
    }
    .page-position{
      position: absolute;
      bottom: 45px;
      right: 44px;
    }
    table{
      margin-bottom: 0;
      width: 100%;
      max-width: 100%;
      background-color: transparent;
      border-spacing: 0;
      border-collapse: collapse;
    }
    .content{
      padding: 25px 24px;
    }
    .dialog-footer{
      width: 100%;
      text-align: center;
    }
    .item {
      margin-top: 10px;
      margin-right: 40px;
    }
    .nomessage {
      padding-right: 66px;
      padding-top: 17px;
    }
  }

</style>
