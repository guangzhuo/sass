<template>
  <div class="template">
    <section class="template-bg">
      <div class="template-header-title-w">合同模板</div>
      <form :model="ruleForm">
        <div class="row" :class="{navfixed: isScroll}">
          <input v-xss v-model="ruleForm.value" class="template-search-input-w" type="text">
          <div @click="tableFresh(ruleForm)" class="template-search-btn-w">搜索</div>
        </div>
        <footer class="template-footer-w">
          <span v-for="item in template" @click="spanClick(item.name,ruleForm)">{{ item.name }}</span>
        </footer>
      </form>
    </section>
    <section class="template-index-content-w">
      <div class="lx-container">
        <div class="row">
          <aside>
            <ul class="template-content-ul-w">
              <li v-for="item in templeType" @click="fresh(item.id,item.index,0)" :class="{active:item.isClick}">{{item.type}}<span> > </span></li>
            </ul>
          </aside>
          <section class="row">
            <div class="template-content-w">
              <div  v-for="list in templateList">
                <router-link :to="{path:'/template/detail',query:{uuid:list.uuid,templateid:list.id,templatename:list.name}}"  target="_blank">
                  <div class="template-bg-h">
                    <p>{{list.name}}</p>
                  </div>
                </router-link>
                <!--<a href="/template/detail" target="_blank">
                  <div class="template-bg-h" @click="goDeyail(list.uuid,list.id,list.name)">
                    <p>{{list.name}}</p>
                  </div>
                </a>-->
              </div>
            </div>
          </section>
        </div>
        <div class="row text-center">
          <div class="page" v-show="this.pages>1">
            <div class="pagelist">
              <span class="jump" :class="{disabled:pstart}" @click="reducePage()">上一页</span>
              <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
              <span class="jump" :class="{disabled:pend}" @click="addPage()">下一页</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  export default {
    name: 'template',
    extends: base,
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
        isScroll: false,
        scroll: '',
        ruleForm: {
          value: ""
        },
        type: this.$route.query.type,
        search: '',
        current_page: 1, //当前页
        pages: '', //总页数
        number: 0,
        nowIndex:0,
        isMySelf: '',
        template:[
          {name:"劳动"},
          {name:"买卖"},
          {name:"专利"},
          {name:"借款"}
        ],
        templeType:[
          {type: '全部分类',id:1,isClick:false,index:0},
          {type: '买卖合同',id:3,isClick:false,index:1},
          {type: '服务合同',id:6,isClick:false,index:2},
          {type: '劳动合同',id:2,isClick:false,index:3},
          {type: '借贷担保',id:4,isClick:false,index:4},
          {type: '广告合同',id:11,isClick:false,index:5},
          {type: '技术合同',id:10,isClick:false,index:6},
          {type: '知识产权',id:9,isClick:false,index:7},
          {type: '加工承揽',id:8,isClick:false,index:8},
          {type: '委托合同',id:7,isClick:false,index:9},
          {type: '赠与合同',id:14,isClick:false,index:1},
          {type: '居间行纪',id:13,isClick:false,index:11},
          {type: '租赁合同',id:5,isClick:false,index:12}
        ],
        templateList:[]
      }
    },
    computed: {
      ...mapState({
        pstart: function() {
          return this.current_page == 1;
        },
        pend: function() {
          return this.current_page == this.pages;
        },
        indexs: function() {
          var left = 1,
            right = this.pages,
            ar = [];
          while (left <= right) {
            ar.push(left);
            left++;
          }
          return ar;
        }
      })
  },
  watch: {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
    this.fresh();
  },
  methods: {
    goDeyail(uuid,templateid,templatename){
      sessionStorage.setItem("uuid",uuid);
      sessionStorage.setItem("templateid",templateid);
      sessionStorage.setItem("templatename",templatename);
    },
    reducePage:function(){
      if(this.current_page>1){
        this.current_page--;
        var id = this.current_page;
        this.number = (id - 1)*20;
        this.typeChange();
      }
    },
    addPage:function(){
      if(this.current_page<5){
        this.current_page++;
        var id = this.current_page;
        this.number = (id - 1)*20;
        this.typeChange();
      }
    },
    jumpPage: function(id) {
      this.current_page = id;
      this.number = (id - 1)*20;
      this.typeChange();
    },
    //滚动页面搜索固定
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>240){
        this.isScroll = true;
      }else{
        this.isScroll = false;
      }
    },
    //
    typeChange(){
      if(this.isMySelf == 2){
        var isMySelf = 2;
        var index = 3;
        this.fresh(isMySelf,index);
      }else{
        this.fresh();
      }
    },
    //加载页面内容
    fresh(isMySelf,index,page){
      if(index==undefined || index=="" || index==null){
        index = 0;
      }
      if(isMySelf==undefined || isMySelf=="" || isMySelf==null){
        /*网站地图跳转*/
        if(this.search != ''){
          index = 0; this.isMySelf = 1;
        }else{
          if(this.type == 1){
            this.isMySelf = 2; index= 3;
          }
          if(this.type == 2){
            this.isMySelf = 3; index= 1;
          }
          if(this.type == 3){
            this.isMySelf = 9; index= 7;
          }
          if(this.type == 4){
            this.isMySelf = 4; index= 4;
          }
          if(this.type == 5){
            this.isMySelf = 5; index= 12;
          }else if(this.type == undefined){
            this.isMySelf = 1;
          }
        }
      }else{
        this.isMySelf = isMySelf;
      }
      /*模板类型选中颜色改变*/
      for(var i=0;i<this.templeType.length;i++){
        this.templeType[i].isClick = false;
      }
      this.templeType[index].isClick =! this.templeType[index].isClick;
      if(page == 0){
        this.current_page = 1;
      }
      var number = (this.current_page - 1)*20;
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.templateLise,
            params: {order:"asc",limit:20,offset: number,isMySelf:self.isMySelf,search:self.search}
          })
          .then(function (res) {
            var r = res.data;
            if(r.total>0){
              self.templateList = r.rows;
              self.pages = Math.ceil(r.total/20);
            }else{
              self.$alert('当前分类暂未收录相关合同模板', '合同模板', {
                confirmButtonText: '确定',
                type:'warning',
              });
            }
          })
      });
      return promise
    },
    //搜索
    tableFresh(ruleForm){
      this.search = ruleForm.value;
      this.current_page = 1;
      this.fresh();
    },
    //类目搜索
    spanClick(name,ruleForm){
      this.ruleForm.value = name;
      this.current_page = 1;
      this.tableFresh(ruleForm);
    }
  },
  components: {
  }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .template{
  @include responsive-default {
    margin-top: 67px;
    .template-bg{background-color: #2b539d; height: 323px; color: #fff; width: 100%; padding: 55px calc(50% - 350px) 0;}
    .template-header-title-w{
      width: 210px;
      margin: 0 auto 33px;
      background: url('~assets/img/src/template/template-index-txt.png') no-repeat left  center;
      font-size: 32px;
      text-indent: 56px;
    }
    .template-search-input-w{
      width: 575px;
      height: 48px;
      border: 1px solid #fff;
      background-color: rgb(43, 83, 157);
      font-size: 24px;
      text-indent: 5px;
      margin: 0 auto;
      color: #fff;
      float: left;
    }
    input:focus{outline: #fff;}
    .template-search-btn-w{
      float: left;
      width: 125px;
      height: 48px;
      background:url('~assets/img/src/template/template-index-search.png')no-repeat #4081ff 12px center;
      text-indent: 54px;
      font-size: 24px;
      line-height: 46px;
      border: 1px solid #fff;
      border-left: none;
      font-weight: 400;
      border-radius: 0;
  &:hover{color: #fff; cursor: pointer;}
  }
  .template-footer-w{
    margin-top: 30px;
  span{
    margin-right: 25px;
    cursor: pointer;
  }
  }
  @media(max-width: 1600px){
    .template-bg{height: 240px; padding: 30px calc(50% - 350px) 0;}
    .template-footer-w{margin-top: 13px;}
  }
  @media (max-width:1366px){
    .template-bg{height: 200px;}
    .template-header-title-w{
      background-size: 27px;
      font-size: 26px;
      text-indent: 45px;
    }
    .template-search-input-w{
      height: 36px;
    }
    .template-search-btn-w{
      height: 36px;
      background-size:19px;
      font-size: 16px;
      line-height: 34px;
    }
  }
  .template-index-content-w{
    width: 100%;
    background-color: #f6f6f6;
    padding: 30px calc(50% - 600px);
  aside{
    width: 205px;
    background: #f8f8f8;
    color: #848484;
    border:1px solid #e8e8e8;
    padding: 0 7px 40px;
    float: left;
  }
  section{
    width: calc(100% - 210px);
    background: #fff;
    border:1px solid #e8e8e8;
    padding: 15px 18px;
    float: right;
  }
  }
  .template-content-ul-w{
    padding-left: 0;
  li{
    width: 100%;
    height: 43px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    line-height: 50px;
    text-indent: 21px;
    position: relative;
    list-style-type:none;
  &:last-child{
     border-bottom: none;
   }
  &:hover{
     color: #5991fe;
     cursor: pointer;
   }
  span{
    position: absolute;
    right: 21px;
  }
  }
  }
  .navfixed{
    position: fixed;
    top: 0; left: 0;
    padding: 8px calc(50% - 350px) 0;
    width: 100%;
    height: 67px;
    z-index: 9999;
    background-color: #2b539d;
  .template-search-btn-w{
    border: 1px solid #fff;
  }
  }
  @media (max-width:1366px){
    .navfixed{
      padding: 15px calc(50% - 350px) 0;
    }
  }
  .active{
    color: #5991fe;
  }
  .template-content-w{
  .template-bg-h{width: 208px; height: 128px;color: #666; margin: 15px; float: left;
    background:url('~assets/img/src/template/template-bg2.jpg')no-repeat center;
    text-align: center;padding: 45px 10px 0;vertical-align: middle; font-size: 16px;
  &:hover{
     background: url('~assets/img/src/template/template-bg1.jpg');
     color: #fff; cursor: pointer; text-decoration: none}
  }
  }
  .page {
    text-align: center;
    color: #888;
    margin: 30px 0;
    font-size: 12px;
  }

  .pagelist span {
    font-size: 14px;
  }

  .pagelist .jump {
    border: 1px solid #dadada;
    padding: 5px 10px;
    margin-left: 5px;
  &:hover{cursor: pointer;}
  }

  .pagelist .bgprimary {
    cursor: default;
    color: #fff;
    background: #4081ff;
    border-color: #4081ff;
  }

  .jumpinp input {
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #ccc;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
  }

  .ellipsis {
    padding: 0px 8px;
  }

  .jumppoint {
    margin-left: 30px;
  }

  .pagelist .gobtn {
    font-size: 12px;
  }

  .bgprimary {
    cursor: default;
    color: #fff;
    background: #ccc;
    border-color: #ccc;
  }
  .pagelist .jump.disabled{
    pointer-events: none;
    background: #ddd;
    color: #fff;
  }
  }
  }

</style>
