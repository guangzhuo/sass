<template>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import LxPlugin from './lx-plugin'
import _ from 'lodash'
import * as types from '~/store/mutation-types'
import {sleep} from '~/framework/core/utils'

export default {
  data () {
    return {
      
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
  methods: {
    print: function (message) {
    },
    fetchData() {
      let self = this;
      let customeLoadingInstance = null;
      debugger
      if(typeof self.$options.loading === 'function' || typeof self.$options.loading === 'object') {
        customeLoadingInstance = self.$options.loading(self);
      } else {
        this.$lx.loading.start()
      }
      if (typeof self.$options.fetchData === 'function') {
        self.$options.fetchData.apply(self)
        .then((data)=>{
          _.assign(self, data)
          if(customeLoadingInstance) {
            customeLoadingInstance.close();
          } else {
            this.$lx.loading.finish()
          }
        })
      } else {
        if(customeLoadingInstance) {
            customeLoadingInstance.close();
          } else {
            this.$lx.loading.finish()
          }
      }
    }
  }
}
</script>

<style lang="scss">

</style>