<template>
  <div class="sectionInner">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage'}">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>密保设置</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="user-home-h">
      <div class="row align-center question-pad-h" id="div_check"  >
        <!--手机验证码 -->
        <div v-show="next === true">
          <header class="modifymobile-icon"></header>
          <section style="width: 450px;display: inline-block;">
            <lvx-form  :model="ruleForm1" :rules="rules1" ref="ruleForm1" status-icon class="ruleForm" @submit.native.prevent>
              <lvx-form-item>
                <!-- <lvx-input v-model="hehe" disabled auto-complete="off" class="fl inputwidth"></lvx-input> -->
                <lvx-input v-model="proMobile" disabled auto-complete="off" class="fl inputwidth"></lvx-input>
                <sas-button category="primary" @click="getOldAuthCode" class="fl mar-left button-height text-center">{{buttontext}}</sas-button>
              </lvx-form-item>
              <lvx-form-item prop="authCode1">
                <lvx-input v-model="ruleForm1.authCode1"></lvx-input>
              </lvx-form-item>
            </lvx-form>
          </section>
        </div>
        <!--重置密保 -->
        <div class="row" v-show="next === false">
          <div class="row">
            <div class="row display-inline">
              <i class="iconsprite icon-modifymobile"></i>
              <p style="font-size: 12px;"><b>密保设置</b></p>
            </div>
          </div>
          <section style="width: 450px;display: inline-block;">
            <lvx-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" status-icon class="ruleForm" @submit.native.prevent>
              <lvx-form-item prop="qid1">
                <lvx-select v-model="ruleForm2.qid1">
                  <lvx-option
                    v-for="item in optionlist"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id">
                  </lvx-option>
                </lvx-select>
              </lvx-form-item>
              <lvx-form-item prop="answer1">
                <sas-input :model.sync="ruleForm2.answer1" placeholder="请输入上面问题的答案"></sas-input>
              </lvx-form-item>
              <lvx-form-item prop="qid2">
                <lvx-select v-model="ruleForm2.qid2">
                  <lvx-option
                    v-for="item in optionlist"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id">
                  </lvx-option>
                </lvx-select>
              </lvx-form-item>
              <lvx-form-item prop="answer2">
                <sas-input :model.sync="ruleForm2.answer2" placeholder="请输入上面问题的答案"></sas-input>
              </lvx-form-item>
              <lvx-form-item prop="qid3">
                <lvx-select v-model="ruleForm2.qid3">
                  <lvx-option
                    v-for="item in optionlist"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id">
                  </lvx-option>
                </lvx-select>
              </lvx-form-item>
              <lvx-form-item prop="answer3">
                <sas-input :model.sync="ruleForm2.answer3" placeholder="请输入上面问题的答案"></sas-input>
              </lvx-form-item>
            </lvx-form>
          </section>
        </div>
        <footer class="row question-bor-h">
          <sas-button category="primary" @click="changeForm('ruleForm1')" v-if="next === true" class="align-center">验证</sas-button>
          <sas-button category="primary" @click="submitMobile('ruleForm2')" v-else class="align-center">重置密保</sas-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  export default{
    name:'modifyMobile',
    layout: 'manager',
    extends:base,
    metaInfo: {
      title: "密保设置—云合同",
    },
    data(){
      var validateqid1 = (rule, value, callback) => {
        if(this.ruleForm2.qid2 == value || this.ruleForm2.qid3 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      var validateqid2 = (rule, value, callback) => {
        if(this.ruleForm2.qid1 == value || this.ruleForm2.qid3 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      var validateqid3 = (rule, value, callback) => {
        if(this.ruleForm2.qid1 == value || this.ruleForm2.qid2 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      return {
        next: true,
        buttontext: '获取校验码',
        ruleForm1:{
          authCode1:''
        },
        rules1:{
          authCode1:[
            { required: true, message: '验证码必填', trigger: 'blur' }
          ]
        },
        ruleForm2:{
          qid1: 1,
          qid2: 1,
          qid3: 1,
          answer1: '',
          answer2: '',
          answer3: '',
        },
        rules2:{
          qid1: [
            { validator: validateqid1, trigger: 'change' }
          ],
          qid2: [
            { validator: validateqid2, trigger: 'change' }
          ],
          qid3: [
            { validator: validateqid3, trigger: 'change' }
          ],
          answer1: [
            { required: true, message: '答案1不能为空', trigger: 'blur' }
          ],
          answer2: [
            { required: true, message: '答案2不能为空', trigger: 'blur' }
          ],
          answer3: [
            { required: true, message: '答案3不能为空', trigger: 'blur' }
          ]
        },
      }
    },
    async fetchData(to, context){
      let self = context;
      const oldMobile = await self.$axios.get(apis.getQuestionAndCell).then((res) => res.data.data);
      self.$store.state.Mobile.proMobile = oldMobile.cellNum;
      self.$store.state.Mobile.RProoptionlist = oldMobile.question;
    },
    mounted(){
    },
    computed:{
      ...mapState({
        proMobile: state => state.Mobile.proMobile,
        optionlist: state => state.Mobile.RProoptionlist,
      })
    },
    methods:{
      async submitMobile(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            let data = {
              qid1: this.ruleForm2.qid1,
              answer1: this.ruleForm2.answer1,
              qid2: this.ruleForm2.qid2,
              answer2: this.ruleForm2.answer2,
              qid3: this.ruleForm2.qid3,
              answer3: this.ruleForm2.answer3
            };
            const r  = await this.$axios.post(apis.editPwdProtect, data).then((res)=>res.data);
            if(r.success) {
              this.$createMessage({
                type:'success',
                duration:3000,
                spinnerText: '重置成功'
              });
              this.$router.push({path: '/manage/user/manage/userManage'})
            } else {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: r.msg
              })
            }
          } else {
            return false;
          }
        });
      },
      async changeForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get(apis.checkEditPwdProtectionMessage, {
              params: {
                authCode: this.ruleForm1.authCode1
              }
            }).then((res)=>{
              if(!res.data.success){
                //swal("重新发送", datas.msg, "warning");
                this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:res.data.msg
                })
              } else{
                this.next = false;
              }
            })
          } else {
            return false;
          }
        });
      },
      async getOldAuthCode(){
        if(this.proMobile.length == 11){
          if(this.buttontext == '重新发送' || this.buttontext == '获取校验码') {
            const r = await this.$axios.get(apis.sendeditPwdProtectMessage).then((res)=>res.data);
            if(r.success) {
              let total = 60;
              let st = setInterval(()=> {
                total--;
                this.buttontext = `${total}s后可以重新发送`;
                if(total <= 0){
                  window.clearInterval(st);
                  this.buttontext = '重新发送';
                }
              }, 1000)
            } else {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: r.msg
              });
            }
          }
        }else{
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:'手机格式不对'
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .lvx-select{width: 100%;}
  .sectionInner{
    @media (max-width: 1366px) {
      .lvx-form-item{margin-bottom: 15px;}
    }
  }
</style>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  $borderLine:#b9c5dd;
  @media (max-width: 1366px) {
    .user-home-h{
      min-height: calc(100% - 52px);
    }
    .signature-bg{height: 410px;}
  }
  .sectionInner{
    @include responsive-default {
      margin: 0 auto;
      font-size:$font-size-title;
      height: 92%;
      .user-home-h{
        min-height: 100%;
        margin-top: 20px;
        border: 1px solid #B9C5DD;
        padding-top: 10px;
        background-color: $white;
        .align-center{text-align: center;}
        .display-inline{display: inline-block;}
        .icon-modifymobile{
          display: block;
          width: 38px;
          height: 40px;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -5px -83px;
        }
        .modifymobile-icon{
          display: block;
          width: 38px; height: 48px;
          margin: 0px 50%;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -5px 0;
          position: relative;
          &::after{
            content: '验证手机';
            width: 100px;
            height: 82px;
            line-height: 20px;
            font-size: 12px;
            font-weight: 600;
            position: absolute;
            top: 50px;
            left: -30px;
          }
        }
        .modifypassword-icon{
          display: block;
          width: 38px; height: 38px;
          margin: 0px 50%;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -5px -83px;
        }
        .font-weight-h{font-weight: 600;}
        .fl{float:left;}
        .inputwidth{width: 65%;}
        /*.ruleForm{margin-top: 50px;}*/
        .mar-left{margin-left: 5%;}
        .button-height{
          padding: 0;
          text-align: center;
          margin-top: 4px;
          height: 32px;
          line-height: 8px;
          width: 30%;
        }
        .question-bor-h{border-top: 1px solid $borderLine; padding: 4vh 0;}
      }
    }

  }

</style>
