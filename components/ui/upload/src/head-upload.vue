<script>
  export default {
    name: 'SasHeadupload',
    render (h) {
      const data = {
        attrs: this.$props
      }
      return (
        <div class="sas-headupload">
        <img  src={this.imageUrl} class="avatar" />
        <lvx-upload
    class="avatar-uploader"
      {...data}
      on-Success-change={this.handleAvatarSuccess}
      show-file-list="false" />
        <i class="lvx-icon-setting"></i>修改头像
        </div>
    );
    },
    data: function () {
      return {
        imageUrl: require('~/assets/img/src/home/defaultAvat.png')
      };
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    props: {
      action: {
        type: String,
        required: true
      },
      data: Object,
      multiple: Boolean,
      name: {
        type: String,
        default: 'file'
      },
      withCredentials: Boolean,
      showFileList: {
        type: Boolean,
        default: true
      },
      accept: String,
      type: {
        type: String,
        default: 'select'
      },
      fileList: {
        type: Array,
        default() {
          return [];
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      limit: Number
    }
  };
</script>
