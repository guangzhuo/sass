<template>
  <div class="layout">
    <lx-header />
    <transition name="fade" mode="out-in">
      <router-view name="default"/>
    </transition>
    <lx-footer />
  </div>
</template>

<script>
import header from '~/components/common/header'
import footer from '~/components/common/footer'
import * as types from '~/store/mutation-types'
import routerView from '~/framework/components/lvx-router-view'
export default {
  data () {
    return {
      // scrollTag: false,
      timer: null,
      scroll: '',
      top: 150,
      speed: 100,
      componentScrollBar: null,
    }
  },
  components: {
    'lx-header': header,
    'lx-footer': footer,
    'sas-router-view': routerView
  },
  created () {
  },
  mounted () {
    this.scrollTop()
    window.document.addEventListener('scroll', this.scrollTop)
  },
  destroyed () {
    // window.document.removeEventlistener('scroll', this.scrollTop)
  },
  methods: {
    goTop () {
      // clearInterval(this.timer)
      // this.scroll = document.body.scrollTop || document.documentElement.scrollTop
      // this.timer = setInterval(() => {
      //   if (this.scroll < 0) {
      //     clearInterval(this.timer)
      //     return false
      //   }
      //   this.scroll -= this.speed
      //   window.scrollTo(0, this.scroll)
      // }, 16)
    },
    scrollTop () {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
      if (scrollTop > 70) {
        if (!this.$store.state.scrollTag) {
          this.$store.commit(types.SET_SCROLLTAG, true)
        }
        // this.scrollTag = true
      } else {
        this.$store.commit(types.SET_SCROLLTAG, false)
      }
      if (scrollLeft > 0) {

      }
    }
  }
}
</script>

<style lang="scss"  scoped>
@import '~styles/base.scss';
.layout{
    @include responsive-default {
        //padding-top: $header-height;
        // min-height: 100vh;
        padding-bottom: 260px;
    }
}
</style>
