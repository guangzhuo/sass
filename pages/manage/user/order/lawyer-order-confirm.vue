<template>
  <div class="secWinWrap">
    <section class="secHead">
      <div class="wrap">
        <div class="title">服务订购流程</div>
        <lvx-steps :active="2" align-center>
          <lvx-step>
            <div class="direcTop" slot="title">内容选择</div>
          </lvx-step>
          <lvx-step>
            <div class="direcTop" slot="title">提交订单</div>
          </lvx-step>
          <lvx-step>
            <div class="direcTop" slot="title">确认付款</div>
          </lvx-step>
          <lvx-step>
            <div class="direcTop" slot="title">支付</div>
          </lvx-step>
        </lvx-steps>
      </div>
    </section>
    <div class="wrap">
      <section class="mainOrder">
        <div class="cenBor">
          <div class="cenOrder-L">
            <div class="L-header">
              <span class="Cloum">确认合同信息</span>
            </div>
            <div class="linegray"></div>
            <lvx-form label-position="right" label-width="90px" id="orderForm" class="formAuto">
              <lvx-form-item label="合同名称 : " :required="true" class="formItem">
                <lvx-input v-xss v-model.trim="heTongName" :disabled="heTongDisable"></lvx-input>
              </lvx-form-item>
              <lvx-form-item  label="服务名称 : " class="formItem" id="serverColor">
                <lvx-input v-xss v-model="SerName"  :disabled="SerDisable"></lvx-input>
              </lvx-form-item>
              <lvx-form-item label="需求主体 : " v-if="prodlistType === 3" :required="true" class="formItem">
                <lvx-input v-xss v-model.trim="Demsubject" placeholder="如：我是甲方"></lvx-input>
              </lvx-form-item>
              <lvx-form-item label="需求描述 : " class="formItem">
                <div class="lgArea">
                  <lvx-input v-xss type="textarea" v-model="DemName" @input="demerIput" class="areaWrap" placeholder="请输入你对合同的需求描述，以便我们律师更个性化的为你服务">
                  </lvx-input>
                  <div class="ftLength">
                    {{ fontLength }}/500字
                  </div>
                </div>
              </lvx-form-item>
            </lvx-form>
          </div>
          <div class="cenOrder-R">
            <div class="R-title">
              <span class="Cloum">确认订单信息</span>
            </div>
            <div class="row paddTop">
              <ul class="mainUl">
                <li class="listG col-xs-12">
                  <span class="col-xs-6">服务类型</span>
                  <span class="col-xs-6">{{ confirm1 }}</span>
                </li>
                <li class="listG col-xs-12">
                  <span class="col-xs-6">单价</span>
                  <span class="col-xs-6">{{ confirm2 }}元</span>
                </li>
                <li class="listG col-xs-12">
                  <span class="col-xs-6">数量</span>
                  <span class="col-xs-6">{{ confirm3 }}</span>
                </li>
                <li class="listG col-xs-12">
                  <span class="col-xs-6">小计</span>
                  <span class="col-xs-6">￥<span class="ftRed">{{ confirm4 }}</span>元</span>
                </li>
              </ul>
            </div>
            <div class="balance">
              <div class="col-xs-12">
              <span class="col-xs-6">
                <lvx-checkbox v-model="balanceRadio" class="order-checkbox-label" @change="changeBlance">账户余额{{ balance }}元</lvx-checkbox>
              </span>
                <div class="col-xs-6">
                  <span class="blueCor">节省{{ less }}元</span>
                </div>
              </div>
            </div>
            <div class="balance noneBorder">
              <div>
                <lvx-checkbox v-model="invoice" class="order-checkbox-label">是否需要开具发票</lvx-checkbox>
                <span class="pay-invoice-hu">客服会与您确定开票详情</span>
              </div>
            </div>
            <div class="footer">
              <div class="payment">实付款: <span class="ftRed">￥{{ relPay }}</span></div>
              <sas-button class="commitBtn" category="default" @click="commitBtn">提交订单</sas-button>
            </div>

          </div>
        </div>
      </section>
    </div>

    <sas-confirm :isShow.sync="isShow" :title="confirmTitle" :smallTitle="smallTitle" @enSure="yesConfirm" @cancel="cancelBtn"></sas-confirm>
  </div>
</template>

