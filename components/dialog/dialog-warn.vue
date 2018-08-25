<template>
 <sas-dialog
    :show.sync="visible"
    title="警告通知"
    width="658px"
    class="warn-dialog"
    @close="afterClose"
    >
    <div class="content">
      <div class="text">
        <i class="icon iconfont lvx-icon-warn-f info-icon"></i>
        <span class="info-txt">你的账户此时在移动端登录，如非本人操作，请修改密码。</span>
      </div>
      <div class="action-panel">
        <sas-button category="primary"  @click="onRelogin">确定</sas-button>
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
      this.relogin();  
    },
    onRelogin() {
      this.relogin();  
    },
    async relogin() {
      this.$store.state.isWarned = true;
      this.$router.push({path: '/manage'});
      this.$emit('update:show', false);
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.warn-dialog{
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


