<template>
    <div class="saas-pdfUpload">
        <div class="saas-pdfTitle">
            <i class="iconsprite icon-upload_pdf"></i>&nbsp;&nbsp;
            pdf合同文档上传
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
        <lvx-upload
            class="upload-pdf-button"
            ref="upload"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-change="onChange"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :data="fileData"
            :size="1023*1024*10"
            :on-spill="onSpill"
            :accept="mime.contractPdfUpload"
            :on-disallow="handelUploadDisallow"
            :action="fileURL"
            >
            文件上传&nbsp;&nbsp;<span class="fileName">{{this.fileName}}</span>
            <lvx-button slot="trigger" size="small" type="primary">浏览...</lvx-button>
            <div slot="tip" class="upload-pdf-tip">
                <span style="padding:0 5px;border-radius:2px;background-color:#b9c5dd;color:#fff;">注</span>
                支持pdf文档单份上传，文件大小不大于10M
            </div>
        </lvx-upload>
        <div class="upload-ok">
            <lvx-button :class={sureBtn:isDisabled} class="btn1" @click="yesUpload">确认上传</lvx-button>
        </div>
    </div>
</template>

<script>
    import base from '~/framework/core/vue-base'
    import apis from '~/config/api'
    import mime from '~/mixins/mime'
    let loading = null
    export default{
        name:'pdf-upload',
        layout:'contract',
        extends:base,
        metaInfo: {
          title: 'PDF合同上传—云合同'
        },
        data () {
            return {
                fileURL: apis.uploadFile,
                fileName:'',
                inputWrap:'',
                isDisabled:true,
                isError:true,
                isDisplay:false,
                wordType: 1,
                fileData: {
                  "typeFile": 1,
                  "title": '',
                },
                mime: mime
            }
        },
        created(){//修改背景颜色
            let body = document.querySelector('body')
            body.style.backgroundColor = '#e1e1e1'
        },
        updated(){//当合同标题以及文件上传成功激活按钮样式
            if(this.inputWrap !== '' && this.fileName !== ''){
                this.isDisabled = false
            }else if(this.inputWrap === '' || this.fileName === ''){
                this.isDisabled = true
            }
        },
        methods:{
          onChange(file,fileList) {
            if(fileList.length > 1) {
              let thatFirst =  fileList.splice(0,1)
            }
            this.fileName = file.name;
          },
          beforeUpload(file) {
            let d = file.name.lastIndexOf("\.");
            // let upFileSuffixes = ".pdf";
            let fileSize = file.size == 0 ? true : false
            let fileBigSize = file.size > 1024 * 1024 * 10 ? true : false
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
                spinnerText:'上传文件大小不能大于10M，请重新选择文件。'
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
            //     spinnerText:'不支持的文件格式，请上传pdf类型的文档。'
            //   })
            //   this.clearArr()
            //   return false
            // }
            loading = this.$createLoading({
              spinnerText: '正在上传文件，请稍等'
            })
          },
          listClick(t) {
            this.wordType = t
            this.isDisplay = false
            // this.fileName = ''
          },
          handleSuccess(response,file){//文件上传成功
            loading.close()
            this.clearArr()
            if(response.code === 200) {
              const message = this.$createMessage({
                type: 'success',
                duration: 3000,
                spinnerText: '上传成功'
              })
              this.$router.push({
                path: '/manage/contract/contract-view-image',
                query:{
                  pid: response.data.parter.id,
                  cid: response.data.cid
                }})
            } else {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: file.msg
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
          ulClick(){//单击选择合同状态
              this.isDisplay = !this.isDisplay
          },
          yesUpload(){//按钮触发单击事件
            if(this.isDisabled) return
            if(this.inputWrap.length > 64) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'合同名称不能超过64个字符'
              })
              return false;
            }
            this.fileData.title = this.inputWrap
            this.fileData.typeFile = this.wordType
            this.$refs.upload.submit();
          },
          clearArr() {
            setTimeout(() => {
              this.fileName = ''
              this.inputWrap = ''
              this.$refs.upload.clearFiles()
            },60)
          },
          /*
          描述：上传文件类型错误钩子处理
          */
          handelUploadDisallow(files) {
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'不支持的文件格式，请上传pdf类型的文档。'
            })
          },
          onSpill() {
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'上传文件大小不能大于10M，请重新选择文件。'
            })
          },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~styles/base.scss";
    .saas-pdfUpload{
        @include responsive-default {
            width: 1000px;
            height: 700px;
            background-color:#fff;
            margin: 12px auto;
            border: 1px solid $border-color;
            font:$font-family-base;
            .saas-pdfTitle{
                text-align:center;
                height: 52px;
                line-height: 52px;
                margin: 102px auto 0;
                font-size: 18px;
                color: #4081ff;
                font-weight: 700;
            }
            .iconsprite{
                vertical-align: middle;
                height: 57px;
                width: 47px;
            }
            .upload-content-input{
                margin: 60px auto 0;
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
            .fileName{
              display:inline-block;
              width:282px;
              text-align:left;
              vertical-align: top;
              overflow:hidden;
              white-space:nowrap;
              text-overflow: ellipsis;
            }
            .upload-pdf-button{
                margin: 80px auto 0;
                width: 420px;
                height: 32px;
                line-height: 32px;
            }
            .upload-pdf-tip{
                width: 420px;
                margin: 30px auto 0;
                font-size: 14px;
                color: #c8d1e2;
            }
            .upload-ok{
                border-top: 1px solid $border-color;
                margin-top: 120px;
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
<style>
  .upload-pdf-button .lvx-upload{
    float:right;
  }
</style>
