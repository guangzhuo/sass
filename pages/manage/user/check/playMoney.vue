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
                        <lvx-form-item label="对公户名：" prop="name">
                            <lvx-input v-model="ruleForm.name" placeholder="请输入对公户名" disabled></lvx-input>
                        </lvx-form-item>
                        <lvx-form-item label="对公账号：" prop="type">
                            <lvx-input v-model.trim="ruleForm.number" placeholder="请输入对公银行账号"></lvx-input>
                        </lvx-form-item>
                        <lvx-form-item label="开户银行：" prop="bank">
                            <div class="row select-input select-bank" @click="showBankList()">
                                <lvx-input
                                  v-model="ruleForm.bankName"
                                  readonly="readonly"
                                  placeholder="请选择开户银行"
                                  style="width: 100%;"></lvx-input>
                                <span class="input-icon">
                                    <i v-if="bankIcon" class="lvx-icon-arrow-down"></i>
                                    <i v-else class="lvx-icon-arrow-up"></i>
                                </span>
                            </div>
                            <div class="choose choose-bank" v-show="openBank">
                                <div class="row" style="padding: 10px 20px;">
                                    <lvx-col :span="12">
                                        <lvx-input v-model="ruleForm.otherBank" size="medium" placeholder="其他银行搜索"></lvx-input>
                                    </lvx-col>
                                    <lvx-button type="primary" size="medium" style="margin-left: 10px;" @click="search">搜索</lvx-button>
                                    <div class="noData" v-if="banks.length < 1">暂无数据</div>
                                    <ul class="bank" v-else>
                                        <li v-for="(list,index) in banks" :key="index">
                                            <span  @click="checkBank(list)">{{list.bankName}}</span>
                                        </li>
                                    </ul>
                                  <div :class="{'hideClass':thatClick}">
                                    <div class="text-right" v-show="total > limit">
                                      <sas-pagination  style="margin-top: 10px;" :total="total" :currentPage="currentPage" :page-size='limit' @current-change="pageChange"></sas-pagination>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </lvx-form-item>
                      <!--isBank-->
                        <div class="row" v-show="isBank">
                            <lvx-form-item label="开户城市：" prop="city">
                                <div class="row select-input select-city" @click="getProvince">
                                    <lvx-input v-model="ruleForm.city" readonly="readonly" placeholder="请选择开户城市" style="width: 100%;"></lvx-input>
                                    <span class="input-icon">
                                        <i v-if="cityIcon" class="lvx-icon-arrow-down"></i>
                                        <i v-else class="lvx-icon-arrow-up"></i>
                                    </span>
                                </div>
                                <lvx-tabs v-model="activeName" type="card" v-show="showCity" class="city-style">
                                    <lvx-tab-pane label="省份" name="first">
                                        <div v-for="(list,index) in province" :key="index">
                                            <span @click="choseProvince(list.id,list.bankName)">{{list.bankName}}</span>
                                        </div>
                                    </lvx-tab-pane>
                                    <lvx-tab-pane label="城市" name="second">
                                        <div v-for="(list,index) in cityName" :key="index">
                                            <span @click="choseCity(list.id,list.bankName,list.cityCode)">{{list.bankName}}</span>
                                        </div>
                                    </lvx-tab-pane>
                                </lvx-tabs>
                            </lvx-form-item>
                            <lvx-form-item label='开户支行：'>
                                <lvx-autocomplete
                                        v-model.trim="ruleForm.branchBank"
                                        :fetch-suggestions="querySearch"
                                        :debounce="0"
                                        value-key="bankName"
                                        placeholder="请输入内容"
                                        style="width: 100%">
                                </lvx-autocomplete>
                            </lvx-form-item>
                        </div>
                        <lvx-form-item>
                          <lvx-button v-if="isBank" type="primary"
                                      :disabled="(ruleForm.number && ruleForm.bankName && ruleForm.city && ruleForm.branchBank) ? false : true"
                                      @click="onSubmit('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交审核</lvx-button>
                          <lvx-button v-else type="primary"
                                      :disabled="(ruleForm.number && ruleForm.bankName) ? false : true"
                                      @click="onSubmit('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交审核</lvx-button>
                        </lvx-form-item>
                    </lvx-form>
                </lvx-col>
            </div>
        </section>
    </div>
