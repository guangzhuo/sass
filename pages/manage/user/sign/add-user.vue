<template>
  <div class="signName">
    <div class="row sign-bg">
      <div class="row list-pad list-border">
        <router-link :to="{path:'/manage/user/sign/signSet'}" >
          <div>返回</div>
        </router-link>
      </div>
      <div class="row list-pad">
        <div class="row">
          <div class="mar-top">我的印章</div>
          <div class="mar-top form">
            <div class="row">
              <lvx-col :span="5">
                <lvx-form :model="ruleForm" ref="ruleForm">
                    <sas-input :model.sync="ruleForm.userName" placeholder="请输入云合同已注册的用户名"></sas-input>
                </lvx-form>
              </lvx-col>
              <sas-button type="primary" @click="addUserList()">添加</sas-button>
            </div>
            <div style="height: 20px;color: #F04134;">{{msg}}</div>
          </div>
        </div>
        <div class="row table">
          <div class="mar-top">印章使用人</div>
          <lvx-table  class="mar-top" :data="tableData" stripe border style="width: 100%">
            <lvx-table-column prop="userName" label="用户名" align="center"></lvx-table-column>
            <lvx-table-column prop="gmtCreate" label="添加时间" align="center"></lvx-table-column>
            <lvx-table-column label="操作" align="center">
              <template slot-scope="scope">
                <lvx-button type="text" @click="delSeal(scope.row.id)">删除</lvx-button>
              </template>
            </lvx-table-column>
          </lvx-table>
          <div class="row text-right mar-top" v-show="pages > 10">
            <sas-pagination :total="pages" :current-page="currentPage" @current-change="pageChange"></sas-pagination>
          </div>
          <sas-confirm
            :isShow.sync="delUser"
            type="info"
            title="确定删除授权"
            smallTitle="该操作无法恢复，是否继续！"
            enBtnFont="确认"
            catchBtnFont="取消"
            @enSure="enSureConfirm"
            @cancel="delUser = false"
          >
          </sas-confirm>
        </div>
      </div>
      <sas-confirm
        :isShow.sync="addUser"
        type="info"
        title="确定添加授权"
        smallTitle="是否确认为此账号授权印章"
        enBtnFont="确认"
        catchBtnFont="取消"
        @enSure="addUserConfirm('ruleForm')"
        @cancel="addUser = false"
      >
      </sas-confirm>
      <sas-dialog
        :show.sync="centerDialogVisible"
        title="印章授权协议书"
        :width="sweetWidth"
      >
        <div style="padding: 30px;">
          <div class="row">
            您将您的电子印章权限授权给他人控制并使用会存在如下法律风险，在您进行电子印章授权的操作之前，请您仔细阅读如下风险条款，
            如您不能接受如下风险，请您不要进行电子印章授权的操作行为。
          </div>
          <div class='row'>
            1、您应知悉，您须在本电子印章授权之前，已经与您的印章被授权人签署了包含授权盖章范围、授权时间、盖章权限、禁止转
            委托等内容的书面授权委托书，否则，您需承担您的印章被授权人超越授权范围盖章、越权盖章等给您带来的全部法律风险。
          </div>
          <div class='row'>
            2、您应知悉，若您完成了电子印章授权的操作，即表示您已经完全认可并承担因您的电子印章被您的被授权人控制并使用
            所产生的全部法律后果和法律责任。
          </div>
          <div class='row'>3、您应知悉，云合同不对您的印章被授权人的身份进行审核，您应自行确保您的印章被授权人的身份真实性。</div>
          <div class='row'>
            4、您应知悉，云合同近视作为提供电子签名技术服务商，不对您及您的印章被授权人的电子印章授权行为
            及后期相关的盖章行为承担任何责任，该行为所产生的全部法律后果由您自行承担。
          </div>
          <div class='row'>5、您应确保您的账号和密码的安全性，如在授权期间转让、注销账号等，您应及时终止授权，否则，因此给被授权人造成的损失您应全部赔偿。</div>
          <div class='row'>6、您应知悉，当您的授权期限到期时，您应及时终止授权，否则，因您未及时终止授权造成的全部法律后果由您自行承担</div>
          <div class='row'>7、您应确保不以任何非法方式使用本电子印章授权服务，也承诺不将本电子印章授权服务应用于任何非法目的。</div>
          <div class="row text-center mar-top">
            <sas-button type="primary" @click="accept">我已阅读并同意</sas-button>
          </div>
        </div>
      </sas-dialog>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'signName',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'添加授权-云合同'
    },
    data(){
      return {
        ruleForm:{
          userName:'',
        },
        currentPage:1, //当前页
        pageSize:10, //每页n条
        delUser: false,//删除授权弹框
        addUser:false,//添加授权弹框
        userId:'', //被授权人id
        centerDialogVisible: false, //协议书弹框
        signId: sessionStorage.getItem("signId"),//印章id
        msg:'',
        screenWidth: document.body.clientWidth,
        sweetWidth:'40%'
      }
    },
    async fetchData (to, context) {
      let self = context;
      const r = await self.$axios({
        method: 'post',
        url: apis.signShareList,
        data: {pageNo: 1,limit: 10}
      }).then((res)=> res.data);
      self.$store.state.myAccount.seal.tableData = r.data.rows;
      self.$store.state.myAccount.seal.pages = r.data.total;
  },
  computed: {
  ...mapState({
        tableData: state => state.myAccount.seal.tableData,
        pages: state => state.myAccount.seal.pages,
  })
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val;
      if(val>1366){
        if(val>1600){
          this.sweetWidth = '40%';
        }else{
          this.sweetWidth = '50%';
        }
      }else{
        this.sweetWidth = '65%';
      }
    }
  },
  mounted(){
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
    })()
    }
    if(this.screenWidth>1366){
      if(this.screenWidth>1600){
        this.sweetWidth = '40%';
      }else{
        this.sweetWidth = '50%';
      }
    }else{
      this.sweetWidth = '65%';
    }
  },
  methods:{
    userList(){
      const self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'post',
            url: apis.signShareList,
            data: {pageNo: self.currentPage,limit: self.pageSize}
          })
          .then(function (res) {
            if(res.data.code == 200){
              self.$store.state.myAccount.seal.tableData = res.data.data.rows;
              self.$store.state.myAccount.seal.pages = res.data.data.total;
            }else{
              const message = self.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:res.data.msg
              });
            }
          })
      });
      return promise
    },
    /*第一次添加授权*/
    addUserList(formName){
      var yhtName = this.ruleForm.userName.trim();
      if(yhtName == ''){
        this.msg = '请输入已注册过的云合同账号'
      }else{
        this.msg = '';
        const self = this;
        const promise = new Promise(function (resolve, reject) {
          self.$axios({
              method: 'post',
              url: apis.checkShareUser,
              data: {signId: self.signId,userName: yhtName}
            })
            .then(function (res) {
              if(res.data.code == 200){
                if(res.data.data.isFirst == 0){
                  self.centerDialogVisible = true; //授权协议
                }else{
                  self.addUser = true;//二次确认
                }
              }else{
                const message = self.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:res.data.msg
                });
              }
            })
        });
        return promise
      }
    },
    /*同意授权协议*/
    accept(){
      this.centerDialogVisible = false;
      this.addUser = true;
    },
    /*添加授权*/
    addUserConfirm(formName){
      var yhtName = this.ruleForm.userName.trim();
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'post',
            url: apis.signShare,
            data:{signId: self.signId,userName: yhtName}
          })
          .then(function (res) {
            if(res.data.code == 200){
              const message = self.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:'授权成功'
              });
              self.$refs[formName].resetFields();
              self.userList();
            }else{
              const message = self.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: res.data.msg
              })
            }
          })
      });
      return promise
    },
    /*删除授权*/
    delSeal(id){
      this.delUser = true;
      this.userId = id
    },
    enSureConfirm(){
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'post',
            url: apis.cacelSignShare,
            data:{userId: self.userId}
          })
          .then(function (res) {
            if(res.data.code == 200){
              const message = self.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:'删除授权成功'
              });
              self.userList();
            }else{
              const message = self.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: res.data.msg
              })
            }
          })
      });
      return promise
    },
    /*分页*/
    pageChange(v){
      this.currentPage = v;
      this.userList();
    }
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .signName{
  @include responsive-default {
    margin: 0 auto;
    height: 97%;
    min-height: 250px;
    .fl{float: left;}
    .fr{float: right;}
    .sign-bg{
      min-height: 100%;
      margin-bottom: 30px;
      background-color: #fff;
      .list-pad{padding: 20px 30px ;}
      .list-border{
        border-bottom: 1px solid #ddd;
        a{
          &:hover{text-decoration:none;color:#4081ff;}
          &:link{text-decoration:none;}
        }
      }
      .mar-top{margin-top: 20px;}
    }
  }
  }
</style>
<style lang="scss">
  .form{
    .lvx-input__inner{height: 40px; border-radius: 20px;}
    .sas-button.sas-button--primary.lvx-button--default{width: 100px; margin-left: 50px;}
  }
  .table{
    table{
      border-collapse:separate;
    }
    .lvx-table td{padding: 0}
    .lvx-table th{background-color: #d9d9d9;color: #333; padding: 8px 0}
  }

</style>


