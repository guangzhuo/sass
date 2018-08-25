<template>
  <div class="contract-view">
    <div v-show="!showError" >
      <sas-editor-contract :postil-data="postilData" :contract-data="contractData" :contract-html="contractHtml" :model-type="state" @after-edit="afterEdit" :pid="pid"/>
    </div>
    
    <div class="error-wraper" v-show="showError" >抱歉，你无权进行这项操作！</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import apis from '~/config/api'
import editorContract from '~/components/contract/editor-contract'
export default {
  name: 'contract-view',
  metaInfo: {
    title: '合同查看-云合同'
  },
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'contract',
  data () {
    return {
      state: 'view',
      pid: this.$route.query.pid + '' || null
    }
  },
  async fetchData (to, context) {
    let self = context;
    let [pid = '', cid = ''] = [to.query.pid, to.query.cid];
    //console.log(this.$route.params.pid);
    const rt = await self.$axios.get(apis.getContractHtml, {
      params: {
        pid: pid
      }
    }).then((data)=> data);
   
    const r = await self.$axios.get(apis.getContract1, {
      params:{
        pid: pid
      }
    }).then((data)=> data.data);
   
    const rp = await self.$axios.get(apis.getPostil, {
      params:{
        cid: cid
      }
    }).then((data)=> data.data);
    
    self.$store.state.Contract.ContractView.contractHtml = rt.data;
    if(r.success) {
      self.$store.state.Contract.ContractView.contractData = {
        title:  r.data.contract.title,
        cid: r.data.contract.id,
        roleId: r.data.parter.roleId,
        rowsStatus: r.data.parter.rowsStatus,
        colsStatus: r.data.parter.colsStatus,
        fileList: r.data.fileList
      };
    } else {
      self.$store.state.Contract.ContractView.showError = true;
    }
    
    self.$store.state.Contract.ContractView.postilData = rp.list;
  },

  computed: {
    ...mapState({
      user: state => state.user,
      contractData: state=> state.Contract.ContractView.contractData,
      contractHtml: state=> state.Contract.ContractView.contractHtml,
      postilData: state=> state.Contract.ContractView.postilData,
      showError: state=> state.Contract.ContractView.showError
    })
  },
  filters: {

  },
  watch: {
  },
  mounted () {
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    destroy() {
      this.$store.state.Contract.ContractView.contractData = {
        fileList: []
      };
      this.$store.state.Contract.ContractView.contractHtml = '';
      this.$store.state.Contract.ContractView.postilData = [];
    },
    afterEdit() {
      this.$router.push({path: '/manage/contract/contract-edit', query: {pid: this.$route.query.pid}})
    }
  },
  components: {
    'sas-editor-contract': editorContract
  }
}
</script>

<style type="text/css">

</style>
<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .contract-view{
    @include responsive-default {
      .error-wraper{
        height: calc(100vh - 80px);
        background: #e6ecf5;
        text-align: center;
        padding-top: 20px;
      }
    }
  }

</style>
