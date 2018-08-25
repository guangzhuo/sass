<template>
  <div class="company-strengthen">
    <!--企业有效证件 区域 -->
    <div class="company-up section-item">
      <span class="up1">
        <p style="font-size: 15px;padding-bottom: 12px;">
          企业有效证件:
        </p>
        <p style="color: #BBB;padding: 0;margin: 0;">支持格式：</p>
        <p style="color: #BBB;padding: 0;margin: 0;">gif,jpg,jpeg,bmp,png;≤2M</p>
      </span>
      <span class="up2">
        <div class="cert-upload-example">
          <img v-if="fileCertificate" :src="fileCertificate.url" class="avatar">
          <i v-else class="upload-img-bg"></i>
        </div>
        <lvx-upload
          class="upload-first"
          action="/user/file/uploadAuthImg"
          :on-success="handleSuccessCertificate"
          :accept="mime.certificationAttachment"
          :show-file-list="false"
          :on-disallow="handelDisallow"
          :before-upload="handleUploadBefore"
          >
          <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
        </lvx-upload>
      </span>
      <span class="up3">
        <div class="demo-right">
          <img class="img-bg"  src="~assets/img/src/certify/companyDemo.png" >
        </div>
        <div class="image-upload-button">示例图片</div>
      </span>
    </div>

    <!--经办人证件 区域 -->
    <div class="company-center">
      <!--身份证 区域 -->
      <section class="idcard section-item" v-if="idType == 1">
        <span class="text">
          <p style="font-size: 15px;padding-bottom: 12px;">
            经办人身份证:
          </p>
          <p style="color: #BBB;padding: 0;margin: 0;">支持格式：</p>
          <p style="color: #BBB;padding: 0;margin: 0;">gif,jpg,jpeg,bmp,png;≤2M</p>
        </span>
        <!--正面 -->
        <span class="upload-image-f">
          <div class="cert-upload-example">
            <img v-if="fileCardFront" :src="fileCardFront.url" class="avatar">
            <img v-else src="~assets/img/src/certify/noId.png" class="idcard-noupload-img">
          </div>
          <lvx-upload
            class="upload-first"
            action="/user/file/uploadAuthImg"
            :on-success="handleSuccessCardFront"
            :accept="mime.certificationAttachment"
            :show-file-list="false"
            :on-disallow="handelDisallow"
            :before-upload="handleUploadBefore"
            >
            <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
          </lvx-upload>
        </span>
        <span class="demo-image-f">
          <div class="demo-right">
            <img class="img-bg"  src="~assets/img/src/certify/id.png" >
          </div>
          <div class="image-upload-button">示例图片</div>
        </span>
        <!--反面 -->
        <span class="upload-image-r">
          <div class="cert-upload-example">
            <img v-if="fileCardReverse" :src="fileCardReverse.url" class="avatar">
            <img v-else src="~assets/img/src/certify/noIdR.png" class="idcard-noupload-img">
          </div>
          <lvx-upload
            class="upload-first"
            action="/user/file/uploadAuthImg"
            :on-success="handleSuccessCardReverse"
            :accept="mime.certificationAttachment"
            :show-file-list="false"
            :on-disallow="handelDisallow"
            :before-upload="handleUploadBefore"
            >
            <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
          </lvx-upload>
        </span>
        <span class="demo-image-r">
          <div class="demo-right">
            <img class="img-bg"  src="~assets/img/src/certify/idR.png" >
          </div>
          <div class="image-upload-button">示例图片</div>
        </span>
      </section>
      <!--护照 区域 -->
      <section class="passport" v-if="idType == 2">
        <span class="text">
          <p style="font-size: 15px;padding-bottom: 12px;">
            经办人护照:
          </p>
          <p style="color: #BBB;padding: 0;margin: 0;">支持格式：</p>
          <p style="color: #BBB;padding: 0;margin: 0;">gif,jpg,jpeg,bmp,png;≤2M</p>
        </span>
        <span class="upload-image">
          <div class="cert-upload-example">
            <img v-if="filePassport" :src="filePassport.url" class="avatar">
            <i v-else class="companypic1"></i>
          </div>
          <lvx-upload
            class="upload-first"
            action="/user/file/uploadAuthImg"
            :on-success="handleSuccessPassport"
            :accept="mime.certificationAttachment"
            :show-file-list="false"
            :on-disallow="handelDisallow"
            :before-upload="handleUploadBefore"
            >
            <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
          </lvx-upload>
        </span>
        <span class="demo-image">
          <div class="demo-right">
            <img class="img-bg"  src="~assets/img/src/certify/passport.png" >
          </div>
          <div class="image-upload-button">示例图片</div>
        </span>
      </section>
      <!--军官证 区域 -->
      <section class="officer-card" v-if="idType == 3">
        <span class="text">
          <p style="font-size: 15px;padding-bottom: 12px;">
            经办人军官证:
          </p>
          <p style="color: #BBB;padding: 0;margin: 0;">支持格式：</p>
          <p style="color: #BBB;padding: 0;margin: 0;">gif,jpg,jpeg,bmp,png;≤2M</p>
        </span>
        <span class="upload-image">
          <div class="cert-upload-example">
            <img v-if="fileOfficerCard" :src="fileOfficerCard.url" class="avatar">
            <i v-else class="companypic1"></i>
          </div>
          <lvx-upload
            class="upload-first"
            action="/user/file/uploadAuthImg"
            :on-success="handleSuccessOfficerCard"
            :accept="mime.certificationAttachment"
            :show-file-list="false"
            :on-disallow="handelDisallow"
            :before-upload="handleUploadBefore"
            >
            <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
          </lvx-upload>
        </span>
        <span class="demo-image">
          <div class="demo-right">
            <img class="img-bg"  src="~assets/img/src/certify/officer-card.png" >
          </div>
          <div class="image-upload-button">示例图片</div>
        </span>
      </section>

    </div>

    <!--企业授权委托书 区域 -->
    <div class="company-down section-item" v-if="agentType ==1">
      <span class="up1">
        <p style="font-size: 15px;padding-bottom: 12px;">
          企业授权委托书:
        </p>
        <a style="width:120px;cursor: pointer;color:#4082FF;text-align: center;" href="https://www.yunhetong.com/home/user/commons/doc/authExample.docx">模板下载</a>
                               
        <p style="color: #BBB;padding: 0;margin: 0;">支持格式：</p>
        <p style="color: #BBB;padding: 0;margin: 0;">gif,jpg,jpeg,bmp,png;≤2M</p>
      </span>
      <span class="up2">
        <div class="cert-upload-example">
          <img v-if="filePowerOfAttoney" :src="filePowerOfAttoney.url" class="avatar">
          <i v-else class="demo-image-bg"></i>
        </div>
        <lvx-upload
          class="upload-first"
          action="/user/file/uploadAuthImg"
          :on-success="handleSuccessPowerOfAttoney"
          :accept="mime.certificationAttachment"
          :show-file-list="false"
          :on-disallow="handelDisallow"
          :before-upload="handleUploadBefore"
         >
          <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
        </lvx-upload>
      </span>
      <span class="up3">
        <div class="demo-right">
          <img class="img-bg"  src="~assets/img/src/certify/AuthorizationDemo.png" >
        </div>
        <div class="image-upload-button">示例图片</div>
      </span>
    </div>

    <!--底部操作按钮 区域 -->
    <footer class="button-width">
      <sas-button category="gray" @click="goBack" >返回上一步</sas-button>
      <sas-button category="primary" @click="submitCertification">提交认证</sas-button>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'
