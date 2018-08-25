<template>
  <section class="sas-manager-left">
    <div style="display: inline-block;height:100%;" :style="{'overflow-y': isCollapse? 'visible': (getBrowserObject().name == 'safari' || getBrowserObject().name == 'firefox') ? 'scroll' : 'auto','overflow-x': isCollapse? 'visible': 'hidden'}">
      <div class="top" >
        <div class="logo">
          <router-link to="/" >
            <i :class="{'i-big': !isCollapse, 'i-small': isCollapse}"></i>
          </router-link>
          <!-- <i :class="{'i-big': !isCollapse, 'i-small': isCollapse}" @click="onCollapseClick"></i> -->
        </div>
        <div class="collapse">
          <i class="icon iconfont lvx-icon-collapseleft" :class="{'cl': !isCollapse, 'cr': isCollapse}" @click="onCollapseClick"></i>
        </div>
      </div>

      <lvx-menu  :default-active="activePath" :unique-opened="uniqueOpened" :collapse="isCollapse" class="menu" text-color="#fff" background-color="#19243C" active-text-color="#4081ff" @select="onMenuSelect">
        <lvx-menu-item index="1">
          <i class="icon iconfont lvx-icon-shouyeicon1"></i>
          <span slot="title">
            首页
          </span>
        </lvx-menu-item>

        <lvx-submenu index="3">
          <template slot="title">
            <i class="icon iconfont lvx-icon-hetongmobanicon1"></i>
            <span slot="title">合同模板</span>
          </template>
          <lvx-menu-item index="3-1"><div class="submenu-wraper">系统模板</div></lvx-menu-item>
          <lvx-menu-item index="3-2"><div class="submenu-wraper">我的模板</div></lvx-menu-item>
        </lvx-submenu>
        
        <lvx-submenu index="5">
          <template slot="title">
            <i class="icon iconfont lvx-icon-zhanghuicon1"></i>
            <span slot="title">用户中心</span>
          </template>
          <lvx-menu-item index="5-1"><div class="submenu-wraper">用户信息</div></lvx-menu-item>
          <lvx-menu-item index="5-2"><div class="submenu-wraper">印章管理</div></lvx-menu-item>
          <lvx-menu-item index="5-3" v-if="user.hasLinked"><div class="submenu-wraper">第三方签名</div></lvx-menu-item>
          <lvx-menu-item index="5-4"><div class="submenu-wraper">通讯录</div></lvx-menu-item>

          <lvx-menu-item index="5-5"><div class="submenu-wraper">我的订单</div></lvx-menu-item>
          <lvx-menu-item index="5-6" v-if="user.isLawyer == 1"><div class="submenu-wraper">我的接单</div></lvx-menu-item>
        </lvx-submenu>
        
        <lvx-submenu index="2" class="coontract-manage-left">
          <template slot="title">
            <i class="icon iconfont lvx-icon-hetongguanliicon1"></i>
            <span slot="title">合同管理</span>
          </template>
          <lvx-menu-item index="2-1" class="menu-item-wraper">
            <div class="submenu-wraper">
              我的合同
              <span class="icon iconfont lvx-icon-add submenu-wrape--icon" @click="showFolderAdd = true"></span>
            </div>
          </lvx-menu-item>
          <lvx-menu-item index="2-3" ><div class="submenu-wraper">未分类</div></lvx-menu-item>
          <lvx-menu-item :index="`2-${index+4}`"  v-for="(item, index) in contractCategoryList.rows" :key="index" class="menu-item-wraper">
            <div class="submenu-wraper">
              <span class="submenu-wraper--text" :title="item.name">{{item.name}}</span>
              <lvx-dropdown placement="bottom" class="menu-item-actions" @command="onActionBtn">
                <span class="icon iconfont lvx-icon-ellipsis-horiz submenu-wrape--icon"></span>
                <lvx-dropdown-menu slot="dropdown">
                  <lvx-dropdown-item :command="{actionType: 1, folder: item}">重命名</lvx-dropdown-item>
                  <lvx-dropdown-item :command="{actionType: 2, folder: item}">删除</lvx-dropdown-item>
                </lvx-dropdown-menu>
              </lvx-dropdown>
            </div>
          </lvx-menu-item>
          <lvx-menu-item index="2-2" v-if="user.hasLinked" ><div class="submenu-wraper">第三方合同</div></lvx-menu-item>
        </lvx-submenu>
      </lvx-menu>
      <div class="bottom" v-show="!isCollapse">
        <div class="col-xs-12 footer-pic">
        </div>
      </div>
    </div>
    <sas-confirm title="删除文件夹" smallTitle="删除文件夹,则该文件夹里的合同会全部移动到未分类里边,是否确定删除?" :isShow.sync="confirmDoDelFolder" @enSure="onDeleteFolder"/>
    <sas-dialog-categoryadd :show.sync="showFolderAdd" @onComplete="getContractCategoryList()"/>
    <sas-dialog-categoryreset :show.sync="showFolderReset" @onComplete="getContractCategoryList()" :propsCategoryText="currentActionFolder.name" :propsRestFromId="currentActionFolder.id"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import { getBrowserObject } from '~/framework/core/utils'
