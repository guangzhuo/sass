<template>
  <div class="my-order">
    <sas-breadcrumb v-if="user.isLawyer == 1">
          <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
          <sas-breadcrumb-item>我的订单</sas-breadcrumb-item>
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
                  v-for="item in __orderStatusDic"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </sas-option>
            </sas-select>
            <div class="inputWrapAntBtn">
              <sas-search-input @after-search="onSearch" placeholder="请输入合同名称或订单号" v-model="searchKey"/>
            </div>
        </div>
      </div>
      <div class="row order-header">
        <div class="col-xs-25 home-text">产品/服务</div>
        <div class="col-xs-15 home-text">价格</div>
        <div class="col-xs-15 home-text">数量</div>
        <div class="col-xs-15 home-text">实付款</div>
        <div class="col-xs-15 home-text">订单状态</div>
        <div class="col-xs-15 home-text">操作</div>
      </div>
      <div class="row order-box" v-loading="loading" lvx-loading-background="rgba(255, 255, 255, 0)">
        <div class="row wrapList" v-for="(item,index) in orderData.rows" :key="index">
          <div class="row first"><span class="ListSpan">• {{item.gmtCreate | __formatDataFilter}}</span><span class="home-text-h orderList-mar-left-h">订单号：{{item.id}}</span>
          </div>

          <div class="row orderServerInner">
            <div class="col-xs-25" v-if="item.orderType == 1">
              <div :title="item.contractTitle"><span class="cTitle sas-cursor-pointer" @click="onToContractView(item.pid)">{{`《${__clipTextOverflow(item.contractTitle, 10)}》`}}</span></div>
              <div style="padding: 5px 0 0 5px;">{{item.ordersDtlList[0].prodName}}</div>
            </div>
            <div class="col-xs-25" v-if="item.orderType == 2">
              {{item.ordersDtlList[0].prodName}}
            </div>
            <div class="col-xs-25" v-if="item.orderType == 3" v-html="orderTitleHtml(item.ordersDtlList)">
            </div>

            <div class="col-xs-15 text-center" v-html="orderPriceHtml(item)"></div>
            <div class="col-xs-15 text-center" v-html="orderAmountHtml(item)"></div>
            <div class="col-xs-15 text-center">
              <span class="orderList-price-h">{{`${item.payFee/100}元`}}</span>
              <div style="font-size: 10px;" v-if="item.couponFee > 0 || item.balanceFee > 0">
                <div v-if="item.couponFee > 0">{{`抵价券:${item.couponFee/100}元`}}</div>
                <div v-if="item.balanceFee > 0">{{`云币:${item.balanceFee/100}元`}}</div>
              </div>
            </div>
            <div class="col-xs-15 text-center">{{item.status | __orderStatusFilter}}</div>
            <div class="col-xs-15 text-center  all-position" >
              <div v-if="item.status == __orderStatusEnum.unpaid">
                <span class='col-xs-6 '><router-link class="to-pay sas-text-decoration-none" :to="{ path: '/manage/user/order/recharge', query: { orderId: item.id}}"    target='_blank'>去支付</router-link></span>
                <span class='col-xs-6 text-left'>|<span class='sas-cursor-pointer' style='padding-left: 10px;' @click="onConfirmCancelOrder(item)">取消</span></span>
              </div>
              <div class='col-xs-8 col-xs-offset-3 text-left' v-if="item.status == __orderStatusEnum.inservice">
                <div class='col-xs-20'><i class='iconsprite icon-lawyer-phone'></i></div>
                <lvx-popover
                  :ref="`popover${index}`"
                  placement="top-start"
                  title=""
                  width="200"
                  trigger="hover"
                  @show="showLayerCellNum(item)"
                  :open-delay="1000"
                  :content="cellNum">
                </lvx-popover>
                <lvx-button class='col-xs-80 btn-lawyer-phone' type="text" v-popover="`popover${index}`">联系律师</lvx-button>
              </div>
              <div class="operBtn" v-if="item.status == __orderStatusEnum.unconfirmed">
                <span  @click="onConfirmAgreeOrder(item)"><span class='operation-btn2-h agree sas-text-decoration-none sas-cursor-pointer'>确认</span></span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span  @click="onOpenRedoDialog(item)"><span class='operation-btn1-h unagree sas-text-decoration-none sas-cursor-pointer'>继续服务</span></span>
              </div>
              <div v-if="item.status == __orderStatusEnum.completed" class="row">
                <span class='col-xs-6 col-xs-offset-6 text-left' @click="onOpenCommentDialog(item)" v-if="item.orderType == 1 && item.feedback == null"><span class='sas-text-decoration-none sas-cursor-pointer'>评价</span></span>
                <span class='col-xs-6 col-xs-offset-6 text-left' v-if="item.feedback == 1"  @click="onOpenComplaintDialog(item)"><span class='sas-text-decoration-none sas-cursor-pointer'>投诉</span></span>
              </div>
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
    <sas-confirm title="你确定取消该订单么?" :isShow.sync="confirmCancelOrder" @enSure="onCancelOrder"/>
    <sas-confirm title="是否确认完成该订单？" :isShow.sync="confirmAgreeOrder" @enSure="onAgreeOrder"/>
    <sas-redo-order :show.sync="dialogRedoOrderVisible" :order="currentActionOrder" @after-unagree="onUnagree"/>
    <sas-complaint-dialog :show.sync="dialogComplaintVisible" :order="currentActionOrder" @after-ok="afterComplaint"/>
    <sas-comment-dialog :show.sync="dialogCommentVisible" :order="currentActionOrder" @after-ok="afterComment" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import utils from '~/mixins/utils'
  import dialogRedoOrder from '~/components/dialog/dialog-redo-order'
  import dialogComplaint from '~/components/dialog/dialog-complaint'
  import dialogComment from '~/components/dialog/dialog-comment'
  import searchInput from '~/components/common/search-input'
  export default {
    name: 'my-order',
    metaInfo: {
      title: '我的订单-云合同'
    },
    layout: 'manager',
    data () {
      return {
        orderStatus: '',
        searchKey: '',
        pageSize: 10,
        pageNumber: 1,
        confirmCancelOrder: false, //取消订单二次确认框,
        confirmAgreeOrder: false, //确认完成订单二次弹窗
        dialogRedoOrderVisible: false, //修改订单对话框
        dialogComplaintVisible: false, //投诉对话框
        dialogCommentVisible: false, //评价对话框
        currentActionOrder: {},
        btnStyle: {'borderRadius': '2px'},
        loading: false,
        cellNum: '', //律师手机号码
      }
    },
    async fetchData(to, context) {
      let self = context;
      const r = await self.$axios.get(apis.getOrders, {
        params: {
          status: '',
          pageNumber: '',
          search: ''
        }
      }).then((data)=>data.data);
      if(r.success) {
        self.$store.state.Order.MyOrder.orderData = r.data;
      }
    },
    mixins: [utils],
    filters: {


    },
    computed: {
      ...mapState({
        user: state=> state.user,
        orderData: state=> state.Order.MyOrder.orderData,
      })
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      async showLayerCellNum(order) {
        const r = await this.$axios.get(apis.order_contract, {params: {
          orderId: order.id
        }}).then((res)=>res.data);
        this.cellNum = r.data ? r.data.cellNum : '';
      },
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
      orderAmountHtml(order) {
        if(order.orderType != 3) {
          return order.ordersDtlList[0].amount
        } else {
          let str = '';
          _.forEach(order.ordersDtlList, (value, key)=> {
            str += `<div style='margin-bottom: 10px;'>${value.amount}</div>`;
          });
          return str;
        }
      },
      orderTitleHtml(list) {
        let str = '';
        _.forEach(list, (value, key)=> {
          str += `<div style='padding-bottom: 10px;'>${value.prodName}</div>`
        });
        return str;
      },
      orderPriceHtml(order) {

        if(order.orderType != 3) {
          if(order.ordersDtlList[0].originalPrice == order.ordersDtlList[0].promotionPrice) {
            return `${order.ordersDtlList[0].originalPrice/100}元/${order.ordersDtlList[0].unit}`;
          } else {
            return `<span style='text-decoration: line-through;color:red;'><span style='color: black;'>${order.ordersDtlList[0].originalPrice/100}元/${order.ordersDtlList[0].unit}</span></span>${order.ordersDtlList[0].promotionPrice/100}元/${order.ordersDtlList[0].unit}`;
          }
        } else {
          let str = '';
          _.forEach(order.ordersDtlList, (value, key)=> {
            if(value.originalPrice == value.promotionPrice) {
              str += `<div style='margin-bottom: 10px;'>${value.originalPrice/100}元/${value.unit}</div>`;
            } else {
              str += `<div style='margin-bottom: 10px;'><span style='text-decoration: line-through;color:red;'><span style='color: black;'>${value.originalPrice/100}元/${value.unit}</span></span>${value.promotionPrice/100}元/${value.unit}</div>`;
            }
          });
          return str;
        }

      },

      async doSearch() {
        this.loading = true;
        const r = await this.$axios.get(apis.getOrders, {
          params: {
            status: this.orderStatus,
            pageNumber: this.pageNumber,
            search: this.searchKey
          }
        }).then((data)=>data.data);
        if(r.success) {
          this.loading = false;
          this.$store.state.Order.MyOrder.orderData = r.data;
        }
      },
      onConfirmCancelOrder(actionOrder) {
        this.currentActionOrder = actionOrder;
        this.confirmCancelOrder = true;
      },
      async onCancelOrder() {
        const r = await this.$axios.get(apis.cancelOrder, {params: {orderId: this.currentActionOrder.id}}).then((data)=>data.data);
        if(r.success) {
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '已取消'
          });
          this.doSearch();
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
        }
      },
      onConfirmAgreeOrder(actionOrder) {
        this.currentActionOrder = actionOrder;
        this.confirmAgreeOrder = true;
      },
      async onAgreeOrder() {
        const r = await this.$axios.get(apis.agreeOrder, {params: {orderId: this.currentActionOrder.id}}).then((data)=>data.data);
        if(r.success) {
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '已完成'
          });
          this.doSearch();
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
        }
      },
      onOpenRedoDialog(order) {
        this.currentActionOrder = order;
        this.dialogRedoOrderVisible = true;
      },
      async onToContractView(pid) {
        if(pid > 0) {
          let newPage = window.open('about:blank');
          const r = await this.$axios.get(apis.l_pageFlag, {params: {pid: pid}}).then((data)=>data.data);
          if(r.success) {
            let [flag, cid] = [r.data.flag, r.data.cid];
            switch(flag) {
              case 1:
                newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view?pid=${pid}&cid=${cid}`;
                // open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${pid}&cid=${cid}`);
                break;
              case 2:
                newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${pid}&cid=${cid}`;
                // open(`${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${pid}&cid=${cid}`);
                break;
              case 3:
                newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-postil?pid=${pid}&cid=${cid}`;
                // open(`${this.__getRouterBase()}/manage/contract/contract-postil?pid=${pid}&cid=${cid}`);
                break;
            }
          } else {
            newPage.close();
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: r.msg
            });
          }
        }
      },
      onOpenComplaintDialog(order) {
        this.dialogComplaintVisible = true;
        this.currentActionOrder = order;
      },
      onOpenCommentDialog(order) {
        this.dialogCommentVisible = true;
        this.currentActionOrder = order;
      },
      afterComplaint(r) {
        if(r) {
          this.doSearch();
        }
      },
      afterComment(r) {
        if(r) {
          this.doSearch();
        }
      },
      /*
      描述：提交继续服务后的回调钩子
      */
      onUnagree() {
        this.doSearch();
      }
    },
    components: {
      'sas-redo-order': dialogRedoOrder,
      'sas-search-input': searchInput,
      'sas-complaint-dialog': dialogComplaint,
      'sas-comment-dialog': dialogComment
    }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";

    .my-order{

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
                    .cTitle{
                      color: #4081ff;
                    }
                    .orderList-price-h{
                      color: #fc8f28;
                    }
                  }
                  .agree{
                    &:hover{
                      color: $theme-color;
                    }
                  }
                  .btn-lawyer-phone{
                    padding: 0;
                    padding-left: 10px;
                    color: #fc8f28;
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
  .col-xs-80 {
    width: 80%;
  }
  .col-xs-15 {
    width: 15%;
  }
  .col-xs-25, .col-xs-15, .col-xs-20, .col-xs-80{
    float: left;
    position: relative;
    min-height: 1px;
  }
  .to-pay{
    display: inline-block;
    color: #4081ff;
    padding: 0 10px;
    cursor: pointer;
    text-decoration: none;
    &:hover{
      color: #4081ff;
      text-decoration: none;
    }
  }
  .contact-lawyer{
    color: #fc8f28;
    cursor: pointer;
    text-decoration: none;
    &:hover{
      color: #fc8f28;
      text-decoration: none;
    }
  }
  .operBtn{
    .lvx-button--text{color: #333;}
  }
</style>
