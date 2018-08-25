<template>
  <div class="allWin">
    <div class="wrap">
      <sas-breadcrumb  class="wrapbread">
        <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
        <sas-breadcrumb-item to="/manage/user/manage/userManage" class="colorPointer">用户信息</sas-breadcrumb-item>
        <sas-breadcrumb-item to="/manage/user/manage/signature" class="soupoint">签署服务</sas-breadcrumb-item>
      </sas-breadcrumb>
      <!--http://localhost:8080/saas/manage/user/order/manager-->
      <div class="whiteWrap">
        <div class="qsServer">
          <div class="radioTitle">
            签署服务
          </div>
          <div>
            <div class="qsList">
              <div class="col-xs-4">名称<span class="pay-mar-left-hu" id="name">{{ $route.query.prodName }}</span></div>
              <div class="col-xs-4 text-center">数量<span class="pay-mar-left-hu">1</span></div>
              <div class="col-xs-4 text-right">金额(元)<span class="pay-mar-left-hu" id="price">{{ $route.query.prodPrice }}.00</span></div>
            </div>
          </div>
          <div class="text-right">
            实付款(元)：<span class="payMoneny" id="needPay">{{ $route.query.prodPrice }}.00</span>
          </div>
        </div>

        <div class="radioTitle">
          付款方式
        </div>
        <lvx-radio-group v-model="thatRadio" class="RadioWin">
          <lvx-radio
            :label="item.value"
            class="WinCla"
            :class="[index === 0 ? 'blockBF': '']"
            v-for="(item, index) in listBank"
            :key="index">
            <div class="bankImg" :class="[{'active': thatRadio === item.value},'bg-bank-' + index + '']"></div>
          </lvx-radio>
          <div class="footerline"></div>
          <div class="invoiceWrap" v-if="is_nvoice">
            <lvx-checkbox v-model="invoice" class="order-checkbox-label">是否需要开具发票</lvx-checkbox>
            <span class="pay-invoice-hu">客服会与您确定开票详情</span>
          </div>
          <sas-button type="primary" class="payBtn" @click="payBtnOK">确认支付</sas-button>
        </lvx-radio-group>
      </div>
    </div>
    <sas-confirm  :isShow.sync="confirmisShow"
                  type="info"
                  title="温馨提示"
                  smallTitle=" 请你到新打开网银页面上进行支付，支付完成前请不要关闭该窗口。"
                  enBtnFont="遇到问题"
                  catchBtnFont="支付完成"
                  leftBtnType="default"
                  rightBtnType="primary"
                  @enSure="enSureConfirm"
                  @cancel="cancelConfirm"/>
    <sas-dialog
      :show.sync="centerDialogVisible"
      :title="dialogTitle"
      width="30%">
      <div class="mainCenter">
        <i :class='typeInfo === "success"? "lvx-icon-success":"lvx-icon-error"'></i>
        <span>{{ dialogMain }}</span>
        <div class="btnWrap">
          <sas-button type="primary" size="mini" @click="dialogBtn">确定</sas-button>
        </div>
      </div>
    </sas-dialog>
  </div>
</template>

<script>
  import apis from "~/config/api"
  export default {
    name: "manage-user-order-manager",
    metaInfo: {
      title: '支付—云合同'
    },
    layout: 'manager',
    data() {
      return {
        thatRadio: 0,
        listBank: [
          {value: 0},
          {value: 1},
          {value: 2},
          {value: 3},
          {value: 4},
          {value: 5},
          {value: 6},
          {value: 7},
          {value: 8},
          {value: 14},
          {value: 10},
          {value: 11},
        ],
        prodName: this.$route.query.prodName,
        prodPrice: this.$route.query.prodPrice,
        prodCode: this.$route.query.prodCode,
        is_nvoice: false,
        invoice:false, //发票
        order_Number: this.$route.query.orderId, //订单号
        confirmisShow: false,
        centerDialogVisible: false,
        typeInfo: 'info',
        dialogTitle:"",
        dialogMain: "",

      }
    },
    created (){
      this.prodPrice >= 200 ? this.is_nvoice = true : this.is_nvoice = false
    },
    methods:{

    async payBtnOK() {
      let url = apis.getProduct;
      let data = {
        "prodCode": this.prodCode,
        "defaultBank": this.thatRadio,
        "isInvoice" : this.invoice
      }
      if(this.prodPrice <= 0) {
        return false
      }
      let newPage = window.open('about:blank');
      this.$axios.post(url, data).then((data)=> {
        let datas = data.data
        if(datas.success) {
          if(datas.data.paySuccess) {
            const message = this.$createMessage({
              type:'success',
              duration:2000,
              spinnerText:'支付成功'
            });
            const {location:{name},location:{query}} =  this.$router.resolve({
              name: '/manage/user/order/manager',
              query:{
                prodName: this.$route.query.prodName,
                prodPrice: this.$route.query.prodPrice,
                prodCode: this.$route.query.prodCode,
              }
            });
            newPage.location.href = `${name}?prodName=${query.prodName}&prodPrice=${query.prodPrice}&prodCode=${query.prodCode}`;
          } else {
            this.confirmisShow = true
            let paymentId = datas.data.paymentId
            const {location:{name}} =  this.$router.resolve({
              name: '/manage/user/order/location-open',
            })
            newPage.location.href = `${name}?paymentId=${paymentId}&type=${1}`
            // window.open(name+`?paymentId=${paymentId}&type=${1}`, "_blank")

          }
        } else {
          newPage.close();
          this.centerDialogVisible = true
          this.dialogTitle = '支付失败'
          this.dialogMain = '当前账号无法购买该套餐，请返回重新选择套餐！'
          /*this.$createMessage({
           type:'error',
           duration:3000,
           spinnerText: datas.msg
           })*/
        }
      })
    },
  dialogBtn() {
    this.centerDialogVisible = false;
    this.$router.push({
      path:'/manage/user/manage/signature'
    })
  },

  //遇到问题
  enSureConfirm() {
    this.confirmisShow = true
    const {location:{name}} =  this.$router.resolve({
      name: '/manage/user/order/pay-error',
    })
    window.open(name, "_blank")
  },
  //支付完成
  cancelConfirm() {
    this.$router.push({path:'/manage/user/manage/userManage'});
  }
  }
  }
