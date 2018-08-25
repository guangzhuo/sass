<template>
  <div class="personbase">
    <div class="formWrap">
      <lvx-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        status-icon
        label-width="130px"
        class="demo-ruleForm">
        <lvx-form-item label="真实姓名: " prop="name">
          <lvx-input
            type="text"
            placeholder="请输入你的真实姓名"
            v-model.trim="ruleForm2.name"
            auto-complete="off"></lvx-input>
        </lvx-form-item>
        <lvx-form-item label="身份证号: " prop="cardId">
          <lvx-input
            type="text"
            placeholder="请输入你的身份证号"
            v-model.trim="ruleForm2.cardId"
            auto-complete="off"></lvx-input>
        </lvx-form-item>
        <lvx-form-item label="银行卡号: " prop="bankCard">
          <lvx-input v-model="ruleForm2.bankCard" placeholder="请输入你的银行卡号"></lvx-input>
        </lvx-form-item>
        <lvx-form-item label="银行预留手机号: " prop="bankIphone">
          <lvx-input v-model="ruleForm2.bankIphone"
                     @input='changLength'
                     placeholder="请输入你的银行预留手机号"></lvx-input>
          <lvx-button type="primary" @click="sendCode" :disabled="pohoneDisabled">{{ codeBtn }}</lvx-button>
        </lvx-form-item>
        <lvx-form-item label="验证码: " prop="yzCode">
          <lvx-input placeholder="请输入短信验证码" class="yzWidth" v-model="ruleForm2.yzCode"></lvx-input>
        </lvx-form-item>
        <lvx-form-item>
          <lvx-button type="primary" :disabled="yzBtn" @click="submitForm('ruleForm2')">提交审核</lvx-button>
        </lvx-form-item>
        <lvx-form-item>
          <div class="doorlink">
            <i class="iconsprite icon-question"></i>
            若认证不成功，请试试<span class="streng" @click="goStreng">人工认证</span></div>
        </lvx-form-item>
      </lvx-form>


    </div>
  </div>
</template>

