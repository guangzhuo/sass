<template>
  <div class="signature">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ path: 'userManage' }">用户信息</sas-breadcrumb-item>
      <sas-breadcrumb-item>签署服务</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="content-bg">
      <div class="row sign-bg">
        <div class="row sign-head">
          <img v-imgerror src="~/assets/img/src/user/signature/service-list.png" width="18px" height="21px">
          <span>云合同签署服务列表</span>
        </div>
        <div class="row sign-mar">签署服务</div>
        <div class="row text-center">
          <lvx-col :span="4" :offset="1" class="sign-box" v-for="(list,index) in signature" :key="index">
            <div class="box-head">{{ list.name }}</div>
            <div class="box-text">
              <div class="row price-line">
                <div class='fl icon'>￥</div>
                <div class="fl price">{{ list.price/100 }}.0</div>
              </div>
              <div class="row">签署服务：{{list.count}}次</div>
              <div class="row sign-time">有效期：永久有效</div>
              <router-link :to="{path:'/manage/user/order/manager',query:{prodName:list.name,prodPrice:list.price/100,prodCode:list.code}}">
                <sas-button category="primary">立即购买</sas-button>
              </router-link>
            </div>
          </lvx-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'signature',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'签署服务-云合同'
    },
    data(){
      return {
      }
    },
  async fetchData (to, context) {
    let self = context;
    const r = await self.$axios({
        method: 'get',
        url: apis.queryProducts,
      })
      .then((res)=> res.data.data);
      self.$store.state.myAccount.signature.signature = r;
  },
  computed: {
  ...mapState({
        signature: state => state.myAccount.signature.signature,
    })
  },
  }
 </script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .fl{float: left;}
  .fr{float: right;}
  .signature{
    @include responsive-default {
      margin: 0 auto;
      height: 97%;
      .content-bg{
        height: calc(100% - 34px); background-color: #fff;
        .sign-bg{
          margin-top: 20px;
          background-color: #fff;
          padding: 0 30px;
          .sign-head{
            height: 60px; line-height: 60px; font-size: 16px; border-bottom: 1px solid #e1e1e1;
            img{margin-right: 5px;margin-top: -3px;}
          }
          .sign-mar{margin: 30px 0 25px;}
          .sign-box{
            border: 1px solid #e1e1e1; padding: 1px; margin-bottom: 20px;
            .box-head{background-color: #ebebeb; height: 50px; line-height: 50px;}
            .box-text{
              padding: 1.5vh 0 3.5vh; font-size: 12px;
              .price-line{
                display: inline-block; margin-bottom: 10px;
              .icon{margin-top: 8px;}
              .price{font-size: 36px;}
              }
            .sign-time{margin: 1vh 0 3.5vh;}
            }
          }
          .text-center{
          .lvx-col-offset-1:first-child{margin-left: 0;}
          }
        }
      }
    }
  }
</style>
