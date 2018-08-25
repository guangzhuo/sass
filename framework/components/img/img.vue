<template>
  <img v-imgerror  class="img-size" :style="imgSize"  :alt="alt" :src="require(this.src)">
  <!-- <img v-imgerror v-else class="img-size" :style="imgSize" src="~/assets/img/src/common/default_load.png" alt=""> -->
</template>

<script>

export default {
  name: 'lx-img',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      'imgSize': {
        'width': this.width,
        'height': this.height
      }
    }
  },
  mounted: function () {
    console.log(this.src)
  },
  methods: {
    getImgUrl (url) {
      // require(`url-loader?limit=10000!${this.src}`)
      require(url)
    }
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .img-size{

  }
</style>
