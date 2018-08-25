<template>
    <div class="signList">
        <sas-breadcrumb >
            <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
            <sas-breadcrumb-item>第三方签名</sas-breadcrumb-item>
        </sas-breadcrumb>
        <div class="user-home-h">
          <div class="user-pictureWrap">
              <div class="user-SetTitleWrap">
                  <div class="user-SetTitle">
                      <span class="signNum" style="color:#000;">第三方签名列表</span>
                  </div>
              </div>
          </div>
          <div class="row sdk-name-pad">
            <div v-show="nameList.length<1">你目前关联的第三方平台并没有签名！</div>
            <lvx-col :span="6" class="box-pad" v-for="(list,index) in nameList" :key="index">
              <div class="skd-name-box">
                <div style="padding: 15px 8% 5px">
                  <img v-imgerror :src="list.imgSrc" width="100%">
                </div>
                <div class="text-right sign-name">{{list.appName}}</div>
              </div>
            </lvx-col>
          </div>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'signature',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'我的签名-云合同'
    },
    data(){
      return {
//        nameList: []
      }
    },
    async fetchData (to, context) {
      let self = context;
      const r = await self.$axios({
          method: 'get',
          url: apis.getThirdSignList,
        })
        .then((res)=> res.data.data);
      var sdkName = r.signList;
      for(var i=0;i<sdkName.length;i++){
        sdkName[i].imgSrc = "data:image/png;base64,"+sdkName[i].signData;
      }
      self.$store.state.myAccount.sdkSignList.nameList = sdkName;
    },
  computed: {
  ...mapState({
        nameList: state => state.myAccount.sdkSignList.nameList
  })
  },
  }
</script>
<style lang="scss" scoped>
    @import "~styles/base.scss";
    .signList{
        @include responsive-default {
          margin: 0 auto;
          height: 97%;
            .user-home-h{
              min-height: calc(100% - 34px);
                margin-top: 20px;
                border: 1px solid #B9C5DD;
                padding-top: 10px;
                background-color: $white;
                .user-pictureWrap{
                    .user-SetTitleWrap{
                            border-bottom: 1px solid #B9C5DD;
                            padding-left: 20px;
                        .user-SetTitle{
                            padding-left: 10px;
                            border-left: 4px solid #4081ff;
                            overflow: hidden;
                            margin-bottom: 10px;
                        }
                    }
                }
                .sdk-name-pad{
                  padding: 15px 2vh;
                  background-color: $white;
                  .box-pad{padding: 15px}
                  .skd-name-box{
                    background-color: #f1f4fa;width: 100%; padding: 5px;
                    .sign-name{color:#4081ff; margin-right: 5px; height: 20px;}
                  }
                }

            }
        }
    }
</style>
