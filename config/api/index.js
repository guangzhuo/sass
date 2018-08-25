const proxy_cas = '/cas'
const proxy_user = '/user'
const proxy_contract = '/contract'
const routers = {
    'userNameCheck': `${proxy_cas}/userNameCheck`, //校验用户名是否使用
    'l_userNameCheck':`${proxy_cas}/l_userNameCheck`,//校验是否超时多次
    'userLogin': `${proxy_user}/userInfo/login`, //验证是否登陆
    'userInfo': `${proxy_user}/userInfo/initUser`, //检索登陆用户信息
    'getTicket': `${proxy_cas}/v1/tickets`, //获取登陆token
    'getUserName': `${proxy_user}/homePage/homePage`, //验证是否登陆
    'registCheck': `${proxy_user}/userRegist/registEmailCheck`, //校验邮箱是否被注册过
    'sendRegistCode': `${proxy_user}/userRegist/sendRegistMessage`, //发送验证码到手机
    'regist': `${proxy_user}/userRegist/regist`, //注册用户
    'getCell': `${proxy_user}/userInfo/getCell`,
    'checkSms': `${proxy_user}/userInfo/checkSmsCode`,
    'newsList': `${proxy_user}/news/l_list`,
    'newsDetail': `${proxy_user}/news/l_detail`,
    'templateLise': `${proxy_contract}/contractTemplate/indexTemplate`,
    'templateDetail': `${proxy_contract}/contractEdit/getWordContentPageByUUID`,
    'getMesNum': `${proxy_contract}/message/l_getMsgNum`,
    'getAccountList': `${proxy_user}/userInfo/sameCellUserList`,
    'loginout': `${proxy_user}/userInfo/logout`,
    'casLogout': `${proxy_cas}/logout`,
    'getContractCountGroupByState': `${proxy_contract}/contractManage/queryCountForRows`, //获取合同数量根据合同状态分组
    'categoryAdd': `${proxy_user}/category/add`, //新增归类
    'categoryDelete': `${proxy_user}/category/delete`, //删除归类
    'categoryUpdate': `${proxy_user}/category/update`, //修改归类
    'fileContract': `${proxy_contract}/contractManage/fileContract`, //合同归档

    'getContractNearList': `${proxy_contract}/contractManage/l_page`, //获取最近合同列表
    'getMyTemplate': `${proxy_contract}/contractTemplate/l_myinit`,
    'setUpload':`/doc/upload`,
    'setFile':`${proxy_contract}/contractTemplate/loadFile`,
    'getLookFile':`/session/`,
    'removeFile':`${proxy_contract}/contractTemplate/remove`,
    'viewAuth':`${proxy_contract}/contractViewAuth/l_list`,
    'saveContract': `${proxy_contract}/contractEdit/l_save`, //保存创建合同
    'getmtList': `${proxy_contract}/contractEdit/template/l_query`, //获取我的模板/模板弹窗用
    'queryContractsByExistMsgTask':`${proxy_contract}/contractMsgTask/l_queryContractsByExistMsgTask`,
    'getpage':`${proxy_contract}/message/l_getpage`,
    'getQuestionAndCell':`${proxy_user}/pwdProtect/getQuestionAndCell`,
    'getQuestion':`${proxy_user}/pwdProtect/getquestion`,//获取密保问题
    'sendModifyMobileMessage':`${proxy_user}/userMobile/sendModifyMobileMessage`,
    'getTemplateHtml': `${proxy_contract}/contractEdit/l_getTemplateContent`, //根据模板id获取模板html
    'getTemplateTitle': `${proxy_contract}/contractEdit/l_fromTemplate`, //根据模板id获取模板title
    'getContractHtml': `${proxy_contract}/contractDetail/l_contractContent`, //根据pid获取合同html
    'getContract': `${proxy_contract}/contractEdit/l_contractEdit`, //获取合同信息
    'getFileUploadHtml': `${proxy_contract}/contractEdit/l_fileupload`, //获取上传合同信息
    'getContract1': `${proxy_contract}/contractDetail/l_contractDetail`, //获取合同信息
    'checkMobile':`${proxy_user}/userMobile/checkMobile`,
    'sendModifyMobileNewMessage':`${proxy_user}/userMobile/sendModifyMobileNewMessage`,
    'modifyMobile':`${proxy_user}/userMobile/modifyMobile`,
    'modifyPwd':`${proxy_user}/userSecurity/modifyPwd`,
    'getThirdUserList':`${proxy_user}/sdkUser/getThirdUserList`,
    'addPwdProtect':`${proxy_user}/pwdProtect/addPwdProtect`,
    'sendeditPwdProtectMessage':`${proxy_user}/pwdProtect/sendeditPwdProtectMessage`,
    'checkEditPwdProtectionMessage':`${proxy_user}/pwdProtect/checkEditPwdProtectionMessage`,
    'contractSignLog':`${proxy_contract}/signContract/l_contractSignLog`,
    'getCertStatus':`${proxy_contract}/signContract/getCertStatus`,
    'delete':`${proxy_contract}/contractManage/delete`, //删除合同
    'toMakeAnEndTheLawyerOrder':`${proxy_contract}/contractMoreOpt/toMakeAnEndTheLawyerOrder`,
    'undoSign':`${proxy_contract}/signContract/undoSign`,
    'revocation':`${proxy_contract}/contractMoreOpt/revocation`,
    'sendBack':`${proxy_contract}/contractMoreOpt/sendBack`, //退回合同
    'l_fromParterPdf':`${proxy_contract}/contractEdit/l_fromParterPdf`,
    'l_fromParter':`${proxy_contract}/contractEdit/l_fromParter`,
    'l_sendPage':`${proxy_contract}/contractSend/l_sendPage`,
    'getPostil': `${proxy_contract}/contractPostil`, //根据合同id获取合同批注
    'savePostil': `${proxy_contract}/contractPostil/l_save`, //保存合同的批注信息
    'updatePostil': `${proxy_contract}/contractPostil/l_update`, //修改合同的批注信息
    'linkUser':`${proxy_user}/sdkUser/linkUser`,
    'l_pageFlag':`${proxy_contract}/contractDetail/l_pageFlag`, //获取合同类型
    'contactUserList':`${proxy_user}/contact/contactUserList`,
    'checkContractNumIsNotFull': `${proxy_contract}/contractEdit/checkContractNumIsNotFull`, //获取签署合同份数
    'queryProducts': `${proxy_user}/productShop/queryProducts`,
    'getPayList': `${proxy_user}/userPay/getPayList`,
    'query':`${proxy_contract}/contractMsgTask/query`, // 获取合同提醒列表
    'msgtaskdelete':`${proxy_contract}/contractMsgTask/delete`,
    'l_manage':`${proxy_contract}/third/l_manage`,
    'l_queryContract':`${proxy_contract}/signContract/l_queryContract`,
    'getContractPageSize':`${proxy_contract}/signContract/getContractPageSize`, //获取PDF合同pagesize
    'signquery':`${proxy_contract}/signContract/query`,
    'l_view':`${proxy_contract}/third/l_view`,
    'signContract':`${proxy_contract}/signContract/signContract`,
    'sendSignSms': `${proxy_contract}/signContract/sendSignSms`,
    'addContactUser':`${proxy_user}/contact/addContactUser`,
    'modifyContactUser':`${proxy_user}/contact/modifyContactUser`,
    'delContactUser':`${proxy_user}/contact/delContactUser`,
    'addFilesContract': `${proxy_contract}/contractEdit/l_uploadAccessoryFile`, //编辑合同添加附件
    'queryPageListByCondition': `${proxy_contract}/sealUse/queryPageListByCondition`, //授权使用列表
    'getSign':`${proxy_user}/sign/query`, //获取我的印章
    'authorizedSignList':`${proxy_user}/sign/authorizedSignList`, //获取授权印章
    'signShareList':`${proxy_user}/sign/signShareList`, //获取授权列表
    'checkShareUser':`${proxy_user}/sign/checkShareUser`, //检查授权用户
    'signShare':`${proxy_user}/sign/signShare`, //授权印章
    'cacelSignShare':`${proxy_user}/sign/cacelSignShare`, //删除授权用户
    'delSign':`${proxy_user}/sign/delete`,
    'create':`${proxy_user}/sign/create`,
    'uploadFile':`${proxy_contract}/contractEdit/l_uploadFile`,
    'uploadImg': `${proxy_contract}/Imgcontract/l_uploadImgContractImg`,
    'uploadImgTwo': `${proxy_contract}/Imgcontract/l_uploadImgContract`,
    'l_getViews': `${proxy_contract}/contractViewAuth/l_getViews`, //获取合同的所有查看人
    'delect_contractViewAuth':`${proxy_contract}/contractViewAuth`, //删除合同的查看人
    'addMsgTask':`${proxy_contract}/contractMsgTask/addMsgTask`,
    'getContactByLoginEmail':`${proxy_user}/contact/getContactByLoginEmail`,
    'getUserByEmail':`${proxy_contract}/userInfo/getUserByEmail`,
    'l_send':`${proxy_contract}/contractSend/l_send`,
    'delAttachment': `${proxy_contract}/contractEdit/l_delAccessoryFile`, //删除附件
    'viewAttachment': `${proxy_contract}/contractEdit/l_queryUploadFileAll`, //查看附件
    'genContractImage': `${proxy_contract}/signContract/genContractImages` ,//生成合同图片
    'putstates':`${proxy_contract}/message/putstates`,
    'putstate':`${proxy_contract}/message/putstate`,
    'l_pageFlagByCid':`${proxy_contract}/contractDetail/l_pageFlagByCid`,
    'uploadAccessoryFile': `${proxy_contract}/contractEdit/uploadAccessoryFile`, //上传合同附件
    'getThirdSignList':`${proxy_user}/sdkUser/getThirdSignList`, //第三方签名列表
    'revocationContract': `${proxy_contract}/contractMoreOpt/l_revocation`, //撤回合同
    'isContractExist': `${proxy_contract}/signContract/isDownloadFileExist`,
    'get_l_confirm': `${proxy_user}/orders/l_confirm`,
    'orderSubmit': `${proxy_user}/orders/submit`,
    'terminateService': `${proxy_contract}/contractMoreOpt/l_toMakeAnEndTheLawyerOrder`, //终止律师服务
    'editPwdProtect': `${proxy_user}/pwdProtect/editPwdProtect`,
    'getOrders': `${proxy_user}/orders/l_manage`, //获取我的订单数据
    'cancelOrder': `${proxy_user}/orders/cancel`, //取消订单根据订单号
    'agreeOrder': `${proxy_user}/orders/agree`, //确认订单
    'getLawyerOrder': `${proxy_user}/orders/lawyer/l_manage`, //获取律师的服务订单
    'getOrderRemand': `${proxy_user}/orders/examine`, //获取订单的用户需求
    'doReceiveOrder': `${proxy_user}/orders/receive`, //确认接单
    'getWorkList': `${proxy_user}/orders/contract/l_list`, //获取交付成果
    'submitWork': `${proxy_user}/orders/refer/result`, //提交成果根据服务订单id
    'delPostil': `${proxy_contract}/contractPostil/delete`, //删除批注
    'getGopay': `${proxy_user}/recharge/gopay`, //订单
    'gopaySub': `${proxy_user}/recharge/gopay/submit`,//订单提交
    'getContractSign':`${proxy_contract}/signContract/getContractSign`, //获取合同签章
    'getHasUnlinkedUser': `${proxy_user}/sdkUser/hasUnLinkedUser` ,//获取是否有未关联账号
    'getProduct' : `${proxy_user}/recharge/gopay/product`,
    'getAli':`${proxy_user}/Alipay/product`,
    'getAlipay': `${proxy_user}/Alipay`,
    'orderComplaint': `${proxy_user}/orders/complaints`, //订单投诉
    'isDownloadFileExist': `${proxy_contract}/signContract/isDownloadFileExist`,
    'getSignInfoPageSize': `${proxy_contract}/signContract/getSignInfoPageSize`, //获取合同签署历史页数
    'getIAllIndustry':`${proxy_user}/companyAuth/getIAllIndustry`,//获取实名认证行业信息
    'personalInfoAuth': `${proxy_user}/userAuth/personalInfoAuth`, //个人四要素实名认证(自动认证)
    'sendPersonalCheckSmsCode': `${proxy_user}/userAuth/sendPersonalCheckSmsCode`,//个人四要素实名认证(验证码)
    'isIdCardAuth':`${proxy_user}/userAuthNew/isIdCardAuth`,//判断身份证是否实名认证过
    'addBaseInfo':`${proxy_user}/userAuthNew/addBaseInfo`,//个人实名认证添加基础信息
    'addMoreInfo':`${proxy_user}/userAuthNew/addMoreInfo`,//个人实名认证添加增强信息
    'companyInfoCompare':`${proxy_user}/userAuth/companyInfoCompare`, //企业实名认证(自动认证)
    'bankList': `${proxy_user}/bank/bankList`, //对公打款(开会银行列表)
    'cityList': `${proxy_user}/bank/cityList`, //对公打款(城市列表)
    'toCompanyMoney': `${proxy_user}/bank/toCompanyMoney`, //对公打款
    'checkToCompanyMoney': `${proxy_user}/bank/checkToCompanyMoney`,//打款验证
    'getToCompanyMoneyNum': `${proxy_user}/bank/getToCompanyMoneyNum`,//获取次数
    'checkToCompanyMoneyStatus': `${proxy_user}/bank/checkToCompanyMoneyStatus`,//获取打款状态

    'addCompanyMoreInfo': `${proxy_user}/companyAuth/addCompanyMoreInfo`, //企业实名认证添加增强信息
    'addCompanyBaseInfo':`${proxy_user}/companyAuth/addCompanyBaseInfo`,//企业实名认证添加基础信息
    'remaindSign':`${proxy_contract}/signContract/remaindSign`,//发短信提醒对方签署合同接口
    'getUserBaseInfo': `${proxy_user}/userAuthNew/getUserBaseInfo`, //获取用户认证基本信息
    'isCorpNameAuth': `${proxy_user}/companyAuth/isCorpNameAuth`, //判断认证的企业是否已认证
    'isLicenseNumAuth': `${proxy_user}/companyAuth/isLicenseNumAuth`, //判断认证企业证件号似乎否已存在
    'n_query': `${proxy_user}/sign/n_query`, //获取我的印章列表
    'authorizedSignList': `${proxy_user}/sign/authorizedSignList`, //获取授权印章列表
    'typeList': `${proxy_contract}/contractTemplate/typeList`,
    'getCompanyBaseInfo': `${proxy_user}/companyAuth/getCompanyBaseInfo`, //获取企业认证基本信息
    'order_contract': `${proxy_user}/orders/contact`, //获取合同订单
    'unagree': `${proxy_user}/orders/unagree`, //订单继续服务
    'appraisal': `${proxy_user}/orders/appraisal`,  //订单评价
    'cleanLoginLog': `${proxy_contract}/homePage/cleanLoginLog`, //清除cas不用设备登陆记录
    'contractCategoryList': `${proxy_user}/category/list`,
    'contrctCagegoryDel': `${proxy_user}/category/delete` //删除合同文件夹
}



export default routers
