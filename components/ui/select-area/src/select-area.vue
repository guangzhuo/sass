<template>
  <div class="sas-select-area">
    <sas-input :model="value" placeholder="请选择省市区" @click="showProvince = !showProvince" suffix-icon="lvx-icon-arrow-down" :readonly="!editable">
      <template slot="prefix">
        <slot name="prefix"></slot>
      </template>
      
    </sas-input>
    <select-area :show.sync="showProvince" @change="onSelectChange" :text="address"></select-area>                      
  </div>
</template>

<script>
import area from './area';
import _ from 'lodash';

export default {
  name: 'SasSelectArea',
  data () {
    return {
      showProvince: false,
      address: this.value
    }
  },
  computed: {
   
  },
  props: {
    value: String,
    show: Boolean,
    editable: {
      type: Boolean,
      default: false
    }
  },
  created() {

  },
  mounted () {
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  },
  methods: {
    onSelectChange(v) {
      // this.address = v;
      this.$emit('input', v);
    }
  },
  components: {
    'select-area': area
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.sas-select-area{
  
}
</style>
