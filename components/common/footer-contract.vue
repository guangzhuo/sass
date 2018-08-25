<template>
  <footer class="footer-contract">
    <div>浙江律讯网络科技有限公司版权所有   ICP备案号:浙ICP备15007451号 - 1</div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
    }
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
.footer-contract{
    @include responsive-default {
      width: 100%;
      min-width: 1200px;
      height: 30px;
      background: #45474c;
      color: #878991;
      font-size: 13px;
      line-height: 30px;
      text-align: center;
      z-index: 1;
      bottom: 0;
      position: fixed;
      div{
        font-family: monospace;
        margin: 0;
        display: block;
        padding: 0;
        font-size: 13px;
        line-height: 1.42857143;
        color: #878991;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #45474c;
        border-radius: 0;
      }
    }
}
</style>

