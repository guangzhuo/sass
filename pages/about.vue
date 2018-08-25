<template>
  <div class="public-mar-top-h">
    <div class="about-bg-h1">
      <div class="row about-relative">
        <img width=100% height=100% v-imgerror src="~assets/img/src/about/about-bg.jpg" />
          <div class="row about-h3-h text-right lx-container">
            <h3 class="font-weight-h product-table-span-h about-margin-bottom-h">关于我们</h3>
            <p>时时关注云合同最新动态</p>

        </div>
      </div>
      <div class="row about-bg-h">
        <div class="lx-container">
          <div class="row text-center" id="fixed-header" :class="{ 'fixedNav-h': isFix,'fixedNav-pad-h': isFix }">
            <ul class="about-btn-group-h all-cursor nav nav-tabs-h">
              <li class="col-xs-4" :class="{'active': isA}" @click="getUrl('introduction')"><span class="col-xs-12">公司简介</span></li>
              <li class="col-xs-4 public-bor-left-h" :class="{'active': isB}" @click="getUrl('contact')"><span class="col-xs-12">联系我们</span></li>
              <li class="col-xs-4 public-bor-left-h" :class="{'active': isC}" @click="getUrl('invite')"><span class="col-xs-12">诚聘英才</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane  active"
             ref="introduction"
             :class="{ 'security-mar-top2-h': isFix }">
          <Introduction />
        </div>
        <div class="tab-pane"
             ref="contact"
             :class="{ 'security-mar-top2-h': isFix }">
            <Contact />
        </div>
        <div class="tab-pane"
             ref="invite"
             :class="{ 'security-mar-top2-h': isFix }">
          <Invite />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //引用公司简介组件
  import Introduction from '~/components/about/aboutintro'
  //引用服务支持组件
  import Contact from '~/components/about/aboutcontact'
  //引用诚聘英才组件
  import Invite from '~/components/about/aboutinvite'
  import { mapState } from 'vuex'
  export default {
    name: 'about',
    metaInfo:{
      title: '关于我们-云合同',
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
        isFix:false,
        isA:true,
        isB:false,
        isC:false
      }
    },
    components: {
      'Introduction': Introduction,
      'Contact':Contact,
      'Invite':Invite
    },
    computed: {
    },
    mounted () {
      document.dispatchEvent(new Event('render-event'));
      /*
      * 从foot组件进入该页面
      */
      this.showAbout();
      /*
     *页面滚动，tab页要以浏览器位置固定
     */
      window.addEventListener('scroll', this.handleScroll);

    },
    watch: {
      test(){
        this.getUrl();
      },
      "$route": "showAbout"
    },
    methods: {
      getUrl(aboutUrl){
        if(aboutUrl == 'contact' ){
          this.$nextTick( () => {
            this.isA = false;this.isB = true;this.isC = false;
            this.$refs.contact.style.display='block';
            this.$refs.introduction.style.display='none';
            this.$refs.invite.style.display='none';
          })
        }else if(aboutUrl == 'invite'){
          this.isA = false;this.isB = false;this.isC = true;
          this.$refs.invite.style.display='block';
          this.$refs.introduction.style.display='none';
          this.$refs.contact.style.display='none';
        }else{
          this.isA = true;this.isB = false;this.isC = false;
          this.$refs.introduction.style.display='block';
          this.$refs.contact.style.display='none';
          this.$refs.invite.style.display='none';
        }
      },
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if ( scrollTop >= 427  ) {
          this.isFix=true;
        }else{
          this.isFix=false;
        }
      },
      showAbout(){
        let types = this.$route.query.type;
        if(types == '2'){
          this.$nextTick( () => {
            this.isA = false;this.isB = true;this.isC = false;
            this.$refs.contact.style.display='block';
            this.$refs.introduction.style.display='none';
            this.$refs.invite.style.display='none';
          })
        }else if(types == '3'){
          this.isA = false;this.isB = false;this.isC = true;
          this.$refs.invite.style.display='block';
          this.$refs.introduction.style.display='none';
          this.$refs.contact.style.display='none';
        }else{
          this.isA = true;this.isB = false;this.isC = false;
          this.$refs.introduction.style.display='block';
          this.$refs.contact.style.display='none';
          this.$refs.invite.style.display='none';
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .public-mar-top-h{
  @include responsive-default {
    .about-relative {
      position: relative;
    }
    .about-h3-h {
      position: absolute;
      top: 32%;
      right: calc(50% - 600px);
      text-align: right;
    }
    .font-weight-h {
      font-weight: 600;
      color: #4081ff;
      margin-bottom: 20px;
    }
    .about-bg-h1 {
      padding: 67px 0 0px;
    }
    .about-bg-h {
       background-color: #f5f6fa;
       padding: 32px 0 58px;
    }
    .about-btn-group-h {
      border: 1px solid #e3e3e3;
      font-size: 18px;
      border-radius: 4px;
      height: 56px;
    }
    .about-btn-group-h li span {
      color: #000;
      padding: 15px 0 18px;
    }
    .about-btn-group-h li span:hover {
      background-color: #4081ff;
      color: #fff;
      text-decoration: none;
    }
    .nav-tabs-h > li > span {
      color: #4c4c4c;
      font-size: 16px;
    }
    .nav-tabs-h > li:first-of-type.active > span {
      background-color: #4081ff;
      color: #fff;
      border-radius: 4px 0 0 4px;
    }
    .nav-tabs-h > li.active > span, .nav-tabs-h > li.active > span:hover, .nav-tabs-h > li.active > span:focus, .nav-tabs-h > li > span:hover {
      background-color: #4081ff;
      color: #fff;
      cursor: pointer;
    }
    .nav-tabs-h > li:last-of-type.active > span {
      background-color: #4081ff;
      color: #fff;
      border-radius: 0 4px 4px 0;
    }
    .about-invite-btn-h {
      border: 1px solid #eee;
    }
    .fixedNav-h {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      background-color: #fff;
    }

    @media (max-width: 1920px){
      .fixedNav-pad-h {
        padding: 5px 18.9% 6px;
      }
    }

    @media (max-width: 1600px){
      .fixedNav-pad-h {
        padding: 5px 12.1% 6px;
      }
    }
    @media (max-width: 1366px){
      .fixedNav-pad-h {
        padding: 5px 5.5% 6px;
      }
    }
    .security-mar-top2-h {
      color: #555;
    }

    /*组件*/
    #focus_Box {
      position: relative;
      width: 650px;
      height: 535px;
      margin: 20px auto;
      top: 60px
    }
    #focus_Box ul {
      position: relative;
      width: 710px;
      height: 308px
    }
    #focus_Box li {
      z-index: 0;
      position: absolute;
      width: 0;
      background: #787878;
      height: 0;
      top: 146px;
      cursor: pointer;
      left: 377px;
      border-radius: 4px;
    }
    #focus_Box li img {
      width: 100%;
      height: 100%;
      vertical-align: top
    }
    .marginLeft {
      left: -1200px;
    }
    .fs-container {
      width: 40%;
      height: 350px;
    }
    .fs-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      -webkit-perspective: 1000px;
      -moz-perspective: 1000px;
      -o-perspective: 1000px;
      -ms-perspective: 1000px;
      perspective: 1000px;
    }
    .fs-block {
      position: absolute;
      -webkit-transition: all 1s ease;
      -moz-transition: all 1s ease;
      -o-transition: all 1s ease;
      -ms-transition: all 1s ease;
      transition: all 1s ease;
    }
    .fs-block:nth-child(1) {
      -webkit-transform-origin: top right;
      -webkit-transform: translateX(-103%) rotateY(-35deg);
      -moz-transform-origin: top right;
      -moz-transform: translateX(-103%) rotateY(-35deg);
      -o-transform-origin: top right;
      -o-transform: translateX(-103%) rotateY(-35deg);
      -ms-transform-origin: top right;
      -ms-transform: translate(-103%);
      transform-origin: top right;
      transform: translateX(-103%) rotateY(-35deg);
    }
    .fs-block:nth-child(3) {
      -webkit-transform-origin: top left;
      -webkit-transform: translateX(103%) rotateY(35deg);
      -moz-transform-origin: top left;
      -moz-transform: translateX(103%) rotateY(35deg);
      -o-transform-origin: top left;
      -o-transform: translateX(103%) rotateY(35deg);
      -ms-transform-origin: top left;
      -ms-transform: translate(103%);
      transform-origin: top left;
      transform: translateX(103%) rotateY(35deg);
    }
  }
  }
</style>
