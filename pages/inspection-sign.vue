<template>
  <div class="inspection">
    <div class="inspection-bg">
      <div class="lx-container">
        <lvx-col :span="12" class="text-position">
          <h1>在线验签</h1>
          <p class="text-color">帮您检测电子签名是否被篡改，<br/>电子合同是否真实有效</p>
        </lvx-col>
        <lvx-col :span="12">
          <lvx-upload
            class="upload-box"
            drag
            :limit="1"
            action="/yz/pdfVerifySignature"
            :on-success="result"
            :before-upload="beforeAvatarUpload"
          >
            <img v-imgerror class="img-mar" src="~/assets/img/src/inspection.png" width="70px" height="70px" />
            <div class="lvx-upload__text">将合同PDF文件拖动到这里，或者点击此区域上传</div>
          </lvx-upload>
        </lvx-col>
      </div>
    </div>
    <div class="row lx-container">
      <div class="row procedure">
        <div class="row procedure-head">电子验签流程：</div>
        <div class="row">
          <lvx-col :span="10">
            <p>第一步：下载合同</p>
            <p class="p-color">登录云合同平台，点击合同管理，下载需要验签的合同<br/>文件（同时支持验证从第三方平台下载的合同）</p>
          </lvx-col>
          <lvx-col :span="10">
            <p>第二步：上传PDF文件</p>
            <p class="p-color">将合同PDF文件拖拽至上传区域内，或点击“上传区域”<br/>上传文件</p>
          </lvx-col>
          <lvx-col :span="4">
            <div class="fr">
              <p>第三步：完成验签，查看结果</p>
              <p class="p-color">查看验签结果</p>
            </div>
          </lvx-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import base from '~/framework/core/vue-base'
  import { mapState } from 'vuex'
  export default {
    name: 'inspection-sign',
    extends: base,
    metaInfo: {
      title: '国内领先的电子合同生态服务商——产品中心——云合同',
      meta: [{
        name: 'keywords',
        content: '国家电子合同平台，电子合同，云合同，在线验签，电子签约，电子签名，电子签章，在线签约，合同在线签署'
      },{
        name: 'description',
        content: '云合同产品中心为您提供合同模板、合同流转、合同签署、合同管理、合同存储以及存取证、在线仲裁等服务'
      }]
    },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    components: {

    },
    computed: {
    },
    mounted () {

    },
    watch: {
    },
    methods: {
      result(res){
        if(res.code == 200){
          this.$message({
            message: '验签成功',
            type: 'success'
          });
          if(res.data.signatureList.length == 0){
            this.$router.push({path:"/inspection-result-empty"});
          }else{
            this.$router.push({path:"inspection-result"});

            this.$store.state.inspection.inspection = res.data;
//            sessionStorage.setItem("inspection",JSON.stringify(res.data));
          }
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      },
      beforeAvatarUpload(file){
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          const message = this.$createMessage({
            type:'info',
            duration:3000,
            spinnerText:'文件格式不正确'
          });
        }
        return isPDF;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .inspection{
  @include responsive-default {
    margin-top: 67px;
    .fr{float: right}
    .inspection-bg{
      background: #f5f5f5; height: 430px;
    .text-position{margin-top: 130px; padding-left: 100px;
    .text-color{font-size: 24px; color: #959595; margin-top: 30px;}
  }
  .upload-box{margin-top: 100px;
  .img-mar{margin: 50px 0 20px;}
  }
  }
  .procedure{padding: 45px 0;
  .procedure-head{font-size: 16px; margin-bottom: 20px;}
  .p-color{color: #959595;}
  }
  }
  }
</style>
<style lang="scss">
  .upload-box{
  .lvx-upload__input{
    display: none;
  }
  .lvx-upload-dragger{width: 545px; height: 230px}
  }
</style>
