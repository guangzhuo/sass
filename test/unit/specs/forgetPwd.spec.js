import {  createTest, createVue, destroyVM, createMock, createElmById, createVueApp } from '../util'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import forgetpwd from '~/pages/forgetPwd'
import resetByEmail from '~/components/forgetPwd/resetByEmail'
import resetByMobile from '~/components/forgetPwd/resetByMobile'
import apis from '~/config/api'
//var expect = require('chai').expect;
//提交按钮判断为空
describe('forgetpwd.vue',() => {
  let vm;
  let mock = createMock();

  before(()=>{
    //vm = createVueApp(forgetpwd, true);
  });
  it('should render correct contents', () => {
    const vm = new Vue(forgetpwd).$mount()
    expect(vm.selectvalue).to.equal('1')
    //expect(vm.$el.querySelector('.button').textContent).to.equal('提交');
  });

});

