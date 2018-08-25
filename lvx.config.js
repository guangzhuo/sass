const _ =  require('lodash');
module.exports = {
  dev: {
    proxyTable: {
      '/user':{
          // target: 'http://192.168.0.170:8080',
          target:'https://test.yunhetong.com',
          changeOrigin:true,
          secure: false,
          // pathRewrite: {"^/user" : ""},
          bypass: function(req, res, proxyOptions) {

          }

      },
      '/contract':{
        target:'https://test.yunhetong.com',
        secure: false,
        // pathRewrite: {"^/contract" : ""},
        bypass: function(req, res, proxyOptions) {
        }
      },
      '/session':{
        target:'https://test.yunhetong.com',
        secure: false,
        bypass: function(req, res, proxyOptions) {
        }
      },
      '/cas': {
          target: 'https://test.yunhetong.com', //https://192.168.0.55:8443',
          changeOrigin:true,
          secure: false,
          // pathRewrite: {"^/cas" : ""},
          bypass: function(req, res, proxyOptions) {
              // console.log(req)
              // console.log(res)
              // console.log(proxyOptions)
          }
      },
      '/doc': {
          target:'http://218.244.151.14:8011',
          // secure: false,
          // pathRewrite: {"^/cas" : ""},
          bypass: function(req, res, proxyOptions) {
          }
      },
      '/yz': {
        target:'https://test.yunhetong.com',
        // secure: false,
        // pathRewrite: {"^/cas" : ""},
        bypass: function(req, res, proxyOptions) {
        }
      }
    },
    // host: '192.168.0.109',
    port: 8080
  },
  build: {
    prerender: false,
    dist: 'dist',
    projectName: '',
    publicPath: '/',
    extend(config) {
      config.productionSourceMap = config.devtool = false
      return config
    }

  },
  router: {
    base: '',
    mode: 'history',
    middleware: ['~/middleware/check-login', '~/middleware/check-auth', '~/middleware/check-relogin'], //配置所有中间件资源
    // middleware: [],
    meta: [{
      routers: [
        '/',
        '/about',
        '/cooperative-client',
        '/help-center',
        '/introduction',
        '/notarization',
        '/security-center',
        '/solution',
        '/website-map',
        '/template',
        '/template/detail',
        '/news',
        '/news/detail',
        '/privacy-agreement',
      ],
      data: {
        layout: 'default',
        middleware: ['~/middleware/check-login'],
        requireAuth: false,
      }
    }, {
      routers: ['/forgetPwd', '/login-check', '/login', '/register', '/resetPwd', '/securityAnswer'],
      data: {
        layout: 'user',
        middleware: [],
        requireAuth: false,
      }
    }, {
      routers: ['/error/500', '/404', '/agreement', '/logout', '/privacy', '/warn'],
      data: {
        layout: 'normal',
        middleware: [],
        requireAuth: false,
      }
    }, {
      routers: ['/manage/contract/attachment-view'],
      data: {
        layout: 'normal',
        middleware: ['~/middleware/check-login', '~/middleware/check-auth', '~/middleware/check-relogin'],
        requireAuth: true,
      }
    }, {
      routers: [
        '/manage',
        '/manage/contract/contract-message',
        '/manage/contract/contract-messages',
        '/manage/contract/contract-tast-manage',
        '/manage/contract/contract-view-auth-manage',
        '/manage/contract/contract',
        '/manage/contract/sdk-contract-manage',
        '/manage/contract/template-my',
        '/manage/contract/template-system',
        '/manage/order/my-order',
        '/manage/order/my-service-order',
        '/manage/user/check/company',
        '/manage/user/check/checkAutomatic',
        '/manage/user/check/playMoney',
        '/manage/user/check/checkMoney',
        '/manage/user/check/certifyFile',
        '/manage/user/check/certifyResult',
        '/manage/user/check/personal',
        '/manage/user/manage/purchaseList',
        '/manage/user/manage/signature',
        '/manage/user/manage/user-contact',
        '/manage/user/manage/userManage',
        '/manage/user/mobile/modifyMobile',
        '/manage/user/order/manager',
        '/manage/user/password/addPwdProtection',
        '/manage/user/password/modifyPwd',
        '/manage/user/password/resetPwdProtection',
        '/manage/user/sign/signList',
        '/manage/user/sign/signName',
        '/manage/user/sign/signSet',
        '/manage/user/sign/add-user',
        '/manage/user/sign/seal-used'
      ],
      data: {
        layout: 'manager',
        middleware: ['~/middleware/check-login', '~/middleware/check-auth', '~/middleware/check-relogin'],
        requireAuth: true,
      }
    }, {
      routers: [
        '/manage/contract/contract-edit',
        '/manage/contract/contract-edit-yasha',
        '/manage/contract/contract-postil',
        '/manage/contract/contract-send',
        '/manage/contract/contract-sign',
        '/manage/contract/contract-view-image',
        '/manage/contract/contract-view',
        '/manage/contract/sdk-contract-view',
        '/manage/user/order/lawyer-order-confirm',
        '/manage/user/order/location-open',
        '/manage/user/order/pay-error',
        '/manage/user/order/pay-fail',
        '/manage/user/order/pay-success',
        '/manage/user/order/recharge',
        '/manage/user/upload/img-upload',
        '/manage/user/upload/pdf-upload',
        '/manage/user/upload/word-upload'
      ],
      data: {
        layout: 'contract',
        middleware: ['~/middleware/check-login', '~/middleware/check-auth', '~/middleware/check-relogin'],
        requireAuth: true,
      }
    }],
    scrollBehavior: function(to, from, savedPosition) {
      if (savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ x: 0, y: 0 })
          }, 0)
        })
      } else {
        return { x: 0, y: 0 }
      }
    },
    extendRoutes: function (routers, isProduction) {
      // routers.push({
      //   path: '*',
      //   component: 'all',
      //   name: 'all',
      //   filepath: 'pages/index.vue'
      // })
      if (isProduction) {
        _.remove(routers, (n)=>{
          return n.name === 'demo';
        })
      }
      // _.remove(routers, (n)=>{
      //   return n.name === 'login';
      // })
      return routers
    }
  },
  css: ['~/static/css/bootstrap/css/bootstrap.min.css', '~/static/css/animate/animate.css', '~/style/scss/lvx.variables.scss', '~/style/scss/lvx.scss',  '~/style/scss/common.scss', '~/assets/style/sprite/sprite.css', '~/assets/style/iconfont/iconfont.css'],
  plugins: [{
    src: '~/plugins/baidu-hmt',
    isProduction: true,
  },{
    src: '~/plugins/cnzz',
    isProduction: true,
  },{
    src: '~/plugins/baidu-map',
    isProduction: false,
    sync: true
  },{
    src: '~/plugins/lvx-ui',
    sync: true
  },{
    src: '~/plugins/ui',
    sync: true
  },{
    src: '~/plugins/vuelidate',
    sync: false
  },{
    src: '~/plugins/version-warn',
    sync: true
  },{
    src: '~/plugins/jumpH5',
    sync: true
  }]
}
