<template>
  <div class="lx-register">
    <!-- 阿里云滑动验证码相关引入 -->
    <div id="_umfp" style="display:none;width:1px;height:1px;overflow:hidden"></div>
    <!-- 引入结束 -->
    <div class="row all-relative-w zyf clearfix" id="loginHead">
        <div class="row regist-absolute-new2 col-md-6 col-sm-6 col-xs-6">
            <img src="~/assets/img/src/regist/registBackground.png" alt="">
        </div>
        <div class="row regist-absolute-new col-md-6 col-sm-6 col-xs-6 col-sm-offset-6 col-xs-offset-6 col-md-offset-6" >
            <div class="regist-bg-new">
                <div class="regist-padding-new" id="adapt-height">
                    <div class="row">
                        <div class="col-xs-6 width70-zyf" style="margin-left:6%;">
                            <form class="form-horizontal" role="form" id="register-form" action="userRegist/regist"
                                  method="post">
                                <div class="form-group regist-row" >
                                    <div @click="onChangeRegistType(1)" id="regist-person" class="regist-choose col-xs-6 col-sm-6 col-md-6" v-bind:class="{'regist-choose-blue': userType === 1}">
                                        <span>个人注册</span></div>
                                    <div @click="onChangeRegistType(2)" id="regist-company" class="regist-choose col-xs-6 col-sm-6 col-md-6" v-bind:class="{'regist-choose-green': userType === 2}"><span>企业注册</span></div>
                                </div>
                                <div class="form-group regist-row">
                                    <div class="col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-xs-offset-1 col-sm-offset-1 input-group">
                                       <div class="image-icon-user image-icon">
                                            <i class="iconsprite icon-login_icon_03"></i>
                                        </div>
                                        <input v-model="user.loginEmail.value" type="text" class="register-input" id="loginEmail" name="loginEmail" placeholder="请输入注册用户名" @focus="$v.user.loginEmail.value.$touch()">
                                        <!-- <em v-show="user.loginEmail.info"><label id="loginEmail-error" class="error" for="loginEmail" style="display: inline-block;" v-text="user.loginEmail.info"></label></em> -->
                                        <em v-show="$v.user.loginEmail.value.$dirty && !$v.user.loginEmail.value.required"><label id="loginEmail-error" class="error" for="loginEmail" style="display: inline-block;" >用户名必填</label></em>
                                        <em v-show="!$v.user.loginEmail.value.minLength"><label id="loginEmail-error" class="error" for="loginEmail" style="display: inline-block;" >用户名必须大于3位</label></em>
                                        <em v-show="!$v.user.loginEmail.value.maxLength"><label id="loginEmail-error" class="error" for="loginEmail" style="display: inline-block;" >用户名必须小于40位</label></em>
                                        <em v-show="$v.user.loginEmail.value.required && $v.user.loginEmail.value.minLength && $v.user.loginEmail.value.maxLength && !$v.user.loginEmail.value.$pending && !$v.user.loginEmail.value.checkExist"><label id="loginEmail-error" class="error" for="loginEmail" style="display: inline-block;" >用户名已存在</label></em>
                                    </div>
                                </div>
                                <div class="form-group regist-row regist-remind">
                                    <div class="col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                        <span>提示：用户名为3~40位数字、字母组成的字符串</span>
                                    </div>
                                </div>
                                <div class="form-group regist-row">
                                    <div class="col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-xs-offset-1 col-sm-offset-1 input-group">
                                        <div class="image-icon-lock image-icon">
                                            <i class="iconsprite icon-login_icon_10"></i>
                                        </div>
                                        <input v-model="user.password.value" :type="passwordType" class="register-input" id="password"
                                               name="password"
                                               placeholder="请输入密码" @focus="$v.user.password.value.$touch()">
                                        <div class="image-icon-user image-icon pwd-flag">
                                            <i class="iconsprite" :class="{'icon-regist_icon_04': passwordType === 'password','icon-regist_icon_03': passwordType === 'text'}" @click="onSwitchPwdModel"></i>
                                        </div>
                                        <!-- <em v-show="user.password.info"><label id="password-error" class="error" for="password" style="display: inline-block;" v-text="user.password.info"></label></em> -->
                                        <em v-show="$v.user.password.value.$dirty && !$v.user.password.value.required"><label id="password-error" class="error" for="password" style="display: inline-block;">请输入密码</label></em>
                                        <em v-show="$v.user.password.value.$dirty && $v.user.password.value.required && !$v.user.password.value.space"><label id="password-error" class="error" for="password" style="display: inline-block;">密码格式错误</label></em>
                                        <em v-show="!$v.user.password.value.minLength && $v.user.password.value.space"><label id="password-error" class="error" for="password" style="display: inline-block;min-width:126px;">密码必须大于等于8位</label></em>
                                        <em v-show="!$v.user.password.value.maxLength && $v.user.password.value.space"><label id="password-error" class="error" for="password" style="display: inline-block;min-width:132px;">密码必须小于等于16位</label></em>
                                        <em v-show="$v.user.password.value.required && $v.user.password.value.minLength && $v.user.password.value.maxLength && !$v.user.password.value.format && $v.user.password.value.space"><label id="password-error" class="error" for="password" style="display: inline-block;min-width:155px">密码不能为纯数字或纯字母</label></em>
                                    </div>
                                </div>
                                <div class="form-group regist-row regist-remind">
                                    <div class="col-md-10 col-xs-10 col-sm-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                        <span>提示：密码为8~16位数字、字母组成的字符串</span>
                                    </div>
                                </div>
                                <div class="form-group regist-row">
                                    <div class="col-md-10 col-xs-10 col-sm-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 input-group">
                                        <div class="image-icon-phone image-icon">
                                            <i class="iconsprite icon-regist_icon_01"></i>
                                        </div>
                                        <input v-model.trim="user.phone.value" type="text" class="register-input" id="phone" name="phone"
                                               placeholder="请输入手机号码" @focus="$v.user.phone.value.$touch()">
                                        <!-- <em v-show="user.phone.info"><label id="phone-error" class="error" for="phone" style="display: inline-block;" v-text="user.phone.info"></label></em> -->
                                        <em v-show="$v.user.phone.value.$dirty && !$v.user.phone.value.required"><label id="phone-error" class="error" for="phone" style="display: inline-block;" >手机号码必填</label></em>
                                        <em v-show="$v.user.phone.value.required && !$v.user.phone.value.format"><label id="phone-error" class="error" for="phone" style="display: inline-block;" >手机格式不对</label></em>
                                    </div>
                                </div>
                                <div class="form-group regist-row">
                                    <div class="col-xs-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                                        <div class="ln">
                                            <div id="captcha" class="nc-container" v-bind:class="captcha.shake"></div>
                                        </div>
                                        <input type='hidden' id='csessionid' name='csessionid'/>
                                        <input type='hidden' id='sig' name='sig'/>
                                        <input type='hidden' id='token' name='token'/>
                                        <input type='hidden' id='scene' name='scene'/>


                                    </div>
                                </div>
                            </form>
                            <form class="form-horizontal" role="form" id="form-authCode">
                                <div class="form-group regist-row">
                                    <div class="col-xs-10 col-md-10 col-sm-10 col-md-offset-1 col-xs-offset-1 col-sm-offset-1 input-group" style="background-color: #ffffff;">
                                        <div class="image-icon-msg image-icon">
                                            <i class="iconsprite icon-regist_icon_02"></i>
                                        </div>
                                        <input v-model="user.authCode.value" type="text" class="register-input" id="authCode" name="authCode"
                                               placeholder="短信验证码" >
                                        <!-- <em v-show="user.authCode.info"><label id="authCode-error" class="error" for="authCode" style="display: inline-block;" v-text="user.authCode.info"></label></em> -->
                                        <em v-show="clickedRegist && !$v.user.authCode.value.required"><label id="authCode-error" class="error" for="authCode" style="display: inline-block;min-width:70px;">验证码必填</label></em>
                                        <em v-show="clickedRegist && $v.user.authCode.value.required && !$v.user.authCode.value.format"><label id="authCode-error" class="error" for="authCode" style="display: inline-block;min-width:95px;">验证码格式错误</label></em>
                                        <div class="getCode" id="bt_getCode" @click="onGetAuthCode" v-text="authCodeText"></div>
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <div class="col-xs-11 col-xs-offset-1">
                                      <span class="regist-span-a">
                                        <div class="sas-checkbox-square">
                                          <input v-model="user.agree" type="checkbox" id="agree" value="1" name="agree" class="checkbox-control">
                                          <label for="agree"></label>
                                        </div>
                                        已经阅读并同意
                                        <router-link :to="{ path: '/privacy-agreement', query: { type: 1 }}" class="index-footer-p--new-hu" target="_blank">
                                          《云合同的用户协议》
                                        </router-link>
                                        和
                                       <router-link :to="{ path: '/privacy-agreement', query: { type: 2 }}" class="index-footer-p--new-hu" target="_blank">
                                          《云合同隐私声明》
                                        </router-link>
                                      </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-xs-10 col-xs-offset-1 text-center">
                                        <button @click="onRegist" type="button" id="btn-regist" class="btn regist-bg1 regist-padding4" v-text="registBtnText">
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import base from '~/framework/core/vue-base.vue'
import _ from 'lodash'
import apis from '~/config/api'
import { required, minLength, maxLength,between } from 'vuelidate/lib/validators'
import ncPlugin from '~/plugins/nc'
let nc
export default {
    name: 'register',
    extends: base,
    metaInfo: {
        title: '注册—云合同'
    },
    layout: 'user',
    data () {
        return {
            user: {
                loginEmail: {
                    value: '',
                    info: ''
                },
                password: {
                    value: '',
                    info: ''
                },
                phone: {
                    value: '',
                    info: ''
                },
                authCode: {
                    value: '',
                    info: ''
                },
                agree: true

            },
            passwordType: 'password',
            userType: 1,
            validateRules: {
                loginEmail: [{
                    reg: /\S/,
                    msg:'用户名必填'
                },{
                    reg: /^[A-Za-z0-9]{3,}$/,
                    msg: '用户名必须大于3位'
                },{
                    reg: /^[A-Za-z0-9]{3,40}$/,
                    msg: '用户名必须小于40位'
                },{
                    reg: () => {
                        return new Promise ( (resolve,reject) =>{
                            this.$axios({
                                method: 'post',
                                url: apis.registCheck,
                                data: {
                                    loginEmail: this.$xss(this.user.loginEmail.value)
                                }
                            }).then((data) =>{
                                resolve(data.data)
                            });
                        })

                    },
                    msg: '用户名已存在'
                }],
                password: [{
                    reg: /\S/,
                    msg:'请输入密码'
                }, {
                    reg: /[^\S]+/,
                    msg: '密码格式错误'
                }, {
                    reg: /^[A-Za-z0-9]{8,}$/,
                    msg: '密码必须大于8位'
                }, {
                    reg: /^[A-Za-z0-9]{8,16}$/,
                    msg: '密码必须小于16位'
                },{
                    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                    msg: '密码不能为纯数字或纯字母'
                }],
                phone: [{
                    reg: /\S/,
                    msg:'手机号码必填'
                }, {
                    reg: /^1[3|4|5|7|8][0-9]{9}$/,
                    msg:'手机格式不对'
                }],
                authCode: [{
                    reg: /\S/,
                    msg:'验证码必填'
                }, {
                    reg: /^[0-9]{6,}$/,
                    msg:'验证码格式错误'
                }]
            },
            captcha: {
                shake: ''
            },
            ticket: {
                csessionid: '',
                sig: '',
                token: '',
                scene: ''
            },
            authCodeText: '获取验证码',
            registBtnText: '注册',
            clickedRegist: false
        }
    },
    validations: {
        user: {
            loginEmail: {
                value: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(40),
                    checkExist (val) {
                        return new Promise ( (resolve,reject) =>{
                            this.$axios({
                                method: 'post',
                                url: apis.registCheck,
                                data: {
                                    loginEmail: val
                                }
                            }).then((data) =>{
                                resolve(data.data)
                            });
                        })
                    }
                }
            },
            password: {
                value: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(16),
                    format (val) {
                        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
                        return reg.test(val)
                    },
                    space(val) {
                        let reg = /[^\S]+/;
                        return !reg.test(val);
                    }
                }
            },
            phone: {
                value: {
                    required,
                    format (val) {
                        // let reg = /^1[3|4|5|7|8][0-9]{9}$/
                        let reg = /^1[0-9]{10}$/
                        return reg.test(val)
                    }
                }
            },
            authCode: {
                value: {
                    required,
                    format (val) {
                        let reg = /^[0-9]{6,}$/
                        return reg.test(val)
                    }
                }
            }
        },
        validationGroup: ['user.loginEmail.value', 'user.password.value', 'user.phone.value']

    },
    created () {
    },
    computed: {
        ...mapState({
        })
    },
    watch: {
    },
    mounted () {
        this.initNc();
    },
    updated(){
    },
    methods: {
        initNc () {
            let self = this
            ncPlugin()
            .then(()=>{
                window.aliCaptcha = false;
                nc = new noCaptcha();
                var nc_appkey = 'USSK';  // 应用标识,不可更改
                var nc_scene = 'register';  //场景,不可更改
                var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
                var nc_option = {
                    renderTo: '#captcha',//渲染到该DOM ID指定的Div位置
                    appkey: nc_appkey,
                    scene: nc_scene,
                    token: nc_token,
                    callback: function (data) {// 校验成功回调
                        window.aliCaptcha = true;
                        self.ticket.csessionid = data.csessionid;
                        self.ticket.sig = data.sig;
                        self.ticket.token = nc_token;
                        self.ticket.scene = nc_scene;
                    }
                };
                nc.init(nc_option);
            })
        },
        resetValidateDirty() {
            this.$v.user.loginEmail.value.$reset()
            this.$v.user.password.value.$reset()
            this.$v.user.phone.value.$reset()
        },
        async userNameCheck () {
            const checkR = await this.$axios({
                method: 'post',
                url: apis.userNameCheck,
                data: {
                    userName: this.$xss(this.ticket.username)
                }
            }).then((data) => data.data);
            if (checkR) {
                this.logger.visible = false
            } else {
                this.logger.visible = true
                this.logger.text = '用户名错误'
            }

        },
        onSwitchPwdModel () {
            this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
        },
        onChangeRegistType (type) {
            this.userType = type
            this.resetUser()
        },
        onRegist() {
            this.triggerTouch()
            if (!this.$v.validationGroup.$invalid) {
                this.clickedRegist = true
                if (!this.$v.$invalid) {
                    if (this.user.agree) {
                        if (!window.aliCaptcha) {
                           this.captcha.shake = 'animated shake'
                            setTimeout(() => {
                                this.captcha.shake = ''
                            }, 1000)
                            return false;
                        } else {
                            window.aliCaptcha = false;
                            nc.reset();
                            let loading = this.$createLoading()
                            let registData = Object.assign({
                                loginEmail: this.user.loginEmail.value,
                                password: this.user.password.value,
                                phone: this.user.phone.value,
                                userType: this.userType
                            }, this.ticket);
                            registData.authCode = this.user.authCode.value;
                            registData.cellNum = this.user.phone.value;
                            this.registBtnText = '正在注册...'
                            this.$axios({
                                method: 'post',
                                url: apis.regist,
                                data: registData
                            })
                            .then((data)=> {
                                loading.close()
                                if(!data.data.success) {
                                    this.$alert(data.data.msg, '重新注册', {
                                        confirmButtonText: '确定',
                                        callback: action => {

                                        }
                                    });
                                    this.registBtnText = '重新注册'

                                } else {
                                    this.$message({
                                        message: '注册成功',
                                        type: 'success'
                                    });
                                    setTimeout(()=> {
                                        this.$router.push({path: '/login', query: {redirectUrl: '/manage'}});
                                    }, 2000);
                                    this.registBtnText = '注册成功'
                                }
                            })
                            .catch((error) => {
                                loading.close()
                                this.$alert('系统异常！请联系客服人员', '系统异常', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.registBtnText = '注册'
                                    }
                                });
                            })
                        }
                    } else {
                        this.$alert('必须同意用户协议', '用户协议', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                }
            }

            // this.validate1()
            // .then((data)=> {
            //     let checkV = _.find(data, (v)=> v.value === false)

            //     if (!checkV) {

            //     }

            // })
        },
        triggerTouch () {
            this.$v.user.loginEmail.value.$touch()
            this.$v.user.password.value.$touch()
            this.$v.user.phone.value.$touch()
        },
        async onGetAuthCode () {
            // console.log(this.$v)
            // const phoneP = await this.validate1('phone').then((data)=> data)
            this.triggerTouch()
            if (!this.$v.validationGroup.$invalid) {
                if (!window.aliCaptcha) {
                   this.captcha.shake = 'animated shake'
                    setTimeout(() => {
                        this.captcha.shake = ''
                    }, 1000)
                    return false;
                } else {
                    window.aliCaptcha = false;
                    nc.reset();
                    let registData = Object.assign({
                        loginEmail: this.user.loginEmail.value,
                        password: this.user.password.value,
                        phone: this.user.phone.value,
                        userType: this.userType
                    }, this.ticket);
                    registData.cellNum = this.user.phone.value;
                    // 当号码是新号码或旧号码的发送时间超过1分钟时重新发
                    var time = (((new Date()).getTime()) - (window.sendMessageTime || 0)) / 1000;
                    if (registData.phone == window.cellNum && time < 60) {
        //                $('#myModal').modal({backdrop: 'static', keyboard: false});
                        window.sendMessageTime = (new Date()).getTime();
                        return false;
                    }
                    window.cellNum = this.user.phone.value;
                    window.sendMessageTime = (new Date()).getTime();
                    const registCodeP = await this.$axios({
                        method: 'post',
                        url: apis.sendRegistCode,
                        data: registData
                    })
                    .then((data)=> data.data)
                    .catch((error) => {
                        window.sendMessageTime=0;
                        this.$message.error('连接超时，请重新发送');
                    })
                    if (!registCodeP.success) {
                        window.sendMessageTime=0;
                        this.$message.error(registCodeP.msg);
                    } else {
                        let stTotal = 60
                        let st = setInterval(()=> {
                            stTotal--
                            this.authCodeText = `${stTotal}s后可重新发送`
                            if (stTotal <= 0) {
                                window.clearInterval(st)
                                this.authCodeText = '重新发送'
                            }
                        }, 1000)
                    }

                }
            }
            // if (!phoneP.value) {
            //     this.user['phone'].info = phoneP.msg
            // } else {
            //     const othersP = await Promise.all([this.validate1('loginEmail'),this.validate1('password')])
            //     if (_.find(othersP, (v)=> v.value === false)) {
            //         return false
            //     } else {

            //     }
            // }

        },
        resetUser() {
            let userCopy = {
                loginEmail: {
                    value: '',
                    info: ''
                },
                password: {
                    value: '',
                    info: ''
                },
                phone: {
                    value: '',
                    info: ''
                },
                authCode: {
                    value: '',
                    info: ''
                }
            }
            // debugger
            this.user = _.assign(this.user, userCopy)
        },
        validate1(id) {
            const promise = new Promise( (resolve, reject) => {
                let reg;
                if (id) {
                    _.each(this.validateRules[id], (v, i) => {
                        reg = v.reg
                        if (typeof reg === 'function') {
                            reg()
                            .then((data)=> {
                                if (!data) {
                                    this.user[id].info = v.msg
                                    resolve({value: false, msg: v.msg})
                                    return false
                                } else {
                                    if(i == (this.validateRules[id].length -1)) {
                                        this.user[id].info = ''
                                        resolve({value: true, msg: ''})
                                    }
                                }
                            })
                        } else {
                            if (!reg.test(this.user[id].value)) {
                                this.user[id].info = v.msg
                                resolve({value: false, msg: v.msg})
                                return false
                            } else {
                               if(i == (this.validateRules[id].length -1)) {
                                    this.user[id].info = ''
                                    resolve({value: true, msg: ''})
                                }
                            }
                        }
                    })
                    // resolve({value: true, msg: ''})
                } else {
                    // let lastRuleKey = _.findLastKey(this.validateRules, (v) => {
                    //     return v.length
                    // })
                    // let errorFlag = false
                    let validatePromise =  (k) =>{
                        return new Promise((resolve, reject)=>{
                            _.each(this.validateRules[k], (v, i) => {
                                reg = v.reg
                                if (typeof reg === 'function') {
                                    reg()
                                    .then((data)=> {
                                        if (!data) {
                                            this.user[k].info = v.msg
                                            resolve({value: false, msg: v.msg})
                                            return false
                                        } else {
                                            if(i == (this.validateRules[k].length -1)) {
                                                this.user[k].info = ''
                                                resolve({value: true, msg: ''})
                                            }
                                        }
                                    })
                                } else {
                                    if (!reg.test(this.user[k].value)) {
                                        this.user[k].info = v.msg
                                        resolve({value: false, msg: v.msg})
                                        return false
                                    } else {
                                       if(i == (this.validateRules[k].length -1)) {
                                            this.user[k].info = ''
                                            resolve({value: true, msg: ''})
                                        }
                                    }
                                }
                            })
                        })
                    }
                    let allPromise = []
                    _.forEach(this.validateRules, (n, k) =>{
                        allPromise.push(validatePromise(k))
                    })
                    Promise.all(allPromise)
                    .then((data)=> {
                        resolve(data)
                    })
                }
            })
            return promise
        },
        inputBlur (e, id) {
            if (typeof e.keyCode === 'undefined') {
                return false
            }
            this.validate1(id)
            .then((data)=>{
                this.user[id].info = data.msg
            })
        }

    },
    components: {
    }
}
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";

