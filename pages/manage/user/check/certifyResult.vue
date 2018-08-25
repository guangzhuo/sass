<template>
    <div class="demo-content">
        <sas-breadcrumb >
          <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
          <sas-breadcrumb-item :to="{ path: '/manage/user/manage/userManage' }">用户信息</sas-breadcrumb-item>
          <sas-breadcrumb-item>企业认证</sas-breadcrumb-item>
        </sas-breadcrumb>
        <div class="row step">
            <lvx-steps :active="active" align-center :line-type="lineType">
                <lvx-step title="信息录入" icon="lvx-icon-edit"><i slot="icon" class="iconsprite icon-message"></i></lvx-step>
                <lvx-step title="打款验证" icon="lvx-icon-upload"><i slot="icon" class="iconsprite icon-play-money-active"></i></lvx-step>
                <lvx-step title="认证结果" icon="lvx-icon-service"><i slot="icon" class="iconsprite icon-result-active"></i></lvx-step>
            </lvx-steps>
        </div>
        <section class="text-center">
            <div class="row">
                <i class="iconsprite icon-success"></i>
                <div class="row">
                    <p>恭喜你顺利通过企业实名认证</p>
                    <p>{{time}}s后为您自动返回首页...</p>
                </div>
                <div class="row mar-top">
                    <router-link :to="{path:'/manage'}">
                        <lvx-button type="primary">返回首页</lvx-button>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import apis from "~/config/api";

    export default {
        name: "companyCertify",
        metaInfo: {},
        data() {
            return {
                active:3,
                lineType: 'dashed',
                time:4
            };
        },
        filters: {
        },
        created() {},
        computed: {},
        watch: {
        },
        mounted() {
            this.settime()
        },
        methods: {
            settime(val) {
                const self = this;
                if (self.time == 1) {
                    self.$router.push({path: `/manage`});
                    return;
                } else {
                    self.time--;
                }
                setTimeout(function() {
                    self.settime(val)
                },1000)
            }
        },
        components: {}
    };
</script>

<style lang="scss"  scoped >
    .step{margin: 20px auto;}
    section {
        min-height: calc(100vh - 300px);
        background: #fff;
        padding: 8vh 20px 8vh;
        position: relative;
        p:first-child{font-size: 16px; margin-top: 30px;}
        p:last-child{color: #959595; margin-top: 10px;}
        .mar-top{margin-top: 50px;}
    }
</style>
<style lang="scss">
    .demo-content{
        .step{
          margin: 20px 10%;
          .lvx-step__icon {background-color: #e8ecf0;}
          .lvx-step__title{font-size: 12px;}
        }
    }

</style>
