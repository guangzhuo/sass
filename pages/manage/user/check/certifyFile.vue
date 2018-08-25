<template>
    <div class="demo-content">
        <sas-breadcrumb >
          <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
          <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage' }">用户信息</sas-breadcrumb-item>
          <sas-breadcrumb-item>企业认证</sas-breadcrumb-item>
        </sas-breadcrumb>
        <div class="row step">
            <lvx-steps :active="active" align-center :line-type="lineType">
                <lvx-step title="信息录入" icon="lvx-icon-edit"><i slot="icon" class="iconsprite icon-message"></i></lvx-step>
                <lvx-step title="打款验证" icon="lvx-icon-upload"><i slot="icon" class="iconsprite icon-play-money-active"></i></lvx-step>
                <lvx-step title="认证结果" icon="lvx-icon-service"><i slot="icon" class="iconsprite icon-result-active"></i></lvx-step>
            </lvx-steps>
        </div>
        <section class="text-center">
            <div class="row">
                <i class="iconsprite icon-error"></i>
                <div class="row">
                    <p>抱歉！企业实名认证失败</p>
                    <p>{{msg}}</p>
                </div>
                <div class="row mar-top">
                    <sas-button category="primary" @click="toInfo" v-show="certifyNum != 2">重新申请</sas-button>
                    <sas-button category="secondary" @click="toManage">返回首页</sas-button>
                </div>
              <div class="row mar-top">
                <div class="doorlink"><i class="iconsprite icon-question" style="margin-right: 5px;"></i>若认证不成功，请试试<span class="streng" @click="goStreng">人工认证</span></div>
              </div>
            </div>
        </section>
    </div>
</template>

<script>
import apis from "~/config/api";

export default {
  name: "companyCertify",
  metaInfo: {},
  data() {
    return {
      active: 3,
      lineType: "dashed",
      success: false,
      msg: sessionStorage.getItem("errMsg"),
      certifyNum: sessionStorage.getItem('certifyNum')
    };
  },
  filters: {},
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    toInfo() {
      // let self = this;
      this.$router.push("/manage/user/check/playMoney");
     /* self
        .$axios({
          method: "GET",
          url: "/stamp/company/authentic/info"
        })
        .then(function(res) {
          if (res.data.code == 200) {
            sessionStorage.setItem("name", res.data.data.companyName);

          }
        });*/
    },
    /*跳手动人工*/
    goStreng() {
      this.$router.push({path:'/manage/user/check/company',query:{'tab': 0}})
    },
    /*跳首页*/
    toManage() {
      this.$router.push({path:'/manage'})
    },
  },
  components: {}
};
</script>

<style lang="scss"  scoped >
.step {
  margin: 20px auto;
}
section {
  min-height: calc(100vh - 300px);
  background: #fff;
  padding: 8vh 20px 8vh;
  position: relative;
  p:first-child {
    font-size: 16px;
    margin-top: 30px;
  }
  p:last-child {
    color: #959595;
    margin-top: 10px;
  }
  .mar-top {
    margin-top: 50px;
  }
  .doorlink{
    color:#999;
    .streng{
      color:#4081FF;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
<style lang="scss">
    .demo-content{
        .step {
          margin: 20px 10%;
          .lvx-step__icon {background-color: #e8ecf0;}
          .lvx-step__title{font-size: 12px;}
        }
     /* .mar-top{
        .lvx-button + .lvx-button{margin-left: 50px;}
      }*/
    }

</style>
