<template>
  <div class="template">
    <div class="row position">
      <img v-imgerror src="~/assets/img/src/template/temp-banner.png" width="100%" height="100%"/>
      <p class="img-title">若需要定制合同，资深律师为你提供专业服务，马上试试
        <span class="btn-span" @click="toLawyer">律师代写</span>
      </p>
    </div>
    <div class="row mar-top temp-heihgt">
      <div class="lx-container">
        <div class="row">
          <lvx-col :span="3" class="temp-bor">
            <ul class="template-content-ul-w">
              <li v-for="(list,index) in templeType" @click="tempType(list.typeId,index)" :class="{active:list.isClick}">{{list.typeName}}({{list.templateNum}})</li>
            </ul>
          </lvx-col>
          <lvx-col :span="21" class="temp-box">
            <div class="row">
              <lvx-col :span="12">
                <h4>合同模板(总模板数：{{tempTotal}})</h4>
              </lvx-col>
              <lvx-col :span="12" class="small-text">
                <div class="row">
                  <div class="row fr input-bor">
                    <input placeholder="请输入合同名称" class="temp-input" v-model="searchVal">
                    <sas-button class="search-btn" @click="search()">搜索</sas-button>
                  </div>
                </div>
                <div class="row text-right" style="margin-top: 10px;">
                  <span class="pointer" :class="{active: isActive}" @click="flowSort">按最高浏览量排序</span> 丨
                  <span class="pointer" :class="{active: !isActive}" @click="timeSort">按最新时间排序</span>
                </div>
              </lvx-col>
            </div>
            <div class="row temp-table mar-top">
              <lvx-table :data="tableData" stripe style="width: 100%">
                <lvx-table-column label="合同名称">
                  <template slot-scope="scope">
                    <router-link :to="{path:'/template/detail',query:{uuid:scope.row.uuid,templateid:scope.row.id,templatename:scope.row.name}}"  target="_blank">
                      <div class="cell text-over" :title="scope.row.name">{{scope.row.name}}</div>
                    </router-link>
                  </template>
                </lvx-table-column>
                <lvx-table-column prop="typeId" label="行业类型"></lvx-table-column>
                <lvx-table-column label="发布时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.gmtModify}}</span>
                  </template>
                </lvx-table-column>
                <lvx-table-column prop="pageViews" label="浏览量" width="100"></lvx-table-column>
              </lvx-table>
            </div>
          </lvx-col>
        </div>
        <div class="row text-right mar-top" v-show="total > 10">
          <sas-pagination :total="total" :currentPage="current_page" @current-change="pageChange"></sas-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import _ from 'lodash'
  import utils from '~/mixins/utils'
  export default {
    name: 'template',
    metaInfo: {
      title: '电子合同模板免费下载-云合同',
      meta: [{
        name: 'keywords',
        content: '电子合同模板，电子合同样本，合同下载，合同模板库'
      },{
        name: 'description',
        content: '云合同合同模板库为你免费提供含劳动人事合同，买卖合同，知识产权合同，借款担保合同，租赁合同等最新的电子合同模板样式。'
      }]
    },
    data () {
      return {
        templeType:[],
        tableData:[],
        total: 0,
        searchVal:'',
        current_page: 1,
        limit:10,
        orderBy:1,  //排序方式
        isActive: true,
        tempTotal: '',
        tempId:1
      }
    },
    mixins: [utils],
    computed: {
      ...mapState({

      })
    },
    watch: {
    },
    mounted () {
      this.fresh();
      this.typeList();
    },
    methods: {
      search(){
        this.fresh();
      },
      toLawyer(){
        this.$router.push({path: '/manage',query: {template: 1}});
      },
      pageChange(v) {
        this.current_page = v;
        this.fresh();
      },
      typeList(){
        let self = this;
        self.$axios({
            method: 'get',
            url: apis.typeList,
          })
          .then(function (res) {
            var list = res.data.data;

            /*var len = list.length;
            //新数组
            var temp1 = list.slice(len-1,len);
            var temp2 = list.slice(0,len-1);
            list = temp1.concat(temp2);*/
            self.templeType = list;
            self.tempTotal = list[0].templateNum; //模板总数

            self.templeType[0].isClick = true; //选中样式
            for(var i=1; i<self.templeType.length; i++){
              self.templeType[i].isClick = false;
            }
          })
      },
      tempType(id,index){
        this.current_page = 1;
        this.tempId = id;
        //模板类型选中颜色改变
        for(var i=0; i<this.templeType.length; i++){
          this.templeType[i].isClick = false;
        }
        this.templeType[index].isClick = !this.templeType[index].isClick;

        this.fresh();
      },
      //加载页面内容
      fresh(){
        var number = (this.current_page - 1)*this.limit;
        let self = this;
        self.$axios({
            method: 'get',
            url: apis.templateLise,
            params: {order:"asc",limit:self.limit,offset: number,isMySelf:self.tempId,search:self.searchVal,orderBy:self.orderBy}
          })
          .then(function (res) {
            var list = res.data;

              self.total = res.data.total;//分页
              self.tableData = list.rows; //模板列表
              for(var v in list.rows){
                var creattime=list.rows[v].gmtModify;
                var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
                timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
                list.rows[v].gmtModify=timevalue;
              }
            })
        },
        flowSort(){
          this.isActive = true;
          this.orderBy = 1;
          this.fresh();
        },
        timeSort(){
          this.isActive = false;
          this.orderBy = 2;
          this.fresh();
        }
      },
      timeSort(){
        this.isActive = false;
        this.orderBy = 2;
        this.fresh();
      }
    }

</script>

<style lang="scss" scoped >
  @import "~styles/base.scss";
  .template{
  @include responsive-default {
    margin-top: 67px;
    .pointer{cursor: pointer}
    .fl{float: left;}
    .fr{float: right;}
    .position{
      position: relative;
    .img-title{
      color: #929292;
      position: absolute;
      top: 58%;
      left: 50.8%;
    }
  }
  .btn-span{
    color: #4081ff;
    cursor: pointer
  }
  .temp-heihgt{
    margin-bottom: 50px;
    /*height: 670px*/
  }
  .mar-top{margin-top: 20px;}
  .active{color: #5991fe;}
  .temp-bor{
    border-right: 1px solid #efefef;}
  .template-content-ul-w{
    padding-left: 0;
  li{
    width: 100%;
    height: 40px;
    font-size: 14px;
    line-height: 50px;
    text-indent: 21px;
    position: relative;
    list-style-type:none;
  &:hover{
     color: #5991fe;
     cursor: pointer;
   }
  }
  }
  .temp-box{
    padding: 5px 25px;
  }

  .text-over{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .small-text{
    font-size: 12px;
  .input-bor{
    border-bottom: 1px solid #efefef;
    padding-bottom: 10px;
  .temp-input{
    border: none;
    outline: none;
  }
  }
  }
  .search-btn{
    border: none;
    padding: 3px 8px;
    background-color: #eee;
    color: #666;
    font-size: 12px;;
  }
  }
  }
</style>
<style lang="scss" >
  .temp-table{
  .lvx-table th{background-color: #E8ECF5;}
  .lvx-table th > .cell{color: #333;}
  .lvx-table .cell{color: #999}
  .lvx-table td div{color: #999}
  a:hover{text-decoration: none;}
  a:hover div{color: #333;}
  }
</style>