import mime from '~/mixins/mime'

export default {
  data () {
    return {
      fileCertificate: null, //企业有效证件上传文件
      filePowerOfAttoney: null, //企业授权委托书上传文件
      fileCardFront: null, //身份证正面上传图片
      fileCardReverse: null, //身份证反面上传图片
      filePassport: null, //经办人护照上传文件
      fileOfficerCard: null, //军官证上传照片
      mime: mime
    }
  },
  computed: {
    ...mapState({
      idType: state => state.User.Check.Company.idType,
      cardType: state => state.User.Check.Company.cardType,
      agentType: state => state.User.Check.Company.agentType
    })
  },
  props: {
  },
  created() {

  },
  mounted () {

  },
  watch: {
    
  },
  methods: {
    /*返回上一步
    */
    goBack() {
      this.$emit('after-pre');
    },
    /*
    企业有效证件上传
    */
    handleSuccessCertificate(res, file){
      this.fileCertificate = file;
    },
    /*
    企业授权委托书上传
    */
    handleSuccessPowerOfAttoney(res, file){
      this.filePowerOfAttoney = file;
    },
    /*
    经办人身份证正面上传
    */
    handleSuccessCardFront(res, file){
      this.fileCardFront = file;
    },
    /*
    经办人身份证反面上传
    */
    handleSuccessCardReverse(res, file){
      this.fileCardReverse = file;
    },
    /*
    经办人护照上传
    */
    handleSuccessPassport(res, file){
      this.filePassport = file;
    },
    /*
    经办人军官证上传
    */
    handleSuccessOfficerCard(res, file){
      this.fileOfficerCard = file;
    },
    /*
    上传文件超出限制Mime类型
    */
    handelDisallow() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText: '请上传正确格式文件'
      })
    },
    /*
    上传前检查文件大小
    */
    handleUploadBefore(file) {
      if(file) {
        let sizeB = file.size; //文件字节
        let sizeM = sizeB/1024/1024; //文件Mb
        if(sizeM > 2) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '请上传2M以下图片'
          })
          return false;
        }
      }
    },
    /*
    提交认证信息
    */
    async submitCertification() {
      if(this.checkBeforeSubmit()) {
        let postData = {};
        switch(this.idType) {
          case 1:
            postData.idCardImgA = this.fileCardFront.response.data.fileName;
            postData.idCardImgB = this.fileCardReverse.response.data.fileName;
            break;
          case 2:
            postData.idCardImgA = this.filePassport.response.data.fileName;
            break;
          case 3:
            postData.idCardImgA = this.fileOfficerCard.response.data.fileName;
            break;
        }
        switch(this.cardType) {
          case 1:
            postData.licenseNumImg = this.fileCertificate.response.data.fileName;
            break;
          case 2: 
            postData.orgCodeImg = this.fileCertificate.response.data.fileName;
            break;
        }
        
        if(this.agentType == 1) {
          postData.AgentImg = this.filePowerOfAttoney.response.data.fileName;
        }
        const r = await this.$axios.post(apis.addCompanyMoreInfo, postData).then((data)=>data.data);
        if(r.code == 200) {
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '认证已提交'
          });
          this.$router.push({path: '/manage'});
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '认证错误'
          });
        }
      }
    },
    /*
    提交认证前校验
    */
    checkBeforeSubmit() {
      if(!this.fileCertificate) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '请上传企业有效证件'
        });
        return false;
      }
      switch(this.idType) {
        case 1:
          if(!this.fileCardFront) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传身份证正面'
            });
            return false;
          } else if (!this.fileCardReverse) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传身份证反面'
            });
            return false;
          }
          
          break;
        case 2:
          if(!this.filePassport) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传护照'
            });
            return false;
          }
          
          break;
        case 3:
          if(!this.fileOfficerCard) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传军官证'
            });
            return false;
          }
         
          break;
      }
      if(this.agentType == 1) { //授权委托书
        if(!this.filePowerOfAttoney) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '请上传企业授权委托书'
          });
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
      
    }
    
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.company-strengthen{
  width: 1080px;
  text-align: center;
  margin: 0 auto;
  @include responsive-default {
    .section-item{
      width: 1080px;
      height: 191px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;

      &>span{
        width: 18%;
      }
      .up1{
        order:1;
        align-self: flex-start;
        text-align: left;
        // text-indent: 227px;
      }
      .up2{
        order:2;
        align-self: baseline;

          .cert-upload-example{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            margin: 0 18px;
            line-height: 149px;
            text-align: center;
          }

          .upload-first{
            width: 182px;
            margin-top: 10px;
            text-align: center;
          }
          
          .avatar{
            padding: 2px;
            // max-height: 188px;
            // max-width: 236px;
            width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
      }
      .up3{
        order:3;
        align-self: flex-start;

        .demo-right{
          border: 1px dashed #E1E1E1;
          width: 157px;
          height: 149px;
          text-align: center;
          line-height: 149px;
        }

        .image-upload-button {
          text-align: center;
          padding-top: 10px;
          width: 157px;
        }
      }

    }
    .company-up{
      .upload-img-bg{
        background: url("~assets/img/src/certify/company.png") no-repeat;
        max-width: 157px;
        max-height: 149px;
        width: 102px;
        height: 74px;
        border: 0;
        padding: 5px;
        display: inline-block;
        vertical-align: middle;
      }
      .demo-right{
        .img-bg{
          width: 155px;
          vertical-align: middle;
          padding: 5px;

        }
      }
      .demo-image-bg{
        background: url("~assets/img/src/certify/company.png") no-repeat;
        max-width: 157px;
        max-height: 149px;
        width: 102px;
        height: 74px;
        border: 0;
        padding: 5px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .company-center{
      margin: 15px 0;
      .passport{
        width: 1080px;
        height: 191px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;

        &>span{
          width: 18%;
        }
        .text{
          text-align: left;
        }
        .upload-image{
          .cert-upload-example{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            margin: 0 18px;
            line-height: 149px;
            text-align: center;
          }
          .upload-first{
            width: 182px;
            margin-top: 10px;
            text-align: center;
          }
          .companypic1{
            background: url("~assets/img/src/certify/company.png") no-repeat;
            max-width: 157px;
            max-height: 149px;
            width: 102px;
            height: 74px;
            border: 0;
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .avatar{
            padding: 2px;
            // max-height: 188px;
            // max-width: 236px;
            width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .demo-image{
          .demo-right{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            text-align: center;
            line-height: 149px;
            .img-bg{
              height: 148px;
              vertical-align: middle;
              padding: 5px;
            }
          }
          
          .image-upload-button {
            text-align: center;
            padding-top: 10px;
            width: 157px;
          }
        }
      }
      .officer-card{
        width: 1080px;
        height: 191px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;

        &>span{
          width: 18%;
        }
        .text{
          text-align: left;
        }
        .upload-image{
          .cert-upload-example{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            margin: 0 18px;
            line-height: 149px;
            text-align: center;
          }
          .upload-first{
            width: 182px;
            margin-top: 10px;
            text-align: center;
          }
          .companypic1{
            background: url("~assets/img/src/certify/company.png") no-repeat;
            max-width: 157px;
            max-height: 149px;
            width: 102px;
            height: 74px;
            border: 0;
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .avatar{
            padding: 2px;
            // max-height: 188px;
            // max-width: 236px;
            width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .demo-image{
          .demo-right{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            text-align: center;
            line-height: 149px;
            .img-bg{
              width: 155px;
              vertical-align: middle;
              padding: 5px;
            }
          }
          
          .image-upload-button {
            text-align: center;
            padding-top: 10px;
            width: 157px;
          }
        }
      }
      .idcard{
        width: 1080px;
        height: 191px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        .text{
          text-align: left;
        }
        .upload-image-f{
          .cert-upload-example{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            margin: 0 18px;
            line-height: 149px;
            text-align: center;
          }
          .upload-first{
            width: 182px;
            margin-top: 10px;
            text-align: center;
          }
          .idcard-noupload-img{
            height: 148px;
            border: 0;
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .avatar{
            padding: 2px;
            // max-height: 188px;
            // max-width: 236px;
            width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .demo-image-f{
          .demo-right{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            text-align: center;
            line-height: 149px;
            .img-bg{
              width: 155px;
              vertical-align: middle;
              padding: 5px;
            }
          }

          .image-upload-button {
            text-align: center;
            padding-top: 10px;
            width: 157px;
          }
        }
        .upload-image-r{
          .cert-upload-example{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            margin: 0 18px;
            line-height: 149px;
            text-align: center;
          }
          .idcard-noupload-img{
            height: 148px;
            border: 0;
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .upload-first{
            width: 182px;
            margin-top: 10px;
            text-align: center;
          }
          .avatar{
            padding: 2px;
            // max-height: 188px;
            // max-width: 236px;
            width: 100%;
            max-height: 100%;
            vertical-align: middle;
          }
        }
        .demo-image-r{
          .demo-right{
            border: 1px dashed #E1E1E1;
            width: 157px;
            height: 149px;
            text-align: center;
            line-height: 149px;
            .img-bg{
              width: 155px;
              vertical-align: middle;
              padding: 5px;
            }
          }
          .image-upload-button {
            text-align: center;
            padding-top: 10px;
            width: 157px;
          }
        }
      }
    }
    .company-down{
      .demo-image-bg{
        background: url("~assets/img/src/certify/Authorization.png") no-repeat;
        max-width: 157px;
        max-height: 149px;
        width: 82px;
        height: 100px;
        border: 0;
        padding: 5px;
        display: inline-block;
        vertical-align: middle;
      }
      .demo-right{
        .img-bg{
          height: 148px;
          vertical-align: middle;
          padding: 5px;

        }
      }
    }
    .button-width{
      text-align: left;
      padding-left: calc(50% - 168px);
      padding-top: 28px;
    }
  }
}
</style>


