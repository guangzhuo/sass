<template>
  <div class="sectionInner">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage'}">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>密保设置</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="user-home-h">
      <div class="row align-center question-pad-h" id="div_check"  >
        <div style="background-color: #fff">
          <div class="row">
            <div class="row display-inline">
              <i class="iconsprite icon-modifymobile"></i>
              <p style="font-size: 12px;"><b>密保设置</b></p>
            </div>
          </div>
          <div class="row">
            <section class="display-inline" style="width: 450px;">
              <lvx-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" status-icon class="ruleForm" @submit.native.prevent>
                <lvx-form-item prop="qid1">
                  <lvx-select v-model="ruleForm1.qid1">
                    <lvx-option
                      v-for="item in optionlist"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id">
                    </lvx-option>
                  </lvx-select>
                </lvx-form-item>
                <lvx-form-item prop="answer1">
                  <lvx-input v-model="ruleForm1.answer1" auto-complete="off" placeholder="请输入上面问题的答案" ></lvx-input>
                </lvx-form-item>
                <lvx-form-item prop="qid2">
                  <lvx-select v-model="ruleForm1.qid2">
                    <lvx-option
                      v-for="item in optionlist"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id">
                    </lvx-option>
                  </lvx-select>
                </lvx-form-item>
                <lvx-form-item prop="answer2">
                  <lvx-input v-model="ruleForm1.answer2" auto-complete="off" placeholder="请输入上面问题的答案" ></lvx-input>
                </lvx-form-item>
                <lvx-form-item prop="qid3">
                  <lvx-select v-model="ruleForm1.qid3">
                    <lvx-option
                      v-for="item in optionlist"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id">
                    </lvx-option>
                  </lvx-select>
                </lvx-form-item>
                <lvx-form-item prop="answer3">
                  <lvx-input v-model="ruleForm1.answer3" auto-complete="off" placeholder="请输入上面问题的答案" ></lvx-input>
                </lvx-form-item>
              </lvx-form>
            </section>
            <footer class="question-bor-h">
              <sas-button category="primary" @click="submitPwd('ruleForm1')"  class="align-center">设置密保</sas-button>
            </footer>
          </div>
        </div>
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
        if(this.ruleForm1.qid2 == value || this.ruleForm1.qid3 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      var validateqid2 = (rule, value, callback) => {
        if(this.ruleForm1.qid1 == value || this.ruleForm1.qid3 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      var validateqid3 = (rule, value, callback) => {
        if(this.ruleForm1.qid1 == value || this.ruleForm1.qid2 == value) {
          callback(new Error('问题不能相同'));
        } else {
          callback();
        }
      };
      return {
      //  optionlist:[],
        ruleForm1:{
          qid1: 1,
          qid2: 1,
          qid3: 1,
          answer1: '',
          answer2: '',
          answer3: '',
        },
        rules1:{
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
            { required: true, message: '答案1格式不对', trigger: 'blur' }
          ],
          answer2: [
            { required: true, message: '答案2格式不对', trigger: 'blur' }
          ],
          answer3: [
            { required: true, message: '答案3格式不对', trigger: 'blur' }
          ]
        },
      }
    },
    async fetchData (to, context){
      let self = context;
      const quesoption = await self.$axios.get(apis.getQuestion).then((res)=>res.data);
      self.$store.state.Mobile.Addoptionlist = quesoption.data;
    },
    computed:{
      ...mapState({
        optionlist: state => state.Mobile.Addoptionlist,
      })
    },
    mounted(){

    },
    methods:{
      async submitPwd(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let data = {
              qid1: this.ruleForm1.qid1,
              answer1: this.ruleForm1.answer1,
              qid2: this.ruleForm1.qid2,
              answer2: this.ruleForm1.answer2,
              qid3: this.ruleForm1.qid3,
              answer3: this.ruleForm1.answer3
            };
            const r = await this.$axios.post(apis.addPwdProtect, data).then((res)=>res.data);
            if(r.success) {
              this.$createMessage({
                type:'success',
                duration:3000,
                spinnerText: '设置成功'
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
      height: calc(100% - 52px);
    }
    .signature-bg{height: 410px;}
  }
  .sectionInner{
    @include responsive-default {
      margin: 0 auto;
      font-size:$font-size-title;
      min-height: 90%;
      .user-home-h{
        height: 100%;
        margin-top: 20px;
        border: 1px solid #B9C5DD;
        padding-top: 10px;
        background-color: $white;
        .question-pad-h{padding: 5% 0}
        @media (max-width: 1366px) {
          .question-pad-h{padding: 0}
        }
        .align-center{text-align: center;}
        .display-inline{display: inline-block;}
        .icon-modifymobile{
          display: block;
          width: 38px;
          height: 40px;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -5px -83px;
        }
        .font-weight-h{font-weight: 600;}
        .fl{float:left;}
        .inputwidth{width: 65%;}
        .mar-left{margin-left: 30px;}
        .button-height{
          margin-top: 4px;
          height: 32px;
          line-height: 13px;
        }
        .question-bor-h{border-top: 1px solid $borderLine; padding: 4vh 0;}
      }
    }
  }
</style>
