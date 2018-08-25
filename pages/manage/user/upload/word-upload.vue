<template>
    <div class="saas-wordUpload">
        <div class="saas-wordTitle">
            <i class="iconsprite icon-upload-word"></i>&nbsp;&nbsp;
            Word合同文档上传
        </div>
        <div class="upload-content-input">
            <div class="upload-content-input-title">
                <input v-xss v-model="inputWrap" type="text" placeholder="请输入合同标题" id="upload-contract-title" />
            </div>
            <p class="upload-content-input-status">
                <span class="statusOne">合同状态</span>
                <span class="noStatus">未签署</span>
            </p>
        </div>

      <lvx-upload
            class="upload-word-button"
            ref="upload"
            :on-change="onChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :auto-upload="false"
            :data="fileData"
            :size="1023*1024*10"
            :on-spill="onSpill"
            :multiple="false"
            :action="fileURL"
            >

              文件上传&nbsp;&nbsp;<span class="fileName" style="display:inline-block;width:282px;text-align:left;vertical-align: top;overflow:hidden;white-space:nowrap;text-overflow: ellipsis;">{{fileName}}</span>

            <lvx-button slot="trigger" size="small" type="primary" >浏览...</lvx-button>
            <div class="upload-word-tip" slot="tip">
              <span style="padding:0 5px;border-radius:2px;background-color:#b9c5dd;color:#fff;margin-bottom:66px;">注</span>
              支持word文档单份上传，文件大小不大于10M
            </div>
        </lvx-upload>

        <div class="upload-ok">
            <lvx-button :class={sureBtn:isDisabled} class="btn1"  @click="yesUpload">确认上传</lvx-button>
        </div>
    </div>
</template>

<script>
    import base from '~/framework/core/vue-base'
    import apis from '~/config/api'
    import mime from '~/mixins/mime'
    let loading = null
    export default{
        name:'word-upload',
        layout:'contract',
        extends:base,
        metaInfo: {
          title: 'word合同上传—云合同'
        },
        data () {
            return {
              fileURL: apis.setUpload,
              fileData: {
                "typeFile": 2,
                "title": '',
                "token": "lvxuntoken",
                "meta": "true",
                "mode": "private"
              },
              fileList:[],
              fileName:'',
              inputWrap:'',
              isDisabled:true,
              isError:true,
              isChange:false,
              mime: mime
            }
        },
        created(){//修改背景颜色
            let body = document.querySelector('body')
            body.style.backgroundColor = '#e1e1e1'
        },
        updated(){//合同标题以及文件上传成功激活按钮样式
            if(this.inputWrap !== '' && this.fileName !== ''){
                this.isDisabled = false

            }else if(this.inputWrap === '' || this.fileName === ''){
                this.isDisabled = true

            }
        },
        methods:{
          yesUpload(file) {
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
            this.$refs.upload.submit();
          },

          onSpill() {
            const message = this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:'上传文件大小不能大于10M，请重新选择文件。'
            })
          },
          onChange(file,fileList) {
            if(fileList.length > 1) {
              let thatFirst =  fileList.splice(0,1)
            }
            this.fileName = file.name;
          },
          beforeAvatarUpload(file) {
            let d = file.name.lastIndexOf("\.");
            // let upFileSuffixes = ".doc .docx";
            let fileSize = file.size == 0 ? true : false
            let fileBigSize = file.size > 1024 * 1024 * 10 ? true : false;
            if(file.name.search('.doc') > 0 || file.name.search('.docx') > 0) {

            }else{
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'不支持的文件格式，请上传.doc或.docx类型的文档。'
              });
              this.clearArr()
              return false
            }
            if(fileSize) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'上传失败，不能上传空文件.'
              });
              this.clearArr()
              return false
            }
            if(fileBigSize) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'上传文件大小不能大于10M，请重新选择文件。'
              });
              this.clearArr();
              return false
            }
            /*if(fileSub) {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:'文件名称不能超过64个字符，请修改文件名称后重新上传！'
              });
              this.clearArr();
              return false;
            }*/

            // if(fileSuff) {
            //   const message = this.$createMessage({
            //     type:'error',
            //     duration:3000,
            //     spinnerText:'不支持的文件格式，请上传.doc或.docx类型的文档。'
            //   })
            //   this.clearArr()
            //   return false
            // }
            loading = this.$createLoading({
              spinnerText: '正在上传文件，请稍等'
            })
          },
          handleSuccess(file){
            loading.close()
            this.clearArr()
            if(file.md5 || file.desc == 'success') {
              const message = this.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:'上传成功'
              })
              this.$router.push({
                path: '/manage/contract/contract-edit',
                query:{
                  uuid: file.uuid,
                  ctit: this.inputWrap,
                  userId:'1'
                }})
            } else {
              const message = this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: file.msg
              })
            }

          },
          handleError(file){//上传失败提示信息
              const message = this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:'上传失败，请重新上传'
              })
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
              spinnerText:'不支持的文件格式，请上传.doc或.docx类型的文档。'
            })
          }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~styles/base.scss";
    .saas-wordUpload{
        @include responsive-default {
            width: 1000px;
            height: 700px;
            background-color:#fff;
            margin: 12px auto;
            border: 1px solid $border-color;
            font:$font-family-base;
            .saas-wordTitle{
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
                height: 49px;
                width: 49px;
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
            }
            .statusOne{
                color: #313131;
                font-size: 14px;
                padding-left: 5px;
            }
            .noStatus{
                display: inline-block;
                margin-left: 111px;
                color: #9aa5bc;
                font-size: 18px;
            }
            .upload-word-button{
              text-align: right;
                margin: 80px auto 0;
                width: 420px;
                height: 32px;
                line-height: 32px;
            }
            .upload-word-tip{
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
  .upload-word-button .lvx-upload{
    float:right;
  }
</style>
