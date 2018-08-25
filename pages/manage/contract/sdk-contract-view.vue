<template>
  <div class="contractView">
    <div class="view-bg" :class="{'imgSizew': isWidth,'imgSizeh': isHeight}">
      <div class="text-center" style="padding-top: 20px;" v-if="rows.code != 200">{{rows.msg}}</div>
      <div class="row" v-else>
        <div class="row title-bg">{{viewInfo.title}}</div>
        <div class="row content-bg text-center">
          <img class="img-bor" v-for="(value,index) in imgSrc" :src="value" :key="index" width="100%"/>
          <img class="img-bor-top" v-for="(item,index) in imgInfo" :src="item" :key="index" width="100%"/>

          <div class="sign-name-box" v-for="(item, index) in signList">
            <img v-if="item.userType == 1" :src="`data:image/png;base64,${item.signStr}`" :id="item.id" width="200" :height="item.personSignHeight" :style="{position: 'absolute',left: `${item.left}px`,top: `${item.top}px`}"/>

            <img v-if="item.userType == 2 || item.userType == 4" :src="`data:image/png;base64,${item.signStr}`" :id="item.id" width="200" :height="item.companySignHeight" :style="{position: 'absolute',left: `${item.left}px`,top: `${item.top - 45}px`}"/>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import _ from 'lodash'
  import contractMixin from '~/mixins/contract-mixins'
  export default{
    name: 'contractView',
    layout: 'contract',
    metaInfo:{
      title:'第三方合同-云合同'
    },
    mixins: [contractMixin],
    data(){
      return {
        pid: ''
      }
    },
    computed: {
      ...mapState({
        viewInfo: state => state.Contract.sdkContractView.viewInfo, //合同信息
        rows: state => state.Contract.sdkContractView.rows,
        imgSrc: state => state.Contract.sdkContractView.imgSrc,
        imgInfo: state => state.Contract.sdkContractView.imgInfo,
        isWidth: state => state.Contract.sdkContractView.isWidth, //合同版式为横板
        isHeight: state => state.Contract.sdkContractView.isHeight, //合同版式为竖版
        signList: state => state.Contract.sdkContractView.signList //签名列表
      })
    },
    watch: {
     
    },
    async fetchData (to, context) {
      let self = context;
      self.pid = to.query.pid;
      const r = await self.$axios({
        method: 'post',
        url: apis.l_view,
        data:{pid:self.pid}
      })
      .then((res)=> res.data);
      if(r.code == 200) {
        var info = r.data;
        var viewSrc = [];
        var viewInfo = [];
        
        if (info.shape == 2) {
          self.$store.state.Contract.sdkContractView.isWidth = true;
          self.$store.state.Contract.sdkContractView.isHeight = false
        } else {
          self.$store.state.Contract.sdkContractView.isWidth = false;
          self.$store.state.Contract.sdkContractView.isHeight = true
        }
        for (var i = 0; i < info.pages; i++) {
          viewSrc = viewSrc.concat('/contract/third/getContractImg?pid=' + self.pid + '&&page=' + i);
        }
        for (var j = 0; j < info.signInfoPage; j++) {
          viewInfo = viewInfo.concat('/contract/third/getContractImg?pid=' + self.pid + '&&page=signinfo_' + j);
        }
        let tempList = [];
        _.forEach(r.data.signerList, (value, index)=> {
          let [left, top, personSignHeight, companySignHeight] = [0, 0, 0, 0];

          if(info.shape == 2) { //横版
            left = value.left * 0.9111 - 100;
            if(info.showSignDate == 1) { //签名显示时间
              top = _.isNumber(value.top) ? (value.top * 0.9111 - 45) : (value.top.split(';')[0] * 0.9111 - 45);
              personSignHeight = 130;
              companySignHeight = 220;
            } else { // 签名不显示时间
              top = _.isNumber(value.top) ? (value.top * 0.9111 - 55) : (value.top.split(';')[0] * 0.9111 - 55);
              personSignHeight = 110;
              companySignHeight = 200;
            }
          } else {
            left = value.left - 100;
            if(info.showSignDate == 1) { //签名显示时间
              top = _.isNumber(value.top) ? (value.top - 45) : (value.top.split(';')[0] - 45);
              personSignHeight = 130;
              companySignHeight = 220;
            } else { // 签名不显示时间
              top = _.isNumber(value.top) ? (value.top - 55) : (value.top.split(';')[0] - 55);
              personSignHeight = 110;
              companySignHeight = 200;
            }
          }
          tempList.push({
            id: `seal${index}`,
            left: left,
            top: top,
            signStr: value.signStr, 
            userType: value.userType,
            userName: value.userName,
            signDate: value.signDate,
            personSignHeight: personSignHeight,
            companySignHeight: companySignHeight
          });
        });
        self.$store.state.Contract.sdkContractView.signList = tempList; //第三方合同签名列表
      }
      self.$store.state.Contract.sdkContractView.rows = r;
      self.$store.state.Contract.sdkContractView.imgSrc = viewSrc;
      self.$store.state.Contract.sdkContractView.imgInfo = viewInfo;
      self.$store.state.Contract.sdkContractView.viewInfo = info;
    },
    mounted(){

    },
    methods:{
    }
  };
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .contractView{
    @include responsive-default{
      min-height: 100%;
      background-color: #e8ecf0;
      padding: 50px 0;
      .imgSizew{width: 1160px;}
      .imgSizeh{width: 900px;}
      .imgBorder{border-bottom:1px dashed #000;}
      .view-bg{
        background-color: #fff;
        margin: 0 auto;
        border: 1px solid #d5d5d5;
        .title-bg{
          height: 50px;
          line-height: 50px;
          color: #b8c6dc;
          font-size: 16px;
          padding-left: 30px;
          border-bottom: 1px solid #d5d5d5;
        }
        .content-bg{
          position: relative;
          .img-bor{
            border-bottom: 1px dashed #000;
            &:last-child{border: none;}
          }
          // .img-bor-top{border-top: 1px dashed #000;}
        }
      }
    }
  }
</style>

