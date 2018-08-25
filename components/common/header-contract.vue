<template>
  <div class="row head-b">
    <header class="header-contract">
      <div class="container" :style="{transform: `translateX(-${scrollLeft}px)`}">
        <div class="sas-float-left">
          <router-link to="/manage" class="logo-link"></router-link>
        </div>
        <div class="sas-float-right">
          <router-link to="/" class="link link-first sas-text-decoration-none">
            <i class="iconsprite icon-contract-home"></i>
            网站首页
          </router-link>
          <router-link to="/manage" class="link link-second sas-text-decoration-none"><i class="iconsprite icon-contract-manage"></i>{{user.userName}}</router-link>
          <a class="link link-logout sas-text-decoration-none sas-cursor-pointer" @click="onLogout"><i class="iconsprite icon-contract-out"></i>退出</a>
        </div>
      </div>
    </header>
    <div class="row sidebar">
      <div class="sidebar-item-top-div sidebar-item-new sidebar-item-contact" @click="showIframe()"></div>
    </div>
  </div>
</template>

<script>
import loginMixins from '~/mixins/login-mixins'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      scrollLeft: 0
    }
  },
  mixins: [loginMixins],
  computed: {
    ...mapState({
      user: state => state.user
    }),
  },
  mounted () {
    window.document.addEventListener("scroll", this.scroll);
  },
  watch: {
  },
  methods: {
    onLogout() {
      this.$lx.loading.start();
      this.logout(`${location.protocol}//${location.host}/saas/login`);
      setTimeout(()=>{
        this.resetExpTime(-1);
        this.$store.state.sessionId = '';
        this.$lx.loading.finish();
        this.$router.push({ path: '/login' });
      }, 4000);
    },
    scroll() {
      this.scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
    },
    showIframe(){
      window.open("http://p.qiao.baidu.com/cps/chat?siteId=9393396&userId=18279786");
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.head-b{
  @include responsive-default {
    .header-contract{
      top:0;
      height: 50px;
      background: #3f82ff;
      line-height: 50px;
      position: fixed;
      overflow: hidden;
      width: 100%;
      min-width: 1200px;
      z-index: 1;
      .container{
        .logo-link{
          width: 160px;
          height: 45px;
          background: url(~assets/img/src/common/logo-c.png) no-repeat;
          display: inline-block;
          position: relative;
          top: 8px;
          left: 15px;
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          transition: all .3s;
        }
        .link{
          color: #fff;
          display: inline-block;
          font-size: 14px;
          margin-left: 100px;
          position: relative;
        .iconsprite{
          position: absolute;
          top: 15.5px;
          left: -40px;
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
  }

}
</style>

