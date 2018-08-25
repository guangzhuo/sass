<template>
  <div>
    <sas-dialog
      :show.sync="visible"
      title="提交合同审查成果"
      width="366px"
      class="submit-review-work-dialog"
      @close="afterClose"
      >
      <div class="content">
        <div class="contract-box">
          <div class="contract">
            <label>合同标题:</label>
            <span class="title">{{`《${serviceOrder.contractTitle}》`}}</span>
          </div>
          <div class="retain">
            <lvx-checkbox v-model="retainCopyChecked"><span >保留副本</span></lvx-checkbox>
          </div>
        </div>
        <div class="action-panel">
          <sas-button category="primary" size="medium" @click="onOk">确定</sas-button>
          <sas-button category="gray" size="medium" @click="onClose">取消</sas-button>
        </div>
      </div>
    </sas-dialog>
  </div>
 
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'

export default {
  data () {
    return {
      visible: this.show,
      retainCopyChecked: true,
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean,
    serviceOrder: Object
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
    async onOk() {
      const r = await this.$axios.get(apis.submitWork, {
        params: {
          orderId: this.serviceOrder.orderId,
          contractTitle: this.serviceOrder.contractTitle,
          pid: this.serviceOrder.pid,
          retain: this.retainCopyChecked
        }
      }).then((data)=>data.data);
      if(r.success) {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: "提交成功"
        });
        this.$emit('update:show', false);
        this.$emit('after-submit', true)
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    }

  },
  components: {
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.submit-review-work-dialog{
  @include responsive-default {
    .content{
      .contract-box{
        width: 60%;
        margin: 0 auto;
        padding: 40px 0;
        .contract{
          margin: 20px 0;
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

