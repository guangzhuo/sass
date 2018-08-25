<script>

  export default {
    name: 'SasSelect',
    render (h) {
      // debugger
      const data = {
        attrs: this.$props
      }
      return (
        // <div class="sas-select">
          
        // </div>
        <lvx-select { ...data } size="small" on-change={this.changeHandle}  v-model={this.value} >
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
      model: {
        required: true
      },
      name: String,
      id: String,
      // size: String,
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: String,
      remote: Boolean,
      loadingText: String,
      noMatchText: String,
      noDataText: String,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: Boolean,
      multipleLimit: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default() {
          return t('el.select.placeholder');
        }
      },
      defaultFirstOption: Boolean,
      reserveKeyword: Boolean,
      valueKey: {
        type: String,
        default: 'value'
      },
      collapseTags: Boolean
    },
    methods: {
      changeHandle(v) {
        this.$emit('update:model', v);
        this.$emit('change', v)
      }
    }
  };
</script>
<style lang="scss" type="text/scss" >
@import "~styles/base.scss";
  // .sas-select{
    
  // }
  // display: inline;
  .lvx-input--small {
    .lvx-input__inner{
      height: 34px;
    }
  }
</style>