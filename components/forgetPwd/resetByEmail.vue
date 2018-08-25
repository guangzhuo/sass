<template>
  <div>
    <div class="row">
      <div class="image" id="user"></div>
      <input id="loginEmail" name="loginEmail" type="text"
             v-xss v-model="loginEmail" @blur="updatelogin"
             class="line-ie input" placeholder="请输入你的用户名">
    </div>
    <div class="remind-div">
      <label class="remind" id="remind-userId">{{ memail }}</label>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        loginEmail:''
      }
    },
    components: {

    },
    computed:{
      ...mapGetters([
        'memail'
      ])
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'updatelogin'
      ])
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
