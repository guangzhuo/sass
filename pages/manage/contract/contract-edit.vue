<template>
  <div class="contract-edit">
    <sas-editor-contract v-show="!showError" :isOpenTemplate="isOpenTemplate" :contract-data.sync="contractData" :contract-html="contractHtml" :model-type="state" @after-save="onAfterSave" @after-sign="onAfterSign" :pid="pid"/>
    <div class="error-wraper" v-show="showError">抱歉，你无权进行这项操作！</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import apis from '~/config/api'
import editorContract from '~/components/contract/editor-contract'
export default {
  name: 'contract-edit',
  metaInfo: {
    title: '合同编辑-云合同'
  },
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'contract',
  data () {
    return {
      state: _.isEmpty(this.$route.query) || this.$route.query.uuid || this.$route.query.ttid || this.$route.query.tid ? 'create' : 'edit',
      // pid: this.$route.query.tid
      isOpenTemplate: this.$route.query.tid === '1', //是否打开模板弹窗
      pid: this.$route.query.pid || null
    }
  },
  async fetchData (to, context) {
    let self = context;
    let [pid = '', uuid = '', ctit = '', userId = '', ttid = '', name = ''] = [to.query.pid, to.query.uuid, to.query.ctit, to.query.userId, to.query.ttid, to.query.name];
    if(pid) {
      const rt = await self.$axios.get(apis.getContractHtml, {
        params: {
          pid: pid
        }
      }).then((data)=> data);
      
      const r = await self.$axios.get(apis.getContract, {
        params:{
          pid: pid
        }
      }).then((data)=> data.data);
      
      self.$store.state.Contract.ContractEdit.contractHtml = rt.data;
      if(r.success) {
        self.$store.state.Contract.ContractEdit.contractData['title'] = r.data.contract.title;
        self.$store.state.Contract.ContractEdit.contractData['cid'] = r.data.contract.id;
        self.$store.state.Contract.ContractEdit.contractData.fileList = r.data.fileList;
      } else {
        self.$store.state.Contract.ContractEdit.showError = true;
      }
      

    } else if (uuid) {
      const rt = await self.$axios.get(apis.getFileUploadHtml, {
        params: {
          uuid: uuid
        }
      }).then((data)=> data.data);

      self.$store.state.Contract.ContractEdit.contractHtml = rt;
      self.$store.state.Contract.ContractEdit.contractData.title = ctit;
      // data.contractHtml = rt;
      // data.contractData.title = ctit;
    } else if(ttid) {
      const rt = await self.$axios.get(apis.getTemplateHtml, {
        params: {
          tid: ttid
        }
      }).then((data)=> data.data);

      self.$store.state.Contract.ContractEdit.contractHtml = rt;
      self.$store.state.Contract.ContractEdit.contractData.title = name;
    } else {
      // debugger
      self.$store.state.Contract.ContractEdit.contractHtml = '';
      self.$store.state.Contract.ContractEdit.contractData = {
        fileList: []
      };
      Promise.resolve();
    }
    // debugger
  },
  
  computed: {
    ...mapState({
      user: state => state.user,
      contractData: state => state.Contract.ContractEdit.contractData,
      contractHtml: state => state.Contract.ContractEdit.contractHtml,
      showError: state => state.Contract.ContractEdit.showError
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
      this.$store.state.Contract.ContractEdit.contractHtml = '';
      this.$store.state.Contract.ContractEdit.contractData = {
        fileList: []
      };
    },
    onAfterSave(data) { //保存钩子
      if(this.state === 'create') {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'保存成功'
        });
        if(opener != null) {
          opener.location.reload();
        }
        // this.$router.replace({path: '/manage/contract/contract-edit', query: {pid: data.data.parter.id}});
        location.href = `/manage/contract/contract-edit?pid=${data.data.parter.id}`;
      }
    },
    onAfterSign() { //签署钩子

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
  .contract-edit{
    @include responsive-default {
      min-height: calc(100vh - 80px);
      background: #e6ecf5;
      .error-wraper{
        text-align: center;
        padding-top: 20px;
      }
    }
  }
  
</style>
