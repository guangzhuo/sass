<template>
    <div class="saas-imgUpload">
        <div class="saas-imgTitle">
            <i class="iconsprite icon-upload_img"></i>&nbsp;&nbsp;
            图片合同上传
        </div>
        <div class="upload-content-input">
            <div class="upload-content-input-title">
                <input v-xss v-model="inputWrap" type="text" placeholder="请输入合同标题" id="upload-contract-title" />
            </div>
            <p class="upload-content-input-status" @click="ulClick">
                <span class="statusOne">合同状态</span>
                <span class="contract-selected" v-if="wordType === 1">已签署</span>
                <span class="contract-selected" v-else>未签署</span>
                <span class="ib"></span>
            </p>
            <ul class="select-wl" :class={selectDisplay:isDisplay}>
                <li @click="listClick(1)">已签署</li>
                <li @click="listClick(2)">未签署</li>
            </ul>
        </div>
        <div class="upload-img-list" id="imgUpload">
            <div class="upload-image-list">

                <draggable
                  class="imgWrap"
                  ref="imgWrap"
                  v-model="fileListArr"
                  @end="dropEnd"
                  :options='{
                    group: "people",
                    draggable: ".listImg",
                    animation:300
                  }'>
                      <div class="listImg" v-for="(item,index) in fileListArr" :key="item.uid">
                        <div class="closeRed lvx-icon-circle-close" @click="removeFile(item)"></div>
                        <img class="merImg" :src="item.url" alt="">
                        <div v-if="item.percentage === 1" class="infoWrap">
                          <img class="waringBg" src="~assets/img/sprite/waring-img-bg.png" alt="">
                          <div class="blfo">
                            <div class="titleInfo">上传失败</div>
                            <div class="mainInfo">
                              请删除后上传宽高比合规图片
                            </div>
                          </div>
                        </div>
                        <div class="infoWrap dragOK" v-else>
                          <div class="blfo">
                            <div class="titleInfo">
                              <img src="~assets/img/sprite/drapImg.png" alt="">
                            </div>
                            <div class="mainInfo">
                              拖拽图片可以调换顺序
                            </div>
                          </div>
                        </div>
                      </div>

                </draggable>


                <lvx-upload
                    class="uploadCla"
                    list-type="picture-card"
                    :show-file-list="false"
                    ref="upload"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    :on-error="handleError"
                    :on-change="onChange"
                    :on-remove="onRemove"
                    :auto-upload="false"
                    :multiple="true"
                    :accept="mime.contractImageUpload"
                    :on-disallow="handelUploadDisallow"

                    :action="fileURL"
                    >
                    <i class="iconsprite icon-addImgBG"></i>
                </lvx-upload>
            </div>
            <div class="upload-img-alert">
                <span>操作提示</span><br />
                <i class="iconsprite icon-u-info-1" style="width:97px;height:102px;margin:10px 0;"></i>
                <i class="iconsprite icon-u-info-2" style="width:118px;height:46px;margin-bottom:20px;"></i>
                <ul>
                    <li><q>1</q>支持11张图片上传</li>
                    <li><q>2</q>图片总大小小于等于30M</li>
                    <li><q>3</q>图片宽度大于900px</li>
                    <li><q>4</q>图片宽高比例介于0.55~0.85</li>
                    <li><q>5</q>图片格式支持jpg、png、jpeg等</li>
                    <li><q>6</q>长按图片支持拖动排序</li>
                </ul>
            </div>
            <div class="fileSize">
              共<span class="colRed">{{fileLength}}</span>个文件，总大小<span class="colRed">{{fileSize}}</span>M
            </div>
        </div>

        <div class="upload-ok">
            <lvx-button :class={sureBtn:isDisabled}  class="btn1" @click="yesUpload">确认上传</lvx-button>
        </div>
    </div>
</template>

