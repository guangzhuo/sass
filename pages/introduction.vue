<template>
  <div class="product-introduction">
    <section class="row">
      <img v-imgerror class="product-tab1-bg" src="~/assets/img/src/product/product-banner.png" width="100%" height="100%" />
      <div class="lx-container">
        <div class="product-animation-new-hu" :class="{slideinblurredright: isFalse}">
          <div class="row product-font-new-hu">科技创新的产物——电子合同。</div>
          <p class="product-font-size-new-hu">告别纸质合同，拥抱电子合同</p>
        </div>
      </div>
    </section>
    <section class="row product-tab2-bg">
      <div class="lx-container">
        <div class="row text-center product-quick-new-hu">
          快捷服务
          <hr class="product-hr-new-hu"/>
        </div>
        <div class="row text-center">
          <div class="col-xs-6">
            <div class="product-padding-new-hu">
              <img v-imgerror src="~/assets/img/src/product/product-notarization.png" width="333px" height="109px" />
            </div>
            <div class="row col-xs-6 col-xs-offset-3">
              <div class="row service-pad">
                <p class="product-p-new-hu">公证服务</p>
                <!-- <a href="/proof/index.html" class="product-a-new-hu" target="_blank">申请出证</a> -->
              </div>
              <div class="row service-pad text-left">
                <p class="product-p1-new-hu">对已签合同进行存证处存证，在法律纠纷</p>
                <p class="product-p1-new-hu">时，公证处出具具有法律效力的公证文书</p>
              </div>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="product-padding-new-hu">
              <img v-imgerror src="~/assets/img/src/product/product-template.png" width="333px" height="104px" />
            </div>
            <div class="row col-xs-6 col-xs-offset-3">
              <div class="row service-pad">
                <p class="product-p-new-hu">合同模板</p>
                <router-link to="/template" class="product-a-new-hu">使用模板</router-link>
              </div>
              <div class="row service-pad  text-left">
                <p class="product-p1-new-hu">不断完善的合同模板库，零成本的生成你</p>
                <p class="product-p1-new-hu">的专属合同，有效规避潜在法律风险</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="row product-tab3-bg">
      <div class="lx-container">
        <div class="row text-center product-quick-new-hu">
          基础服务
          <hr class="product-hr-new-hu"/>
        </div>
        <div class="row product-animation" :class="{slideinblurredbottom: isSlbottom}">
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="product-float-new-hu" >
              <i class="iconsprite icon-basics-1"></i>
            </div>
            <div class="product-div-new-hu">
              <p class="product-p2-new-hu">实名认证</p>
              <p class="product-p3-new-hu">对接公安部身份实名系统，并配合人脸识</p>
              <p class="product-p3-new-hu">别技术；对用户真实身份进行验证</p>
            </div>
          </div>
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="col-xs-offset-2">
              <div class="product-float-new-hu" >
                <i class="iconsprite icon-basics-2"></i>
              </div>
              <div class="product-div-new-hu">
                <p class="product-p2-new-hu">电子签名</p>
                <p class="product-p3-new-hu">用户手动设置签名+中国金融认证中心颁</p>
                <p class="product-p3-new-hu">发的数字证书=具有法律效力的电子签名</p>
              </div>
            </div>
          </div>
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="col-xs-offset-3">
              <div class="product-float-new-hu" >
                <i class="iconsprite icon-basics-3"></i>
              </div>
              <div class="product-div-new-hu">
                <p class="product-p2-new-hu">数据加密</p>
                <p class="product-p3-new-hu">云合同提供和支付宝相同的金融级别的</p>
                <p class="product-p3-new-hu">数据加密服务，保障合同数据的安全性</p>
              </div>
            </div>
          </div>
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="product-float-new-hu" >
              <i class="iconsprite icon-basics-4"></i>
            </div>
            <div class="product-div-new-hu">
              <p class="product-p2-new-hu">合同验真</p>
              <p class="product-p3-new-hu">提供检测合同是否被篡改，文档签名是否</p>
              <p class="product-p3-new-hu">真实有效的服务</p>
            </div>
          </div>
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="col-xs-offset-2">
              <div class="product-float-new-hu" >
                <i class="iconsprite icon-basics-5"></i>
              </div>
              <div class="product-div-new-hu">
                <p class="product-p2-new-hu">法律服务</p>
                <p class="product-p3-new-hu">董事会旗下的律所整合线下1500名资深</p>
                <p class="product-p3-new-hu">律师，为用户提供标准化的合同文件类、</p>
                <p class="product-p3-new-hu">法律咨询类服务</p>
              </div>
            </div>
          </div>
          <div class="col-xs-4 product-padding1-new-hu">
            <div class="col-xs-offset-3">
              <div class="product-float-new-hu" >
                <i class="iconsprite icon-basics-6"></i>
              </div>
              <div class="product-div-new-hu">
                <p class="product-p2-new-hu">保险服务</p>
                <p class="product-p3-new-hu">云合同引入保险机制,与世界第二大保险</p>
                <p class="product-p3-new-hu">公司——美亚保险达成战略合作，为用户</p>
                <p class="product-p3-new-hu">信息安全再添一重障</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="row product-tab4-bg">
      <div class="lx-container">
        <div class="row text-center product-quick-new-hu">
          产品价格
          <hr class="product-hr-new-hu"/>
        </div>
        <div class="row text-center">
          <div class="btnClass" :class="{btnActive: isActive}" @mouseover="companyPrice">企业用户</div>
          <div class="btnClass" :class="{btnActive: !isActive}" @mouseover="personPrice">个人用户</div>
        </div>
        <div class="row product-padding1-new-hu text-center" v-if="isActive">
          <div class="col-xs-2 " v-for="list in companyMsg">
            <div class="service-border-hu">
              <div class="box-head-h">{{list.name}}</div>
              <div class="row service-box-pad-hu service-height-hu">
                <div class="row manage-info-mar-h">
                  <div class="row display-inline">
                    <b class="text-l">￥</b><div class="text-r">{{list.price}}.0</div>
                  </div>
                </div>
                <div class="row">签署服务： <b>{{list.count}}</b>次</div>
                <div class="row service-mar-hu">有效期：永久有效</div>
                <div class="row">
                  <button v-if="list.price == 0" @click="useBtn()" class="service-btn-hu buy-btn-hu">立即体验</button>
                  <button v-else @click="buyBtn(list.name,list.price,list.code)" class="service-btn-hu buy-btn-hu">立即购买</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row product-padding1-new-hu text-center" v-else>
          <div class="col-xs-2 " v-for="list in personMsg">
            <div class="service-border-hu">
              <div class="box-head-h">{{list.name}}</div>
              <div class="row service-box-pad-hu service-height-hu">
                <div class="row manage-info-mar-h">
                  <div class="row display-inline">
                    <b class="text-l">￥</b><div class="text-r">{{list.price}}.0</div>
                  </div>
                </div>
                <div class="row">签署服务： <b>{{list.count}}</b>次</div>
                <div class="row service-mar-hu">有效期：永久有效</div>
                <div class="row">
                  <button v-if="list.price == 0" @click="useBtn()" class="service-btn-hu buy-btn-hu">立即体验</button>
                  <router-link v-else :to="{path:'/manage/user/order/manager',query:{prodName:list.name,prodPrice:list.price,prodCode:list.code}}">
                    <button class="service-btn-hu buy-btn-hu">立即购买</button>
                  </router-link>
                  <!--<button v-else @click="buyBtn(list.name,list.price,list.code)" class="service-btn-hu buy-btn-hu">立即购买</button>-->
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import base from '~/framework/core/vue-base'

