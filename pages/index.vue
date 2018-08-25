<template>
  <div class="index">
    <section class="index-banner">
      <Banner />
    </section>
    <section class="presentation-wrapper">
      <div class="presentation-content">
        <p id="presentation-title" class="presentation-title index-animation slideinblurredbottom">云合同，专注你的合同</p>
        <ul class="presentation-text index-animation slideinblurredbottom">
          <li>
            <p class="p-text-icon presentation-on">合法有效</p>
            <p>《合同法》《电子签名法》等法<br/>律条款保障电子合同合法可靠</p>
          </li>
          <li>
            <p class="p-text-icon presentation-tw">安全可靠</p>
            <p>中科院技术支持，有效防止合同<br/>泄密、篡改</p>
          </li>
          <li>
            <p class="p-text-icon presentation-tr">便捷高效</p>
            <p>可通过电脑网页、手机APP随时<br/>进行合同签署和查看</p>
          </li>
          <li>
            <p class="p-text-icon presentation-fo">维权无忧</p>
            <p>对用户合同进行存证，发生法律<br/>纠纷时，云合同配合举证</p>
          </li>
        </ul>
      </div>
    </section>
    <section class="solution-wrapper">
      <p>
        我们为你的行业提供解决方案
      </p>
      <div class="Solution-container">
        <label class="btn-motion btn-Previous" for="motion_per">
          <span></span>
        </label>
        <label class="btn-motion btn-Next" for="motion_next">
          <span></span>
        </label>
        <input class="motion-input" type="radio" id="motion_per" name="open-menu" checked>
        <input class="motion-input" type="radio" id="motion_next" name="open-menu">
        <ul class="Solution-ul">
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite  icon-hricon position-center"></i>
            </div>
            <p class="Solution-li-title">人力资源</p>
            <router-link :to="{ name: 'solution', params:{types: 0}}">
              查看详情
            </router-link>
          </li>
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite icon-Financeicon position-center"></i>
            </div>
            <p class="Solution-li-title">互联网金融</p>
            <router-link :to="{ name: 'solution', params:{types: 1}}">
            查看详情
            </router-link>
          </li>
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite icon-Tourismicon position-center"></i>
            </div>
            <p class="Solution-li-title">在线旅游行业</p>
            <router-link :to="{ name: 'solution', params:{types: 2}}">
            查看详情
            </router-link>
          </li>
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite icon-retailersicon position-center"></i>
            </div>
            <p class="Solution-li-title">电商行业</p>
            <router-link :to="{ name: 'solution', params:{types: 3}}">
            查看详情
            </router-link>
          </li>
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite icon-logisticsicon position-center"></i>
            </div>
            <p class="Solution-li-title">物流快递</p>
            <router-link :to="{ name: 'solution', params:{types: 4}}">
            查看详情
            </router-link>
          </li>
          <li>
            <div class="Solution-icon">
              <svg class="position-center six－sided-Use"><use xlink:href="#six_sided" /></svg>
              <i class="iconsprite icon-traditionicon_58 position-center"></i>
            </div>
            <p class="Solution-li-title">传统行业</p>
            <router-link :to="{ name: 'solution', params:{types: 5}}">
            查看详情
            </router-link>
          </li>
          <li class="svg-Use">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="126" height="144" viewBox="0 0 126 144">
              <g id="six_sided">
                <path d="M125.367,108.431 L62.606,144.183 L0.245,107.750 L0.645,35.565 L63.407,-0.187 L125.768,36.246 L125.367,108.431 Z"/>
              </g>
            </svg>
          </li>
        </ul>
      </div>
    </section>
    <section class="news-wrapper">
      <Exhibition />
    </section>
    <section class="cooperation-wrapper">
      <Cooperation />
    </section>
  </div>
</template>

<script>
import base from "~/framework/core/vue-base";
import Cooperation from "~/components/home/cooperation";
import Exhibition from "~/components/news/newsExhibition";
import banner from "~/components/home/banner";

