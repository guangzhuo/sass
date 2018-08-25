import * as types from '../../mutation-types';
const contractSign = {
  state: {
    contractPageSize: 0, //合同页数
    mySignetData: {
      rows: [],
      total: 0
    }, //我的印章数据
    myAuthorizedSignetData: {

    }, //我的授权印章数据
    contractData: {
      fileList:[],
      contract: {}
    }, //合同数据
    contractSignList: [] //合同已签署印章列表
  },
  getters: {

  },
  mutations: {
   
  },
  actions: {}
};

export default contractSign;
