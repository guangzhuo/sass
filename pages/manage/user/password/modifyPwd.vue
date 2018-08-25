<template>
  <div class="sectionInner">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage'}">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>修改密码</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row user-home-h">
      <div class="row align-center question-pad-h" id="div_check"  >
        <div class='row' id="div_check_old_mobile">
          <header class="modifymobile-icon"></header>
          <section style="width: 450px;display: inline-block;">
            <lvx-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" status-icon class="ruleForm" @submit.native.prevent>
              <lvx-form-item prop="oldPwd">
                <lvx-input  size="small" v-model="ruleForm1.oldPwd" placeholder="请输入原始密码" type="password"></lvx-input>
              </lvx-form-item>
              <lvx-form-item prop="newPwd">
                <lvx-input  size="small" v-model="ruleForm1.newPwd" placeholder="请输入新密码" type="password"></lvx-input>
              </lvx-form-item>
              <lvx-form-item prop="conPwd">
                <lvx-input  size="small" v-model="ruleForm1.conPwd" placeholder="确认新密码" type="password"></lvx-input>
              </lvx-form-item>
            </lvx-form>
          </section>
          <footer class="row question-bor-h">
            <sas-button category="primary" @click="submitPwd('ruleForm1')"  class="align-center">提交修改</sas-button>
          </footer>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  export default{
    name:'modifyPwd',
    layout: 'manager',
    extends:base,
    metaInfo: {
      title: "修改密码—云合同",
    },
    data(){
      const isPwd = (rule, value, callback)=>{
        let pwdvaild =  /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d~`!@#$%\^\&\*\(\)\_\+\|\\\=\-\}\{\]\[\"\:\'\;\?\>\<\/\.,]/;
        let re = /[^\S]+/;
        let special =/[，\s_'’‘\"”“|\\~#$@%^&*!。;\/<>\?？]/;
        if(special.test(value) || re.test(value)){
          callback(new Error('密码格式错误'));
        }else{
          if(pwdvaild.test(value)){
            callback();
          }else{
            callback(new Error('密码不能为纯数字或纯字母'));
          }
        }
      };

      const isconPwd = (rule, value, callback)=>{
        if(value){
          if(value == this.ruleForm1.newPwd){
            callback();
          }else{
            callback(new Error('两次密码不一致'));
          }
        }else{
            callback(new Error('请再次输入密码'));
        }
      };

      return {
        ruleForm1:{
          oldPwd:'',
          newPwd:'',
          conPwd:'',
        },
        rules1:{
          oldPwd:[
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { validator: isPwd, trigger: 'blur' },
            { min: 8, max: 16, message: '密码为8~16位数字、字母组成的字符串', trigger: 'blur' },
          ],
          newPwd:[
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: isPwd, trigger: 'blur' },
            { min: 8, max: 16, message: '密码为8~16位数字、字母组成的字符串', trigger: 'blur' },
          ],
          conPwd:[
            { validator: isconPwd, trigger: 'blur' },
          ],
        },
      }
    },
    mounted(){

    },
    methods:{
      async submitPwd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm1.oldPwd === this.ruleForm1.newPwd){
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'新密码与旧密码一致'
              })
              return false;
            }
            let { oldPwd, password } = { oldPwd:this.ruleForm1.oldPwd, password:this.ruleForm1.newPwd };
            const _this = this;
            const promise = new Promise((resolve, reject)=>{
              _this.$axios.post(`${apis.modifyPwd}`, {
                oldPwd, password
              }).then((res)=>{
                if(!res.data.success){
                  //swal("重新发送", datas.msg, "warning");
                  _this.$createMessage({
                    type:'error',
                    duration:3000,
                    spinnerText: res.data.msg
                  })
                  reject(res.data.msg)
                } else{
                  _this.$createMessage({
                    type:'success',
                    duration:3000,
                    spinnerText:'修改成功'
                  });
                  this.$router.push({path: '/manage/user/manage/userManage'});
                  resolve()
                  //lx.util.countDownButton('#bt_getOldAuthCode',60,1,'s后可以重新发送','重新发送');
                }
              })
            })
            return promise
          } else {
            return false;
          }
        });
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/base.scss";
  $borderLine:#b9c5dd;
  .sectionInner{
    @include responsive-default {
      margin: 12px auto;
      font-size:$font-size-title;
      height: 95%;
      .user-home-h{
        min-height: 100%;
        margin-top: 20px;
        border: 1px solid #B9C5DD;
        padding-top: 10px;
        background-color: $white;
        .question-pad-h{padding: 5% 0}
        .align-center{text-align: center;}
        .display-inline{display: inline-block;}
        .modifymobile-icon{
          display: block;
          width: 38px; height: 40px;
          margin: 0px 50%;
          background: rgba(0, 0, 0, 0) url("~assets/img/src/mobile/password-icon.png") no-repeat scroll  -6px -45px;
          position: relative;
          &::after{
            content: '修改登录密码';
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
        .mar-left{margin-left: 30px;}
        .button-height{
          margin-top: 4px;
          height: 32px;
          line-height: 13px;
        }
        .question-bor-h{border-top: 1px solid $borderLine; padding: 4vh 0;}
      }
      @media (max-width: 1366px) {
        .user-home-h{
          min-height: calc(100% - 52px);
        .question-pad-h{padding: 20px 0 0}
      }
      .signature-bg{height: 410px;}
      }
    }
  }

</style>
