<template>
  <div class="manage-contract">
    <sas-breadcrumb v-if="hasLinked == true" separator="/">
      <sas-breadcrumb-item>合同管理</sas-breadcrumb-item>
      <sas-breadcrumb-item>我的合同</sas-breadcrumb-item>
    </sas-breadcrumb>
    <!--<header class="container-header-w">
          <div id="con-header-d" class="public-hide-h">
            合同管理 <span class="arrow-icon"></span> <span>我的合同</span>
          </div>
        </header>-->
    <div class="container-content-bg-w">
      <div class="container-content-white" :style="{hasLinked:'height: calc(100vh - 90px)'}">
        <header class="list-button">
          <router-link class="btn-con-img-d home-text-h" :to="{name:'manage-contract-contract-view-auth-manage'}">查看列表</router-link>
          <router-link class="btn-con-noc-d home-text-h" :to="{name:'manage-contract-contract-tast-manage'}">提醒列表</router-link>
          <div style="margin-bottom: 22px;width: 429px;margin-right: 20px;float: right;position: relative;display: table;border-collapse: separate;
    ">
            <searchInput v-model="title" placeholder="请输入合同名称" @after-search="searchbin" />
            <!-- <input type="text" :style="searchobject" class="name-search-d form-control home-text-h"
                       id="title" name="title" v-model="title"
                       @focus="enter" @blur="leave"
                       placeholder="请输入合同名称" autocomplete="off"/>
                <span :style="buttonobject"
                      @blur="leave" @click="searchbin"
                      class="input-pad-d input-group-addon">
                  <div id="table_search" :style="colorobject" class="bottom-contract4-d btn">
                      <span class="glyphicon lvx-icon-search" aria-hidden="true"></span>&nbsp;搜&nbsp;索
                  </div>
                </span> -->
            <!--<lvx-input placeholder="请输入内容" v-model="title">-->
            <!--<template slot="append"><span @click="pageChange" style="width: 100%;height: 100%;letter-spacing: 5px;"><i class="lvx-icon-search"></i>搜索</span>
