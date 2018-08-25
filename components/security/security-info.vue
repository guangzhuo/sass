<template>
  <div class="security-info">
    <div class="text-center">
      <h3><b>信息安全</b></h3>
      <p class="info-margin">四大安全保障，时刻为你的合同保驾护航</p>
    </div>
    <div class="info-banner">
      <img v-imgerror src="~/assets/img/src/security/technology.jpg" width="100%" height="100%"/>
      <div class="lx-container">
        <div class="text-offset banner-text">
            <h3>中国科学院技术支持</h3>
            <p>中科院云计算中心全面负责云合同数据生成、传输、存储等技术和安<br/>全问题，为云合同提供最强大的技术支持。</p>
        </div>
      </div>
    </div>
    <div class="info-banner">
      <img v-imgerror src="~/assets/img/src/security/save.jpg" width="100%" height="100%"/>
      <div class="lx-container">
        <div class="row banner-text">
          <h3>混合云安全存储</h3>
          <p>云合同采用了公有云+私有云双剑合璧的存储方式，将安全、高效、可靠、定<br/>
            制化完美地结合在一起，为用户提供了全方位的分布式碎片化存储服务。</p>
        </div>
      </div>
    </div>
    <div class="info-banner">
      <img v-imgerror src="~/assets/img/src/security/defend.png" width="100%" height="100%"/>
      <div class="lx-container">
        <div class="text-offset banner-text">
          <h3>阿里云云盾专业防护</h3>
          <p>云合同与阿里云云盾合作从网络层到数据层，从内部视角到外部视<br/>
            角，均部署防护和监测体系，让外部攻击失效，让内部弱点无可遁。</p>
        </div>
      </div>
    </div>
    <div class="info-banner">
      <img v-imgerror src="~/assets/img/src/security/insurance.jpg" width="100%" height="100%"/>
      <div class="lx-container">
        <div class="row banner-text">
          <h3>美亚保险理赔保障</h3>
          <p>云合同引入保险机制，与世界第二大保险公司——美国AIG集团旗下<br/>美亚保险达成战略合作，为用户信息安全再添一重保障。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  .security-info{
  @include responsive-default {
    .info-margin{margin: 20px 0 50px;}
    .info-banner{
      position: relative;
      .text-offset{right: calc(50% - 600px)}
    @media(max-width: 1600px){
      .text-offset{margin-left: 50%;}
    }
    @media(max-width: 1360px){
      .text-offset{margin-left: 60%;}
    }
      .banner-text{position: absolute; top: calc(50% - 60px);
        p{margin-top: 20px;}
      }
    }
  }
  }

</style>



