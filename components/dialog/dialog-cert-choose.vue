<template>
 <sas-dialog
    :show.sync="visible"
    title="实名认证"
    width="598px"
    class="cert-choose-dialog"
    @close="afterClose"
    >
    <div class="content">
      <p class="top-text">
        <span>同一个手机号码只能认证1个人，3个企业</span><br/>
        <span>已认证</span><span class="em-color">{{user.personalApprove}}</span>个人，<span class="em-color">{{user.companyApprove}}</span>企业
      </p>
      <div class="bottom-actions">
        <div class="first-btn">
          <sas-button class="personal-btn" category="secondary" size="medium" icon="iconsprite icon-personal-icon" @click="toPersonCert">个人认证</sas-button>
        </div>
        <div class="second-btn">
          <sas-button class="company-btn" category="secondary" size="medium" icon="iconsprite icon-company-icon" @click="toCompanyCert">企业认证</sas-button>
        </div>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'

export default {
  data () {
    return {
      visible: this.show
    }
  },
  computed: {
    ...mapState({
      user: state=> state.user
    })
  },
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
  mixins: [{

  }],
  methods: {
    afterClose() {
      this.$emit('update:show', false);
    },
    toPersonCert() {
      this.$emit('update:show', false);
      this.$router.push({path: '/manage/user/check/personal', query: {tab: 0}});
    },
    toCompanyCert() {
      this.$emit('update:show', false);
      this.$router.push({path: '/manage/user/check/checkAutomatic', query: {tab: 0}});
    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.cert-choose-dialog{
  .em-color{
    color: $theme-color;
  }
  @include responsive-default {
    .content{
      padding: 40px 0;
      font-size: 18px;
      color: #131313;
      .top-text{
        border: 1px dashed #b9c5dd;
        padding: 8px 15px;
        border-radius: 4px;
        width: 80%;
        margin: 0 auto;
        text-align: center;
      }
      .bottom-actions{
        text-align: center;
        .first-btn{
          margin: 20px 0;
        }
        .personal-btn{
          width: 180px;
        }
        .second-btn{
          margin: 10px 0;
        }
        .company-btn{
          width: 180px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>

