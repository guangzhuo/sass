<template>
  <div class="index-cooperation">
      <p class="title">这里有很多信任我们的伙伴</p>
      <ul class="cooperation-ul">
          <li>
              <img  src="~/assets/img/src/ping-2.png"/>
          </li>
          <li>
              <img src="~/assets/img/src/zhaoshang.png"/>
          </li>
          <li>
              <img  src="~/assets/img/src/juxing.png"/>
          </li>
          <li>
              <img  src="~/assets/img/src/debang.png"/>
          </li>
          <li>
              <img  src="~/assets/img/src/tianmu.png"/>
          </li>
      </ul>
    <router-link :to="{ name: 'cooperative-client' }" class="cooperation-more" >
      查看更多
    </router-link>
  </div>
</template>

<script>
// import Img from '~/framework/widgets/img'
export default {
  data () {
    return {
    }
  },
  components: {

  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
a {
  text-decoration: none;
}
.index-cooperation{
  @include responsive-default {
    width: 100%;
    background: whitesmoke;
    padding: 80px 0;

    p{
      font-size: 24px;
      color: #333;
      margin-bottom: 80px;
      text-align: center;
    }
    .cooperation-ul{
      list-style-type: none;
      width: 1200px;
      height: 50px;
      margin: 0 auto 72px;
      padding: 0;
      li{
        float: left;
        margin-right: 82px;

        &:last-child{
          margin-right: 0;
        }
        img{
          opacity: .6;
          transition: .3s;
        }
        &:hover>img{
          opacity: 1;
        }
      }
    }

    .cooperation-more{
      width: 166px;
      height: 50px;
      border: 1px solid #4081ff;
      border-radius: 4px;
      color: #4081ff;
      display: block;
      margin: 0 auto;
      line-height: 50px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
      &:hover{
        border-color: #6297ff;
        color: #6297ff;
      }
    }
  }
}
</style>



