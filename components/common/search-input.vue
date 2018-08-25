<template>
  <div class="sas-search-input">
    <div class="search-input sas-float-left" :style="innerWraperStyle">
       <lvx-input v-model="searchKey" :placeholder="placeholder" :input-style="inputBorderStyle" @keyup.native="onSearch"></lvx-input>
    </div>
    
    <sas-button category="primary" :icon="btnText ? '' : 'lvx-icon-search'" class="sas-float-left" size="medium" @click="onSearch" :button-style="btnBorderStyle">{{btnText}}</sas-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
export default {
  data () {
    return {
      searchKey: this.value,
      btnBorderStyle: {
        borderRadius: '0px 2px 2px 0px'
      },
      inputBorderStyle: {
        borderRadius: '2px 0px 0px 2px',
        height: '32px'
      },
      innerWraperStyle: {
        width: this.inputWidth + 'px'
      }
    }
  },
  // props: ['value'],
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {

    },
    btnText: {
      type: String,
      default: '搜索'
    },
    inputWidth: {
      type: Number,
      default: 340
    }

  },
  computed: {
    ...mapState({
       
    })
  },
  created () {
  },
  mounted () {
    let self = this;
  },
  watch: {
    searchKey(newVal, oldVal) {
      this.$emit('input', newVal);
    },
    value(newVal, oldVal) {
      this.searchKey = newVal;
    }
  },
  methods: {
    onSearch(e) {
      if(e) {
        if(e.keyCode == 13) {
          this.$emit('after-search');
        }
      } else {
        this.$emit('after-search');
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.sas-search-input{
  @include responsive-default {
    .search-input{
    }
  }
}

</style>

