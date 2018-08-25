<template>
  <div class="attachment-view" v-html="attachmentHtml">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import apis from '~/config/api'
export default {
  name: 'attachment-view',
  metaInfo: {
    title: '附件查看'
  },
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'normal',
  data () {
    return {
    }
  },
  async fetchData (to, context) {
    let self = context;
    let [path = null] = [to.query.path];
    if(path) {
      const r = await self.$axios.get(apis.viewAttachment, {
        params: {
          path: path
        }
      }).then((data)=> data.data.data);
      if(r.content) {
        self.$store.state.Contract.AttachmentView.attachmentHtml = r.content;
      } else if(r.redirect) {
        location.href = r.redirect;
      }
      
    } else {
      return Promise.resolve();
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      attachmentHtml: state => state.Contract.AttachmentView.attachmentHtml
    })
  },
  filters: {

  },
  watch: {
  },
  mounted () {
  },
   
  methods: {
   
  },
  components: {
    
  }
}
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .attachment-view{
    @include responsive-default {

    }
  }

</style>