<script>
import apis from "~/config/api"
export default {
  name: "manage-user-order-lawyer-order-confirm",
  metaInfo: {
    title: '确认订单—云合同'
  },
  layout: 'contract',
  data() {
    return {
      heTongName:'', //合同名称
      heTongDisable:false, //合同名称是否禁用
      SerName:'', //服务名称
      SerDisable: false, //服务名称是否禁用
      DemName:'', //需求描述
      Demsubject:'', //需求主体
      fontLength: 0, //字数长度
      balanceRadio: true, //账户余额
      invoice:false, //发票
      prodlistType: 0, //3为true,判断是否有需求主体
      confirm1: "", //右侧服务类型
      confirm2: "", //右侧单价
      confirm3: "", //右侧数量
      confirm4: "", //右侧小计
      balance: "", //账户余额
      less: "", //节省金额
      relPay:"", //实付款
      prodCode:'',
      prodCount:'',
      total:0,
      isShow:false,
      confirmTitle:'',
      smallTitle:"",
      pid:''
    }
  },
  created() {
    this.defaultData();

  },
  activated() {
    setTimeout(()=>{
      this.defaultData();
    },32)

  },
  methods: {
    //实时字数
    demerIput() {
      if(Number(this.DemName.length) >= 500) {
        this.$nextTick(()=>{
          this.DemName = this.DemName.slice(0, 500);
          this.fontLength = this.DemName.length
        })
        return
      } else {
        this.fontLength = this.DemName.length
      }
    },
    changeBlance() {
      if( this.balanceRadio ) {
        if( this.balance - this.total < 0 ) {
          this.less = this.balance
          this.relPay = this.total - this.balance
        } else {
          this.less = this.total
          this.relPay = 0
        }
      } else {
        this.less = 0
        this.relPay = this.total
      }
    },
    yesConfirm() {
      this.isShow = false;
      this.Demsubject = '';
      this.DemName = '';
      this.$router.push({
        path:'/manage/order/my-order'
      })
    },
    cancelBtn() {
      this.isShow = false
    },
    async commitBtn() {
      // console.log(this.Demsubject.replace(/\s/g,''))

      let heTongName = this.heTongName === '' ? true : false
      let Demsubject = this.Demsubject === '' ? true : false
      let oneJson = {}
      if(heTongName) {
        const message = this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'合同名称不能为空！'
        })
        return false
      }
      if(this.heTongName.length > 64) {
        const message = this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'合同名称字符不能超过64位！'
        })
        return false
      }

      if(this.prodlistType === 3) {
        if(Demsubject) {
          const message = this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:'需求主体不能为空！'
          })
          return false
        }
        if(this.Demsubject.length > 28) {
          const message = this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:'需求主体字符不能超过28位！'
          })
          return false
        }
        if(this.pid) {
          oneJson.pid = this.pid
        }
      }

      if(this.balanceRadio) {
        oneJson.useBalance = 'on'
      }
      if(this.invoice) {
        oneJson.isInvoice = "1"
      }

      let twoJson = {
        "contractTitle": this.heTongName,
        "demand": this.DemName,
        "subject": this.Demsubject,
        "prodList[0].code": this.prodCode,
        "prodList[0].count": this.prodCount
      }

      let dataFrom = Object.assign(oneJson,twoJson)


     await this.$axios.post(apis.orderSubmit,dataFrom).then(data =>{
        if(data.data.success) {
          this.$router.push({
            path: '/manage/user/order/recharge',
            query:{
              orderId:data.data.data.id
            }
          })
        } else {
          this.isShow = true
          this.confirmTitle = "律师服务"
          this.smallTitle = '已选择律师服务，请到我的订单中查看'
        }

      })

    },
    async defaultData () {
      let url = apis.get_l_confirm
      let { code, count, contractTitle, pid } = this.$route.query
      let params = {
        "prodList[0].code": code ? code : '',
        "prodList[0].count": count ? count: '1',
        "pid":pid ? pid : "",
        "contractTitle":contractTitle ? contractTitle : ""
      }
      await this.$axios.get(url, {params}).then((data) => {
        let datas = data.data.data
        //左侧
        this.SerName = datas.prodList[0].name
        this.SerDisable = true
        this.heTongName = datas.contractTitle
        this.heTongDisable = datas.contractTitle === '' ? false : true

        //右侧
        this.prodlistType = datas.prodList[0].type
        this.pid = datas.prodList[0].type === 3 ? datas.pid : ""
        this.confirm1 = datas.prodList[0].name
        this.confirm2 = datas.prodList[0].price/100
        this.confirm3 = datas.prodList[0].amount
        this.confirm4 = datas.prodList[0].price/100
        this.balance = datas.balance/100
        this.less = datas.balance > datas.totalPrice ? datas.totalPrice/100 : datas.balance/100
        this.relPay = (datas.totalPrice - datas.balance) < 0 ? 0 : (datas.totalPrice - datas.balance)/100
        this.balanceRadio = datas.balance > 0 ? true : false
        this.prodCode = datas.prodList[0].code
        this.prodCount = datas.prodList[0].count
        this.total = datas.totalPrice/100

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.secWinWrap{
  padding-bottom: 55px;
}
.wrap{
  width:1200px;
  margin:0 auto;
}
.Cloum{
  font-size: 18px;
  border-left:6px solid #959595;
  padding-left:12px;
  margin-left:20px;
}
.ftRed{
  color:#c40200;
}

  .secHead{
  display: block;
  width:100%;
  height:150px;
  background:#e6ecf5;
    position: relative;
    z-index: 0;
  .title{
    text-indent: 54px;
    font-size: 24px;
    padding-bottom: 40px;
    padding-top: 16px;
  }
  .direcTop{
    margin-top:-62px;
  }
}
  .mainOrder{
    background: #ffffff;
    width:100%;
    padding-top:50px;
  }
  .cenBor{
    min-height:520px;
    border:1px solid #e6ecf5;
    position: relative;
    .cenOrder-L{
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      width:64%;
      padding:3px;
      .linegray{
        width:100%;
        height:1px;
        background:#e6ecf5;
      }
      .L-header{
        width:100%;
        height:66px;
        line-height: 66px;
        margin:0 auto;
        background: #e6ecf5;
        margin-bottom:3px;
      }
      .formAuto{
        width:80%;
        margin:30px auto 0;
        .formItem{
          margin-bottom:20px;
          .lgArea{
            border: 1px solid #d8dce5;
            border-radius: 4px;
            position: relative;
            padding-bottom: 30px;
            .ftLength{
              position: absolute;
              right: 10px;
              bottom: 4px;
              line-height: normal;
            }
          }

        }
      }
    }

    .cenOrder-R{
      display: inline-block;
      background: #e6ecf5;
      vertical-align: top;
      width:36%;
      float: right;
      padding-bottom: 10px;
      position: absolute;
      right:0;
      top:0;
      height:100%;
      min-height:520px;
      .R-title{
        line-height: 72px;

      }
      .paddTop{
        width:90%;
        margin:0 auto;
        box-shadow: 0 -1px 0 #fff, 0 -2px 0 #d3dcea;
        border-top: 1px dashed #d3dcea;
        border-bottom: 1px dashed #d3dcea;
      }
      .mainUl{
        width:90%;
        padding-top:30px;
        margin:0 auto;
        .listG{
          list-style: none;
          margin-bottom:25px;
        }
      }
      .balance{
        height: 72px;
        padding: 20px 0 20px 40px;
        width:90%;
        margin:0 auto;
        border-bottom: 1px dashed #d3dcea;
        box-shadow: 0 -1px 0 #fff, 0 -2px 0 #d3dcea;
        .blueCor{
          color:#4081ff;
        }
        &::after{
          content: "";
          clear: both;
        }
        &::before{
          content: "";
          clear: both;
        }
      }
      .noneBorder{
        border-bottom:0;
      }

      .pay-invoice-hu{
        background: #ECF3FB;
        border: 1px solid #D7EBFF;
        border-radius: 2px;
        padding: 1px 5px;
        color: #7AADE6;
        font-size: 12px;
        display: inline-block;
      }
      .footer{
        width:90%;
        margin:0 auto;
        text-align: right;
        .payment{
          display: block;
        }
        .commitBtn{
          margin-top:20px;
          background: #fa5555;
          color:#ffffff;
          border: 1px solid #fa5555;
          &:active{
            border:1px solid #fa5555;
          }
        }
      }
    }

    &::after{
      content: "";
      clear: both;
    }
  }
</style>
<style lang="scss">
  .order-checkbox-label .lvx-checkbox__input.is-checked + .lvx-checkbox__label{
    color: #333;
  }
  #serverColor{
    .lvx-input.is-disabled .lvx-input__inner{
      color:#615f5f;
    }
  }
  #orderForm{
    .lvx-input.is-disabled .lvx-input__inner{
      color:#615f5f;
    }
  }
</style>
