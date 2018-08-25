<template>
  <div>
    <!-- // 暂时移除鼠标移入暂停轮播功能，后期轮播图数量增加相应增加 v-on:mouseover="stop()" v-on:mouseout="move()" -->
    <div class="slide">
    <div class="slideshow">
      <transition-group tag="ul" name="image">
        <li v-for="(img, index) in imgArray" v-show="index===mark" :key="index" v-bind:style="{backgroundImage:'url(' + img + ')'}">
          <div class="banner1-content" v-if="index===0">
            <div class="banner1-title"></div>
            <router-link to="/manage" class="pull-right login-register-w"><button>免费试用</button></router-link>
          </div>
          <div class="banner-signet" v-if="index===1">
            <div class="signet-content">
              <router-link to ="/manage" >
                <button>马上体验</button>
              </router-link>
            </div>
          </div>
          <div class="banner3-content" v-if="index===2">
              <router-link  to='/template' class="index-footer-p--new-hu" >
                  <button>马上使用</button>
              </router-link>
          </div>
          <div class="banner2-content" v-if="index===3">
            <div class="banner2-content-l">
              <div class="banner2-title">
                API 4.0重磅上线——功能全面升级
              </div>
              <div class="banner2-subtitle">
                云合同提供的API服务进入4.0时代
              </div>
              <div class="banner2-advantage">
                高效<div></div>便捷<div></div>安全<div></div>合法
              </div>
            </div>
            <div class="banner2-content-r">
              <div class="banner2-content-r-tip">扫一扫立即体验</div>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
    <div class="bullet">
      <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }"
      @click="change(index)" :key="index"></span>
    </div>
  </div>
  </div>
</template>

<script>
// import Img from '~/framework/widgets/img'
export default {
  data() {
    return {
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgArray: [
        require("~/assets/img/src/banner1.jpg"),
        require("~/assets/img/src/home/banner/signet@2x.png"),
        require("~/assets/img/src/banner3.png"),
        require("~/assets/img/src/banner2.jpg")
      ]
    };
  },
  methods: {
    autoPlay() {
      this.mark++;
      if (this.mark === this.imgArray.length) {
        this.mark = 0;
      }
    },
    play() {
      this.timer = setInterval(this.autoPlay, 5000);
    },
    change(i) {
      clearInterval(this.timer);
      this.timer = setInterval(this.autoPlay, 5000);
      this.mark = i;
    }
    //暂时移除鼠标移入暂停轮播功能
    // stop() {
    //   clearInterval(this.timer);
    // },
    // move() {
    //   this.timer = setInterval(this.autoPlay, 5000);
    // }
  },
  created() {
    this.play();
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
.slide {
  width: 100%;
  height: 720;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
  height: 720px;
  li {
    background-size: cover;
    width: 100%;
    height: 720px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: auto;
    position: absolute;
    list-style: none;
    top: 0;
    left: 0;
  }
}
.bullet {
  position: absolute;
  width: 100%;
  bottom: 28px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
  span {
    width: 36px;
    height: 8px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    transition: 0.7s;
    &:last-child {
      margin-right: 0;
    }
  }
}
.active {
  width: 72px !important;
  background: #4081ff !important;
}
.image-enter-active {
  opacity: 1;
  transition: all 1.5s ease;
}
.image-leave-active {
  opacity: 0;
  transition: all 1.5s ease;
}
.image-enter {
  opacity: 0;
}
.image-leave {
  opacity: 1;
}

.banner1-content {
  position: absolute;
  left: calc(50% - 600px);
  top: 223px;
}

.banner1-title {
  width: 516px;
  height: 189px;
  background: url("~assets/img/src/banner1-title.png");
  margin-bottom: 59px;
  & ~ .login-register-w {
    float: left !important;
    button {
      width: 166px;
      height: 50px;
      background: #4081ff;
      border: 0;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      padding: 0;
      &:hover {
        background: #6297ff;
      }
    }
  }
}
.banner2-content {
  min-width: 1045px;
  color: #fff;
  position: absolute;
  top: 265px;
  left: calc(50% - 600px);
  .banner2-subtitle {
    font-size: 30px;
    margin: 35px 0 30px;
  }
  .banner2-advantage {
    font-size: 20px;
    line-height: 20px;
    div {
      width: 1px;
      height: 17px;
      background: #fff;
      display: inline-block;
      font-size: 20px;
      font-weight: 100;
      margin: 0 12px;
      vertical-align: middle;
    }
  }
  .banner2-content-l {
    float: left;
  }
  .banner2-content-r {
    width: 167px;
    height: 167px;
    background: url("~assets/img/src/waregister-qrcode.png");
    float: right;
    position: relative;
    .banner2-content-r-tip {
      width: 126px;
      height: 18px;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      left: calc(50% - 63px);
      bottom: -32px;
    }
  }
}

.banner2-title {
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  line-height: 51px;
}
.banner-signet{
  .signet-content{
    button {
      width: 166px;
      height: 50px;
      background: #4081ff;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      position: absolute;
      left: calc(50% - 566px);
      bottom: 270px;
      &:hover {
        background: #6297ff;
      }
    }
  }
}
.banner3-content {
  margin-top: 260px;
  text-align: center;
  .banner3-subtitle {
    width: 620px;
    height: 28px;
    background: url("~assets/img/src/banner3-subtitle.png");
    margin: 45px auto 70px;
  }
  button {
    width: 166px;
    height: 50px;
    background: #4081ff;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: calc(50% - 566px);
    bottom: 183px;
    &:hover {
      background: #6297ff;
    }
  }
}
</style>