import dialogCategoryAdd from '~/components/dialog/dialog-categoryAdd'
import dialogCategoryReset from '~/components/dialog/dialog-categoryRest'

import _ from  'lodash'
let Map_Router_Path = [{
  path: '1',
  router: '/manage' //个人中心
}, {
  path: '2',
  router: '/manage/contract/contract' //合同管理
},{
  path: '2',
  router: '/manage/contract/contract-message' //合同信息
}, {
  path: '2-1',
  router: '/manage/contract/contract?categoryid=-1' //我的合同
}, {
  path: '2-2',
  router: '/manage/contract/sdk-contract-manage' //第三方合同
}, {
  path: '2-3',
  router: '/manage/contract/contract?categoryid=0' //未分类合同
}, {
  path: '3-1',
  router: '/manage/contract/template-system' //系统模板
}, {
  path: '3-2',
  router: '/manage/contract/template-my' //我的模板
}, {
  path: '5-1',
  router: '/manage/user/manage/userManage' //用户信息
}, {
  path: '5-2',
  router: '/manage/user/sign/signSet' //签名设置
}, {
  path: '5-3',
  router: '/manage/user/sign/signList' //第三方签名
}, {
  path: '5-4',
  router: '/manage/user/manage/user-contact' //通讯录
}, {
  path: '5-1',
  router: '/manage/user/manage/signature' //签署服务
}, {
  path: '5-1',
  router: '/manage/user/check/personal' //个人实名认证
}, {
  path: '5-1',
  router: '/manage/user/check/company' //企业实名认证
}, {
  path: '5-5',
  router: '/manage/order/my-order' //我的订单
}, {
  path: '5-6',
  router: '/manage/order/my-service-order' //我的接单
}];
export default {
  data() {
    return {
      isCollapse: false,
      uniqueOpened: true,
      confirmDoDelFolder: false, //删除文件夹二次确认框
      currentActionFolder: {}, //当前操作的文件夹
      showPopover: false, //文件夹操作面板
      showFolderAdd: false, //新建文件夹弹窗
      showFolderReset: false, //重命名文件夹弹窗
      getBrowserObject: getBrowserObject
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      activePath: state => state.LeftManager.activePath,
      contractCategoryList: state => state.LeftManager.contractCagetoryList
    })
  },
  created() {},
  mounted() {
    this.getContractCategoryList();
  },
  watch: {
    $route(to, from, next) {
      this.init();
    }
  },
  methods: {
    init() {

      let cRouterPath = this.$route.fullPath;
      let l = _.filter(Map_Router_Path, (o)=> { return o.router === cRouterPath; });
      let self = this;
      this.$nextTick(()=> {
        if (l.length === 1) {
          self.$store.state.LeftManager.activePath = l[0].path;
        } else if (l.length > 1) {

          if (cRouterPath === "/manage/contract/contract") {
            if (!self.user.hasLinked) {
              self.$store.state.LeftManager.activePath = "2";
            } else {
              self.$store.state.LeftManager.activePath = "2-1";
            }
          }
        }  
      });
    },
    onCollapseClick() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.$store.state.manageMainStatus = "main-offset-left";
      } else {
        this.$store.state.manageMainStatus = "main-normal";
      }
    },
    async getContractCategoryList() {
      const r = await this.$axios.get(apis.contractCategoryList).then((data) => data.data);
      if(r.code == 200) {
         this.$store.state.LeftManager.contractCagetoryList = r.data;
         this.resetMapRouterPath();
        _.forEach(r.data.rows, (value, index)=> {
          Map_Router_Path.push({path: `2-${index+4}`, router: `/manage/contract/contract?categoryid=${value.id}`});
        });
        this.init();
      }
    },
    resetMapRouterPath() {
      Map_Router_Path = [{
        path: '1',
        router: '/manage' //个人中心
      }, {
        path: '2',
        router: '/manage/contract/contract' //合同管理
      },{
        path: '2',
        router: '/manage/contract/contract-message' //合同信息
      }, {
        path: '2-1',
        router: '/manage/contract/contract?categoryid=-1' //我的合同
      }, {
        path: '2-2',
        router: '/manage/contract/sdk-contract-manage' //第三方合同
      }, {
        path: '2-3',
        router: '/manage/contract/contract?categoryid=0' //未分类合同
      }, {
        path: '3-1',
        router: '/manage/contract/template-system' //系统模板
      }, {
        path: '3-2',
        router: '/manage/contract/template-my' //我的模板
      }, {
        path: '5-1',
        router: '/manage/user/manage/userManage' //用户信息
      }, {
        path: '5-2',
        router: '/manage/user/sign/signSet' //签名设置
      }, {
        path: '5-3',
        router: '/manage/user/sign/signList' //第三方签名
      }, {
        path: '5-4',
        router: '/manage/user/manage/user-contact' //通讯录
      }, {
        path: '5-1',
        router: '/manage/user/manage/signature' //签署服务
      }, {
        path: '5-1',
        router: '/manage/user/check/personal' //个人实名认证
      }, {
        path: '5-1',
        router: '/manage/user/check/company' //企业实名认证
      }, {
        path: '5-5',
        router: '/manage/order/my-order' //我的订单
      }, {
        path: '5-6',
        router: '/manage/order/my-service-order' //我的接单
      }];
    },
    onMenuSelect(path) {
      this.$router.replace({path: _.find(Map_Router_Path, (o)=> { return o.path === path; }).router});
    },
    onConfirmDelFolder(folder) {
      this.confirmDoDelFolder = true;
      this.currentActionFolder = folder;
    },
    async onDeleteFolder() {
      const r = await this.$axios.post(apis.contrctCagegoryDel, {
        id: this.currentActionFolder.id
      }).then((res)=> res.data);
      if(r.success) {
        let self = this;
        this.$router.replace({path: '/manage/contract/contract?categoryid=0'});
        this.$createMessage({
          type: "success",
          duration: 3000,
          spinnerText: "删除成功!"
        });
        this.getContractCategoryList()
        // const s = await this.$axios.get(apis.contractCategoryList).then((data) => data.data);
        // if(s.code == 200) {
        //   this.$store.state.LeftManager.contractCagetoryList = r.data;
          
        // }
      }
    },
    onOpenFolderRename(folder) {
      this.showFolderReset = true;
      this.currentActionFolder = folder;
    },
    onActionBtn(v) {
      switch(v.actionType) {
        case 1:
          this.onOpenFolderRename(v.folder);
          break;
        case 2:
          this.onConfirmDelFolder(v.folder);
          break;
      }
    }
    
  },
  components: {
    'sas-dialog-categoryadd': dialogCategoryAdd,
    'sas-dialog-categoryreset': dialogCategoryReset,
    
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";

.sas-manager-left {
  height: 100%;
  // width: 300px;
  background: transparent;
  color: #7082b0;
  // overflow: hidden;
  position: relative;
  @include responsive-default {
    $left-width: 180px;
    .top {
      .logo {
        height: 72px;
        background-color: #182033;
        padding-top: 5px;
        .i-big {
          width: 100%;
          height: 45px;
          background: url("~assets/img/src/common/logo-o.png") no-repeat;
          display: inline-block;
          position: relative;
          top: 8px;
          left: 15px;
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          // transition: all .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
          transition: all 0.3s;
        }
        .i-small {
          display: inline-block;
          width: 100%;
          height: 45px;
          background: url("~assets/img/src/common/logo_person.png") center
            no-repeat;
          top: 8px;
          transition: all 0.3s;
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          // transition: all .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
        }
      }
      .collapse {
        text-align: center;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #181429;
        background-color: #19243c;
        .icon {
          font-size: 20px;
          cursor: pointer;
        }
        .cl {
          transition: all 0.3s;
        }
        .cr {
          transform: rotateY(-180deg);
          transition: all 0.3s;
        }
      }
    }
    // .top-big{
    //   width: 160px;
    //   transition: all .45s;
    // }
    // .top-small{
    //   width: 64px;
    //   transition: all .45s;
    // }
    .menu {
      // background-color: transparent;
      border-right: 0;
      height: calc(100% - 112px);
      .lvx-submenu .lvx-menu-item {
        // color: #A9B4CA !important;
        font-size: 12px;
        min-width: 150px;
      }
      .lvx-menu-item.is-active {
        .iconfont {
          color: $theme-color;
        }
      }
      .iconfont {
        color: #fff;
        font-size: 21px;
        // font-weight: 600;
        margin-right: 5px;
      }
      &:not(.lvx-menu--collapse) {
        width: $left-width;
      }
      .submenu-wraper {
        margin-left: 25px;
        position: relative;
        .submenu-wrape--icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        .lvx-icon-add{
          font-size: 16px;
        }
      }

    }
    .menu-item-wraper {
      padding: 0 0 0 45px;
      position: relative;
      .action-panel {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        position: absolute;
        width: 70px;
        z-index: 1;
        right: 5px;
        top: 50px;
        background: #fff;
        color: #333;
        border-radius: 6px;
        .action-btn {
          &:hover {
            background: #f5f5f5;
          }
        }
      }
      .submenu-wraper--text{
        display: inline-block;
        width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:hover{
        .menu-item-actions{
          display: block;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 0px;
      padding: 10px 0;
      background: #19243C;
      .footer-pic {
        width: $left-width;
        height: 28px;
        background: url(~assets/img/src/common/footer_company.png) center
          no-repeat;
        transform: scale(1);
      }
    }

  }
  @include responsive-lt(1366px) {
    $left-width: 160px;
    .menu {
      &:not(.lvx-menu--collapse) {
        width: $left-width;
      }
      
    }
    .bottom {
      .footer-pic {
        width: $left-width;
      }
    }
  }
  @include responsive-gt(1366px) {
    .menu-item-wraper{
      .submenu-wraper--text{
        width: 70px;
      }
    }
  }
}
</style>
<style lang="scss" type="text/scss">
@import "~styles/base.scss";
.sas-manager-left{
  .menu-item-actions {
    position: absolute;
    right: 0;
    top: 50%;
    width: 70px;
    display: none;
  }
  .coontract-manage-left{
    .lvx-menu{
      padding-bottom: 50px;
    }
  }

  .lvx-menu--collapse{
    .coontract-manage-left{
      .lvx-menu{
        overflow-y: scroll;
        overflow-x: hidden;
        height: 450px;
      }
    }
  }
  @include responsive-lt(1366px) {
    .lvx-menu--collapse{
      .coontract-manage-left{
        .lvx-menu{
          overflow-y: scroll;
          overflow-x: hidden;
          height: 348px;
        }
      }
    }
  }
}

</style>

