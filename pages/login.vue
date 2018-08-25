<template>

<section class="row saas-login">
    <div class="row login-bg">
         <div class="col-xs-6 login-content">
             <div  class="content-error content-error-user" v-show="logger.visible" v-html="logger.text">
             </div>
             <div  class="content-error content-error-pd" v-show="logger_pd.visible" v-html="logger_pd.text"></div>
             <!-- <form class="content-form" role="form" id="fm1"> -->
                 <div class="login-text-w login-text-bg-w login-input-user">
                    <i class="iconsprite" :class="[icon.username]"></i>
                     <input  v-model="ticket.username" id="username" name="username" class="login-text-input-w" tabindex="1" accesskey="n" value="" size="25" autocomplete="off" aria-required="true" aria-invalid="true" maxlength="40" aria-describedby="username-error" type="text" placeholder="用户名" @blur="icon.username='icon-login_icon_03'" @focus="icon.username='icon-login_icon_05'" @blur.capture="userNameCheck">
                 </div>
                 <div class="login-text-w login-text-bg-w login-input-password">
                    <i class="iconsprite" :class="[icon.password]"></i>
                     <input  v-model="ticket.password" id="password" name="password" class="login-text-input-w" tabindex="2" accesskey="p" value="" size="25" autocomplete="off" aria-required="true" aria-invalid="true" maxlength="40" aria-describedby="password-error" type="password" placeholder="密码" @blur="icon.password='icon-login_icon_10'" @focus="icon.password='icon-login_icon_11'" >
                 </div>
                     <div class="col-xs-12">
                         <div class="ln">
                             <div id="captcha" class="nc-container" v-bind:class="captcha.shake"></div>
                         </div>
                         <input v-model="ticket.csessionid" type='hidden' id='csessionid' name='csessionid'/>
                         <input v-model="ticket.sig" type='hidden' id='sig' name='sig'/>
                         <input v-model="ticket.token" type='hidden' id='token' name='token'/>
                         <input v-model="ticket.scene" type='hidden' id='scene' name='scene'/>

                     </div>
                 <div class="login-text-w clearfix">
                        <router-link to="/forgetPwd" class="pull-left login-password-w">忘记密码</router-link>
                        <router-link to="/register" class="pull-right login-password-w">注册账户</router-link>
                 </div>
                 <div class="login-text-w">
                     <div class="col-xs-9 text-center">
                         <!-- <input name="lt" value="LT-763-cRBIVTjngujIa9gYKcTVMsITSfkYpB" type="hidden">
                         <input name="execution" value="e4s1" type="hidden">
                         <input name="_eventId" value="submit" type="hidden"> -->
                         <!--<input class="btn regist-bg1 regist-padding1" name="submit" accesskey="l" value="登录" tabindex="4" type="submit">-->
                         <button  type="button" @click="toLogin" tabindex="4" class="login-text-w login-btn-w">登&nbsp;录</button>
                     </div>
                 </div>
             <!-- </form> -->
             <footer class="login-con-footer clearfix">
                <div class="pull-left login-text-bg-w login-upload-w upload-ios">
                    <i class="iconsprite icon-ios-normal"></i>
                    苹果客户端下载
                    <i class="erweima"></i>
                </div>
                <div class="pull-right login-text-bg-w login-upload-w upload-android">
                    <i class="iconsprite icon-android-normal"></i>
                    安卓客户端下载
                    <i class="erweima"></i>
                </div>
             </footer>
         </div>
    </div>
</section>

</template>

<script>
import { mapState } from "vuex";
import apis from "~/config/api";
import loginMixins from "~/mixins/login-mixins";
import { asyncLoadJsFile, asyncLoadCssFile } from "~/framework/core/utils";
import xss from "xss";
import * as types from "~/store/mutation-types";
import ncPlugin from "~/plugins/nc";

