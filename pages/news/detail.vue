<template>
  <div class="news-detail">
    <div class="lx-container">
      <div class=" row news-bg">
        <div class="news-title">
          <h3 class="text-center">{{detail.news.title}}</h3>
          <p class="text-center">来源:云合同 发布于:{{detail.news.gmtCreate}}</p>
        </div>
        <div class="text-left" v-html="detail.news.content"></div>
        <div class="row display-inline news-footer">
          <div class="row">
            <router-link to="/news" title="返回列表">
              <i class="iconsprite icon-goback"></i>
            </router-link>
          </div>
          <div class="row" v-show="detail.prev != null">
            <router-link :to="{path:'/news/detail',query:{id: detail.prev}}" :title="detail.prevTitle">
              <i class="iconsprite icon-prev"></i>
            </router-link>
          </div>
          <div class="row" v-show="detail.next != null">
            <router-link :to="{path:'/news/detail',query:{id: detail.next}}" :title="detail.nextTitle">
              <i class="iconsprite icon-next"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'

  export default {
    name: 'news-detail',
    data () {
      return {
        id:'',
        // detail: {
        //   news:{
        //     title: '',
        //     gmtCreate: ''
        //   },
        //   next: '',
        //   prev: '',
        //   prevTitle: '',
        //   nextTitle: ''
        // }
      }
    },
    layout: 'default',
    async fetchData (to, context) {
      let self = context;
      self.id = to.query.id;
      const r = await self.$axios({
        method: 'get',
        url: apis.newsDetail,
        params: {id: self.id}
      })
      .then((res)=> res.data.data);

      var creattime=r.news.gmtCreate;
      var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
      timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
      r.news.gmtCreate=timevalue;

      self.$store.state.News.detail.detail = r;
    },
    computed: {
      ...mapState({
        detail: state => state.News.detail.detail
      })
    },
  watch: {
    "$route":"addDetail"
  },
  mounted () {
  },
  methods: {
    addDetail(){
      this.id = this.$route.query.id;
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.newsDetail,
            params: {id: self.id}
          })
          .then(function (res) {
            var r =res.data.data;
            self.$store.state.News.detail.detail = r;
            var creattime=r.news.gmtCreate;
            var timevalue = new Date(creattime);//直接用 new Date(时间戳) 格式转化获得当前时间
            timevalue = timevalue.toLocaleDateString().replace(/\//g, "-") + " " + timevalue.toTimeString().substr(0, 8);
            r.news.gmtCreate=timevalue;
          })
      });
      return promise
    }
  },
  components: {
  }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";

  .news-detail{
    @include responsive-default{
      margin-top: 67px; background-color: #f5f5f5; padding: 20px;
      .news-bg{background-color: #fff; padding: 0 8%; text-align: center; min-height: 650px;
      .news-title{
        border-bottom: 1px solid #a0a0a0; margin-bottom: 20px;
          h3{color: #1560ad;}
          p{margin: 20px 0 10px}
        }
      }
      @media(max-width: 1600px){
        .news-bg{min-height: 510px;}
      }
      @media(max-width: 1366px){
        .news-bg{min-height: 380px;}
      }
      .display-inline{display: inline-block;
      div{float: left; margin-right: 5px;}
      }
      .icon-prev{
        background-image: url('~assets/img/sprite/prev.png');
        background-position: 0 0;
        width: 34px;
        height: 34px;
      }
      .icon-next{
        background-image: url('~assets/img/sprite/next.png');
        background-position: 0 0;
        width: 34px;
        height: 34px;
      }
      .icon-goback{
        background-image: url('~assets/img/sprite/back.png');
        background-position: 0 0;
        width: 34px;
        height: 34px;
      }
      .news-footer{margin: 20px 0;}
    }
  }
</style>
