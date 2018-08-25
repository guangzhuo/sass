
import Vue from 'vue'
import Router from 'vue-router'
import {isNotBrowser} from '~/framework/core/utils'

Vue.use(Router)

const _777ba69c = () => import('~/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _087c9918 = () => import('~/pages/website-map.vue' /* webpackChunkName: "pages/website-map" */).then(m => m.default || m)
const _8941eac0 = () => import('~/pages/inspection-result-empty.vue' /* webpackChunkName: "pages/inspection-result-empty" */).then(m => m.default || m)
const _2d2b337c = () => import('~/pages/warn.vue' /* webpackChunkName: "pages/warn" */).then(m => m.default || m)
const _38f5202d = () => import('~/pages/forgetPwd-new.vue' /* webpackChunkName: "pages/forgetPwd-new" */).then(m => m.default || m)
const _2e8a6499 = () => import('~/pages/register.vue' /* webpackChunkName: "pages/register" */).then(m => m.default || m)
const _2d229ed9 = () => import('~/pages/demo.vue' /* webpackChunkName: "pages/demo" */).then(m => m.default || m)
const _42cc1d64 = () => import('~/pages/resetPwd.vue' /* webpackChunkName: "pages/resetPwd" */).then(m => m.default || m)
const _c5dc7540 = () => import('~/pages/manage/index.vue' /* webpackChunkName: "pages/manage/index" */).then(m => m.default || m)
const _0936a464 = () => import('~/pages/news/index.vue' /* webpackChunkName: "pages/news/index" */).then(m => m.default || m)
const _7d275100 = () => import('~/pages/logout.vue' /* webpackChunkName: "pages/logout" */).then(m => m.default || m)
const _9ec8f922 = () => import('~/pages/solution.vue' /* webpackChunkName: "pages/solution" */).then(m => m.default || m)
const _4e5af960 = () => import('~/pages/inspection-result.vue' /* webpackChunkName: "pages/inspection-result" */).then(m => m.default || m)
const _d7eaced8 = () => import('~/pages/securityAnswer.vue' /* webpackChunkName: "pages/securityAnswer" */).then(m => m.default || m)
const _1a3a3182 = () => import('~/pages/404.vue' /* webpackChunkName: "pages/404" */).then(m => m.default || m)
const _24daa310 = () => import('~/pages/introduction.vue' /* webpackChunkName: "pages/introduction" */).then(m => m.default || m)
const _7705a157 = () => import('~/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _f2a71824 = () => import('~/pages/login-check.vue' /* webpackChunkName: "pages/login-check" */).then(m => m.default || m)
const _90853e68 = () => import('~/pages/security-center.vue' /* webpackChunkName: "pages/security-center" */).then(m => m.default || m)
const _52896aab = () => import('~/pages/help-center.vue' /* webpackChunkName: "pages/help-center" */).then(m => m.default || m)
const _503aec96 = () => import('~/pages/notarization.vue' /* webpackChunkName: "pages/notarization" */).then(m => m.default || m)
const _77a66d33 = () => import('~/pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _009956d2 = () => import('~/pages/privacy.vue' /* webpackChunkName: "pages/privacy" */).then(m => m.default || m)
const _4f7c4a58 = () => import('~/pages/agreement.vue' /* webpackChunkName: "pages/agreement" */).then(m => m.default || m)
const _3a1eab35 = () => import('~/pages/template/index.vue' /* webpackChunkName: "pages/template/index" */).then(m => m.default || m)
const _000dfeda = () => import('~/pages/forgetPwd.vue' /* webpackChunkName: "pages/forgetPwd" */).then(m => m.default || m)
const _5956f880 = () => import('~/pages/inspection-sign.vue' /* webpackChunkName: "pages/inspection-sign" */).then(m => m.default || m)
const _0fdaa662 = () => import('~/pages/privacy-agreement.vue' /* webpackChunkName: "pages/privacy-agreement" */).then(m => m.default || m)
const _55cc49fa = () => import('~/pages/cooperative-client.vue' /* webpackChunkName: "pages/cooperative-client" */).then(m => m.default || m)
const _67d22b8f = () => import('~/pages/template/index-old.vue' /* webpackChunkName: "pages/template/index-old" */).then(m => m.default || m)
const _9cab4f0c = () => import('~/pages/error/500.vue' /* webpackChunkName: "pages/error/500" */).then(m => m.default || m)
const _683132d5 = () => import('~/pages/news/detail.vue' /* webpackChunkName: "pages/news/detail" */).then(m => m.default || m)
const _00b6e24e = () => import('~/pages/template/detail.vue' /* webpackChunkName: "pages/template/detail" */).then(m => m.default || m)
const _04044e56 = () => import('~/pages/manage/contract/contract-postil.vue' /* webpackChunkName: "pages/manage/contract/contract-postil" */).then(m => m.default || m)
const _0f54ed56 = () => import('~/pages/manage/contract/template-my.vue' /* webpackChunkName: "pages/manage/contract/template-my" */).then(m => m.default || m)
const _dffca284 = () => import('~/pages/manage/order/my-order.vue' /* webpackChunkName: "pages/manage/order/my-order" */).then(m => m.default || m)
const _7a02471a = () => import('~/pages/manage/contract/contract-send.vue' /* webpackChunkName: "pages/manage/contract/contract-send" */).then(m => m.default || m)
const _7131aa45 = () => import('~/pages/manage/contract/contract-view-image.vue' /* webpackChunkName: "pages/manage/contract/contract-view-image" */).then(m => m.default || m)
const _140ecefb = () => import('~/pages/manage/contract/contract.vue' /* webpackChunkName: "pages/manage/contract/contract" */).then(m => m.default || m)
const _7a02554f = () => import('~/pages/manage/contract/contract-sign.vue' /* webpackChunkName: "pages/manage/contract/contract-sign" */).then(m => m.default || m)
const _68447da6 = () => import('~/pages/manage/order/my-service-order.vue' /* webpackChunkName: "pages/manage/order/my-service-order" */).then(m => m.default || m)
const _81bdb2d8 = () => import('~/pages/manage/contract/contract-view-auth-manage.vue' /* webpackChunkName: "pages/manage/contract/contract-view-auth-manage" */).then(m => m.default || m)
const _598d529c = () => import('~/pages/manage/contract/contract-tast-manage.vue' /* webpackChunkName: "pages/manage/contract/contract-tast-manage" */).then(m => m.default || m)
const _58543e64 = () => import('~/pages/manage/contract/sdk-contract-view.vue' /* webpackChunkName: "pages/manage/contract/sdk-contract-view" */).then(m => m.default || m)
const _11f98735 = () => import('~/pages/manage/contract/contract-message.vue' /* webpackChunkName: "pages/manage/contract/contract-message" */).then(m => m.default || m)
const _598689f4 = () => import('~/pages/manage/contract/attachment-view.vue' /* webpackChunkName: "pages/manage/contract/attachment-view" */).then(m => m.default || m)
const _79fbe59c = () => import('~/pages/manage/contract/contract-edit.vue' /* webpackChunkName: "pages/manage/contract/contract-edit" */).then(m => m.default || m)
const _54a94533 = () => import('~/pages/manage/contract/contract-edit-yasha.vue' /* webpackChunkName: "pages/manage/contract/contract-edit-yasha" */).then(m => m.default || m)
const _f714a538 = () => import('~/pages/manage/contract/sdk-contract-manage.vue' /* webpackChunkName: "pages/manage/contract/sdk-contract-manage" */).then(m => m.default || m)
const _7a03b237 = () => import('~/pages/manage/contract/contract-view.vue' /* webpackChunkName: "pages/manage/contract/contract-view" */).then(m => m.default || m)
const _2d375fde = () => import('~/pages/manage/contract/contract-messages.vue' /* webpackChunkName: "pages/manage/contract/contract-messages" */).then(m => m.default || m)
const _60456cd9 = () => import('~/pages/manage/contract/template-system.vue' /* webpackChunkName: "pages/manage/contract/template-system" */).then(m => m.default || m)
const _0dd0cbcd = () => import('~/pages/manage/user/sign/seal-used.vue' /* webpackChunkName: "pages/manage/user/sign/seal-used" */).then(m => m.default || m)
const _110e465a = () => import('~/pages/manage/user/order/location-open.vue' /* webpackChunkName: "pages/manage/user/order/location-open" */).then(m => m.default || m)
const _2309e8a0 = () => import('~/pages/manage/user/manage/signature.vue' /* webpackChunkName: "pages/manage/user/manage/signature" */).then(m => m.default || m)
const _5bce43b0 = () => import('~/pages/manage/user/manage/userManage.vue' /* webpackChunkName: "pages/manage/user/manage/userManage" */).then(m => m.default || m)
const _37573840 = () => import('~/pages/manage/user/check/certifyResult.vue' /* webpackChunkName: "pages/manage/user/check/certifyResult" */).then(m => m.default || m)
const _2a548fb8 = () => import('~/pages/manage/user/check/checkAutomatic.vue' /* webpackChunkName: "pages/manage/user/check/checkAutomatic" */).then(m => m.default || m)
const _b6b8848a = () => import('~/pages/manage/user/sign/signList.vue' /* webpackChunkName: "pages/manage/user/sign/signList" */).then(m => m.default || m)
const _c72a7e12 = () => import('~/pages/manage/user/mobile/modifyMobile.vue' /* webpackChunkName: "pages/manage/user/mobile/modifyMobile" */).then(m => m.default || m)
const _e7df9390 = () => import('~/pages/manage/user/upload/pdf-upload.vue' /* webpackChunkName: "pages/manage/user/upload/pdf-upload" */).then(m => m.default || m)
const _efa2f6d8 = () => import('~/pages/manage/user/order/pay-error.vue' /* webpackChunkName: "pages/manage/user/order/pay-error" */).then(m => m.default || m)
const _45afb337 = () => import('~/pages/manage/user/sign/add-user.vue' /* webpackChunkName: "pages/manage/user/sign/add-user" */).then(m => m.default || m)
const _5d149468 = () => import('~/pages/manage/user/check/company.vue' /* webpackChunkName: "pages/manage/user/check/company" */).then(m => m.default || m)
const _6fbfa312 = () => import('~/pages/manage/user/order/pay-fail.vue' /* webpackChunkName: "pages/manage/user/order/pay-fail" */).then(m => m.default || m)
const _1ef56666 = () => import('~/pages/manage/user/check/checkMoney.vue' /* webpackChunkName: "pages/manage/user/check/checkMoney" */).then(m => m.default || m)
const _fbf45dee = () => import('~/pages/manage/user/password/resetPwdProtection.vue' /* webpackChunkName: "pages/manage/user/password/resetPwdProtection" */).then(m => m.default || m)
const _3114b6a7 = () => import('~/pages/manage/user/order/lawyer-order-confirm.vue' /* webpackChunkName: "pages/manage/user/order/lawyer-order-confirm" */).then(m => m.default || m)
const _4d8e8f17 = () => import('~/pages/manage/user/check/playMoney.vue' /* webpackChunkName: "pages/manage/user/check/playMoney" */).then(m => m.default || m)
const _f9f2447e = () => import('~/pages/manage/user/password/modifyPwd.vue' /* webpackChunkName: "pages/manage/user/password/modifyPwd" */).then(m => m.default || m)
const _720d125f = () => import('~/pages/manage/user/check/certifyFile.vue' /* webpackChunkName: "pages/manage/user/check/certifyFile" */).then(m => m.default || m)
const _1f72bf36 = () => import('~/pages/manage/user/manage/user-contact.vue' /* webpackChunkName: "pages/manage/user/manage/user-contact" */).then(m => m.default || m)
const _93b84002 = () => import('~/pages/manage/user/sign/signSet-old.vue' /* webpackChunkName: "pages/manage/user/sign/signSet-old" */).then(m => m.default || m)
const _32d863de = () => import('~/pages/manage/user/order/manager.vue' /* webpackChunkName: "pages/manage/user/order/manager" */).then(m => m.default || m)
const _b6b6f0b0 = () => import('~/pages/manage/user/sign/signName.vue' /* webpackChunkName: "pages/manage/user/sign/signName" */).then(m => m.default || m)
const _181822b0 = () => import('~/pages/manage/user/upload/word-upload.vue' /* webpackChunkName: "pages/manage/user/upload/word-upload" */).then(m => m.default || m)
const _7c573247 = () => import('~/pages/manage/user/upload/img-upload.vue' /* webpackChunkName: "pages/manage/user/upload/img-upload" */).then(m => m.default || m)
const _a740e912 = () => import('~/pages/manage/user/password/addPwdProtection.vue' /* webpackChunkName: "pages/manage/user/password/addPwdProtection" */).then(m => m.default || m)
const _36dc17a5 = () => import('~/pages/manage/user/sign/signSet.vue' /* webpackChunkName: "pages/manage/user/sign/signSet" */).then(m => m.default || m)
const _1e649ed4 = () => import('~/pages/manage/user/order/recharge.vue' /* webpackChunkName: "pages/manage/user/order/recharge" */).then(m => m.default || m)
const _1f7c7f8f = () => import('~/pages/manage/user/order/pay-success.vue' /* webpackChunkName: "pages/manage/user/order/pay-success" */).then(m => m.default || m)
const _67d78857 = () => import('~/pages/manage/user/manage/purchaseList.vue' /* webpackChunkName: "pages/manage/user/manage/purchaseList" */).then(m => m.default || m)
const _f8b06896 = () => import('~/pages/manage/user/check/personal.vue' /* webpackChunkName: "pages/manage/user/check/personal" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      if (savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ x: 0, y: 0 })
          }, 0)
        })
      } else {
        return { x: 0, y: 0 }
      }
    }


export function createRouter () {
  return new Router({
    // mode: isNotBrowser() ? 'hash': 'history' ,
    mode: 'history',
    base: '',
    linkActiveClass: 'lx-link-active',
    linkExactActiveClass: 'lx-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: '/',
			components: {
				'default': _777ba69c
			},
			name: 'index',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/website-map',
			components: {
				'default': _087c9918
			},
			name: 'website-map',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/inspection-result-empty',
			components: {
				'default': _8941eac0
			},
			name: 'inspection-result-empty'
		},
		{
			path: '/warn',
			components: {
				'normal': _2d2b337c
			},
			name: 'warn',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/forgetPwd-new',
			components: {
				'default': _38f5202d
			},
			name: 'forgetPwd-new'
		},
		{
			path: '/register',
			components: {
				'user': _2e8a6499
			},
			name: 'register',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/demo',
			components: {
				'default': _2d229ed9
			},
			name: 'demo'
		},
		{
			path: '/resetPwd',
			components: {
				'user': _42cc1d64
			},
			name: 'resetPwd',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/manage',
			components: {
				'manager': _c5dc7540
			},
			name: 'manage',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/news',
			components: {
				'default': _0936a464
			},
			name: 'news',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/logout',
			components: {
				'normal': _7d275100
			},
			name: 'logout',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/solution',
			components: {
				'default': _9ec8f922
			},
			name: 'solution',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/inspection-result',
			components: {
				'default': _4e5af960
			},
			name: 'inspection-result'
		},
		{
			path: '/securityAnswer',
			components: {
				'user': _d7eaced8
			},
			name: 'securityAnswer',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/404',
			components: {
				'normal': _1a3a3182
			},
			name: '404',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/introduction',
			components: {
				'default': _24daa310
			},
			name: 'introduction',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/about',
			components: {
				'default': _7705a157
			},
			name: 'about',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/login-check',
			components: {
				'user': _f2a71824
			},
			name: 'login-check',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/security-center',
			components: {
				'default': _90853e68
			},
			name: 'security-center',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/help-center',
			components: {
				'default': _52896aab
			},
			name: 'help-center',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/notarization',
			components: {
				'default': _503aec96
			},
			name: 'notarization',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/login',
			components: {
				'user': _77a66d33
			},
			name: 'login',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/privacy',
			components: {
				'normal': _009956d2
			},
			name: 'privacy',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/agreement',
			components: {
				'normal': _4f7c4a58
			},
			name: 'agreement',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/template',
			components: {
				'default': _3a1eab35
			},
			name: 'template',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/forgetPwd',
			components: {
				'user': _000dfeda
			},
			name: 'forgetPwd',
			meta: {"layout":"user","middleware":[],"requireAuth":false}
		},
		{
			path: '/inspection-sign',
			components: {
				'default': _5956f880
			},
			name: 'inspection-sign'
		},
		{
			path: '/privacy-agreement',
			components: {
				'default': _0fdaa662
			},
			name: 'privacy-agreement',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/cooperative-client',
			components: {
				'default': _55cc49fa
			},
			name: 'cooperative-client',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/template/index-old',
			components: {
				'default': _67d22b8f
			},
			name: 'template-index-old'
		},
		{
			path: '/error/500',
			components: {
				'normal': _9cab4f0c
			},
			name: 'error-500',
			meta: {"layout":"normal","middleware":[],"requireAuth":false}
		},
		{
			path: '/news/detail',
			components: {
				'default': _683132d5
			},
			name: 'news-detail',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/template/detail',
			components: {
				'default': _00b6e24e
			},
			name: 'template-detail',
			meta: {"layout":"default","middleware":["~/middleware/check-login"],"requireAuth":false}
		},
		{
			path: '/manage/contract/contract-postil',
			components: {
				'contract': _04044e56
			},
			name: 'manage-contract-contract-postil',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/template-my',
			components: {
				'manager': _0f54ed56
			},
			name: 'manage-contract-template-my',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/order/my-order',
			components: {
				'manager': _dffca284
			},
			name: 'manage-order-my-order',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-send',
			components: {
				'contract': _7a02471a
			},
			name: 'manage-contract-contract-send',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-view-image',
			components: {
				'contract': _7131aa45
			},
			name: 'manage-contract-contract-view-image',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract',
			components: {
				'manager': _140ecefb
			},
			name: 'manage-contract-contract',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-sign',
			components: {
				'contract': _7a02554f
			},
			name: 'manage-contract-contract-sign',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/order/my-service-order',
			components: {
				'manager': _68447da6
			},
			name: 'manage-order-my-service-order',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-view-auth-manage',
			components: {
				'manager': _81bdb2d8
			},
			name: 'manage-contract-contract-view-auth-manage',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-tast-manage',
			components: {
				'manager': _598d529c
			},
			name: 'manage-contract-contract-tast-manage',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/sdk-contract-view',
			components: {
				'contract': _58543e64
			},
			name: 'manage-contract-sdk-contract-view',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-message',
			components: {
				'manager': _11f98735
			},
			name: 'manage-contract-contract-message',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/attachment-view',
			components: {
				'normal': _598689f4
			},
			name: 'manage-contract-attachment-view',
			meta: {"layout":"normal","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-edit',
			components: {
				'contract': _79fbe59c
			},
			name: 'manage-contract-contract-edit',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-edit-yasha',
			components: {
				'contract': _54a94533
			},
			name: 'manage-contract-contract-edit-yasha',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/sdk-contract-manage',
			components: {
				'manager': _f714a538
			},
			name: 'manage-contract-sdk-contract-manage',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-view',
			components: {
				'contract': _7a03b237
			},
			name: 'manage-contract-contract-view',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/contract-messages',
			components: {
				'manager': _2d375fde
			},
			name: 'manage-contract-contract-messages',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/contract/template-system',
			components: {
				'manager': _60456cd9
			},
			name: 'manage-contract-template-system',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/seal-used',
			components: {
				'manager': _0dd0cbcd
			},
			name: 'manage-user-sign-seal-used',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/location-open',
			components: {
				'contract': _110e465a
			},
			name: 'manage-user-order-location-open',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/manage/signature',
			components: {
				'manager': _2309e8a0
			},
			name: 'manage-user-manage-signature',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/manage/userManage',
			components: {
				'manager': _5bce43b0
			},
			name: 'manage-user-manage-userManage',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/certifyResult',
			components: {
				'manager': _37573840
			},
			name: 'manage-user-check-certifyResult',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/checkAutomatic',
			components: {
				'manager': _2a548fb8
			},
			name: 'manage-user-check-checkAutomatic',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/signList',
			components: {
				'manager': _b6b8848a
			},
			name: 'manage-user-sign-signList',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/mobile/modifyMobile',
			components: {
				'manager': _c72a7e12
			},
			name: 'manage-user-mobile-modifyMobile',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/upload/pdf-upload',
			components: {
				'contract': _e7df9390
			},
			name: 'manage-user-upload-pdf-upload',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/pay-error',
			components: {
				'contract': _efa2f6d8
			},
			name: 'manage-user-order-pay-error',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/add-user',
			components: {
				'manager': _45afb337
			},
			name: 'manage-user-sign-add-user',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/company',
			components: {
				'manager': _5d149468
			},
			name: 'manage-user-check-company',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/pay-fail',
			components: {
				'contract': _6fbfa312
			},
			name: 'manage-user-order-pay-fail',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/checkMoney',
			components: {
				'manager': _1ef56666
			},
			name: 'manage-user-check-checkMoney',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/password/resetPwdProtection',
			components: {
				'manager': _fbf45dee
			},
			name: 'manage-user-password-resetPwdProtection',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/lawyer-order-confirm',
			components: {
				'contract': _3114b6a7
			},
			name: 'manage-user-order-lawyer-order-confirm',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/playMoney',
			components: {
				'manager': _4d8e8f17
			},
			name: 'manage-user-check-playMoney',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/password/modifyPwd',
			components: {
				'manager': _f9f2447e
			},
			name: 'manage-user-password-modifyPwd',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/certifyFile',
			components: {
				'manager': _720d125f
			},
			name: 'manage-user-check-certifyFile',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/manage/user-contact',
			components: {
				'manager': _1f72bf36
			},
			name: 'manage-user-manage-user-contact',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/signSet-old',
			components: {
				'default': _93b84002
			},
			name: 'manage-user-sign-signSet-old'
		},
		{
			path: '/manage/user/order/manager',
			components: {
				'manager': _32d863de
			},
			name: 'manage-user-order-manager',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/signName',
			components: {
				'manager': _b6b6f0b0
			},
			name: 'manage-user-sign-signName',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/upload/word-upload',
			components: {
				'contract': _181822b0
			},
			name: 'manage-user-upload-word-upload',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/upload/img-upload',
			components: {
				'contract': _7c573247
			},
			name: 'manage-user-upload-img-upload',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/password/addPwdProtection',
			components: {
				'manager': _a740e912
			},
			name: 'manage-user-password-addPwdProtection',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/sign/signSet',
			components: {
				'manager': _36dc17a5
			},
			name: 'manage-user-sign-signSet',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/recharge',
			components: {
				'contract': _1e649ed4
			},
			name: 'manage-user-order-recharge',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/order/pay-success',
			components: {
				'contract': _1f7c7f8f
			},
			name: 'manage-user-order-pay-success',
			meta: {"layout":"contract","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/manage/purchaseList',
			components: {
				'manager': _67d78857
			},
			name: 'manage-user-manage-purchaseList',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		},
		{
			path: '/manage/user/check/personal',
			components: {
				'manager': _f8b06896
			},
			name: 'manage-user-check-personal',
			meta: {"layout":"manager","middleware":["~/middleware/check-login","~/middleware/check-auth","~/middleware/check-relogin"],"requireAuth":true}
		}
    ],
    fallback: false
  })
}
