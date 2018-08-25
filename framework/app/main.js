import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import MetaInfo from 'vue-meta-info'
import LxPlugin from '~/framework/core/lx-plugin'
import fetchData from '~/framework/core/mixin/fetch-data'
import  { createRouter } from './router'
import createStore from '~/store'
import _ from 'lodash'
//自定义验证器
window._appReadyCbs = []
window.onAppReady = function (cb) {
	window._appReadyCbs.push(cb)
}

import plugin2 from '~/plugins/baidu-map'

import plugin3 from '~/plugins/lvx-ui'

import plugin4 from '~/plugins/ui'

import plugin5 from '~/plugins/vuelidate'

import plugin6 from '~/plugins/version-warn'

import plugin7 from '~/plugins/jumpH5'

Vue.use(Vuex)
Vue.use(MetaInfo)
Vue.use(LxPlugin)
Vue.mixin(fetchData);
const store = createStore();
const router = createRouter();


plugin5()


let _app;
const p = Promise.all([plugin2(),plugin3(),plugin4(),plugin6(),plugin7()])
p.then(function (v) {
	_app = new Vue({
	  router,
	  store,
	  render: h => h(App)
	});
	window._lvx = {};
	_app.$mount('#_lvx')
	Vue.nextTick(function () {
		window._appReadyCbs.forEach((cb) => {
		    if (typeof cb === 'function') {
		     	cb(_app)
		    }
		})
	})
})


export default _app;