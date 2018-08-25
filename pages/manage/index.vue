<template>
  <div class="manage-index">
    <section class="top">
      <div class="row">
        <div class="col-xs-8 left">
            <div class="row">
                <div class="col-xs-5 user-info">
                    <div class="row box">
                        <div class="row">
                            <div class="col-xs-3 col-sm-3">
                              <router-link to="/manage/user/manage/userManage">
                                <img :src="user.user_avatar" class="user-img"  />
                              </router-link>
                            </div>
                            <div class="col-xs-9 col-sm-9">
                                <div class="account">
                                    <div class="account-autonym" :title="authStatusName">
                                        {{__clipTextOverflow(authStatusName, 6)}}
                                        <span class="iconsprite sas-mleft-10" :class="authStatusIcon"></span>
                                    </div>
                                    <div class="account-text">
                                        <span>账号：</span>
                                        <span :title="user.loginEmail" v-text="__clipTextOverflow(user.loginEmail, 11)"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>剩余合同签署份数:</span>
                            <span v-text="user.leftSignCnt"></span>
                            <span class="last">
                              <sas-button category="primary" @click="toSignature" size="medium">立即购买</sas-button>
                              <!-- <router-link class="btn" to="">立即购买</router-link> -->
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-7 user-sign">
                    <div class="flag">开启电子签署之旅</div>
                    <div class="row box">
                        <div class="col-xs-20 item">
                            <i class="iconsprite icon-identity-auth"></i>
                            <div class="row text">
                              <a href="javascript:void(0)" @click="toAuthView">{{authEnum[user.certify_status]}}</a>
                            </div>
                        </div>
                        <div class="col-xs-20"><hr class="item-line"></div>
                        <div class="col-xs-20 item">
                            <i class="iconsprite icon-draw-sign"></i>
                            <div class="row text">
                                <a href="javascript:void(0)"  @click="toSignName">绘制签名</a>
                            </div>
                        </div>
                        <div class="col-xs-20"><hr class="item-line"></div>
                        <div class="col-xs-20 item">
                            <i class="iconsprite icon-create-contract"></i>
                            <div class="row text">
                              <router-link  to="/manage/contract/contract-edit" target="_blank">创建合同</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-4 right">
            <div class="row contract">
              <lvx-tooltip effect="dark" placement="bottom-start" class="tip">
                <!-- <lvx-button>下左</lvx-button> -->
                <i class="iconsprite icon-tip"></i>
                <span slot="content">
                  <b></b>
                  1、仅支持word、pdf、图片文件格式<br />
                  2、文件大小&le;10M
                </span>
              </lvx-tooltip>
              <div class="buttons">
                <button @click="showUpload = true"><i class="iconsprite icon-btn-upload btn-upload"></i>本地合同上传</button>
                <button @click="toCTemplate"><i class="iconsprite icon-btn-import btn-template"></i>合同模板导入</button>
                <button @click="openLayerWrite"><i class="iconsprite icon-btn-prowrite btn-lawyer"></i>律师代写服务</button>
              </div>
            </div>
        </div>
      </div>
    </section>
    <div class="row title"><i class="iconsprite icon-status sas-vertical-align-middle"></i><span class="text">合同状态</span></div>
    <div class="row state">
      <div class="col-xs-3 item card1">
          <div class="con-mar-d">
            <router-link  :to="{name: 'manage-contract-contract', query: {'statusScope': 11}}" class="link sas-text-decoration-none" >
              <span class="iconsprite icon-status-draft sas-vertical-align-middle"></span>
              <span class="home-confont-d">起草中</span>
              <div class="state-all" v-if="contractCountMap[0]" v-text="contractCountMap[0]"></div>
              <div class="state-all none" v-else></div>

            </router-link>
          </div>
      </div>
      <div class="col-xs-3 item card2">
          <div class="con-mar-d">
            <router-link :to="{name: 'manage-contract-contract', query: {'statusScope': 12}}" class="link sas-text-decoration-none">
              <span class="iconsprite icon-status-wait sas-vertical-align-middle"></span>
              <span class="home-confont-d">等待他人签名</span>
              <div  class="state-all" v-if="contractCountMap[1]" v-text="contractCountMap[1]"></div>
              <div class="state-all none" v-else></div>
            </router-link>
          </div>
      </div>
      <div class="col-xs-3 item card3">
          <div class="con-mar-d">
            <router-link :to="{name: 'manage-contract-contract', query: {'statusScope': 13}}" class="link sas-text-decoration-none">
              <span class="iconsprite icon-status-tbsign sas-vertical-align-middle"></span>
              <span class="home-confont-d">需要自己签名</span>
              <div  class="state-all" v-if="contractCountMap[2]" v-text="contractCountMap[2]"></div>
              <div class="state-all none" v-else></div>
            </router-link>
          </div>
      </div>
      <div class="col-xs-3 item card4">
          <div class="con-mar-d">
              <router-link :to="{name: 'manage-contract-contract', query: {'statusScope': 14}}" class="link sas-text-decoration-none">
                <span class="iconsprite icon-status-complete sas-vertical-align-middle"></span>
                <span class="home-confont-d">已完成</span>
                <div  class="state-all" v-if="contractCountMap[3]" v-text="contractCountMap[3]"></div>
                <div class="state-all none" v-else></div>
              </router-link>
          </div>
      </div>
      <div class="col-xs-3 item card5">
          <div class="con-mar-d">
              <router-link :to="{name: 'manage-contract-contract', query: {'statusScope': 15}}" class="link sas-text-decoration-none">
                <span class="iconsprite icon-status-rabbish sas-vertical-align-middle"></span>
                <span class="home-confont-d">已作废</span>
                <div  class="state-all" v-if="contractCountMap[4]" v-text="contractCountMap[4]"></div>
                <div class="state-all none" v-else></div>
              </router-link>
          </div>
      </div>
    </div>
    <section class="bottom">
      <div class="row title cleafix">
        <div class="float-left">
          <i class="iconsprite icon-status1 sas-vertical-align-middle"></i>
          <span class="text"></span>最近合同
        </div>
        <div class="float-right">
          <router-link to="/manage/contract/contract" class="sas-text-decoration-none more-a"> 查看更多&nbsp;&nbsp;></router-link>
        </div>
      </div>
      <div class="table-container">
        <lvx-table
          :data="tableData"
          style="width: 100%"
          :headerRowStyle="theaderStyle"
          :headerCellStyle="theaderCellStyle"
          :cell-style="tcellStyle"
          tooltip-effect="light"
          >
          <lvx-table-column
            label="合同标题"
            :show-overflow-tooltip="true"
            >
            <!-- <template slot-scope="scope">
              <lvx-popover trigger="hover" placement="top-start">
                <span >{{ scope.row.title }}</span>

                <div slot="reference" class="">
                  <span >{{ scope.row.title }}</span>
                  <i class="iconsprite icon-confj" style="margin-left:20px;" v-if="scope.row.appendix === '1'"></i>
                </div>
              </lvx-popover>
            </template> -->
            <template slot-scope="scope">
              <span >{{ scope.row.title }}</span>
                <i class="iconsprite icon-confj" style="margin-left:20px;" v-if="scope.row.appendix === '1'"></i>
            </template>
          </lvx-table-column>
          <lvx-table-column
            label="合同状态"
            width="250">
            <template slot-scope="scope">
              <span style="margin-left: 10px" :style="{color: statusColor(scope.row.colsStatus)}">{{ scope.row.colsStatus | cstatus}}</span>
            </template>
          </lvx-table-column>
          <lvx-table-column label="更新时间" width="250">
            <template slot-scope="scope">
              <!-- <i class="lvx-icon-time"></i> -->
              <span style="margin-left: 10px">{{ scope.row.gmtModify }}</span>
            </template>
          </lvx-table-column>
          <lvx-table-column label="合同操作" width="250">
            <template slot-scope="scope">
              <lvx-button type="text" @click="toCView(scope.row.id, scope.row.contractId)">查看</lvx-button>
              <lvx-button type="text" @click="toCMessage(scope.row.id, scope.row.contractId)">合同信息</lvx-button>
            </template>
          </lvx-table-column>
          <div class="empty-wraper" slot="empty" style="height: 100%;">
            <img src="~assets/img/src/common/noData.png" alt="">
            <p class="text-bottom" style="margin-right: 45px;">没有找到匹配的记录</p>
          </div>
        </lvx-table>
        </div>
    </section>

    <sas-dialog-upload :show.sync="showUpload" />
    <sas-dialog-lawer :show.sync="$store.state.Manage.showLawer" type="write"/>
    <!-- <sas-dialog-lawer :show.sync="showLawer" type="write"/> -->
    <sas-dialog-unlink :show.sync="showUnlink" :unLinkAccount="unLinkAccount"/>
    <sas-cert-choose :show.sync="showCertChoose"/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import {getBrowserVisiableSize} from '~/framework/core/utils'
