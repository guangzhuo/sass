<template>
  <div class="signName">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item>签名设置</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row sign-bg">
      <div class="sign-head">
        <b class="sign-color">共有<span>{{signList.length}}</span>个签名</b>
        <span class="sign-title">可设签名上限为3个，使用过的签名无法删除</span>
      </div>
      <div class="row sign-mar">
        <lvx-col :span="8" class="text-center" v-for="(list,index) in signList" :key="index">
          <div class="row sign-box">
            <img v-imgerror class="img-size" :src="list.imgSrc" />
          </div>
          <div class="row" v-show="list.used == 0">
            <sas-button category="gray" class="del-btn" @click="delName(list.id)">删除</sas-button>
          </div>
        </lvx-col>
        <lvx-col :span="8" class="text-center" v-show="signList.length<3">
          <div class="row sign-box">
            <div class="add-box" @click="addSign">+</div>
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
    name: 'signName',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'我的签名-云合同'
    },
    data(){
      return {
//        signList:[]
      }
    },
    async fetchData (to, context) {
    let self = context;
    const r = await self.$axios({
        method: 'get',
        url: apis.getSign,
      })
      .then((res)=> res.data);
    var signImg = r.signs;
    for(var i=0;i<signImg.length;i++){
      signImg[i].imgSrc = "data:image/png;base64,"+signImg[i].sign;
    }
    self.$store.state.myAccount.signList.signList = signImg;
  },
  computed: {
  ...mapState({
        signList: state => state.myAccount.signList.signList
  })
  },
  mounted(){
  },
  methods:{
    addSign(){ //跳转签名页面
      this.$router.push('/manage/user/sign/signName')
    },
    async getSign(){
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.getSign,
          })
          .then(function (res) {
            var signImg = res.data.signs;
            for(var i=0;i<signImg.length;i++){
              signImg[i].imgSrc = "data:image/png;base64,"+signImg[i].sign;
            }
            self.$store.state.myAccount.signList.signList = signImg;
          })
      });
      return promise
    },
    async delName(id){  //删除签名
      let self = this;
      const promise = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'post',
            url: apis.delSign,
            data:{"id":id}
          })
          .then(function (res) {
            if(res.data.code == 200){
              self.getSign();
              const message = self.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:res.data.msg
              })
            }else{
              const message = self.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:res.data.msg
              })
            }
          })
      });
      return promise
    }
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .signName{
  @include responsive-default {
    margin: 0 auto;
    height: 97%;
    min-height: 250px;
    .sign-bg{
      height: calc(100% - 34px);
      border: 1px solid #b9c5dd;
      background-color: #fff;
      margin-top: 20px;
    .sign-head{
      padding: 10px 3vh; border-bottom: 1px solid #b9c5dd;
    .sign-color{
      border-left: 4px solid #4081ff; padding-left: 5px;
    span{color: #4081ff;}
  }
  .sign-title{font-size: 12px; color: #959595; margin-left: 15px;}
  }
  .sign-mar{
    margin: 6vh 0;
  .sign-box{
    display: inline-block; height: 140px; width: 310px;margin-bottom: 30px;
    border: 1px solid #ecf0f6; background-color: #f6f6f6; padding: 15px 0;
  .img-size{width:160px;height:88px;}
  .add-box{
    border: 1px solid #b9c5dd;
    height: 80px;
    width: 80px;
    margin: 10px auto 0;
    background-color: #fbfbfb;
    font-size: 80px;
    line-height: 75px;
    color: #c8c8c8;
    cursor: pointer;
  }
  }
  .del-btn{background-color: #e6ebf6; border: 1px solid #b9c5dd;}
  }
  }
  }
  }
</style>


