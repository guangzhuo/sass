<template>
  <div class="contract-layout">
    <sas-header />
    <transition>
      <router-view name="contract"/>
    </transition>
    <sas-footer />
  </div>
</template>

<script>
import header from '~/components/common/header-contract'
import footer from '~/components/common/footer-contract'
import routerView from '~/framework/components/lvx-router-view'
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
    'sas-header': header,
    'sas-footer': footer,
    'sas-router-view': routerView
  },
  created () {
  },
  mounted () {
    this.scrollTop()
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
@import '~styles/base.scss';
.contract-layout{
  @include responsive-default {
    padding-top: 50px;
  }
}
</style>

