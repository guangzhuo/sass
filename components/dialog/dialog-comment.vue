<template>
 <sas-dialog
    :show.sync="visible"
    title="服务评价"
    width="538px"
    class="comment-dialog"
    @close="$emit('update:show', false)"
    >
    <div class="content">
      <div class="form-panel">
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form" label-position="top" size="small">
          <lvx-form-item label="" prop="comment" >
            <lvx-input type="textarea" v-model="ruleForm.comment" placeholder="你对我们的服务要说点什么？" :rows="6" :maxlength="500"></lvx-input>
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
        comment: ''
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
          const r = await this.$axios.get(apis.appraisal, {
            params: {
              orderId: this.order.id,
              appraisal: '1',
              comment: this.ruleForm.comment
            }
          }).then((data)=>data.data);
          if(r.success) {
            this.$createMessage({
              type:'success',
              duration:3000,
              spinnerText: "评价成功"
            });
            this.$emit('after-ok', true);
            this.$emit('update:show', false); 
          } else {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: "评价失败"
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
.comment-dialog{
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

