<template>
  <div class="manage-contract">
    <sas-breadcrumb separator=">">
      <sas-breadcrumb-item>合同管理</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{ name: 'manage-contract-contract' }">我的合同</sas-breadcrumb-item>
      <sas-breadcrumb-item>查看列表</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="container-content-bg-w">
      <div class="container-content-white">
        <section class="row contract-table">
            <lvx-table
              :data="viewauth.listMap"
              style="width: 100%"
              header-row-class-name="con-th-d"
              stripe
              >
              <template slot="empty">
                <img src="~assets/img/src/contract/noMessage.png" />
                <p class="nomessage">没有找到匹配的记录</p>
              </template>
              <lvx-table-column
                prop="title"
                label="合同标题">
                <template slot-scope="scope">
                  <div class="text-overflow" :title="scope.row.title">{{ scope.row.title }}</div>
                </template>
              </lvx-table-column>
              <lvx-table-column
                label="合同状态"
                width="200">
                <template slot-scope="scope">
                  {{ scope.row.rowsStatus | tostatus}}
                </template>
              </lvx-table-column>
              <lvx-table-column
                width="300"
                label="查看人" >
                <template slot-scope="scope">
                  <span :title="scope.row.toUids">{{ scope.row.subtoUids }}</span>
                  <span @click="boxalert(scope.row.toUids)" v-if="scope.row.showmore == true" class="show-more">查看更多</span>
                </template>
              </lvx-table-column>
              <lvx-table-column
                label="操作" width="180">
                <template slot-scope="scope">
                  <lvx-button @click="handleClick(scope.row)" type="text" size="small">取消查看</lvx-button>
                </template>
              </lvx-table-column>
            </lvx-table>
        </section>
        <footer class="row text-right" v-if="viewauth.total>pageSize">
          <sas-pagination :total="viewauth.total" :currentPage="currentPage" :pageSize="pageSize" @current-change="pageChange"></sas-pagination>
        </footer>
      </div>
    </div>
    <div>
      <sas-dialog-auth :show.sync="showAuth" :pid='temps.id' :title="temps.title"/>
      <sas-dialog
        :show.sync="CheckManVisible"
        title="查看人"
        width="30%"
      >
        <div class="auth-view-alert-w">
          <span v-for="(item, index) in strs" :key="index" class='strs-padding-w' title='item'>{{ item.length>25 ? item.substring(0,24)+'...': item}}</span>
        </div>
        <footer style="width:100%;text-align:center;padding-bottom: 15px;">
          <sas-button category="primary" @click="CheckManVisible = false">确定</sas-button>
        </footer>

      </sas-dialog>
    </div>
    <div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  import dialogauth from '~/components/dialog/dialog-view-authdiv'
  export default {
    name: 'manage-contract',
    layout: 'manager',
    extends: base,
    metaInfo: {
      title: "查看列表—云合同",
    },
    async fetchData(to, context){
      let self = context;
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 304) / 66);
      const List = await self.$axios.get(apis.viewAuth, {
        params: {
          offset:0,
          limit: limitvalue,
        }
      }).then((data) => data.data.data);

      //文字截取
        let Screenwidth = window.screen.width,
            tfont = 0,
            vfont = 0;
            //console.log(Screenwidth);
        if( Screenwidth <= 1366 ){
          tfont = 10;
          vfont = 10;
        }else if(Screenwidth > 1366 && Screenwidth <= 1600){
          tfont = 15;
          vfont = 14;
        }else{
          tfont = 20;
          vfont = 17;
        }

      for (let i=0;i<List.rows.length;i++){
          let reCh=/[u00-uff]/;
        let strlen =0;
        //console.log(List.rows[i].toUids.length);
        // for(let j=0;j<List.rows[i].toUids.length;j++){
        //     if(!reCh.test(List.rows[i].toUids.charAt(j))==true){
        //       strlen = strlen + 2;
        //     }else{
        //       strlen = strlen + 1;
        //     }
        // }
        // strlen = Math.ceil(strlen/2);

        if(List.rows[i].toUids.length > vfont){
          List.rows[i].showmore=true;
          List.rows[i].subtoUids = List.rows[i].toUids.substr(0,vfont) + '...';
        }else{
          List.rows[i].showmore=false;
          List.rows[i].subtoUids = List.rows[i].toUids;
        }

        if(List.rows[i].title.length > tfont){
             List.rows[i].subtitle = List.rows[i].title.substr(0,tfont) + '...';
          }else{
             List.rows[i].subtitle = List.rows[i].title;
          }
      }
      self.$store.state.Contract.list.contractauthmanage = {
        listMap: List.rows,
        total: List.total,
      };
    },
    data () {
      return {
        currentPage:1,
        pageSize:8,
        CheckManVisible: false,
        strs:[],
        tableData3:[],
        showAuth: false,
        temps:{
          id:'',
          title:'',
        },
      }
    },
    filters: {
      toview:function (value) {
        let reCh=/[u00-uff]/;
        let strlen =0;
        for(let i=0;i<value.length;i++){
            if(!reCh.test(value.charAt(i))==true){
              strlen = strlen + 2;
            }else{
              strlen = strlen + 1;
            }
        }
        strlen = Math.ceil(strlen/2);
        if(strlen >= 20){
          return value.substring(0,20)+'...';
        }else{
          return value;
        }
      },
      tostatus:function (value) {
        var strRowsStatus = '';
        switch(value){
          case 0:
            strRowsStatus='起草中';
            break;
          case 3:
            strRowsStatus='已完成';
            break;
          default:
            strRowsStatus='异常状态';
        }
        return strRowsStatus;
      },
      totitle:function (value) {
        if(value.length>= 20){

          if(value.length*2 <= 20) {
            return value;
          }
          var str;
          var strlen = 0;
          var s = "";
          for(var i = 0;i < value.length; i++) {
            s = s + value.charAt(i);
            if (value.charCodeAt(i) > 128) {
              strlen = strlen + 2;
              if(strlen >= 20){
                str = s.substring(0,s.length-1) + "...";
              }
            } else {
              strlen = strlen + 1;
              if(strlen >= 20){
                str = s.substring(0,s.length-2) + "...";
              }
            }
          }
          return str;
        }else {
          return value;
        }
      }
    },
    computed: {
      ...mapState({
        viewauth: state => state.Contract.list.contractauthmanage,
      }),
    },
    watch: {
    },
    mounted () {
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 304) / 66);
      this.pageSize = limitvalue;
      const that = this;
      // window.onresize = function(){

      //   let whiteheight = $(".container-content-white").height();
      //   if(whiteheight > 244){
      //       that.pageSize = Math.floor((whiteheight - 142) / 66);
      //   }else{
      //       that.pageSize = 1;
      //   }
      //  that.confresh();
      // }
    },
    methods: {
      handleClick(rows){
        this.temps = rows;
        this.showAuth = true;
      },
      async confresh(){
        const List = await this.$axios.get(apis.viewAuth, {
          params:{
            offset: this.currentPage,
            limit: this.pageSize,
          }
        }).then((res)=> res.data.data);

        //文字截取
        let Screenwidth = window.screen.width,
            tfont = 0,
            vfont = 0;
            //console.log(Screenwidth);
        if( Screenwidth <= 1366 ){
          tfont = 10;
          vfont = 10;
        }else if(Screenwidth > 1366 && Screenwidth <= 1600){
          tfont = 15;
          vfont = 14;
        }else{
          tfont = 20;
          vfont = 17;
        }

        for (let i=0;i<List.rows.length;i++){
          let reCh=/[u00-uff]/;
          let strlen =0;

          if(List.rows[i].toUids.length > vfont){
            List.rows[i].showmore=true;
            List.rows[i].subtoUids = List.rows[i].toUids.substr(0,vfont) + '...';
          }else{
            List.rows[i].showmore=false;
            List.rows[i].subtoUids = List.rows[i].toUids;
          }

          if(List.rows[i].title.length > tfont){
             List.rows[i].subtitle = List.rows[i].title.substr(0,tfont) + '...';
          }else{
             List.rows[i].subtitle = List.rows[i].title;
          }
      }

        this.$store.state.Contract.list.contractauthmanage = {
          listMap: List.rows,
          total: List.total,
        }
      },
      async pageChange(val){
        this.currentPage=val;
        let offsevalue = (this.currentPage-1) * this.pageSize;
        const List = await this.$axios.get(apis.viewAuth, {
          params: {
            offset:offsevalue,
            limit:this.pageSize,
          }
        }).then((data) => data.data.data);
        //文字截取
        let Screenwidth = window.screen.width,
            tfont = 0,
            vfont = 0;
            //console.log(Screenwidth);
        if( Screenwidth <= 1366 ){
          tfont = 10;
          vfont = 10;
        }else if(Screenwidth > 1366 && Screenwidth <= 1600){
          tfont = 15;
          vfont = 14;
        }else{
          tfont = 20;
          vfont = 17;
        }

        for (let i=0;i<List.rows.length;i++){
          let reCh=/[u00-uff]/;
          let strlen =0;

          if(List.rows[i].toUids.length > vfont){
            List.rows[i].showmore=true;
            List.rows[i].subtoUids = List.rows[i].toUids.substr(0,vfont) + '...';
          }else{
            List.rows[i].showmore=false;
            List.rows[i].subtoUids = List.rows[i].toUids;
          }

          if(List.rows[i].title.length > tfont){
             List.rows[i].subtitle = List.rows[i].title.substr(0,tfont) + '...';
          }else{
             List.rows[i].subtitle = List.rows[i].title;
          }
      }

        this.$store.state.Contract.list.contractauthmanage = {
        listMap: List.rows,
        total: List.total,
      };
        // this.listMap = List.rows;
        // this.total=List.total;
      },
      boxalert(node){
        this.strs = [];
        this.CheckManVisible = true;
        this.strs = node.split("、");
        //console.log(this.strs);
        //console.log(333);
      },
      cutString(str, len) {
        //length属性读出来的汉字长度为1
        if(str.length*2 <= len) {
          return str;
        }
        var strlen = 0;
        var s = "";
        for(var i = 0;i < str.length; i++) {
          s = s + str.charAt(i);
          if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if(strlen >= len){
              return s.substring(0,s.length-1) + "...";
            }
          } else {
            strlen = strlen + 1;
            if(strlen >= len){
              return s.substring(0,s.length-2) + "...";
            }
          }
        }
        return s;
      }
    },
    components: {
      'sas-dialog-auth': dialogauth,
    }
  }
