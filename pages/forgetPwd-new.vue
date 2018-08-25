<template>
  <section class="row all-relative-w page-forgetPwd">
    <div class="lx-container forgetPwd">
      <div class="title">
        <span>找回密码</span>
      </div>
      <div class="body">
        <div class="main">
          <div class="select">
            <div :class="{'choose': selectvalue == '1'}">
              <span @click="chooseclick('1')">手机认证</span>
            </div>
            <div :class="{'choose': selectvalue == '2'}">
              <span @click="chooseclick('2')">账号认证</span>
            </div>
          </div>
          <div class="form-horizontal" id="resetform">
            <!--手机找回 -->
            <div v-show="selectvalue == '1'" class="form-mobile">
              <lvx-form :model="ruleForm"  :rules="rules" ref="ruleForm">
                <lvx-form-item  prop="cellNum">
                  <div class="row">
                    <div class="image" id="phone"></div>
                    <input id="cellNum" v-model="ruleForm.cellNum" name="cellNum" type="text" class="line-ie input input-short" placeholder="请输入你的手机号" />
                    <button type="button" class="code" id="btn-sendResetPwdMessage"
                      :class="{'disabled': dis}"
                      @click="sendResetPwdMessage">{{ getcode }}</button>
                  </div>
                </lvx-form-item>
                <lvx-form-item  prop="resetCode">
                  <div class="row">
                    <div class="image" id="ok"></div>
                    <input id="resetCode" name="resetCode" v-xss v-model="ruleForm.resetCode" type="text" class="line-ie input" placeholder="请输入手机验证码">
                  </div>
                </lvx-form-item>
              </lvx-form>
            
            </div>
            <!--邮箱找回 -->
            <div v-show="selectvalue == '2'" class="form-email">
              <lvx-form :model="ruleForm1"  :rules="rules1" ref="ruleForm1" >
                <lvx-form-item  prop="loginEmail">
                  <div class="row">
                    <div class="image" id="user"></div>
                    <input id="loginEmail" name="loginEmail" type="text"
                           v-xss v-model="ruleForm1.loginEmail" 
                           class="line-ie input" placeholder="请输入你的用户名">
                  </div>
                </lvx-form-item>
              </lvx-form>
            </div>
            <button type="button" class="button" @click="submitclick()">
              提交
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'forgetPwd',
  layout: 'user',
  metaInfo:{
    title: '找回密码-云合同',
    meta: [{
      name: 'keywords',
      content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
    },{
      name: 'description',
      content: '云合同是律讯公司自主研发的第三方电子合同平台，致力于合同生态链的建设与完善，是“互联网”+合同的完美呈现。全国咨询热线：400-600-3669'
    }]
  },
  data() {
    var validateCellNum = (rule, value, callback) => {
      if(!(/^(\d{11})$/.test(value))) {
        callback(new Error('手机格式不对'));
      } else {
        callback();
      }
    };
    return {
      selectvalue : '1',
      getcode:'获取验证码',
      dis:false,
      ruleForm: {
        cellNum:'',
        resetCode:'',
      },
      rules: {
        cellNum: [
          { required: true, message: '手机必填', trigger: 'blur' },
          { validator: validateCellNum, trigger: 'blur' }
        ]
      },
      ruleForm1: {
        loginEmail: ''
      },
      rules1: {
        loginEmail: [
          {}
        ]
      }
    }
  },
  created () {

  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    chooseclick(val){
      this.selectvalue = val;
    },
    submitclick(){

      const self = this;
      if(self.selectvalue == '1'){
        //校验ing
        //console.log(self.cellStr,self.codeStr);
        if(!self.cellStr&&!self.codeStr){
          self.$store.commit('SET_UPDATECELL', '手机必填');
          self.$store.commit('SET_UPDATECODE', '验证码必填');
          return false;
        }else{
          if(!(/^(\d{11})$/.test(self.cellStr))){
            self.$store.commit('SET_UPDATECELL', '手机格式不对');
            return false;
          }
          if(!(/^(\d{6})$/.test(self.codeStr))){
            self.$store.commit('SET_UPDATECODE', '验证码格式不对');
            return false;
          }
        }

        self.$axios({
          method: 'post',
          url: '/user/userSecurity/checkResetPwdMessage',
          data: {
            cellNum: self.$xss(self.cellStr),
            resetCode: self.$xss(self.codeStr)
          }
        }).then(function(res){
          // console.log(res.data);
          if(!res.data.success){
            self.$store.commit('SET_UPDATECODE',res.data.msg);
          }else{
            sessionStorage.userData = JSON.stringify(res.data.data);
            sessionStorage.isMobile = 1;
            self.$router.push({ name:'resetPwd' });
          }
        });
      }else if(this.selectvalue == '2'){
        if(!self.cemail){
          self.$store.commit('SET_UPDATELOGIN','用户名必填');
          return false;
        }else{
          if(!(/^[\w_][\w_@\\.]{2,39}$/.test(self.cemail))){
            self.$store.commit('SET_UPDATELOGIN','用户名必须由字母、数字和下划线开头的3到40个字符的字母、数字、_、@组成');
            return false;
          }
        }
        self.$axios({
          method: 'get',
          url: '/user/pwdProtect/getUserQuestion',
          params: {
            loginEmail: self.$xss(self.cemail)
          }
        }).then(function(res){
          // console.log(res.data);
          if(!res.data.success){
            self.$store.commit('SET_UPDATELOGIN',res.data.msg);
          }else{
            sessionStorage.setItem('securityAnswer', JSON.stringify(res.data.data));
            self.$router.push({path:'/securityAnswer'});
          }
        });
      }else{
        console.log(self.selectvalue);
      }
    },
    sendResetPwdMessage(){
      //获取验证码
      if(!this.dis){
        // 再次校验手机号格式
        if(!this.cellNum){
          this.$store.commit('SET_UPDATECELL','手机必填');
          return false;
        }else{
          if(!(/^(\d{11})$/.test(this.cellNum))){
            this.$store.commit('SET_UPDATECELL','手机格式不对');
            return false;
          }
        }
        const self = this;

        self.$axios({
          method: 'post',
          url: '/user/userSecurity/sendResetPwdMessage',
          data: {
            cellNum: self.$xss(self.cellNum)
          }
        }).then(function(res){
          if(!res.data.success){
            self.$store.commit('SET_UPDATECELL',res.data.msg);
          }else{
            let stTotal = 60;
            let st = setInterval(()=>{
              stTotal--;
              self.getcode = `${stTotal}s后可重发`;
              if(stTotal <= 0){
                window.clearInterval(st);
                self.getcode = `重新发送`
              }
            },1000);
          }
        });
        }
    }

  },
  components: {
   
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
  .page-forgetPwd {

    * {
      outline: none;
    }
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
        .select {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        .row {
          margin-bottom: 28px;
        }
        .remind {
          top: -24px;
        }
      }
      @media (max-width: 1366px) {
        .forgetPwd {
          height: auto;
        }
        .select {
          padding-top: 50px;
          padding-bottom: 12px;
        }
        .row {
          margin-bottom: 28px;
        }
        .remind {
          top: -24px;
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
        .select {
          padding-top: 124px;
          div {
            &:hover {
              cursor: pointer;
            }
            width: 230px;
            height: 26px;
            display: inline-block;
            text-align: center;
            span {
              font-size: 16px;
              font-weight: bold;
              padding-left: 28px;
            }
          }
          .choose {
            color: $blue;
            &:before {
              content: "";
              background: url("~assets/img/src/forgetPwd/icon.png") no-repeat -4px -476px;
              height: 20px;
              width: 20px;
              display: inline-block;
              padding-top: 3px;
              position: absolute;
            }
          }
          padding-bottom: 83px;
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
          display: none;
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

        #form-Answer {
          .question {
            color: #4d699f;
          }
          input {
            border: $borderLineSolid;
            background-color: $bgModule;
            color: $borderLine;
            display: block;
            height: 50px;
            width: 420px;
            line-height: 50px;
            font-size: 14px;
            margin: 0 auto 17px;
            padding: 0 23px;
            border-radius: 1px;
          }
          .button {
            padding-top: 68px;
            width: 420px;
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

      }
      .noMessage-z {
        padding: 50px;
        text-align: center;
      }

      #verify-zyf {
        z-index: 100;
      }
      blue {
        cursor: pointer;
      }
      .line-ie {
        line-height: 20px \0;
      }
      :-ms-input-placeholder {
        color: rgba(153, 153, 153, 1);
      }
    }
  .page-forgetPwd{
    .form-mobile{
      .row{
        border-bottom: $borderLineSolid;
        padding-bottom: 8px;
        height:42px;
        line-height: 33px;
        margin-bottom: 57px;
        .image{
          content: "";
          height: 33px;
          width: 33px;
          background: url("~assets/img/src/forgetPwd/icon.png") no-repeat;
          display: inline-block;
          position:absolute;
        }
        #phone{
          background-position: -27px -208px;
        }
        #ok{
          background-position: 1px -208px;
        }
        #user{
          background-position: -1px -239px;
        }
        #lockT{
          background-position: 2px -443px;
        }
        #lockOk{
          background-position: -26px -443px;
        }

        .input{
          padding-left: 38px;
          border:none;
          width: 100%;
        }
        .input-short{
          width:355px;
        }
        .line-ie {
          line-height: 20px;
        }
        :-ms-input-placeholder {
          color: rgba(153, 153, 153, 1);
        }
      }
      .code{
        background-color: $blue;
        color: $white;
        width: 104px;
        height: 33px;
        border-radius: 4px;
        border:none;
      }
      .remind-div{
        height: 22px;
      }
      .remind {
        color: $blue;
        font-weight: normal;
        font-size: 12px;
        display: inline-block;
        position: relative;
        top: -47px;
        left:34px;
      }
      .button{
        background-color: $blue;
        color:$white;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width:411px;
        display:block;
        margin:auto;
        border:none;
        font-size:16px;
      }
      .disabled{
        background-color: $gray !important;
        cursor:auto !important;
      }
    }
    .form-email{
      .row{
        border-bottom: $borderLineSolid;
        padding-bottom: 8px;
        height:42px;
        line-height: 33px;
        margin-bottom: 57px;
        .image{
          content: "";
          height: 33px;
          width: 33px;
          background: url("~assets/img/src/forgetPwd/icon.png") no-repeat;
          display: inline-block;
          position:absolute;
        }
        #phone{
          background-position: -27px -208px;
        }
        #ok{
          background-position: 1px -208px;
        }
        #user{
          background-position: -1px -239px;
        }
        #lockT{
          background-position: 2px -443px;
        }
        #lockOk{
          background-position: -26px -443px;
        }

        .input{
          padding-left: 38px;
          border:none;
          width: 100%;
        }
        .input-short{
          width:355px;
        }
        .line-ie {
          line-height: 20px;
        }
        :-ms-input-placeholder {
          color: rgba(153, 153, 153, 1);
        }
      }
      .code{
        background-color: $blue;
        color: $white;
        width: 104px;
        height: 33px;
        border-radius: 4px;
        border:none;
      }
      .remind-div{
        height: 22px;
      }
      .remind {
        color: $blue;
        font-weight: normal;
        font-size: 12px;
        display: inline-block;
        position: relative;
        top: -47px;
        left:34px;
      }
      .button{
        background-color: $blue;
        color:$white;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width:411px;
        display:block;
        margin:auto;
        border:none;
        font-size:16px;
      }
      .disabled{
        background-color: $gray !important;
        cursor:auto !important;
      }
    }
  }
</style>
