<template>
  <div class="security-law">
    <div class="text-center">
      <h3><b>法律保护</b></h3>
      <p class="info-margin">在云合同上签署的电子合同，符合法律法规对电子合同有效性和合法性的规定，受法律保护</p>
    </div>
    <div class="law-banner">
      <div class="lx-container">
        <div class="row col-xs-70 col-xs-offset-15">
          <div class="col-xs-20 text-center" :class="{active: isBanner1}">
            <i class="iconsprite icon-law1" @mouseenter="tabChange1" ></i>
            <p>法律地位</p>
          </div>
          <div class="col-xs-20 text-center" :class="{active: isBanner2}">
            <i class="iconsprite icon-law2" @mouseenter="tabChange2"></i>
            <p>法律效力</p>
          </div>
          <div class="col-xs-20 text-center" :class="{active: isBanner3}">
            <i class="iconsprite icon-law3" @mouseenter="tabChange3"></i>
            <p>法定条件</p>
          </div>
          <div class="col-xs-20 text-center" :class="{active: isBanner4}">
            <i class="iconsprite icon-law4" @mouseenter="tabChange4"></i>
            <p>成立条件</p>
          </div>
          <div class="col-xs-20 text-center" :class="{active: isBanner5}">
            <i class="iconsprite icon-law5" @mouseenter="tabChange5"></i>
            <p>诉讼依据</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-70 col-xs-offset-15">
            <div class="law-text-bg">
              <div class="row" v-show="isBanner1">
                <h4 class="text-center"><b>电子合同的法律地位</b></h4>
                <div class="row col-xs-10 col-xs-offset-1">
                  <div class="row law-text"><p>电子合同又称电子商务合同，根据联合国国际贸易法委员会《电子商务示范法》以及世界各国颁布的电子交易法，同时结合我国《合同法》的有关规定，电子合同可以界定为：电子合同是双方或多方当事人之间通过电子信息网络以电子的形式达成的设立、变更、终止财产性民事权利义务关系的协议。</p></div>
                  <div class="row law-text"><p>关于电子合同这种合同形式的法律效力，我国立法上已经予以确认：我国《合同法》第十一条规定“书面形式是指合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等可以有形地表现所载内容的形式。”由此可见，法律已经明确了电子合同的有效性。</p></div>
                </div>
              </div>
              <div class="row" v-show="isBanner2">
                <h4 class="text-center"><b>电子合同的法律效力</b></h4>
                <div class="row col-xs-10 col-xs-offset-1">
                  <div class="row text-center banner2-text">
                    <div class="col-xs-70 col-xs-offset-15">
                      <p>《电子签名法》第二条对电子签名的定义：数据电文中以电子形式所含、所附用于识别签名人身份并表明签名人认可其中内容的数据。</p>
                    </div>
                  </div>
                  <div class="row">
                    <p>《电子签名法》第三条规定</p>
                    <p>当事人约定使用电子签名、数据电文的文书，不得仅因为其采用电子签名、数据电文的形式而否定其法律效力。可见电子签名本身已被法律所认可。</p>
                    <p>《电子签名法》第十四条规定</p>
                    <p>可靠的电子签名与手写签名或者盖章具有同等的法律效力。只有使用“可靠的电子签名”，电子合同才有可能具有与纸质合同同等的法律效力，即书证效力。</p>
                  </div>
                </div>
              </div>
              <div class="row" v-show="isBanner3">
                <h4 class="text-center"><b>可靠电子签名的法定条件</b></h4>
                <div class="row col-xs-10 col-xs-offset-1">
                  <div class="row text-center banner2-text">
                    <p>《电子签名法》第十三条电子签名同时符合下列条件的，视为可靠的电子签名；</p>
                  </div>
                  <div class="row">
                    <div class="col-xs-offset-3">
                      <p>1.电子签名制作数据用于电子签名时，属于电子签名人专有；</p>
                      <p>2.签署时电子签名制作数据仅有电子签名人控制；</p>
                      <p>3.签署后对电子签名的任何改动能够被发现；</p>
                      <p>4.签署后对数据电文内容和形式的任何改动能够被发现。</p>
                    </div>
                  </div>
                  <div class="row text-center">
                    <p class="banner3-text">* 当事人通过云合同生成的手写签名完全符合可靠电子签名的法定条件，属于可靠的电子签名。</p>
                  </div>
                </div>
              </div>
              <div class="row" v-show="isBanner4">
                <h4 class="text-center"><b>有效电子合同的成立条件</b></h4>
                <div class="row">
                  <div class="col-xs-offset-20">
                    <p class="banner3-color">条件一：满足《民法通则》第55条关于合同有效要件的规定：</p>
                    <p>行为人具有相应的民事行为能力；意思表示真实；不违反法律或者社会公共利益。</p>
                    <p class="banner3-color">条件二：满足《中华人民共和国电子签名法》关于有效电子签名的规定：</p>
                    <p>该法第十四条规定：“可靠的电子签名与手写签名或者盖章具有同等的法律效力。”</p>
                  </div>
                </div>
                <div class="row text-center">
                  <p class="banner3-text">在第三方签约平台签署的合同，只要满足以上两个条件，即可视为有效的电子合同。</p>
                </div>
              </div>
              <div class="row" v-show="isBanner5">
                <h4 class="text-center"><b>诉讼依据</b></h4>
                <div class="row col-xs-10 col-xs-offset-1">
                  <div class="col-xs-4">
                    <div class="row banner2-text"><p>1、2012年《民事诉讼法》修改后，第六十三条规定，民事证据包括：</p></div>
                    <p>（一）当事人的陈述；</p>
                    <p>（二）书证；</p>
                    <p>（三）物证；</p>
                    <p>（四）视听资料；</p>
                    <p>（五）电子数据；</p>
                    <p>（六）证人证言；</p>
                    <p>（七）鉴定意见；</p>
                    <p>（八）勘验笔录。</p>
                    <p class="banner3-text">可见电子数据已经成为独立的证据类型。</p>
                  </div>
                  <div class="col-xs-7 col-xs-offset-1">
                    <div class="row banner2-text"><p>2、最高人民法院2015年2月4日公布</p></div>
                    <p>《最高人民法院关于适用〈中华人民共和国民事诉讼法〉的解释》网上聊天记录、博客、微博客、手机短信、
                      电子签名、域名等形成或者存储在电子介质中的信息可以作为民事诉讼中的证据。</p>
                    <div class="row banner2-text"><p>3、《电子签名法》第六条：符合下列条件的数据电文，视为满足法律、法规规定的文件保存要求，可以作为电子证据使用</p></div>
                    <p>（一）能够有效地表现所载内容并可供随时调取查用；</p>
                    <p>（二）数据电文的格式与其生成、发送或者接收时的格式相同，或者格式不相同但是能够准确表现原来生成、发送或者接收的内容；</p>
                    <p>（三）能够识别数据电文的发件人、收件人以及发送、接收的时间。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        isBanner1: true,
        isBanner2: false,
        isBanner3: false,
        isBanner4: false,
        isBanner5: false,
      }
    },
    components: {

    },
    mounted () {
    },
    watch: {
    },
    methods: {
      tabChange1(){
        this.isBanner1 = true;
        this.isBanner2 = false;
        this.isBanner3 = false;
        this.isBanner4 = false;
        this.isBanner5 = false;
      },
      tabChange2(){
        this.isBanner1 = false;
        this.isBanner2 = true;
        this.isBanner3 = false;
        this.isBanner4 = false;
        this.isBanner5 = false;
      },
      tabChange3(){
        this.isBanner1 = false;
        this.isBanner2 = false;
        this.isBanner3 = true;
        this.isBanner4 = false;
        this.isBanner5 = false;
      },
      tabChange4(){
        this.isBanner1 = false;
        this.isBanner2 = false;
        this.isBanner3 = false;
        this.isBanner4 = true;
        this.isBanner5 = false;
      },
      tabChange5(){
        this.isBanner1 = false;
        this.isBanner2 = false;
        this.isBanner3 = false;
        this.isBanner4 = false;
        this.isBanner5 = true;
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  @mixin span-color{color: #4081ff}
  @mixin text-color{color: #83aaf7}
  .security-law{
    @include responsive-default{
      .law-banner{background-color: #f5f5f5; padding: 80px 0 50px; margin-top: 50px;}
      .col-xs-70,.col-xs-20{float: left; min-height: 1px;}
      .col-xs-offset-15 {margin-left: 15%;}
      .col-xs-offset-20 {margin-left: 20%;}
      .col-xs-70{width: 70%}
      .col-xs-20{width: 20%}
      .icon-law1{
        background-image: url('~assets/img/src/security/security-icon.png');
        background-position: -98px -5px;
        width: 92px;
        height: 92px;
      }
      .active{
      .iconsprite{
      &~p{@include span-color}
      }
    .icon-law1{background-position: -5px -5px;}
    .icon-law2{background-position: -5px -100px;}
    .icon-law3{background-position: -5px -196px;}
    .icon-law4{background-position: -5px -291px;}
    .icon-law5{background-position: -5px -386px;}

    }
    .icon-law2{
      background-image: url('~assets/img/src/security/security-icon.png');
      background-position: -98px -100px;
      width: 92px;
      height: 92px;
    }
    .icon-law3{
      background-image: url('~assets/img/src/security/security-icon.png');
      background-position: -98px -196px;
      width: 92px;
      height: 92px;
    }
    .icon-law4{
      background-image: url('~assets/img/src/security/security-icon.png');
      background-position: -98px -291px;
      width: 92px;
      height: 92px;
    }
    .icon-law5{
      background-image: url('~assets/img/src/security/security-icon.png');
      background-position: -98px -386px;
      width: 92px;
      height: 92px;
    }
    .law-text-bg{background-color: #fff; margin-top: 50px; padding: 50px 0 30px;}
    .law-text{margin-top: 20px; text-indent: 2em}
    .banner2-text{margin: 20px 0;
    p{@include text-color}
    }
    .banner3-text{color: #f00; margin-top: 20px;}
    .banner3-color{@include text-color}
    .col-xs-offset-20{
    p{margin: 20px 0 10px;}
    }
    }
  }

</style>



