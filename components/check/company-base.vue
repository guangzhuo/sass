<template>
  <div class="companybase">
    <lvx-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" >
      <div class="company-form clearfix">
        <div class="company-form-left">
          <lvx-form-item  prop="companystyle" label="企业类型：" label-width="120px">
            <lvx-radio-group v-model="ruleForm.companyType">
              <lvx-radio-button label="企业法人" class="company-lega">企业法人</lvx-radio-button>
              <lvx-radio-button label="其他组织" class="company-other">其他组织</lvx-radio-button>
            </lvx-radio-group>
          </lvx-form-item>

          <lvx-form-item  prop="carystyle" label="有效证件类型：" label-width="120px">
            <lvx-radio-group v-model="ruleForm.cardType">
              <lvx-radio-button :label="1" >营业执照</lvx-radio-button>
              <lvx-radio-button :label="2">组织机构代码</lvx-radio-button>
            </lvx-radio-group>
          </lvx-form-item>

          <lvx-form-item  prop="corpName">
            <sas-input :model.sync="ruleForm.corpName" placeholder="请输入企业名称" ></sas-input>
          </lvx-form-item>

          <lvx-form-item  prop="licenseNum">
            <sas-input :model.sync="ruleForm.licenseNum" placeholder="请输入有效证件号"></sas-input>
          </lvx-form-item>

         <!--  <lvx-form-item  prop="corpCode" v-if="ruleForm.cardType == 2">
            <sas-input :model.sync="ruleForm.corpCode" placeholder="请输入有效证件号"></sas-input>
          </lvx-form-item> -->

          <lvx-form-item prop="industry">
            <sas-select :model.sync="ruleForm.industry" placeholder="请选择行业类型" style="width:100%">
              <sas-option :label="item" :value="item" :key="index" v-for="(item, index) in industlist"></sas-option>
            </sas-select>
          </lvx-form-item>

          <lvx-form-item prop="provinceCity">
            <sas-select-area  v-model="ruleForm.provinceCity" >
              <i slot="prefix" class="icon iconfont lvx-icon-feiji"></i>
            </sas-select-area>
          </lvx-form-item>
          <lvx-form-item prop="companyAddr">
            <lvx-input type="textarea" v-model="ruleForm.companyAddr" placeholder="建议你填写真实有效的详细地址"></lvx-input>
          </lvx-form-item>
        </div>

        <div class="company-form-right">
          <lvx-form-item   label="经办人类型:" label-width="120px">
            <lvx-radio-group v-model="ruleForm.agentType">
              <lvx-radio-button label=0 >法定代表人</lvx-radio-button>
              <lvx-radio-button label=1>授权委托人</lvx-radio-button>
            </lvx-radio-group>
          </lvx-form-item>
          <lvx-form-item  prop="repsName">
            <sas-input :model.sync="ruleForm.repsName" placeholder="请输入经办人真实姓名" ></sas-input>
          </lvx-form-item>
          <lvx-form-item  prop="cellNum">
            <sas-input :model.sync="ruleForm.cellNum" placeholder="请输入经办人手机号" ></sas-input>
          </lvx-form-item>
          <lvx-form-item prop="idTypeText">
            <sas-select :model.sync="ruleForm.idType" placeholder="请选择证件类型" style="width:100%">
              <sas-option v-for="(item, index) in idTypeList" :label="item.text" :value="item.value" :key="index"></sas-option>
            </sas-select>
          </lvx-form-item>
          <lvx-form-item prop="idCard">
            <sas-input :model.sync="ruleForm.idCard" placeholder="请输入你的有效证件号码"></sas-input>
          </lvx-form-item>
        </div>
      </div>
     
      <lvx-form-item style="text-align:center;">
        <sas-button category="primary" @click="onSubmit('ruleForm')">下一步</sas-button>
      </lvx-form-item>
    </lvx-form>
  </div>
</template>

<script>
import  province  from './province'
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'

