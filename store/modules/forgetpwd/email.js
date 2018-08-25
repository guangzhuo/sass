import * as types from '../../mutation-types';
const email = {
  state: {
    logincode:'',
    loginStr:''
  },
  getters: {
    memail:function (state) {
      return state.logincode
    },
    cemail:function (state) {
      return state.loginStr
    }
  },
  mutations: {
    [types.SET_UPDATELOGIN] (state, logincode){
      state.logincode = logincode;
    },
    [types.SET_SAVELOGIN] (state, loginStr){
      state.loginStr = loginStr;
    }
  },

  actions: {
    updatelogin: ({
      commit
    },e) => {
      /*
      忘记密码的用户账号号格式校验
       */
      let useremail = e.target.value;
      //let luseremail = useremail.length;
      let memail = '';
      //校验用户名格式规范
      let userName = /^[\w_][\w_@\\.]{2,39}$/;
      if(useremail){
        if( userName.test(useremail)){
          memail = '';
        }else{
          memail = '用户名必须由字母、数字和下划线开头的3到40个字符的字母、数字、_、@组成';
        }
      }else{
        memail = '用户名必填';
      }
      //当前提交校验账号格式的提示
      commit(types.SET_UPDATELOGIN, memail);
      //当前提交账号输入框数据
      commit(types.SET_SAVELOGIN, useremail);
    }
  }
}

export default email
