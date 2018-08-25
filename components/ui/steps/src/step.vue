<script>
  export default {
    name: 'SasStep',
    data: function () {
      return {

      };
    },
    render (h){
      /*return h('el-step',{
       props: {...this.$props}
       },this.$slots.default)*/
      const data = {
        attrs: this.$props
      }
      return(
        <lvx-step { ...data }>
    </lvx-step>
    )

    },
    props: {
      title: String,
      icon: String,
      description: String,
      status: String
    }
  }
</script>
