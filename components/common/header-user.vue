<template>
  <header class="header-user" :style="{backgroundColor: currentPath === '/login' || currentPath === '/register' || currentPath === '/securityAnswer' || currentPath === '/forgetPwd' || currentPath === '/resetPwd'? '#fff': null, 'boxShadow': currentPath === '/login'?'0 1px 1px rgba(0,0,0,.075)':null}">
    <div class="row">
      <div class="col-xs-6">
        <router-link to="/" >
            <img src="~/assets/img/src/common/logo-1-w.png" class="img-responsive user-home-header-logo-w" alt="云合同">
        </router-link>
      </div>
      <div  class="col-xs-6 regist-header-a" v-show="currentPath !== '/login'">
        <span class="regist_header_regist">已有账号，<span >
          <router-link to="/login" style="color:#4081ff;text-decoration: none;">直接登录 >></router-link>
          </span></span>
        <span class="regist_header_home"></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  mounted () {
  },

  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.header-user{
    @include responsive-default {
        box-shadow: 0 3px 1px rgba(0,0,0,.075);
        width: 100%;
        padding: 0 calc(50% - 600px);
        height: 67px;
        background: #f5f5f5;
        .user-home-header-logo-w{
            width: 282px;
            padding-top: 10px;
            box-shadow: none;
            border-bottom: 0;
            height: inherit;
        }
        .regist-header-a{
            text-align: right;
            height: 57px;
            line-height: 57px;
        }
    }
}
</style>