</template>

<script>
    import apis from "~/config/api"
    import { mapState } from 'vuex'
    let oneNum = 1
    export default {
        name: "companyCertify",
        metaInfo: {},
        data() {
            return {
                active:2,
                lineType: 'dashed',
                fullscreenLoading:false,
                ruleForm:{
                    name:'',
                    number:'',
                    bankName:'',
                    bank:'',
                    otherBank:'',
                    city:'',
                    cityCode:'',
                    cityId:'',
                    branchBank:'',
                    state1:''
                },

                thatDataBank: '', //当前搜索后点的银行数据
                searchBankType: '1', //搜索的状态分类

                banks:[], //银行展示列表
                mainBanks:[], //14大银行
                otherBanks:[],//其他银行
                province:[], //省份
                cityName:[],
                openBank:false,
                showCity: false,
                isBank: false,//是否14大银行，否，显示开户城市、支行
                branch:[], //支行
                bankId:'',
                provinceId:'',//省份id
                chooseCity:'',
                activeName: 'first',
                msg:'',
                btnShow: false,
                bankIcon:true,
                cityIcon:true,
                openBranch:false,
                branchIcon:true,

                total:0,
              currentPage:1,
              limit:10,
              thatClick:true
            };
        },
        filters: {
        },
        created() {},
        computed: {},
        watch: {
            'ruleForm.bankName'(val, oldVal){
//              if(val.length == 14) return false;
              for(let item of this.mainBanks) {
                if(item.bankName === val) {
                  this.isBank = false;
                  return false;
                } else {
                  this.isBank = true;
                }
              }
            },
        },
        mounted() {
          this.defaultName();
            this.bankList();
            const slef = this;
            $(document).click(function(e) {
                let isThat = $(e.target).parent().parent().hasClass("select-bank");
                let isCity = $(e.target).parent().parent().hasClass("select-city");
//                let isBranch = $(e.target).parent().parent().hasClass("select-branch");
                if(!isThat){
                    var drag = $(".choose-bank"),
                            dragel = $(".choose-bank")[0],
                            target = e.target;
                    if(dragel !== target && !$.contains(dragel, target)) {
                        drag.hide();
                        slef.openBank = false;
                        slef.bankIcon = true;
                    }
                }
                if(!isCity){
                    var city = $(".city-style"),
                            city1 = $(".city-style")[0],
                            target = e.target;
                    if(city1 !== target && !$.contains(city1, target)) {
                        city.hide();
                        slef.showCity = false;
                        slef.cityIcon = true;
                    }
                }
            });
        },
        methods: {
            querySearch(queryString, cb) {
              console.log(this.branch);
//              if(this.branch.length == 0)
              let results = queryString ? this.branch.filter(this.createFilter(queryString)) : this.branch;
              cb(results);

            },
            createFilter(queryString) {
              debugger
                return (restaurant) => {
                    return (restaurant.bankName.toLowerCase().search(queryString.toLowerCase()) >= 0);
                }
            },

          /*分页*/
          pageChange(v){
            this.currentPage = v;
            this.search();
          },

          /*初始化对公户名*/
          defaultName() {
            this.$axios.get(apis.userInfo).then((data)=>{
              let datas = data.data
              if(datas.success) {
                this.ruleForm.name = datas.data.companyCertify && datas.data.companyCertify.corpName
              }
            })
          },
            showBankList(){
                this.openBank = !this.openBank;
                this.bankIcon = !this.bankIcon;
            },
            bankList(){ //获取14大银行
                let self = this;
                self.$axios({
                    method: 'GET',
                    url: apis.bankList,
                    params: {
                      bankName: this.ruleForm.otherBank, //	银行名称
                      cityId: this.searchBankType == '1' ? '' : this.ruleForm.cityId,//	Long	城市ID
                      bankId: this.searchBankType == '1' ? '' : this.thatDataBank.id,//	总银行ID
                      pageNo: self.currentPage,//	Integer	默认	1
                      limit: self.limit//	每页多少条	默认10
                    }
                })
                .then(function (res) {
                    if(res.data.code == 200){
                      self.total = res.data.data.total;
                      if(self.searchBankType == '1') {
                        self.banks = res.data.data.rows;
                        if(oneNum == 1) {
                          self.mainBanks = res.data.data.rows;
                          oneNum++;
                        }

                      } else {
                        self.branch = res.data.data.rows;
                      }

                    }
                })
            },
            search(){ //搜索银行
              if(this.ruleForm.otherBank == ''){
                this.thatClick = true;
              }else{
                this.thatClick = false;
              }

              this.searchBankType = '1';
              this.bankList();
                /*var otherBank = this.ruleForm.otherBank;
                this.banks = [];
                let self = this;
                self.$axios({
                    method: 'post',
                    url: "/stamp/bank/info/search",
                    data:{search:otherBank}
                })
                .then(function (res) {
                    if(res.data.code == 200){
                        self.banks = res.data.data;
                    }
                })*/
            },
            checkBank(bankData){
              this.searchBankType = '0';
              this.thatDataBank = bankData;
              this.ruleForm.bankName = bankData.bankName;
              this.openBank = false;
              console.log(this.thatDataBank.id);
              this.bankList();
                /*this.ruleForm.city = '';
                this.ruleForm.branchBank = '';
                this.openBank = false;
                this.bankIcon = true;
                this.ruleForm.bank = bankCode;
                this.ruleForm.bankName = bankName;*/
            },
            getProvince(){ //获取省份
                this.showCity = !this.showCity;
                this.cityIcon = !this.cityIcon;
                this.activeName = 'first';
                let self = this;
                self.$axios({
                    method: 'get',
                    url: apis.cityList,
                    params:{cityId:''}
                })
                .then(function (res) {
                    if(res.data.code == 200){
                        self.province = res.data.data;
                    }
                })
            },
            choseProvince(id,name){ //选择省份
                this.activeName = 'second';
                this.ruleForm.city = name;
                this.chooseCity = name;
                this.ruleForm.branchBank = '';
                let self = this;
                self.$axios({
                    method: 'get',
                    url: apis.cityList,
                    params:{cityId: id }
                })
                .then(function (res) {
                  if(res.data.code == 200){
                        self.cityName = res.data.data;
                        self.ruleForm.cityId = '';
                        // self.branchList();
                    }
                })
            },
            choseCity(id,name,code){ //选择城市
              this.searchBankType = '0';
                this.ruleForm.city = this.chooseCity+"/"+name;
                this.ruleForm.cityId = id;
                this.ruleForm.branchBank = '';
                this.ruleForm.cityCode = code;
                this.showCity = false;
                this.cityIcon = true;
              console.log(this.ruleForm.cityId);
                this.bankList();
            },

          onSubmit(){
            var acctName = this.ruleForm.name;
            var bankCode = this.ruleForm.bank;
            var braBank = this.ruleForm.branchBank;
            var cardNo = this.ruleForm.number;
            var cityCode = this.ruleForm.cityCode;
            var reg = /^[0-9]*$/;
            if(cardNo.length <= 32 && cardNo.length >= 9 && reg.test(cardNo)){
              let self = this;
              self.$axios({
                method: 'post',
                url: apis.toCompanyMoney,
                data:{
                  bankCardNo: cardNo, //	对公账号
                  bankId: self.thatDataBank.id,//	银行ID	否
                  cityId: self.ruleForm.cityId,//城市ID  是
                  subBank: braBank//	银行支行名称	是
                }
              })
                .then(function (res) {
                  if(res.data.code == 200){
                    self.checkStatus();
                  }else{
                    self.msg = res.data.msg
                  }
                })
            }else{
              this.msg = '对公账号格式错误'
            }
          },
          checkStatus(){
            let self = this;
            self.fullscreenLoading = true;
            setTimeout(() => {
              self.fullscreenLoading = false;
            }, 2000);
            const promise = new Promise(function (resolve, reject) {
              self.$axios({
                  method: 'get',
                  url:apis.checkToCompanyMoneyStatus,
                })
                .then(function (res) {
                  if(res.data.success){
                    self.$router.push({path: `/manage/user/check/checkMoney`});
                    /*self.certifyNum = 4 - res.data.data.moneyCheckNum;
                    if(res.data.data.moneyCheckNum == 4){
                      self.$router.push({path: `/manage/user/check/certifyFile`})
                    }*/
                  }else{
                    if(res.data.data.moneyCheckNum == -1 && res.data.data.certifyNum){
                      self.$router.push({path: `/manage`})
                    }else{
                      self.$router.push({path: `/manage/user/check/certifyFile`});
                      sessionStorage.setItem('errMsg',res.data.msg);
                    }
                  }
                })
            });
            return promise;
          },
          /*openBranchBank(){

            console.log(this.thatDataBank.id);
            console.log(this.ruleForm.cityId);
            this.bankList();
          }*/

            /*branchList(){
                //获取支行
                //var cityId = this.ruleForm.cityId;
                var bankCode = this.ruleForm.bank;
                var branchCode = [];
                for(var i=0; i<this.banks.length;i++){
                    branchCode = branchCode.concat(this.banks[i].bankCode);
                }
                this.bankId = this.banks[branchCode.indexOf(bankCode)].id;
                let self = this;
                self.$axios({
                    method: 'post',
                    url: "/stamp/bank/info/search/page",
                    data:{cityId:self.ruleForm.cityId,pageNum:'',pageSize:999999,parentId:self.bankId,search:''}
                })
                .then(function (res) {
                    if(res.data.code == 200){
                        self.branch = res.data.data.dataList;
                    }
                })
            },*/
            /*chooseBranch(name){ //选择支行
                this.ruleForm.branchBank = name;
                this.openBranch = false;
            },*/

        }
    };