export default {
  name: "Index",
  extends: base,
  metaInfo: {
  title: "电子合同，电子签名，云合同-国家电子合同平台",
  meta: [
    {
      name: "keywords",
      content:
        "电子合同，电子签名，网签合同，电子版合同，电子合同范本，电子合同怎么签"
    },
    {
      name: "description",
      content:
        "云合同电子合同，提供实名认证、在线签署、电子合同管理、电子合同存取证服务、法律服务等电子合同全生态服务，一键部署高效安全，签电子合同，我只选云合同！"
    }
  ]
  },
  layout: 'default',
  data() {
    return {
      isAnright: false,
      isSlbottom1: false,
      isSlbottom2: false
    };
  },
  mounted() {
    //加载画布1动画
    this.isAnright = true;
    //加载画布2动画
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      //seo版本暂时去除，后期可能重新添加
      // if (scrollTop > 50) {
      //   this.isSlbottom2 = true;
      // }
    }
  },
  components: {
    Cooperation: Cooperation,
    Exhibition: Exhibition,
    Banner: banner
  }
};
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
html,
body {
  width: 100%;
}
li,
ol,
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
}
@mixin animation1($a,$b,$c,$d,$e,$f,$g) {
  -webkit-transform: translateX($a) scaleX($b) scaleY($c);
  transform: translateX($a) scaleX($b) scaleY($c);
  -webkit-transform-origin: $d $e;
  transform-origin: $d $e;
  -webkit-filter: blur($f);
  filter: blur($f);
  opacity: $g;
}
@mixin animation2($a,$b,$c,$d,$e,$f,$g) {
  -webkit-transform: translateY($a) scaleY($b) scaleX($c);
  transform: translateY($a) scaleY($b) scaleX($c);
  -webkit-transform-origin: $d $e;
  transform-origin: $d $e;
  -webkit-filter: blur($f);
  filter: blur($f);
  opacity: $g;
}
.index {
  $blue: #4081ff;
  $fontSize: 18px;
  @include responsive-default {
    /*画布1*/
    .index-banner {
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    .text-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .banner-spot {
      width: 8px;
      height: 8px;
      background: #8abeff;
      display: inline-block;
      margin-right: 8px;
    }
    .banner-content {
      p {
        color: #fff;
      }
      .banner-title {
        font-size: 48px;
        margin-bottom: 40px;
      }
      .banner-Subtitle {
        font-size: $fontSize;
        margin-bottom: 128px;
        letter-spacing: 2px;
        span {
          width: 23px;
          height: 23px;
          background: #fff;
          border-radius: 50%;
          color: #2a3d51;
          display: inline-block;
          line-height: 23px;
          text-indent: 2px;
          margin: 0 5px;
        }
      }
      .index-process {
        margin: 0 auto 48px;
        text-align: center;
        width: 470px;
        overflow: hidden;
        li {
          color: #8abeff;
          float: left;
          font-size: 14px;
          margin-right: 16px;
          margin-left: 16px;
        }
      }
      .btn-register {
        width: 166px;
        height: 50px;
        background: $blue;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        padding: 0;
        outline: none;
        line-height: 50px;
        text-align: center;
        &:hover {
          background: #6297ff;
        }
      }
    }

    /*画布1动画*/
    .banner-animation {
      @include animation1(1000px, 2.5, 0.2, 0%, 50%, 40px, 0);
    }
    .slideinblurredright {
      -webkit-animation: slide-in-blurred-right 2s
        cubic-bezier(0.23, 1, 0.32, 1) both;
      animation: slide-in-blurred-right 2s cubic-bezier(0.23, 1, 0.32, 1) both;
    }
    @keyframes slide-in-blurred-right {
      0% {
        @include animation1(1000px, 1, 1, 0%, 50%, 5px, 0.3);
      }
      100% {
        @include animation1(0, 1, 1, 50%, 50%, 0, 1);
      }
    }
    @-webkit-keyframes slide-in-blurred-right {
      0% {
        @include animation1(1000px, 1, 1, 0%, 50%, 5px, 0.3);
      }
      100% {
        @include animation1(0, 1, 1, 50%, 50%, 0, 1);
      }
    }
    /*画布2*/
    .presentation-wrapper {
      width: 100%;
      display: flex;
      text-align: center;
      overflow: hidden;
    }
    .presentation-content {
      margin: 80px auto;
      & > p {
        color: #333;
        font-size: 24px;
        margin-bottom: 80px;
      }
    }
    .presentation-text {
      li {
        display: inline-block;
        margin-left: 85px;
        min-height: 100px;
        vertical-align: top;
        p {
          text-align: left;
        }
        p:first-child {
          color: #333;
          font-size: $fontSize;
          margin-bottom: 32px;
          position: relative;
        }
        p:last-child {
          color: #959595;
          font-size: 14px;
        }
      }
    }
    .index-animation {
      @include animation2(1000px, 2.5, 0.2, 50%, 100%, 40px, 0);
    }
    .p-text-icon::after {
      content: "";
      width: 48px;
      height: 45px;
      background: url("~assets/img/src/index/presentation-all.png") no-repeat;
      position: absolute;
      left: -66px;
      top: -3px;
    }
    .presentation-on::after {
      background-position: -4px 0;
    }
    .presentation-tw::after {
      background-position: -2px -43px;
    }
    .presentation-tr::after {
      background-position: -4px -87px;
    }
    .presentation-fo::after {
      background-position: 0px -131px;
    }
    /*画布2的动画*/
    .slideinblurredbottom {
      -webkit-animation: slide-in-blurred-bottom 1.5s
        cubic-bezier(0.23, 1, 0.32, 1) both;
      animation: slide-in-blurred-bottom 1.5s cubic-bezier(0.23, 1, 0.32, 1)
        both;
    }

    @keyframes slide-in-blurred-bottom {
      0% {
        @include animation2(1000px, 2.5, 0.2, 50%, 100%, 40px, 0);
      }
      100% {
        @include animation2(0, 1, 1, 50%, 50%, 0, 1);
      }
    }

    @-webkit-keyframes slide-in-blurred-bottom {
      0% {
        @include animation2(1000px, 2.5, 0.2, 50%, 100%, 40px, 0);
      }
      100% {
        @include animation2(0, 1, 1, 50%, 50%, 0, 1);
      }
    }
    /*画布3*/
    .solution-wrapper {
      width: 100%;
      min-height: 710px;
      background: whitesmoke;
      text-align: center;
      padding: 80px 0;
      & > p {
        font-size: 24px;
        color: #333;
        margin-bottom: 80px;
      }
    }
    .Solution-container {
      width: 1200px;
      height: 444px;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
    }
    .Solution-ul {
      width: 1852px;
      height: 100%;
      position: absolute;
      & > li {
        width: 294px;
        height: 100%;
        background-repeat: no-repeat;
        margin-right: 8px;
        position: relative;
        float: left;
        transition: ease-out 0.4s;
        left: -39px;
        & > a {
          width: 78px;
          height: 32px;
          background: #fff;
          border-radius: 4px;
          color: $blue;
          font-size: 14px;
          line-height: 32px;
          position: absolute;
          left: calc(50% - 39px);
          cursor: pointer;
          bottom: -60px;
          -webkit-filter: blur(10px);
          filter: blur(10px);
          opacity: 0;
          transition: 0.3s;
        }
        &:hover > .Solution-icon .six－sided-Use {
          fill: #fff;
          opacity: 0.2;
        }
        &:hover > a {
          bottom: 48px;
          transition: ease-out 0.4s;
          -webkit-filter: blur(0);
          filter: blur(0);
          opacity: 1;
        }
        .Solution-icon {
          width: 130px;
          height: 150px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          .six－sided-Use {
            fill: #000;
            opacity: 0.4;
          }
        }
      }
      li:nth-of-type(1) {
        background: url("~assets/img/src/index/background2.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background2-hover.jpg");
        }
      }
      li:nth-of-type(2) {
        background: url("~assets/img/src/index/background3.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background3-hover.jpg");
        }
      }
      li:nth-of-type(3) {
        background: url("~assets/img/src/index/background4.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background4-hover.jpg");
        }
      }
      li:nth-of-type(4) {
        background: url("~assets/img/src/index/background5.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background5-hover.jpg");
        }
      }
      li:nth-of-type(5) {
        background: url("~assets/img/src/index/background6.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background6-hover.jpg");
        }
      }
      li:nth-of-type(6) {
        background: url("~assets/img/src/index/background7.jpg");
        background-size: cover;
        &:hover {
          background: url("~assets/img/src/index/background7-hover.jpg");
        }
      }
    }
    .position-center {
      max-width: 126px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .btn-motion {
      width: 56px;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
      position: absolute;
      top: 0;
      z-index: 1;
      &.btn-Previous {
        left: 0px;
      }
      &.btn-Next {
        right: 0;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }
    }
    .btn-motion > span {
      width: 30px;
      height: 43px;
      background: url("~assets/img/src/index/presentation-all.png") no-repeat;
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .btn-Previous > span {
      background-position: -4px -591px;
    }
    .btn-Previous:hover {
      & > span {
        background-position: -4px -224px;
      }
    }
    .motion-input {
      position: fixed;
      left: -9999em;
    }
    .btn-Next > span {
      background-position: -4px -179px;
    }
    .btn-Next:hover {
      & > span {
        background-position: -4px -638px;
      }
    }
    #motion_per:checked ~ .Solution-ul {
      left: 0;
      transition: all ease-out 0.5s;
    }
    #motion_next:checked ~ .Solution-ul {
      left: -604px;
      transition: all ease-out 0.5s;
    }
    .svg-Use {
      position: fixed;
      left: -9999em;
    }
    .Solution-li-title {
      width: 100%;
      color: #fff;
      position: absolute;
      bottom: 103px;
    }
    .Solution-icon {
      position: relative;
    }
    .position-center {
      max-width: 126px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .six－sided {
      fill: #000;
      fill-rule: evenodd;
      fill-opacity: 0.4;
    }

    .index-cooperation {
      width: 100%;
      padding: 104px 0;
      & > p:nth-of-type(1) {
        font-size: 24px;
        color: #333;
        margin-bottom: 120px;
        text-align: center;
      }
    }
  }
}
</style>
