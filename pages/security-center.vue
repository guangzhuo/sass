<template>
  <div class="security-center">
    <section class="text-center">
      <img v-imgerror class="security-banner" src="~/assets/img/src/security/security-banner.jpg" width="100%" height="100%" />
      <div class="lx-container">
        <div class="security-banner-div">
          <h2>在这里，你可以放心地签署合同</h2>
          <p>4大安全保障，5大法律依据，保证合同安全有效</p>
        </div>
      </div>
    </section>
    <section class="row" :class="{navfixed:isScroll}">
      <div class="lx-container">
        <div class="btn-group col-xs-12">
          <div class="col-xs-4 btn btn-default" :class="{active:isInfo}" @click="securityTab('info')">信息安全</div>
          <div class="col-xs-4 btn btn-default" :class="{active:isLaw}" @click="securityTab('law')">法律保护</div>
          <div class="col-xs-4 btn btn-default" :class="{active:isCase}" @click="securityTab('case')">案例介绍</div>
        </div>
      </div>
    </section>
    <section class="row tab-margin" :class="{fixmargin: isScroll}">
      <tabInfo v-show="isInfo"/>
      <tabLaw v-show="isLaw"/>
      <tabCase v-show="isCase"/>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'
  import Cooperation from '~/components/security/security-info'
  import Cooperation1 from '~/components/security/security-law'
  import Cooperation2 from '~/components/security/security-case'

  export default {
    name: 'security-center',
    extends: base,
    metaInfo: {
      title: '四大权威机构五大法律依据打造顶级信息安全防护体系-安全中心-云合同',
      meta: [{
        name: 'keywords',
        content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
      },{
        name: 'description',
        content: '云合同与中科院、阿里云、阿里云云盾，美亚四大权威机构联手打造顶级信息安全防护体系，时刻为你的合同安全保驾护航。'
      }]
    },
    layout: 'default',
    data () {
      return {
        isInfo:true,
        isLaw: false,
        isCase: false,
        isScroll:false,
        scroll: '',
      }
    },
    computed: {
      ...mapState({
      })
  },
  watch: {
    "$route":"showType"
  },
  mounted () {
    this.showType();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    showType(){
      var type = this.$route.query.type;
      if(type == 1){
        this.isInfo = true;
        this.isLaw = false;
        this.isCase = false;
      }
      if(type == 2){
        this.isInfo = false;
        this.isLaw = true;
        this.isCase = false;
      }
      if(type == 3){
        this.isInfo = false;
        this.isLaw = false;
        this.isCase = true;
      }
    },
    securityTab(tabName){
      if(tabName == 'info'){
        this.isInfo = true;
        this.isLaw = false;
        this.isCase = false;
      }if(tabName == 'law'){
        this.isInfo = false;
        this.isLaw = true;
        this.isCase = false;
      }if(tabName == 'case'){
        this.isInfo = false;
        this.isLaw = false;
        this.isCase = true;
      }
    },
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop>400){
        this.isScroll = true;
      }else{
        this.isScroll = false;
      }
    }
  },
  components: {
    'tabInfo': Cooperation,
    'tabLaw': Cooperation1,
    'tabCase': Cooperation2
  }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
.security-center{
  @include responsive-default {
    .security-banner{
      margin: 67px 0 30px;
      position: relative;
  }
  .security-banner-div{
    color: #fff; position: absolute; top: 180px; left: calc(50% - 210px);
    p{color: #8e94a0; margin-top: 20px;}
  }
  @media(max-width: 1600px){
    .security-banner-div{top: 150px;}
  }
  @media(max-width: 1366px){
    .security-banner-div{top: 130px;}
  }
  .btn-margin{margin: 30px 0 100px;}
  .btn{padding: 15px 0; font-size: 16px; border-color: #e3e3e3;
  &:hover{
     background-color: #4081ff; color: #fff; border-color: #4081ff;
   }
  }
  .active{background-color: #4081ff; color: #fff; border-color: #4081ff;}
  .tab-margin{margin-top: 100px; line-height: 1.5}
  .fixmargin{margin-top: 167px;}
  .navfixed{position: fixed; top: 6px; left: 0; width: 100%; z-index: 9999; background-color: #fff;}
  }
}
</style>
