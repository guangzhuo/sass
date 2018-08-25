<template>
  <section class="page-logout">
    <sas-dialog-logout :show.sync="dialogLogoutVisible" />
  </section>
</template>

<script>

import { mapState } from 'vuex'
import dialogLogout from '~/components/dialog/dialog-logout'
export default {
  name: 'logout',
  metaInfo: {
      title: '登录—云合同'
  },
  data () {
    return {
      dialogLogoutVisible: true
    }
  },
  layout: 'normal',
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
    'sas-dialog-logout': dialogLogout
  }
}
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.logout{
  @include responsive-default {
      
  }
}

</style>
