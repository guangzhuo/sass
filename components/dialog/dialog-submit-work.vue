<template>
  <div>
    <sas-dialog
      :show.sync="visible"
      title="提交成果"
      width="598px"
      class="submit-work-dialog"
      @close="afterClose"
      >
      <div class="content">
        <div class="btns">
          <div class="my-contract-btn sas-cursor-pointer" @click="onMyContract">
            <div class="order-myorder">我的合同</div>
          </div>
          <div class="local-contract-btn sas-cursor-pointer" @click="onWorkUpload">
            <div class="order-local">本地上传</div>
          </div>
          <input type="file" name="" ref="add-files" style="display:none;" @change="onOpenWorkUploadDialog">
        </div>
        <div class="action-panel">
          <sas-button category="gray"  @click="onClose">取消</sas-button>
        </div>
      </div>
    </sas-dialog>
    <sas-worklist-dialog :show.sync="dialogWorkListVisible" :orderId="serviceOrder.orderId"/>
    <sas-workupload-dialog :show.sync="dialogWorkUploadVisible" :file-upload="fileUpload" :orderId="serviceOrder.orderId"/>
  </div>
 
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import dialogWorkList from '~/components/dialog/dialog-worklist'
import dialogWorkUpload from '~/components/dialog/dialog-work-upload'
export default {
  data () {
    return {
      visible: this.show,
      dialogWorkListVisible: false,
      dialogWorkUploadVisible: false,
      fileUpload: new File(["",""], '')
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean,
    serviceOrder: {
      type: Object
    }
  },
  created() {
   
  },
  mounted () {
    
  },
  watch: {
    show () {
      this.visible = this.show;
    }

  },
  mixins: [{
    
  }],
  methods: {
    afterClose() {
      this.$emit('update:show', false);
    },
    onClose() {
      this.$emit('update:show', false);
    },
    onMyContract() {
      this.dialogWorkListVisible = true;
      this.$emit('update:show', false);
    },
    onOpenWorkUploadDialog(raw) {
      let file = raw.target.files[0];
      let d = file.name.lastIndexOf("\."); 
      if(file.size == 0) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '不能上传空文件。'
        });
        return false;
      } else if (file.size > 1024*1024*10) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '上传文件大小不能大于10M，请重新选择文件。'
        });
        return false;
      } else if (file.name.substr(0,d).length > 64) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '文件名称不能超过64个字符，请修改文件名称后重新上传！'
        });
        return false;
      } else if (file.name.search('.doc') < 0 || file.name.search('.docx') < 0) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '不支持的文件格式，请上传.doc .docx类型的文档。'
        });
        return false;
      } 
      this.fileUpload = file;
      this.dialogWorkUploadVisible = true;
      this.$emit('update:show', false);
      this.$refs['add-files'].value = null;
    },
    onWorkUpload() {
      this.$refs['add-files'].click();
    }
    
  },
  components: {
    'sas-worklist-dialog': dialogWorkList,
    'sas-workupload-dialog': dialogWorkUpload
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.submit-work-dialog{
  @include responsive-default {
    .content{
      .btns{
        padding: 40px 0;
        .my-contract-btn{
          margin: 0 auto;
          width: 50%;
          padding: 30px 0 30px;
          .order-myorder{
            border: 1px solid #4081ff;
            color: #4081ff;
            width: 100%;
            padding: 10px 0;
            border-radius: 4px;
            text-align: center;
            font-size: 16px;
            &:hover{
              background-color: $theme-color;
              color: #fff;
            }
          }
        }
        .local-contract-btn{
           margin: 0 auto;
           width: 50%;
          .order-local{
            border: 1px solid #4081ff;
            color: #4081ff;
            width: 100%;
            padding: 10px 0;
            border-radius: 4px;
            text-align: center;
            font-size: 16px;
            &:hover{
              background-color: $theme-color;
              color: #fff;
            }
          }
        }
      }
      .action-panel{
        padding-bottom: 30px;
        padding-top: 5px;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="scss">
</style>

