<template>
 <sas-dialog
    :show.sync="visible"
    title="下线通知"
    width="658px"
    class="logout-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="text">
        <i class="icon iconfont lvx-icon-warn-f info-icon"></i>
        <span class="info-txt">你的账户此时在另一个设备上登录，如非本人操作，请立即前往修改密码！</span>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onRelogin">重新登录</sas-button>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import loginMixins from '~/mixins/login-mixins'
export default {
  data () {
    return {
      visible: this.show,
    }
  },
  computed: {
    ...mapState({
    })
  },
  mixins: [loginMixins],
  props: {
    show: Boolean
  },
  created() {
   
  },
  mounted () {
    
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  },
  methods: {
    afterClose() {
      // this.relogin();  
    },
    onRelogin() {
      this.relogin();  
    },
    async relogin() {
      const r = await this.logout(`${location.protocol}//${location.host}/login`);
      if(r.success) {
        this.resetExpTime(-1);
        this.$store.state.sessionId = '';
        window.location.assign(r.data);
        this.$emit('update:show', false);
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.logout-dialog{
  @include responsive-default {
    .content{
      .text{
        padding: 64px 0 58px;
        color: #646464;
        text-align: center;
        .info-icon{
          color: $orange-color;
          font-size: 22px;
          vertical-align: middle;
          margin-right: 20px;
        }
        .info-txt{
          font-size: 12px;
        }
      }
      .action-panel{
        padding: 20px 12px 40px;
        text-align: center;
      }
    }
  }
}
</style>