</template>-->
            <!--</lvx-input>-->
          </div>
        </header>
        <section class="contract-table">
          <!--使用组件-->
          <table border="0" width="100%" cellpadding="10" align="left">
              <thead>
              <tr class="con-th-d">
                  <th class="con-t-d">合同标题</th>
                  <th class="con-s-d">合同状态
                      <span class="dropdown" >
                          <button type="button" @click="statusmethod()" class="con-btn-d" v-html="dropdownMenu_w" data-toggle="dropdown" aria-expanded="false">

                          </button>
                          <ul id="ul-status" class="dropdown-menu pull-right pull-right-d home-text-h"  :style="{display : statuShow?'block':'none'}">
                              <li  id="AllContract_all_w"  style="margin-top: 17px;">
                                  <a class="div-status" tabindex="-1" @click="getSelectState()" accesskey="" id="selectall" data-toggle="tab">全部</a>
                              </li>
                              <li id="draft" >
                                  <a class="div-status" tabindex="-1" @click="getSelectState(0)" accesskey="0" id="selectDraft" data-toggle="tab">起草中</a>
                                  <ul class="hide-w manage-menu1-d">
                                      <li class="sub-menu-w" data-Status="0" @click="manage_Menu(0,0,1)">可编辑</li>
                                      <li class="sub-menu-w" data-Status="2" @click="manage_Menu(0,2,2)">查看中</li>
                                      <li class="sub-menu-w" data-Status="3" @click="manage_Menu(0,3,3)">律师审查中</li>
                                      <li class="sub-menu-w" data-Status="4" @click="manage_Menu(0,4,4)">待发送</li>
                                  </ul>
                              </li>
                              <li id="waitsign" >
                                  <a class="div-status" tabindex="-1" @click="getSelectState(1)" accesskey="1" id="selectWait" data-toggle="tab">等待他人的签名</a>
                                  <ul class="hide-w manage-menu2-d">
                                      <li class="sub-menu-w" data-Status="10" @click="manage_Menu(1,10,5)">我已签</li>
                                  </ul>
                              </li>
                              <li id="needsign">
                                  <a class="div-status" role="menuitem" tabindex="-1" @click="getSelectState(2)" accesskey="2" id="selectNeed" data-toggle="tab">需要我的签名</a>
                                  <ul class="hide-w manage-menu3-d">
                                      <li class="sub-menu-w" data-Status="20" @click="manage_Menu(2,20,6)">要我签</li>
                                  </ul>
                              </li>
                              <li id="Completed">
                                  <a class="div-status" role="menuitem" tabindex="-1" @click="getSelectState(3)" accesskey="3" id="selectFinish" data-toggle="tab">已完成</a>
                                  <ul class="hide-w manage-menu4-d">
                                      <li class="sub-menu-w" data-Status="30" @click="manage_Menu(3,30,7)">已提交</li>
                                      <li class="sub-menu-w" data-Status="31" @click="manage_Menu(3,31,8)">审查完成</li>
                                      <li class="sub-menu-w" data-Status="32" @click="manage_Menu(3,32,9)">签署完成</li>
                                      <li class="sub-menu-w" data-Status="33" @click="manage_Menu(3,33,10)">查看中</li>
                                  </ul>
                              </li>
                              <li id="invalid">
                                  <a class="div-status" role="menuitem" tabindex="-1" @click="getSelectState(4)" accesskey="4" id="selectRevoc" data-toggle="tab">已作废</a>
                                  <ul class="hide-w manage-menu5-d">
                                      <li class="sub-menu-w" data-Status="40" @click="manage_Menu(4,40,11)">已撤回</li>
                                      <li class="sub-menu-w" data-Status="41" @click="manage_Menu(4,41,12)">被退回</li>
                                      <li class="sub-menu-w" data-Status="42" @click="manage_Menu(4,42,13)">被废弃</li>
                                  </ul>
                              </li>
                          </ul>
                  </span>
                  </th>
                  <th class="con-ti-d">更新时间
                      <span class="dropdown">
                      <button type="button" class="btn-d" @click="timemethod()" v-html="dropdownMenu" data-toggle="dropdown">

                      </button>
                      <ul id="ul-time" class="dropdown-menu pull-right pull-right-d home-text-h" :style="{display : timeShow?'block':'none'}">
                          <li id="AllContract" role="presentation" style="margin-top: 17px;">
                              <a role="menuitem" tabindex="-1" @click="getSelectTime(0)">全部</a>
                          </li>
                          <li id="oneMonth" role="presentation">
                              <a role="menuitem" tabindex="-1" @click="getSelectTime(1)">一个月内</a>
                          </li>
                          <li id="twoMonth" role="presentation"><a role="menuitem" tabindex="-1" @click="getSelectTime(2)">两个月内</a>
                          </li>
                          <li id="threeMonth" role="presentation"><a role="menuitem" tabindex="-1" @click="getSelectTime(3)">三个月内</a>
                          </li>
                          <li id="sixMonth" role="presentation"><a role="menuitem" tabindex="-1" @click="getSelectTime(6)">半年内</a>
                          </li>
                      </ul>
                      </span>
                  </th>
                  <th class="con-p-d">合同操作</th>
                  </tr>
              </thead>
              <tbody>
              <tr v-for="list in listMap" :key="list.id">
                  <td>
                      <div>
                          <div class="con-title-d"  :title="list.title">{{list.subtitle}}<span v-if="list.appendix == 1" class="iconsprite icon-confj"></span></div>
                          <div class="con-fo-d"  :title="list.userName"><img width=14 height=14 src="~assets/img/src/contract/source-icon.png" class="orgincon-d">{{list.subuserName}}</div>
                      </div>
                  </td>
                  <td v-html="list.colsStatus">
                  </td>
                  <td>{{list.gmtModify}}</td>
                  <td>
                      <a @click='viewOpen(list.id,list.contractId)' class='hr-list-d' target='_blank'>查看 &nbsp;</a>
                      <a @click='openMessage(list.id,list.contractId,this)' class='hr-list-d'> 合同信息 &nbsp;</a>
                      <a @click='onOpenCategoryFile(list)' class='hr-list-d'> 归档</a>
                  </td>
              </tr>
              </tbody>
          </table>
          <div class="text-center conno-position-d" v-show="listMap.length<1">
              <img width="100%" height="100%" src="~assets/img/src/contract/noData.png">
          </div>
          <footer class="pagelist" v-if="total > pageSize">
          <sas-pagination :total="total" :currentPage="currentPage" :pageSize="pageSize" @current-change="pageChange"></sas-pagination>
        </footer>
        </section>
      </div>
    </div>
    <sas-dialog-category-file :show.sync="showFolderFile" :contractId="currentContract.contractId" @onComplete="confresh()"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import apis from "~/config/api";
