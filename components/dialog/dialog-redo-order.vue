<template>
 <sas-dialog
    :show.sync="visible"
    title="联系修改"
    width="598px"
    class="redo-order-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="form-panel">
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-suffix=":">
          <lvx-form-item label="合同名称" >
            <lvx-input v-model="ruleForm.title" readonly></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="律师手机" >
             <lvx-input v-model="ruleForm.phone" readonly></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="修改意见" prop="desc">
            <lvx-input type="textarea" v-model="ruleForm.desc" :rows="6" :maxlength="500"></lvx-input>
          </lvx-form-item>
        </lvx-form>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
        <sas-button category="gray"  @click="onClose" >取消</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'

export default {
  data () {
    return {
      visible: this.show,
      ruleForm: {
        title: '',
        phone: '',
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '请输入修改意见', trigger: 'blur' },
          { maxlength: 500, message: '修改意见最多输入500个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean,
    order: {
      type: Object,
      required: true
    }
  },
  created() {

  },
  mounted () {
    
  },
  watch: {
    show (newVal, oldVal) {
      this.visible = this.show;
      if(newVal) {
        this.fetchData();
      } else {
        this.$refs['ruleForm'].resetFields();
      }
    }
  },
  mixins: [{

  }],
  methods: {
    async fetchData() {
      const r = await this.$axios.get(apis.order_contract, {params: {orderId: this.order.id}}).then((res)=>res.data);
      if(r.success) {
        this.ruleForm.title = r.data.contractTitle;
        this.ruleForm.phone = r.data.cellNum;
      }
    },
    afterClose() {
      this.$emit('update:show', false);
    },
    onClose() {
      this.$emit('update:show', false);
    },
    async onOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          const r = await this.$axios.post(apis.unagree, {
            orderId: this.order.id,
            demand: this.ruleForm.desc
          }).then((res)=>res.data);
          if(r.success) {
            this.$emit('after-unagree');
            this.$emit('update:show', false);
          }
        } else {
          return false;
        }
      });
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.redo-order-dialog{
  @include responsive-default {
    .content{
      .form-panel{
        width: 80%;
        margin: 45px auto 0;
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


