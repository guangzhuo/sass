<script>

  export default {
    name: 'SasButton',
    render (h) {
      // debugger
      const categoryMap = {
        primary: 'sas-button--primary',
        secondary: 'sas-button--secondary',
        gray: 'sas-button--gray',
        dotted: 'sas-button--dotted'
      }
      const sizeMap = {
        default: 'lvx-button--default',
        medium: 'lvx-button--medium',
        small: 'lvx-button--small'
      }
      const data = {
        class: [categoryMap[this.category], sizeMap[this.size]],
        attrs: this.$props,
      }
      // debugger
      return (
        <lvx-button class="sas-button" {...data} on-click={this.clickHandle} >
          {this.$slots.default}
        </lvx-button>
        );
    },
    data: function () {
      return {
        
      };
    },
    methods: {
      clickHandle(){
        this.$emit('click')
      }
    },
    props: {
      category: {
        type: String,
        default: 'primary'
      },
      onClick: Function,
      icon: {
        type: String,
        default: ''
      },
      disabled: Boolean,
      autofocus: Boolean,
      size: {
        type: String,
        default: 'default'
      },
      buttonStyle: {
        type: Object,
        default: null
      }
    }
  };
</script>
<style lang="scss" type="text/scss" >
@import "~styles/base.scss";
  .sas-button{
    &.sas-button--primary{
      background-color: $theme-color;
      color: #fff;
      border-color: $theme-color;

      &.lvx-button--default{
        padding: 12px 20px;
      }
      &.lvx-button--medium{
        padding: 8px 20px;
      }
      &.lvx-button--small{
        padding: 5px 15px;
      }
      &:hover{
        border-color: $hover-color;
        color: #fff;
        background-color: $hover-color;
      }
      &:focus{
        border-color: $hover-color;
        color: #fff;
        background-color: $hover-color;
      }
      &:active{
        border-color: $hover-color;
        color: #fff;
        background-color: $hover-color;
      }
    }
    &.sas-button--secondary{
      background-color: #fff;
      color: $theme-color;
      border-color: $theme-color;

      &.lvx-button--default{
        padding: 12px 20px;
      }
      &.lvx-button--medium{
        padding: 8px 20px;
      }
      &.lvx-button--small{
        padding: 5px 15px;
      }
      &:hover{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }

      &:active{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
      &:focus{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
    }
    &.sas-button--gray{
      background-color: #fff;
      color: $font-color;
      border-color: $border-color;
      
      &.lvx-button--default{
        padding: 12px 20px;
      }
      &.lvx-button--medium{
        padding: 8px 20px;
      }
      &.lvx-button--small{
        padding: 5px 15px;
      }
      &:hover{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }

      &:active{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }

      &:focus{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
    }

    &.sas-button--dotted{
      background-color: #fff;
      color: $theme-color;
      border-color: $theme-color;
      border-style: dashed;
      
      &.lvx-button--default{
        padding: 12px 20px;
      }
      &.lvx-button--medium{
        padding: 8px 20px;
      }
      &.lvx-button--small{
        padding: 5px 15px;
      }
      &:hover{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
      &:active{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
      &:focus{
        border-color: $hover-color;
        color: $hover-color;
        background-color: #fff;
      }
    }
    &[disabled='disabled'] {
      background-color: $disabled-color;
      border-color: $disabled-color;
      color: $font-color-disabled;
      &:hover{
        background-color: $disabled-color;
        border-color: $disabled-color;
        color: $font-color-disabled;
      }
    }
  }

</style>