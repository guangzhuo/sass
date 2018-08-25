<template>
 <sas-dialog
    :show.sync="visible"
    title="本地上传"
    width="598px"
    class="upload-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <article class="box">
       <!--  <router-link class="col-xs-4 sas-align-center" target="_blank" to="/manage/user/upload/word-upload">
          <i class="iconsprite icon-word"></i>
          <span class="text">word文档上传</span>
        </router-link>
        <router-link class="col-xs-4 sas-align-center" to="/manage/user/upload/pdf-upload" target="_blank">
          <i class="iconsprite icon-img"></i>
          <span class="text" @click="goToRouter('pdf')">pdf文件上传</span>
        </router-link >
        <router-link class="col-xs-4 sas-align-center" to="/manage/user/upload/img-upload" target="_blank">
          <i class="iconsprite icon-pdf"></i>
          <span class="text">图片上传</span>
        </router-link>  -->
        <a class="col-xs-4 sas-align-center sas-cursor-pointer" @click="goToRouter('word')">
          <i class="iconsprite icon-word"></i>
          <span class="text">word文档上传</span>
        </a>
        <a class="col-xs-4 sas-align-center sas-cursor-pointer" @click="goToRouter('pdf')">
          <i class="iconsprite icon-pdf"></i>
          <span class="text" @click="goToRouter('pdf')">pdf文件上传</span>
        </a >
        <a class="col-xs-4 sas-align-center sas-cursor-pointer" @click="goToRouter('img')">
          <i class="iconsprite icon-img"></i>
          <span class="text">图片上传</span>
        </a> 
      </article>
    </div>
  </sas-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: this.show
    }
  },
  props: {
    show: Boolean
  },
  mounted () {
  },
  watch: {
    show () {
      this.visible = this.show;
    }
    
  },
  methods: {
    goToRouter(router) {
      switch(router) {
        case 'word':
          open('/manage/user/upload/word-upload');
          break;
        case 'pdf':
          open('/manage/user/upload/pdf-upload');
          break;
        case 'img':
          open('/manage/user/upload/img-upload');
          break;
      }
      this.$emit('update:show', false);
    }
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.upload-dialog{
  .content{
    .box{
      height: 315px;
      padding: 80px 0 130px;
      .text{
        width: 112px;
        border: none;
        position: absolute;
        left: calc(50% - 53px);
        top: 135px;
        color: #131313;
      }
    }
  }
}
</style>

