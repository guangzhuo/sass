<template>
  <div class="about-bg-h">
    <div class="lx-container">
      <div class="row public-margin-h">首页 > 站点地图</div>
      <div class="row security-bg-h">
        <div class="row"><h3 class="font-weight-h">站点地图</h3></div>
        <div class="row website-bor-h" v-for="items in maplist">
          <div class="col-xs-2">
            <div class="website-box-h">{{items.maptitle}}</div>
          </div>
          <div class="col-xs-9">
            <div class="col-xs-2 hline-d" v-for="subitems in items.submaplist">
              <router-link :to="subitems.suburl" class="website-color-h">{{subitems.submaptitle}}</router-link>
              <div class="website-bor-right-h" v-if="subitems.lineshow == true"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'
  export default {
    name: 'website-map',
    extends: base,
    metaInfo:{
      title: '站点地图-云合同',
      meta: [{
        name: 'keywords',
        content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
      },{
        name: 'description',
        content: '云合同是律讯公司自主研发的第三方电子合同平台，致力于合同生态链的建设与完善，是“互联网”+合同的完美呈现。全国咨询热线：400-600-3669'
      }]
    },
    layout: 'default',
    data () {
      return {
        maplist:[{
          maptitle:'产品服务',
          submaplist:[{
            submaptitle:'产品服务',
            suburl:'/introduction',
            lineshow:false
          }]
        },{
          maptitle:'合同模板库',
          submaplist:[{
            submaptitle:'全部模板',
            suburl:'/template',
            lineshow:true
          },{
            submaptitle:'劳动合同',
            suburl:'/template?type=1',
            lineshow:true
          },{
            submaptitle:'买卖合同',
            suburl:'/template?type=2',
            lineshow:true
          },{
            submaptitle: '知识产权',
            suburl: '/template?type=3',
            lineshow: true
          },{
            submaptitle: '借款担保',
            suburl: '/template?type=4',
            lineshow: true
          },{
            submaptitle: '租赁合同',
            suburl: '/template?type=5',
            lineshow: false
          }]
        },{
          maptitle:'安全中心',
          submaplist:[{
            submaptitle:'信息安全',
            suburl:'/security-center?type=1',
            lineshow:true
          },{
            submaptitle:'法律保护',
            suburl:'/security-center?type=2',
            lineshow:true
          },{
            submaptitle:'案例详情',
            suburl:'/security-center?type=3',
            lineshow:false
          }]
        },{
          maptitle:'新闻中心',
          submaplist:[{
            submaptitle:'公司动态',
            suburl:'/news?type=1',
            lineshow:true
          },{
            submaptitle:'行业资讯',
            suburl:'/news?type=2',
            lineshow:false
          }]
        },{
          maptitle:'帮助中心',
          submaplist:[{
            submaptitle:'帮助中心',
            suburl:'/help-center?type=2',
            lineshow:true
          },{
            submaptitle:'视频中心',
            suburl:'/help-center?type=1',
            lineshow:false
          }]
        },{
          maptitle:'关于我们',
          submaplist:[{
            submaptitle:'公司介绍',
            suburl:'/about?type=1',
            lineshow:true
          },{
            submaptitle:'联系我们',
            suburl:'/about?type=2',
            lineshow:true
          },{
            submaptitle:'诚聘英才',
            suburl:'/about?type=3',
            lineshow:false
          }]
        }]
      }
    },
    components: {

    },
    computed: {
    },
    mounted () {
    },
    watch: {
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .about-bg-h{
    background-color: #f5f6fa;
    margin-top: 67px;
    padding-bottom: 1px;
    padding-top: 6px;
    @include responsive-default {
      .public-margin-h {
        margin: 20px 0;
      }
      .security-bg-h {
        background-color: #fff;
        margin-bottom: 30px;
        padding: 20px 30px 100px;
        text-align: center;
      }
      .font-weight-h {
        font-weight: 600;
      }
      .website-bor-h {
        border-bottom: 1px solid #eee;
        padding: 30px 0 15px 20px;
      }
      .website-box-h {
        background-color: #cbddff;
        color: #333;
        padding: 5px 0;
        width: 90px;
        border-radius: 4px
      }
      .hline-d{
        line-height: 29px;
      }
      .website-color-h {
        color: #333;
      }
      .website-color-h:hover {
        color: #4081ff;
        text-decoration: none;
      }
      .website-bor-right-h {
        float: right;
        width: 1px;
        height: 12px;
        background-color: #333;
        margin-top: 5px;
      }
    }
    }
</style>
