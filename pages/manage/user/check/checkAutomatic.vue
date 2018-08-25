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
        <lvx-step title="打款验证" icon="lvx-icon-upload"><i slot="icon" class="iconsprite icon-play-money"></i></lvx-step>
        <lvx-step title="认证结果" icon="lvx-icon-service"><i slot="icon" class="iconsprite icon-result"></i></lvx-step>
      </lvx-steps>
    </div>
    <section>
      <div class="row form-title">
        请提交您的实名认证信息
        <div>{{msg}}</div>
      </div>
      <div class="row">
        <lvx-col :span="12">
          <lvx-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <lvx-form-item label="企业名称：" prop="name">
              <lvx-input v-model="ruleForm.name" placeholder="请输入企业名称"></lvx-input>
            </lvx-form-item>
            <lvx-form-item label="证件类型：" prop="type">
              <lvx-radio v-model="ruleForm.type" label="1">统一社会信用代码</lvx-radio>
              <lvx-radio v-model="ruleForm.type" label="2">组织机构代码</lvx-radio>
            </lvx-form-item>
            <lvx-form-item label="证件号：" prop="number">
              <lvx-input v-model.trim="ruleForm.number" placeholder="请输入证件号码"></lvx-input>
            </lvx-form-item>
            <lvx-form-item label="法人姓名：" prop="legalPerson">
              <lvx-input v-model.trim="ruleForm.legalPerson" placeholder="请输入法人姓名"></lvx-input>
            </lvx-form-item>
            <lvx-form-item>
              <lvx-button type="primary" disabled v-if="ruleForm.name == '' || ruleForm.number == '' || ruleForm.legalPerson == ''">提交审核</lvx-button>
              <lvx-button type="primary" @click="onSubmit('ruleForm')" v-else>提交审核</lvx-button>
            </lvx-form-item>
            <lvx-form-item>
              <div class="doorlink"><i class="iconsprite icon-question" style="margin-right: 5px;"></i>若认证不成功，请试试<span class="streng" @click="goStreng">人工认证</span></div>
            </lvx-form-item>
          </lvx-form>
        </lvx-col>
      </div>
    </section>
  </div>
</template>

<script>
  import apis from "~/config/api";
  import {
    required,
    minLength,
    maxLength,
    between
  } from "vuelidate/lib/validators";
  export default {
    name: "companyCertify",
    metaInfo: {},
    data() {
      return {
        active: 1,
        lineType: "dashed",
        ruleForm: {
          name: "",
          type: "1",
          number: "",
          legalPerson: ""
        },
        msg: ""
      };
    },
    created() {},
    computed: {},
    watch: {},
    mounted() {
      // this.toUrl();
      // this.$route.query.tab
    },
    methods: {
      toUrl() {
        let self = this;
        self.$axios({
          method: "GET",
          url: "/stamp/company/authentic/status",
          headers: { token: localStorage.getItem("validFlag") }
        })
          .then(function(res) {
            if (res.data.code == 200) {
              if (res.data.data.authenticStatus == 0) {
                self.$router.push("/company-certify");
              }
              if (res.data.data.authenticStatus == 1) {
                self.getInfo();
              }
              if (res.data.data.authenticStatus == 2) {
                self.$router.push("/company-certify/checkMoney");
              }
              if (res.data.data.authenticStatus == 3) {
                self.$router.push("/contract-manage");
              }
              if (res.data.data.authenticStatus == 4) {
                sessionStorage.setItem('errMsg','');
                self.$router.push("/company-certify/certifyFile");
              }
            } else if (res.data.code == 450) {
              self.$router.push("/contract-manage");
            }
          });
      },
      getInfo() {
        let self = this;
        const promise = new Promise(function(resolve, reject) {
          self
            .$axios({
              method: "GET",
              url: "/stamp/company/authentic/info"
            })
            .then(function(res) {
              if (res.data.code == 200) {
                sessionStorage.setItem("name", res.data.data.companyName);
                self.$router.push("/manage/user/check/playMoney");
              }
            });
        });
        return promise;
      },

      /*跳手动人工*/
      goStreng() {
        this.$router.push({path:'/manage/user/check/company',query:{'tab': 0}})
      },

      onSubmit(formName) {
        var companyName = this.ruleForm.name;
        var authType = parseInt(this.ruleForm.type);
        var authNo = this.ruleForm.number;
        var legalPerson = this.ruleForm.legalPerson;
        if (companyName.length > 60) {
          this.msg = "企业名称过长";
        }
        if (authNo.length > 18) {
          this.msg = "证件号格式错误";
        }
        if (legalPerson.length > 25) {
          this.msg = "法人姓名过长";
        } else {
          let self = this;
          /*let data = {
            companyName: companyName, //企业名称
            creditCode: authNo,//企业证件号
            legalPersonName: legalPerson, //法人姓名
            // personPhone:'',//银行预留手机号
            // smsCode: this.ruleForm.type, //统一社会信用代码or组织机构代码
          }*/
          // this.$axios.post(apis.companyInfoCompare, data).then()
          const promise = new Promise(function(resolve, reject) {
            self
              .$axios({
                method: "post",
                url: apis.companyInfoCompare,
                data: {
                  companyName: companyName, //企业名称
                  creditCode: authNo,//企业证件号
                  legalPersonName: legalPerson, //法人姓名
                  // personPhone:'',//银行预留手机号
                  // smsCode: this.ruleForm.type, //统一社会信用代码or组织机构代码
                }
              })
              .then(function(res) {
                if (res.data.code == 200) {
//                   sessionStorage.setItem("name", companyName);
                  self.$router.push({ path: `/manage/user/check/playMoney` });
                } else {
                  self.msg = res.data.msg;
                }
              });
          });
          return promise;
        }
      }
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
    padding: 20px;
    position: relative;
    .form-title {
      border-bottom: 1px solid #e9e9e9;
      font-weight: 600;
      font-size: 16px;
      div {
        height: 22px;
        color: #f04134;
        font-size: 14px;
      }
    }
    form {
      margin-top: 30px;
    }
  }
  .doorlink{
    color:#999;
    .streng{
      color:#4081FF;
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
<style lang="scss">
  .demo-content{
    .step {
      margin: 20px 10%;
     .lvx-step__icon {background-color: #e8ecf0;}
      .lvx-step__title.is-process{color: #b4bccc; font-weight:400;}
      .lvx-step__title{font-size: 12px;}
    }
  }

</style>
