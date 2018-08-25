<template>
  <div>
    <header class="sas-manager-header">
      <ul class="header-ul clearfix">
        <li class="header-item first"  v-show="path !== '/manage'">
          <sas-button category="primary" icon="icon iconfont lvx-icon-add" @click="toContractView">创建合同</sas-button>
        </li>
        <li class="header-item">
          <lvx-badge :hidden="!showMesBadge" is-dot>
            <span class="hover-pointer hover-color">
              <router-link class="item-text hover-color sas-text-decoration-none" to="/manage/contract/contract-messages">
                <i class="icon iconfont lvx-icon-message"></i> 消息</router-link>
            </span>
          </lvx-badge>
        </li>
        <li class="header-item">
          <span class="hover-pointer hover-color">
            <router-link class="item-text hover-color sas-text-decoration-none" to="/help-center">
              <i class="icon iconfont lvx-icon-help hover-color"></i> 帮助</router-link>
          </span>
        </li>
        <li class="header-item account">
          <span class="hover-pointer hover-color" @click="onToggleUserBtn">
            <i class="icon iconfont lvx-icon-user"></i>
            <span class="user-name item-text" v-text="user.loginEmail"></span>
            <i class="icon iconfont lvx-icon-icon-arrow-down user-name-icon hover-pointer"></i>
          </span>
          <div class="user-toggle" v-show="showUser" @mouseleave="onLeaveUserPanel">
            <div class="user-toggle-show">
              <span class="user-home-triangle"></span>
              <div class="user-home-div-switch-bg col-xs-12">
                <span class="user-home-triangle1 sameCell" style="display: inline;" v-if="accountList.persional.length">个人账户</span>
                  <ul class="user-ul" v-if="accountList.persional.length">
                    <li class="row contract-userType" v-for="item in accountList.persional" :key="item.userId" @click="onSwitchAccount(item.loginEmail)">
                      <span class="col-xs-70" v-text="item.loginEmail"></span><a class="col-xs-30 text-decoration-none" style="color:#a7b5ca;padding-left: 13px;">
                        <span class="glyphicon glyphicon-transfer" style="top: 5px;"></span>&nbsp;&nbsp;切换
                      </a>

                    </li>
                  </ul>
                <span class="user-home-triangle1 enterpriseCell" style="display: inline;" v-if="accountList.company.length">企业账户</span>
                  <ul class="user-ul" v-if="accountList.company.length">
                    <li class="row contract-userType" v-for="item in accountList.company" :key="item.userId" @click="onSwitchAccount(item.loginEmail)">
                      <span class="col-xs-70" v-text="item.loginEmail"></span><a class="col-xs-30 text-decoration-none" style="color:#a7b5ca;padding-left: 13px;">
                        <span class="glyphicon glyphicon-transfer" style="top: 5px;"></span>&nbsp;&nbsp;切换
                      </a>

                    </li>
                  </ul>
                <span class="user-home-triangle1 otherCell l" style="display: inline;" v-if="accountList.other.length">其他账户</span>
                  <ul class="user-ul" v-if="accountList.other.length">
                    <li class="row contract-userType" v-for="item in accountList.other" :key="item.userId" @click="onSwitchAccount(item.loginEmail)">
                      <span class="col-xs-70" v-text="item.loginEmail"></span><a class="col-xs-30 text-decoration-none" style="color:#a7b5ca;padding-left: 13px;">
                        <span class="glyphicon glyphicon-transfer" style="top: 5px;"></span>&nbsp;&nbsp;切换
                      </a>
                    </li>
                  </ul>
              </div>
            </div>
            <div class="user-toggle-hide" v-if="noAccount">
              <div class="user-head-icon-w">
                <i class="icon iconfont lvx-icon-zhanghuicon1"></i>
              </div>
              <p class="user-head-p1">暂无可切换账号</p>
              <p class="user-head-p2">同一手机可申请1个个人账号 3个企业账号！</p>
            </div>
          </div>
        </li>
        <li class="header-item last">
          <span class="hover-pointer hover-color"  @click="onLoginout">
            <i class="icon iconfont lvx-icon-logout"></i>
            <span class="item-text hover-color">退出</span>
          </span>
        </li>
      </ul>
    </header>
    <sas-dialog-login :show.sync="dialogLoginVisible" :loginId="switchLoginId"/>
    <div class="row sidebar">
      <div class="sidebar-item-top-div sidebar-item-new sidebar-item-contact" @click="showIframe()"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import loginMixins from '~/mixins/login-mixins'
import _ from 'lodash'
import dialogLogin from '~/components/dialog/dialog-swlogin'

