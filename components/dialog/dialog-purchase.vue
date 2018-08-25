<template>
 <sas-dialog
    :show.sync="visible"
    title="购买套餐"
    width="430px"
    class="purchase-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <p class="label-line">你的合同签署份数不够</p>
      <div class="action-panel">
        <sas-button category="gray" class="btn" @click="onCancel">取消</sas-button>
        <sas-button category="primary" class="btn" @click="onOk">立即购买</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      visible: this.show
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  props: {
    show: Boolean
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
    onCancel() {
      this.$emit('update:show', false); 
    },
    onOk() {
      this.$emit('update:show', false); 
      this.$router.push({path: '/manage/user/manage/signature'});
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.purchase-dialog{
  .content{
    .label-line{
      padding: 40px 0;
      font-size: 12px;
      text-align: center;
    }
    .action-panel{
      padding-bottom: 20px;
      text-align: center;
      & button:first-child{
        margin-right: 35px;
        width: 98px;
      }
    }
  }
}
</style>

