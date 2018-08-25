<template>
 <sas-dialog
    :show.sync="visible"
    title="创建签名"
    width="368px"
    class="no-signet-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="info-panel">
        <i class="icon iconfont lvx-icon-warn-f"></i> <span>你还未创建自己的签名</span>
      </div>  
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
        <sas-button category="gray"  @click="onClose" >取消</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: this.show
    }
  },
  computed: {
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
      this.$emit('update:show', false);
      this.$router.push({path: '/manage/user/sign/signName'});
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.no-signet-dialog{
  @include responsive-default {
    .content{
      .info-panel{
        padding: 36px 0;
        font-size: 12px;
        text-align: center;
        color: #313131;
        .icon{
          margin-right: 20px;
          vertical-align: middle;
          color: $orange-color;
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