<script>
// import  province  from './province'
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'
let times = 60
var sendeTime = null
export default {

  data () {
    var checkName = (rule, value, callback) => {
      this.checkAll.disName = false
      this.yzBtn = true
      if (!value) {
        return callback(new Error('姓名不能为空'));
      }
      if(value.length > 25) {
        return callback(new Error('姓名长度不超过 25 个字符'));
      }
      this.checkAll.disName = true
      callback();
      this.tureBtn()
    };
    var checkCardId = (rule, value, callback) => {
      this.checkAll.disCardId = false
      this.yzBtn = true
      let val_length = value.length
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      }
     /* if (val_length < 8 || val_length > 24) {
        return callback(new Error('身份证号长度为 8-24 个字符'));
      }*/
      if( !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(value)){
        return callback(new Error('身份证号格式不正确'));
      }
     /* if(/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error('身份证号不能含有中文'));
      }*/
      this.checkAll.disCardId = true
      callback();
      this.tureBtn()
    };
    var checkBankCard = (rule, value, callback) => {
      this.checkAll.disBankCard = false
      this.yzBtn = true
      let val_length = value.length
      if (!value) {
        return callback(new Error('银行卡号不能为空'));
      }
      if (val_length < 9 || val_length > 32) {
        return callback(new Error('银行卡号长度为 9-32 个字符'));
      }
      if(/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error('银行卡号不能含有中文'));
      }
      this.checkAll.disBankCard = true
      callback();
      this.tureBtn()
    };
    var checkBankIphone = (rule, value, callback) => {
      this.checkAll.disBankIphone = false
      this.yzBtn = true
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      if(!(/^1\d{10}$/.test(value))){
        return callback(new Error('手机号格式不正确'));
      }
      if(/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error('手机号不能含有中文'));
      }
      this.checkAll.disBankIphone = true
      callback();
      this.tureBtn()
    };
    var checkYzCode = (rule, value, callback) => {
      this.checkAll.disYzCode = false
      this.yzBtn = true
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      if(/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error('验证码不能含有中文'));
      }
      this.checkAll.disYzCode = true
      callback()
      this.tureBtn()
    }
    return {
      // activeName: {0: 'first', 1: 'second'}[this.$route.query.tab],
      ruleForm2: {
        name: '',
        cardId: '',
        bankCard: '',
        bankIphone: '',
        yzCode:''
      },
      checkAll:{
        disName: false,
        disCardId: false,
        disBankCard: false,
        disBankIphone: false,
        disYzCode: false
      },
      rules2: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        cardId: [
          { validator: checkCardId, trigger: 'blur' }
        ],
        bankCard: [
          { validator: checkBankCard, trigger: 'blur' }
        ],
        bankIphone: [
          { validator: checkBankIphone, trigger: 'blur' }
        ],
        yzCode: [ { validator: checkYzCode, trigger: 'blur' } ]
      },
      yzBtn: true,
      pohoneDisabled: true,
      codeBtn: '获取验证码',
      moreClick: false
    };
  },
  computed: {

  },
  props: {
  },
  created() {

  },
  mounted () {
  },
  watch: {

  },
  mixins: [{

  }],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let rule = this.ruleForm2
          let url = apis.personalInfoAuth;
          let data = {
            'personName': rule.name,
            'identityCardNo': rule.cardId,
            'bankCardNo': rule.bankCard,
            'personPhone': rule.bankIphone,
            'smsCode': rule.yzCode
          }
          this.$axios.post(url, data).then((data)=> {
              let datas = data.data
              if(datas.success) {
                this.$emit('after-success')
                this.$message({
                  type: 'success',
                  message: '认证成功！'
                });

              } else {
                this.$emit('after-next',datas.msg)
              }
          })
        } else {
          return false;
        }
      });
    },

    changLength() {
      if(this.ruleForm2.bankIphone.length > 0){
        this.pohoneDisabled = false
      }
    },
    /*验证按钮*/
    tureBtn () {
      let {disName, disCardId, disBankCard, disBankIphone,disYzCode} = this.checkAll
      if(disName && disCardId && disBankCard && disBankIphone && disYzCode) {
        this.yzBtn = false
      } else {
        this.yzBtn = true
      }
    },

    /*倒计时验证码*/
    sendCode() {
      if(this.moreClick)return false;
      this.sendCodeAxios();
    },
    timeFun () {
      this.codeBtn = `${times--}s后重新获取`;
      if(times < 0) {
        times = 60;
        this.moreClick = false;
        this.pohoneDisabled = false;
        this.codeBtn =  '重新获取验证码'
        clearInterval(sendeTime)
      }
    },

    /*验证码调用*/
    sendCodeAxios() {
      let url = apis.sendPersonalCheckSmsCode;
      let data = {
        'phone': this.ruleForm2.bankIphone
      }
      this.$axios.post(url, data).then((data)=>{
        let datas = data.data
        if(datas.success) {

          this.$message({
            type: 'success',
            message: '发送成功！'
          });
          if(datas.data.sendFlag === 'true' || datas.data.sendFlag){
            this.codeBtn = `${times--}s后重新获取`;
            this.moreClick = true;
            this.pohoneDisabled = true;
            clearInterval(sendeTime)
            sendeTime = setInterval(this.timeFun, 1000)
          }

        } else {

          this.$message({
            type: 'error',
            message: datas.msg
          });


        }
      })
    },

    goStreng() {
      this.$emit('after-next')
    }

    /*async allIndustry(){
      const all = await this.$axios.get(apis.getIAllIndustry).then((res)=> res.data);
      this.industlist = all.data;
    },
    async onSubmit(r) {
      this.$refs[r].validate(async (valid) => {
        if (valid) {
          const self = this;
          const a = await self.$axios.post(apis.addBaseInfo,{
            relName: this.ruleForm.relName,
            industry: this.ruleForm.industry,
            industryText: this.ruleForm.industry,
            provinceCity: this.ruleForm.provinceCity,
            userAddr: this.ruleForm.userAddr,
            idType: this.ruleForm.idType,
            idTypeText: this.idTypeText,
            idCard: this.ruleForm.idCard,
          }).then((res)=>res.data);

          if(a.success == true){
            this.$store.state.User.Check.Personal.cardType = this.ruleForm.idType;
            self.$emit('after-next');
          }else{
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: a.msg
            })
          }

        }
      });
    }*/
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.personbase{
  width:570px;
  margin-left: 3.33%;
  margin-top: 2%;
  @include responsive-default {
    .content{
      .form-panel{
        width: 80%;
        margin: 45px auto 0;
        .date-time{
          width: 100%;
        }
      }
      .action-panel{
        padding-bottom: 30px;
        padding-top: 5px;
        text-align: center;
      }
    }
  }
}
  .doorlink{
    .streng{
      border-bottom: 1px solid #4081FF;
      color:#4081FF;
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
  .personbase .lvx-input{
    width:67%;
  }
  .personbase .yzWidth{
    width:160px;
  }
</style>

