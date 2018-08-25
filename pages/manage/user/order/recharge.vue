<template>
<div class="allWin">
  <div class="wrap">
    <div class="smallWrap">
      <h3 class="title">订单已提交，请进行支付!订单号{{ order_Number }}</h3>
      <div class="smallInfo">
        <div class="rightSmallManey">
          应付金额 <span class="redTwoColor">{{ payFee }}</span> 元
        </div>
        <div class="leftSmallTitle">
          请你在提交订单后<span class="redColor">24小时</span>内完成支付，否则订单会自动取消。
        </div>
        <div class="inventory-dl-w">
          <dt class="recharge-inventory-w">购买清单</dt>
          <ul id="orderInfo" class="order-Info-w">
              <li v-for="(item, index) in ordersDtlList">{{ index + 1 }}、{{ item.prodName }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="whiteWrap">
      <lvx-radio-group v-model="thatRadio" class="RadioWin">
        <lvx-radio
          :label="item.value"
          class="WinCla"
          :class="[index === 0 ? 'blockBF': '']"
          v-for="(item, index) in listBank"
          :key="index">
          <div class="bankImg" :class="[{'active': thatRadio === item.value},'bg-bank-' + index + '']"></div>
        </lvx-radio>
        <sas-button type="primary" class="payBtn" @click="payBtnOK">确认支付</sas-button>
      </lvx-radio-group>

    </div>

  </div>


  <sas-confirm  :isShow.sync="confirmisShow"

               title="温馨提示"
               smallTitle=" 请你到新打开网银页面上进行支付，支付完成前请不要关闭该窗口。"
               enBtnFont="遇到问题"
               catchBtnFont="支付完成"
               leftBtnType="default"
               rightBtnType="primary"
               @enSure="enSureConfirm"
               @cancel="cancelConfirm"/>
</div>
</template>

<script>
  import apis from "~/config/api"
    export default {
      name: "manage-user-order-recharge",
      metaInfo: {
        title: '支付—云合同'
      },
      layout: 'contract',
      data() {
       return {
         thatRadio: 0,
         ordersDtlList: [],
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
         payFee: 0, //金额
         order_Number: this.$route.query.orderId, //订单号
         confirmisShow: false,
       }
     },
      created (){
        this.gaopGet()
      },
      methods:{
        async gaopGet() {
           let url = apis.getGopay
           let orderId = this.$route.query.orderId
          await this.$axios.post(url,{"orderId": orderId})
             .then( (data) => {
               let datas = data.data
               this.payFee = Number(datas.data.payFee/100)
               this.ordersDtlList = datas.data.ordersDtlList
             })
         },
        async payBtnOK() {
          let url = apis.gopaySub;
          let data = {
            "orderId": this.order_Number,
            "defaultBank": this.thatRadio
          };
          let newPage = window.open('about:blank');
          this.$axios.post(url, data).then((data)=> {
            let datas = data.data
            if(datas.success) {
              if(datas.data.paySuccess) {
                var orderType = datas.data.order.orderType;
                if(orderType == 1){
                  const message = this.$createMessage({
                    type:'success',
                    duration:3000,
                    spinnerText:'云合同挑选优质律师为你提供服务，15分钟内响应，请你耐心等待！'
                  });
                } else {
                  
                  const message = this.$createMessage({
                    type:'success',
                    duration:3000,
                    spinnerText:'支付成功'
                  });
                }
                newPage.close();
                setTimeout( () => {
                  this.$router.push({
                    path: '/manage/order/my-order'
                  })
                },3000)
              } else {
                this.confirmisShow = true
                let paymentId = datas.data.paymentId
                const {location:{name}} =  this.$router.resolve({
                  name: '/manage/user/order/location-open',
                })
                newPage.location.href = `${name}?paymentId=${paymentId}&type=${2}`
                // window.open(name+`?paymentId=${paymentId}&type=${2}`, "_blank")
              }
            } else {
              newPage.close();
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'支付失败'
              });
             }
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
          this.$router.push({
            path:'/manage/order/my-order'
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .allWin{
    position: absolute;
    left:0;
    right:0;
    top:50px;
    bottom:0;
    background:#e6ecf5 ;
  }
  .title{
    padding-top:10px;
  }
  .wrap{
    width:1200px;
    margin:0 auto;
  }
  .smallWrap{
    padding-left: 20px;
  }
  .redColor{
    color:#fc0300;
  }
  .redTwoColor{
    font-size: 20px;
    color:#c40200;
  }


  .smallInfo{
    .leftSmallTitle{
      margin:16px 0px;
      font-size:12px;
    }
    .rightSmallManey{
      font-size:14px;
      float: right;
    }
    .inventory-dl-w{
      .recharge-inventory-w{
        color: #959595;
        font-size: 14px;
        margin-left: 45px;
        position: relative;

        &::after{
          content: "";
          width: 17px;
          height: 14px;
           color: transparent;
          background: linear-gradient(#959595 45%,transparent 0);
          background-size: 100% 5px;
          position: absolute;
          top: 3px;
          left: -20px;
        }
      }
      .order-Info-w{
        line-height: 3;
        padding-left: 45px;
        li{
          list-style: none;
        }
      }
    }
  }
  .RadioWin{
    width:1084px;
    margin:0 auto;
    display: block;
  }
  .whiteWrap{
    width:100%;
    background: #ffffff;
    padding-left:20px;
    border-top: 5px solid #bec7d5;
    border-bottom: 4px dashed #e6ecf5;
    padding: 6px 10px 30px 10px;
    margin-top: 40px;
    .WinCla{
      width:270px;
      margin-left: 0;
      margin-bottom:10px;
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
