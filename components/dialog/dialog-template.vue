<template>
  <sas-dialog
    :show.sync="visible"
    title="请选择相应的模板"
    width="798px"
    class="template-dialog"
    @close="$emit('update:show', false)"
  >
    <div class="content">
      <div class="search">
        <sas-search-input @after-search="onSearch" placeholder="请输入模板名称" v-model="templateName"/>
      </div>
      <div class="tabs">
        <lvx-tabs v-model="activeName" >
          <lvx-tab-pane label="我的模板" name="first" class="tab-panel">
            <lvx-table
              ref="mtTable"
              v-loading="loading"
              :data="mtData"
              style="width: 100%"
              :headerRowStyle="theaderStyle"
              :headerCellStyle="theaderCellStyle"
              :cell-style="tcellStyle"
              :row-style="trowStyle"
              highlight-current-row
              
              @current-change="mtRowChange">
              <lvx-table-column
                label="标题"
              
                >
                <template slot-scope="scope">
                  <div class="sas-text-overflow" style="padding-left: 20px;">
                    <span >{{ scope.row.name }}</span>
                  </div>
                </template>
              </lvx-table-column>
              <lvx-table-column label="创建时间">
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <span>{{ scope.row.gmtCreate }}</span>
                  </div>
                </template>
              </lvx-table-column>
              <lvx-table-column label="选定" >
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <i class="iconsprite icon-row-select" v-show="scope.row == mtCurrentRow"></i>
                  </div>
                </template>
              </lvx-table-column>
              <div class="empty-wraper" slot="empty" style="background: #f9f9f9;height: 100%;">
                <img src="~assets/img/src/common/noData.png" alt="">
                <p class="text-bottom" style="margin-right: 45px;">没有找到匹配的记录</p>
              </div>
            </lvx-table>
            <div class="pagination-box sas-align-right">
              <sas-pagination :total="mtTotal" v-if="mtTotal > 5" :page-size="pageSize" @current-change="mtPageChange"></sas-pagination>
            </div>
          </lvx-tab-pane>
          <lvx-tab-pane label="系统模板" name="second" class="tab-panel">
            <lvx-table
              ref="stTable"
              v-loading="loading"
              :data="stData"
              style="width: 100%"
              :headerRowStyle="theaderStyle"
              :headerCellStyle="theaderCellStyle"
              :cell-style="tcellStyle"
              :row-style="trowStyle"
              highlight-current-row
              @current-change="stRowChange">
              <lvx-table-column
                label="标题"
               
                >
                <template slot-scope="scope">
                  <div class="sas-text-overflow" style="padding-left: 20px;">
                    <span >{{ scope.row.name }}</span>
                  </div>
                </template>
              </lvx-table-column>
              <lvx-table-column label="创建时间" >
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
                  </div>
                </template>
              </lvx-table-column>
              <lvx-table-column label="选定" >
                <template slot-scope="scope">
                  <div style="text-align:center">
                    <i class="iconsprite icon-row-select" v-show="scope.row == stCurrentRow"></i>
                  </div>
                </template>
              </lvx-table-column>
              <div class="empty-wraper" slot="empty" style="background: #f9f9f9;height: 100%;">
                <img src="~assets/img/src/common/noData.png" alt="">
                <p class="text-bottom" style="margin-right: 45px;">没有找到匹配的记录</p>
              </div>
            </lvx-table>
            <div class="pagination-box sas-align-right">
              <sas-pagination :total="stTotal" v-if="stTotal > 5" :page-size="pageSize" @current-change="stPageChange"></sas-pagination>
            </div>

          </lvx-tab-pane>
        </lvx-tabs>
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
import searchInput from '~/components/common/search-input'
export default {
  data () {
    return {
      visible: this.show,
      activeName: 'first',
      loading: true,
      mtData: [],
      stData: [],
      mtTotal: 0,
      stTotal: 0,
      tcellStyle: {
        padding: '13px 0'
      },
      trowStyle: {
        cursor: 'pointer'
      },
      pageSize: 5,
      mtCurrentRow: null,
      stCurrentRow: null,
      templateName: ''
    }
  },
  props: {
    show: Boolean
  },
  components: {
    'sas-search-input': searchInput
  },
  computed: {
    ...mapState({
      theaderStyle: state => state.UI.table.headerStyle,
      // theaderCellStyle: state => state.UI.table.headerCellStyle
    }),
    theaderCellStyle() {
      return {
        padding: '8px 0',
        textAlign: 'center'

      }
    }
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
      Promise.all([this.getmtList(), this.getstList()])
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
    onOk() {
      let currentRow = this.activeName === 'first' ? this.mtCurrentRow : this.stCurrentRow;
      if(!currentRow) {
        return ;
      }
      this.$emit('update:show', false); //关闭窗体
      this.$emit('open', currentRow.id); //返回选择的模板id
    },
    async getmtList(pageNumber = 1, tName = '') {
      const r = await this.$axios.get(apis.getmtList, {
        params: {
          type: true,
          tName: tName,
          offset: (pageNumber - 1) * 5,
          limit: 5
        }
      })
      .then((data) => data.data.data)
      .catch((error) =>{
        console.log(error);
      })
      this.mtData = r.rows;
      this.mtTotal = r.total;
      return r;
    },
    async getstList(pageNumber = 1, tName = '') {
      const r = await this.$axios.get(apis.getmtList, {
        params: {
          type: false,
          tName: tName,
          offset: (pageNumber - 1) * 5,
          limit: 5
        }
      })
      .then((data) => data.data.data)
      .catch((error) =>{
        console.log(error);
      })
      this.stData = r.rows;
      this.stTotal = r.total;
      return r;
    },
    async mtPageChange(cp) {
      this.loading = true;
      const r = await this.getmtList(cp, this.templateName)
      if(r.total) {

        this.loading = false;
      }
    },
    async stPageChange(cp) {
      this.loading = true;
      const r = await this.getstList(cp, this.templateName)
      if(r.total) {
        this.loading = false;
      }
    },
    mtRowChange(currentRow, oldCurrentRow) {
      this.mtCurrentRow = currentRow;
    },
    stRowChange(currentRow, oldCurrentRow) {
      this.stCurrentRow = currentRow;
    },
    async onSearch() {
      this.loading = true;
      switch(this.activeName) {
        case 'first':
          let rf = await this.getmtList(1, this.templateName)
          if(rf.pageNo) {
            this.loading = false;
          }
        break;
        case 'second':
          let rs = await this.getstList(1, this.templateName)
          if(rs.pageNo) {
            this.loading = false;
          }
        break;
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.template-dialog{
  .content{
    .search{
      right: 65px;
      position: absolute;
      z-index: 1;
    }
    .tabs{
      margin-top: 10px;
      .tab-panel{
        height: 339px;
        position: relative;
      }

    }
    .actions{
      text-align: center;
      padding-bottom: 10px;
      padding-top: 5px;
    }
    .pagination-box{
      margin-top: 15px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
<style lang="scss" type="text/scss">
.template-dialog{
  .lvx-tabs{
    height: 386px;
    .lvx-tabs__header{
      padding-left: 30px;
    }
    .lvx-tabs__nav-wrap::after{
      background-color: unset;
    }
  }
}
  
</style>

