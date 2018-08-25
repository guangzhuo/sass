<template>
<div class="remind-wraper">
 <sas-dialog
    :show.sync="visible"
    title="提醒列表"
    width="598px"
    class="remind-dialog"
    @close="closeDialog"
    >
    <div class="content">
        <lvx-table ref="multipleTable" :data="tableremind"
          tooltip-effect="dark" style="width: 100%">
          <lvx-table-column label="提醒信息" >
            <template slot-scope="scope">
              <lvx-popover trigger="hover" placement="top-start">
                <span>{{ scope.row.msgTitle }}</span>
                <div slot="reference" class="sas-text-overflow">
                  <span>{{ scope.row.msgTitle }}</span>
                </div>
              </lvx-popover>
            </template>
        </lvx-table-column>
        <lvx-table-column  label="推送时间" width="200" >
          <template slot-scope="scope">
            <span >{{scope.row.msgPushTime | __formatDataFilter}}</span>
          </template>
        </lvx-table-column>
        <lvx-table-column label="状态" width="100" >
         <template slot-scope="scope">
           <lvx-badge is-dot  v-if="scope.row.msgStatus == 0"><lvx-button type="text" @click="deleteMsgTask(scope.row.id)">删除</lvx-button></lvx-badge>
           <lvx-button type="text" @click="deleteMsgTask(scope.row.id)" v-else>删除</lvx-button>
         </template>
        </lvx-table-column>
    </lvx-table>
    <div slot="footer" class="dialog-footer">
      <lvx-button type="primary" @click="createvisible = true">创建提醒</lvx-button>
      <lvx-button type="primary" @click="$emit('update:show', false);">完成</lvx-button>
    </div>
    </div>
  </sas-dialog>
  <sas-dialog
    :show.sync="createvisible"
    title="创建提醒"
    width="598px"
    class="remind-dialog"
    @close="createvisible = false"
    >
    <div class="content">
      <lvx-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="creatform" :label-position="labelPosition">
          <lvx-form-item label="提醒信息:" prop="msgTaskTitle">
              <lvx-input v-model="ruleForm.msgTaskTitle" placeholder="请输入提醒信息" max="70"></lvx-input>
          </lvx-form-item>
          <lvx-form-item label="推送时间:" prop="alertTime">
              <lvx-date-picker align='left' :picker-options="pickerOptions" value-format="yyyy-MM-dd" :editable='false' v-model="ruleForm.alertTime" type="date" placeholder="请选择推送的时间"></lvx-date-picker>
          </lvx-form-item>
        </lvx-form>
    <div slot="footer" class="dialog-footer">
      <lvx-button type="primary" @click="addremind">确 定</lvx-button>
      <lvx-button type="primary" @click="createvisible = false">退 出</lvx-button>
    </div>
    </div>
  </sas-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import utils from '~/mixins/utils'
export default {
  mixins: [utils],
  data () {
    return {
      pickerOptions:{
        disabledDate(time){
            return time.getTime() < Date.now();
          //return (time.getTime() +  3600 * 1000 * 24) < Date.now();
        }
      },
      visible: this.show,
      createvisible: false,
      cidvalue: this.cid,
      tableremind:[],
      labelPosition:'right',
      ruleForm:{
        alertTime:'',
        msgTaskTitle:'',
      },
      rules: {
          msgTaskTitle: [
            { required: true, message: '请填写有效合同提醒的内容', trigger: 'blur' },
            { max: 64, message: '长度不能超过64个字符', trigger: 'blur' }
          ],
          alertTime:[
            { required: true, message: '请选择有效合同提醒时间', trigger: 'blur' },
          ],
    }
    }

  },
  computed: {
    ...mapState({

    })
  },
  props: {
    show: Boolean,
    cid:{
      type: [String,Number],
      required: true,
      default:'',
    }
  },
  mounted () {

  },
  watch: {
    show () {
      this.visible = this.show;
      if(this.visible){
        this.remindfetch();
      }else{
        this.$emit('update:cid', '')
        if(this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields();
        }
        this.tableremind = [];
      }
    }

  },
  methods: {
    closeDialog() {
      this.$emit('after-close');
      this.$emit('update:show', false);
    },
    deleteMsgTask(id){
      const self = this;
      self.$axios.post(apis.msgtaskdelete,{
          id: id
      }).then((res) => {
        if(res.data.code == 200){
          self.remindfetch();
        }else{
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText:"消息提醒删除失败,请重新删除"
            })
          }
      })


    },
    onCancel() {
      this.$emit('update:show', false);
    },
    async remindfetch(){
      const r = await this.$axios.get(apis.query, {params: {cid: this.cid}}).then((res)=>res.data);

      if(r.code == 200) {
        this.tableremind = r.data;
      }
    },
    cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + "...";
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + "...";
                }
            }
        }
        return s;
    },
    formatDate(time) {
      var day = new Date(time);
        var Year = 0, Month = 0, Day = 0, Hour = 0, Minutes = 0, Seconds = 0;
        var CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth() + 1;
        Day = day.getDate();
        Hour = day.getHours();
        Minutes = day.getMinutes();
        Seconds = day.getSeconds();
        CurrentDate += Year + "-";
        (Month >= 10) ? CurrentDate += Month + "-" : CurrentDate += "0" + Month + "-";
        (Day >= 10) ? CurrentDate += Day + " " : CurrentDate += "0" + Day + " ";
        CurrentDate += Hour + ":";
        (Minutes >= 10) ? CurrentDate += Minutes : CurrentDate += "0" + Minutes;

        return CurrentDate;
    },
    addremind(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const self = this;
            self.$axios.post(apis.addMsgTask,{
              cid: self.cid,
              msgTaskTitle: self.ruleForm.msgTaskTitle,
              alertTime: self.ruleForm.alertTime,
            }).then((res) => {
              if( res.data.code == 200 ){
                  self.createvisible = false;
                  this.remindfetch();
              }else{
                self.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:"消息提醒设置失败,请重新添加"
                });
              }

            });

          } else {
            return false;
          }
        });
    }
  }
}
</script>
<style lang="scss">
.remind-wraper{
  .remind-dialog{
    .lvx-table td, .lvx-table th{padding-left: 0px;}
    .lvx-table thead { color: #878d99;}
    .lvx-badge__content.is-fixed{
      top: 10px;
    }
  }
}

</style>
<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.remind-wraper{
  .remind-dialog{
    .content{
      .dialog-footer{
        margin: 16px 0px;
        height: 57px;
        text-align: center;
      }
      .creatform{
        margin: 30px 20px;
        text-align: left;
      }
    }
  }
}
</style>

