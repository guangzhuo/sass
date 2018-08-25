<style>
  .home-text-h{font-size: 12px;}
  .home-text-h th, td{padding: 8px 30px;}
  .con-th-d {
    background-color: #e8f0f9;
    height: 40px;
  }
  .con-t-d {
    max-width: 773px;
    min-width: 250px;
    width: auto;
  }
  .con-s-d,
  .con-ti-d {
    width: 320px;
  }
  .con-p-d {
    width: 164px;
  }
  .table{margin-bottom: 0}
  .home-mar-top-h{margin-top: 25vh}
  table > tbody > tr:nth-of-type(odd) {
    background-color: #fff;
  }
  table > tbody > tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }
</style>
<template>
  <div class="purchaseList">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: 'userManage' }">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>购买记录</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row list-bg">
      <div class="row sign-bg">
        <div class="row">
          <table border="0" width="100%" cellpadding="10" align="left">
            <thead>
            <tr class="home-text-h con-th-d">
              <th class="con-t-d">名称</th>
              <th class="con-s-d">付款时间</th>
              <th class="con-ti-d">付款金额（元）</th>
              <th class="con-p-d">支付方式</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in myData">
              <td>{{list.prodName}}</td>
              <td>{{list.gmtCreate}}</td>
              <td>{{list.amount}}</td>
              <td>{{list.payChannel}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center home-mar-top-h" v-show="myData.length<1">
          <img v-imgerror src="~/assets/img/src/user/userManage/noData.png">
        </div>
      </div>
      <div class="text-right page-mar" v-show="tableData.length > pageSize">
        <sas-pagination :total="total" :page-size="pageSize" @current-change="pageChange"></sas-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'purchaseList',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'购买记录-云合同'
    },
    data(){
      return {
        tableData: [],
        myData: [],
        total: 1,
        currentPage: 1,
        pageSize: 17,
        screenHeight: document.body.clientHeight
      }
    },
  watch:{
    screenHeight (val) {
      this.screenHeight = val;
    }
  },
  mounted(){
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        this.screenHeight = window.screenHeight;
        if(this.screenHeight >= 820){
          this.pageSize = 17;
        }
        if(this.screenHeight < 820){
          this.pageSize = 13;
        }
        if(this.screenHeight < 680){
          this.pageSize = 10;
        }
      this.change();
      })()
    }
    if(this.screenHeight < 820){
      this.pageSize = 13;
    }
    if(this.screenHeight < 680){
      this.pageSize = 10;
    }
    this.change();
  },
  methods:{
    async change(){
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.getPayList
          })
          .then(function (res) {
            var list = res.data.data;
            for(var userValue in list){

              if(list[userValue].payChannel == "ZFB"){
                list[userValue].payChannel = "支付宝";
              }
              else if(list[userValue].payChannel == "APPLE"){
                list[userValue].payChannel = "苹果支付";
              } else{
                list[userValue].payChannel = "银联支付";
              }
              list[userValue].amount = list[userValue].amount/100+".00";
              var creattime=list[userValue].gmtCreate;
              var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间

              timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 5);
              list[userValue].gmtCreate=timevalue;
            }
            self.tableData = res.data.data;
            self.myData = self.tableData.slice(0,self.pageSize);
            self.total = self.tableData.length;
          })
      });
      return promise
    },
    pageChange(v) {
      var lastPage = v * this.pageSize;
      if(lastPage > this.tableData.length){
        lastPage = this.tableData.length;
      }
      this.myData = this.tableData.slice((v - 1) * this.pageSize,lastPage);
    },
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  $white:#fff;
  .purchaseList{
    @include responsive-default {
      margin: 0 auto;
      height: 97%;
      .list-bg{
        height: calc(100% - 34px);
        background-color: $white;
        margin-top: 20px;
        .sign-bg{
          min-height: calc(100% - 75px);
          background-color: $white;
          padding: 20px 30px;
        }
      .page-mar{
        padding-right: 20px;
        padding-bottom: 20px;
        background-color: $white;
      }
      }
    }
  }
</style>

