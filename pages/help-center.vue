<template>
  <div class="help-body-d">
    <div class="lx-container bs-docs-container index-hr">
      <div class="col-xs-30">
        <nav class="bs-docs-sidebar hidden-print hidden-xs hidden-sm" id='nav_left_menu'>
        </nav>
      </div>
      <div class="col-xs-70" id="myTabContent">
        <div class="bs-docs-section"  id="div_main_content">
        </div>
      </div>
      <div id="guide-main" class="guide-main">
        <div id="guide-main-body" class="guide-main-body">
          <div id="main-body-left">
            <div id="body-left-span">
              <div @click="leftspan" class="left-span" :class="{'bg-blue': isA}">
                <span><span class="left-span-icon left-video-w"></span>视频中心</span>
              </div>
              <div @click="spanchoose" class="left-span" :class="{'bg-blue': isB}">
                <span><span class="left-span-icon left-help-w"></span>帮助中心</span>
              </div>
            </div>
              <Spanchoose  @helptitleshow="helpTitle" v-if="leftshow == true"/>
              <Leftspan v-else />
          </div>
          <div id="main-body-right">
            <div id="right-head">
              <div id="head-title" class="c">{{ title }}</div>
              <a href="./static/file/YunhetongManual.rar" class="help-download" target="_blank"><span class="left-span-icon left-manual-w"></span>下载操作手册</a>
            </div>
              <Helpright v-if="leftshow == true" />
              <Leftright v-else />
            <div id="right-foot" class="right-foot">
              <span><span class="left-span-icon left-mail-w"></span>邮箱：lvxun@yunhetong.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import bus  from '~/components/help/eventBus'
  import Leftspan from '~/components/help/Leftspan'
  import Spanchoose from '~/components/help/Spanchoose'
  import Helpright from '~/components/help/Helpright'
  import Leftright from '~/components/help/Leftright'
  import { mapState } from 'vuex';
import base from '~/framework/core/vue-base'
  export default {
    name: 'help',
    extends: base,
    metaInfo:{
      title: '帮助中心-云合同',
      meta: [{
        name: 'keywords',
        content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
      },{
        name: 'description',
        content: '云合同是律讯公司自主研发的第三方电子合同平台，致力于合同生态链的建设与完善，是“互联网”+合同的完美呈现。全国咨询热线：400-600-3669'
      }]
    },
    layout: 'default',
    data () {
      return {
        leftshow:false,
        title:'云合同操作视频',
        isA:true,
        isB:false,
        Vtags:'',
        test11:''
      }
    },
    components: {
      'Leftspan': Leftspan,
      'Spanchoose': Spanchoose,
      'Helpright': Helpright,
      'Leftright':Leftright
    },
    computed: {

    },
    mounted () {
      this.helptab();
    },
    watch: {
      "$route": "helptab"
    },
    methods: {
      leftspan(){ this.leftshow = false;this.title = '云合同操作视频';this.isA=true;this.isB=false;},
      spanchoose(){
        this.leftshow = true;
        if(this.title == '云合同操作视频') {this.title = '屏幕显示网页不全的解决方法';}
        this.isA=false;this.isB=true;
      },
      helpTitle(data){
       // console.log("title",data);
        this.title=data;
      },
      helptab(){
        let r = this.$route.query.type;
        r = Number(r);

        switch (r){
          case 1:
            this.leftspan();
            break;
          case 2 :
            this.spanchoose();
            break;
          default:
            console.log(r);
        }
      }
    }
  }
</script>
<style lang="scss">
  /*
     这个样式应该写在Helpright.vue组件中，但是浏览器渲染不出来
     所以写在父组件里可以共享的css样式中。这样帮助文档中的图片就不会超出边框
  */
  #main-body-right{
     img{max-width: 775px;}
  }
