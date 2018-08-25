<template>
 <sas-dialog
    :show.sync="visible"
    title="密码验证"
    width="598px"
    class="swlogin-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <div class="form-panel">
        <p class="label-line">请输入账号<span class="text-username" v-text="loginId"></span>的密码</p>
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
          <lvx-form-item prop="password">
            <div class="box-pwd">
              <sas-input type="password" placeholder="请输入密码"  :model.sync="ruleForm.password"></sas-input>
            </div>
          </lvx-form-item>
          <lvx-form-item>
            <div class="action-panel clearfix">
              <div class="sas-float-left">
                <sas-button category="primary" class="btn" @click="onOk">确定</sas-button>
              </div>
              <div class="sas-float-right">
                <sas-button category="gray" class="btn" @click="onCancel">取消</sas-button>
              </div>
            </div>
          </lvx-form-item>
        </lvx-form>
      </div>
      
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
// import { getTGT, getST, logout, loginApp } from '~/mixins/mixins'
import loginMixins from '~/mixins/login-mixins'
export default {
  data () {
    return {
      visible: this.show,
      ruleForm: {
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  props: {
    show: Boolean,
    loginId: {
      type: String,
      required: true
    }
  },
  mounted () {
  },
  watch: {
    show () {
      this.visible = this.show;
    }
    
  },
  mixins: [loginMixins],
  methods: {
    onCancel() {
      this.$emit('update:show', false); 
    },
    onOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          // let loading = this.$createLoading({
          //   spinnerText: '正在切换,请稍等'
          // });
          this.$lx.loading.start();
          const token = await this.getTGT(this.loginId, this.ruleForm.password).then((token)=>token).catch((error)=>{
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'用户名或密码错误'
            });
            this.$lx.loading.finish();
            return ;
          });
          if(!token) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'用户名或密码错误'
            });
            this.$lx.loading.finish();
          } else {
            const r = await this.logout(`${location.protocol}//${location.host}/saas/login`);
            if(r.success) {
              const token1 = await this.getTGT(this.loginId, this.ruleForm.password).then((token)=>token);
              if(!token1) {
                // loading.close();
                this.$lx.loading.finish();
                this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:'用户名或密码错误'
                });
                this.$lx.loading.finish();
              } else {
                const sessionId = await this.getST(this.loginId, this.ruleForm.password, token1).then((sessionId)=>sessionId);
                if(!sessionId) {
                  // loading.close();
                  this.$lx.loading.finish();
                  this.$createMessage({
                    type:'error',
                    duration:3000,
                    spinnerText:'用户名或密码错误'
                  });
                  this.$lx.loading.finish();
                } else {
                  const r = await this.loginApp(1, sessionId);
                  // loading.close();
                  this.$lx.loading.finish();
                  if(r) {
                    location.href = `${this.$router.options.base}/manage`;
                    // this.$router.replace({path: '/manage'});
                  } 
                }
              }
            }
          } 
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.swlogin-dialog{
  .content{
    .form-panel{
      margin: 45px 0 0;
      color: #b8c6dc;
      text-align: center;
      .form{
        width: 50%;
        margin: 0 auto;
      }
      .label-line{
        font-size: 18px;
        margin-bottom: 20px;
        .text-username{
          padding: 0 5px;
          color: $theme-color;
        }
      }
      .box-pwd{
        margin-top: 12px;
        // width: 50%;
        margin: 0 auto;
      }
    }
    .action-panel{
      padding: 30px 0 30px;
      // width: 50%;
      margin: 0 auto;
      overflow: hidden;
      .btn{
        width:118px;
      }
    }
  }
}
</style>

