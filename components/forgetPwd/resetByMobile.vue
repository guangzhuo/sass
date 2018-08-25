<template>
  <div>
    <div class="row">
      <div class="image" id="phone"></div>
      <input id="cellNum" v-xss v-model="cellNum" name="cellNum" type="text" @blur="updatecell"
             class="line-ie input input-short" placeholder="请输入你的手机号">
      <button type="button" class="code" id="btn-sendResetPwdMessage"
              :class="{'disabled': dis}"
              @click="sendResetPwdMessage">{{ getcode }}</button>
    </div>
    <div class="remind-div">
      <label class="remind" id="remind-phone">{{ mphone }}</label>
    </div>

    <div class="row">
      <div class="image" id="ok"></div>
      <input id="resetCode" name="resetCode" v-xss v-model="resetCode" type="text" @blur="updatecode"
             class="line-ie input" placeholder="请输入手机验证码">
    </div>
    <div class="remind-div">
      <label class="remind" id="remind-code">{{ mcode }}</label>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        cellNum:'',
        resetCode:'',
        getcode:'获取验证码',
        dis:false
      }
    },
    components: {

    },
    computed:{
      ...mapGetters([
        'mphone',
        'mcode'
      ])
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'updatecell',
        'updatecode'
      ]),
      sendResetPwdMessage(){
        //获取验证码
        if(!this.dis){
          // 再次校验手机号格式
          if(!this.cellNum){
            this.$store.commit('SET_UPDATECELL','手机必填');
            return false;
          }else{
            if(!(/^(\d{11})$/.test(this.cellNum))){
              this.$store.commit('SET_UPDATECELL','手机格式不对');
              return false;
            }
          }
          const self = this;

          self.$axios({
            method: 'post',
            url: '/user/userSecurity/sendResetPwdMessage',
            data: {
              cellNum: self.$xss(self.cellNum)
            }
          }).then(function(res){
            if(!res.data.success){
              self.$store.commit('SET_UPDATECELL',res.data.msg);
            }else{
              let stTotal = 60;
              let st = setInterval(()=>{
                stTotal--;
                self.getcode = `${stTotal}s后可重发`;
                self.dis = true;
                if(stTotal <= 0){
                  window.clearInterval(st);
                  self.getcode = `重新发送`;
                  self.dis = false;
                }
              },1000);
            }
          });
          }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $borderLine:#b9c5dd;
  $borderLineSolid:1px solid $borderLine;
  $blue:#4081ff;
  $white: #fff;
  $gray:#959595;
  $bgModule:#e6ecf5;
  *{outline:none;}
  .row{
    border-bottom: $borderLineSolid;
    padding-bottom: 8px;
    height:42px;
    line-height: 33px;
    margin-bottom: 57px;
    .image{
      content: "";
      height: 33px;
      width: 33px;
      background: url("~assets/img/src/forgetPwd/icon.png") no-repeat;
      display: inline-block;
      position:absolute;
    }
    #phone{
      background-position: -27px -208px;
    }
    #ok{
      background-position: 1px -208px;
    }
    #user{
      background-position: -1px -239px;
    }
    #lockT{
      background-position: 2px -443px;
    }
    #lockOk{
      background-position: -26px -443px;
    }

    .input{
      padding-left: 38px;
      border:none;
      width: 100%;
    }
    .input-short{
      width:355px;
    }
    .line-ie {
      line-height: 20px;
    }
    :-ms-input-placeholder {
      color: rgba(153, 153, 153, 1);
    }
  }
  .code{
    background-color: $blue;
    color: $white;
    width: 104px;
    height: 33px;
    border-radius: 4px;
    border:none;
  }
  .remind-div{
    height: 22px;
  }
  .remind {
    color: $blue;
    font-weight: normal;
    font-size: 12px;
    display: inline-block;
    position: relative;
    top: -47px;
    left:34px;
  }
  .button{
    background-color: $blue;
    color:$white;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    height: 50px;
    width:411px;
    display:block;
    margin:auto;
    border:none;
    font-size:16px;
  }
  .disabled{
    background-color: $gray !important;
    cursor:auto !important;
  }
</style>
