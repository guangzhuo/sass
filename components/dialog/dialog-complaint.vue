<template>
 <sas-dialog
    :show.sync="visible"
    title="订单投诉"
    width="538px"
    class="complaint-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <div class="form-panel">
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form" label-position="top" size="small">
          <lvx-form-item label="希望:" prop="type">
            <sas-select :model.sync="ruleForm.type" placeholder="请选择"  class="select-type">
              <sas-option label="退款" value="1"></sas-option>
              <sas-option label="重做" value="2"></sas-option>
            </sas-select>
          </lvx-form-item>
          <lvx-form-item label="理由:" prop="reason" >
            <lvx-input type="textarea" v-model="ruleForm.reason" placeholder="你对我们的服务要说点什么？" :rows="6" :maxlength="500"></lvx-input>
          </lvx-form-item>
        </lvx-form>
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
export default {
  data () {
    return {
      visible: this.show,
      ruleForm: {
        type: '1',
        reason: ''
      },
      rules: {
        
      }
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  props: {
    show: Boolean,
    order: Object
  },
  mounted () {
  },
  watch: {
    show (newVal, oldVal) {
      this.visible = this.show;
      if(newVal) {
        this.$nextTick(()=> {
          this.$refs['ruleForm'].resetFields();
        })
      }
    }
    
  },
  methods: {
    onCancel() {
      this.$emit('update:show', false); 
    },
    onOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          const r = await this.$axios.get(apis.orderComplaint, {
            params: {
              orderId: this.order.id,
              wish: this.ruleForm.type,
              complainReason: this.ruleForm.reason
            }
          }).then((data)=>data.data);
          if(r.success) {
            this.$createMessage({
              type:'success',
              duration:3000,
              spinnerText: "投诉成功"
            });
            this.$emit('after-ok', true);
            this.$emit('update:show', false); 
          } else {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: "投诉失败"
            });
            this.$emit('after-ok', false);
            this.$emit('update:show', false); 
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.complaint-dialog{
  .content{
    .form-panel{
      width: 80%;
      margin: 0 auto;
      padding: 40px 0;
      .select-type{
         width: 100%;
      }
    }
    .actions{
      padding: 5px 0 20px 0;
      text-align: center;
    }
  }
}
</style>

