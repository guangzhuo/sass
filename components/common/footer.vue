<template>
  <footer class="lx-ui-footer">
    <div class="index-footer-new-hu">
      <div class="lx-container lx-container-w">
          <div class="row text-left footer-site-map">
              <div class="col-xs-3 col-lg-3 footer-bor-right-new-hu">
                  <h4 class="index-footer-h4-new-hu">安全中心</h4>
                  <div>
                    <router-link :to="{ path: '/security-center', query: { type: 1 }}" class="index-footer-p--new-hu" >
                      <p>信息安全</p>
                    </router-link>
                  </div>
                  <!--<div class=""><a href="/securitycenter" class="index-footer-p&#45;&#45;new-hu"><p>信息安全</p></a></div>-->
                  <div class="">
                    <router-link :to="{ path: '/security-center', query: { type: 2 }}" class="index-footer-p--new-hu" >
                      <p>法律保护</p>
                    </router-link>
                  </div>
                  <div class="">
                    <router-link :to="{ path: '/security-center', query: { type: 3 }}" class="index-footer-p--new-hu">
                      <p>案例介绍</p>
                    </router-link>
                  </div>
              </div>
              <div class="col-xs-3 col-lg-3 footer-bor-right-new-hu">
                  <h4 class="index-footer-h4-new-hu">帮助中心</h4>
                  <div class="">
                    <router-link :to="{ path: '/help-center', query: { type: 2 }}" class="index-footer-p--new-hu">
                      <p>帮助中心</p>
                    </router-link>
                  </div>
                  <div class="">
                    <router-link :to="{ path: '/help-center', query: { type: 1 }}" class="index-footer-p--new-hu">
                      <p>视频中心</p>
                    </router-link>
                  </div>
              </div>
          </div>
          <div class="text-center footer-right fr">
              <div class="fl footer-pad-right-new-hu">
                <div class="app-icon-new-hu">下载手机客户端</div>
                <img class="footer-webchat-new-hu" src="../../assets/img/src/common/app-down-new.png">
              </div>
              <div class="fl footer-details">
                  <div class="fl Customer-logo">
                    <img src="../../assets/img/src/Customer-service.png" alt="">
                  </div>
                  <div class="fl Propaganda-details">
                    <img src="../../assets/img/src/Propaganda.png" alt="电子合同生态服务商">
                    <p>咨询热线</p>
                    <img src="../../assets/img/src/public-phone.png" alt="咨询热线">
                    <p>服务时间：周一至周日（ 09:00～21:00 ）</p>
                    <p class="details-address">地址：浙江省杭州市余杭区文一西路1198号万利大厦16层</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <div class="row footer-footer-new-hu">
        <div class="lx-container">
            <div class="col-xs-2 text-left about-company-p-new-hu">
                <router-link :to="{ path: '/website-map'}">
                  网站地图
                </router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="{ path: '/privacy-agreement', query: { type: '2' }}">
                  隐私声明
                </router-link>
            </div>
            <div class="col-xs-6 footer-copyright-new-hu">
                <span>浙江律讯网络科技有限公司版权所有 &nbsp;&nbsp;&nbsp;&nbsp; 浙ICP备15007451号-1</span>
            </div>
            <div class="col-xs-4 text-right footer-icon-hu">
                <a href="https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.YUNHETONG.COM&lang=zh_cn" target="_blank">
                    <img src="../../assets/img/src/common/norton-new.png" alt="云合同"/>
                </a>
                <a href="http://www.12377.cn" target="_blank">
                    <img src="../../assets/img/src/common/report-new.png" alt="云合同"/>
                </a>
                <a href="http://www.12321.cn" target="_blank">
                    <img src="../../assets/img/src/common/12321-new.png" alt="云合同"/>
                </a>
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.fl {
  float: left;
}
.fr {
  float: right;
}
.lx-ui-footer {
  position: absolute;
  width: 100%;
  min-width: $body-min-width;
  @include responsive-default {
    .index-footer-new-hu {
      background-color: #383b42;
      height: 278px;
      padding-top: 61px;
      border-bottom: 1px solid #494B4F;
      .lx-container {
        box-sizing: content-box;
        & > div {
          float: left;
        }
      }
      .footer-site-map {
        .footer-bor-right-new-hu {
          height: 135px;
          width: 130px;
          margin-right: 52px;
          &:last-child{
            margin-right: 41px;
          }
          .index-footer-h4-new-hu {
            color: #959595;
            margin-top: 0;
            margin-bottom: 22px;
            font-size: 16px;
          }

          .index-footer-p--new-hu {
            color: #fff;
            font-size: 14px;
            &:hover {
              color: #4081ff;
              text-decoration: none;
            }
          }
        }
      }

      .footer-right {
        .footer-bor-new-hu {
          padding-top: 15px;
          text-align: left;

          .app-icon-new-hu {
            color: #959595;
            font-size: 14px;

            .footer-phone-new-hu {
              font-size: 18px;
              color: #fff;
              margin-left: 10px;
            }
          }
        }
        .footer-pad-right-new-hu {
          margin-right: 217px;
          position: relative;
          .footer-webchat-new-hu {
            padding: 4px;
            background-color: #3b3b3b;
          }
          > .app-icon-new-hu {
            color: #959595;
            font-size: 16px;
            line-height: 1;
            margin-bottom: 25px;
          }
          &::after {
            content: " ";
            width: 1px;
            height: 144px;
            background: rgba(73, 75, 79, 1);
            position: absolute;
            right: -140px;
            top: calc(50% - 72px);
          }
        }
      }
    }
    .footer-footer-new-hu {
      height: 36px;
      background-color: #383B42;
      color: #959595;
      .about-company-p-new-hu {
        a {
          color: #959595;
          text-decoration: none;
          line-height: 36px;
          font-size: 12px;
        }
      }
      .footer-copyright-new-hu {
        line-height: 36px;
        text-align: center;
        font-size: 12px;
      }

      .footer-icon-hu {
        opacity: 0.5;
        a {
          display: inline-block;
          width: 90px;
          padding: 5px 0;
        }
      }
    }
  }
}
.lx-container-w {
  width: 1120px;
  height: 100%;
  padding: 0;
}
.footer-details {
  min-height: 177px;
  color: #fff;
  font-size: 14px;
  text-align: left;
  p{
    margin: 0;
  }
  .Customer-logo {
    margin: 53px 16px 0 0;
  }
  .Propaganda-details > img:nth-of-type(1) {
    margin-bottom: 36px;
  }
  .Propaganda-details > img:nth-of-type(2){
    margin: 4px auto 9px;
  }
  .details-address{
    margin-top: 8px;
  }
}
</style>

