<template>
  <div class="cooperative-d">
    <div class="about-bg-h">
      <div class="lx-container">
        <div class="row public-margin-h">首页 > 合作客户</div>
        <div class="row security-bg-h">
          <div class="row about-margin-bottom-h"><h3>合作客户</h3></div>
          <div class="row about-icon-h">
            <div class="col-xs-3" v-for="coopnum1 in 32">
              <a href="http://www.youxia.com" target="_blank" v-if="coopnum1 === 19"><span class="coopclient-d" :class="'client-icon'+coopnum1+'-h'"></span></a>
              <span class="coopclient-d" :class="'client-icon'+coopnum1+'-h'" v-else></span>
            </div>
          </div>
          <div class="row security-padding-h">
            <div class="row about-margin-bottom-h">
              <h3>战略合作伙伴</h3>
            </div>
            <div class="row about-icon-h">
              <div class="col-xs-3" v-for="cooplist in 11">
                <a ><span class="coopclient-d" :class="'client1-icon'+cooplist+'-h'"></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import base from '~/framework/core/vue-base'
  export default {
    name: 'cooperative-client',
    extends: base,
    layout: 'default',
    data () {
      return {

      }
    },
    components: {

    },
    computed: {
    },
    mounted () {
      setTimeout(()=> {
        document.dispatchEvent(new Event('render-event'));
      }, 0);
    },
    watch: {
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .cooperative-d{
    background-color: #f5f6fa;margin-top: 67px;
    @include responsive-default {
      .about-bg-h{ padding-top: 1px; padding-bottom: 30px;}
      .public-margin-h {
        margin: 20px 0;
      }
      .security-bg-h {
        background-color: #fff;
        padding: 20px 30px 100px;
        text-align: center;
      }
      .about-margin-bottom-h {
        margin-bottom: 20px;
      }
      .about-icon-h .col-xs-3 {
        margin-bottom: 20px;
      }
      .coopclient-d {
        background: rgba(0, 0, 0, 0) url("~assets/img/src/partner1.png") no-repeat scroll;
        width: 240px;
        height: 75px;
        display: inline-block;
      }
      .security-padding-h {
        padding: 80px 0 50px;
      }
      .client-icon1-h {
        background-position: 0 0;
      }
      .client-icon2-h {
        background-position: 0 -75px;
      }
      .client-icon3-h {
        background-position: 0 -150px;
      }
      .client-icon4-h {
        background-position: 0 -225px;
      }
      .client-icon5-h {
        background-position: 0 -300px;
      }
      .client-icon6-h {
        background-position: 0 -375px;
      }
      .client-icon7-h {
        background-position: 0 -450px;
      }
      .client-icon8-h {
        background-position: 0 -525px;
      }
      .client-icon9-h {
        background-position: 0 -600px;
      }
      .client-icon10-h {
        background-position: 0 -675px;
      }
      .client-icon11-h {
        background-position: 0 -750px;
      }
      .client-icon12-h {
        background-position: 0 -825px;
      }
      .client-icon13-h {
        background-position: 0 -900px;
      }
      .client-icon14-h {
        background-position: 0 -975px;
      }
      .client-icon15-h {
        background-position: 0 -1050px;
      }
      .client-icon16-h {
        background-position: 0 -1125px;
      }
      .client-icon17-h {
        background-position: -238px 0;
      }
      .client-icon18-h {
        background-position: -238px -75px;
      }
      .client-icon19-h {
        background-position: -238px -150px;
      }
      .client-icon20-h {
        background-position: -238px -225px;
      }
      .client-icon21-h {
        background-position: -238px -300px;
      }
      .client-icon22-h {
        background-position: -238px -375px;
      }
      .client-icon23-h {
        background-position: -238px -450px;
      }
      .client-icon24-h {
        background-position: -238px -525px;
      }
      .client-icon25-h {
        background-position: -238px -600px;
      }
      .client-icon26-h {
        background-position: -238px -675px;
      }
      .client-icon27-h {
        background-position: -238px -750px;
      }
      .client-icon28-h {
        background-position: -238px -825px;
      }
      .client-icon29-h {
        background-position: -238px -900px;
      }
      .client-icon30-h {
        background-position: -238px -975px;
      }
      .client-icon31-h {
        background-position: -238px -1050px;
      }
      .client-icon32-h {
        background-position: -238px -1125px;
      }
      .client1-icon1-h {
        background-position: 0 -1200px;
      }
      .client1-icon2-h {
        background-position: 0 -1275px;
      }
      .client1-icon3-h {
        background-position: 0 -1425px;
      }
      .client1-icon4-h {
        background-position: 0 -1500px;
      }
      .client1-icon5-h {
        background-position: 0 -1575px;
      }
      .client1-icon6-h {
        background-position: -238px -1575px;
      }
      .client1-icon7-h {
        background-position: -238px -1200px;
      }
      .client1-icon8-h {
        background-position: -238px -1275px;
      }
      .client1-icon9-h {
        background-position: -238px -1350px;
      }
      .client1-icon10-h {
        background-position: -238px -1425px;
      }
      .client1-icon11-h {
        background-position: -238px -1500px;
      }
    }
  }
</style>
