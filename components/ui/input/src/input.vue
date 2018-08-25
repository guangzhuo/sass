<script>
  export default {
    name: 'SasInput',
    render (h) {
      const data = {
        attrs: this.$props
      };
      return (
        <div class='input-wraper' on-click={this.clickHandle}>   
          <lvx-input  {...data} on-change={this.changeHandle} v-model={this.innerValue}>
            <template slot="prefix">{this.$slots.prefix}</template>
          </lvx-input>
        </div>
      );
    },
    data: function () {
      return {
        innerValue: this.model
      };
    },
    mounted() {

    },
    watch: {
      model: function (val, oldVal) {
        this.innerValue =  val
      },
      innerValue(val) {
        this.$emit('update:model', val)
      }
    },
    props: {
      model: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      name: String,
      form: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      autofocus: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      inputStyle: {
        type: Object,
        default: null
      },
      disabledStyle: {
        type: Object,
        default: null
      }
    },
    methods:{
      changeHandle(v) {
        this.$emit('change', v)
      },
      clickHandle() {
        this.$emit('click');
      }
    },
  };
</script>
<style lang="scss" type="text/scss" >
  @import "~styles/base.scss";
  .lvx-input__inner{height: 32px;}
</style>
