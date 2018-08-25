<template>
 <sas-dialog
    :show.sync="visible"
    :title="title"
    width="598px"
    class="watchlist-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="table-box">
        <lvx-table
          :data="watcherList"
          tooltip-effect="dark"
          style="width: 100%"
          height="155"
          @selection-change="handleChange"
          >
          <lvx-table-column
            type="selection"
            width="55">
          </lvx-table-column>
          <lvx-table-column
            prop="toUids"
            label="查看人"
            >
          </lvx-table-column>
          <lvx-table-column
            label="时间"
            >
            <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
          </lvx-table-column>
        </lvx-table>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onOk">确定</sas-button>
        <sas-button category="gray"  @click="onClose">取消</sas-button>
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
      watcherList: [],
      selectionList: []
    }
  },
  computed: {
    ...mapState({
    })
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: ''
    },
    pid: {
      type: [String, Number],
    }
  },
  created() {

  },
  mounted () {

    // this.fetchData();
  },
  watch: {
    show (newVal, oldVal) {
      this.visible = this.show;
      if(newVal) {
        this.fetchData()
      }
    }

  },
  methods: {
    async fetchData() {
      const r = await this.$axios.get(apis.l_getViews, {params: {pid: this.pid}}).then((data)=>data.data.data);
      if(r.list == undefined){
        this.$emit('update:show', false);
        setTimeout(()=>{
            location.reload();
        }, 2000);
        return;
      }
      this.watcherList = r.list;
    },
    afterClose() {
      this.$emit('update:show', false);
    },
    onClose() {
      this.$emit('update:show', false);
    },
    async onOk() {
      if(!this.selectionList.length) {
        this.$createMessage({
          type:'warning',
          duration:3000,
          spinnerText: "未作任何操作"
        });
      } else {
        let postData = {
          pid: this.pid
        };
        this.selectionList.forEach((v, i)=>{
          postData[`users[${i}]`] = v.userId;
        });
        const r = await this.$axios.post(apis.delect_contractViewAuth, postData).then((data)=>data.data);
        if(r.success) {
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: "操作成功"
          });
          this.fetchData();

        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
          setTimeout(()=>{
            location.reload();
          }, 2000);
        }

      }
    },
    handleChange(selection) {
      this.selectionList = selection;
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.watchlist-dialog{
  @include responsive-default {
    .content{
      .action-panel{
        padding-bottom: 20px;
        padding-top: 5px;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="scss">
</style>