let [_MSG, _TGT, _ST, nc, _regExp, _sessionTime, _expTime] = [
  "",
  "",
  "",
  undefined,
  new RegExp("(^| )validFlag=([^;]*)(;|$)"),
  1790000,
  "expTime"
];
export default {
  name: "login",
  metaInfo: {
    title: "登录—云合同"
  },
  data() {
    return {
      ticket: {
        username: "",
        password: "",
        csessionid: "",
        sig: "",
        token: "",
        scene: "",
        lt: "LT-763-cRBIVTjngujIa9gYKcTVMsITSfkYpB",
        execution: "e4s1",
        _eventId: "submit"
      },
      icon: {
        username: "icon-login_icon_03",
        password: "icon-login_icon_10"
      },
      logger: {
        visible: false,
        text: ""
      },
      logger_pd: {
        visible: false,
        text: ""
      },
      captcha: {
        shake: ""
      },
      showFlag: false
    };
  },
  layout: "user",
  created() {},
  computed: {
    ...mapState({
      sessionId: state => state.sessionId
    })
  },
  watch: {},
  mounted() {
    this.initNc();
  },
  mixins: [loginMixins],
  methods: {
    initNc() {
      let self = this;
      if (self.showFlag === true) {
        ncPlugin().then(() => {
          window.aliCaptcha = false;
          nc = new noCaptcha();
          var nc_appkey = "USSK"; // 应用标识,不可更改
          var nc_scene = "register"; //场景,不可更改
          var nc_token = [nc_appkey, new Date().getTime(), Math.random()].join(
            ":"
          );
          var nc_option = {
            renderTo: "#captcha", //渲染到该DOM ID指定的Div位置
            appkey: nc_appkey,
            scene: nc_scene,
            token: nc_token,
            callback: function(data) {
              // 校验成功回调
              window.aliCaptcha = true;
              self.ticket.csessionid = data.csessionid;
              self.ticket.sig = data.sig;
              self.ticket.token = nc_token;
              self.ticket.scene = nc_scene;
            }
          };
          nc.init(nc_option);
        });
      }
    },
    toLogin() {
      var loginEmail = this.ticket.username;
      var passwd = this.ticket.password;
      let self = this;
      // 如果没滑动验证码
      if (self.showFlag && !window.aliCaptcha) {
        self.captcha.shake = "animated shake";
        setTimeout(() => {
          self.captcha.shake = "";
        }, 1000);
        return false;
      }
      var loginData = Object.assign({}, self.ticket);
      if (self.showFlag) {
        window.aliCaptcha = false;
        nc.reset();
      }
      self.$lx.loading.start();
      self.login(loginEmail, passwd, loginData).then(result => {
        if (!result) {
          self.$lx.loading.finish();
          self.logger_pd.visible = true;
          self.logger_pd.text = "用户名或密码错误";
          self
            .$axios({
              method: "post",
              url: apis.l_userNameCheck,
              data: {
                userName: self.$xss(this.ticket.username)
              }
            })
            .then(res => {
              if (res.data.success) {
                self.showFlag = res.data.showFlag;
                self.initNc();
              }
            });
        } else {
          self.resetExpTime();
          // loading.close()
          self.$lx.loading.finish();
          let openUrl = self.$route.query.redirectUrl;
          if (openUrl) {
            self.$router.replace(openUrl);
          } else {
            self.$router.push({ path: "/manage" });
          }
          // var _openUrl_idx = window.location.href.indexOf("_openUrl");
          // if(_openUrl_idx>0){
          //     window.location.replace(decodeURIComponent(window.location.href.substring(_openUrl_idx+9)));
          // }else{
          //     window.location.replace(NameSpace.login.baseUrl + "/app/manager/manager.html#home");
          // }
        }
      });
    },
    async login(_name, _passwd, verify) {
      let self = this;
      const promise = new Promise(async function(resolve, reject) {
        const vr = await self.verifyLoginIsValid().then(data => data); //校验登陆时效性
        if (vr) {
          //登录有效，则无须重新登录
          resolve(true);
        } else {
          //已失效或未登陆
          self.resetExpTime(-1);
          _MSG = "";
          let token = await self
            .getTGT(_name, _passwd, verify)
            .then(data => data)
            .catch(error => {
              resolve(false);
            });
          let sessionId = "";

          if (!token) {
            resolve(false);
          } else {
            sessionId = await self
              .getST(_name, _passwd, token)
              .then(data => data);
            if (sessionId) {
              self.$store.state.sessionId = sessionId;
              let loginApp = await self.loginApp(1, sessionId).then(r => r);

              if (!loginApp) {
                resolve(false);
              } else {
                resolve(true);
              }
            }
          }
        }
      });
      return promise;
    },
    async verifyLoginIsValid() {
      let self = this;
      const promise = new Promise(async (resolve, reject) => {
        // var timeLeft = 0;
        // if(navigator.cookieEnabled){//是否启用cookie
        //   if(document.cookie.match(_regExp)!=null){
        //     resolve(true);//已登录，且未过期
        //   } else {
        //     resolve(false);//未登录或已过期
        //   }
        // } else if(window.sessionStorage){//是否支持sessionStorage
        //   var expTime = parseInt(sessionStorage.getItem(_expTime));
        //   if(!expTime){ //未登录
        //     resolve(false);
        //   } else {
        //     timeLeft = expTime>_sessionTime?expTime-new Date().getTime():-10000;
        //   }
        // } else if(timeLeft > 0){
        //   resolve(true);
        // } else if(timeLeft > -9610){//有可能还未过期
        //   let login = await self.loginApp(null, self.sessionId).then((r)=>r);;
        //   login === true ? resolve(true) : resolve(false);
        // } else {
        //   resolve(false);//未登录
        // }
        resolve(false); //未登录
      });
      return promise;
    },
    async userNameCheck() {
      const checkR = await this.$axios({
        method: "post",
        url: apis.userNameCheck,
        data: {
          userName: this.$xss(this.ticket.username)
        }
      }).then(data => data.data);
      if (checkR) {
        this.logger.visible = false;
      } else {
        this.logger.visible = true;
        this.logger_pd.visible = false;
        this.logger.text = "用户名错误";
      }
      const l_checkR = await this.$axios({
        method: "post",
        url: apis.l_userNameCheck,
        data: {
          userName: this.$xss(this.ticket.username)
        }
      }).then(res => res.data);
      if (l_checkR.success) {
        this.showFlag = l_checkR.showFlag;
        this.initNc();
      }
    }
  },
  components: {}
};
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.saas-login {
  @include responsive-default {
    min-height: calc(100vh - 99px);
    margin-top: 2px;
    background: #f4f7f9;

    .login-bg {
      width: 1140px;
      height: calc(100vh - 149px);
      background: url("~assets/img/src/login/login_bg_w.png") left center
        no-repeat;
      margin: 0 auto;
      position: relative;

      .login-content {
        width: 400px;
        height: 246px;
        position: absolute;
        top: calc(50% - 123px);
        right: 0;

        .content-error {
          width: 398px;
          height: 38px;
          background: #e3e9f4;
          border: 1px solid #e9edf5;
          color: #313131;
          position: absolute;
          top: -45px;
          left: 0;
          text-indent: 42px;
          line-height: 38px;
          &:after {
            content: "!";
            width: 16px;
            height: 16px;
            background: #ffba00;
            border-radius: 50%;
            color: #fff;
            font-size: 16px;
            position: absolute;
            top: calc(50% - 8px);
            left: 13px;
            text-indent: 0;
            text-align: center;
            line-height: 16px;
          }
        }
        .login-text-w {
          width: 398px;
          height: 48px;
          margin-bottom: 15px;
          position: relative;
          .iconsprite {
            position: absolute;
            z-index: 1;
            top: 50%;
            transform: translateY(-50%);
            left: 13px;
          }
          .login-text-input-w {
            width: 100%;
            height: 48px;
            border: 1px solid #e1e1e1;
            // color: #131313;
            font-size: 16px;
            line-height: 48px;
            padding: 0;
            text-indent: 42px;
            position: relative;
          }
          .login-password-w {
            color: #4b4b4b;
            &:hover {
              color: #4081ff;
              text-decoration: none;
            }
          }
        }
        .login-input-password {
          margin-bottom: 25px;
        }
        .login-btn-w {
          background: #4081ff;
          border: none;
          border-radius: 4px;
          color: #fff;
        }

        .login-con-footer {
          // width: 87.5%;
          color: #727272;
          cursor: pointer;
          margin: 50px auto 0;
          position: relative;
          .login-upload-w {
            position: relative;
            line-height: 29px;
            .iconsprite {
              vertical-align: top;
            }
            .erweima {
              width: 118px;
              height: 126px;
              background: url("~assets/img/src/regist/QR_code.png") center
                no-repeat;
              transform: scale(0);
              position: absolute;
              top: 19px;
              left: 0;
              transition: 0.3s ease;
            }
            &:hover {
              .erweima {
                transform: scale(1);
              }
            }
          }
        }
        .ln {
          .nc-container {
            font-size: 12px;
          }
        }
        &:after {
          content: "账号登录";
          width: 90px;
          color: #545454;
          font-size: 18px;
          font-weight: 700;
          position: absolute;
          top: -80px;
          left: calc(50% - 45px);
        }
      }
    }
  }
}
</style>
<style >
.nc_wrapper {
  width: 100% !important;
}
.nc_wrapper .nc_scale .btn_slide {
  height: auto;
}
</style>