import utils from "~/mixins/utils";
import searchInput from "~/components/common/search-input";
import dialogCategoryFile from "~/components/dialog/dialog-categoryFile";
export default {
  name: "manage-contract",
  layout: "manager",
  metaInfo: {
    title: "我的合同—云合同"
  },
  data() {
    return {
      listMap: [],
      total: 0,
      title: "",
      searchMonth: "",
      status: "",
      colsStatus: "",
      currentPage: 1,
      pageSize: 9,
      statuShow: false,
      timeShow: false,
      searchobject: {},
      buttonobject: {},
      colorobject: {},
      dropdownMenu_w: `请选择合同状态<span class="caret"></span>`,
      dropdownMenu: `查询时间段<span class="caret"></span>`,
      whiteheight: "",
      showFolderFile: false, //归档文件夹弹窗
      currentContract: {}, // 当前操作合同
      categoryid: this.$route.query.categoryid
    };
  },
  computed: {
    ...mapGetters(["statusval"]),
    ...mapState({
      hasLinked: state => state.user.hasLinked
    })
  },
  filters: {},
  watch: {
  
  },
  beforeRouteUpdate (to, from, next) {
    this.categoryid = to.query.categoryid;
    this.resetSearchField();
    this.confresh();
    next()
  },
  mounted() {
    let stateNum = this.$route.query.statusScope;
    switch (stateNum) {
      case 11:
        this.status = 0;
        this.dropdownMenu_w = `起草中<span class="caret"></span>`;
        break;
      case 12:
        this.status = 1;
        this.dropdownMenu_w = `等待他人的签名<span class="caret"></span>`;
        break;
      case 13:
        this.status = 2;
        this.dropdownMenu_w = `需要我的签名<span class="caret"></span>`;
        break;
      case 14:
        this.status = 3;
        this.dropdownMenu_w = `已完成<span class="caret"></span>`;
        break;
      case 15:
        this.status = 4;
        this.dropdownMenu_w = `已作废<span class="caret"></span>`;
        break;
      default:
        this.status = "";
        break;
    }
    const that = this;
    let whiteheight = $(".container-content-white").height();
    if (whiteheight > 270) {
      that.pageSize = Math.floor((whiteheight - 208) / 66);
    } else {
      that.pageSize = 1;
    }
    that.confresh();
    // window.onresize = function(){
    //   whiteheight = $(".container-content-white").height();
    //   if(whiteheight > 270){
    //       that.pageSize = Math.floor((whiteheight - 208) / 66);
    //   }else{
    //       that.pageSize = 1;
    //   }
    //     //console.log(that.pageSize);
    //   that.confresh();
    // }
    $("#ul-status").hover(
      function() {
        that.statuShow = true;
      },
      function() {
        that.statuShow = false;
      }
    );
    $("#ul-time").hover(
      function() {
        that.timeShow = true;
      },
      function() {
        that.timeShow = false;
      }
    );
  },
  mixins: [utils],
  methods: {
    resetSearchField() {
      this.currentPage = 1;
      this.resetSelectState();
      this.resetSelectTime();
      this.title = '';
    },
    async confresh() {
      var self = this;
      const contractList = await this.$axios
        .get(apis.getContractNearList, {
          params: {
            searchMonth: this.searchMonth,
            status: this.status,
            colsStatus: this.colsStatus,
            title: this.title,
            offset: (this.currentPage-1)*this.pageSize,
            limit: this.pageSize,
            categoryId: this.categoryid
          }
        })
        .then(data => data.data.data);
      this.listMap = contractList.rows;
      this.total = contractList.total;
      let statusStr = "";
      for (let userValue in this.listMap) {
        switch (this.listMap[userValue].colsStatus) {
          case 0:
            statusStr = "<span style='color: #91b6ff'>可编辑</span>";
            break;
          case 1:
            statusStr = "<span style='color: #a4c3ff'>授权中</span>";
            break;
          case 2:
            statusStr = "<span style='color: #68bdff'>查看中</span>";
            break;
          case 3:
            statusStr = "<span style='color: #94afe2'>律师审查中</span>";
            break;
          case 4:
            statusStr = "<span style='color: #769eea'>待发送</span>";
            break;
          case 10:
            statusStr = "<span style='color: #7ae2ab'>我已签</span>";
            break;
          case 20:
            statusStr = "<span style='color: #6bcc94'>要我签</span>";
            break;
          case 30:
            statusStr = "<span style='color: #a9badb'>已提交</span>";
            break;
          case 31:
            statusStr = "<span style='color: #ffac40'>审查完成</span>";
            break;
          case 32:
            statusStr = "<span style='color: #ffac40'>签署完成</span>";
            break;
          case 33:
            statusStr = "<span style='color: #68bdff'>查看中</span>";
            break;
          case 40:
            statusStr = "<span style='color: #c3c3c3'>已撤回</span>";
            break;
          case 41:
            statusStr = "<span style='color: #c3c3c3'>被退回</span>";
            break;
          case 42:
            statusStr = "<span style='color: #c3c3c3'>被废弃</span>";
            break;
          default:
            statusStr = "<span style='color: #ec2626'>未知</span>";
        }
        this.listMap[userValue].colsStatus = statusStr;
        //文字截取
        let Screenwidth = window.screen.width,
          font = 0;
        //console.log(Screenwidth);
        if (Screenwidth <= 1366) {
          font = 17;
        } else if (Screenwidth > 1366 && Screenwidth <= 1600) {
          font = 23;
        } else {
          font = 40;
        }
        if (this.listMap[userValue].title.length > font) {
          this.listMap[userValue].subtitle =
            this.listMap[userValue].title.substr(0, font) + "...";
        } else {
          this.listMap[userValue].subtitle = this.listMap[userValue].title;
        }
        if (this.listMap[userValue].userName.length > font) {
          this.listMap[userValue].subuserName =
            this.listMap[userValue].userName.substr(0, font) + "...";
        } else {
          this.listMap[userValue].subuserName = this.listMap[
            userValue
          ].userName;
        }
      }
      this.statuShow = false;
      this.timeShow = false;

      if(this.listMap.length == 0) {
        if(this.currentPage > 1) {
          this.pageChange(this.currentPage - 1)
        }
      }
    },
    async pageChange(val) {
      this.currentPage = val;
      this.confresh();
    },
    async viewOpen(id, cid) {
      let newPage = window.open("about:blank");
      const OpenDetail = await this.$axios
        .get(apis.l_pageFlag, {
          params: {
            pid: id
          }
        })
        .then(data => data.data);
      if (OpenDetail.success) {
        let flag = OpenDetail.data.flag;
        if (flag == 1) {
          newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view?pid=${id}&cid=${cid}`;
          // open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${id}&cid=${cid}`);
        }
        if (flag == 2) {
          newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${id}&cid=${cid}`;
          // open(`${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${id}&cid=${cid}`);
        }
        if (flag == 3) {
          newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-postil?pid=${id}&cid=${cid}`;
          // open(`${this.__getRouterBase()}/manage/contract/contract-postil?pid=${id}&cid=${cid}`);
        }
      } else {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: OpenDetail.msg
        });
        newPage.close();
      }
    },
    openMessage: function(message_Pid, message_Cid, node) {
      this.$router.push({
        name: "manage-contract-contract-message",
        query: {
          cid: message_Cid,
          pid: message_Pid
        }
      });
    },
    resetSelectState() {
      this.status = '';
      this.colsStatus = '';
      this.dropdownMenu_w = `全部<span class="caret"></span>`;
    },
    getSelectState: function(state) {
      this.currentPage = 1;
      if (state == "" || state == undefined || state == null) {
        this.dropdownMenu_w = `全部<span class="caret"></span>`;
      }
      if (state == "0") {
        this.dropdownMenu_w = `起草中<span class="caret"></span>`;
      }
      if (state == "1") {
        this.dropdownMenu_w = `等待他人的签名<span class="caret"></span>`;
      }
      if (state == "2") {
        this.dropdownMenu_w = `需要我的签名<span class="caret"></span>`;
      }
      if (state == "3") {
        this.dropdownMenu_w = `已完成<span class="caret"></span>`;
      }
      if (state == "4") {
        this.dropdownMenu_w = `已作废<span class="caret"></span>`;
      }
      this.status = state;
      this.colsStatus = "";
      this.statuShow = false;
      this.confresh();
    },
    resetSelectTime() {
      this.searchMonth = '';
      this.dropdownMenu = `全部<span class="caret"></span>`;
    },
    getSelectTime: function(time) {
      this.currentPage = 1;
      if (time == "1") {
        this.dropdownMenu = `一个月内<span class="caret"></span>`;
      }
      if (time == "2") {
        this.dropdownMenu = `两个月内<span class="caret"></span>`;
      }
      if (time == "3") {
        this.dropdownMenu = `三个月内<span class="caret"></span>`;
      }
      if (time == "6") {
        this.dropdownMenu = `半年内<span class="caret"></span>`;
      }
      if (time == "0") {
        this.dropdownMenu = `全部<span class="caret"></span>`;
      }
      this.searchMonth = time;
      this.searchMonth == null ? 0 : this.searchMonth;
      this.timeShow = false;
      this.confresh();
    },
    manage_Menu: function(staTus, colsSta, Text) {
      this.currentPage = 1;
      this.status = staTus;
      this.colsStatus = colsSta;
      this.confresh();
      switch (Text) {
        case 1:
          return (this.dropdownMenu_w = `可编辑<span class='caret'></span>`);
        case 2:
          return (this.dropdownMenu_w = `查看中<span class='caret'></span>`);
        case 3:
          return (this.dropdownMenu_w = `律师审查中<span class='caret'></span>`);
        case 4:
          return (this.dropdownMenu_w = `待发送<span class='caret'></span>`);
        case 5:
          return (this.dropdownMenu_w = `我已签<span class='caret'></span>`);
        case 6:
          return (this.dropdownMenu_w = `要我签<span class='caret'></span>`);
        case 7:
          return (this.dropdownMenu_w = `已提交<span class='caret'></span>`);
        case 8:
          return (this.dropdownMenu_w = `审查完成<span class='caret'></span>`);
        case 9:
          return (this.dropdownMenu_w = `签署完成<span class='caret'></span>`);
        case 10:
          return (this.dropdownMenu_w = `查看中<span class='caret'></span>`);
        case 11:
          return (this.dropdownMenu_w = `已撤回<span class='caret'></span>`);
        case 12:
          return (this.dropdownMenu_w = `被退回<span class='caret'></span>`);
        case 13:
          return (this.dropdownMenu_w = `被废弃<span class='caret'></span>`);
        default:
          return (this.dropdownMenu_w = `全部<span class='caret'></span>`);
      }
      this.statuShow = false;
    },
    searchbin: function() {
      this.currentPage = 1;
      this.confresh();
    },
    onRefresList() {
      [this.status = "", this.colsStatus = ""] = this.statusval;
      this.pageChange();
    },
    statusmethod() {
      this.statuShow = !this.statuShow;
    },
    timemethod() {
      this.timeShow = !this.timeShow;
    },
    onOpenCategoryFile(contract) {
      this.currentContract = contract;
      this.showFolderFile = true;
    }
  },
  components: {
    searchInput,
    "sas-dialog-category-file": dialogCategoryFile,
  }
};
</script>

