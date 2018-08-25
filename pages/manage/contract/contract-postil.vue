<template>
  <div class="contract-postil">
    <sas-editor-contract :postil-data="postilData" :contract-data="contractData" :contract-html="contractHtml" :model-type="state" @after-save-postil="onAfterSavePostil" :pid="pid"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import apis from '~/config/api'
import editorContract from '~/components/contract/editor-contract'
export default {
  name: 'contract-postil',
  metaInfo: {
    title: '合同查看(可批注)-云合同'
  },
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'contract',
  data () {
    return {
      state: 'postil',
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
   
    let rp;
    if(r.success) {
      rp = await self.$axios.get(apis.getPostil, {
        params:{
          cid: r.data.contract.id
        }
      }).then((data)=> data.data);
    }
    self.$store.state.Contract.ContractView.contractHtml = rt.data;
    self.$store.state.Contract.ContractView.contractData = {
      title:  r.data.contract.title,
      cid: r.data.contract.id,
      roleId: r.data.parter.roleId,
      rowsStatus: r.data.parter.rowsStatus,
      colsStatus: r.data.parter.colsStatus,
      fileList: r.data.fileList,
      cgmt: r.data.cgmt
    };
    self.$store.state.Contract.ContractView.postilData = rp.list;
  },
  
  computed: {
    ...mapState({
      user: state => state.user,
      contractData: state=> state.Contract.ContractView.contractData,
      contractHtml: state=> state.Contract.ContractView.contractHtml,
      postilData: state=> state.Contract.ContractView.postilData
    })
  },
  filters: {
   
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    onAfterSavePostil(type, data) {
      if(type === 'add') {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'添加成功'
        });
        location.reload();
      } else if (type === 'update') {
         this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'保存成功'
        });
        location.reload();
      }
      
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
  .contract-postil{
    @include responsive-default {
     
    }
  }
  
</style>
