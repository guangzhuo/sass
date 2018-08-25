import Vuex from 'vuex'
import * as types from './mutation-types'

import Header from './modules/common/header'
import Footer from './modules/common/footer'
import LeftManager from './modules/common/left-manager'
import UI from './modules/common/ui'
import Mobile from './modules/forgetpwd/mobile'
import Email from './modules/forgetpwd/email'
import list from './modules/contract/contractlist'
import Manage from './modules/manage'
import Template from './modules/template'
import News from './modules/news'
import Contract from './modules/contract'
import myAccount from './modules/myAccount'
import Order from './modules/order'
import User from './modules/user'
import inspection from './modules/inspectionSign'

const CreateStroe = () => {
  return new Vuex.Store({
    state: {
      scrollTag: false,
      isLogin: false,
      user: {},
      sessionId: '',
      manageMainStatus: 'main-normal',
      isWarned: false
    },
    mutations: {
      [types.SET_USER] (state, payload) {
          state.user = payload
      },
      [types.SET_SCROLLTAG] (state, payload) {
          state.scrollTag = payload
      },
      [types.SET_ISLOGIN] (state, payload) {
          state.isLogin = payload
      }
    },
    actions: {
    },
    modules: {
      Header,
      Footer,
      LeftManager,
      UI,
      Mobile,
      Email,
      list,
      Manage,
      Template,
      News,
      Contract,
      myAccount,
      Order,
      User,
      inspection
    }
  })
}

export default CreateStroe
