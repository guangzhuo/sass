<template>
  <div class="">
    <lvx-dialog
      titleClass="sas-dialog"
      :title="title"
      :visible.sync="visible"
      :width="width"
      :closeOnClickModal="closeOnClickModal"
      :append-to-body="appendToBody"
      @close="onClose"
      :lock-scroll="false"
      :show="show">
      <i slot="close" class="icon-close"></i>
      <slot></slot>
    </lvx-dialog>
  </div>
</template>
<script>
  export default {
    name: 'SasDialog',
    data: function () {
      return {
        visible: this.show
      };
    },
    props: {
      closeOnClickModal:{
        type: Boolean,
        default: false
      },
      title:{
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      },
      appendToBody: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClose() {
        this.$emit('update:show', false);
        this.$emit('close')
      }
    },
    watch: {
      show () {
        this.visible = this.show;
      }
    }
  };
</script>
<style lang="scss" type="text/scss" >
  @import "~styles/base.scss";
  .sas-dialog{
    background-color: #f0f5ff;
    text-align: center;
    padding: 10px 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .lvx-dialog__title{
    color: #333;
  }
  .icon-close{
    height: 18px;
    width: 18px;
    background: url("~assets/img/src/alert-close.png") no-repeat;
    display: inline-block;
    margin-top: 5px;
  }
  .lvx-dialog__body{padding: 0;}
</style>
