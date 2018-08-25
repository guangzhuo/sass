/**
 * Created by Administrator on 2018/4/13.
 */
import * as types from '../../mutation-types'
import signature from './signature'
import signList from './signList'
import userContact from './user-contact'
import userManage from './user-manage'
import sdkSignList from './sdkSignList'
import seal from './seal'
const myAccount = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    signature,
    userContact,
    userManage,
    signList,
    sdkSignList,
    seal
  }
}

export default myAccount;
