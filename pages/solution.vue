<template>

  <section class="solution">
    <div class="lx-container" style="position: relative;">
      <div class="solution-top-new-hu">
        针对不同行业，我们提供不同的解决方案
      </div>
      <div class="solution-bottom-new-hu">
        <div
          v-for="(items,index) in itemlist"
          :class="items.classvalue1"
          :style="{width: index === ind ? '340px':'160px'}"
          @mouseover="dispaymove(index)">
          <div class="solution-botfl-show-hu"
               v-show="index !== ind">
            <p>{{ items.industriesname }}</p>
            <i :class="items.classvalue2"></i>
          </div>
          <div class="solution-botfl-hide-hu" :class="[index === ind ? 'slideinhright':'']" v-show="index === ind">
            <p>{{ items.industriesname }}</p>
            <p class="botfl-title">行业痛点</p>
            <p v-html="items.icontent">
            </p>
            <p class="botfl-title">解决方案</p>
            <p v-html="items.scontent">
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import base from '~/framework/core/vue-base.vue'

export default {
  name: 'solution',
  extends: base,
  metaInfo:{
    title: '国家电子合同创新服务平台-产品中心-云合同',
    meta: [{
      name: 'keywords',
      content: '电子合同平台，电子签约，电子签名，合同在线签署，云合同'
    },{
      name: 'description',
      content: '云合同产品中心为你提供合同生成，合同流转，合同签署，合同监管及过程当中的法律服务等产品展示。'
    }]
  },
  layout: 'default',
  data () {
    return {
      hasError:true,
      ind:0,
      mvalue:-1,
      itemlist:[
        {
          classvalue1:'solution-text1 solution-bef1-new-hu',
          industriesname:'人力资源',
          classvalue2:'iconsprite icon-RZicon img-bottom',
          icontent:'1.合同量大，且签署流程类似；<br/>2.填写纸质合同，出错率高；<br/>3.存在作废合同的需求。',
          scontent:'1.在线签约及自动签署功能，一个PAD搞定所有合同，签约仅需5秒；<br/>2.线上签署安全高效，出错率低；<br/>3.具备CA证书，防止完成签署的合同被篡改；<br/>4.满足存储、查阅及作废需求；'
      },
        {
          classvalue1:'solution-text2 solution-bef1-new-hu',
          industriesname:'互联网金融',
          classvalue2:'iconsprite icon-HJicon img-bottom',
          icontent:'1.合同类别多且数量庞大；<br/>2.多为异地签署、合同邮寄成本高、效率低；<br/>3.安全性低，邮寄途中存在单方面修改或丢失合同的风险。',
          scontent:'1.各种合同批量签署，对合同设置自动签署，快捷、方便。<br/>2.在线签约功能解决异地签署问题，节省出差及邮寄合同费用；<br/>3.云端存储有迹可循，降低合同丢失的风险；<br/>4.具备CA证书，防止完成签署的合同被篡改。'
        },
        {
          classvalue1:'solution-text3 solution-bef1-new-hu',
          industriesname:'在线旅游',
          classvalue2:'iconsprite icon-LYicon img-bottom',
          icontent:'1.在线旅游行业业务发展速度快，合同量巨大，且多为制式合同，操作流程类似；<br/>2.线下签约，耗时长、成本高、易遗失，管理难。',
          scontent:'1.企业可自主上传合同模板，设置自动签署，极大减少签约工作量；<br/>2.全部操作电子化，快速锁定用户，方便存储和调阅；<br/>3.第三方平台更具公信力，一旦发生法律纠纷，及时保障双方合法权益；<br/>4.具备CA证书，防止完成签署的合同被篡改'
        },
        {
          classvalue1:'solution-text4 solution-bef1-new-hu',
          industriesname:'电商行业',
          classvalue2:'iconsprite icon-DSicon img-bottom',
          icontent:'1.电商产品价格波动幅度大，在不同价格阶段容易产生不同的需求，合同内容需要跟随价格变动做调整；<br/>2.传统签约方式周期长、成本高，非常容易产生各种法律纠纷。',
          scontent:'1在线对合同内容进行快速编辑，满足不同价格的商品波动；<br/>2.合同参与方快速完成查看和签约，签约周期短，合同管理便捷，产生纠纷率低。'
        },
        {
          classvalue1:'solution-text5 solution-bef1-new-hu',
          industriesname:'物流快递',
          classvalue2:'iconsprite icon-WLicon img-bottom',
          icontent:'1.合同量大，管理困难、效率低；<br/>2.多为线下签约，签约周期长、成本高、安全性低；',
          scontent:'1.全程线上操作，提高合同签署、合同管理效率；<br/>2.合同参与方快速完成合同查看和签约，签约周期短、成本低；<br/>3.具备CA证书，防止合同被篡改。'
        },
        {
          classvalue1:'solution-text6 solution-bef1-new-hu',
          industriesname:'传统行业',
          classvalue2:'iconsprite icon-CTicon img-bottom',
          icontent:'1.合同数量庞大，纸质合同线下存储成本高，查找效率低；<br/>合同流转耗时长，签约流程繁琐，需付出大量的时间成本；',
          scontent:'1.线上签署、线上管理减少存储成本，提高管理效率；<br/>2.互联网时代已然来临，线上签署是传统行业向互联网转型的一种方式。<br/>3.全程线上操作，提高合同处理效率。',
        }
      ]
    }
  },
  created () {
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    /*
    * description:当从首页进入的时候，要根据类别显示解决方案
    * */
    this.typesshow();
  },
  methods: {
    dispaymove(index){
      //description:箭头鼠标在当前页面是否移动，适用浏览器为FireFox,Chrome,Opera,IE高版本…
      window.addEventListener('mousemove',this.onMouseMove.bind(this),false);
      //description:模拟jquery的hover()方法，当鼠标开始移动的时候触发该方法
      if(this.mvalue === 1){
        this.ind = index;
      }
    },
    typesshow(){
      /*
      * 从Index.vue页面解决方案部分进入，应该展开相关内容
      * 当this.$route.params.types的值为undefine时，this.ind默认为0
      */
      if(this.$route.params.types){
        this.ind = this.$route.params.types;
      }
    },
    onMouseMove(){
      this.mvalue = 1;
    }
  },
  components: {
  }
}
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  $colorWhite: #fff;
  @mixin animation1($a,$b,$c,$d,$e,$f,$g){
    -webkit-transform: translateX($a) scaleX($b) scaleY($c);
    transform: translateX($a) scaleX($b) scaleY($c);
    -webkit-transform-origin: $d $e;
    transform-origin: $d $e;
    -webkit-filter: blur($f);
    filter: blur($f);
    opacity: $g;
  }