export default {
  data () {
    var idCardvalidator = (rule, value, callback) => {
      const self = this;
      let idCardFormat = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(self.ruleForm.idType == 1){
        if(!value){
          return callback(new Error('身份证不能为空'));
        }else{
          if(idCardFormat.test(value) == true){
            callback();
          }else{
            return callback(new Error('身份证格式不对'));
          }
        }
      }else if(self.ruleForm.idType == 2){
        if(!value){
          return callback(new Error('护照不能为空'));
        }else{
          if(value.length < 21){
            callback();
          }else{
            return callback(new Error('护照格式错误'));
          }
        }
      }else if(self.ruleForm.idType == 3){
        if(!value){
          return callback(new Error('军官证不能为空'));
        }else{
          if(value.length < 21){
            callback();
          }else{
            return callback(new Error('军官证格式错误'));
          }
        }
      }else{
        callback();
      }
    };
    var validateIsExitCompany = async (rule, value, callback) => {
      if(value) {
        const r = await this.$axios.get(apis.isCorpNameAuth,{
          params: {
            corpName: value
          }
        }).then((res)=>res.data);
        if(!r.success) {
          callback(new Error('该企业信息已经存在'));
        } else {
          callback();
        }
      }
    };
    var validateIsExitLicenseNum = async (rule, value, callback) => {
      if(value) {
        const r = await this.$axios.get(apis.isLicenseNumAuth, {
          params: {
            licenseNum: value
          }
        }).then((res)=>res.data);
        if(!r.success) {
          callback(new Error('该证件信息已经存在'));
        } else {
          callback();
        }
      }
    };
    var validateLicenseNumByCardType = async (rule, value, callback) => {

      if(this.ruleForm.cardType == 1) { //营业执照
        if(!value) {
          return callback(new Error('请输入营业执照'));
        } else if(value.length < 15) {
          return callback(new Error('营业执照不能低于15位'));
        } else if (value.length > 18) {
          return callback(new Error('营业执照不能超过18位'));
        } else {
          callback();
        }
        
      } else if (this.ruleForm.cardType == 2) { //组织机构
        if(!value) {
          return callback(new Error('请输入组织机构'));
        } else if (value.length > 10) {
          return callback(new Error('组织机构代码证不能超过10位'));
        } else {
          callback();
        }
      }
    };
    return {
      idTypeList: [
        {value: 1, text: '身份证'},
        {value: 2, text: '护照'},
        {value: 3, text: '军官证'}
      ],
      industlist:[],
      ruleForm: {
        companyType: '企业法人', //企业类型  1:企业法人 2：其他组织
        cardType: null, //有效证件类型 1:营业执照 2: 组织机构代码 
        corpName: '', //企业名称
        licenseNum: '', //营业执照有效证件号 或 组织结构代码
        industry: '贸易行业', // 行业类型
        provinceCity: '', //地域
        companyAddr: '', //企业地址

        agentType: 1, //经办人类型
        repsName: '', //经办人真实姓名
        cellNum: '', //经办人手机号
        idType: 1, //证件类型
        idCard: '', //证件号码
      },
      rules: {
        corpName: [
          { required: true, message: '公司名称必填', trigger: 'blur' },
          { min: 1, max: 40, message: '公司名称不能超过40位', trigger: 'blur' },
          { validator: validateIsExitCompany, trigger: 'blur' }
        ],
        licenseNum: [
          {validator: validateLicenseNumByCardType, trigger: 'blur'},
          { validator: validateIsExitLicenseNum, trigger: 'blur' }
        ],
        provinceCity: [
          { required: true, message: '城市必选', trigger: 'blur'}
        ],
        companyAddr: [
          { required: true, message: '公司地址必填', trigger: 'blur'},
          { max: 65, message: '公司地址不能超过65位', trigger: 'blur'},
        ],
        repsName: [
          { required: true, message: '真实姓名必填', trigger: 'blur'},
          { max: 25, message: '姓名不能大于25个字符', trigger: 'blur'},
        ],
        cellNum: [
          { required: true, message: '手机号必填', trigger: 'blur'},
          { pattern : /^1[0-9]{10}$/ , message: '手机号格式不对', trigger: 'blur' }
        ],
        idCard: [
          { validator: idCardvalidator, trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    ...mapState({
      companyCertifization: state => state.User.Check.Company.companyCertifization
    }),
    idTypeText: function() {
      return _.find(this.idTypeList, (o)=> { return o.value == this.ruleForm.idType; }).text || '';
    }
  },
  props: {
  },
  created() {

  },
  mounted () {
    this.allIndustry();
  },
  watch: {
    companyCertifization(newVal, oldVal) {
      if(!_.isEmpty(newVal)) {
        this.ruleForm.companyType = newVal.companyType || '企业法人';
        this.ruleForm.corpName = newVal.corpName || '';
        this.ruleForm.licenseNum = newVal.corpCode || newVal.licenseNum || '';
        this.ruleForm.industry = newVal.industry || '贸易行业';
        this.ruleForm.provinceCity = newVal.provinceCity || '';
        this.ruleForm.companyAddr = newVal.corpAddr || '';
        this.ruleForm.agentType = newVal.isAgent == null ? 0 : newVal.isAgent;
        this.ruleForm.repsName = newVal.repsName || '';
        this.ruleForm.cellNum = newVal.cellNum || '';
        this.ruleForm.idType = parseInt(newVal.idType) || 1;
        this.ruleForm.idCard = newVal.idCard || '';

        this.ruleForm.cardType = newVal.licenseNum && 1 || newVal.corpCode && 2 || 1;
        
      }      
    }
  },
  mixins: [{

  }],
  methods: {
    async allIndustry(){
      const all = await this.$axios.get(apis.getIAllIndustry).then((res)=> res.data);
      this.industlist = all.data;
    },
    resmethod(v){
     // console.log(v);
     this.ruleForm.provinceCity = v;
    },
    dismethod(d){
      this.haha = d;
    },
    async onSubmit(r) {
      this.$refs[r].validate(async (valid) => {
        if (valid) {
          const self = this;
          let data = {
            corpName: this.ruleForm.corpName,
            industry: this.ruleForm.industry,
            provinceCity: this.ruleForm.provinceCity,
            corpAddr: this.ruleForm.companyAddr,
            repsName: this.ruleForm.repsName,
            cellNum: this.ruleForm.cellNum,
            idTypeText: this.idTypeText,
            idType: this.ruleForm.idType,
            idCard: this.ruleForm.idCard,
            isAgent: this.ruleForm.agentType,
            companyType: this.ruleForm.companyType
          };
          switch(parseInt(this.ruleForm.cardType)) {
            case 1:
              data.licenseNum = this.ruleForm.licenseNum;
              break;
            case 2:
              data.corpCode = this.ruleForm.licenseNum;
              break;
          }
          const addBaseInfo = await self.$axios.post(apis.addCompanyBaseInfo, data).then((res)=>res.data);

          if(addBaseInfo.success == true){
            this.$store.state.User.Check.Company.idType = this.ruleForm.idType;
            this.$store.state.User.Check.Company.cardType = parseInt(this.ruleForm.cardType);
            this.$store.state.User.Check.Company.agentType = this.ruleForm.agentType;
            self.$emit('after-next');
          }else{
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: addBaseInfo.msg
            })
          }

        } else {
          return false;
        }
      });
    },
  },
  components: {
    'province': province
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.companybase{
  margin-left: 6.33%;
  margin-top: 2%;
  margin-right: 6.33%;
  @include responsive-default {
    .company-form{
      // display: flex;
      // flex-flow: row nowrap;
      // justify-content: space-around;
      // align-items: baseline;
    }
    .company-form-left{
      float: left;
      width: 45%;
    }
    .company-form-right{
      float: right;
      margin-top: 67px;
      margin-left: 20px;
      width: 45%;
    }
  }
}
</style>


