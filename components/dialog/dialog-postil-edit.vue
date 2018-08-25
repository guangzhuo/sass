<template>
  <sas-dialog
    :show.sync="visible"
    :title="title"
    width="540px"
    class="postil-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <div class="textarea-box">
        <lvx-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="inputV">
        </lvx-input>
      </div>
      <div class="actions">
        <sas-button category="primary" size="medium" @click="onOk">确定</sas-button>
        <sas-button category="gray" size="medium" @click="onCancel">取消</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: this.show,
      inputV: this.content
    }
  },
  computed: {
    title() {
      let r = ()=>{
        switch(this.type) {
          case 'add':
            return '添加批注';
            break;
          case 'update':
            return '修改批注';
            break;
        };
      }
      return r();
    }
  },
  props: {
    show: Boolean,
    type: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  mounted () {

  },
  watch: {
    show () {
      this.visible = this.show;
    },
    content(newVal, oldVal) {
      this.inputV = newVal;
    }
  },
  methods: {
    onOk() {
      this.$emit('update:show', false);
      this.$emit('after-ok', this.type, this.inputV);
    },
    onCancel() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.postil-dialog{
  .content{
    .textarea-box{
      padding: 20px;
    }
    .actions{
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
</style>

