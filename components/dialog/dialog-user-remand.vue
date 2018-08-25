<template>
 <sas-dialog
    :show.sync="visible"
    title="用户需求"
    width="598px"
    class="user-remand-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="form-panel">
        <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
          <lvx-form-item label="用户姓名:" > 
            <lvx-input v-model="serviceOrder.userName" readonly></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="合同名称:" >
             <lvx-input v-model="serviceOrder.contractTitle" readonly></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="用户需求:" >
            <lvx-input type="textarea" v-model="serviceOrder.demand" readonly></lvx-input>
          </lvx-form-item>
        </lvx-form>
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
import _ from 'lodash'

export default {
  data () {
    return {
      visible: this.show,
      ruleForm: {
        name: this.serviceOrder.userName,
        title: this.serviceOrder.contractTitle,
        remand: this.serviceOrder.demand
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
    serviceOrder: {
      type: Object ,
      required: true
    }
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
.user-remand-dialog{
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
<style lang="scss">
</style>

