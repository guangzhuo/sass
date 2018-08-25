<template>
  <div class="signName">
    <div class="row sign-bg">
      <div class="row list-pad list-border">
        <router-link :to="{path:'/manage/user/sign/signSet'}" >
          <div>返回</div>
        </router-link>
      </div>
      <div class="row table list-pad">
        <div class="table-label"><span>印章使用记录</span></div>
        <lvx-table  class="mar-top" :data="userList" stripe border style="width: 100%">
          <lvx-table-column prop="useUserName" label="使用人" align="center"></lvx-table-column>
          <lvx-table-column prop="gmtCreate" label="使用时间" align="center"></lvx-table-column>
          <lvx-table-column label="使用合同名称" align="center">
            <template slot-scope="scope">
              <div class="text-overflow" :title="scope.row.contractTitle">{{scope.row.contractTitle}}</div>
            </template>
          </lvx-table-column>
        </lvx-table>
        <div class="row text-right mar-top" v-show="pagesList > 20">
          <sas-pagination :total="pagesList" :page-size="pageSize" :current-page="currentPage" @current-change="pageChange"></sas-pagination>
        </div>
      </div>
      <div class="row">

      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'signName',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'使用记录-云合同'
    },
    data(){
      return {
//        userList:[],
        currentPage: 1, //当前页
//        pagesList: '', //总页数
        pageSize:20,//每页n条
        sealId:sessionStorage.getItem("sealId")
      }
    },
    async fetchData (to, context) {
       let self = context;
        var sealId = sessionStorage.getItem("sealId");
       const r = await self.$axios({
       method: 'post',
       url: apis.queryPageListByCondition,
       data: {sealId:sealId,sealUserId:'',useUseId:'',contractId:'',pageNum:1,pageSize:20}
       }).then((res)=> res.data);
      var list = r.data;
      for(var v in list.rows){
        var creattime=list.rows[v].gmtCreate;
        var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
        timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
        list.rows[v].gmtCreate=timevalue;
      }
       self.$store.state.myAccount.seal.userList = r.data.rows;
       self.$store.state.myAccount.seal.pagesList = r.data.total;
     },
    computed: {
      ...mapState({
        userList: state => state.myAccount.seal.userList,
        pagesList: state => state.myAccount.seal.pagesList,
      })
  },
  mounted(){

  },
  methods:{
    getUseList(){
      const self = this;
      self.$axios({
          method: 'post',
          url: apis.queryPageListByCondition,
          data:{sealId:self.sealId,sealUserId:'',useUseId:'',contractId:'',pageNum:self.currentPage,pageSize:self.pageSize},
        })
        .then(function (res) {
          if(res.data.code == 200){
            var list = res.data.data;
            for(var v in list.rows){
              var creattime=list.rows[v].gmtCreate;
              var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
              timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
              list.rows[v].gmtCreate=timevalue;
            }
            self.$store.state.myAccount.seal.userList = list.rows;
            self.$store.state.myAccount.seal.pagesList = list.total;
          }
        });
        return promise
      },
    /*分页*/
    pageChange(v){
      this.currentPage = v;
      this.getUseList();
    }
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .signName{
  @include responsive-default {
    margin: 0 auto;
    height: 97%;
    min-height: 250px;
    .sign-bg{
      min-height: 100%;
      margin-bottom: 30px;
      background-color: #fff;
      .list-pad{padding: 20px 30px ;}
      .list-border{
        border-bottom: 1px solid #ddd;
        a{
          &:hover{
             text-decoration:none;
             color:#4081ff;}
          &:link{text-decoration:none;}
        }
      }
      .mar-top{margin-top: 20px;}
      .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
      }
    }
  }
</style>
<style lang="scss">
.signName{
  .table{
    table{
      border-collapse:separate;
    }
  .lvx-table td{padding: 2px 0;}
  .lvx-table th{background-color: #d9d9d9;color: #333; padding: 8px 0}
  }
}
</style>



