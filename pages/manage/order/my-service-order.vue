<template>
  <div class="my-service-order">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item>我的接单</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="order-home-c" style="margin-top: 20px;">
      <div class="order-pictureWrap">
        <div class="order-SetTitleWrap">
          <div class="order-SetTitle">
            <span class="signNum" style="color:#000;">订单列表</span>
          </div>
        </div>
      </div>
    </div>
    <div class="order-home-c" style="background-color:#E8ECF0;border-top: 0;padding-top: 0;">
      <div style="background-color:#fff;padding: 10px;border-bottom: 1px solid #B9C5DD;">
        <div class="order-choise">
            订单状态:
            <sas-select  placeholder="请选择" :model="orderStatus" @change="onStatusChange">
                <sas-option
                  v-for="item in __serviceOrderStatusDic"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </sas-option>
            </sas-select>
            <div class="inputWrapAntBtn">
              <sas-search-input @after-search="onSearch" placeholder="请输入合同名称或订单号" v-model="searchKey"/>
                <!-- <sas-input :model.sync="searchKey" placeholder="请输入内容" class="inputWrap"></sas-input>
                <sas-button category="primary" icon="lvx-icon-search" size="medium" @click="onSearch">搜索</sas-button> -->
            </div>
        </div>
      </div>
      <div class="row order-header">
        <div class="col-xs-25 home-text">合同标题</div>
        <div class="col-xs-22 home-text">服务名称</div>
        <div class="col-xs-22 home-text">委托人信息</div>
        <div class="col-xs-15 home-text">订单状态</div>
        <div class="col-xs-15 home-text">操作</div>
      </div>
      <div class="row order-box" v-loading="loading" lvx-loading-background="rgba(255, 255, 255, 0)">
        <div class="row wrapList" v-for="(item,index) in orderData.rows" :key="index">
          <div class="row first"><span class="ListSpan">• {{item.gmtCreate | __formatDataFilter}}</span><span class="home-text-h orderList-mar-left-h">订单号：{{item.orderId}}</span>
          </div>

          <div class="row orderServerInner">
            <div class="col-xs-25">
              <div :title="item.contractTitle"><span class='orderList-span sas-cursor-pointer' style='line-height: 40px;' @click="onToContractView(item)">{{`《${__clipTextOverflow(item.contractTitle, 10)}》`}}</span>
              </div>
            </div>
            <div class="col-xs-22 text-center" v-text="item.orderName"></div>
            <div class="col-xs-22 text-center" :title="item.userEmail">
              {{item.cellNum}}<br/>
              <span style="font-size: 12px; color: grey">{{item.userEmail}}</span>
            </div>

            <div class="col-xs-15 text-center">{{item.status | __serviceOrderStatusFilter}}</div>
            <div class="col-xs-15 text-center" >
              <span>
                <span class='sas-cursor-pointer receive' v-if="item.status == '1'" @click="onReceiveOrder(item.orderId)">确认接单</span>
                <span class='sas-cursor-pointer receive' v-if="item.status == '2'" @click="onSubmitWork(item)">提交成果</span>
                <span class='sas-cursor-pointer demand' v-if="item.status == 1 || item.status == 2" @click="onOpenUserRemandDialog(item.orderId)"> | 查看需求</span>
              </span>
            </div>
          </div>
        </div>
        <div v-show="orderData.rows.length==0">
          <div style="height: 300px;background-color: #fff;text-align: center;padding-top: 50px;border: 1px solid #b9c5dd;">
            <img src="../../../assets/img/sprite/orderData.png" />
            <p style="margin: 20px 45px 0 0;">暂无订单</p>
          </div>
        </div>
      </div>
      <sas-pagination class="page" :total="orderData.total" v-if="orderData.total > 10" :page-size="pageSize" @current-change="pageChange"></sas-pagination>
    </div>
    <sas-user-remand :show.sync="dialogUserRemandVisible" :serviceOrder="currentServiceOrderRamand"/>
    <sas-submit-work :show.sync="dialogSubmitWorkVisible" :serviceOrder="currentActionOrder"/>
    <sas-submit-review-work :show.sync="dialogSubmitReviewWorkVisible" :serviceOrder="currentActionOrder" @after-submit="onReviewWorkSubmit"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import utils from '~/mixins/utils'
  import dialogUserRemand from '~/components/dialog/dialog-user-remand'
  import dialogSubmitWork from '~/components/dialog/dialog-submit-work'
  import dialogSubmitReviewWork from '~/components/dialog/dialog-submit-review-work'
  import searchInput from '~/components/common/search-input'
  export default {
    name: 'my-service-order',
    metaInfo: {
      title: '我的接单-云合同'
    },
    layout: 'contract',
    async fetchData(to, context) {
      let self = context;
      const r = await self.$axios.get(apis.getLawyerOrder, {
        params: {
          status: '',
          pageNumber: '',
          search: ''
        }
      }).then((data)=>data.data);
      if(r.success) {
        self.$store.state.Order.MyServiceOrder.orderData = r.data;
      }
    },
    data () {
      return {
        orderStatus: '',
        searchKey: '',
        pageSize: 10,
        pageNumber: 1,
        dialogUserRemandVisible: false,
        dialogSubmitWorkVisible: false,
        dialogSubmitReviewWorkVisible: false,
        currentActionOrder: {},
        currentServiceOrderRamand: {},
        loading: false
      }
    },
    mixins: [utils],
    filters: {
    },
    computed: {
      ...mapState({
        orderData: state=> state.Order.MyServiceOrder.orderData
      })
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      onStatusChange(v) {
        this.orderStatus = v;
        // console.log(v);
        this.doSearch();
      },
      pageChange(pageNumber) {
        this.pageNumber = pageNumber;
        this.doSearch();
      },
      onSearch() {
        // console.log(this.searchKey)
        this.doSearch();
      },
      async doSearch() {
        this.loading = true;
        const r = await this.$axios.get(apis.getLawyerOrder, {
          params: {
            status: this.orderStatus,
            pageNumber: this.pageNumber,
            search: this.searchKey
          }
        }).then((data)=>data.data);
        if(r.success) {
          this.$store.state.Order.MyServiceOrder.orderData = r.data;
          this.loading = false;
        }
      },
      async onOpenUserRemandDialog(orderId) {
        const r = await this.$axios.get(apis.getOrderRemand, {params: {orderId: orderId}}).then((data)=>data.data);
        if(r.success) {
          this.currentServiceOrderRamand = r.data;
          this.dialogUserRemandVisible = true;
        }
      },
      async onReceiveOrder(orderId) {
        const r = await this.$axios.get(apis.doReceiveOrder, {params: {orderId: orderId}}).then((data)=>data.data);
        if(r.success) {
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '接单成功'
          });
          this.doSearch();
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '接单失败，请检查网络或联系云合同客服！'
          });
        }
      },
      onSubmitWork(order) {
        this.currentActionOrder = order;
        if(order.srvType == 4) {
          this.dialogSubmitWorkVisible = true;
        } else {
          this.dialogSubmitReviewWorkVisible = true;
        }
      },
      onReviewWorkSubmit(r) {
        if(r) {
          this.doSearch();
        }
      },
      onToContractView(order) {
        if(order.srvType == 4 && order.pid> 0) {
          open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${order.pid}`);
        } else if (order.srvType == 3 && order.rpid > 0) {
          if(order.status == 4 || order.status == 3) {
            open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${order.rpid}`);
          } else {
            open(`${this.__getRouterBase()}/manage/contract/contract-postil?pid=${order.rpid}`);
          }
        }
      }
    },
    components: {
      'sas-user-remand': dialogUserRemand,
      'sas-submit-work': dialogSubmitWork,
      'sas-submit-review-work': dialogSubmitReviewWork,
      'sas-search-input': searchInput
    }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";

    .my-service-order{

      @include responsive-default {
          margin: 12px auto;
          font-size:$font-size-title;
          .order-home-c{
              height: 100%;
              // border: 1px solid #B9C5DD;
              border-bottom: 0px;
              padding-top: 10px;
              background-color: $white;
              .order-pictureWrap{
                  .order-SetTitleWrap{
                          padding-left: 20px;
                      .order-SetTitle{
                          padding-left: 10px;
                          border-left: 4px solid #4081ff;
                          overflow: hidden;
                          margin-bottom: 10px;
                      }
                  }
              }
              .order-choise{
                position: relative;
                background-color: #F1F4FA;
                padding: 15px 10px;
                .inputWrapAntBtn{
                  display: inline-block;
                  // width: 300px;
                  float: right;
                  .inputWrap{
                    display: inline-block;
                    width: 200px;
                  }
                }
              }
              .order-header{
                text-align: center;
                background-color: #dbe2f2;
                width: 100%;
                padding: 0 30px;
                border-right: 1px solid #b9c5dd;
                border-left: 1px solid #b9c5dd;
                & div:nth-child(1){
                  border-left: 1px solid #b9c5dd;
                }
                .home-text{
                  border-right: 1px solid #b9c5dd;
                  padding: 9px 0;
                }
              }
              .order-box{
                font-size: 14px;
                .wrapList{
                  padding: 10px;
                  background-color: #fff;
                  border: 1px solid #b9c5dd;
                  margin-bottom: 10px;
                  .first{
                    border-bottom: 1px solid #b9c5dd;
                    padding-left: 3vh;
                    padding-right: 3vh;
                    .ListSpan{
                      font-weight: 600;
                    }
                    .orderList-mar-left-h{
                      margin-left: 10px;
                      font-size: 12px;
                    }
                  }
                  .orderServerInner{
                    padding: 2vh 30px 1vh;
                    .orderList-span{
                      color: $theme-color;
                    }
                    .receive{
                      color: $theme-color;
                    }
                  }
                }
              }
              .page{
                float: right;
              }
          }
      }
      @include responsive-lt(1366px) {
        // .order-home-c{
        //   height: calc(100% - 52px);
        // }
      }
    }
</style>
<style lang="scss">
  .col-xs-25 {
    width: 25%;
  }
  .col-xs-20 {
    width: 20%;
  }
  .col-xs-22 {
    width: 22.5%;
  }
  .col-xs-80 {
    width: 80%;
  }
  .col-xs-15 {
    width: 15%;
  }
  .col-xs-25, .col-xs-15, .col-xs-20, .col-xs-22, .col-xs-80{
    float: left;
    position: relative;
    min-height: 1px;
  }
</style>
