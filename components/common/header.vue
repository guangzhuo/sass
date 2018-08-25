<template>
<div class="header">
  <header class="lx-ui-header navbar-fixed-top">
    <div class="user-home-header-logo-new-hu" :class="{'scrollTagBsHide':!scrollTag}" :style="{backgroundColor: isIndex && !scrollTag ? 'transparent' : '#fff', transform: `translateX(-${scrollLeft}px)`}">
        <div class="lx-container">
            <div class="row">
                <div class="col-xs-2">
                    <router-link to="/" >
                        <img v-show="(isIndex && scrollTag) || !isIndex" src='~assets/img/src/common/logo.png' id="index-logo" class="img-responsive" alt="云合同" />
                        <img v-show="isIndex && !scrollTag" src='~assets/img/src/common/logo-o.png' id="index-logo" class="img-responsive" alt="云合同" />
                    </router-link>
                </div>
                <div class="col-xs-10">
                    <div class="col-xs-10">
                        <ul class="user-home-header-index-ul-new-hu">
                            <li class="text-center">
                              <router-link to="/"  class="first-header-a-index header-a-index-new-hu" :class="{'first-active': isIndex, 'first-active-top0': isIndex && !scrollTag}" :noIndexTag="!isIndex" id="index" >首页</router-link>
                            </li>
                            <li class="text-center header-sub-categories">
                              <div class="header-a-index-new-hu introduction-Catalog-link" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/introduction'}" id="index" :scrollTag="isIndex && !scrollTag" >产品 <span class="drop-down-icon"></span></div>
                              <ul>
                                <li class="">
                                  <router-link  to="/introduction" class="index-footer-p--new-hu" >
                                    <p>服务介绍</p>
                                  </router-link>
                                </li>
                                <!-- <li class="">
                                  <a href="/proof/index.html" class="index-footer-p--new-hu" target="_blank">申请出证</a>
                                </li> -->
                                <!--<li class="">
                                  <router-link  to="/template" class="index-footer-p&#45;&#45;new-hu" >
                                    <p>合同模板</p>
                                  </router-link>
                                </li>-->
                              </ul>
                            </li>
                            <li class="text-center">
                              <router-link to="/template" class="header-a-index-new-hu" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/template'}" id="/index" :scrollTag="isIndex && !scrollTag">合同模板</router-link>
                            </li>
                            <li class="text-center">
                              <router-link to="/solution" class="header-a-index-new-hu" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/solution'}" id="/solution" :scrollTag="isIndex && !scrollTag">解决方案</router-link>
                            </li>
                            <li class="text-center">
                              <router-link to="/inspection-sign" class="header-a-index-new-hu" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/inspection-sign'}" id="index" :scrollTag="isIndex && !scrollTag">验签</router-link>
                            </li>
                            <li class="text-center">
                              <a class="header-a-index-new-hu" id="sdkyht" href="https://open.yunhetong.com" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag}"  target="_blank" :scrollTag="isIndex && !scrollTag">开放平台</a>
                            </li>
                            <li class="text-center header-sub-categories">
                              <div class="header-a-index-new-hu introduction-Catalog-link" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/news'}" id="index" :scrollTag="isIndex && !scrollTag" >新闻中心 <span class="drop-down-icon"></span></div>
                              <ul>
                                <li class="">
                                  <router-link  :to="{ path: '/news', query: { type: 1 }}" class="index-footer-p--new-hu" >
                                    <p>公司动态</p>
                                  </router-link>
                                </li>
                                <li class="">
                                  <router-link  :to="{ path: '/news', query: { type: 2 }}" class="index-footer-p--new-hu" >
                                    <p>行业资讯</p>
                                  </router-link>
                                </li>
                              </ul>
                            </li>
                            <li class="text-center header-sub-categories">
                              <div class="header-a-index-new-hu introduction-Catalog-link" :class="{'header-a-index-o-new-hu':isIndex && !scrollTag, 'a-active': currentPath === '/about'}" id="index" :scrollTag="isIndex && !scrollTag" >关于我们 <span class="drop-down-icon"></span></div>
                              <ul>
                                <li class="">
                                  <router-link  :to="{ path: '/about', query: { type: 1 }}" class="index-footer-p--new-hu" >
                                    <p>公司介绍</p>
                                  </router-link>
                                </li>
                                <li class="">
                                  <router-link  :to="{ path: '/about', query: { type: 2 }}" class="index-footer-p--new-hu" >
                                    <p>联系我们</p>
                                  </router-link>
                                </li>
                                <li class="">
                                  <router-link  :to="{ path: '/about', query: { type: 3 }}" class="index-footer-p--new-hu" >
                                    <p>诚聘英才</p>
                                  </router-link>
                                </li>
                              </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="col-xs-2 text-right">
                        <div class="col-xs-12">
                            <div id="index-header-display1" class="security-display-new-hu text-center" v-if="!isLogin">
                                <div class="col-xs-6">
                                    <router-link to="/register" class="index-head-new-hu index-btn-regist-new-hu" id="regist" >注册</router-link>
                                </div>
                                <div class="col-xs-6">
                                    <a href="/login"  class="index-head-new-hu index-btn-login-new-hu" :class="{'index-btn-login-top0': isIndex && !scrollTag}" id="login" :scrollTag="isIndex && !scrollTag">登录</a>
                                </div>
                            </div>
                            <div id="index-header-display2" class="security-display-new-hu text-center" v-else>
                                <!-- <div class="col-xs-9 col-xs-offset-2 header-mar-top-new-hu" >
                                    <i class="icon iconfont icon-user3"></i>

                                </div> -->
                                <sas-button category="primary" @click="toManage" size="medium" >管理中心</sas-button>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </header>
    <div class="sidebar">
      <div class="sidebar-item-top-div" :class="{hideDiv:isScroll}" style="margin-bottom: 10px;">
        <div class="sidebar-item-top-div sidebar-item-t sidebar-item-top" @click="toTop()"></div>
      </div>
      <a href="http://p.qiao.baidu.com/cps/chat?siteId=9393396&userId=18279786" target="_blank">
        <div class="sidebar-item-top-div sidebar-item-new sidebar-item-contact" ></div>
      </a>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import apis from "~/config/api";
