<template>
 <sas-dialog
    :show.sync="visible"
    title="添加失败"
    width="538px"
    class="attachment-fail-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="text">
        <i class="icon iconfont lvx-icon-error-f info-icon"></i>
        <span class="info-txt">附件格式错误，支持（doc,docx,pdf,xls,xlsx,gif,jpg,jpeg,bmp,png）</span>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
export default {
  data () {
    return {
      visible: this.show,
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean
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
  methods: {
    afterClose() {
      this.$emit('update:show', false);
    },
    onOk() {
      this.$emit('update:show', false);
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.attachment-fail-dialog{
  @include responsive-default {
    .content{
      .text{
        padding: 64px 0 58px;
        color: #646464;
        text-align: center;
        .info-icon{
          color: $red-color;
          font-size: 22px;
          vertical-align: middle;
          margin-right: 20px;
        }
        .info-txt{
          font-size: 12px;
        }
      }
      .action-panel{
        padding: 20px 12px 40px;
        text-align: center;
      }
    }
  }
}
</style>


