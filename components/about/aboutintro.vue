<template>
  <div class="row about-pad-bottom-h">
    <div class="row about-bg-h">
      <div class="lx-container">
        <div class="row about-pad-top-h">
          <div class="row col-xs-12 about-margin2">
            <div class="col-xs-5">
              <hr class="about-hr"/>
            </div>
            <div class="col-xs-2 text-center">
              <p class="about-text-h font-weight-h">公司简介</p>
              <p class="about-text1-h">COMPANY PROFILE</p>
            </div>
            <div class="col-xs-5">
              <hr class="about-hr"/>
            </div>
          </div>
          <div class="row about-company-p-h">
            <div class="row">
              <p class="about-p-h privacy-p-h">浙江律讯网络科技有限公司成立于2014年5月，<span class="about-span-h">注册资金5555.56万元</span>，位于中国的硅谷——杭州未来科技城。2016年1月16日，获政府产业基金A轮投资
                <span class="about-span-h">1000万元人民币</span>，市场估值已超亿元。</p>
            </div>
            <div class="row">
              <p class="about-p-h privacy-p-h">公司聚集了一大批原腾讯、阿里、网新、网盛的资深运营及移动、华为、亚信的技术骨干，同时整合了遍布国内多个城市的1500名资深律师，具备了强大的人才竞争优势。</p>
            </div>
            <div class="row">
              <p class="about-p-h privacy-p-h">凭借对互联网文化、法律文化及合同生态的精准把握，律讯公司自主研发了第三方电子合同平台——“云合同”。该平台获得了国家工信部授予的“
                <span class="about-span-h">国家电子合同创新服务平台</span>”殊荣，在电子合同行业中树立了标杆。</p>
            </div>
            <div class="row">
              <p class="about-p-h privacy-p-h">当前，云合同已与政府部门、互联网金融行业、旅游业、电子商务行业、人力资源行业等多个行业标杆企业达成了战略合作。在不远的未来，云合同必将改变更多用户的传统签约习惯，引领一个更便捷高效、安全环保的电子合同签署——云合同时代。</p>
            </div>

          </div>
          <div class="row about-margin1-h">
            <div class="col-xs-40">
              <div class="about-circle-h"></div>
            </div>
            <div class="col-xs-60">
              <span class="about-company-p1-h">2016年开发部团队风采-团建活动</span>
            </div>
          </div>
          <div class="row about-padding-bottom1-h about-center-h">
            <div class="fs-container about-inline-h">
              <div class="fs-wrapper">
                <div class="fs-block all-cursor"><img width="503" height="305" @click="imgclick(dataimgleft)" v-imgerror :data-img="dataimgleft" class="activity" ref="activityleft" src="~/assets/img/src/about/activity2.jpg"></div>
                <div class="fs-block"><img  width="503" height="305" v-imgerror ref="activitycenter" src="~/assets/img/src/about/activity3.jpg"></div>
                <div class="fs-block all-cursor"><img  width="503" height="305" @click="imgclick(dataimgright)" v-imgerror :data-img="dataimgright" class="activity" ref="activityright" src="~/assets/img/src/about/activity4.jpg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row about-pad-top-h" id="about-idea1" style="background-color: #fff;">
      <div class="lx-container">
        <div class="row col-xs-12 about-margin2">
          <div class="col-xs-5">
            <hr class="about-hr"/>
          </div>
          <div class="col-xs-2 text-center">
            <p class="about-text-h font-weight-h">发展历程</p>
            <p class="about-text1-h">DEVELOPMENT HISTORY</p>
          </div>
          <div class="col-xs-5">
            <hr class="about-hr"/>
          </div>
        </div>
        <div class="row text-center about-margin-bottom2-h">
          <p class="about-company-p-h">公司自成立之初便确立了“诚信、专注、高效、创新”的理念。</p>
        </div>
      </div>
      <div class="row all-relative company-develop-h">
        <div class="company-develop1-h">
          <div class="row company-develop2-h" :data-left="dataleft" :style="cirleft" ref="timeShaft">
            <div class="about-develop-h">
              <div class="row about-mar-top1-h"><span class="about-text-time-h">2014年5月</span></div>
              <div class="row about-mar-top2-h">
                <img v-imgerror :class="imgstatus1" @mouseenter="showActive('establish')" @mouseleave="hideActive('establish')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/establish.jpg" ref="establish"  alt="云合同">
                <p class="about-develop-p-h">浙江律讯网络科技有限公司成立</p>
              </div>
            </div>
            <div class="about-develop-h">
              <div class="row">
                <img v-imgerror :class="imgstatus2" @mouseenter="showActive('declaration')" @mouseleave="hideActive('declaration')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/declaration.jpg" ref="declaration" alt="云合同">
                <p class="about-develop-p-h">与西政、中科院云计算中心成为共建单位，申报云合同成为国家电子合同平台</p>
              </div>
              <div class="row security-mar-top-h"><span class="about-text-time-h">2015年5月</span></div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top1-h"><span class="about-text-time-h">2015年7月</span></div>
              <div class="row about-mar-top2-h">
                <img v-imgerror :class="imgstatus3" @mouseenter="showActive('approve')" @mouseleave="hideActive('approve')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/approve.jpg" ref="approve" alt="云合同">
                <p class="about-develop-p-h">云合同荣获工信部唯一认证的“国家电子合同平台”荣誉</p>
              </div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top3-h">
                <img v-imgerror :class="imgstatus4" @mouseenter="showActive('yht')" @mouseleave="hideActive('yht')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/yunhetong.jpg" ref="yht" alt="云合同">
                <p class="about-develop-p-h">云合同正式上线</p>
              </div>
              <div class="row security-mar-top-h"><span class="about-text-time-h">2015年7月</span></div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top1-h"><span class="about-text-time-h">2016年1月</span></div>
              <div class="row about-mar-top2-h">
                <img v-imgerror :class="imgstatus5" @mouseenter="showActive('ceremony')" @mouseleave="hideActive('ceremony')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/issue.jpg" ref="ceremony" alt="云合同" />
                <p class="about-develop-p-h">云合同产品发布会隆重举办</p>
              </div>
            </div>
            <div class="about-develop-h">
              <div class="row about-margin-top-h">
                <img v-imgerror :class="imgstatus6" @mouseenter="showActive('financing')" @mouseleave="hideActive('financing')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/financing.jpg" ref="financing" alt="云合同" />
                <p class="about-develop-p-h">获A轮融资1000万元人民币，云合同市场估值过亿</p>
              </div>
              <div class="row security-mar-top-h"><span class="about-text-time-h">2016年1月</span></div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top1-h"><span class="about-text-time-h">2016年1月</span></div>
              <div class="row about-mar-top2-h">
                <img v-imgerror :class="imgstatus7" @mouseenter="showActive('issue')" @mouseleave="hideActive('issue')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/ceremony.jpg" ref="issue" alt="云合同">
                <p class="about-develop-p-h">与中科院云计算中心、美亚保险签署战略合作协议</p>
              </div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top3-h">
                <img v-imgerror :class="imgstatus8" @mouseenter="showActive('setmeal')" @mouseleave="hideActive('setmeal')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/set-meal.jpg" ref="setmeal" alt="云合同">
                <p class="about-develop-p-h">云合同套餐正式上线</p>
              </div>
              <div class="row security-mar-top-h"><span class="about-text-time-h">2016年3月</span></div>
            </div>
            <div class="about-develop-h">
              <div class="row about-mar-top1-h"><span class="about-text-time-h">2016年7月</span></div>
              <div class="row about-mar-top2-h">
                <img v-imgerror :class="imgstatus9" @mouseenter="showActive('sdk')" @mouseleave="hideActive('sdk')" width=150 height=102 class="about-mar-bottom-h" src="~/assets/img/src/about/sdk.jpg" ref="sdk" alt="云合同">
                <p class="about-develop-p-h">云合同SDK对接服务正式上线</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lx-container">
          <div class="row about-margin-bottom1-h about-time-shaft-h">
            <img v-imgerror width=100% height=100% src="~/assets/img/src/about/timer-shaft.jpg" class="img-responsive text-center" alt="云合同" />
            <div class="about-circle1-h all-cursor about-circle-absolute1-h"  @click="restoration"></div>
            <div class="about-circle1-h all-cursor about-circle-absolute2-h"  @click="courseMove"></div>
            <div class="about-circle1-h all-cursor about-circle-absolute3-h"  @click="courseMove"></div>
          </div>
        </div>
      </div>
      <div class="lx-container">
        <div class="row about-pad-top-h about-height-h" id="about-aptitude1">
          <div class="row col-xs-12 about-margin2">
            <div class="col-xs-5">
              <hr class="about-hr"/>
            </div>
            <div class="col-xs-2 text-center">
              <p class="about-text-h font-weight-h">公司荣誉</p>
              <p class="about-text1-h">HONOR & QUALIFICATION</p>
            </div>
            <div class="col-xs-5">
              <hr class="about-hr"/>
            </div>
          </div>
          <div class="row">
            <div id="focus_Box">
              <ul>
                <li>
                  <img width="445" height="308" src="~/assets/img/src/about/about-figure1.jpg" class="img-responsive" alt="云合同">
                </li>
                <li>
                  <img width="445" height="308" src="~/assets/img/src/about/about-figure2.jpg" class="img-responsive" alt="云合同">
                </li>
                <li>
                  <img width="445" height="308" src="~/assets/img/src/about/about-figure3.jpg" class="img-responsive" alt="云合同">
                </li>
                <li>
                  <img width="445" height="308" src="~/assets/img/src/about/about-figure4.jpg" class="img-responsive" alt="云合同">
                </li>
                <li>
                  <img width="445" height="308" src="~/assets/img/src/about/about-figure5.jpg" class="img-responsive" alt="云合同">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pic from "~/plugins/zoom-pic";
  export default {
    data () {
      return {
        cirleft:'',
        dataleft:0,
        dataimgleft:2,
        dataimgright:4,
        ind:0,
        imgstatus1:'',
        imgstatus2:'',
        imgstatus3:'',
        imgstatus4:'',
        imgstatus5:'',
        imgstatus6:'',
        imgstatus7:'',
        imgstatus8:'',
        imgstatus9:''
      }
    },
    components: {
    },
    mounted () {
      //引入公司荣耀的轮播插件
      new pic('focus_Box');

    },
    watch: {
    },
    methods: {
      imgclick(imgnum){
        //此函数为图片左右滑动，功能为：2016年开发部团队风采-团建活动
        var c = imgnum;
        var l = imgnum - 1;
        var r = imgnum + 1;
        if( imgnum <= 6){
            if(imgnum == 6){
              this.dataimgleft = l;
              this.dataimgright = 1;
              this.$refs.activityleft.src = require(`~/assets/img/src/about/activity${l}.jpg`);
              this.$refs.activitycenter.src = require(`~/assets/img/src/about/activity${c}.jpg`);
              this.$refs.activityright.src = require(`~/assets/img/src/about/activity1.jpg`);
            }else if(imgnum == 1){
              this.dataimgleft = 6;
              this.dataimgright = r;
              this.$refs.activityleft.src = require(`~/assets/img/src/about/activity6.jpg`);
              this.$refs.activitycenter.src = require(`~/assets/img/src/about/activity${c}.jpg`);
              this.$refs.activityright.src = require(`~/assets/img/src/about/activity${r}.jpg`);
            }else{
              this.dataimgleft = l;
              this.dataimgright = r;
              this.$refs.activityleft.src = require(`~/assets/img/src/about/activity${l}.jpg`);
              this.$refs.activitycenter.src = require(`~/assets/img/src/about/activity${c}.jpg`);
              this.$refs.activityright.src = require(`~/assets/img/src/about/activity${r}.jpg`);
            }
        }
      },
      showActive(tyval){
        //此函数鼠标悬停图片放大，功能为：发展历程
        var bodyWidth = document.body.clientWidth / 2;
        switch(tyval)
        {
          case 'establish':
            this.$refs.establish.width=474;
            this.$refs.establish.height=321;
            let eswidth=this.$refs.establish.offsetLeft;
            if(eswidth >= bodyWidth ){
              this.addtyvalc('establish','img-status2-h');
            }else{
              this.addtyvalc('establish','img-status1-h');
            }
            break;
          case 'declaration':
            this.$refs.declaration.width=474;
            this.$refs.declaration.height=321;
            let dewidth=this.$refs.declaration.offsetLeft;
            if(dewidth >= bodyWidth ){
              this.addtyvalc('declaration','img-status2-h');
            }else{
              this.addtyvalc('declaration','img-status1-h');
            }
            break;
          case 'approve':
            this.$refs.approve.width=474;
            this.$refs.approve.height=321;
            let apwidth=this.$refs.approve.offsetLeft;
            if(apwidth >= bodyWidth ){
              this.addtyvalc('approve','img-status2-h');
            }else{
              this.addtyvalc('approve','img-status1-h');
            }
            break;
          case 'yht':
            this.$refs.yht.width=474;
            this.$refs.yht.height=321;
            let yhwidth=this.$refs.yht.offsetLeft;
            if(yhwidth >= bodyWidth ){
              this.addtyvalc('yht','img-status2-h');
            }else{
              this.addtyvalc('yht','img-status01-h');
            }
            break;
          case 'ceremony':
            this.$refs.ceremony.width=474;
            this.$refs.ceremony.height=321;
            let cewidth=this.$refs.ceremony.offsetLeft;
            if(cewidth >= bodyWidth ){
              this.addtyvalc('ceremony','img-status2-h');
            }else{
              this.addtyvalc('ceremony','img-status1-h');
            }
            break;
          case 'financing':
            this.$refs.financing.width=474;
            this.$refs.financing.height=321;
            let fiwidth=this.$refs.financing.offsetLeft;
            if(fiwidth >= bodyWidth ){
              this.addtyvalc('financing','img-status3-h');
            }else{
              this.addtyvalc('financing','img-status1-h');
            }
            break;
          case 'issue':
            this.$refs.issue.width=474;
            this.$refs.issue.height=321;
            let iswidth=this.$refs.issue.offsetLeft;
            if(iswidth >= bodyWidth ){
              this.addtyvalc('issue','img-status4-h');
            }else{
              this.addtyvalc('issue','img-status1-h');
            }
            break;
          case 'setmeal':
            this.$refs.setmeal.width=474;
            this.$refs.setmeal.height=321;
            let setwidth=this.$refs.setmeal.offsetLeft;
            if(setwidth >= bodyWidth ){
              this.addtyvalc('setmeal','img-status5-h');
            }else{
              this.addtyvalc('setmeal','img-status1-h');
            }
            break;
          case 'sdk':
            this.$refs.sdk.width=474;
            this.$refs.sdk.height=321;
            let sdtwidth=this.$refs.sdk.offsetLeft;
            if(sdtwidth >= bodyWidth ){
              this.addtyvalc('sdk','img-status6-h');
            }else{
              this.addtyvalc('sdk','img-status1-h');
            }
            break;
          default:
            console.log("tyval",tyval)
        }
      },
      hideActive(tyval){
        //此函数鼠标离开图片缩小，功能为：发展历程
        switch(tyval)
        {
          case 'establish':
            this.$refs.establish.width=150;
            this.$refs.establish.height=102;
            this.imgstatus1 = "";
            break;
          case 'declaration':
            this.$refs.declaration.width=150;
            this.$refs.declaration.height=102;
            this.imgstatus2 = "";
            break;
          case 'approve':
            this.$refs.approve.width=150;
            this.$refs.approve.height=102;
            this.imgstatus3 = "";
            break;
          case 'yht':
            this.$refs.yht.width=150;
            this.$refs.yht.height=102;
            this.imgstatus4 = "";
            break;
          case 'ceremony':
            this.$refs.ceremony.width=150;
            this.$refs.ceremony.height=102;
            this.imgstatus5 = "";
            break;
          case 'financing':
            this.$refs.financing.width=150;
            this.$refs.financing.height=102;
            this.imgstatus6 = "";
            break;
          case 'issue':
            this.$refs.issue.width=150;
            this.$refs.issue.height=102;
            this.imgstatus7 = "";
            break;
          case 'setmeal':
            this.$refs.setmeal.width=150;
            this.$refs.setmeal.height=102;
            this.imgstatus8 = "";
            break;
          case 'sdk':
            this.$refs.sdk.width=150;
            this.$refs.sdk.height=102;
            this.imgstatus9 = "";
            break;
          default:
            console.log("cval",cval)
        }
      },
      addtyvalc(cval,cwid){
        //此函数鼠标悬停图片放大，功能为：发展历程
        //调用函数为：showActive(tyval)
        switch(cval)
        {
          case 'establish':
            this.imgstatus1 = cwid;
            break;
          case 'declaration':
            this.imgstatus2 = cwid;
            break;
          case 'approve':
            this.imgstatus3 = cwid;
            break;
          case 'yht':
            this.imgstatus4 = cwid;
            break;
          case 'ceremony':
            this.imgstatus5 = cwid;
            break;
          case 'financing':
            this.imgstatus6 = cwid;
            break;
          case 'issue':
            this.imgstatus7 = cwid;
            break;
          case 'setmeal':
            this.imgstatus8 = cwid;
            break;
          case 'sdk':
            this.imgstatus9 = cwid;
            break;
          default:
            console.log("cval",cval)
        }
      },
      restoration(){
        this.dataleft= 0;
        this.cirleft=`left:0px;tansition: all ease-out .5s;`;
      },
      courseMove(){
        var move = this.dataleft;
        if(move < 4){
          move = move + 1;
          var moveLeft = move*(-240);
          this.dataleft = move;
          this.cirleft = `left:${moveLeft}px;tansition: all ease-out .5s;`;
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .about-pad-bottom-h{
    padding-bottom: 100px;
    @include responsive-default {
      .about-bg-h{background-color: #f5f6fa;}
      .about-pad-top-h{padding-top: 100px;}
      .about-margin2{margin-bottom: 30px;}
      .about-margin-bottom2-h{margin-bottom: 80px;}
      .about-hr{border-top-style: solid; border-top-width: 1px;}
      .about-text-h{font-size: 24px; margin-bottom: 0;}
      .font-weight-h{font-weight: 600;}
      .about-text1-h{font-size: 11px; color: #606060;}
      .about-company-p-h{color: #333;}
      .about-p-h{text-indent: 2em; }
      .privacy-p-h{margin-bottom: 0; line-height: 1.6;}
      .about-span-h{font-weight: 600; color: #000;}
      .about-margin1-h{margin: 80px 0 30px;}
      .about-circle-h{width:6px; height:6px; border-radius: 4px; background-color: #4081ff; float: right; margin: 10px 15px 0 0;}
      .about-company-p1-h{font-size: 18px; color: #333;}
      .about-padding-bottom1-h{padding-bottom: 80px;}
      .about-center-h{text-align: center;}
      .all-cursor{ cursor: pointer;}
      .item{
        transition: all .8s ease;
      }
      %col-xs{
        float: left;
        position: relative;
        min-height: 1px;
      }
      .col-xs-40{
        width: 40%;
        @extend %col-xs;
      }
      .col-xs-60{
        width: 60%;
        @extend %col-xs;
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
      .about-inline-h{display: inline-block;}
      .all-relative{position: relative;}
      .company-develop-h{width: 100%; overflow: hidden;}
      .company-develop1-h{width: 1200px; margin: 0 auto; overflow: hidden;height: 393px;}
      .company-develop2-h{width: 3200px; position: relative;height: 393px;}
      .about-mar-top1-h{margin-top: 120px;}
      .about-mar-top2-h{margin-top: 80px;}
      .about-mar-top3-h{margin-top: 46px;}
      .about-text-time-h{font-size: 22px; margin-bottom: 0;}
      .about-mar-bottom-h{margin-bottom: 10px;}
      /*.about-width-h{width: 75%;}*/
      .about-develop-p-h{color: #969696;}
      .security-mar-top-h{margin-top: 50px;}
      .about-develop-h{width: 200px;margin: 0 20px;float: left;}
      .about-circle1-h{width: 30px; height: 30px; border-radius: 15px;}
      .about-circle-absolute1-h{position: absolute; top: 0;}
      .about-circle-absolute2-h{position: absolute; top: 0; left:38.5%;}
      .about-circle-absolute3-h{position: absolute; top: 0; right:21.5%;}
      .img-status01-h{position: absolute; z-index: 9999; top: 0;left: 21.5%;}
      .img-status1-h{position: absolute; z-index: 9999; top: 0;}
      .img-status2-h{position: absolute; z-index: 9999; top: 0; left: 22%;}
      .img-status3-h{position: absolute; z-index: 9999; top: 0; left: 30%;}
      .img-status4-h{position: absolute; z-index: 9999; top: 0; left: 37%;}
      .img-status5-h{position: absolute; z-index: 9999; top: 0; left: 45%;}
      .img-status6-h{position: absolute; z-index: 9999; top: 0; left: 52%;}
      .container{width: 1230px!important; margin-right: auto; margin-left: auto; *zoom: 1;}
      .about-circle1-h{width: 30px; height: 30px; border-radius: 15px;}
      .about-margin-bottom1-h{margin-bottom: 30px;}
      .about-time-shaft-h{position: absolute; top: 46%;  width: 1200px;}
      .about-height-h{height: 600px;}
      #focus_Box{position:relative;width:650px;height:535px;margin:20px auto;top: 60px;animation: azoom-d 1s;}
      @keyframes azoom-d {
        from {
          opacity: 0;
          transform: scale3d(.1, .1, .1);
        }
        50% {
          opacity: 1;
        }
      }
      #focus_Box ul{position:relative;width:710px;height:308px}
      #focus_Box li{z-index:0;position:absolute; width:0;background:#787878;height:0;top:146px;cursor:pointer;left:377px;border-radius:4px;}
      #focus_Box li img{width:100%;height:100%;vertical-align:top}
      #focus_Box li:nth-child(2){ &:hover{ cursor: default; } &:active{ cursor: default; } }
    }
  }
</style>
