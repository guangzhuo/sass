<template>
  <div class="inspectionResultEmpty text-center">
    <h1>抱歉，未查询到该签名信息</h1>
    <div class="row" style="margin-top: 30px;">
      <router-link :to="{path:'inspection-sign'}">
        <sas-button type="primary" size="medium ">继续验证</sas-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import base from '~/framework/core/vue-base'
  export default {
    name: 'inspection-result-empty',
    extends: base,
    data () {
      return {

      }
    },
    components: {

    },
    computed: {
    },
    mounted () {

    },
    watch: {
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .inspectionResultEmpty{
  @include responsive-default {
    margin-top: 67px;
    background-color: #f5f5f5;
    padding: 223px 0;
  }
  }
</style>