<script>
    import base from '~/framework/core/vue-base'
    import apis from '~/config/api'
    import draggable from 'vuedraggable'
    import mime from '~/mixins/mime'
    let loading = null
    export default{
        name:'img-upload',
        layout:'contract',
        extends:base,
        metaInfo: {
          title: '图片合同上传—云合同'
        },
        data () {
            return {
              fileURL: apis.uploadImg,
              fileLength:0,
              fileSize:'0.0',
              fileName:'',
              inputWrap:'',
              isDisabled:true,
              isError:true,
              isDisplay:false,
              wordType:1,
              fileListArr:[],
              twoUploadData: [],
              allNum:1,
              fileNameListArr:[],
              mime: mime
            }
        },
        created(){//修改背景颜色
            let body = document.querySelector('body')
            body.style.backgroundColor = '#e1e1e1'
        },
        updated(){//当合同标题以及图片上传成功，激活按钮样式
//          console.log(this.fileListArr);
            if(this.inputWrap !== '' && this.fileListArr.length > 0){
                this.isDisabled = false
            }else if(this.inputWrap === '' || this.fileListArr.length === 0){
                this.isDisabled = true
            }
        },
        methods:{
          listClick(t) {
            this.wordType = t
            this.isDisplay = false
            this.fileName = ''
          },
          ulClick(){//显示未签署以及已签署单击事件
              this.isDisplay = !this.isDisplay
          },
          onChange(file, fileList) {
            console.log(fileList);
            if(fileList.length > 11){
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'最多只允许上传11张图片'
              });

              fileList.splice(11);
              this.fileListArr = fileList;
            }else{
              this.calculation(fileList);
              if(this.fileSize > 30) {
                const message = this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:'文件总大小不能超过30M!'
                });
                this.$refs.upload.uploadFiles.pop()
                this.calculation(fileList)
              }
            }
          },
          removeFile(item) {
            this.$refs.upload.handleRemove(item)
          },
          onRemove(file, fileList) {
            this.fileListArr = fileList
            this.calculation(fileList)
          },
          yesUpload() {
            if(this.isDisabled) return
            if(this.inputWrap.length > 64) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'合同名称不能超过64个字符'
              })
              return false
            }
            const oneTrue = this.fileListArr.some((item, index) => {
              return item.percentage === 1
            })
            //value和图片都有时
            //有不合规图片时
            if(oneTrue) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'上传失败，上传宽高比合规图片'
              })
              return false
            }
            this.allNum = 1
            /*this.fileData.title = this.inputWrap
            this.fileData.typeFile = this.wordType*/
            this.$refs.upload.submit();
          },
          beforeUpload(file) {
            let d = file.name.lastIndexOf("\.");
            // let upFileSuffixes = ".jpg .png .jpeg";
            let fileSize = file.size == 0 ? true : false
            let fileBigSize = file.size > 1024 * 1024 * 30 ? true : false
            let fileSub = file.name.substr(0, d).length > 64 ? true : false
            // let fileSuff = (d < 0 || upFileSuffixes.indexOf(file.name.substr(d)) < 0) ? true : false
            if(fileSize) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'上传失败，不能上传空文件.'
              })
              this.clearArr()
              return false
            }
            if(fileBigSize) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'上传文件大小不能大于30M，请重新选择文件。'
              })
              this.clearArr()
              return false
            }
            if(fileSub) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'文件名称不能超过64个字符，请修改文件名称后重新上传！'
              })
              this.clearArr()
              return false
            }
            // if(fileSuff) {
            //   const message = this.$createMessage({
            //     type:'error',
            //     duration:3000,
            //     spinnerText:'不支持的文件格式，请上传jpg类型的文档。'
            //   })
            //   this.clearArr()
            //   return false
            // }
            loading = this.$createLoading({
              spinnerText: '正在上传文件，请稍等'
            })
          },
          handleSuccess(response, file, fileList){//文件上传成功
            this.twoUploadData = []
            for (let i of Object.keys(fileList)) {
              this.twoUploadData.push({
                "fileNameList" : fileList[i].response&&fileList[i].response.data.fileName
              })
            }

            if(fileList.length == this.allNum++){
              // this.twoUploadData.fileNameList = this.fileNameListArr
              // this.twoUploadData.title = this.inputWrap
              // this.twoUploadData.typeFile = this.wordType
              this.twoUploadData.push({
                'title': this.inputWrap
              });
              this.twoUploadData.push({
                'typeFile': this.wordType
              });
              this.$axios.post(apis.uploadImgTwo,this.twoUploadData)
                .then(data => {
                    if(data.data.code === 200) {
                      loading.close()
                      this.clearArr()
                      const message = this.$createMessage({
                        type: 'success',
                        duration: 3000,
                        spinnerText: '上传成功'
                      })
                      this.$router.push({
                        path: '/manage/contract/contract-view-image',
                        query:{
                          pid: data.data.data.parter.id,
                          cid: data.data.data.cid
                        }})
                    } else {
                      loading.close()
                      this.clearArr()
                      const message = this.$createMessage({
                        type:'error',
                        duration:3000,
                        spinnerText: file.msg
                      })
                    }
              })
            }
          },
          handleError(file){
            loading.close()
            this.clearArr()
            //上传失败提示
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'上传失败，请重新上传'
            })
          },
          //计算文件总大小
          calculation(fileList) {
            this.fileListArr = fileList
            let fileSize = 0;
            // this.fileData.fileNameList = []

            fileList&&fileList.forEach((item, index)=>{
              // this.fileData.title = item.name
              this.fileWinHinFor(index)
              return fileSize += item.size
            })
            this.fileLength = fileList.length
            this.fileSize = (fileSize/ (1024*1024)).toFixed(2)
          },
          //判断文件是否合规
          fileWinHinFor(index) {
            let imgWrap = this.$refs.imgWrap.$el
            this.$nextTick(()=>{
              setTimeout(()=>{
                let lastlisImg = imgWrap.querySelectorAll('.merImg')[index]
                let imgWin = lastlisImg.naturalWidth
                let imgHin = lastlisImg.naturalHeight
                let imgPrp = imgWin/imgHin
                lastlisImg.onload = (function(that,index){
                  if(imgPrp < 0.55 || imgPrp > 0.85 || imgWin < 900) {
                    that.fileListArr[index].percentage = 1
                  }
                })(this,index)
              },100)
            })
          },
          //请求成功后清除状态
          clearArr() {
            this.inputWrap = ''
            this.fileListArr = []
            this.allNum = 1
            this.$refs.upload.clearFiles()
            this.twoUploadData = []
          },

          dropEnd(evt) {
            this.$refs.upload.uploadFiles = this.fileListArr
          },
          /*
          描述：上传图片格式错误钩子处理
          */
          handelUploadDisallow(files) {
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'不支持的文件格式。'
            })
          }
        },
        components:{
          draggable
        }
    }