</script>

<style lang="scss" scoped>
  li{
    list-style: none;
  }
  .allWin{
    /*position: absolute;*/
    left:0;
    right:0;
    top:50px;
    bottom:0;
    background:#e6ecf5 ;
    height: 100%;
  .wrap{
    /*width:1200px;*/
    margin:0 auto;
    height: 100%;
  }
  .wrapbread{
    margin-bottom:20px;
  }
  }
  .whiteWrap{
    width:100%;
    min-height: calc(100% - 34px);
    background: #ffffff;
    padding: 6px 30px 30px 30px;
  .RadioWin{
    /*width:1084px;*/
    margin:0 auto;
    display: block;
  .WinCla{
    /*width:270px;*/
    margin: 0 56px 10px 0;

  }
  .blockBF{
    display: block;
  }
  .bankImg{
    display: inline-block;
    position: relative;
    margin:10px 0px;
    vertical-align: middle;
    width:180px;
    height:34px;
    background: url("~assets/img/src/user/userManage/bank.png") no-repeat;
  }
  .active{
    box-shadow:0 0 0 1px #4081ff !important;
  }
  .bg-bank-0{
    box-shadow:none;
    background-position: -10px -7px;
  }
  .bg-bank-1{
    background-position: -10px -85px;
  }
  .bg-bank-2{
    background-position: -10px -124px;
  }
  .bg-bank-3{
    background-position: -10px -163px;
  }
  .bg-bank-4{
    background-position: -10px -202px;
  }
  .bg-bank-5{
    background-position: -10px -398px;
  }
  .bg-bank-6{
    background-position: -10px -476px;
  }
  .bg-bank-7{
    background-position: -10px -241px;
  }
  .bg-bank-8{
    background-position: -10px -437px;
  }
  .bg-bank-9{
    background-position: -10px -554px;
  }
  .bg-bank-10{
    background-position: -10px -320px;
  }
  .bg-bank-11{
    background-position: -10px -515px;
  }
  .footerline{
    padding:5px 0;
    border-bottom:1px solid #e1e1e1;
  }
  .invoiceWrap{
    padding:30px 0px 10px;
  .pay-invoice-hu{
    background: #ECF3FB;
    border: 1px solid #D7EBFF;
    border-radius: 2px;
    padding: 1px 5px;
    margin-left:6px;
    color: #7AADE6;
    font-size: 12px;
    display: inline-block;
  }
  }

  }
  .qsServer{
    margin-bottom:40px;
  .qsList{
    display: flex;
    padding:20px 0px;
    border-bottom: 1px dashed #e1e1e1;
  }
  .pay-mar-left-hu{
    padding-left: 50px;
  }
  .payMoneny{
    color:#e60000;
    font-size: 18px;
    padding-left:20px;
  }
  }
  .radioTitle{
    font-size: 16px;
    padding:20px 0;
    border-bottom:1px solid #e1e1e1;
    margin-bottom: 20px;
  }
  }
  .payBtn{
    margin-top: 10px;
    padding:12px 30px;
    display: block;
  }

  .btnWrap{
    padding:20px 0px 10px;
  }
  .mainCenter{
    text-align: center;
    padding:10px 10px;
  }
  .lvx-icon-success{
    color:#67c23a
  }
  .lvx-icon-error{
    color:#fa5555
  }
</style>
<style lang="scss">
  .wrapbread{
  .colorPointer{
  .lvx-breadcrumb__inner{
    color:#333 !important;
  }
  }

  .soupoint{
  .lvx-breadcrumb__inner{
    cursor: pointer !important;
  }

  }

  }
  .WinCla{
  .lvx-radio__label{
    padding-left:0;
    margin-left:20px;
  }
  }
  .order-checkbox-label .lvx-checkbox__input.is-checked + .lvx-checkbox__label{
    color: #333;
  }
</style>
