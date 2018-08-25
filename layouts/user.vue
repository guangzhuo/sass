<template>
  <div class="user-layout">
    <lx-header />
    <router-view name="user"/>
    <lx-footer />
  </div>
</template>

<script>
import header from '~/components/common/header-user'
import footer from '~/components/common/footer-user'
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
    'lx-header': header,
    'lx-footer': footer
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
@import '~styles/base.scss';
.user-layout{
  @include responsive-default {
    padding-bottom: 30px;
    position: relative;
    height: 100%;
  }
}
</style>
