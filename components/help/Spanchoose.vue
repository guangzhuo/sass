<template>
  <div class="spanschoose-d"> <ul id="body-left-tags" class="body-left-tags">
    <li @click="submeushow(index,items.articleTitle[0].aid)" v-for="(items,index) in lilist">
      <img  v-if="items.icon !=null" class="tag-img" :src="items.icon" alt="" />
      <div class="tag-div">
        <div class="tag-div-span"><span>{{items.category}}</span></div>
        <ul v-show="ind === index">
          <li  v-for="(subitem,index) in items.articleTitle" :class="{'font-blue': subind === index}" @click.stop="tagtent(subitem.aid,$event,index)" :title="subitem.title" :data-id="subitem.aid">{{subitem.title}}</li>
        </ul>
      </div>
    </li>
  </ul></div>
</template>
<script>
  import bus  from '~/components/help/eventBus'
  export default {
    data(){
      return{
        test1:'',
        lilist:[],
        ind:'',
        subind:0
      }
    },
    mounted(){
      //帮助中心列表遍历
      this.helpcontent();
    },
    methods:{
      helpcontent() {
        const self = this;
        self.$axios.get('/user/helpArticle/getMenu')
          .then(function (res) {
            if(res.data.code == 200){
              var menudata=res.data.data;
              self.lilist=menudata;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      submeushow(index,aid1){
        this.ind = index;
        const self = this;
        self.$axios.get("/user/helpArticle/getContent?aid="+aid1)
          .then(function (res) {
            let busdata = res.data.data;
            self.$emit("helptitleshow",busdata.title);
            bus.$emit("helptagshow",busdata.content);
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      tagtent(tagval,event,subindex){
        event.cancelBubble = true;
        this.subind = subindex;
        const self = this;
        self.$axios.get("/user/helpArticle/getContent?aid="+tagval)
          .then(function (res) {
            let busdata = res.data.data;
            self.$emit("helptitleshow",busdata.title);
            bus.$emit("helptagshow",busdata.content);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  li {
    list-style: none;
  }
  .spanschoose-d {
    @include responsive-default {
      .body-left-tags{
        padding:0 0 10px 35px;
      }
      .tag-div{display:inline-block;vertical-align:top;width:200px;}
      .tag-div-span{font-size:16px;display:inline-block;height:50px;line-height:50px;width:100%;color: #7e7e7e;}
      .tag-div-span span:hover{cursor:pointer;}
      .tag-div ul{padding:0px;}
      .tag-div ul li{padding:3px 0px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;-o-text-overflow:ellipsis;}
      .tag-div ul li:hover{cursor:pointer;}
      .tag-img{display:inline-block;margin:16px 10px 0 0;height:18px;width:18px;}
      .font-blue{color:#666;}
    }
  }
</style>
