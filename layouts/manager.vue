<template>
  <div class="manager-layout">
    <!-- <div class="container-body">
      <div class="left">
        <sas-aside/>
      </div>
      <div class="header">
        <sas-header />
      </div>
      <div class="main">
        <section>main</section>
      </div>
    </div> -->
    <lvx-container class="sas-container">
      <lvx-aside width="auto" class="sas-aside">
        <sas-aside/>
      </lvx-aside>
      <lvx-container class="right-container">
        <lvx-header height="52px">
          <sas-header />
        </lvx-header>
        <lvx-main  :class="mainClassName" class="container-main">
          <router-view ref="viewVue" name="manager" />
        </lvx-main>
      </lvx-container>
    </lvx-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import header from '~/components/common/header-manager';
import aside from '~/components/common/left-manager';
export default {
  data () {
    return {
      scrollTag: false,
      timer: null,
      scroll: '',
      top: 150,
      speed: 100
    }
  },
  components: {
    'SasHeader': header,
    'SasAside': aside
  },
  computed: {
    ...mapState({
      mainClassName: state => state.manageMainStatus,
    })
  },
  created () {
  },
  mounted () {
    this.scrollTop()
    // window.addEventListener('scroll', this.scrollTop)
  },
  destroyed () {
    // window.removeEventlistener('scroll', this.scrollTop)
  },
  methods: {
    goTop () {
      clearInterval(this.timer)
      this.scroll = document.body.scrollTop || document.documentElement.scrollTop
      this.timer = setInterval(() => {
        if (this.scroll < 0) {
          clearInterval(this.timer)
          return false
        }
        this.scroll -= this.speed
        window.scrollTo(0, this.scroll)
      }, 16)
    },
    scrollTop () {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop > 500) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    }
  }
}
</script>

<style lang="scss"  scoped>
  .sas-container{
    overflow: hidden;
    height: 100%;
    .right-container{
      height: 100%;
    }
  }
  .sas-aside{
    overflow: visible;
  }
  .main-normal{
    // margin-left: -140px;
    transition: margin-left .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
  }
  .main-offset-left{
    // margin-left: -236px;
    transition: margin-left .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
  }
  .container-main{
    // height: calc(100vh - 54px);
    height: 100%;
    background: #e8ecf0;
    overflow: auto;
  }
</style>
<style type="text/css">
  .manager-layout{
    height: 100%;
  }
</style>