import utils from '~/mixins/utils'
import dialogUpload from '~/components/dialog/dialog-upload'
import dialogLawer from '~/components/dialog/dialog-lawer'
import dialogUnlinkAccount from '~/components/dialog/dialog-unlink-account'
import dialogCertChoose from '~/components/dialog/dialog-cert-choose'
export default {
  name: 'manage-index',
  metaInfo: {
    title: '我的首页-云合同'
  },
  mixins: [utils],
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'manager',
  data () {
    return {
      showUpload: false,
      showUnlink: false,
      unLinkAccount: 0,
      showCertChoose: false,
      authEnum: {
        0: '实名认证',
        1: '认证中',
        2: '已认证',
        3: '重新认证',
        4: '继续认证',
        7: '认证失败'
      },
      contractCountMap: [],
      tableData: []
    }
  },
  async fetchData (to, context) {
    let self = context;
    const countList = await self.$axios.get(apis.getContractCountGroupByState).then((data) => data.data);
    let screenSize = getBrowserVisiableSize();
    let contractLimit;
    let tableContainerHeight = screenSize.height - (52 + 20 + 217 + 37 + (screenSize.height * 0.153) + 37);
    if(tableContainerHeight <= 192) {
      contractLimit = 3;
    } else if (tableContainerHeight > 147 && tableContainerHeight <= 300) {
      contractLimit = 4;
    } else {
      contractLimit = 5;
    }
    const contractList = await self.$axios.get(apis.getContractNearList, {
      params: {
        searchMonth: '',
        status: '',
        colsStatus: '',
        title: '',
        offset: 0,
        limit: contractLimit
      }
    }).then((data) => data.data);
    /* 合同超过999显示999+ */
    if(countList.rowsCounts[0] > 999){
      countList.rowsCounts[0] = '999+'
    }
    if(countList.rowsCounts[1] > 999){
      countList.rowsCounts[1] = '999+'
    }
    if(countList.rowsCounts[2] > 999){
      countList.rowsCounts[2] = '999+'
    }
    if(countList.rowsCounts[3] > 999){
      countList.rowsCounts[3] = '999+'
    }
    if(countList.rowsCounts[4] > 999){
      countList.rowsCounts[4] = '999+'
    }
    self.$store.state.Manage.showLawer = to.query.template == 1 ? true : false;
    return {
      contractCountMap: countList.rowsCounts,
      tableData : contractList.data.rows,
    };
    // self.$store.state.Manage.contractCountMap = countList.rowsCounts;
    // self.$store.state.Manage.tableData = contractList.data.rows;
    
  },
  computed: {
    ...mapState({
      user: state => state.user,
      // contractCountMap: state => state.Manage.contractCountMap,
      // tableData: state => state.Manage.tableData,
      theaderStyle: state => state.UI.table.headerStyle,
      theaderCellStyle: state => state.UI.table.headerCellStyle,
      tcellStyle: state => state.UI.table.cellStyle,
    }),
    authStatusName() {
      let r;
      if(this.user.certify_status ==2){
          switch (this.user.userType){
              case 1:
                  r = this.user.userCertify.relName;
                  break;
              case 2:
                  r = this.user.companyCertify.corpName;
                  break;
              default:
                  r = "默认用户";
                  break;
          }
      }else{
          r = "未认证用户";
      }
      return r;
    },
    authStatusIcon() {
      switch (this.user.certify_status){
          case '1':
              return 'icon-autonym-ing';//认证中
              break;
          case '2':
              return 'icon-autonym-success';//已认证
              break;
          case '3' :
          case '7' :
              return 'icon-autonym-fail';//认证失败
              break;
          default:
              return 'icon-autonym-no';//未认证
              break;
      }
    }
  },
  filters: {
    cstatus: function (v) {
      let [m, d] = [{
        0: '可编辑',
        1: '授权中',
        2: '查看中',
        3: '律师审查中',
        4: '待发送',
        10: '我已签',
        20: '要我签',
        30: '已提交',
        31: '审查完成',
        32: '签署完成',
        33: '查看中',
        40: '已撤回',
        41: '被退回',
        42: '被废弃'
      }, '未知'];
      return m[v] || d;
    }
  },
  watch: {
  },
  mounted () {
    this.user.leftSignCnt = String(this.user.leftSignCnt).replace(/(\d)(?=(\d{3})+$)/g, "$1,");;
    this.init();
  },
  methods: {
    async init() {
      if(sessionStorage.getItem("sdkContractVal") != 1) {
        const r = await this.$axios.get(apis.getHasUnlinkedUser).then((data)=>data.data);
        if(r.success && r.data.hasUnLinkUser) {
          this.showUnlink = true;
          this.unLinkAccount = r.data.unLinkUserCount;
          sessionStorage.setItem("sdkContractVal",1);
        }
      }
    },
    async toCView(pid, cid) {
      let newPage = window.open('about:blank');
      const r = await this.$axios.get(apis.l_pageFlag, {params:{pid: pid}}).then((res)=>{
        let r = res.data;
        if(r.success) {
          if(r.data.flag == 1) {
            newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view?pid=${pid}&cid=${cid}`;
            // open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${pid}&cid=${cid}`);
          } else if (r.data.flag == 2) {
            newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${pid}&cid=${cid}`;
            // open(`${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${pid}&cid=${cid}`);
          } else if (r.data.flag == 3) {
            newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-postil?pid=${pid}&cid=${cid}`;
            // open(`${this.__getRouterBase()}/manage/contract/contract-postil?pid=${pid}&cid=${cid}`);
          }
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: r.msg
          });
          newPage.close();
        }
      });
    },
    toCMessage(pid, cid) {
      this.$router.push({path: '/manage/contract/contract-message', query: {cid: cid, pid: pid}})
    },
    toCTemplate() {
      open(`${this.$router.options.base}/manage/contract/contract-edit?tid=1`);
    },
    toSignature() {
      this.$router.push({name: 'manage-user-manage-signature'})
    },
    toSignName() {
      if(this.user.signatureNum == 3) {
        this.$router.push({name: 'manage-user-sign-signSet'});
      } else {
        this.$router.push({name: 'manage-user-sign-signName'});
      }
    },
    toAuthView() {
      switch(this.user.userType) {
        case 0:
          //l老用户认证
          this.showCertChoose = true;
          break;
        case 1:
          //个人用户认证
          if(this.user.certify_status == '0' || this.user.certify_status == '3') { //实名认证 、认证失败
            this.$router.push({path: '/manage/user/check/personal', query: {tab: 0}});
            //go 个人基础认证页面
          } else if(this.user.certify_status == '4') { //继续认证
            this.$router.push({path: '/manage/user/check/personal', query: {tab: 1}});
            //go 个人增强认证页面
          } else if(this.user.certify_status == '2') { //认证成功
            //go 个人基础信息页面
            this.$router.push({name: 'manage-user-manage-userManage'});
          }
          break;
        case 2:
          //企业用户认证
          if(this.user.over == 1){
            if(this.user.certify_status != '1'){
              this.$router.push({path: '/manage/user/check/company',query:{tab:0}});
            }
          }else if(this.user.certify_status == '0' || this.user.certify_status == '3') { //实名认证 、认证失败
            //go 企业基础认证页面
            this.$router.push({path: '/manage/user/check/checkAutomatic', query: {tab: 0}});
          } else if(this.user.certify_status == '1' && (this.user.companyCertify && this.user.companyCertify.status ==5)) { //继续认证
            //go 企业增强认证页面2.1
            this.$router.push({path: '/manage/user/check/playMoney', query: {tab: 1}});

          } else if(this.user.certify_status == '1' && (this.user.companyCertify && this.user.companyCertify.status ==6)) { //继续认证
            //go 企业增强认证页面2.2
            this.$router.push({path: '/manage/user/check/checkMoney', query: {tab: 1}});
            //go 企业增强认证页面
          }else if(this.user.certify_status == '2') { //认证成功
            //go 个人基础信息页面
            this.$router.push({name: 'manage-user-manage-userManage'});
          }
          break;
        default:
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:'账号异常，请联系客服'
          })
          break;
      }
    },
    statusColor(v) {
      let [m, d] = [{
        0: '#91b6ff',
        1: '#a4c3ff',
        2: '#68bdff',
        3: '#94afe2',
        4: '#769eea',
        10: '#7ae2ab',
        20: '#6bcc94',
        30: '#a9badb',
        31: '#ffac40',
        32: '#ffac40',
        33: '#68bdff',
        40: '#c3c3c3',
        41: '#c3c3c3',
        42: '#c3c3c3'
      }, '#ec2626'];
      return m[v] || d;
    },
    openLayerWrite() {
      this.$store.state.Manage.showLawer = true;
    }
  },
  components: {
    'sas-dialog-upload': dialogUpload,
    'sas-dialog-lawer': dialogLawer,
    'sas-dialog-unlink': dialogUnlinkAccount,
    'sas-cert-choose': dialogCertChoose
  }
}
</script>
<style type="text/css">

