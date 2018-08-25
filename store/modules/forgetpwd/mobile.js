import * as types from '../../mutation-types';
const mobile = {
    state: {
        proMobile: '',
        RProoptionlist: [],
        cellNum: '',
        resetCode: '',
        cellFor: '',
        mcodeFor: '',
        oldMobile: '',
        Addoptionlist: [],
    },
    getters: {
        mphone: function (state) {
            return state.cellFor
        },
        mcode: function (state) {
            return state.mcodeFor
        },
        cellStr: function (state) {
            return state.cellNum
        },
        codeStr: function (state) {
            return state.resetCode
        }
    },
    mutations: {
        [types.SET_UPDATECELL] (state, mphone){
            state.cellFor = mphone;
        },
        [types.SET_SAVECELL] (state, usermobile){
            state.cellNum = usermobile;
        },
        [types.SET_UPDATECODE] (state, mcode) {
            state.mcodeFor = mcode;
        },
        [types.SET_SAVECODE] (state, resetCode){
            state.resetCode = resetCode;
        }
    },

    actions: {
        updatecell: ({
          commit
        }, e) => {
            /*
            忘记密码的用户手机号格式校验
            */
            let usermobile = e.target.value;
            let lusermobile = usermobile.length;
            let mphone = '';
              if(usermobile){
                if(lusermobile == 11 && /^(\d{11})$/.test(usermobile)){
                  mphone='';
                }else{
                  mphone='手机格式不对';
                }
              }else{
                mphone='手机必填';
              }
            //当前提交校验手机号格式的提示
            commit(types.SET_UPDATECELL, mphone);
            //当前提交手机号输入框数据
            commit(types.SET_SAVECELL, usermobile);
        },
        updatecode:({
          commit
        },e) => {
          /*
          忘记密码的填写用户手机验证码格式校验
          */
          let resetCode = e.target.value;
          let lresetCode = resetCode.length;
          let mcode;
          if(resetCode){
            if(lresetCode == 6 && /^(\d{6})$/.test(resetCode)){
              mcode='';
            }else{
              mcode='验证码格式不对';
            }
          }else{
            mcode = '验证码必填';
          }
          //当前提交校验验证码格式的提示
          commit(types.SET_UPDATECODE, mcode);
          //当前提交验证码输入框数据
          commit(types.SET_SAVECODE, resetCode);
        }
    }
}

export default mobile
