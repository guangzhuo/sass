<template>
 <sas-dialog
    :show.sync="visible"
    title="关联用户"
    width="658px"
    class="unlink-account-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="text">检测到你有<span class="home-span-h">{{unLinkAccount}}</span>个未关联的第三方平台用户</div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: this.show,
    }
  },
  computed: {
  },
  props: {
    show: Boolean,
    unLinkAccount: Number
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
.unlink-account-dialog{
  @include responsive-default {
    .content{
      .text{
        height: 200px;
        padding: 50px 0;
        font-size: 16px;
        text-align: center;
        .home-span-h{
          color: $theme-color;
        }
      }
      .action-panel{
        padding: 5px 12px 30px;
        text-align: center;
      }
    }
  }
}
</style>