</style>
<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .manage-index{
    .float-left{
      float: left;
    }
    .float-right{
      float: right;
    }
    .col-xs-20{
      width: 20%;
      float: left;
      position: relative;
      min-height: 1px;
    }
    .col-xs-60{
      width: 60%;
      float: left;
      position: relative;
      min-height: 1px;
    }
    .col-xs-30{
      width: 30%;
      float: left;
      position: relative;
      min-height: 1px;
    }
    @include responsive-default {
      height: 100%;
      .top{
        .left{
          height: 217px;
          border-radius: 2px;
          background-color: #fff;
          .user-info{
            padding: 10px 0;
            .box{
              padding: 2vh 0 2vh 23px;
              border-right: 1px solid #e6ebf6;
              .bottom{
                margin-top: 63px;
                font-size: 12px;
                .last{
                  margin-left: 11%;
                }
                .btn{
                  background-color: $theme-color;
                  color: #fff;
                  border-radius: 4px;
                  padding: 5px 12px;
                  text-decoration: none;
                }
              }
            }
            .user-img{
              width: 70px;
              height: 70px;
              background-color: #fff;
              border-radius: 35px;
              border: 2px solid #c1c1c1;
              padding: 2px;
            }
            .account{
              margin-left: 10px;
              color: #333;
              .account-autonym{
                margin-top: 7px;
                font-size: 16px;
                font-weight: 600;
                height: 18px;
                white-space: nowrap;
              }
              .account-text{
                height: 5px;
                margin-top: 20px;
                clear: both;
                font-size: 12px;
              }
            }
          }
          .user-sign{
            .flag{
              background-color: $theme-color;
              color: #fff;
              font-size: 12px;
              border-radius: 22px 0 0 22px;
              height: 24px;
              width: 125px;
              position: absolute;
              top: 2vh;
              right: 0;
              padding: 4px 12px 4px 17px;
            }
            .box{
              height: 217px;
              margin-left: 0;
              padding: 43px 20px 50px;
              .item{
                .iconsprite{
                  margin-top: 5px
                }
                .text{
                  margin-top: 2vh;
                  margin-right: 12px;
                  padding-left: 16px;
                  width: 70px;
                  a{
                    color: #333;
                    font-size: 12px;
                    text-decoration: underline;
                    margin-right: 11%;
                    &:hover{
                      color: $theme-color;
                    }
                  }
                }
              }
              .item-line{
                margin-top: 8.5vh;
                margin-left: 0;
                width: 79px;
                border-top: 1px dashed #d7d7d7;
              }
            }
          }
        }
        .right{
          height: 217px;
          .contract{
            border-radius: 2px;
            background-color: #d8e7f5;
            border: 1px solid #c3dcf3;
            position: relative;
            height: 100%;
            width: calc(100% - 26px);
            margin-left: 26px;
            .tip{
              margin-top: 10px;
              margin-left: 10px;
            }
            .buttons{
              padding: .5% 0;
              margin: 0 auto;
              width: 218px;
              button{
                &:first-child{
                  margin-top: 0px;
                }
                &:hover{
                  background-color: #fff;
                }
                background-color: #ecf4fc;
                border: none;
                width: 100%;
                height: 40px;
                margin-top: 15px;
                font-size: 14px;
                color: $theme-color;
                position: relative;
                padding-left: 50px;
                .iconsprite{
                  left: 36px;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }

            }
          }
        }
      }
      .title{
        height: 37px;
        line-height: 37px;
        font-size: 12px;
        color: $font-color;
      }
      .state{
        height: 15.3%;
        .item{
          width: 18.4%;
          border-radius: 2px;
          font-size: 14px;
          text-align: center;
          height: 100%;
          &:not(:last-child){
            margin-right: 2%;
          }
          .con-mar-d{
            width: 100%;
            // padding-top: 27px;
            // padding-bottom: 56px;
            transform: translateY(-50%);
            top: 50%;
            position: relative;
            margin: 0 auto;
            .state-all{
              font-size: 18px;
              margin-left: 12px;
              font-weight: 600;
              display: inline-block;
              width: auto;
              padding: 0 2px;
              // min-height: 13px;
              border-bottom: 2px solid;
            }
            .none{
              width: 15px;
              border-bottom: 3px solid;
              vertical-align: middle;
            }
            .home-confont-d{
              padding-top: 7px;
            }
          }
          .link{
            color: inherit;
          }
        }
        .card1{
          background-color: #fcfffb;
          color: #47a315;
        }
        .card2{
          background-color: #faffff;
          color: #68bebf;
        }
        .card3{
          background-color: #f5f8ff;
          color: #4081ff;
        }
        .card4{
          background-color: #fffbf5;
          color: #ff9e14;
        }
        .card5{
          background-color: #fbfbfb;
          color: grey;
        }
      }
      .bottom{
        .table-container{
          padding: 15px 16px 15px;
          border-radius: 2px;
          background-color: #fff;
          min-height: 271px;
        }
        .more-a{
          color: #333;
          &:hover{
            color: $theme-color;
          }
        }
      }

    }
  }

</style>