</style>
<style lang="scss" scoped>
@import "~styles/base.scss";
li {
  list-style: none;
}
.help-body-d {
  background: #f1f1f1;
  padding-top: 85px;
  height: 100%;
  @include responsive-default {
    .bs-docs-section img{max-width: 798px;}
    #guide-main-body,#main-body-left,#main-body-right,#head-title{display:inline-block;}
    #guide-main-body{width:1200px;}
    #main-body-left{width:280px;}
    #main-body-right{
      vertical-align:top;width:810px;padding:0 0 30px 30px;
      div > p > img{max-width: 775px;}
    }
    .row{color:#606060;}
    #body-left-span{height:50px;}
    .left-span{margin:5px 2px;float:left;height:50px;width:130px;background-color:#699CFF;color:white;line-height:50px;text-align:center;position: relative;}
    .left-span:hover{cursor:pointer;}
    .left-span span,.left-span i{vertical-align:middle;}
    .left-span > span{font-size:16px;position: relative;padding-left:23px;}
    .left-span > span > span{left:-7px;top:-1px;}
    .left-span i{font-size:18px;padding-right:5px;}
    .tag-img{display:inline-block;margin:16px 10px 0 0;height:18px;width:18px;}
    .tag-div{display:inline-block;vertical-align:top;width:200px;}
    .tag-div-span{font-size:16px;display:inline-block;height:50px;line-height:50px;width:100%;color: #7e7e7e;}
    .tag-div-span span:hover{cursor:pointer;}
    .tag-div ul{padding:0px;}
    .tag-div ul li{padding:3px 0px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;-o-text-overflow:ellipsis;}
    .tag-div ul li:hover{cursor:pointer;}
    .font-blue{color:#666;}
    #right-head{height:60px;line-height:60px;border-bottom:2px solid  #eeeeee;position: relative;}
    .help-download{position: absolute;right: 10px;bottom: 0;color: #4081FF;height: 45px;}
    .help-download:hover,.help-download:focus{color:#ffd306;text-decoration: none;}
    #head-title{font-size:23px;width: 100%}
    #right-foot{float:right;padding-top:3px;border-top:2px dotted #eeeeee;color:#afafaf;}
    .index-hr{
      margin-bottom: 26px;
      background: #fff;
      min-height: calc(100vh - 371px);
      position: relative;
    }
    .right-foot{
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
    .body-left-tags{
      padding:0 0 10px 35px;
    }
    .video-w{
      float: none;
      margin: 60px 0 0 115px;
    }
    .c{
      text-align: center;
      color: #999;
    }
    .tags-left-span{
      font-size: 16px;
      color: #7e7e7e;
      display: inline-block;
      position: relative;
    }
    .tags-operate{
      margin: 15px 0 0 24px;
      cursor: pointer;
      padding-bottom: 10px;
    }
    .tags-left-li{
      margin-top: 10px;
      color: #a4a4a4;
      cursor: pointer;
    }
    .active-blue{
      color: #666;
    }
    .bg-blue{
      background-color: #4081ff;
    }
    .left-span-icon{
      width: 30px;
      height: 25px;
      position: absolute;
      left: -30px;
      top:0;
      background: url("~assets/img/src/help/tags-icn.png")no-repeat;
    }
    .tags-left-span-pc{
      background-position: -3px -161px;
    }
    .tags-left-span-m{
      background-position: -3px -135px;
    }
    .left-video-w{
      background-position: -3px -213px;
    }
    .left-help-w{
      background-position: -31px -213px;
    }
    .left-manual-w{
      background-position: -31px -185px;
      top: 18px;
    }
    .left-mail-w{
      background-position: -3px -185px;
    }
    #main-body-right img{max-width: 850px;}
    .help-index-img{
      margin-top: 25px;
    }
    .help-index-ul{
      max-width: 500px;
      margin: 20px auto 0;
    }
    .help-index-ul > li{
      display: inline-block;
      width: 24.9%;
    }
    .help-index-ul > li > a{
      color: #555;
      text-align: center;
      display: block;
    }
    .help-index-ul > li > a:hover{
      color: #555;
    }
    .right-main{
      padding-top: 15px;
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
