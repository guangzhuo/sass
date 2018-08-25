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
        <section class="text-center" style="padding-top: 10vh">
            <i class="iconsprite icon-check-money"></i>
            <div class="row check-text">
              若企业账户已收到打款，请输入金额验证
            </div>
            <div class="row input-box">
                <div class="row" style="position: relative">
                    <lvx-input v-model="money" placeholder="请输入收到的金额" class="input-style"></lvx-input>
                    <i class="iconsprite icon-question" @mouseover="showTitle" @mouseout="hideTitle"></i>
                    <div class="row text-left prompt-box" v-show="title">
                        <b></b>
                        系统会为您公司账户打入一笔金额为0.01-0.99元的款项。由于银行操作的原因，打款时间可能需要5分钟，请耐心等待！
                        接收到账通知后，请再次访问此页面填写金额。
                    </div>
                </div>
                <div class="prompt text-left">
                    <p class="text-p">请输入收到的金额，您一共有{{certifyNum}}次机会</p>
                    <p class="error-p" v-show="!isCheck">{{msg}}</p>
                </div>
            </div>
            <div class="row">
                <lvx-button type="primary" disabled v-if="money == ''">提交</lvx-button>
                <lvx-button type="primary" @click="onSubmit()" v-else>提交</lvx-button>
            </div>
        </section>
    </div>
</template>

<script>
    import apis from "~/config/api";

    export default {
        name: "companyCertify",
        metaInfo: {},
        data() {
            return {
                active:2,
                lineType: 'dashed',
                money:'',
                isCheck:true,
                title: false,
                msg:'',
                certifyNum: '4'

            };
        },
        filters: {
        },
        created() {},
        computed: {},
        watch: {},
        mounted() {
          this.checkNum();
//          this.checkStatus();
        },
        methods: {
            showTitle(){
                this.title= true;
            },
            hideTitle(){
                this.title= false;
            },

            checkNum(){
              let self = this;
              const promise = new Promise(function (resolve, reject) {
                self.$axios({
                    method: 'get',
                    url:apis.getToCompanyMoneyNum,
                  })
                  .then(function (res) {
                    self.certifyNum = 4 - res.data.data.moneyCheckNum;
                    if(res.data.data.moneyCheckNum == 4){
                      self.$router.push({path: `/manage/user/check/certifyFile`})
                    }
                  })
              });
              return promise;
            },
            onSubmit(){
                var money = this.money;
                var reg = /^\d+(\.\d{1,2})?$/; //非负浮点数,可保留二位小数
                if(reg.test(money) && money >0 && money < 1){
                    this.isCheck = true;
                    let self = this;
                    const promise = new Promise(function (resolve, reject) {
                        self.$axios({
                                    method: 'post',
                                    url: apis.checkToCompanyMoney,
                                    data:{money:money}
                                })
                                .then(function (res) {
                                    if(res.data.code == 200){
                                        self.$router.push({path: `/manage/user/check/certifyResult`})
                                    }else{
                                        self.isCheck = false;
                                        self.msg = res.data.msg;
                                        self.certifyNum = 4 - res.data.data.moneyCheckNum;

                                        if(res.data.data.moneyCheckNum == 4){
                                          self.$router.push({path: `/manage/user/check/certifyFile`})
                                        }
                                        sessionStorage.setItem('errMsg','你已超过验证次数上线，请重新申请');
                                        sessionStorage.setItem('certifyNum',res.data.data.certifyNum);

//                                         self.checkNum();
                                    }
                                })
                    });
                    return promise;
                }else{
                    this.isCheck = false;
                    this.msg = '格式错误'
                }
            }
        },
        components: {}
    };
</script>

<style lang="scss"  scoped >
    .step{margin: 20px auto;}
    section {
        min-height: calc(100vh - 300px);
        background: #fff;
        padding: 20px;
        position: relative;
        .check-text{font-size: 16px; margin-top: 30px}
        .input-box{
            width:320px; margin: 20px auto 50px;
            .input-style{width: 280px; margin-right: 10px;}
            .prompt-box{
                width: 300px;
                padding: 20px;
                background-color: #F6F6F6;
                font-size: 12px;
                line-height: 22px;
                border-radius: 10px;
                color: #999;
                position: absolute;
                right: -270px;
                b {
                    background-color: #F6F6F6;
                    width: 12px;
                    height: 12px;
                    position: absolute;
                    top: -6px;
                    left: 15px;
                    text-indent: 9999px;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }
            .prompt{
                font-size: 12px; margin-top: 10px; margin-left: 5px;height: 45px;
                .text-p{ color: #BEBEBE;}
                .error-p{color: #F04134;}
            }
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
