<template>
  <div class="sas-breadcrumb">
    <lvx-breadcrumb  :separator="separator" >
      <slot></slot>
    </lvx-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'SasBreadcrumb',
    data: function () {
      return {
        separator: '/'
      };
    },
    props: {
    }
  };
</script>
<style lang="scss" type="text/scss" >
@import "~styles/base.scss";
  .sas-breadcrumb{
    .lvx-breadcrumb__item{
      .lvx-breadcrumb__inner{
        color: $font-color-disabled;
        font-weight: normal;
      }
      &:last-child{
        .lvx-breadcrumb__inner{
          color: $font-color;
        }
      }
    }
  }
</style>