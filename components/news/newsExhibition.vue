<template>
  <div class="index-cooperation">
      <p class="title">最新的公司动态／行业资讯</p>
      <ul class="cooperation-ul">
        <div class="fr news-more">
          <router-link to="/news">更多>></router-link>
        </div>
        <li v-for="(news,index) in newsList" v-if="index<4">
          <router-link :to="{path:'/news/detail',query:{id: news.id}}">
            <img v-imgerror :src="news.synoImg" width="250px" height="150px" />
            <div class="news-title">
              {{news.title}}
            </div>
            <div class="news-content">
              {{news.synopsis}}
            </div>
            <div class="news-time">
              {{news.gmtCreate}}
            </div>
          </router-link>
        </li>
      </ul>
    <!-- <router-link :to="{ name: 'cooperative-client' }" class="cooperation-more" >
    </router-link> -->
  </div>
</template>

<script>
import apis from "~/config/api";

export default {
  data() {
    return {
      newsList: []
    };
  },
  components: {},
  mounted() {
    this.newsShow();
  },
  watch: {},
  methods: {
    newsShow() {
      let self = this;
      const promise = new Promise(function(resolve, reject) {
        self
          .$axios({
            method: "get",
            url: apis.newsList,
            params: { type: self.type, page: self.current_page }
          })
          .then(function(res) {
            self.newsList = [];
            var r = res.data;
            var list = r.data.monthList;
            for (var i = 0; i < list.length; i++) {
              self.newsList = self.newsList.concat(list[i]);
              for (var newsVal in list[i]) {
                if (list[i][newsVal].synopsis.length > 66) {
                  list[i][newsVal].synopsis =
                    list[i][newsVal].synopsis.substring(0, 66) + "...";
                }
                if (list[i][newsVal].title.length > 29) {
                  list[i][newsVal].title =
                    list[i][newsVal].title.substring(0, 29) + "...";
                }
                var creattime = list[i][newsVal].gmtCreate;
                var timevalue = new Date(creattime); //直接用 new Date(时间戳) 格式转化获得当前时间
                var nowDate = timevalue;
                var year = nowDate.getFullYear();
                var month =
                  nowDate.getMonth() + 1 < 10
                    ? "0" + (nowDate.getMonth() + 1)
                    : nowDate.getMonth() + 1;
                var day =
                  nowDate.getDate() < 10
                    ? "0" + nowDate.getDate()
                    : nowDate.getDate();
                var dateStr = year + "-" + month + "-" + day;
                list[i][newsVal].gmtCreate = dateStr;
              }
            }
            self.pages = Math.ceil(r.data.newsTotal / 4);
          });
      });
      return promise;
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
a {
  text-decoration: none;
}
ul,
ol,
li {
  list-style: none;
}
.cooperation-ul {
  width: 1200px;
  height: 426px;
  margin: 0 auto;
  padding: 0;
  & > .news-more {
    font-size: 12px;
    margin-bottom: 6px;
    text-align: right;
    & > a {
      color: #4081ff;
      &:hover {
        color: #6297ff;
      }
    }
  }
  & > li {
    width: 280px;
    height: 400px;
    background: #fff;
    border: 1px solid #f1f1f1;
    float: left;
    margin-right: 26px;
    padding: 15px;
    transition: 0.5s;
    &:nth-of-type(4) {
      margin-right: 0;
    }
    & img {
      margin-bottom: 24px;
    }
    & .news-title {
      width: 240px;
      height: 37px;
      color: #333;
      font-size: 16px;
      margin: 0 auto 18px;
    }
    & .news-content {
      width: 240px;
      height: 77px;
      color: #959595;
      font-size: 14px;
      margin: 0 auto 38px;
    }
    & .news-time {
      width: 240px;
      color: #959595;
      font-size: 14px;
      margin: 0 auto;
      text-align: right;
    }
    &:hover {
      box-shadow: 0 5px 16px rgba(114, 114, 114, 0.2);
      transform: translateY(-3px);
    }
  }
}
.index-cooperation > .title {
  width: 100%;
  color: #0b1016;
  font-size: 24px;
  margin: -16px auto 60px;
  text-align: center;
}
</style>



