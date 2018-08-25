<template>
    <h4 class="text-center" id="formhtml"></h4>
</template>

<script>
import apis from "~/config/api"
export default {
  name: "manage-user-order-location-open",
  metaInfo: {
    title: '三方页面'
  },
  layout: 'contract',
  data() {
    return {
      htmls:''
    }
  },
  mounted() {
    let type = Number(this.$route.query.type)
    if(type === 1) {
        this.getAliCB(apis.getAli)
    } else {
        this.getAliCB(apis.getAlipay)
    }
  },
  destroyed(){
    this.htmls = ''
  },
  methods: {
    async getAliCB(url) {
       let formHtml = document.querySelector("#formhtml")
       let paymentId = this.$route.query.paymentId
      await this.$axios.post(url,{"paymentId":paymentId}).then(data=>{
         formHtml.innerHTML = data.data.data.html
         document.forms['alipaysubmit'].submit();
      })
    }
  }
}
</script>

<style scoped>

</style>