<style>
.con-btn-d .caret {
  position: absolute;
  right: 14px;
  top: 10px;
}
.caret {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-top: -4px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  transform: rotate(-135deg);
  border-right: none;
  margin-left: 2px;
  vertical-align: middle;
}
.btn-d {
  width: 140px;
  height: 24px;
  border: 1px solid #bccbdc;
  color: #959595;
  background-color: #fff;
  border-radius: 2px;
  padding-right: 45px;
  position: relative;
}
.btn-d .caret {
  position: absolute;
  right: 14px;
  top: 10px;
}
</style>

<style lang="scss" scoped>
@import "~styles/base.scss";
.manage-contract {
  .container-header-w {
    padding-bottom: 20px;
    color: #333;
    position: relative;
    a {
      color: #333;
      &:hover {
        color: #333;
      }
    }
    span {
      color: #4081ff;
    } // &.arrow-icon{width: 10px; height: 15px; display: inline-block; background: rgba(0, 0, 0, 0) url("../images/saas/arrow-icon.png") no-repeat scroll 3px 4px;}
  } //列表内容
  .container-content-bg-w {
    width: 100%;
    margin-top: 20px;
    height: calc(100vh - 120px);
    .container-content-white {
      background-color: $body-bg;
      width: 100%;
      height: 100%;
      padding: 18px 18px 0 18px;
    }
    .contract-table {
      margin: 20px 0 0 0;
      height: 100%;
      position: relative;
    }
    table > tbody > tr:nth-of-type(odd) {
      background-color: #fff;
    }
    table > tbody > tr:nth-of-type(even) {
      background-color: #f8f8f8;
    }
    .table-hover > tbody > tr:hover {
      background-color: #eef4ff;
    }
    td,
    th {
      padding: 0;
    }
    th {
      padding-left: 40px;
      height: 40px;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
    }
    td {
      padding-left: 40px;
      height: 66px;
      font-size: 12px;
    }
    input,
    button,
    select,
    textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      -webkit-appearance: button;
      cursor: pointer;
    }
    button,
    select {
      text-transform: none;
    }
    button {
      overflow: visible;
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      margin: 0;
      font: inherit;
      color: inherit;
    }
    ul ul,
    ol ul,
    ul ol,
    ol ol {
      margin-bottom: 0;
    }
    li,
    ol,
    ul {
      list-style-type: none;
    }
    a {
      text-decoration: none;
    }
    a {
      background-color: transparent;
    }
    img {
      vertical-align: middle;
      border: 0;
    }
    %btn-con-img {
      display: block;
      width: 78px;
      height: 32px;
      line-height: 30px;
      text-align: center;
      float: left;
      border-radius: 4px;
    }
    .btn-con-img-d {
      @extend %btn-con-img;
      margin-right: 30px;
      background-color: #4081ff;
      color: #fff;
      &:hover {
        background-color: #6297ff;
        color: #fff;
      }
    }
    .btn-con-noc-d {
      @extend %btn-con-img;
      border: 1px solid #4081ff;
      color: #4081ff;
      background-color: #fff;
      &:hover {
        border: 1px solid #6297ff;
        color: #6297ff;
      }
    }
    .home-text-h {
      font-size: 12px;
    }
    .input-group .form-control:last-child,
    .input-group-addon:last-child,
    .input-group-btn:last-child > .btn,
    .input-group-btn:last-child > .btn-group > .btn,
    .input-group-btn:last-child > .dropdown-toggle,
    .input-group-btn:first-child > .btn:not(:first-child),
    .input-group-btn:first-child > .input-group-addon:last-child {
      border-left: 0;
    }
    .input-pad-d {
      padding: 1px 0;
      border-radius: 0 3px 3px 0;
    }
    .input-group-addon,
    .input-group-addon input[type="checkbox"] {
      margin-top: 0;
    }
    .input-group-addon {
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      color: #555;
      text-align: center;
      background-color: #eee;
      border: 1px solid #ccc;
    }
    .input-group-addon,
    .input-group-btn {
      width: 1%;
      white-space: nowrap;
      vertical-align: middle;
    }
    .input-group-addon,
    .input-group-btn,
    .input-group .form-control {
      display: table-cell;
    }
    .input-group-addon:not(:first-child):not(:last-child),
    .input-group-btn:not(:first-child):not(:last-child),
    .input-group .form-control:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    .input-group-addon,
    .input-group-btn,
    .input-group .form-control {
      display: table-cell;
    }
    .input-group .form-control {
      position: relative;
      z-index: 2;
      float: left;
      width: 100%;
      margin-bottom: 0;
    }
    .form-control {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background: #f8f8f8;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 0px;
      -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
      -o-transition: border-color ease-in-out 0.15s,
        box-shadow ease-in-out 0.15s;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .btn {
      width: auto;
      height: auto;
      font-size: 12px;
      color: #959595;
      text-align: right;
      display: inline-block;
      padding: 0px 12px;
      margin-bottom: 0;
      font-weight: 400;
      line-height: 1.42857143;
      white-space: nowrap;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 0px;
    }
    .bottom-contract4-d {
      font-size: 12px;
      color: #959595;
      text-align: right;
      padding-top: 0;
    }
    .glyphicon {
      position: relative;
      top: 1px;
      width: 7px;
      text-indent: 0;
      left: -11px;
      height: 17px;
      border-radius: 2px;
      display: inline-block;
      font-family: "Glyphicons Halflings";
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .con-th-d {
      background-color: #e8f0f9;
      height: 40px;
    }
    .con-t-d {
      max-width: 773px;
      width: auto;
    }
    .con-s-d,
    .con-ti-d {
      width: 310px;
    }
    .con-p-d {
      width: 200px;
    }
    .iconsprite{
      margin: 0px 0px 1px 20px;
    }
    .dropdown {
      position: relative;
    }
    .con-btn-d {
      width: 140px;
      height: 24px;
      border: 1px solid #bccbdc;
      color: #959595;
      background-color: #fff;
      border-radius: 2px;
      padding-right: 20px;
      position: relative;
    }
    .btn-d,
    .con-btn-d {
      font-size: 12px;
      font-weight: 400;
      margin: auto 10px;
    }
    .con-btn-d .caret {
      position: absolute;
      right: 14px;
      top: 10px;
    }
    .caret {
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-top: -4px;
      border-top: 1px solid #000000;
      border-left: 1px solid #000000;
      transform: rotate(-135deg);
      border-right: none;
      margin-left: 2px;
      vertical-align: middle;
    }
    .btn-d {
      width: 140px;
      height: 24px;
      border: 1px solid #bccbdc;
      color: #959595;
      background-color: #fff;
      border-radius: 2px;
      padding-right: 45px;
      position: relative;
    }
    .btn-d .caret {
      position: absolute;
      right: 14px;
      top: 10px;
    }
    .dropdown-menu.pull-right {
      border-radius: 4px;
      top: 19px;
      left: 10px;
      border: 1px solid #f0f0f0;
      background-color: #fff;
      padding-bottom: 17px;
      right: 0;
    }
    .dropdown-menu {
      min-width: 140px;
      max-width: 140px;
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
      font-size: 12px;
      position: absolute;
      z-index: 1000;
      display: none;
      padding: 5px 0;
      margin: 2px 0 0;
      text-align: left;
      list-style: none;
    }
    .pull-right {
      float: right !important;
    }
    .pull-right-d > li {
      cursor: pointer;
    }
    .dropdown-menu > li > a {
      display: block;
      padding: 0 20px;
      clear: both;
      line-height: 28px;
      color: #333;
      white-space: nowrap;
      height: 28px;
      font-weight: 400;
    }
    .pull-right-d > li:hover > .manage-menu1-d,
    .pull-right-d > li:hover > .manage-menu2-d,
    .pull-right-d > li:hover > .manage-menu3-d,
    .pull-right-d > li:hover > .manage-menu4-d,
    .pull-right-d > li:hover > .manage-menu5-d {
      border: 1px solid #ccc;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
      display: block;
    }
    .pull-right-d > li > a:hover {
      background-color: #4081ff;
      color: #fff;
      text-decoration: none;
    }
    #draft:hover > .manage-menu1-d,
    #waitsign:hover > .manage-menu2-d,
    #needsign:hover > .manage-menu3-d,
    #Completed:hover > .manage-menu4-d,
    #invalid:hover > .manage-menu5-d {
      display: block;
    }
    .manage-menu1-d,
    .manage-menu2-d,
    .manage-menu3-d,
    .manage-menu4-d,
    .manage-menu5-d {
      width: 118px;
      min-height: 28px;
      background: #fff;
      border-left: 6px solid transparent;
      position: absolute;
      right: -120px;
      text-indent: 15px;
      padding: 10px 0;
    }
    .manage-menu1-d > li:hover,
    .manage-menu2-d > li:hover,
    .manage-menu3-d > li:hover,
    .manage-menu4-d > li:hover,
    .manage-menu5-d > li:hover {
      background-color: #4081ff;
      color: #fff;
    }
    .manage-menu1-d {
      top: 48px;
    }
    .manage-menu2-d {
      top: 77px;
    }
    .manage-menu3-d {
      top: 105px;
    }
    .manage-menu4-d {
      top: 133px;
    }
    .manage-menu5-d {
      top: 161px;
    }
    .hide-w {
      display: none;
    }
    .manage-menu1-d > li,
    .manage-menu2-d > li,
    .manage-menu3-d > li,
    .manage-menu4-d > li,
    .manage-menu5-d > li {
      line-height: 28px;
    }
    .con-title-d {
      color: #333;
      font-size: 12px;
      line-height: 25px;
    }
    .con-fo-d {
      color: #959595;
      font-size: 11px;
    }
    .orgincon-d {
      margin: -2px 5px 0 0;
    }
    .hr-list-d {
      color: #4081ff;
      cursor: pointer;
    } //     .con-fj-d{
    //   background: rgba(0, 0, 0, 0) url("../images/saas/confj.png") no-repeat scroll;
    //   width: 16px;
    //   height: 14px;
    //   margin-left: 20px;
    //   display: inline-block;
    // }
    .conno-position-d {
      position: absolute;
      top: calc(50% - 99px);
      left: 50%;
      margin-left: -99px;
    }
    .text-center {
      text-align: center;
    }
    .pagelist {
      position: absolute;
      bottom: 40px;
      right: 0px;
    }
    @media (max-width: 1366px) {
      .container-content-bg-w {
        height: calc(100vh - 17px);
      }
    }
  }
}
</style>
