<template>
  <div class="notarization">
    <section class="notarization-bg">
      <div class="lx-container">
        <div class="row">
          <div class="col-xs-6">
            <img v-imgerror src="~/assets/img/src/notarization/notarization.png" width="539px" height="336px" />
          </div>
          <div class="col-xs-6">
            <div class="col-xs-9 col-xs-offset-2 notarization-input">
                <form :model="ruleForm">
                  <div class="row form-input" style="position: relative">
                    <input type="text" placeholder="请输入存证id" v-model="ruleForm.cardId">
                    <span class="span-bg-h" v-show="isErr">{{ruleForm.err}}</span>
                  </div>
                  <div class="row form-input">
                    <input placeholder="请输入手机号" v-model="ruleForm.cellNum" style="position: relative">
                    <span style="position: absolute; right: 5px; top:3px;">555</span>
                  </div>
                  <div class="row form-input">
                    <div class="row col-xs-6">
                      <input class="input1-h" v-model="ruleForm.authCode" placeholder="请输入验证码">
                    </div>
                    <div class="col-xs-45 col-xs-offset-5s form-input">
                      <button type="button" class="check-btn" id="bt_getOldAuthCode"><b>获取验证码</b></button>
                    </div>
                  </div>
                  <div class="row text-center">
                    <div class="col-xs-45 btn-input">
                      <div @click="applyCheck(ruleForm)"><b>申请出证</b></div>
                    </div>
                    <div class="col-xs-45 col-xs-offset-1s btn-input">
                      <div @click="template()"><b>模板预览</b></div>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="notarization-pad">
      <div class="lx-container">
        <h3>公证服务</h3>
        <div class="row notarization-mar">
          <p><b>Q：云合同的公证服务是什么？</b></p>
          <p>A：云合同联合公证处推出公证服务，针对使用云合同签署的合同进行第三方存证，在发生法律纠纷时，由第三方公证处出具具有法律效力的公证文书；</p>
        </div>
        <div class="row notarization-mar">
          <p><b>Q：哪些合同、哪些用户可以申请公证服务？</b></p>
          <p>A：目前云合同的公证服务面向SDK对接用户开放，即用户所在的平台与云合同进行了技术对接并且购买了公证服务，则平台上的合同签署方可以在云合同平台申请公证服务；</p>
        </div>
        <div class="row notarization-mar">
          <p><b>Q：存证id在哪里获取？</b></p>
          <p>A：符合上一问题条件的用户，在其所签署合同的尾页中会显示存证id，依据存证id与手机号可在云合同官网申请公证服务；</p>
        </div>
        <div class="row notarization-mar">
          <p><b>Q：公证服务由谁提供？费用如何收取？</b></p>
          <p>A：公证服务由云合同合作的第三方公证处提供，费用依照公证处收费标准进行收费，云合同不从中收取任何费用；</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import base from '~/framework/core/vue-base'

  export default {
    name: 'notarization',
    extends: base,
    layout: 'default',
    data () {
      return {
        ruleForm: {
          cardId: '',
          cellNum: '',
          authCode: '',
          err:''
        },
        isErr: false
      }
    },
    computed: {
      ...mapState({
      })
  },
  watch: {
    ruleForm:{
      handler: function (newVal) {
        console.log(newVal)
        this.applyCheck(newVal);
      },
      deep: true
    }
  },
  mounted () {
    
  },
  methods: {
    applyCheck(form){
      if(form.cardId.length < 1){
        this.isErr = true;
        this.ruleForm.err = '存证id必填';
      }if(form.cardId.length > 19){
        this.isErr = true;
        this.ruleForm.err = '存证id格式不正确';
      }
      else{
        this.isErr = false;
      }
      /*var cardIdNum = this.ruleForm.cardId;
      var phoneNum = this.ruleForm.cellNum;
      var smsCode = this.ruleForm.authCode;
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          alert(12);
        }
      })*/
    }
  },
  components: {
  }
  }
</script>

<style lang="scss"  scoped >
  $lx-blue:#4081ff;
  @mixin input-css{padding: 8px 15px; border-radius: 2px; border: none; background-color: #fff; width: 100%;}
  .col-xs-45{float: left; min-width: 1px; width: 45%;}
  .col-xs-offset-5s{margin-left: 5%;}
  .col-xs-offset-1s{margin-left: 10%}
  .notarization-bg{margin-top: 67px; background-color: $lx-blue; padding: 30px 0;}
  .notarization-input{padding: 50px 15px; background-color: lighten($lx-blue,5%);}
  .form-input{
    position: relative;
    input{@include input-css; margin-bottom: 35px;}
    button{@include input-css; margin-bottom: 35px;}
  }
  .btn-input{
    div{@include input-css;
      color: lighten($lx-blue,8%);
      &:hover{color: $lx-blue; cursor:pointer}
    }
  }
  .check-btn{background-color: #eee; color: $lx-blue}
  .notarization-pad{padding: 30px 0 100px;}
  .notarization-mar{margin-top: 50px;
    b{color: #7c7c7c}
    p{color: #959595;}
  }
  .span-bg-h {
    background-color: #79a7ff;
    border-radius: 2px;
    padding: 3px 5px;
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fff;
  }
</style>
