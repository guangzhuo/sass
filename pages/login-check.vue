<template>
    <div class="row lx-login-check">
        <div class="row all-relative" id="loginHead">
            <img v-imgerror src="~/assets/img/src/login-check/regist-bg1.jpg" class="bg-img" width="100%" height="100%" >
        </div>
        <div class="row login-absolute">
            <div class="lodin-bg">
                <form >
                    <div class="row text-center">
                        <span class="login-span">已发送验证码至<span id="phone"></span>，请输入验证码完成验证登录</span>
                    </div>
                    <div class="row login-margin-top">
                        <div class="col-xs-12">
                            <input v-model="smsCode" type="text" class="form-control" id="smsCode" placeholder="请输入手机收到的验证码" >
                        </div>
                        <!-- <div class="col-xs-3">
                            <button type="button" class="btn bottom-bg2" style="margin-left: 28px;" onclick="sendSignSms()" id="reSendSmsBtn">获取验证码</button>
                        </div> -->
                    </div>
                    <div class="row login-margin-top">
                        <div class="btn-wraper">
                            <button type="button" class="btn bottom-bg1" id="reset" @click="onReset">重置</button>
                        </div>
                        <div class="btn-space"></div>
                        <div class="btn-wraper">
                            <button type="button"  class="btn bottom-bg1" id="signSubmitBtn" @click="onSubmit">提交</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import base from '~/framework/core/vue-base.vue'
import apis from '~/config/api'
import { asyncLoadJsFile, asyncLoadCssFile } from  '~/framework/core/utils'
import xss from 'xss'
import * as types from '~/store/mutation-types'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'login-check',
    extends: base,
    data () {
        return {
            phone: '',
            smsCode: ''
        }
    },
    layout: 'user',
    validations: {
        smsCode: {
            required
        }
    },
    created () {
        this.init()
    },
    computed: {
        ...mapState({
        })
    },
    watch: {
    },
    mounted () {
        
        
    },
    methods: {
        async init () {
            const r = await this.$axios.get(apis.getCell).then((data) => data.data)
            this.phone = r.data
        },
        validate () {
            return new Promise ((resolve, reject) => {
                if (this.$v.smsCode.$invalid) {
                    this.$message.error('请输入有效的验证码！');
                    resolve(false)
                } else {
                    resolve(true)
                }
            }) 
        },
        onReset () {
            this.smsCode = ''
        },
        async onSubmit () {
            
            const r = await this.validate().then((data)=> data)
            if (r) {
                const loading = this.$createLoading()
                const checkP = await this.$axios({
                    method: 'post',
                    url: apis.checkSms,
                    data: {
                        code: this.smsCode,
                        type: 6
                    }
                }).then((data)=> {
                    loading.close()
                    return data.data
                }).catch((error)=>{
                    loading.close()
                    this.$message.error('校验失败，请重新输入');
                })
                if (checkP === 1) {
                    window.location.href="/";
                } else if (checkP === 0) {
                    this.$message.error('验证码错误');
                } else {
                    this.$message.error('校验失败，请重新输入');
                }
            }
        }
    },
    components: {
    }
    
}
</script>

<style lang="scss"  scoped >
@import "~styles/base.scss";
.lx-login-check{
    @include responsive-default {
        .all-relative{
            position: relative;
            .bg-img{
                min-height: calc(100vh - 147px);
            }
        }
        .login-absolute{
            .lodin-bg{
                background-color: #fff;
                padding: 40px 75px;
                width: 600px;
                height: 260px;
                .login-span{
                    font-size: 16px;
                    line-height: 20px;
                    padding-left: 3px;
                    padding-right: 3px;
                }
                .login-margin-top{
                    margin-top: 35px;
                    .form-control{
                        padding: 0 12px;
                    }
                    .bottom-bg1{
                        background-color: #6e9be3;
                        color: #fff;
                        width: 100%;
                    }
                    .btn-wraper{
                        width: 45%;
                        float: left;
                        position: relative;
                        min-height: 1px;
                    }
                    .btn-space{
                        width: 10%;
                        float: left;
                        position: relative;
                        min-height: 1px;
                    }
                }
            }
        }
    }
    @include responsive-lt(1599px) {
        .login-absolute{
            margin-left: -390px;
            margin-top: -180px;
            position: absolute;
            top: 50%;
            left: 50%;
        }
        
    }
}
</style>
