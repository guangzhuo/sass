<template>
  <div class="sectionInner">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage' }">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>绑定手机</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="user-home-h">
      <div class="row align-center question-pad-h" id="div_check"  >
        <div  id="div_check_old_mobile">
          <header class="modifymobile-icon"></header>
          <section style="width: 450px;display: inline-block;">
            <lvx-form v-show="next === true" :model="ruleForm1" :rules="rules1" ref="ruleForm1" status-icon class="ruleForm" @submit.native.prevent>
              <lvx-form-item>
                <lvx-input v-model="oldCellNum" disabled />
              </lvx-form-item>
              <lvx-form-item prop="authCode1">
                <div class="row">
                  <div class="col-xs-7">
                    <sas-input :model.sync="ruleForm1.authCode1"></sas-input>
                  </div>
                  <div class="col-xs-5">
                    <sas-button category="primary" size="medium" @click="getOldAuthCode">{{ buttontext1 }}</sas-button>
                  </div>
                </div>
              </lvx-form-item>
            </lvx-form>

            <lvx-form v-show="next === false" :model="ruleForm2" :rules="rules2" ref="ruleForm2" status-icon class="ruleForm">
              <lvx-form-item prop="cellNum">
                <sas-input :model.sync="ruleForm2.cellNum"  placeholder="请输入新的手机号码"></sas-input>
              </lvx-form-item>
              <lvx-form-item prop="authCode2">
                <div class="row">
                  <div class="col-xs-7">
                    <sas-input :model.sync="ruleForm2.authCode2" placeholder="请输入校验码"></sas-input>
                  </div>
                  <div class="col-xs-5">
                    <sas-button category="primary" size="medium" @click="getNewAuthCode" >{{ buttontext2 }}</sas-button>
                  </div>
                </div>
              </lvx-form-item>
            </lvx-form>
          </section>
          <footer class="question-bor-h">
            <sas-button category="primary" @click="changeForm('ruleForm1')" v-if="next === true" class="align-center">下一步</sas-button>
            <sas-button category="primary" @click="submitMobile('ruleForm2')" v-else class="align-center">提交修改</sas-button>
          </footer>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  import apis from '~/config/api'
  export default{
    name:'modifyMobile',
    layout: 'manager',
    async fetchData(to, context){
      let self = context;
      const r = await self.$axios.get(apis.getQuestionAndCell).then((res) => res.data);
      self.$store.state.Mobile.oldMobile = r.data.cellNum;
    },
    metaInfo: {
      title: "绑定手机—云合同",
    },
    data(){
      const ismobile = (rule, value, callback)=>{
        let mobilevaild = /^[1][0-9]{10}$/g;
        if(value){
          //this.$refs.ruleForm2.cellNum
          if(mobilevaild.test(value)){
            if(value == this.oldCellNum) {
              return callback(new Error('修改的手机号跟旧手机号相同，无需修改'));
            } else {
              callback();
            }

          }else{
            return callback(new Error('手机号码格式不对'));
          }
        }else{
          return callback(new Error('手机号码必填'));
        }
      };

      return {
        next: true,
        buttontext1:'获取手机验证',
        buttontext2:'获取手机验证',
        // oldCellNum1: '',
        ruleForm1:{
          authCode1:''
        },
        rules1:{
          authCode1:[
            { required: true, message: '验证码必填', trigger: 'blur' }
          ]
        },
        ruleForm2:{
          cellNum: '',
          authCode2: ''
        },
        rules2:{
          cellNum:[
            { validator: ismobile, trigger: 'blur' }
          ],
          authCode2:[
            { required: true, message: '验证码必填', trigger: 'blur' },
          ]
        },
      }
    },
    watch: {

    },
    computed:{
      ...mapState({
        oldCellNum: state => state.Mobile.oldMobile,
      })
    },
    mounted(){

    },
    methods:{
      async submitMobile(formName){
        this.$refs[formName].validate(async (valid) => {
          if(valid) {
            const r = await this.$axios.post(apis.modifyMobile, {
              mobile: this.ruleForm2.cellNum,
              message: this.ruleForm2.authCode2
            }).then((res)=>res.data);
            if(r.success) {
              this.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:'修改成功'
              });
              this.$router.push({name: 'manage-user-manage-userManage'});
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
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const r = await this.$axios.post(apis.checkMobile, {
              mobile: this.oldCellNum,
              message: this.ruleForm1.authCode1
            }).then((res)=>res.data);
            if(r.success) {
              this.next = false;
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
      async getOldAuthCode(){
        if(this.oldCellNum.length == 11){
          if(this.buttontext1 == '获取手机验证' || this.buttontext1 == '重新发送') {
            const r = await this.$axios.post(apis.sendModifyMobileMessage, {
              mobile:this.oldCellNum
            }).then((res)=>res.data);
            if(r.success) {
              let total = 60;
              let st = setInterval(()=>{
                total--;
                this.buttontext1 = `${total}s后可以重新发送`;
                if(total <= 0){
                  window.clearInterval(st);
                  this.buttontext1 = `重新发送`;
                }
              },1000);
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
      },
      async getNewAuthCode(){
        this.$refs['ruleForm2'].validateField('cellNum', async (valid) => {
          if(!valid) {
            if(this.buttontext2 == '获取手机验证' || this.buttontext2 == '重新发送') {
              const r = await this.$axios.post(apis.sendModifyMobileMessage, {
                mobile:this.ruleForm2.cellNum
              }).then((res)=>res.data);
              if(r.success) {
                let total = 60;
                let st = setInterval(()=>{
                  total--;
                  this.buttontext2 = `${total}s后可以重新发送`;
                  if(total <= 0){
                    window.clearInterval(st);
                    this.buttontext2 = `重新发送`;
                  }
                },1000);
              } else {
                this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText: r.msg
                });
              }
            }
          }
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/base.scss";
  $borderLine:#b9c5dd;
  @media (max-width: 1366px) {
    .user-home-h{
      height: calc(100% - 52px);
    }
    .signature-bg{height: 410px;}
  }
  .sectionInner{
    @include responsive-default {
      margin: 12px auto;
      font-size:$font-size-title;
      height: 90%;
      .user-home-h{
        height: 100%;
        margin-top: 20px;
        border: 1px solid #B9C5DD;
        padding-top: 10px;
        background-color: $white;
        .question-pad-h{padding: 5% 0}
        .align-center{text-align: center;}
        .display-inline{display: inline-block;}
        .modifymobile-icon{
          display: block;
          width: 38px; height: 48px;
          margin: 0px 50%;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -5px 0;
          position: relative;
          &::after{
            content: '修改绑定手机';
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
        .font-weight-h{font-weight: 600;}
        .fl{float:left;}
        .inputwidth{width: 65%;}
        .ruleForm{margin-top: 50px;}
        .mar-left{margin-left: 5%;}
        .button-height{
          margin-top: 4px;
          height: 32px;
          line-height: 10px;
          width: 30%;
        }
        .question-bor-h{border-top: 1px solid $borderLine; padding: 4vh 0;}
      }
    }

  }

</style>
