<template>
  <div class="signName">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item>印章管理</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row sign-bg">
      <div class="row box-pad">
        <div class="fl">我的印章</div>
        <div class="fr seal-hover all-cursor">
          <div @mouseover="sealIn" @mouseout="sealOut">
            <i class="iconsprite icon-question"></i> 看不到印章
          </div>
          <div class="seal-div" :class="{btnHide:isHover}">
            <em class="help-tip">
              <b></b>
              企业账户需要完成实名认<br/>证后才能看到企业印章
            </em>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row" :class="{boxHeight: isMine}">
          <div class="seal-box text-center seal-img margin-top20 all-cursor" @click="addSeal()">
            <div class="seal-border">
              <img v-imgerror src="~/assets/img/src/user/signName/seal-add.png" width="36px" height="36px">
            </div>
          </div>
          <div class="seal-box margin-top20" v-for="item in mySeal">
            <div class="seal-border" v-if="item.sealType == 0" v-show="item.sealType == 0">
              <div class="row text-center seal-my-img">
                <img :src="item.imgSrc" width="120px" height="120px">
              </div>
              <div class="row seal-pad">
                <div class="fl"><span class="all-cursor" @click="toAccredit(item.id)">印章授权</span></div>
                <div class="fr"><span class="all-cursor" @click="toUseList(item.id)">使用记录</span></div>
              </div>
            </div>
            <div class="seal-border" v-else>
              <div class="row text-center seal-my-img">
                <img :src="item.imgSrc" width="95%" height="70%">
              </div>
              <div class="row seal-pad">
                <div class="fr"><span class="all-cursor" @click="sealDel(item.id)">删除</span></div>
              </div>
            </div>
          </div>
          <sas-confirm
            :isShow.sync="delContract"
            type="info"
            title="确定删除"
            smallTitle="该操作无法恢复，是否继续！"
            enBtnFont="确认"
            catchBtnFont="取消"
            @enSure="enSureConfirm"
            @cancel="delContract = false"
          >
          </sas-confirm>
        </div>
        <div class="row box-pad" v-show="mySealShow">
          <div class="row fr margin-top20 home-span-h all-cursor" :class="{btnHide: isMore}"  @click="moreSeal()">
            展开查看更多 <i class="iconsprite icon-more"></i>
          </div>
          <div class="row fr margin-top20 home-span-h all-cursor" :class="{btnHide: isLess}"  @click="lessSeal()">
            收起 <i class="iconsprite icon-less"></i>
          </div>
        </div>
      </div>
      <div class="row margin-top20">
        <div class="row box-pad">授权的印章</div>
        <div class="row" :class="{boxHeight: isOther}">
          <div class="seal-box margin-top20" v-for="item in sealList">
            <div class="seal-border seal-img">
              <div class="row text-center">
                <img :src="item.imgSrc" width="70%" height="70%">
              </div>
            </div>
          </div>
        </div>
        <div class="row box-pad" v-show="otherSealShow">
          <div class="row fr margin-top20 home-span-h all-cursor" :class="{btnHide: isMore1}"  @click="moreSeal1()">
            展开查看更多 <i class="iconsprite icon-more"></i>
          </div>
          <div class="row fr margin-top20 home-span-h all-cursor" :class="{btnHide: isLess1}"  @click="lessSeal1()">
            收起 <i class="iconsprite icon-less"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  export default{
    name: 'addUser',
    layout: 'manager',
    extends: base,
    metaInfo:{
      title:'印章管理-云合同'
    },
    data(){
      return {
        delContract: false,
        sealId: '',
        isMore:false,
        isLess:true,
        isMore1:false,
        isLess1:true,
        isMine:true,
        isOther:true,
        isHover:true,
        divWidth:$('.signName').width(),
        mySealShow:'',
        otherSealShow:''
      }
    },
    async fetchData (to, context) {
      let self = context;
      const r = await self.$axios({
          method: 'get',
          url: apis.getSign,
          data: {pageNo: '1',limit: '0'}
        }).then((res)=> res.data);
        var signList = r.signs;
        for(var i=0;i<signList.length;i++){
          signList[i].imgSrc = "data:image/png;base64,"+signList[i].sign;
        }
        self.$store.state.myAccount.signList.mySeal = signList;

        const l = await self.$axios({
          method: 'post',
          url: apis.authorizedSignList,
          data: {pageNo: '1',limit: '0'}
        }).then((res)=> res.data);
        var otherList = l.data.rows;
        for(var j=0;j<otherList.length;j++){
          otherList[j].imgSrc = "data:image/png;base64,"+otherList[j].sign;
        }
        self.$store.state.myAccount.signList.sealList = otherList;
        if(r.code == 200 && l.code == 200){
          self.$store.state.myAccount.signList.sealPort = true;
        }
    },
    watch:{
      sealPort(curVal){
        if(curVal){
          this.divWidth = $('.signName').width();
          this.loadMore();
        }
      },
      divWidth:function(val) {
        this.divWidth = val;
        this.loadMore();
      }
    },
    computed: {
      ...mapState({
          mySeal: state => state.myAccount.signList.mySeal,
        sealList: state => state.myAccount.signList.sealList,
        sealPort: state => state.myAccount.signList.sealPort,
      })
    },
    mounted(){
      const that = this;
      window.onresize = function temp() {
        window.screenWidth = $('.signName').width();
        that.divWidth = window.screenWidth;
      };
    },
    methods:{
      addSeal(){ //跳转签名页面
        this.$router.push('/manage/user/sign/signName')
      },
      mySealList(){
        const self = this;
        const promise = new Promise(function (resolve, reject) {
          self.$axios({
              method: 'get',
              url: apis.getSign,
              data:{pageNo: 1,limit: 0}
            })
            .then(function (res) {
              if(res.data.code == 200){
                var signList = res.data.signs;
                for(var i=0;i<signList.length;i++){
                  signList[i].imgSrc = "data:image/png;base64,"+signList[i].sign;
                }
                self.$store.state.myAccount.signList.mySeal = signList;
              }
            })
        });
        return promise
      },
      sealIn(){
        this.isHover = false;
      },
      sealOut(){
        this.isHover = true;
      },
      /*授权*/
      toAccredit(id){
        this.$router.push('/manage/user/sign/add-user');
        sessionStorage.setItem("signId",id);
      },
      /*使用记录*/
      toUseList:function(id){
        this.$router.push('/manage/user/sign/seal-used');
        sessionStorage.setItem("sealId",id);
      },
      /*删除*/
      sealDel(id){
        this.delContract = true;
        this.sealId = id;
      },
      enSureConfirm(){
        const self = this;
        const promise = new Promise(function (resolve, reject) {
          self.$axios({
              method: 'post',
              url: apis.delSign,
              data:{id:self.sealId}
            })
            .then(function (res) {
              if(res.data.code == 200){
                const message = self.$createMessage({
                  type:'success',
                  duration:3000,
                  spinnerText:'删除成功'
                });
                self.mySealList();
              }else{
                const message = self.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText: res.data.msg
                })
              }
            })
        });
        return promise
      },
      /*加载更多*/
      loadMore(){
        var sealNum = Math.floor(this.divWidth / 217)*2-1;
        if(sealNum < this.mySeal.length){
          this.mySealShow = true;
        }else{
          this.mySealShow = false;
        }
        var otherNum = sealNum +1;
        if(otherNum < this.sealList.length){
          this.otherSealShow = true;
        }else{
          this.otherSealShow = false;
        }
      },
      /*我的印章展开更多*/
      moreSeal:function(){
        this.isMore=true;
        this.isLess=false;
        this.isMine = false;
      },
       /*我的印章收起*/
      lessSeal:function(){
        this.isMore=false;
        this.isLess=true;
        this.isMine = true;
      },
      /*授权的印章展开更多*/
      moreSeal1:function(){
        this.isMore1=true;
        this.isLess1=false;
        this.isOther = false;
      },
      /*授权的印章收起*/
      lessSeal1:function(){
        this.isMore1=false;
        this.isLess1=true;
        this.isOther = true;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  $blue: #4081ff;
  $bg:#2f2f2f;
  .signName{
    @include responsive-default {
      margin: 0 auto;
      height: 97%;
      .fl{float: left;}
      .fr{float: right;}
      .btnHide{display: none;}
      .all-cursor{cursor: pointer;}
      .box-pad{
        padding: 0 10px;
        .home-span-h{color: $blue}
      }
      .sign-bg{
        min-height: calc(100% - 34px);
        background-color: #fff;
        margin-top: 20px;
        margin-bottom: 30px;
        padding: 30px 20px;
        .seal-hover{
          color: $blue;
          .seal-div {
            position: relative;
            .help-tip{
              background-color: $bg;
              border-radius: 4px;
              width: 160px;
              height: 67px;
              color: #fff;
              line-height: 25px;
              position: absolute;
              top: 8px;
              left: -60px;
              font-size: 12px;
              font-style: normal;
              text-align: left;
              padding: 10px;
              z-index: 1;
              opacity: .8;
              b {
                border-radius: 4px;
                background-color: $bg;
                opacity: .8;
                width: 12px;
                height: 12px;
                position: absolute;
                top: -3px;
                left: 85px;
                text-indent: 9999px;
                -webkit-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }
          }
        }
        .icon-question{
          background-image: url('~assets/img/sprite/question.png');
          background-position: 0 0;
          width: 16px;
          height: 16px;
        }
        .icon-more{
          background-image: url('~assets/img/sprite/more.png');
          background-position: 0 0;
          width: 12px;
          height: 12px;
        }
        .icon-less{
          background-image: url('~assets/img/sprite/less.png');
          background-position: 0 0;
          width: 12px;
          height: 12px;
        }
        .boxHeight{max-height: 420px; overflow: hidden}
        .seal-box{
          width: 14.22%;float: left; padding: 0 10px; min-width: 217px;
          .seal-border{
            border: 1px solid #ddd;height: 190px;
            .seal-my-img{height: 80%; border-bottom:  1px solid #ddd; line-height: 150px;}
            .seal-pad{padding: 9px 10px; font-size: 12px;}
          }
        }
        .margin-top20{margin-top: 20px;}
        .seal-img{height: 190px;line-height: 190px;}
      }
    }
  }
</style>


