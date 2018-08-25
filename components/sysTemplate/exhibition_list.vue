<template>
    <div class="ex_list">
      <div class="bgImgInfo">
        <img class="exImg bg2" src="~assets/img/src/template/template-bg2.jpg" :alt="items.name">
        <img class="exImg bg1" src="~assets/img/src/template/template-bg1.jpg" :alt="items.name">
        <span class="ftInfo ftInfo-hide" :title="items.name">{{items.name | cut_str(textLength)}}</span>
        <ul class="paddNone">
          <li class="use" @click="useLink(items)">使用</li>
          <li class="use">
            <router-link :to="{path:'/template/detail',query:{uuid:items.uuid,templateid:items.id,templatename:items.name}}"  target="_blank">
            查看
          </router-link></li>
          <!--<li class="use" @click="lookFile(items)">查看</li>-->
          <li v-if="ifreMove == 'hide' ||  (typeof items.templateType != undefined && items.templateType ==1) ? false : true" class="use" @click="removeFile(items)">删除</li>
        </ul>
      </div>
    </div>
</template>

<script>
  import apis from '~/config/api'
  function hrefs() {
    var hosts = location.protocol + "//" + document.location.hostname;
    var hosts_yht = "https://www.yunhetong.com";
    return hosts == hosts_yht ? "jx.yunhetong.com" : "testjx.yunhetong.com:8011"
  }
    export default {
        name: "exhibition_list",
        props:['items','indexs','ifreMove'],
        data () {
          return {
            textLength: 65,
            screenWidth: document.body.clientWidth,
          }
        },
        mounted() {
          if(this.screenWidth>1366){
            if(this.screenWidth>1600){
              this.textLength = 65;
            }else{
              this.textLength = 46;
            }
          }else{
            if(this.screenWidth>1200){
              this.textLength = 38;
            }else{
              this.textLength = 30;
            }
          }
        },
        methods:{
          useLink(item) {
            if(item.templateType == 1) { //专门为亚厦项目定制的蘑菇家的合同模板
              open(`/manage/contract/contract-edit-yasha?name=${item.name}`);
            } else {
              open(`/manage/contract/contract-edit?ttid=${item.id}&name=${item.name}`);
            }
          },
          lookFile(item) {
            const self = this;
            let newPage = window.open('about:blank');
            const promise = new Promise(function (resolve, reject) {
              self.$axios({
                  async: false,
                  method: 'get',
                  url:  "/contract/contractTemplate/getURL",
                  params: { 'uuid': item.uuid,'id':item.id},
                })
                .then(function (res) {
                  if(res.data.code == 200){
                    newPage.location.href = res.data.data.url;
                  }else{
                    newPage.close();
                    const message = self.$createMessage({
                      type:'error',
                      duration:3000,
                      spinnerText:res.data.msg
                    });

                  }
                })
            });
            return promise;
            /*let data = {
                'token': 'lvxuntoken',
              }
            this.$axios.post(apis.getLookFile + item.uuid, data)
              .then((data) => {
                let code = Number(data.data.code);
                let sessionId = data.data.session;
                if(code === 1) {
                  window.open('http://'+ hrefs() + '/view/'+ sessionId)
                } else {
                  const message = this.$createMessage({
                    type:'error',
                    duration:3000,
                    spinnerText:"查看失败！"
                  })
                }
              })*/
          },
          removeFile(item) {
            this.$emit('removeDialog', item)
          },

        }
    }
</script>

<style lang="scss" scoped>
.ex_list{
  min-width:172px;
  width:18%;
  text-align: center;
  vertical-align: top;
  display:inline-block;
  margin: 1% 1% 0 1%;
  position: relative;
  padding-bottom: 16px;
  .bgImgInfo{
    width:100%;
    margin:0 auto;
    text-align: center;
    word-break: break-all;
    position: relative;
    .exImg{
      width: 84%;
    }
    .bg1{
      display: none;
    }
    .ftInfo{
      display: inline-block;
      position: absolute;
      top:32%;
      bottom:50%;
      left:30px;
      right:30px;
      z-index: 2;
    }
    .ftInfo-hide{
      word-break:break-all;
     /* text-overflow:ellipsis;
      display:-webkit-box;*/
      /*-webkit-box-orient: vertical;
      -webkit-line-clamp:2;*/
      height: 38px;
      /*overflow: hidden*/
    }
  }
  .paddNone{
    position: absolute;
    top:102%;
    left:0;
    right:0;
    margin: auto;
    display: none;
    padding:0;
    text-align: center;
  }
  .use{
    display: inline-block;
    list-style: none;
    padding:0 2px;
    margin:0 10px;
    cursor:pointer;
    a{
      color:#333;
      &:hover{text-decoration: none;}
    }
  }
  &:hover{
    .bg2{
      display: none;
    }
    .bg1{
      display: inline;
    }
    .paddNone{
      display: block;
    }
    .ftInfo{
      color:#ffffff;
    }
  }
}
@media(max-width: 1600px){
  .ex_list{
    margin: 5px 1% 0;
  }
}
@media(max-width: 1366px){
  .ex_list{
    margin: 0 1%;
    .ftInfo{
      left: 22px;
      right: 22px;
      font-size: 13px;
    }
    .paddNone{
      top: 99%;
    }
  }
}


</style>
