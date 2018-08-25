<template>
  <sas-dialog
    :show.sync="visible"
    title="提交成果"
    width="798px"
    class="work-upload-dialog"
    @close="$emit('update:show', false)"
  >
    <div class="content">
      <div class="file-box">
        <div class="file-icon"><i class="iconsprite icon-order-upload"></i></div>
        <div class="file-name">
          {{fileUpload.name}}
        </div>
        <div class="result-box">
          <div class='progress'  v-if="inprogress">
            <div class='progress-bar  progress-bar-striped active' role='progressbar' style='width:100%'></div>
            上传中
          </div>
          <div class="completed" v-else>上传成功</div>
        </div>
        <div class="retain" v-if="!inprogress">
          <lvx-checkbox v-model="retainCopyChecked"><span style="color: #555;">保留副本,记录工作成果</span></lvx-checkbox>
        </div>
      </div>
      <div class="actions">
        <sas-button category="primary" size="medium" @click="onOk">确定</sas-button>
        <sas-button category="gray" size="medium" @click="onCancel">取消</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import axios from 'axios'
export default {
  data () {
    return {
      visible: this.show,
      retainCopyChecked: true,
      inprogress: true,
      uuid: '',
      contractTitle: ''
    }
  },
  props: {
    show: Boolean,
    fileUpload: File,
    orderId: [String, Number]
  },
  computed: {
    ...mapState({
   
    })
  },
  created() {
    if(this.show) {
      this.showInit();
    }
  },
  mounted () {
  },
  watch: {
    show (val) {
      this.visible = this.show;
      if(val) {
        this.showInit();
      } else {
        this.hideInit();
      }
    }
  },
  methods: {
    showInit() {
      this.autoUploadFile();
    },
    hideInit() {
    },
    onCancel() {
      this.$emit('update:show', false)
    },
    async onOk() {
      if(this.uuid) {
        const r = await this.$axios.get(apis.submitWork, {
          params: {
            orderId: this.orderId,
            contractTitle: this.contractTitle,
            uuid: this.uuid,
            retain: this.retainCopyChecked
          }
        }).then((data)=>data.data);
        if(r.success) {
          location.reload();
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
          this.$emit('update:show', false); //关闭窗体
        }
      }
    },
    async autoUploadFile() {
      let formData = new FormData();
      formData.append('token', 'lvxuntoken');
      formData.append('meta', 'true');
      formData.append('mode', 'private');
      formData.append('file', this.fileUpload);
      const r = await axios({
        url: apis.setUpload,
        data: formData,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((data)=>data.data);
      if(r.code == 200) {
        this.inprogress = false;
        this.uuid = r.uuid;
        this.contractTitle = r.name.replace(`.${r.ext}`, '');
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.work-upload-dialog{
  .content{
    .file-box{
      text-align: center;
      width: 200px;
      margin: 0 auto;
      .file-icon{
        font-size: 0px;
        line-height: 1;
      }
      .result-box{
        .progress{
          height: 12px;
          width: 50%;
          background: #f0f3f8;
          overflow: visible;
          border-radius: 20px;
          margin: 0 auto 5px;
          .progress-bar{
            border-radius: 20px;
          }
        }
      }
    }
    .actions{
      text-align: center;
      padding-bottom: 10px;
      padding-top: 30px;
    }
  }
}
</style>
<style lang="scss" type="text/scss">
  
</style>

