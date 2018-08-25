<template>
  <div class="template-detail">
    <div class="lx-container">
      <div class="row detail-bg">
        <section>
          <div class="details-header-w">
            <div class="details-title-w">
              免费<br>试用
            </div>
            <div class="template-introduce-w">
              <span>模板来源：云合同</span><span>云合同发布时间：2016-10-10</span>
            </div>
            <div class="template-introduce-w" >
              <span>联系方式：400-600-3669</span><span>所属行业：通用</span>
            </div>
            <button class="template-header-btn-w"  @click="useTemplate()">使用</button>
          </div>
        </section>
        <section class="detail-body">
          <div v-html="detail"></div>
        </section>
        <section class="details-footer text-center">
          <div class="details-content" v-if="!isLogin">查看全部请<span @click="useTemplate()" class="details-link-w">登录</span>后使用</div>
          <div v-else></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base.vue'
  import apis from '~/config/api'

  export default {
    name: 'template-detail',
    extends: base,
    metaInfo: {
      title: '模板详情—云合同'
    },
    layout: 'default',
    data () {
      return {
        detail:'',
        uuid: this.$route.query.uuid,
        templateid: this.$route.query.templateid,
        templatename: this.$route.query.templatename
        /*templateid: sessionStorage.getItem("templateid"),
         templatename: sessionStorage.getItem("templatename")*/
      }
    },
    /*async fetchData (to, context) {
    this.uuid = to.query.uuid;
>>>>>>> e1390df6b59992529d8d6d18472f7a225a7b6dc2
    let self = context;
    self.uuid = to.query.uuid;
    const detail = await self.$axios({
        method: 'get',
        url: apis.templateDetail,
        params: {uuid: self.uuid, id: to.query.templateid}
      })
      .then((res)=>res.data.content);
      self.$store.state.Template.detail.detail = detail;
  },*/
  created () {
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
    })
  },
  watch: {
  },
  mounted () {
    this.templateView();
  },
  methods: {
    templateView(){
      let self = this;
      self.$axios({
          method: 'get',
          url: apis.templateDetail,
          params: {uuid: self.uuid, id: self.templateid}
        }).then(function (res) {
        self.detail = res.data.content
      })
    },
    useTemplate(){
      this.$router.push({path: '/manage/contract/contract-edit', query: {
        ttid: this.templateid,
        name: this.templatename
      }})
    }
  },
  components: {
  }
  }
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .template-detail{
  @include responsive-default {
    margin-top: 67px;
    background-color: #f5f5f5;
    padding: 20px 0;
    .detail-bg{background-color: #fff;}
    .details-header-w{
      height: 120px;
      position: relative;
      border-bottom: 1px solid #eee;
      color: #656565;
      padding-left: 10px;
    }
    .details-title-w{
      width: 52px;
      height: 62px;
      background: #2ab62e;
      color: #fff;
      font-size: 14px;
      position: absolute;
      top: -16px;
      right: 60px;
      text-align: center;
    }
    .details-title-w::before{
      content: "";
      width: 55px;
      height: 38px;
      transform: rotate(32deg);
      left: 11px;
      background: #fff;
      position: absolute;
      bottom: -31px;
    }
    .details-title-w::after{
      content: "";
      width: 55px;
      height: 38px;
      transform: rotate(144deg);
      right: 11px;
      background: #fff;
      position: absolute;
      bottom: -31px;
    }
    .template-introduce-w{
      margin-top: 16px;
    span:first-child{
      min-width: 250px;
      display: inline-block;
    }
  }
  .template-header-btn-w{
    position: absolute;
    right: 50px;
    bottom: 20px;
    border: none;
    background: #3f82ff;
    color: #fff;
    width: 70px;
    height: 30px;
    border-radius: 5px;
  }
  .detail-body{
    padding: 50px 100px; word-break: break-all; word-wrap: break-word;
    a{pointer-events: none;}
  }
  .details-footer{
    width: 100%;
    height: 80px;
    background: #efefef;
    padding: 20px 0;
  .details-content{
    width: 225px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #8c8c8c;
    border-radius: 20px;
    margin: 0 auto;
  span{
    color: #4081ff;
  &:hover{
     cursor: pointer;
   }
  }
  }
  }
  }
  }

</style>