.lx-register{
    
    @include responsive-default {
        .all-relative-w{
            background-color: #f5f7f9 !important;
            background-image: none !important;
            min-height: calc(100vh - 99px);
            margin-top: 2px;
            background: #f4f7f9;
            position: relative;
            .regist-absolute-new2{
                position: absolute;
                top: 50%;
                margin-top: -286px;
                // float: left;
                img{
                    display: inline-block;
                    float: right;
                }
            }
            .regist-absolute-new{
                position: absolute;
                // float: left;
                top: 50%;
                margin-top: -238px;
                .regist-padding-new{
                    .regist-row{
                        margin-bottom: 17px;
                        #regist-person{
                            border-right: 1px solid #666;
                        }
                        .regist-choose{
                            text-align: center;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        .regist-choose-green{
                            color: #81c06a;
                        }
                        .regist-choose-blue{
                            color: #4081ff;
                        }
                        input{
                            height: 35px;
                            border: 0;
                            width: 100%;
                            border: 0;
                            border-radius: 0;
                            outline: none;
                            background: #fff;
                            position: relative;
                            /* z-index: 2; */
                            float: left;
                            width: 100%;
                            margin-bottom: 0;
                            padding: 0 12px;
                            height: 35px;
                            line-height: 1.42857143;
                            // color: #555;
                            margin: 0;
                        }
                        .input-group{

                            padding: 1px;
                            em{
                                display: table-cell;
                                position: relative;
                                text-align: center;
                                vertical-align: middle;
                                background: #fff;
                                color: #4081ff;
                                font-style: normal;
                            }
                            .error{
                                margin: auto;
                                background-color: #4081ff;
                                color: #fff;
                                display: inline-block;
                                border-radius: 4px;
                                padding: 1px 5px;
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 20px;
                            }
                            .image-icon{
                                background: #fff;
                                // height: 35px;
                                width: 35px;
                                display: table-cell;
                                .iconsprite{
                                    display: block;
                                    margin: 6px;
                                }
                            }
                        }
                        .form-control{
                            background: #fff;
                        }
                        .ln{
                            .nc-container{
                                font-size: 12px;

                            }

                        }
                        .getCode{
                            cursor: pointer;
                            display: table-cell;
                            position: relative;
                            text-align: center;
                            vertical-align: middle;
                            background: #fff;
                            color: #4081ff;
                            min-width: 110px;
                        }
                        .pwd-flag{
                            cursor: pointer;
                        }
                        

                    }
                    .regist-remind{
                        margin-top: -12px;
                        div{
                            span{
                                color: #9e9e9e;
                                font-size: 12px;
                                padding: 3px 0 3px 0;
                            }
                        }

                    }
                    .regist-span-a{
                        font-size: 12px;
                        .index-footer-p--new-hu{
                            &:hover{
                                color: #124d93;
                                text-decoration: none;
                            }
                        }
                    }
                    #btn-regist{
                        width: 100%;
                    }

                    .btn{
                        height: 35px !important;
                    }
                    .regist-bg1{
                        background-color: $theme-color;
                        color: #fff;
                        &:hover{
                            background-color: $hover-color;
                        }
                    }
                }
            }
        }
    }
    @include responsive-lt(1366px) {
        .width70-zyf{
            width: 420px;
            .regist-row{
                margin-bottom: 14px;
                .regist-remind{
                    margin-top: -9px;
                }
                .btn{
                    width: 86px;
                    height: 32px;
                    font-size: 12px;
                }
            }
        }
    }
    @include responsive-customize(1366px, 1600px) {
        .width70-zyf{
            width: 420px;
        }
    }
    @include responsive-gt(1600px) {
        .width70-zyf{
            width: 420px;
        }
    }
}

</style>
<style type="text/css">
    .nc_wrapper{
       width: 100% !important;
    } 
    .nc_wrapper .nc_scale .btn_slide{
        height: auto; 
    }
    .nc-container .nc_scale span{
        height: 34px !important;
    }
</style>
