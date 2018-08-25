<script>

  export default {
    name: 'SasRadioGroup',
    render (h) {
      // debugger
      return (
          <lvx-select { ...{ attrs: this.$props } } size="small" on-change={this.$listeners.change}  v-model={this.value}>
            {this.$slots.default}
          </lvx-select>  
        );
    },
    data: function () {
      return {
        value: this.model
      };
    },
    watch: {
      model: function (val, oldVal) {
        this.value =  val
      },
    },
    props: {
      
    }
  };
</script>
<style lang="scss" type="text/scss" >
@import "~styles/base.scss";
  .sas-select{
   
  }
</style>