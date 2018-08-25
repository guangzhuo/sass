<template>
  <section class="page-warn">
    <sas-dialog-warn :show.sync="dialogWarnVisible" />
  </section>
</template>

<script>

import { mapState } from 'vuex'
import apis from '~/config/api'
import dialogWarn from '~/components/dialog/dialog-warn'
export default {
  name: 'logout',
  metaInfo: {
      title: '登录—云合同'
  },
  data () {
    return {
      dialogWarnVisible: true
    }
  },
  layout: 'normal',
  async fetchData(to, context) {
    let self = context;
    const r = await self.$axios.get(apis.cleanLoginLog).then((res)=>res.data);
  },
  created () {
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    
  },
  methods: {
     
  },
  components: {
    'sas-dialog-warn': dialogWarn
  }
}
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.page-warn{
  @include responsive-default {
      
  }
}

</style>
