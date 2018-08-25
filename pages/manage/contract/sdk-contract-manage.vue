<template>
  <div class="sdk-contract">
    <sas-breadcrumb >
      <sas-breadcrumb-item>合同管理</sas-breadcrumb-item>
      <sas-breadcrumb-item>第三方合同</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="content-bg">
      <div class="row">
        <div class="manage-title">第三方合同列表</div>
      </div>
      <div class="row select-pad">
        <div class="row form-bg">
          <div class="fl">
            合同来源：
            <sas-select  placeholder="请选择" :model="value" @change="change">
              <sas-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.name"
                :value="item.appId">
              </sas-option>
            </sas-select>
          </div>
          <div class="fr">
            <div class="row inputWrapAntBtn">
              <sas-search-input @after-search="search" placeholder="请输入合同名称或订单号" v-model="searchValue"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-center header-bg">
        <lvx-col :span="12" class="header-th">合同标题</lvx-col>
        <lvx-col :span="4" class="header-th">合同状态</lvx-col>
        <lvx-col :span="4" class="header-th">更新时间</lvx-col>
        <lvx-col :span="4" class="header-th">操作</lvx-col>
      </div>
      <div class="row form-pad" v-loading="loading" lvx-loading-background="rgba(255, 255, 255, 0)">
        <div class="row"  v-if="total>0" style="min-height: calc(100% - 50px);">
          <lvx-table class="" :data="myData" :show-header="false" stripe style="width: 100%;">
            <lvx-table-column min-width="250%">
              <template slot-scope="scope">
                <div class="title-width">
                  <div class="text-overflow" :title="scope.row.title">《{{scope.row.title}}》</div>
                  <div class="name-color"><div class="text-center text-icon" style="">源</div>{{scope.row.userName}}</div>
                </div>
              </template>
            </lvx-table-column>
            <lvx-table-column prop="status" align="center"  label="合同状态" >
              <template slot-scope="scope">
                <span class="status-color" v-if="scope.row.status == '已完成'">{{scope.row.status}}</span>
                <span class="status-color1" v-else>{{scope.row.status}}</span>
              </template>
            </lvx-table-column>
            <lvx-table-column prop="gmtModify" align="center"  label="更新时间" ></lvx-table-column>
            <lvx-table-column label="操作" align="center" >
              <template slot-scope="scope">
                <router-link :to="{path:'sdk-contract-view',query:{pid:scope.row.id}}" target="_blank">
                  <lvx-button type="text">查看</lvx-button>
                </router-link>
              </template>
            </lvx-table-column>
          </lvx-table>
        </div>
        <div class="row text-center" v-else style="margin: 80px">
          <img v-imgerror src="~/assets/img/src/user/userManage/noMessage.png">
          <p class="no-message">没有找到匹配的记录</p>
        </div>
        <div class="text-right page-mar" v-show="total > limit">
          <sas-pagination :total="total" :currentPage="currentPage" :page-size='limit' @current-change="pageChange"></sas-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  import searchInput from '~/components/common/search-input'
  export default{
    name: 'sdk-contract',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'第三方合同-云合同'
    },
    data(){
      return {
        total:0,
        myData:[],
        options: [],
        value: '所有合同',
        changeStatus: '', //合同状态搜索
        searchValue: '',
        currentPage: 1,  //当前页
        pageSize: 0,
        limit: 7,
        loading: false
      }
    },
    computed: {
      ...mapState({

      })
    },
  mounted(){
    this.getSelect();

    const that = this;
    let whiteheight = $(".form-pad").height();
    if(whiteheight > 150){
      that.limit = Math.floor((whiteheight - 50) / 72);
    }else{
      that.limit = 1;
    }
    that.getData();
  },
  methods:{
    getSelect(){
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.l_manage,
          })
          .then(function (res) {
            self.options = res.data.data.thirdList;
          })
      });
      return promise;
    },
    change(v) {
      this.changeStatus = v;
      this.pageSize = 0;
      this.getData();
    },
    search(){
      this.pageSize = 0;
      this.getData();
    },
    getData(){
      this.loading = true;
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'post',
            url: apis.l_manage,
            data:{appId: self.changeStatus,title: self.searchValue ,offset: self.pageSize,limit: self.limit}
          })
          .then(function (res) {
            if(res.data.code == 200){
              self.loading = false;
              var list =  res.data.data.rows;
              for(var value in list){
                if(list[value].status == 2){
                  list[value].status = '已完成';
                }else{
                  list[value].status = '未知';
                }
              }
              self.total = res.data.data.total;
              self.myData = list;
            }
          })
      });
      return promise
    },
    pageChange(v){
      this.currentPage = v;
      this.pageSize = (v-1) * this.limit;
      this.getData();
    }
  },
  components: {
      'sas-search-input': searchInput
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .sdk-contract {
  @include responsive-default {
    margin:0 auto;
    height:97%;
    .fl{float: left;}
    .fr{float: right;}
    .lvx-form-item{margin-bottom:0;}
    .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .content-bg {
      height: calc(100% - 34px);
      background-color: #fff;
      margin-top: 20px;
      border: 1px solid #b9c5dd;
      .manage-title{
        margin: 13px 20px; font-size: 16px; border-left: 5px solid #4181ff; text-indent: 9px;}
      .select-pad{
        padding: 6px;background-color:#fff;
        .form-bg {
          background-color: #f5f8fa;
          padding: 12px 0 12px 50px;
        }
      }
      .header-bg{
        border-bottom:1px solid #b9c5dd;border-top:1px solid #b9c5dd;background-color: #e6ecf5;
        .header-th{border-right:1px solid #b9c5dd;height:62px;line-height: 60px;}
        .header-th:last-child{border-right:none}
      }
      .form-pad {
        height: calc(100% - 200px);
        padding:0 6px 6px;background-color:#fff;
        .title-width{padding-left: 30px;}
        .name-color{color: #999;}
        .text-icon{
          display: inline-block; height: 16px; width: 16px;
          line-height: 16px; font-size: 12px; background-color: #959595;
          color:#fff; border-radius: 3px; margin:0 5px;}
        .status-color{color: #ffac40;}
        .status-color1{color: #ec2626;}
        .page-mar{margin-top: 20px;}
      }
    .no-message{margin-right: 45px; margin-top: 20px;}
    }
  }
  }
</style>
