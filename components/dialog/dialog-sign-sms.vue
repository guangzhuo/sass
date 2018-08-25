<template>
 <sas-dialog
    :show.sync="visible"
    title="合同签署短信验证"
    width="452px"
    class="send-sms-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="form-wraper">
        <div class="lable-text-line1 sas-align-center">尊敬的用户：请输入你手机收到的短信验证码，该验证码在30分钟内有效。</div>
        <div class="lable-text-line2 sas-align-center">已发送验证码至<span >{{user.cellNum | __hiddenPhoneNumMiddle}}</span>，请输入验证码完成签署。</div>
        <div class="form-inner">
          <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm"  @submit.native.prevent>
            <lvx-form-item  prop="smsCode">
              <div class="row">
                <div class="col-xs-8" >
                  <sas-input :model.sync="ruleForm.smsCode" placeholder="短信验证码" @keyup.enter.native="onSend"></sas-input>
                </div> 
                <div class="col-xs-4 sas-align-right">
                  <sas-button category="gray" size="medium" @click="doSendSms">{{ sendButtontext }}</sas-button>
                </div> 
              </div>
            </lvx-form-item>
          </lvx-form>
        </div>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onSend">提交</sas-button>
        <sas-button category="primary"  @click="onReset">重置</sas-button>
      </div>
    </div>
    
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'
import utils from '~/mixins/utils'
export default {
  mixins: [utils],
  data () {
    return {
      visible: this.show,
      verificationCode: '',
      sendButtontext: '重新发送',
      timer: null, //发送短信倒计时定时器
      ruleForm: {
        smsCode: ''
      },
      rules: {
        smsCode: [
           { required: true, message: '请输入有效的验证码', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  props: {
    show: Boolean,
  },
  created() {
   
  },
  mounted () {
  },
  watch: {
    show (val) {
      this.visible = this.show;
      if(val) {
        this.sendButtontext = '重新发送';
        this.doSendSms();
      }
    }
  },
  methods: {
    /*
    描述：发送短信
    */
    async doSendSms() {
      if(this.sendButtontext == '重新发送') {
        const r  = await this.$axios.post(apis.sendSignSms).then((res)=>res.data);
        if(r.code == 201) { //一分钟内不能重复发送
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
        } else if (r.code != 200) {
          this.$createMessage({ //验证码发送失败
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
        }
        if(r.code == 200) {
          let seconds = 60; //倒计时60秒
          this.timer = setInterval(()=> {
            if(seconds<1) {
              clearInterval(this.timer);
              this.sendButtontext = '重新发送';
            } else {
              seconds--;
              this.sendButtontext = `${seconds}s后可重新发送`;
            }
          }, 1000);

        } else {
          this.sendButtontext = '重新发送';
        }
      }
    },
    /*
    描述：停止短信倒计时定时器
    */
    closeTimer() {
      if(this.timer) {
        clearInterval(this.timer);
      }
    },
    afterClose() {
      this.closeTimer();
      this.$refs['ruleForm'].resetFields();
      this.$emit('update:show', false);
    },
    onSend(e) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.closeTimer();
          this.$emit('after-send', this.ruleForm.smsCode);
        } else {
          return false;
        }
      });
      
    },
    onReset() {
      this.$refs['ruleForm'].resetFields();
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.send-sms-dialog{
  @include responsive-default {
    .content{
      .action-panel{
        padding-bottom: 30px;
        padding-top: 5px;
        text-align: center;
      }
      .form-wraper{
        
        .lable-text-line1{
          margin: 40px 20px 10px;
          font-size: 12px;
          color: #b9c0cd;
        }
        .lable-text-line2 {
          font-size: 12px;
          color: #b9c0cd;
          span{
            color: $theme-color;
          }
        }
        .form-inner{
          padding: 0 56px;
          margin-top: 24px;
          .input-wraper{
            width: 210px;
          }
        }
      }
    }
  }
}
</style>
