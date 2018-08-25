<template>
  <ul id="body-left-tags" class="body-left-tags">
    <li class='tags-operate' @click="toggle1('pc')" ><span class='tags-left-span tags-left-span-pc'><span class='left-span-icon tags-left-span-pc'></span>PC端操作视频</span>
      <ul id='tags_w' v-show="pctag">
        <li class='tags-left-li' v-for="(items1, index) in tagsli1" :class="{'active-blue': ind1 === index}" @click='toggle2(index,items1.id)'>{{items1.name}}</li>
      </ul>
    </li>
    <li class='tags-operate' @click="toggle1('mobile')"><span class='tags-left-span tags-left-span-m'><span class='left-span-icon tags-left-span-m'></span>移动端操作视频</span>
      <ul id='tags_w' v-show="mobiletag">
        <li class='tags-left-li' v-for="(items2, index) in tagsli2" :class="{'active-blue': ind2 === index}" @click='toggle3(index,items2.id)'>{{items2.name}}</li>
      </ul>
    </li>
  </ul>
</template>
<script>
  import bus  from '~/components/help/eventBus'
export default {
  data(){
    return{
      tagval:'',
      pctag:false,
      mobiletag:false,
      tagsli1:[{
        id:'webFull',
        name:'完整视频'
      },{
        id:'webRegist',
        name:'登录注册'
      },{
        id:'webSign',
        name:'签名通讯录模板'
      },{
        id:'webFormation',
        name:'合同生成流转'
      },{
        id:'webSupervision',
        name:'合同监管'
      }],
      tagsli2:[
        {
        id:'mobileFull',
        name:'完整视频'
        },
        {
          id:'mobileRegist',
          name:'登录注册'
        },
        {
          id:'mobileSign',
          name:'签名通讯录模板'
        },
        {
          id:'mobileFormation',
          name:'合同生成流转'
        },
        {
          id:'mobileSupervision',
          name:'合同监管'
        }],
      ind1:0,
      ind2:0
    }
  },
  watch:{
    tagval:function (newtagval) {
      this.pctag=false;
      this.mobiletag=false;

      if(newtagval == 'pc'){
        this.pctag=!this.pctag;
      }else if(newtagval == 'mobile'){
        this.mobiletag=!this.mobiletag;
      }else{
        console.log('error')
      }
    }
  },
  methods:{
    toggle1(val){
      this.tagval=val;
    },
  toggle2(index,val){
    this.ind1 = index;
      bus.$emit("showParentComp",val);
    },
    toggle3(index,val){
      this.ind2 = index;
      bus.$emit("showParentComp",val);
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  li {
    list-style: none;
  }
  .body-left-tags {
    padding:0 0 10px 35px;
    @include responsive-default {
      .tags-operate{
        margin: 15px 0 0 24px;
        cursor: pointer;
        padding-bottom: 10px;
      }
      .tags-left-span{
        font-size: 16px;
        color: #7e7e7e;
        display: inline-block;
        position: relative;
      }
      .left-span-icon{
        width: 30px;
        height: 25px;
        position: absolute;
        left: -30px;
        top:0;
        background: url("~assets/img/src/help/tags-icn.png")no-repeat;
      }
      .tags-left-span-pc{
        background-position: -3px -161px;
      }
      .tags-left-span-m{
        background-position: -3px -135px;
      }
      #tags_w{
        padding: 0px;
      }
      .tags-left-li{
        margin-top: 10px;
        color: #a4a4a4;
        cursor: pointer;
      }
      .active-blue{
        color: #666;
      }
    }
  }
</style>
