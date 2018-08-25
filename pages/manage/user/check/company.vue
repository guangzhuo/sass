<template>
  <div class="check-company-wraper">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage'}">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>企业认证</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="container-content-padding">
      <div id="padding-main">
        <div  class="fail-message sas-align-center" v-if="companyCertifization.reserve1">
          <i class="icon iconfont lvx-icon-error1"></i>
          失败原因：{{companyCertifization.reserve1}}
        </div>
        <lvx-tabs v-model="activeName" class="tabs-width">
           <lvx-tab-pane class="margin-top" name="first" :disabled="activeName != 'first'">
              <span slot="label"><i :class="['tab-second', activeName == 'first' ? 'tab-index-active' : '']">1</i>基础信息认证</span>
              <companybase @after-next="toStength"/>
            </lvx-tab-pane>
            <lvx-tab-pane  class="margin-top" name="second" :disabled="activeName != 'second'">
              <span slot="label"><i :class="['tab-second', activeName == 'second' ? 'tab-index-active' : '']">2</i>增强信息认证</span>
              <companystreng @after-pre="toBase"/>
            </lvx-tab-pane>
            <lvx-tab-pane  class="margin-top" name="third" disabled>
              <span slot="label"><i class="tab-second">3</i>提交后台审核</span>

            </lvx-tab-pane>

        </lvx-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import companybase from '~/components/check/company-base'
  import companystreng from '~/components/check/company-strengthen'

  export default {
    name: 'user-check-personal',
    layout: 'manager',
    metaInfo: {
      title: '实名认证--云合同'
    },
    data () {
      return {
        activeName: {0: 'first', 1: 'second'}[this.$route.query.tab],
      }
    },
    async fetchData(to, context) {
      let self  = context;
      const r = await self.$axios.get(apis.getCompanyBaseInfo).then((data)=>data.data);
      if(r.success) {
        self.$store.state.User.Check.Company.companyCertifization = r.data;
      }
    },
    computed: {
      ...mapState({
        companyCertifization: state => state.User.Check.Company.companyCertifization
      })
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      toStength() {
        this.activeName = 'second';
      },
      toBase() {
        this.activeName = 'first';
      }
    },
    components: {
      'companybase': companybase,
      'companystreng': companystreng,
    }
  }
</script>
<style lang="scss">
.check-company-wraper{
  .lvx-tabs{
    .lvx-tabs__nav{
      width: 100%;
      .lvx-tabs__item{
        width: 33.33%;
        text-align: center;
      }
    }
  }
  .lvx-tabs__content{
    overflow: initial;
  }
}

</style>
<style lang="scss"  scoped >
@import "~styles/base.scss";
.check-company-wraper{
  @include responsive-default {
     #padding-main {
      background-color: #fff;
      width: 100%;
      height: calc(100vh - 155px);
      overflow-y: auto;
      margin-top: 27px;
      .fail-message{
        padding-top: 8px;
        .lvx-icon-error1{
          color: $red-color;
        }
      }
    }
    .tab-second{
      width: 20px;
      height: 20px;
      background-color: #E7ECF6;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
      color: #C9CBCD;
      display: inline-block;
      line-height: 20px;
      text-align: center;
      font-style: normal;
    }
    .tab-index-active{
      color: #fff;
      background-color: $theme-color;
    }
    .tabs-width{
      padding: 0 45px;
    }
  }
}
</style>
