<template>
  <div class="contract-switch-button">
    <label  :class="['l-label', 'lbl-btn', active == 1 ? 'l-label-active':'', active == 2 ? 'r-label-active':'']" @click="toggle(1)">查看</label>
    <label  :class="['r-label', 'lbl-btn']" @click="toggle(2)">副本</label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
export default {
  data () {
    return {

    }
  },
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapState({

    })
  },
  created () {
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    toggle(v) {
      this.$emit('update:active', v);
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.contract-switch-button{
  @include responsive-default {
    position: relative;
    z-index: 0;
    width: 94px;
    background-color: #e7ebf6;
    border: 2px solid #e7ebf6;
    border-radius: 4px;
    height: 24px;
    .lbl-btn{
      width: 42px;
      color: #4081ff;
      font-weight: 500;
      margin-bottom: 0;
      cursor: pointer;
    }
    .l-label{
      &:after{
        content: "";
        background-color: #fff;
        width: 42px;
        height: 20px;
        display: inline-block;
        position: absolute;
        z-index: -1;
        transition: left .4s;
        border-radius: 4px;
      }
    }
    .l-label-active{
      &:after{
        left: 3px;
      }
    }
    .r-label-active{
      &:after{
        left: 47px;
      }
    }
  }
}

</style>

