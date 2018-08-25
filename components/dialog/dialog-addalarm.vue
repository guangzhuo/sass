<template>
 <sas-dialog
    :show.sync="visible"
    title="创建提醒"
    width="598px"
    class="add-alarm-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="form-panel">
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
          <lvx-form-item label="提醒信息" prop="text"> 
            <lvx-input v-model="ruleForm.text"></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="推送时间" prop="date">
            <lvx-date-picker class="date-time" type="date" placeholder="选择日期" v-model="ruleForm.date" ></lvx-date-picker>
          </lvx-form-item>
        </lvx-form>
      </div>  
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
        <sas-button category="gray"  @click="onClose" >退出</sas-button>
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
        text: '',
        date: new Date()
      },
      rules: {
        text: [
          { required: true, message: '请输入提醒信息', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择提醒时间', trigger: 'change' }
        ],
      }
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
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          alert('submit!');
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
.add-alarm-dialog{
  @include responsive-default {
    .content{
      .form-panel{
        width: 80%;
        margin: 45px auto 0;
        .date-time{
          width: 100%;
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