</script>
<style>
  .lvx-table thead {
    font-size: 12px;
    color: #333;
    font-weight: 500;
  }
  .lvx-table th, .lvx-table td {
    padding: 0px 18px;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }
  .lvx-table th > .cell{
    height: 40px;
    line-height: 40px;
  }
  .lvx-cascader__label{
    text-align: center;
    padding: 6px 25px 0 15px;
  }
  .lvx-input__suffix{
    right: 10px;
  }
  .lvx-table th div{
    width: 200px;
  }
  .lvx-table td{
    padding-left: 40px;
    height: 66px;
    font-size: 12px;
    border-bottom:none;
  }
  .lvx-table th{
    padding-left: 40px;
  }
  .lvx-table .con-th-d{
    background-color: #e8f0f9;
    height: 40px;
  }
  .auth-view-alert-w {
    width: 93%;
    margin: 25px auto;
    text-align: left;
  }
  .strs-padding-w {
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    color: #959595;
    display: inline-block;
    margin: 0 10px 10px 0;
    padding: 5px 10px;
  }
  .strs-padding-w:hover {
    color: #313131;
    cursor: pointer;
  }
  .lvx-table__empty-block{
    overflow: hidden;
    min-height: 350px;
  }
</style>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .manage-contract{

  .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .container-header-w{
      padding-bottom:20px;
      color: #333;
      position: relative;
      a{ color: #333;
        &:hover{ color: #333;}
      }
      span{color: #4081ff; }
      // &.arrow-icon{width: 10px; height: 15px; display: inline-block; background: rgba(0, 0, 0, 0) url("../images/saas/arrow-icon.png") no-repeat scroll 3px 4px;}
    }

    //列表内容
    .container-content-bg-w{
      height: calc(100vh - 106px);
      padding: 15px 0px;
      .container-content-white{
        position: relative;
        background-color: $body-bg;
        height: 100%;
        padding: 18px 18px 0 18px;
      }
      .contract-table{
        min-height: calc(100% - 100px);
        margin: 20px 0;
      }
      .pagelist{
        position: absolute;
        bottom: 20px;
        right: 18px;
      }
      .show-more{
        color: #4081ff;
        cursor: pointer;
        font-size: 12px;
      }
      .nomessage {
        padding-right: 66px;
        padding-top: 17px;
      }
    }
  }

</style>