</script>

<style lang="scss">
  .saas-imgUpload{
    #imgUpload{
      .lvx-upload-list__item{
        width:100px;
      }
      .lvx-upload--picture-card{
          width: 102px;
          height: 143px;
          border: none;
      }
    }
  }

</style>
<style lang="scss" scoped>
    @import "~styles/base.scss";
    .saas-imgUpload{
        @include responsive-default {
            width: 1000px;
            background-color:#fff;
            margin: 12px auto;
            border: 1px solid $border-color;
            font:$font-family-base;
            .saas-imgTitle{
                text-align:center;
                height: 52px;
                line-height: 52px;
                margin: 102px auto 0;
                font-size: 18px;
                color: #4081ff;
                font-weight: 700;
            }
            .icon-upload_img{
                vertical-align: middle;
                height: 44px;
                width: 44px;
            }
            .upload-content-input{
                margin: 60px auto 0;
                padding-bottom:50px;
                border-bottom: 1px solid $border-color;
            }
            .upload-content-input-title{
                text-align:center;
            }
            #upload-contract-title{
                margin: 0 auto;
                width: 420px;
                height: 50px;
                line-height: 50px;
                background-color: #e6ebf6;
                border: 1px solid $border-color;
                padding-left: 26px;
            }
            .upload-content-input-status{
                margin: 36px auto 0;
                width: 420px;
                height: 50px;
                line-height: 50px;
                background-color: #e6ebf6;
                border: 1px solid $border-color;
                padding-left: 26px;
                cursor: pointer;
            }
            .statusOne{
                color: #313131;
                font-size: 14px;
                padding-left: 5px;
            }
            .contract-selected{
                display: inline-block;
                margin-left: 111px;
                color: #9aa5bc;
                font-size: 18px;
            }
            .ib{
                width: 0;
                height: 0;
                border-top: 15px solid #b9c5dd;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                position: relative;
                top: 18px;
                display:inline-block;
                float:right;
                margin-right: 20px;
            }
            .upload-img-list{
                width: 100%;
                position:relative;
                min-height:400px;
              padding-bottom: 44px;
              .imgWrap{
                /*display: inline-block;*/
                float: none;
                padding-left:0px;
              }
              .uploadCla{
                /*display: inline-block;*/
                float: left;
                vertical-align: top;
                margin-top:20px;
              }
              .listImg{
                width:102px;
                height:143px;
                /*display: inline-block;*/
                float: left;
                position: relative;
                list-style: none;
                margin-right:20px;
                margin-top: 20px;
                &:hover{
                  & .closeRed{
                    display: block;
                  }
                }
                .closeRed{
                  position: absolute;
                  right: 0px;
                  top: 0px;
                  z-index: 3;
                  height: 15px;
                  text-align: center;
                  color: #fff;
                  cursor:pointer;
                  display: none;
                }
                .merImg{
                  position: absolute;
                  width:100%;
                  height:100%;
                  left:0px;
                  right:0px;
                }
                .infoWrap{
                  position: absolute;
                  left:0px;
                  right:0px;
                  top:0px;
                  bottom:0px;
                  padding-top:30px;
                  z-index: 2;
                  width:100%;
                  text-align: center;
                  font-size:14px;
                  background: rgba(0,0,0,.2);
                  .blfo{
                    display: none;
                  }
                  .titleInfo{
                    color:red;
                  }
                  .mainInfo{
                    color:#fff;
                    padding: 0px 9px;
                  }
                }
                .dragOK{
                  padding-top:20px;
                  cursor: pointer;
                }
                &:hover{
                  .waringBg{
                    display: none;
                  }
                  .blfo{
                    display: block;
                  }
                }
              }
            }
            .upload-image-list{
                width: 80%;
                display:inline-block;
                padding-top: 20px;
                padding-left: 20px;
                vertical-align: top;

            }
            .upload-img-alert{
                margin-top: 20px;
                margin-right: 20px;
                float: right;
                width: 173px;
                ul{
                    list-style: none;
                    padding:0;
                    color:$placeholder-color;
                    q{
                        quotes: none;
                        width: 15px;
                        display: inline-block;
                        height: 15px;
                        line-height: 12px;
                        text-align: center;
                        margin-right: 2px;
                        border: 1px solid #b5bccc;
                        border-radius: 50%;
                    }
                }
            }
            .fileSize {
              position: absolute;
              bottom:0px;
              left:20px;
              .colRed{
                color:red;
              }
            }
            .select-wl{
                margin: 1px 0 1px 250px;
                width: 420px;
                border-radius: 5px;
                position: absolute;
                z-index: 1;
                list-style:none;
                display:none;
                li{
                    line-height: 52px;
                    width: 420px;
                    font-size:$font-size-title;
                    text-align:center;
                    cursor:pointer;
                    &:first-of-type{
                        background-color:#afbcd5;
                    }
                    &:last-of-type{
                        background-color:#9AA5BC;
                    }
                }
                &.selectDisplay{
                    display:inline-block;
                }
            }
            .upload-ok{
                border-top: 1px solid $border-color;
                margin-top: 20px;
            }
            .btn1{
                cursor: pointer;
                margin: 40px auto;
                letter-spacing: 2px;
                display: block;
                border: 0;
                height: 42px;
                line-height: 42px;
                width: 210px;
                border-radius: 5px;
                padding: 0 60px;
                text-align: center;
                color: #fff;
                font-size: 18px;
                background-color:$theme-color;
                box-shadow: 5px 7px 10px $border-color;
            }
            .sureBtn{
                background-color: $disabled-color;
                color:$font-color;
            }
        }
    }

</style>
