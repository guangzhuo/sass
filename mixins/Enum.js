let Enum = {
  OrderStatusEnum: {
    'unpaid': 1,
    'unreceiving': 2,
    'inservice': 3,
    'unconfirmed': 4,
    'completed': 5,
    'canceled': 0
  },
  ServiceOrderStatusEnum: {
    'unreceiving': 1,
    'inservice': 2,
    'unconfirmed': 3,
    'completed': 4
  },
  RoleEnum: {
    'creater': 1, //合同的创建人
    'signatory': 2, //合同的签署方
    'lawer': 3, //合同的服务律师
    'observer': 0 //查看方
  },
  RowStatusEnum: {
    'indraft': 0, //起草中
    'waitsign': 1, //等待他人签名
    'tobesign': 2, //要我签名
    'completed': 3, //已完成
    'abandoned': 4, //已作废
    'display': 5, //已隐藏
    'nothing': 6 //不存在
  },
  ColsStatusEnum: {
    'editable': 0, //可编辑
    'authing': 1, //授权中
    'watching': 2, //查看中
    'checking': 3, //律师审查中
    'tobesend': 4, //待发送
    'isigned': 10, //我已签
    'tebesign': 20, //要我签
    'pushed': 30, //已提交
    'checked': 31, //审查完成
    'signed': 32, //签署完成
    'watching1': 33, //查看中?
    'canceled': 40, //已撤回
    'returned': 41, //被退回
    'abandon': 42 //被废弃
  },
  ContractTypeFlagEnum: {
    'text': 1, //文本合同
    'image': 2, //图片合同
    'postil': 3 //批注的合同
  }
};
export default Enum;