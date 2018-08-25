<!--suppress ALL -->
<template>
  <div class="container">
    <div style="text-align: center; padding-top: 100px;">
      <h4>
        支付失败，请重新支付!页面将在<span id="wait">{{ num }}</span> 秒后关闭
      </h4>
    </div>
  </div>
</template>

<script>
    let thatTime = null
    import utils from '~/mixins/utils'
    export default {
        name: "pay_fail",
        data() {
          return {
            num:3
          }
        },
      layout: 'contract',
      metaInfo: {
        title: '支付失败'
      },
      mixins: [utils],
      created() {
          this.Times()
      },

      destroyed() {
        clearTimeout(thatTime)
        this.num = 3
      },
      methods: {
        Times: function () {
          thatTime = setTimeout(() => {
            this.num--
            if (this.num <= 0) {
              this.__closeCurWindow()
              return false
            }
            this.Times()
          }, 1000)
        }
      }
    }
</script>

<style scoped>

</style>