</script>

<style lang="scss"  scoped >
  li{
    list-style: none;
  }
    .step{margin: 20px auto;}
    .hideClass{display: none}
    section {
        min-height: calc(100vh - 300px);
        background: #fff;
        padding: 20px;
        position: relative;
        .form-title{
            border-bottom:1px solid #E9E9E9;
            font-weight: 600;
            font-size: 16px;
            div{height: 22px; color:#F04134;font-size: 14px;}
        }
        form{margin-top: 30px;}
        .choose{
            position: absolute; z-index: 999; background-color: #fff;width: 100%;min-height: 100px;
            max-height: 270px; margin-top: 5px; overflow-y: auto; border: 1px solid #dfe4ed;border-radius: 3px;
            .noData{color: #b4bccc; margin-top: 10px;}
            .bank{
                li{padding-top: 10px; cursor: pointer;}
            }
            .branch{
                li{padding-bottom: 10px; cursor: pointer;}
            }
        }
        .choose-branch{padding: 10px 20px 0;}
        .city-style{
            position: absolute; z-index: 9999; width: 100%; margin-top:5px;
            div{
                padding: 3px 10px; display: inline-block; cursor: pointer;
            }
        }
        .input-icon{position: absolute;top: 13px; right: 10px; color: #b4bccc;}
    }
</style>
<style lang="scss">
    .demo-content{
        .step{
          margin: 20px 10%;
          .lvx-step__icon {background-color: #e8ecf0;}
          .lvx-step__title.is-process{color: #b4bccc; font-weight:400;}
          .lvx-step__title{font-size: 12px;}
        }
        .demo-ruleForm{
            .lvx-tabs__item{width: 50%; background-color: #efefef;}
            .lvx-tabs__nav{float: none;}
            .lvx-tabs__item.is-active{background-color: #fff;}
            .lvx-tabs__header{margin: 0;}
            .lvx-tabs__content{border: 1px solid #dfe4ed;border-top:none; background-color: #fff; padding: 10px;}
            .lvx-form-item__content{line-height: normal;}
            .select-input{
                input{cursor:pointer}
            }
        }
    }

</style>
