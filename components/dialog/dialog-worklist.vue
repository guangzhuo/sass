<template>
  <sas-dialog
    :show.sync="visible"
    title="提交成果"
    width="798px"
    class="worklist-dialog"
    @close="$emit('update:show', false)"
  >
    <div class="content">
      <div class="table-box">
        <lvx-table
          ref="workTable"
          v-loading="loading"
          :data="workData"
          style="width: 100%"
          :headerRowStyle="theaderStyle"
          :headerCellStyle="theaderCellStyle"
          :cell-style="tcellStyle"
          :row-style="trowStyle"
          highlight-current-row
          @current-change="rowChange">
          <lvx-table-column
            label="标题"
            width="333"
            >
            <template slot-scope="scope">
              <div class="sas-text-overflow">
                <span >{{ scope.row.title }}</span>
              </div>
            </template>
          </lvx-table-column>
          <lvx-table-column label="修改时间" width="333">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.gmtModify }}</span>
            </template>
          </lvx-table-column>
          <lvx-table-column label="选定">
            <template slot-scope="scope">
              <i class="iconsprite icon-row-select" v-show="scope.row == currentRow"></i>
            </template>
          </lvx-table-column>
        </lvx-table>
        <div class="pagination-box clearfix">
          <div class="retain sas-float-left">
            <lvx-checkbox v-model="retainCopyChecked"><span style="color: #555;">保留副本,记录工作成果</span></lvx-checkbox>
          </div>
          <sas-pagination class="sas-float-right" :total="total" v-if="total > 5" :page-size="pageSize" @current-change="pageChange"></sas-pagination>
        </div>
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
      loading: true,
      workData: [],
      total: 0,
      tcellStyle: {
        padding: '13px 0'
      },
      trowStyle: {
        cursor: 'pointer'
      },
      pageSize: 8,
      currentRow: null,
      retainCopyChecked: true
    }
  },
  props: {
    show: Boolean,
    orderId: [String, Number]
  },
  computed: {
    ...mapState({
      theaderStyle: state => state.UI.table.headerStyle,
      theaderCellStyle: state => state.UI.table.headerCellStyle
    })
  },
  created() {
    if(this.show) {
      this.showInit();
    }
  },
  mounted () {
  },
  watch: {
    show (val) {
      this.visible = this.show;
      if(val) {
        this.showInit();
      } else {
        this.hideInit();
      }
    }
  },
  methods: {
    showInit() {
      Promise.all([this.getList()])
      .then(()=>{
        this.loading = false;
      })
    },
    hideInit() {
      this.loading = true
    },
    onCancel() {
      this.$emit('update:show', false)
    },
    async onOk() {
      if(this.currentRow) {
        const r = await this.$axios.get(apis.submitWork, {params: {
          orderId: this.orderId,
          contractTitle: this.currentRow.title,
          pid: this.currentRow.id,
          retain: this.retainCopyChecked
        }}).then((data)=>data.data);
        if(r.success) {
          location.reload();
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
          this.$emit('update:show', false); //关闭窗体
        }
      } else {
        // this.$emit('update:show', false); //关闭窗体
      }
      
      
      // this.$emit('open', currentRow.id); //返回选择的模板id
    },
    async getList(pageNumber = 1) {
      const r = await this.$axios.get(apis.getWorkList, {
        params: {
          hon: 1,
          offset: (pageNumber - 1) * 8,
          limit: 8
        }
      })
      .then((data) => data.data)
      .catch((error) =>{
        
      });
      if(r.success) {
        this.workData = r.data.rows;
        this.total = r.data.total;
      }
      return r;
    },
    async pageChange(cp) {
      this.loading = true;
      const r = await this.getList(cp)
      if(r.data.total) {
        this.loading = false;
      }
    },
    rowChange(currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.worklist-dialog{
  .content{
    .table-box{
      height: 494px;
      position: relative;
    }
    .actions{
      text-align: center;
      padding-bottom: 10px;
      padding-top: 30px;
    }
    .pagination-box{
      margin-top: 15px;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      .retain{
        margin-left: 30px;
      }
    }
  }
}
</style>
<style lang="scss" type="text/scss">
  
</style>

