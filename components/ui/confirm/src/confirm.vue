<template>
<div class="confirm-bg" v-show="isShow">
  <div class="confirmWrap">
    <i class="lvx-icon-close" @click="hideConfirm"></i>
    <div class="confirmTitle">
      <i :class="['posit','lvx-icon-' + type]"></i>
      <span class="title">{{title}}</span>
    </div>
    <div class="confirmMain">
      {{smallTitle}}
      <slot></slot>
    </div>
    <div class="btnGroup">
      <lvx-button :type="leftBtnType" @click.stop="enCallBack">{{enBtnFont}}</lvx-button>
      <lvx-button :type="rightBtnType" @click.stop="catchCallBack">{{catchBtnFont}}</lvx-button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "SasConfirm",
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "warning"
      },
      title: {
        type: String,
        default: ""
      },
      smallTitle: {
        type: String,
        default: ""
      },
      enBtnFont: {
        type: String,
        default: "确定"
      },
      catchBtnFont: {
        type: String,
        default: "取消"
      },
      leftBtnType: {
        type: String,
        default: 'primary'
      },
      rightBtnType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      hideConfirm() {
        this.$emit('update:isShow', false)
      },
      enCallBack() {
        // this.isShow = false
        this.$emit('update:isShow', false)
        this.$emit('enSure')
      },
      catchCallBack() {
        this.$emit('update:isShow', false)
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
.confirm-bg{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background: rgba(0,0,0,.3);
  z-index: 9999;
  .confirmWrap{
    box-sizing: border-box;
    padding:40px 30px 30px 65px;
    width:412px;
    min-height:221px;
    border-radius: 4px;
    position: absolute;
    left:50%;
    top:50%;
    background: #ffffff;
    transform: translate(-50%,-50%);
    box-shadow:2px 0px 5px rgba(0,0,0,0.2);
    .lvx-icon-close{
      position: absolute;
      right:15px;
      top:15px;
      font-size: 20px;
      cursor: pointer;
    }
    .confirmTitle{
      font-size: 20px;
      .title{
        color:rgba(51,51,51,1);
        font-size: 18px;
        vertical-align: text-bottom;
      }
      .posit{
        position: absolute;
        left:30px;
        top:40px;
      }
    }
    .confirmMain{
      font-size:14px;
      color:rgba(149,149,149,1);
      padding-top:19px;
    }
    .btnGroup{
      text-align: right;
      padding-top:45px;
    }
  }
}
 .lvx-icon-warning{
    color:#eb9e05;
 }
.lvx-icon-success{
  color:#67c23a;
}
.lvx-icon-primary{
  color:#409eff;
}
.lvx-icon-info{
  color:#ffbf00;
}
.lvx-icon-danger{
  color:#fa5555;
}
</style>
