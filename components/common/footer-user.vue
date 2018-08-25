<template>
    <footer class="footer-user">
        <div class="footer-title-w">浙江律讯网络科技有限公司版权所有 浙ICP备15007451号-1</div>
        <!-- <div class="footer-outer clearfix">
            <div class="footer-left">
                <div class="footer-left-text text-right-b">
                    <router-link :to="{ path: '/website-map'}">
                      网站地图
                    </router-link>
                </div>
                <div class="footer-left-text text-right-b">
                    <router-link :to="{ path: '/privacy-agreement', query: {type: '2'}}">
                      隐私声明
                    </router-link>
                </div>
                <div class="footer-left-text">
                    <router-link :to="{ path: '/about', query: {type: 3}}">
                      服务支持
                    </router-link>
                </div>
            </div>
            <div class="footer-right">
                <div class="row text-center">
                    <div class="footer-link-w">
                        <a href="https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.YUNHETONG.COM&lang=zh_cn" target="_blank">
                            <img src="~/assets/img/src/common/norton.png" alt="云合同"/>
                        </a>
                    </div>
                    <div class="footer-link-w">
                        <a href="http://www.12377.cn" target="_blank">
                            <img src="~/assets/img/src/common/report.png" alt="云合同"/>
                        </a>
                    </div>
                    <div class="footer-link-w">
                        <a href="http://www.12321.cn" target="_blank">
                            <img src="~/assets/img/src/common/12321.png" alt="云合同"/>
                        </a>
                    </div>
                    <div class="footer-link-w">
                        <a href="http://www.12377.cn/node_548446.htm" target="_blank">
                            <img src="~/assets/img/src/common/appreport.png" alt="云合同"/>
                        </a>
                    </div>
                </div>
            </div>
        </div> -->
    </footer>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.footer-user{
    @include responsive-default {
        position: fixed;
        width: 100%;
        bottom: 0;
        // height: 80px;
        background: #f5f6f7;
        .footer-title-w{
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            background: #46474c;
        }
        .footer-outer{
            background: #f5f6f7;
            padding: 0 calc(50% - 600px);
            overflow: hidden;
            height: 50px;

            .footer-left{
                float: left;

                .footer-left-text{
                    display: inline-block;
                    margin-top: 20px;
                    height: 14px;
                    line-height: 13px;
                    padding: 0 10px;
                    a{
                        color: inherit;
                        text-decoration: none;
                        cursor: pointer;
                    }
                }
                .text-right-b{
                    border-right: 1px solid #464646;
                }
            }

            .footer-right{
                float: right;

                .footer-link-w{
                    display: inline-block;
                    margin: 6px 0 0 3px;

                    a{
                        display: inline-block;
                        border: 7px solid #fff;
                        text-decoration: none;
                    }
                    img{
                        width: 85px;
                    }
                }
            }
        }
    }
}
</style>

