<template>
  <div class="news">
    <section class="row">
      <img v-imgerror class="news-banner" src="~/assets/img/src/news/news-banner.jpg" width="100%" height="100%" />
      <div class="lx-container">
        <div class="row news-banner-pad">
          <h3><b>新闻中心</b></h3>
          <p>时时关注云合同最新动态</p>
        </div>
      </div>
    </section>
    <section class="news-list-body">
      <div class="lx-container">
        <div class="row news-bg news-head-pad">
          <div class="news-tab icon-dynamic" :class="{active: isState}" @click="dynamic()">
            <i class="iconsprite icon-news-dynamic"></i>
            公司动态
          </div>
          <div class="news-tab icon-information" :class="{active: isState1}" @click="information()">
            <i class="iconsprite icon-news-information"></i>
            行业资讯
          </div>
        </div>
        <div class="row news-bg">
          <div v-for="news in newsList">
            <div class="row news-pad">
              <div class="col-xs-20">
                <router-link :to="{path:'/news/detail',query:{id: news.id}}">
                  <img v-imgerror :src="news.synoImg" width="200px" height="120px" />
                </router-link>
              </div>
              <div class="col-xs-80 content-news-h">
                <div class="row">
                  <router-link :to="{path:'/news/detail',query:{id: news.id}}" class='title'>
                    {{news.title}}
                  </router-link>
                </div>
                <div class="row">
                  <span class="synopsis">发表于 {{news.gmtCreate}}</span>
                </div>
                <div class="row">
                  <span class='synopsis'>{{news.synopsis}}</span>
                </div>
                <div class="row btn-margin">
                  <router-link :to="{path:'/news/detail',query:{id: news.id}}" class='btn-more'>查看全文</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="row text-center news-footer" v-show="show">
            <div class="page">
              <div class="pagelist">
                <span class="jump" :class="{disabled:pstart}" @click="reducePage()">上一页</span>
                <span v-show="efont" class="jump" @click="jumpPage(1)">1</span>
                <span class="ellipsis"  v-show="efont">...</span>
                <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
                <span class="ellipsis"  v-show="ebehind">...</span>
                <span v-show="ebehind" class="jump" @click="jumpPage(pages)">{{pages}}</span>
                <span class="jump" :class="{disabled:pend}" @click="addPage()">下一页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base.vue'
  import apis from '~/config/api'
  export default {
    name: 'news',
    extends: base,
    metaInfo: {
      title: '电子合同，电子签名，电子签章，合同管理，合同模板新闻中心 - 云合同',
      meta: [{
        name: 'keywords',
        content: '电子合同，电子签名，电子签章，合同管理，合同模板，云合同'
      },{
        name: 'description',
        content: '云合同合同模板库为你免费提供含劳动人事合同，买卖合同，知识产权合同，借款担保合同，租赁合同等最新的电子合同模板样式。'
      }]
    },
    layout: 'default',
    data () {
      return {
        isState: ({1: true, 2: false})[this.$route.query.type] || true,
        isState1: ({1: false, 2: true})[this.$route.query.type] || false,
        // newsList: [],
        type: this.$route.query.type || 1,
        current_page: 1,
        // pages: '', //总页数
        nowIndex:0
      }
    },
    async fetchData (to, context) {
      var status = to.query.type;
      // if(status == 1){
      //   this.type = 1;
      //   this.isState = true;
      //   this.isState1 = false;
      // }
      // if(status == 2){
      //   this.isState = false;
      //   this.isState1 = true;
      //   this.type = 2;
      // }
      let self = context;
      const data = await self.$axios({
        method: 'get',
        url: apis.newsList,
        params: {type: status, page: 1}
      }).then((res) => res.data);
      
      let newsList = []
      var r = data
      var list = r.data.monthList;
      if( r.data.monthList.length) {
        setTimeout(()=> {
          document.dispatchEvent(new Event('render-event'));
        }, 0);
      }
      for(var i=0; i<list.length; i++){
        newsList = newsList.concat(list[i]);
        for(var newsVal in list[i]){
          if(list[i][newsVal].synopsis.length>115){
            list[i][newsVal].synopsis = list[i][newsVal].synopsis.substring(0,115)+"...";
          }
          var creattime=list[i][newsVal].gmtCreate;
          var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
          timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
          list[i][newsVal].gmtCreate=timevalue;

        }
        var creattime = list[i][newsVal].gmtCreate;
        var timevalue = new Date(creattime); //直接用 new Date(时间戳) 格式转化获得当前时间
        timevalue =
          timevalue.toLocaleDateString().replace(/\//g, "-") +
          " " +
          timevalue.toTimeString().substr(0, 8);
        list[i][newsVal].gmtCreate = timevalue;
      }
      let pages = Math.ceil(r.data.newsTotal/5);
      self.$store.state.News.newsList = newsList;
      self.$store.state.News.pages = pages;
    },
    created () {
    },
    computed: {
      ...mapState({
        pages: state => state.News.pages,
        newsList: state => state.News.newsList
      }),
      show:function(){
        return this.pages && this.pages !=1

      },
      pstart: function() {
        return this.current_page == 1;
      },
      pend: function() {
        return this.current_page == this.pages;
      },
      efont: function() {
        if (this.pages <= 7) return false;
        return this.current_page > 5;
      },
      ebehind: function() {
        if (this.pages <= 7) return false;
        var nowAy = this.indexs;
        return nowAy[nowAy.length - 1] != this.pages;
      },
      indexs: function() {
        var left = 1,
          right = this.pages,
          ar = [];
        if (this.pages >= 7) {
          if (this.current_page > 5 && this.current_page < this.pages - 4) {
            left = Number(this.current_page) - 3;
            right = Number(this.current_page) + 3;
          } else {
            if (this.current_page <= 5) {
              left = 1;
              right = 7;
            } else {
              right = this.pages;

              left = this.pages - 6;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      }
  },
  watch: {
    $route: "showNews"
  },
  mounted() {
    /*
      * 从header组件进入该页面
      */
    this.showNews();
  },
  methods: {
    dynamic: function() {
      this.isState = true;
      this.isState1 = false;
      this.type = 1;
      this.newsShow();
    },
    information: function() {
      this.isState = false;
      this.isState1 = true;
      this.type = 2;
      this.newsShow();
    },
    reducePage: function() {
      if (this.current_page > 1) {
        this.current_page--;
        this.newsShow();
      }
    },
    addPage: function() {
      if (this.current_page < this.pages) {
        this.current_page++;
        this.newsShow();
      }
    },
    jumpPage: function(id) {
      this.current_page = id;
      this.newsShow();
    },

    showNews() {
      let types = this.$route.query.type;
      if (types == 2) {
        this.information();
      } else {
        this.dynamic();
      }
    },
    /*footer，网站地图点击*/
    newsShow() {
      let self = this;
      const promise = new Promise(function(resolve, reject) {
        self
          .$axios({
            method: "get",
            url: apis.newsList,
            params: { type: self.type, page: self.current_page }
          })
          .then(function (res) {
            self.$store.state.News.newsList = [];
            var r = res.data;
            var list = r.data.monthList;
            for(var i=0; i<list.length; i++){
              self.$store.state.News.newsList = self.newsList.concat(list[i]);
              for(var newsVal in list[i]){
                if(list[i][newsVal].synopsis.length>120){
                  list[i][newsVal].synopsis = list[i][newsVal].synopsis.substring(0,120)+"...";
                }
                var creattime = list[i][newsVal].gmtCreate;
                var timevalue = new Date(creattime); //直接用 new Date(时间戳) 格式转化获得当前时间
                timevalue =
                  timevalue.toLocaleDateString().replace(/\//g, "-") +
                  " " +
                  timevalue.toTimeString().substr(0, 8);
                list[i][newsVal].gmtCreate = timevalue;
              }
            }
            self.$store.state.News.pages = Math.ceil(r.data.newsTotal/5);
          })
      });
      return promise;
    }
  },
  components: {}
};
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.news {
  @include responsive-default {
    $borderColor: #dcdcdc;
    .col-xs-20,
    .col-xs-80 {
      float: left;
      min-width: 1px;
    }
    .col-xs-20 {
      width: 20%;
    }
    .col-xs-80 {
      width: 80%;
    }
    .news-banner {
      margin-top: 67px;
      position: relative;
    }
    .news-banner-pad {
      position: absolute;
      top: 170px;
      h3 {
        color: #4081ff;
      }
    }
    @media (max-width: 1600px) {
      .news-banner-pad {
        top: 130px;
      }
    }
    .news-list-body {
      background-color: #f5f5f5;
      padding: 20px 0 50px;
    }
    .news-bg {
      background-color: #fff;
      padding-bottom: 36px;
      .news-pad {
        padding: 36px 50px 0;
      }
    }
    .news-head-pad {
      padding: 12px 20px 8px;
      margin-bottom: 20px;
    }
    .news-tab {
      float: left;
      width: 110px;
      cursor: pointer;
      i {
        margin-right: 5px;
        vertical-align: middle;
      }
    }

    .icon-dynamic {
      border-right: 1px solid #333;
      &:hover {
        color: #4081ff;
        .icon-news-dynamic {
          background-position: -27px -27px;
        }
      }
    }
    .icon-information {
      margin-left: 25px;
      &:hover {
        color: #4081ff;
        .icon-news-information {
          background-position: -21px -5px;
        }
      }
    }
    .active {
      color: #4081ff;
      .icon-news-dynamic {
        background-position: -27px -27px;
      }
      .icon-news-information {
        background-position: -21px -5px;
      }
    }
    .icon-news-dynamic {
      background-image: url("~assets/img/src/news/yht-icon.png");
      background-position: -3px -27px;
      width: 20px;
      height: 18px;
    }
    .icon-news-information {
      background-image: url("~assets/img/src/news/yht-icon.png");
      background-position: -3px -5px;
      width: 16px;
      height: 18px;
    }

    .content-news-h {
      .synopsis {
        font-size: 15px;
        color: #a0a0a0;
      }
      .date {
        padding-top: 10px;
        color: #1560ad;
      }
      .title {
        font-size: 20px;
        color: black;
        text-decoration: none;
        &:hover {
          color: #4081ff;
        }
      }
    }
    .btn-margin {
      margin-top: 5px;
    }
    .btn-more {
      color: #fff;
      background-color: #93b8ff;
      padding: 5px 10px;
      &:hover {
        background-color: #4081ff;
        text-decoration: none;
      }
    }
    .news-footer {
      margin-top: 36px;
    }
    .pagelist span {
      font-size: 14px;
    }

    .pagelist .jump {
      border: 1px solid #dadada;
      padding: 5px 10px;
      margin-left: 5px;
      &:hover {
        cursor: pointer;
      }
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
    .pagelist .jump.disabled {
      pointer-events: none;
      background: #ddd;
      color: #fff;
    }
  }
}
</style>
