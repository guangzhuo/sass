<template>
  <section class="row all-relative-w zyf-forgetPwd">
    <div class="lx-container forgetPwd">
      <div class="title">
        <span>重置密码</span>
      </div>
      <div class="body">
        <div class="main">
          <div class="title-min-blue"><div class="mi">密</div><span>请输入账号<span id="sp-loginEmail" style="padding: 0 5px;">
            <a class="resetPwd-color" href="javascript:void(0)" title="点击更换账号" @click="ldalogshow">
            {{ loginEmail }}
            </a>
          </span>的新密码</span></div>
          <form class="form-horizontal" id="modifyPwd-form">
            <div class="row">
              <div class="image" id="lockT"></div>
              <input id="password" name="password" type="password"
                     v-xss v-model="npw" @blur="updatenpw"
                     class="line-ie input" placeholder="请输入你的新密码">
            </div>
            <div class="remind-div">
              <label class="remind" id="remind-password">{{remindpassword}}</label>
            </div>
            <div class="row">
              <div class="image" id="lockOk"></div>
              <input id="confirm_password" name="confirm_password" type="password"
                     v-xss v-model="cpw" @blur="updatecpw"
                     class="line-ie input" placeholder="请重新输入你的密码">
            </div>
            <div class="remind-div">
              <label class="remind" id="remind-confirm_password">{{ confirmpassword }}</label>
            </div>
          </form>
          <button type="button" class="button" id="btn-modifyPwd" @click="modifyPwd">
            确定
          </button>

        </div>
      </div>
    </div>
    <div class="bootbox modal fade bootbox-alert in" v-show="dalogshow">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog postil-dialog">
        <div class="modal-content">
          <div class="c modal-header">
            <button type="button" class="bootbox-close-button close" @click="closehide">
              <span style="font-size: 22px; font-weight: 100; display: block; height: 22px; line-height: 19px;">×</span>
            </button><h4 class="c modal-title">请选择重置密码的用户</h4></div>
          <div class="modal-body">
            <div class="c bootbox-body">
            <ul id="ul-userList" style="overflow: auto;max-height: 300px">
              <li v-for="items in loginlist">
                <a class="resetPwd-color1" @click="loginclick(items.loginEmail)">{{ items.loginEmail }}</a>
                <hr class="resetPwd-hr">
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base.vue'
  export default {
    name: 'securityAnswer',
    extends: base,
    layout: 'user',
    metaInfo:{
      title: '重置密码-云合同',
      meta: [{
        name: 'keywords',
        content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
      },{
        name: 'description',
        content: '云合同是律讯公司自主研发的第三方电子合同平台，致力于合同生态链的建设与完善，是“互联网”+合同的完美呈现。全国咨询热线：400-600-3669'
      }]
    },
    data() {
      return {
        loginEmail:'',
        loginlist:[],
        dalogshow:false,
        npw:'',
        cpw:'',
        remindpassword:'',
        confirmpassword:''
      }
    },
    created () {

    },
    computed: {
      ...mapState({
      })
    },
    watch: {
    },
    mounted () {
      this.initData();
    },
    methods: {
      initData(){
        if(!(sessionStorage.isMobile-0)){
          var email = sessionStorage.userData;
          this.loginEmail = email;
        }else{
          this.ldalogshow();
          this.loginlist=JSON.parse(sessionStorage.userData);
          //this.loginlist = user_data;
        }
      },
      loginclick(val){
        this.loginEmail = val;
        this.dalogshow = false;
      },
      closehide(){
        this.dalogshow = false;
      },
      ldalogshow(){
        this.dalogshow = true;
      },
      updatenpw(){
        let pw = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d~`!@#$%\^\&\*\(\)\_\+\|\\\=\-\}\{\]\[\"\:\'\;\?\>\<\/\.,]{8,16}$/;
        if(this.npw){
          if(!(pw.test(this.npw))){
            this.remindpassword= '密码格式错误';
          }else{
            this.remindpassword= '';
          }
        }else{
          this.remindpassword = '请输入密码';
        }
      },
      updatecpw(){
        let pw = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d~`!@#$%\^\&\*\(\)\_\+\|\\\=\-\}\{\]\[\"\:\'\;\?\>\<\/\.,]{8,16}$/;
        if(this.cpw){
          if(!(pw.test(this.cpw))){
            this.confirmpassword= '密码格式错误';
          }else{
            if(this.cpw === this.npw){
              this.confirmpassword= '';
            }else{
              this.confirmpassword= '两次密码不一致';
            }
          }
        }else{
          this.confirmpassword = '请再次输入密码';
        }
      },
      modifyPwd(){
        //修改密码前先进行字段校验

        //pw —— 用来校验密码不能为纯数字或纯字母,长度在8到16位！
        let pw = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d~`!@#$%\^\&\*\(\)\_\+\|\\\=\-\}\{\]\[\"\:\'\;\?\>\<\/\.,]{8,16}$/;

        if( !this.cpw && !this.npw ){//新密码和确认密码非空校验
          this.remindpassword = '请输入密码';
          this.confirmpassword= '请再次输入密码';
          return false;
        }else if(!this.cpw){//确认密码非空校验
          this.confirmpassword= '请再次输入密码';
          return false;
        }else if(!this.npw){//新密码非空校验
          this.remindpassword = '请输入密码';
        }else{
          this.remindpassword = '';
          this.confirmpassword= '';
        }

        if( !(pw.test(this.cpw)) && !(pw.test(this.npw)) ){//新密码和确认密码格式校验
          this.remindpassword= '密码格式错误';
          this.confirmpassword= '密码格式错误';
          return false;
        }else if(!(pw.test(this.npw))){//新密码格式校验
          this.remindpassword= '密码格式错误';
          return false;
        }else if(!(pw.test(this.cpw))){//确认密码格式校验
          this.confirmpassword= '密码格式错误';
          return false;
        }else{
          this.remindpassword = '';
          this.confirmpassword= '';
        }

        if(this.cpw != this.npw){//确认密码与新密码是否相等
          this.confirmpassword= '两次密码不一致';
          return false;
        }else{
          this.remindpassword = '';
          this.confirmpassword= '';
        }

        const self = this;
        self.remindpassword = '';
        self.confirmpassword= '';
        self.$axios({
          method: 'post',
          url: '/user/userSecurity/resetPwd',
          data: {
            password: self.$xss(self.npw),
            confirm_password: self.$xss(self.cpw),
            loginEmail: self.$xss(self.loginEmail)
          }
        }).then((res)=>{
          // console.log(res.data);
          if(!res.data.success){
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: res.data.msg
            });
            return ;
          }else{
            self.$createMessage({
              type:'success',
              duration:3000,
              spinnerText: '重置成功'
            });
            setTimeout(()=> {
              self.$router.push({path: '/login'});
            },3000)
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  $borderLine:#b9c5dd;
  $borderLineSolid:1px solid $borderLine;
  $blue:#4081ff;
  $white: #fff;
  $gray:#959595;
  $bgModule:#e6ecf5;
  .all-relative-w{
    min-height: calc(100vh - 97px);
    background: #f4f7f9;
  }
  .zyf-forgetPwd{
    a {
      text-decoration: none;
    }
    *{outline:none;}
    @include responsive-default {
      .forgetPwd {
        margin: 30px auto 30px;
        width: 1141px;
        background: $white;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .075);
      }
      .body {
        padding-bottom: 20px;
      }

      @media(max-width: 1920px) {
        .forgetPwd {
          height: calc(100vh - 300px);
        }
      }

      @media (max-width: 1600px) {
        .forgetPwd {
          height: auto;
        }
        .row {
          margin-bottom: 28px;
        }
        .remind {
          top: -24px;
        }
        .title-min-blue {
          margin: 55px auto 36px;
        }
      }
      @media (max-width: 1366px) {
        .forgetPwd {
          height: auto;
        }
        .row {
          margin-bottom: 28px;
        }
        .remind {
          top: -24px;
        }
        .title-min-blue {
          margin: 25px auto 50px;
        }
      }

      .title {
        height: 83px;
        margin: 0 28px;
        border-bottom: $borderLineSolid;
        font-size: 24px;
        span {
          display: inline-block;
          padding: 40px 0 0 46px;
        }
      }
      .main {
        width: 465px;
        margin: auto;
      }
      .row {
        border-bottom: $borderLineSolid;
        padding-bottom: 8px;
        height: 42px;
        line-height: 33px;
        margin-bottom: 57px;
        .image {
          content: "";
          height: 33px;
          width: 33px;
          background: url("~assets/img/src/forgetPwd/icon.png") no-repeat;
          display: inline-block;
          position: absolute;
        }
        #phone {
          background-position: -27px -208px;
        }
        #ok {
          background-position: 1px -208px;
        }
        #user {
          background-position: -1px -239px;
        }
        #lockT {
          background-position: 2px -443px;
        }
        #lockOk {
          background-position: -26px -443px;
        }

        .input {
          padding-left: 38px;
          border: none;
          width: 100%;
        }
        .input-short {
          width: 355px;
        }
      }
      .code {
        background-color: $blue;
        color: $white;
        width: 104px;
        height: 33px;
        border-radius: 4px;
        border: none;
      }
      .remind-div {
        height: 22px;
      }
      .remind {
        color: $blue;
        font-weight: normal;
        font-size: 12px;
        display: block;
        position: relative;
        top: -47px;
        left: 34px;
      }
      .button {
        background-color: $blue;
        color: $white;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width: 411px;
        display: block;
        margin: auto;
        border: none;
        font-size: 16px;
      }
      .disabled {
        background-color: $gray !important;
        cursor: auto !important;
      }

      .title-min {
        color: $gray;
        margin: 36px auto 31px;
        font-size: 16px;
        span {
          display: block;
          margin: auto;
          width: 144px;
        }
      }

      .title-min-blue {
        color: $blue;
        margin: 84px auto 80px;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        .resetPwd-color {
          color: $blue !important;
        }
      }

      .mi {
        color: $white;
        background-color: $blue;
        border-radius: 4px;
        display: inline-block;
        font-weight: normal;
        font-size: 14px;
        height: 20px;
        width: 20px;
        line-height: 20px;
        margin: 1px 15px 1px 0;
      }
      blue {
        cursor: pointer;
      }
      .line-ie {
        line-height: 20px;
      }
      :-ms-input-placeholder {
        color: rgba(153, 153, 153, 1);
      }
      /*弹框*/
      * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
      }
      .modal-open .modal {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .fade {
        opacity: 0;
        -webkit-transition: opacity .15s linear;
        -o-transition: opacity .15s linear;
        transition: opacity .15s linear;
      }
      .fade.in {
        opacity: 1;
      }
      .modal-backdrop.fade {
        filter: alpha(opacity=0);
        opacity: 0;
      }
      .modal-backdrop.in {
        filter: alpha(opacity=50);
        opacity: .5;
      }

      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
      }

      @media (min-width: 768px) {
        .modal-dialog {
          width: 600px;
          margin: 180px auto;
          margin-bottom: 0;
        }
        .modal-content {
          -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
          box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        }
      }
      .modal-dialog {
        position: relative;
        width: 540px;
        margin: 0 auto !important;
        top: 50vh;
        transform: translateY(-50%) !important;
      }
      .modal.in .modal-dialog {
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        -o-transform: translate(0, 0);
        transform: translate(0, 0);
        z-index: 1050;
      }
      .modal.fade .modal-dialog {
        -webkit-transition: -webkit-transform .3s ease-out;
        -o-transition: -o-transform .3s ease-out;
        transition: transform .3s ease-out;
        -webkit-transform: translate(0, -25%);
        -ms-transform: translate(0, -25%);
        -o-transform: translate(0, -25%);
        transform: translate(0, -25%);
      }
      .modal-content {
        position: relative;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #999;
        border: 1px solid rgba(0, 0, 0, .2);
        outline: 0;
        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        border-radius: 5px;
      }
      .modal-header {
        min-height: 16.43px;
        background: #f0f5ff;
        color: #959595;
        font-size: 18px;
        padding: 16px 0 !important;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom: 1px solid #e5e5e5;
      }
      .c {
        text-align: center;
      }
      .modal-header .close {
        margin-top: -2px;
      }
      button.close {
        width: 22px;
        height: 22px;
        cursor: pointer;
        background: 0 0;
        border: 1px solid #000;
        border-radius: 50%;
        color: #000;
        line-height: 20px;
        font-size: 22px;
        padding: 0;
        position: absolute;
        right: 10px;
        top: 20px;
        -webkit-appearance: none;
      }
      .close {
        float: right;
        font-weight: 100;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
      }
      a, button, input, select, textarea {
        outline: 0 !important;
        font-family: inherit;
        text-transform: none;
        overflow: visible;
        margin: 0;
        font: inherit;
      }
      .modal-title {
        color: #4081ff;
        margin: 0;
        line-height: 1.42857143;
        padding: 0;
        font-family: inherit;
        font-weight: 500;
      }
      .modal-body {
        padding: 40px 0;
        font-size: 18px;
        color: #131313;
        position: relative;
      }
      .bootbox-body {
        color: #313131 !important;
      }
      .FBI-warning, .bootbox-body {
        font-size: 16px;
      }
      li, ol, ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      .resetPwd-color1 {
        cursor: pointer;
        border: 1px solid #fff;
        color: #555;
        padding: 5px 10px;
        display: block;
        width: 100%;
        text-decoration: none;
      }
      .resetPwd-hr {
        margin: 0;
        border-top-width: 4px;
      }
      hr {
        border: 0;
        border-top: 1px solid #d7d7d7;
        height: 0;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
      }
    }
  }

</style>
