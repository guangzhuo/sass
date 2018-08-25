const layout_default = 'default'
const layout_user = 'user'
const layout_normal = 'normal'
const layout_manage = 'manager'
const layout_contract = 'contract'

const metaDic = {
  'index': {
      'requireAuth': false,
      'layout': layout_default
  },
  'error': {
      'requireAuth': false,
      'layout': layout_normal
  },
  'introduction': {
      'requireAuth': false,
      'layout': layout_default
  },
  'help-center': {
    'requireAuth': false,
    'layout': layout_default
  },
  'login': {
      'requireAuth': false,
      'layout': layout_user
  },
  'logout': {
      'requireAuth': false,
      'layout': layout_normal
  },
  'warn': {
      'requireAuth': false,
      'layout': layout_normal
  },
  '404': {
      'requireAuth': false,
      'layout': layout_user
  },
  'error-500': {
      'requireAuth': false,
      'layout': layout_normal
  },
  'register': {
      'requireAuth': false,
      'layout': layout_user
  },
  'forgetPwd': {
    'requireAuth': false,
    'layout': layout_user
  },
  'securityAnswer': {
    'requireAuth': false,
    'layout': layout_user
  },
  'resetPwd': {
    'requireAuth': false,
    'layout': layout_user
  },
  'solution': {
      'requireAuth': false,
      'layout': layout_default
  },
  'about': {
    'requireAuth': false,
    'layout': layout_default
  },
  'news': {
      'requireAuth': false,
      'layout': layout_default
  },
  'news-id': {
      'requireAuth': false,
      'layout': layout_default
  },
  'cooperative-client': {
    'requireAuth': false,
    'layout': layout_default
  },
  'website-map': {
    'requireAuth': false,
    'layout': layout_default
  },
  'manage': {
    'requireAuth': true,
    'layout': layout_manage
  },
  'manage-contract': {
      'requireAuth': true,
      'layout': layout_manage
  },
  'manage-contract-template-my': {
      'requireAuth': true,
      'layout': layout_manage
  },
  'manage-template-system': {
      'requireAuth': true,
      'layout': layout_manage
  },
  'manage-contract-template-system':{
    'requireAuth': true,
    'layout': layout_manage
  },
  'security-center': {
      'requireAuth': false,
      'layout': layout_default
  },
  'notarization': {
      'requireAuth': false,
      'layout': layout_default
  },
  'template': {
      'requireAuth': false,
      'layout': layout_default
  },
  'template-detail': {
      'requireAuth': false,
      'layout': layout_default
  },
  'news-detail': {
      'requireAuth': false,
      'layout': layout_default
  },
  'login-check': {
      'requireAuth': false,
      'layout': layout_user
  },
  'privacy-agreement': {
      'requireAuth': false,
      'layout': layout_default
  },
  'agreement': {
      'requireAuth': false,
      'layout': layout_default
  },
  'privacy': {
      'requireAuth': false,
      'layout': layout_default
  },
  'demo': {
      'requireAuth': false,
      'layout': layout_normal
  },
  'manage-user-sign-signSet': {
      'requireAuth': true,
      'layout': layout_manage
  },
  'manage-user-sign-signName':{
      'requireAuth':true,
      'layout': layout_manage
  },
  'manage-user-upload-img-upload':{
      'requireAuth':true,
      'layout': layout_contract
  },
  'manage-user-upload-word-upload':{
        'requireAuth':true,
        'layout': layout_contract
  },
  'manage-user-upload-pdf-upload':{
      'requireAuth':true,
      'layout': layout_contract
  },
  'manage-contract-contract':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-sign-signList':{
      'requireAuth':true,
      'layout': layout_manage
    },
  'manage-contract-contract-view-auth-manage':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-edit': {
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-order-my-order':{
      'requireAuth':true,
      'layout': layout_manage
  },
  'manage-order-my-service-order':{
      'requireAuth':true,
      'layout': layout_manage
  },
  'manage-user-password-modifyPwd':{
      'requireAuth': true,
      'layout': layout_manage
  },
  'manage-user-password-addPwdProtection':{
    'requireAuth': true,
    'layout': layout_manage
  },
  'manage-user-password-resetPwdProtection':{
    'requireAuth': true,
    'layout': layout_manage
  },
  'all': {
      'requireAuth': false,
      'layout': layout_default
  },
  'manage-contract-contract-message':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-tast-manage':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-send':{
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-contract-contract-messages':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-mobile-modifyMobile':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-view': {
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-user-manage-userManage':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-sign-add-user':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-sign-seal-used':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-manage-signature':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-postil': {
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-user-manage-purchaseList':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-contract-sign':{
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-contract-sdk-contract-manage':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-contract-sdk-contract-view':{
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-user-manage-user-contract':{
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-contract-attachment-view':{
    'requireAuth':true,
    'layout': layout_normal
  },
  'manage-contract-contract-view-image':{
    'requireAuth':true,
    'layout': layout_contract
  },
  'manage-user-user':{
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-manage-user-contact': {
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-order-lawyer-order-confirm': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-order-recharge': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-order-manager': {
    'requireAuth':false,
    'layout': layout_manage
  },
  'manage-user-order-pay-error': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-order-location-open': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-order-pay-fail': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-order-pay-success': {
    'requireAuth':false,
    'layout': layout_contract
  },
  'manage-user-check-personal': {
    'requireAuth':true,
    'layout': layout_manage
  },
  'manage-user-check-company': {
    'requireAuth':true,
    'layout': layout_manage
  },

    'inspection-sign': {
      'requireAuth': false
    },
  /* 验签结果 */
  'inspection-result': {
    'requireAuth': false
  },
  /* 验签结果为空 */
  'inspection-result-empty': {
    'requireAuth': false
  }
}

export default metaDic;