.solution {
  @include responsive-default {
    margin-top: 67px;
    background: url("~assets/img/src/solution/solution-1.png") repeat;
    background-size: cover;
    width: 100%;
    height: 774px;
    .solution-top-new-hu {
      position: absolute;
      top: 80px;
      left: calc(50% - 288px);
      color: $colorWhite;
      font-size: 32px;
      margin-bottom: 28px;
    }
    .solution-bottom-new-hu {
      position: absolute;
      height: 495px;
      width: 1140px;
      left: calc(50% - 570px);
      top: 190px;
      overflow: hidden;
      border-left: none;
      .solution-text1 {
        background-color: #74748f;
      }
      .solution-text2 {
        background-color: #7e7eb5;
      }
      .solution-text3 {
        background-color: #dab125;
      }
      .solution-text4 {
        background-color: #42ae9e;
      }
      .solution-text5 {
        background-color: #4f9ed3;
      }
      .solution-text6 {
        background-color: #9ace67;
      }
    }
    .solution-befo-new-hu {
      width: 340px;
      height: 495px;
    }
    .solution-botfl-hide-hu {
      width: 340px;
      height: 495px;
      padding-top: 50px;
      opacity: 0;
      transition: 1.4s;
      & > p {
        color: #fff;
        padding-left: 25px;
        padding-right: 25px;
        font-size: 14px;
      }
      & > p:first-child {
        text-align: center;
        font-size: 18px;
        padding-left: 0;
        padding-right: 0;
        position: relative;
        margin-bottom: 5px;
        &::after {
          content: "";
          width: 60px;
          height: 3px;
          background: rgba(0, 0, 0, .1);
          position: absolute;
          left: calc(50% - 30px);
          top: 50px;
        }
      }
    }
    .botfl-title {
      font-size: 16px !important;
      margin: 46px 0 25px;
    }
    .solution-botfl-show-hu {
      display: block;
      width: 100%;
      height: 100%;
      padding-left: 25px;
      padding-top: 50px;
      position: relative;
      & > p {
        font-size: 24px;
        color: #fff;
        text-align: left;
        position: relative;
        &::after {
          content: "";
          width: 62px;
          height: 3px;
          background: rgba(0, 0, 0, .1);
          position: absolute;
          left: 0;
          top: 50px;
        }
      }
    }
    .solution-op-show {
      opacity: 1;
      transition: .4s;
    }
    .img-bottom {
      display: block;
      position: absolute;
      bottom: -10px;
      left: 30px;
    }
    .solution-bef1-new-hu {
      width: 160px;
      height: 495px;
      overflow: hidden;
      float: left;
      box-shadow: 0 0 13px rgba(61, 61, 117, 0.13);
      .content_botfl_show {
        position: relative;
        width: 100%;
        height: 495px;
        overflow: hidden;
        display: none;
      }
      .content_botfl_hide {
        float: left;
        height: 495px;
        width: 100%;
        overflow: hidden;
        display: block;
      }
    }
    .slideinhright {
      -webkit-animation: slide-in-blurred-right .5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
      animation: slide-in-blurred-right .5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }

    @-webkit-keyframes slide-in-blurred-right {
      0% {
        @include animation1(1000px, 2.5, 0.2, 0%, 50%, 40px, 0);
      }
      100% {
        @include animation1(0, 1, 1, 50%, 50%, 0, 1);
      }
    }
    @keyframes slide-in-blurred-right {
      0% {
        @include animation1(1000px, 2.5, 0.2, 0%, 50%, 40px, 0);
      }
      100% {
        @include animation1(0, 1, 1, 50%, 50%, 0, 1);
      }
    }
    /*动画增加div宽度*/
    /*以下css目前不用
     之前是这个地方引用，现在删掉了
     :class="[index === ind ? 'solutionwidth':'',items.classvalue1]"
     */
    .solutionwidth {
      width: 340px;
      animation: move .1s;
    }
    @keyframes move {
      0% {
        width: 160px;
      }
      100% {
        width: 340px;
      }
    }
    @-webkit-keyframes move {
      0% {
        width: 160px;
      }
      100% {
        width: 340px;
      }
    }
  }
}
</style>
