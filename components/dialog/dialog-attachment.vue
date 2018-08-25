<template>
  <div>
    <sas-dialog
      :show.sync="visible"
      title="附件列表"
      width="598px"
      class="attachment-dialog"
      @close="afterClose"
      >
      <div class="content">
        <lvx-upload
          ref="upload"
          :action="postUrl"
          :file-list="fileList"
          :auto-upload="false"
          :accept="fileAccept"
          :multiple="true"
          :limit="10"
          :size="1024*1024*10"
          :total-size="1024*1024*10"
          :on-change="handleChange"
          :on-total-spill="handleTotalSpill"
          :on-spill="handleSpill"
          :on-disallow="handleDisallow">
          <span slot="ready">等待上传</span>
          <sas-button slot="trigger" category="primary" class="btn-left">继续添加</sas-button>
          <sas-button category="secondary" class="btn-right" @click="uploadFiles">开始上传</sas-button>
        </lvx-upload>
      </div>
    </sas-dialog>
    <!-- <sas-add-fail-dialog :show.sync="dialogFailVisiable"/> -->
  </div>

</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import apis from '~/config/api'
import _ from 'lodash'
import mime from '~/mixins/mime'
import dialogAddFail from '~/components/dialog/dialog-attachment-fail'
let submited = false;
export default {
  data () {
    return {
      visible: this.show,
      fileList: this.files,
      fileAccept: mime.contractAttachment,
      dialogFailVisiable: false
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  props: {
    show: Boolean,
    trigger: Boolean,
    files: {
      type: Array,
      default:  function () {
        return [];
      }
    },
    postUrl: {
      type: String,
      required: true
    },
    alreadyUploadFilesCount: {
      type: Number,
      default: 0
    }
  },
  mounted () {
  },
  watch: {
    show () {
      this.visible = this.show;
    },
    files(newVal, oldVal) {
      if(newVal.length) {
        this.fileList = newVal;
        setTimeout(()=>{
          _.forEach(this.fileList, (v)=>{
            // if(v.uid == newVal[0].uid) {
            // }
            v.status = 'ready';
          });
        },0);
      }
    },
    // cid(newVal, oldVal) {
    //   if(newVal) {
    //     this.postUrl = `${apis.addFilesContract}?contractId=${newVal}`;
    //   }
    // }
  },
  methods: {
    uploadFiles() {
      if(this.fileList.length) {
        // _.forEach(this.fileList, (v)=>{
        //   if(v.uid == this.files[0].uid) {
        //     v.status = 'ready';
        //   }
        // });
        this.$refs.upload.submit();
        this.$emit('update:files', []);
        submited = true;
      }
    },
    afterClose() {
      this.fileList = [];
      this.$emit('update:show', false);
      this.$emit('update:files', []);
      if(submited) {
        location.reload();
      }
    },
    handleDisallow() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件格式错误，支持(doc,docx,pdf,xls,xlsx,gif,jpg,jpeg,bmp,png)'
      });
      // this.dialogFailVisiable = true;
    },
    handleSpill() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件大小超过10M,超过部分未添加'
      });
    },
    handleTotalSpill() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件总大小超过10M,超过部分未添加'
      });
    },
    handleChange(file, fileList) {
      if((this.alreadyUploadFilesCount + fileList.length) > 10) {

        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'附件总数不超过10个'
        });
        fileList.splice(10 - this.alreadyUploadFilesCount);
      }
    }
  },
  components: {
    'sas-add-fail-dialog': dialogAddFail
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.attachment-dialog{
  @include responsive-default {
    .content{
      .btn-left{
        position: absolute;
        bottom: 25px;
        left: calc( 50% - 10px );
        transform: translateX(-100%);
        // padding-right: 10px;
      }
      .btn-right{
        position: absolute;
        bottom: 25px;
        left: 50%;
        margin-left: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
  .attachment-dialog{
    .content{
      .lvx-upload-list{
        margin-top: -34px;
        padding-bottom: 100px;
        a{
          &:hover{
            text-decoration: none;
          }
          
        }
      }
    }
  }
</style>

