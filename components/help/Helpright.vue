<template>
  <div id="right-main" class="right-main">
    <div v-if="rightcon" v-html="contentvalue"></div>
    <div v-else>
      <p style='font-size: 18px;text-align: center;color: #000;'></p>
      <p style='text-align: center;color: #666;'>若电脑屏幕显示网页不全的情况下，可通过点击键盘"+" \"Ctrl\" + \"-\" "+"即可全屏显示</p>
      <span class="help-index-d"></span>
      <p style='text-align: center;color: #666; margin-top: 30px;font-size: 18px'>云合同建议你使用以下浏览器</p>
      <ul class='help-index-ul'>
        <li><a href='https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads' target='_blank'><span class="help-ie-d"></span><br/>新版IE浏览器</a></li>
        <li><a href='http://www.mozillaonline.com/' target='_blank'><span class="help-firefox-d"></span><br/>火狐</a></li>
        <li><a href='http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html' target='_blank'><span class="help-chrome-d"></span><br/>chrome</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import bus  from '~/components/help/eventBus'
  export default {
    data(){
      return {
        headtitle:'',
        contentvalue:'',
        oldtitle:'',
        oldcontent:''
      }
    },
    watch:{},
    created:function () {
      bus.$on('helptagshow',function (content) {
        this.contentvalue = content;
      }.bind(this));
    },
    computed:{
      rightcon:function () {
        if(this.contentvalue === ''){
          return false;
        }else{
          return true;
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .right-main{
    @include responsive-default {
      padding-top: 15px;
      div > p > img{max-width: 775px;}
      .help-index-ul{
        max-width: 500px;
        margin: 20px auto 0;
      }
      .help-index-ul > li{
        display: inline-block;
        width: 24.9%;
        margin-left: 20px;
      }
      .help-index-ul > li > a{
        color: #555;
        text-align: center;
        display: block;
      }
      .help-index-ul > li > a:hover{
        color: #555;
      }
      .help-index-d{
        background: url("~assets/img/src/help/help-index.png") no-repeat;
        width: 780px;
        height: 325px;
        display: block;
        margin: 0 auto;
      }
      .help-ie-d{
        background: url("~assets/img/src/help/ie.png") no-repeat;
        width: 64px;
        height: 64px;
        display: inline-block;
      }
      .help-firefox-d{
        background: url("~assets/img/src/help/firefox.png") no-repeat;
        width: 64px;
        height: 64px;
        display: inline-block;
      }
      .help-chrome-d{
        background: url("~assets/img/src/help/chrome.png") no-repeat;
        width: 64px;
        height: 64px;
        display: inline-block;
      }
      .video-w{
        width: 570px;
        height: 360px;
        border: 30px solid #e2e2e2;
        border-radius: 10px;
        box-shadow: 0 0 0 1px #fff;
        float: none;
        margin: 60px 0 0 115px;
      }
      #tags_w{
        padding: 0px;
      }
    }
  }
</style>