const accountEnumMap = { //账号类型
  persionalType: 1,
  companyType: 2,
  otherType: 0
};
export default {
  data () {
    return {
      showUser: false, //关联用户列表可见状态
//      showMesBadge: false, //登陆用户消息标志可见状态
      accountList: { //关联用户结构数据
        persional: [],
        company: [],
        other: []
      },
      noAccount: false, //登陆用户是否有关联用户
      dialogLoginVisible: false, //切换关联用户登陆弹窗可见状态
      switchLoginId: '' //切换关联用户ID
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      showMesBadge: state => state.Header.showMesBadge

    }),
    path() {
      return this.$route.path;
    }
  },
  created() {
    this.getUserInfo();
  },
  mounted () {
  },
  watch: {
  },
  mixins: [loginMixins],
  methods: {
    onToggleUserBtn() {
      this.showUser = !this.showUser;
    },
    onLeaveUserPanel() {
      this.showUser = false;
    },
    async onLoginout() {
      this.$lx.loading.start();
      const r = await this.logout(`${location.protocol}//${location.host}/login`);
      if(r.success) {
        this.resetExpTime(-1);
        this.$store.state.sessionId = '';
        this.$lx.loading.finish();
        // this.$router.push({ path: '/login' });
        window.location.assign(r.data);
      }
    },
    async getUserInfo() {
      const user = await this.$axios.get(apis.userInfo).then((data) => data.data.data);
      const mesNum = await this.$axios.get(apis.getMesNum).then((data) => data.data.data);
      const accountList = await this.$axios.get(apis.getAccountList).then((data) => data.data.data);
      user.leftSignCnt = String(user.leftSignCnt).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      if (mesNum.count > 0) {
        this.$store.state.Header.showMesBadge = true;
//        this.showMesBadge = true;
      } else {
        this.$store.state.Header.showMesBadge = false;
//        this.showMesBadge = false;
      }
      this.$store.state.user = user;

      this.noAccount = !!!accountList.length;
      this.accountList.persional = _.filter(accountList, (o)=>{ //筛选账号类型为个人账号的数组
          return o.userType == accountEnumMap.persionalType;
      });
      this.accountList.company = _.filter(accountList, (o)=>{ //筛选账号类型为企业账号的数组
          return o.userType == accountEnumMap.companyType;
      });
      this.accountList.other = _.filter(accountList, (o)=>{ //筛选账号类型为其他账号的数组
          return o.userType == accountEnumMap.otherType;
      });
    },
    onSwitchAccount(loginId) {
      this.switchLoginId = loginId;
      this.dialogLoginVisible = true;
      this.showUser = false;
    },
    toContractView() {
      open(`${this.$router.options.base}/manage/contract/contract-edit`);
      // this.$router.push({path: '/manage/contract/contract-edit'});
    },
    showIframe(){
      window.open("http://p.qiao.baidu.com/cps/chat?siteId=9393396&userId=18279786");
    }
  },
  components: {
    'sas-dialog-login': dialogLogin
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/base.scss";
.col-xs-70{
  display: inline-block;
  width: 70%;
}
.col-xs-30{
  display: inline-block;
  width: 30%;
}
.hover-pointer{
  cursor: pointer;
}
.hover-color:hover > *{
  color: $theme-color !important;
}
.text-decoration-none{
  text-decoration: none;
}
.sas-manager-header{
  @include responsive-default {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: #fff;
    box-shadow: 0 1px 0 #fff, 0 1px 0 #fff;
    /* color: #575050; */
    margin-bottom: 2px;
    /* padding-left: 40px; */
    /* overflow: hidden; */
    padding-right: 20px;
    .header-ul{
      margin: 0 15px 0 0;
      list-style: none;
      padding: 0;
      float: right;
      .header-item{
        float: left;
        min-width: 90px;
        height: 52px;
        // cursor: pointer;
        .item-text{
          color: #959595;
        }
      }
      .lvx-badge{
        display: inline;
      }
      [class*='lvx-icon']{
        color: #8d9cbb;
      }
      .first{
        margin-right: 45px;
      }
      .account{
        position: relative;
        width: 100px;
        max-width: 114px;
        .user-name{
          max-width: 62px;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          position: absolute;
          margin-left: 8px;
          &+i{
            font-size: 10px;
            position: absolute;
            right: 0;
            top: calc(50% - 6px);
            &:hover{
              color: #8d9cbb !important;
            }
          }
        }
        .user-name-icon{

        }
        .user-toggle{
          // display: none;
          width: 305px;
          min-height: 248px;
          background: #f8f8f8;
          border: 1px solid #b8c6dc;
          box-shadow: 0 1px 4px #b8c6dc;
          padding: 16px 12px;
          position: absolute;
          top: 53px;
          /* right: 65px; */
          /* display: none; */
          z-index: 99;
          left: 50%;
          transform: translateX(-50%);
          .user-toggle-show{
            .user-ul{
              list-style: none;
              padding: 0;
              border-top: 1px dashed #8a8a8a;

              .contract-userType{
                margin: 5px 0;
                cursor: pointer;
              }
            }
          }
          .user-toggle-hide{
            position: absolute;
            bottom: 21px;
            .user-head-icon-w{
              text-align: center;
              margin-bottom: 30px;
              .icon{
                font-size: 75px;
              }
            }
            .user-head-p1{
              text-align: center;
              line-height: $line-height-article;
              color: #a8b7c7;
              font-size: 16px;
            }
            .user-head-p2{
              line-height: $line-height-article;
              font-size: 14px;
              color: #a8b7c7;
            }
          }
        }
      }
      .last{
        margin-left: 38px;
      }
    }
  }
}
.sidebar {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 1024;
  cursor: pointer;
  .sidebar-item-top-div{
    width: 56px;
    height: 56px;
    border-radius: 20px;
    box-shadow:  0 3px 10px rgba(0,81,240,.6);
    margin-top: 10px;
  }
  .sidebar-item-contact{
    display: block;
    position: relative;
    -moz-transition: background-position 1s;
    -ms-transition: background-position 1s;
    -o-moz-transition: background-position 1s;
    -webkit-moz-transition: background-position 1s;
    transition: background-position 1s;
  }
  .sidebar-item-new{
    background:#4081ff url("~assets/img/src/sidebar-new.png");
    background-position: -6px -6px;
    &:hover{
       background-position: -6px -85px;
     }
  }
}
</style>

