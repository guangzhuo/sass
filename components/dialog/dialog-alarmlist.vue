<template>
 <sas-dialog
    :show.sync="visible"
    title="提醒列表"
    width="598px"
    class="alarmlist-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="table-box">
        <lvx-table
          :data="alarmList"
          style="width: 100%"
          height="300">
          <lvx-table-column
            label="提醒信息"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.msgTitle }}</span>
            </template>
          </lvx-table-column>
          <lvx-table-column
            label="推送时间"
            >
            <template slot-scope="scope">
              <span>{{ scope.row.msgPushTime | __formatDataFilter}}</span>
            </template>
          </lvx-table-column>
          <lvx-table-column label="状态">
            <template slot-scope="scope">
              <lvx-button
                size="mini"
                type="danger"
                >删除</lvx-button>
                <i class="iconsprite icon-status-red" v-show="scope.row.msgStatus == 0"></i>
            </template>
          </lvx-table-column>
        </lvx-table>
      </div>  
      <div class="action-panel">
        <sas-button category="primary"  @click="onAdd">创建提醒</sas-button>
        <sas-button category="primary"  @click="onClose" style="width:98px;">完成</sas-button>
      </div>
    </div>
    
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'
import { Utils } from '~/extend/mixins'

export default {
  data () {
    return {
      visible: this.show,
      alarmList: [],
     
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean,
    cid: {
      type: String,
      required: true
    }
  },
  created() {
   
  },
  mounted () {
    this.fetchData();
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  },
  mixins: [Utils],
  methods: {
    async fetchData() {
      const r = await this.$axios.get(apis.query, {params: {cid: this.cid}}).then((data)=>data.data.data);
      this.alarmList = r;
    },
    afterClose() {
      this.$emit('update:show', false);
    },
    onClose() {
      this.$emit('update:show', false);
    },
    onAdd() {
      this.$emit('after-add');
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.alarmlist-dialog{
  @include responsive-default {
    .content{
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

