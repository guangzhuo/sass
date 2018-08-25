<template>
  <section class="row all-relative-w zyf-forgetPwd">
    <div class="lx-container forgetPwd">
      <div class="title">
        <span>找回密码</span>
      </div>
      <div class="body">
        <div class="main">
          <div class="title-min"><span>请输入密保问题答案</span></div>
          <form class="form-horizontal" id="form-Answer">
            <input readonly class="question" type="text" title="" v-model="q1"/>
            <input class="answer" type="text" title="" name="answer1" v-model="answer1" placeholder="请输入上面问题的答案"/>
            <input readonly class="question" type="text" title="" v-model="q2"/>
            <input type="text" class="answer" title="" name="answer2" v-model="answer2" placeholder="请输入上面问题的答案"/>
            <input readonly class="question" type="text" title="" v-model="q3"/>
            <input type="text" class="answer"  title="" name="answer3" v-model="answer3" placeholder="请输入上面问题的答案"/>
          </form>
          <button type="button" class="button" id="btn-putAnswer" @click="putAnswer">
            确定
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import base from '~/framework/core/vue-base.vue'
export default {
  name: 'securityAnswer',
  extends: base,
  layout: 'user',
  metaInfo:{
    title: '密保问题-云合同',
    meta: [{
      name: 'keywords',
      content: '云合同，电子合同，电子签名，电子签章，电子签约，电子合同服务平台，在线签约'
    },{
      name: 'description',
      content: '云合同是律讯公司自主研发的第三方电子合同平台，致力于合同生态链的建设与完善，是“互联网”+合同的完美呈现。全国咨询热线：400-600-3669'
    }]
  },
  data() {
    return {
      q1:'',
      q2:'',
      q3:'',
      qid1:'',
      qid2:'',
      qid3:'',
      answer1:'',
      answer2:'',
      answer3:'',
      uid:''
    }
  },
  created () {

  },
  computed: {
  ...mapState({
  })
  },
  watch: {
  },
  mounted () {
    this.showAnswer();
  },
  methods: {
    showAnswer(){
      let data = JSON.parse(sessionStorage.getItem('securityAnswer'));
      this.q1 = data.content1;
      this.q2 = data.content2;
      this.q3 = data.content3;
      this.qid1 = data.qid1;
      this.qid2 = data.qid2;
      this.qid3 = data.qid3;
      this.uid = data.uid;
    },
    putAnswer(){
      if(this.answer1&&this.answer2&&this.answer3){
          const self = this;
        self.$axios({
          method: 'post',
          url: '/user/pwdProtect/verifyPwdProtect',
          data: {
            answer1: self.$xss(self.answer1),
            answer2: self.$xss(self.answer2),
            answer3: self.$xss(self.answer3),
            qid1: self.$xss(self.qid1),
            qid2: self.$xss(self.qid2),
            qid3: self.$xss(self.qid3),
            uid: self.$xss(self.uid)
          }
        }).then(function(res){
          // console.log(res.data);
          if(!res.data.success){
            self.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: res.data.msg
            });
            return ;
          }else{
            sessionStorage.userData = res.data.data.loginEmail;
            sessionStorage.isMobile = 0;  
            self.$createMessage({
              type:'success',
              duration:3000,
              spinnerText: '验证成功'
            })
            setTimeout(function () {
              self.$router.push({path:'/resetPwd'});
            },3000)
          }
        });
      }else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '提交信息不完整'
        })
        
        return false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  $borderLine:#b9c5dd;
  $borderLineSolid:1px solid $borderLine;
  $blue:#4081ff;
  $white: #fff;
  $gray:#959595;
  $bgModule:#e6ecf5;
  .all-relative-w{
    min-height: calc(100vh - 97px);
    background: #f4f7f9;
  }
  .zyf-forgetPwd {

    * {
      outline: none;
    }
    @include responsive-default {
      .forgetPwd {
        margin: 30px auto 30px;
        width: 1141px;
        background: $white;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .075);
      }
      .body {
        padding-bottom: 20px;
      }

      @media(max-width: 1920px) {
        .forgetPwd {
          height: calc(100vh - 300px);
        }
      }

      @media (max-width: 1600px) {
        .forgetPwd {
          height: auto;
        }
        .row {
          margin-bottom: 28px;
        }
      }
      @media (max-width: 1366px) {
        .forgetPwd {
          height: auto;
        }
        .row {
          margin-bottom: 28px;
        }
      }
      .title {
        height: 83px;
        margin: 0 28px;
        border-bottom: $borderLineSolid;
        font-size: 24px;
        span {
          display: inline-block;
          padding: 40px 0 0 46px;
        }
      }
      .main {
        width: 465px;
        margin: auto;
      }

      .row {
        border-bottom: $borderLineSolid;
        padding-bottom: 8px;
        height: 42px;
        line-height: 33px;
        margin-bottom: 57px;
        .input {
          padding-left: 38px;
          border: none;
          width: 100%;
        }
      }
      .button {
        background-color: $blue;
        color: $white;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width: 411px;
        display: block;
        margin: auto;
        border: none;
        font-size: 16px;
      }

      .title-min {
        color: $gray;
        margin: 36px auto 31px;
        font-size: 16px;
        span {
          display: block;
          margin: auto;
          width: 144px;
        }
      }

      .title-min-blue {
        color: $blue;
        margin: 84px auto 80px;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
      }

      #form-Answer {
        input{
          color: #333;
          border: $borderLineSolid;
          background-color: $bgModule;
          display: block;
          height: 50px;
          width: 420px;
          line-height: 50px;
          font-size: 14px;
          margin: 0 auto 17px;
          padding: 0 23px;
          border-radius: 1px;
        }
        :-ms-input-placeholder {
          color: rgba(153, 153, 153, 1);
        }
        .button {
          padding-top: 68px;
          width: 420px;
        }
      }

    blue {
      cursor: pointer;
    }
    .line-ie {
      line-height: 20px;
    }
    }
  }
</style>
