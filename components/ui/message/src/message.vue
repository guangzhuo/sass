<script>
  export default {
    name:'SasMessage',
    render(h){
      const data = {
        attrs: this.$props
      }
      return (
        <div class="sas-message">
        <lvx-alert {...data}></lvx-alert>
      </div>
    );
    },
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean
    },
    data:function () {
      return{}
    }
  }
</script>
<style>
  .sas-message{
    width: 316px;
    height: 34px;
    .lvx-alert--success {
       background-color: #f0f9eb;
       color: #00a854;
     }
  }
</style>
