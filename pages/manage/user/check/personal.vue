<template>
  <div class="user-check-person">
    <sas-breadcrumb class="breadcLeft">
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage'}">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>个人认证</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="container-content-padding">
      <div slot="label" class="title_label posiTop" v-show="activeName == 'second'">
        请提交您的实名认证信息
        <div class="errorinfo" v-if="errorRed">{{ errorRed }}</div>
      </div>
      <div id="padding-main">
        <!--<div  class="fail-message sas-align-center" v-if="userCertifization.reserve1">
          <i class="icon iconfont lvx-icon-error1"></i>
          失败原因：{{userCertifization.reserve1}}
        </div>-->

        <lvx-tabs v-model="activeName" class="tabs-width" :class="activeName == 'third' ? 'noneBackground' : ''">
           <lvx-tab-pane class="margin-top" name="first" :disabled="activeName != 'first'">
             <div slot="label" class="title_label" v-show="activeName == 'first'">
               请提交您的实名认证信息
               <div class="errorinfo" v-if="errorOne">{{ errorOne }}</div>
             </div>

              <personalbase @after-next="toStength" @after-success="nextSuccess"/>
            </lvx-tab-pane>
            <lvx-tab-pane  class="margin-top" name="second" :disabled="activeName != 'second'">
              <!--<div slot="label" class="sas-align-center"><i :class="['tab-index', activeName == 'second' ? 'tab-index-active' : '']">2</i>增强信息认证</div>-->
              <personalstreng @after-pre="toBase" @next-type="nextypeShow"/>

            </lvx-tab-pane>
            <lvx-tab-pane  class="margin-top" name="third" :disabled="activeName != 'third'">
              <!--<div slot="label" class="sas-align-center"><i class="tab-index">3</i>提交后台审核</div>-->
              <div class="thirdCenter">
                <div class="threidImgWrap">
                  <i v-if="myType == 'success'" class="lvx-icon-success"></i>
                  <img v-else v-imgerror src="~/assets/img/src/sh-icon.png" alt="">

                </div>
                <div v-if="myType == 'success'">恭喜您顺利通过个人实名认证</div>
                <div v-else>在工作时间内，大概会在30分钟内完成人工审核，请仔细留意</div>
                <div class="sm-info">{{ timesL }}s后为您自动返回首页...</div>
                <lvx-button type="primary" @click="goIndex">返回首页</lvx-button>
              </div>
            </lvx-tab-pane>

        </lvx-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import personalbase from '~/components/check/personal-base'
  import personalstreng from '~/components/check/personal-strengthen'
  import apis from '~/config/api'
  let interFun;
  export default {
    name: 'user-check-person',
    layout: 'manager',
    metaInfo: {
      title: '实名认证--云合同'
    },
    data () {
      return {
        myType: this.$route.query.myType || '',
        activeName: {0: 'first', 1: 'second',2:'third'}[this.$route.query.tab],
        errorRed: '',
        errorOne: '',
        timesL: 3
      }
    },
    beforeRouteUpdate (to, from, next) {

      if(to.query.tab === '0'){
        this.activeName = 'first';
        // this.$router.push({path: '/manage/user/check/personal', query: {tab: 0}});
      } else if (to.query.tab === 1) {
        this.activeName = 'second';
        // this.$router.push({path: '/manage/user/check/personal', query: {tab: 1}});
      }else if (to.query.tab === 2) {
        this.activeName = 'third';
        this.myType = to.query.myType;
        // this.$router.push({path: '/manage/user/check/personal', query: {tab: 2}});
      }
      next()
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    computed: {
     /* ...mapState({
        userCertifization: state => state.User.Check.Personal.userCertifization
      })*/
    },
    watch: {
    },
    activated() {

    },
    created() {
    },
    mounted () {
      if(this.$route.query.tab == 2) {
        this.settingFun()
      }

    },
    methods: {


      /*3秒倒计时*/
      settingFun() {

        interFun = setInterval(() => {
          if ((--this.timesL) <= 0) {
            clearInterval(interFun);
            // this.timesL = 0;
            this.$router.push({path: '/manage'});
            return false
          }
        }, 1000)
      },

      /*成功跳转 自动认证*/
      nextSuccess() {
        this.activeName = 'third';
        this.$router.push({path: '/manage/user/check/personal', query: {tab: 2,'myType':'success'}});
        this.settingFun();
      },

      /*自动认证 错误*/
      toStength( errorinfo ) {
        if( errorinfo ){
          this.errorOne = errorinfo
        }else {
          this.activeName = 'second';
          this.$router.push({path: '/manage/user/check/personal', query: {tab: 1}});
        }
      },
      toBase() {
        this.activeName = 'first';
      },
      nextypeShow( errorinfo ) {

        if( errorinfo ){
          this.errorRed = errorinfo
        } else {

          this.activeName = 'third';
          this.$router.push({path: '/manage/user/check/personal', query: {tab: 2,'myType':'wait'}});
          this.settingFun();
        }

      },
      goIndex() {
        this.$router.push({path: '/manage'});
      }
    },
    components: {
      'personalbase': personalbase,
      'personalstreng': personalstreng,
    }
  }
</script>
<style lang="scss">
  .noneBackground{
    .lvx-tabs__nav{
      background: #fff;
    }
  }
.user-check-person{
  .lvx-tabs{
    .lvx-tabs__nav{
      width: 100%;
      .lvx-tabs__item{
        width: 33.33%;
      }
    }
  }
}
.tabs-width{
  .lvx-tabs__active-bar{
    background: none;
  }
  .lvx-tabs__item{
    height:auto;
  }
}
</style>
<style lang="scss"  scoped >
@import "~styles/base.scss";
.lvx-icon-success{
  font-size: 130px;
  color:#67c23a;
}
.title_label{
  color:#333;
  font-size: 16px;
  line-height: normal;
  padding:12px 0px 12px 26px;
  .errorinfo{
    color:#F04134;
    font-size: 14px;
  }
}
.posiTop{
  position: absolute;
  background: #fff;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #e2e2e2;
  top: 0;
}
.thirdCenter{
  text-align: center;
  margin-top:100px;
  .threidImgWrap{
    padding-bottom: 58px;
  }
  .sm-info{
    color:#666;
    padding: 19px 0px 40px 0px;
  }
}
.user-check-person{
  @include responsive-default {
    .container-content-padding{
      position: relative;
    }
     #padding-main {
      background-color: #fff;
      width: 100%;
      height: calc(100vh - 120px);
      overflow-y: auto;
      margin-top: 12px;
       /*position: relative;*/
      .fail-message{
        padding-top: 8px;
        .lvx-icon-error1{
          color: $red-color;
        }
      }
    }
    .tab-index{
      width: 20px;
      height: 20px;
      background-color: #E7ECF6;
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
      padding: 0;
      .breadcLeft{
        padding-left: 20px;
      }
    }

  }
  .sas-align-center{
    display: inline-block;
  }

}

</style>