import * as types from "~/store/mutation-types";
export default {
  data() {
    return {
      scrollLeft: 0,
      isScroll: true
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userName: state => state.user.userName,
      scrollTag: state => state.scrollTag
    }),
    isIndex: function() {
      return this.$route.name === "index" || this.$route.name === "all";
    },
    currentPath: function() {
      return this.$route.path;
    }
  },
  created() {
    // this.initHeader()
  },
  mounted() {
    window.document.addEventListener("scroll", this.scroll);
    window.document.addEventListener("scroll", this.handleScroll);
  },
  watch: {},
  methods: {
    async initHeader() {
      const r = await this.$axios.get(apis.getUserName).then(data => data.data);
      if (r.userName) {
        let user = {};
        user.userName = r.userName;
        this.$store.commit(types.SET_USER, user);
      } else {
        this.$store.commit(types.SET_USER, {});
      }
    },
    scroll() {
      this.scrollLeft =
        document.body.scrollLeft || document.documentElement.scrollLeft;
    },
    handleScroll() {
      let scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scroll > 500) {
        this.isScroll = false;
      } else {
        this.isScroll = true;
      }
    },
    toTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    toManage() {
      this.$router.push({path: '/manage'});
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.header {
  .scrollTagBsHide {
    box-shadow: none !important;
  }
  @include responsive-default {
    .lx-ui-header {
      min-width: $body-min-width;
      .user-home-header-logo-new-hu {
        padding-top: 17px;
        height: $header-height;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(51, 51, 51, 0.12);
        transition: 0.6s;
        // .lx-container{
        //   width: 100%;
        // }
        .user-home-header-index-ul-new-hu {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
          float: right;
          li {
            float: left;
            display: inline-block;
          }
          .introduction-Catalog-link > .drop-down-icon {
            width: 23px;
            height: 23px;
            display: block;
            position: absolute;
            right: -24px;
            top: 0;
          }
          .header-a-index-new-hu > .drop-down-icon {
            background: url("~assets/img/src/drop-down-g-icon.png");
          }
          .header-a-index-o-new-hu > .drop-down-icon {
            background: url("~assets/img/src/drop-down-icon.png");
          }
          .header-a-index-new-hu {
            display: inline-block;
            color: #333;
            font-size: 14px;
            margin: 6px 28px 0;
            padding-bottom: 3px;
            position: relative;
            text-decoration: none;
            &:hover {
              color: #4081ff;
              text-decoration: none;
            }
          }
          .header-a-index-new-hu.a-active {
            color: #4081ff;
            opacity: 1;
            .drop-down-icon {
              background: url("~assets/img/src/drop-down-hover-icon.png");
            }
          }
          .header-a-index-o-new-hu.a-active {
            color: #fff;
            opacity: 0.6;
          }
          .header-a-index-o-new-hu:hover {
            color: #fff;
            opacity: 0.6;
          }
          .first-header-a-index {
            display: inline-block;
            color: #333;
            font-size: 14px;
            margin: 6px 20px 0;
            padding-bottom: 3px;
            text-decoration: none;
            &:hover.first-active-top0 {
              color: #fff;
              opacity: 0.6;
            }
          }
          // [noIndexTag] {
          //   &:hover {
          //     opacity: 0.6;
          //   }
          // }
          [scrolltag="true"] {
            &:hover {
              opacity: 0.6;
            }
          }

          .first-active {
            color: #4081ff;
          }

          .first-active-top0 {
            color: #fff;
            opacity: 0.6;
          }
          .a-active {
            //opacity: 0.6;
            text-decoration: none;
          }

          .header-a-index-o-new-hu {
            color: #fff;
            background-color: transparent;
          }
        }
        .security-display-new-hu {
          .index-head-new-hu {
            display: inline-block;
            border: none;
            border-radius: 4px;
            padding: 3px 20px;
            margin-top: 3px;
            text-decoration: none;
          }
          .index-btn-regist-new-hu {
            color: #fff;
            background-color: #4081ff;
            &:hover {
              background-color: #6297ff;
            }
          }

          .index-btn-login-new-hu {
            color: #4081ff;
            // color: #fff;
            background-color: transparent;
            &:hover {
              color: #6297ff;
            }
          }
          [scrolltag="true"] {
            &:hover {
              color: #959595;
            }
          }
          .index-btn-login-top0 {
            color: #fff;
          }
          .header-mar-top-new-hu {
            border-radius: 4px;
            padding: 5px 20px;
            color: #fff;
            background-color: #4081ff;
            .manage-link {
              color: #fff;
              text-decoration: none;
            }
            .icon-user3 {
              font-size: 14px;
            }
            &:hover {
              background-color: #6297ff;
            }
          }
        }
        .icon-help1 {
          display: inline-block;
          margin-top: 6px;
        }
        .index-help-a-new-hu {
          display: inline-block;
          color: #333;
          text-decoration: none;
          margin-top: 6px;
          opacity: 0.6;
          &:hover {
            color: #959595;
          }
        }
        .header-a-index-o-new-hu {
          color: #fff;
          background-color: transparent;
        }
      }
      .header-sub-categories {
        height: 50px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        & > ul {
          width: 108px;
          height: auto;
          background: rgba(255, 255, 255, 1);
          box-shadow: #c9c9c9 0 0 8px;
          padding: 0;
          position: absolute;
          top: 63px;
          left: calc(50% - 46px);
          text-align: center;
          overflow: hidden;
          opacity: 0;
          transition: 0.45s;
          & > li {
            width: 100%;
            clear: both;
            margin-top: 30px;
            display: block !important;
            line-height: 14px;
          }
          & > li:last-child {
            margin-bottom: 27px;
          }
          & a {
            color: #333;
            text-decoration: none;
            & > p {
              margin: 0;
            }
            &:hover {
              color: #4081ff;
            }
          }
          &::after {
            content: "";
            width: 100%;
            height: 3px;
            background: #4081ff;
            position: absolute;
            left: 0;
            top: -3px;
          }
        }
        &:hover {
          overflow: visible;
          & > ul {
            top: 53px;
            overflow: visible;
            opacity: 1;
          }
          & > a {
            color: #4081ff !important;
          }
          .header-a-index-new-hu {
            color: #4081ff;
            .drop-down-icon {
              background: url("~assets/img/src/drop-down-hover-icon.png");
            }
          }
          .header-a-index-o-new-hu {
            color: #fff;
            opacity: 0.6;
            .drop-down-icon {
              background: url("~assets/img/src/drop-down-icon.png");
            }
          }

          & .drop-down-icon {
            opacity: 0.9;
          }
        }
      }
    }

    .sidebar {
      position: fixed;
      right: 20px;
      bottom: 75px;
      z-index: 1024;
      .hideDiv {
        display: none;
      }
      .sidebar-item-new,
      .sidebar-item-t {
        background: #4081ff url("~assets/img/src/common/sidebar-new.png")
          no-repeat;
      }
      .sidebar-item-top {
        background-position: -6px -165px;
      }
      .sidebar-item-top:hover {
        background-position: -6px -245px;
      }
      .sidebar-item-t {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        -moz-transition: background-position 0.8s;
        -ms-transition: background-position 0.8s;
        -o-moz-transition: background-position 0.8s;
        -webkit-moz-transition: background-position 0.8s;
        transition: background-position 0.8s;
      }
      .sidebar-item-t:hover .sidebar-layer {
        opacity: 1;
        filter: alpha(opacity=100);
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
      }
      .sidebar-item-top-div {
        width: 56px;
        height: 56px;
        border-radius: 20px;
        box-shadow: 0 3px 10px rgba(0, 81, 240, 0.6);
        margin-top: 10px;
      }
      .sidebar-item-new {
        display: block;
        position: relative;
        -moz-transition: background-position 1s;
        -ms-transition: background-position 1s;
        -o-moz-transition: background-position 1s;
        -webkit-moz-transition: background-position 1s;
        transition: background-position 1s;
      }
      .sidebar-item-new:hover .sidebar-layer {
        opacity: 1;
        filter: alpha(opacity=100);
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
      }
      .sidebar-item-contact {
        background-position: -6px -6px;
      }
      .sidebar-item-contact:hover {
        background-position: -6px -85px;
      }
    }
  }
}
</style>