export default {
  name: 'product-introduction',
  extends: base,
  metaInfo: {
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
      isSlbottom:false,
      isFalse: false,
      isActive: true,
      companyMsg:[
        {code: "", name: "免费套餐", price: 0, count: 2},
        {code: "COMPANY_SINGLE_SIGN", name: "单份合同签署", price: 6, count: 1},
        {code: "COMPANY_A_PACK", name: "企业A套餐", price: 488, count: 100},
        {code: "COMPANY_B_PACK", name: "企业B套餐", price: 998, count: 300},
        {code: "COMPANY_C_PACK", name: "企业C套餐", price: 1998, count: 800},
        {code: "COMPANY_D_PACK", name: "企业D套餐", price: 3998, count: 2000}
      ],
      personMsg:[
        {code: "", name: "免费套餐", price: 0, count: 2},
        {code: "USER_SINGLE_SIGN", name: "单份合同签署", price: 3, count: 1},
        {code: "USER_A_PACK", name: "个人A套餐", price: 50, count: 20},
        {code: "USER_B_PACK", name: "个人B套餐", price: 98, count: 50},
        {code: "USER_C_PACK", name: "个人C套餐", price: 298, count: 200},
        {code: "USER_D_PACK", name: "个人D套餐", price: 998, count: 800}
      ]
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    this.isFalse = true;
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 400){
        this.isSlbottom=true;
      }
    },
    useBtn(){
      this.$router.push({path: '/manage'});
    },
    buyBtn(name,price,code){
      this.$router.push({path:'/manage/user/order/manager',query:{prodName:name,prodPrice:price,prodCode:code}});
    },
    companyPrice(){
      this.isActive = true;
    },
    personPrice(){
      this.isActive = false;
    },
  },
  components: {
  }
}
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  /*动画1*/
  @mixin animation1($a,$b,$c,$d,$e,$f,$g) {
    -webkit-transform: translateX($a) scaleX($b) scaleY($c);
    transform: translateX($a) scaleX($b) scaleY($c);
    -webkit-transform-origin: $d $e;
    transform-origin: $d $e;
    -webkit-filter: blur($f);
    filter: blur($f);
    opacity: $g;
  }
  /*动画2*/
  @mixin animation2($a,$b,$c,$d,$e,$f,$g){
    -webkit-transform: translateY($a) scaleY($b) scaleX($c);
    transform: translateY($a) scaleY($b) scaleX($c);
    -webkit-transform-origin: $d $e;
    transform-origin: $d $e;
    -webkit-filter: blur($f);
    filter: blur($f);
    opacity: $g;
  }
  .product-introduction{
    @include responsive-default {
    $white:#fff;
    $lx-blue:#4081ff;
    $hover-color:#6297ff;
    .col-xs-2{float: left; min-height: 1px; width: 16.66666%; padding: 0 10px;
      /*&:first-child{margin-left: 0}*/
    }

    .product-tab1-bg{
      position: relative;
      margin-top: 67px;
    }
  /*动画1*/
  .slideinblurredright {
    -webkit-animation: slide-in-blurred-right 2s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    animation: slide-in-blurred-right 2s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
  }
  @keyframes slide-in-blurred-right {
    0% {
    @include animation1(1000px, 1, 1, 0%, 50%, 5px, .3);
    }
    100% {
    @include animation1(0, 1, 1, 50%, 50%, 0, 1);
    }
  }
  @-webkit-keyframes slide-in-blurred-right {
    0% {
    @include animation1(1000px, 1, 1, 0%, 50%, 5px, .3);
    }
    100% {
    @include animation1(0, 1, 1, 50%, 50%, 0, 1);
    }
  }
    .product-animation-new-hu{
    @include animation1(1000px, 2.5, 0.2, 0%, 50%, 40px, 0);
      position: absolute;
    top: 25%;
    .product-font-new-hu{
      color: $white;
      font-size: 32px;
      margin-bottom: 28px;
    }
    .product-font-size-new-hu{
      color: $white;
      font-size: 16px;
    }
    }

    .product-tab2-bg{
      background-color: #f5f5f5;
      height: 560px;
      padding-top: 90px;
    .product-padding-new-hu{
      padding: 80px 0 55px;
    }
    .service-pad{padding-left: 32px;}
    .product-p-new-hu{
      float: left;
      font-size: 16px;
      color: #333;
      font-weight: 600;
      margin: 2px 0 10px 0;
    }
    .product-a-new-hu{
      float: right;
      color: $lx-blue;
      border: 1px solid $lx-blue;
      border-radius: 4px;
      padding: 2px 10px;
      margin-right: 15px;
    text-decoration:  none;
    &:hover{
       color: $hover-color;
       border: 1px solid $hover-color;
       text-decoration: none;
     }
    }
    .product-p1-new-hu{
      margin-top: 5px;
      font-size: 12px;
      color: #959595;
      letter-spacing: 1px;
    }
    }
    .product-quick-new-hu{
      font-size: 24px;
      color: #333;
    }
    .product-hr-new-hu{
      margin-top: 10px;
      width: 46px;
      border-top: 4px solid $lx-blue;
    }
    .product-padding1-new-hu{
      padding-top: 60px;
      margin-bottom: 30px;
    }
    .product-tab3-bg{
      height: 575px;
      padding-top: 90px;
    .product-float-new-hu{
      float: left;
      text-align: center;
      width: 16%;
    }
    .product-div-new-hu {
      float: left;
      width: 84%;
      padding-left: 15px;
    .product-p2-new-hu {
      font-size: 16px;
      color: #333;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .product-p3-new-hu {
      font-size: 12px;
      color: #959595;
      letter-spacing: 1px;
      margin-top: 5px;
    }
    }
    }
    .product-tab4-bg{
      background: url('~assets/img/src/product/product-price-bg.jpg')repeat;
      height: 700px;
      width: 100%;
      position: relative;
      background-size: cover;
      padding-top: 90px;
    }
    .service-border-hu{border: 1px solid #e1e1e1; padding: 1px;
    .box-head-h{
      background-color: #ebebeb;
      height: 50px;
      line-height: 50px;
      font-weight: 600;
    }

    .service-box-pad-hu{padding: 1vh 0 3vh;}
    .manage-info-mar-h{margin-bottom: 10px; text-align: center;
    .display-inline{display: inline-block;
    .text-l{float: left; margin-top: 10px;}
    .text-r{float: left; font-size: 36px;}
    }
    }
    .service-mar-hu{margin: 1vh 0 3.5vh;}
    .service-btn-hu{
      border-radius: 4px; width: 120px; height: 36px; line-height: 34px; padding: 0;
    &:hover{color: $white; background-color: $hover-color; border-color: $hover-color;}
    }
    .buy-btn-hu{border: 1px solid $lx-blue; background-color: $lx-blue; color: $white;}
    }
    @keyframes slide-in-blurred-bottom {
      0% {
      @include animation2( 1000px, 2.5, 0.2, 50%, 100%, 40px, 0 );
      }
      100% {
      @include animation2( 0, 1, 1, 50%, 50%, 0, 1 );
      }
    }

    @-webkit-keyframes slide-in-blurred-bottom {
      0% {
      @include animation2( 1000px, 2.5, 0.2, 50%, 100%, 40px, 0 );
      }
      100% {
      @include animation2( 0, 1, 1, 50%, 50%, 0, 1 );
      }
    }
    .slideinblurredbottom {
      -webkit-animation: slide-in-blurred-bottom 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
      animation: slide-in-blurred-bottom 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }
    .product-animation{
    @include animation2( 1000px, 2.5, 0.2, 50%, 100%, 40px, 0 );
    }
    /*产品介绍icon*/
    .icon-basics-1{
      background-image: url('~assets/img/sprite/product-basics-1.png');
      background-position: 0 0;
      width: 54px;
      height: 37px;
    }
    .icon-basics-2{
      background-image: url('~assets/img/sprite/product-basics-2.png');
      background-position: 0 0;
      width: 46px;
      height: 38px;
    }
    .icon-basics-3{
      background-image: url('~assets/img/sprite/product-basics-3.png');
      background-position: 0 0;
      width: 41px;
      height: 46px;
    }
    .icon-basics-4{
      background-image: url('~assets/img/sprite/product-basics-4.png');
      background-position: 0 0;
      width: 47px;
      height: 46px;
    }
    .icon-basics-5{
      background-image: url('~assets/img/sprite/product-basics-5.png');
      background-position: 0 0;
      width: 40px;
      height: 45px;
    }
    .icon-basics-6{
      background-image: url('~assets/img/sprite/product-basics-6.png');
      background-position: 0 0;
      width: 42px;
      height: 44px;
    }
    .btnClass{
      border: 1px solid #4081ff;
      background-color: #fff;
      color:#4081ff;
      display: inline-block;
      padding: 8px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 20px;
    }
    .btnActive{
      background-color: #4081ff;
      color:#fff;
    }
    }
  }

</style>
