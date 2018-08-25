<template>
  <div class="inspectionResult">
    <div class="lx-container" style="padding: 50px 0 100px;">
      <h1 class="text-center">验签结果</h1>
      <div class="text-right">
        <router-link :to="{path:'inspection-sign'}">
          <sas-button type="primary" size="medium">继续验证</sas-button>
        </router-link>
      </div>
      <div class="row result-box" id="sealImg">
        <div class="row result-title"><b>《{{inspection.fileName}}》文件有以下{{signNum.length}}个签名，详细信息如下：</b></div>
        <div class="row result-contact" v-for="list in signNum">
          <lvx-col :span="14" style="border-right: 1px solid #D9D9D9">
            <div class="result-row result-bor-bottom">签约人： {{list.signer}}</div>
            <div class="result-row result-bor-bottom">颁发机构： {{list.issuer}}</div>
            <div class="result-row result-bor-bottom">证书有效期： {{list.certValidPeriod}}</div>
            <div class="result-row result-bor-bottom">该文档的签章{{list.signatureValid}}</div>
            <div class="result-row result-bor-bottom">自应用本签名以来，“文档”{{list.docHasTampered}}</div>
            <div class="result-row result-bor-bottom">
              <div class="row">
                <lvx-col :span="3" style="line-height: 120px;">时间戳</lvx-col>
                <lvx-col :span="21">
                  <div class="result-row">签署时间：{{list.timeStamp.dateTime}}</div>
                  <div class="result-row">是否使用时间戳：{{list.timeStamp.whetherUse}}</div>
                  <div class="result-row">时间戳是否有效：{{list.timeStamp.timeStampValid}}</div>
                </lvx-col>
              </div>
            </div>
          </lvx-col>
          <lvx-col :span="10" class="text-center" style="position: relative; height: 345px;">
            <div v-if="list.signImgBase64 == ''" class="row imgWidth">
              <img v-imgerror src="~/assets/img/src/noSeal.png" width="50%">
            </div>
            <div class="view" v-else></div>
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
    name: 'inspection-result',
    extends: base,
    data () {
      return {
        signNum:[]
      }
    },
    computed: {
      ...mapState({
          inspection: state => state.inspection.inspection,
      })
  },
    mounted () {
      this.signNum = this.inspection.signatureList;
      for(var i=0; i<this.signNum.length; i++){
        if(this.signNum[i].signImgBase64 == '' || this.signNum[i].signImgBase64  == null){
          this.signNum[i].signImgBase64 = '';
        }else{
          this.signNum[i].signImgBase64 = "data:image/png;base64,"+this.signNum[i].signImgBase64;
        }
      }
      this.createCanvas("sealImg", this.signNum, "row");
    },
    watch: {
    },
    methods: {
      // 创建新图片
     createCanvas(_id, _base64, _class) {
        for (var n = 0; n < _base64.length; n++) {
          this.drawCanvas(n, _id, _base64, _class);
        }
     },

    drawCanvas(n, _id, _base64, _class) {
      var oDiv = document.createElement('div'),
        img = new Image(),
        canvas = document.createElement('canvas'),
        context = canvas.getContext("2d");
      img.src = _base64[n].signImgBase64;


      img.className = _class + [n];
      oDiv.className = _class;

      img.addEventListener("load", function () {
        // 绘制图片到canvas上
        /*if(img.width >= 470){
          img.width = 470;
          img.height = 345;
        }*/
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);

        // 将canvas的透明背景设置成白色
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < imageData.data.length; i += 4) {
          // 当该像素是透明的，则设置成白色
          if (imageData.data[i] == 0 && imageData.data[i + 1] == 0 && imageData.data[i + 2] == 0) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
            imageData.data[i + 3] = 0;
          }
        }
        context.putImageData(imageData, 0, 0);
        oDiv.appendChild(canvas);
        var aDiv = document.getElementById(_id);
        var canvasView = aDiv.getElementsByClassName("view")[n];
        canvasView.appendChild(oDiv);
      }, false);
    }

  }
  }


//  createCanvas("sealImg", base64, "class");
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .inspectionResult{
  @include responsive-default {
    margin-top: 67px;
    background-color: #fff;
    .result-box{border: 5px solid #efefef;padding: 30px 30px 50px;margin-top: 20px;
      .result-title{font-size: 16px;}
      .result-contact{border: 1px solid #D9D9D9; border-radius: 3px; margin-top: 10px;
        .imgWidth{line-height:345px;}
        .result-row{padding: 10px 20px;}
        .result-bor-bottom{ border-bottom: 1px solid #D9D9D9;
          &:last-child{border-bottom: none;}
        }
      }
    }
  }
  }
</style>
<style lang="scss">

    canvas {
      max-width: 470px;
      max-height: 345px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

</style>
