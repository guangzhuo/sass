import * as types from '../../mutation-types'
import ContractView from './contract-view'
import ContractEdit from './contract-edit'
import ContractPostil from './contract-postil'
import ContractSend from './contract-send'
import ContractSign from './contract-sign'
import AttachmentView from './attachment-view'
import list from './contractlist'
import ContractViewImage from './contract-view-image'
import sdkContract from './sdk-contract'
import sdkContractView from './sdk-contract-view'
const contract = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ContractView,
    ContractEdit,
    AttachmentView,
    list,
    ContractViewImage,
    sdkContract,
    sdkContractView,
    ContractPostil,
    ContractSend,
    ContractSign
  }
}

export default contract;
