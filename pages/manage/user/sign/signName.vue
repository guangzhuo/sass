<template>
  <div class="sectionInner">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item :to="{path:'/manage/user/sign/signSet'}">印章管理</sas-breadcrumb-item>
      <sas-breadcrumb-item>绘制签名</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="Inner">
      <lvx-col :span="18" class="sign-l">
        <div class="row home-bg-h">
          <div id="content" class="text-center">
            <div id="signature" class="signature-bg"></div>
          </div>
        </div>
        <div class="row text-center">
          <sas-button class="sign-btn del-btn" @click="clearCanvas">清除</sas-button>
          <sas-button class="sign-btn sign-btn-color" @click="btnSave()">采用</sas-button>
        </div>
      </lvx-col>
      <lvx-col :span="6" class="sign-r">
        <div class="fr">
          <div class="row sign-mar-left-h">示例:</div>
          <div class="row"><img v-imgerror src="../../../../assets/img/sprite/name-correct.png" width="100%" height="100%"></div>
          <div class="row"><img v-imgerror src="../../../../assets/img/sprite/name-error1.png" width="100%" height="100%"></div>
          <div class="row"><img v-imgerror src="../../../../assets/img/sprite/name-error2.png" width="100%" height="100%"></div>
          <div class="row">
            下载<span class="app-color" id="app" ref="app">云合同App</span>,手绘更优美!
            <div class="row app-img">
              <img v-imgerror src="~/assets/img/src/user/signName/app-img.png" width="100%">
            </div>
          </div>
        </div>
      </lvx-col>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  import $ from 'jquery'
  import jSignature from '~/plugins/jSignature'
  jSignature($);
  export default{
    name:'signName',
    layout: 'manager',
    extends:base,
    metaInfo:{
      title:'绘制签名-云合同'
    },
    data(){
      return {
        isHaveSign:false,
        isHide: true
      }
    },
    mounted(){
      //jQ的canvas签名配置
      var $sigdiv = $("#signature").jSignature({'UndoButton':false,'decor-color':'transparent','lineWidth':3,'color':'#000','height':'100%','width':'100%'});
      $("#signature").bind('click',() => {
        this.isHaveSign = true
      })
    },
    methods:{
      clearCanvas(){  //清除画布签名
        $("#signature").jSignature("clear");
        this.isHaveSign = false
      },
      async btnSave(){  //采用签名
        var data = $("#signature").jSignature('getData', 'image');
        var sign = data[1];
        if(this.isHaveSign == false){
          const message = this.$createMessage({
            type:'info',
            duration:3000,
            spinnerText:'请绘制你的签名'
          });
        }else{
          let self = this;
          const promise = new Promise(function (resolve, reject) {
            self.$axios({
                method: 'post',
                url: apis.create,
                data:{"sign":sign}
              })
              .then(function (res) {
                if(res.data.code == 200){
                  const message = self.$createMessage({
                    type:'success',
                    duration:3000,
                    spinnerText:res.data.msg
                  });
                  self.$router.push('/manage/user/sign/signSet')
                }else{
                  const message = self.$createMessage({
                    type:'info',
                    duration:3000,
                    spinnerText:res.data.msg
                  });
                }
              })
          });
          return promise
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/base.scss";
  .sectionInner{
  @include responsive-default {
    margin: 0 auto;
    width: 100%;
    position: relative;
    background: #e8ecf0;
    overflow: hidden;
    .fr{float: right;}
    .Inner{
      width: 100%;
      position: relative;
      background: #e8ecf0;
      margin-top: 30px;
    .sign-l{
      overflow: hidden;
    .home-bg-h{
      width: 100%;
      border: 1px solid #b9c5dd;
      margin-bottom: 30px;
    .signature-bg{background-color: #fff; height: 692px; width: 100%}
    @media (max-width: 1600px) {
      .signature-bg{height: 560px;}
    }
    @media (max-width: 1366px) {
      .signature-bg{height: 430px;}
    }
  }
  .sign-btn{border-radius: 0;color: red; background-color: #fff; border-color: #b9c5dd; height: 40px; width: 110px;}
  .del-btn{color: red;}
  .sign-btn-color {color: #4081ff;}
  }
  .sign-r{
    .sign-mar-left-h{ margin-left: -38px;}
    img{margin-bottom:50px; width: 100%}
  @media(max-width: 1600px){
    img{margin-bottom:30px; width: 90%}
  }
    @media(max-width: 1366px){
      img{margin-bottom:10px; width: 78%}
    }
    .app-color{color: #4081ff; cursor: pointer;}
    .app-img{display: none}
    .app-color:hover ~.app-img{display: block}
  }
  }
  @media (max-width: 1366px) {
    .Inner{margin-top: 20px;}
  }
  .dialog-text{
    text-align: center;
    padding: 50px 0;
  div{margin-top: 80px;}
  }
  }
  }
</style>
