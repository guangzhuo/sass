<template>
  <div class="contract-message">
    <sas-breadcrumb separator="/">
      <sas-breadcrumb-item>合同管理</sas-breadcrumb-item>
      <sas-breadcrumb-item v-if="hasLinked == true" :to="{ name: 'manage-contract-contract' }">我的合同</sas-breadcrumb-item>
      <sas-breadcrumb-item>合同信息</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row all-border">
      <div id="container-main">
        <div id="container-main-title">
          <div id="title-name">{{`《${titles}》`}}</div>
          <div id="title-time" class="size-12" >{{titlestime}}</div>
        </div>
        <div class="container-main-message" id="container-main-message">
          <div id="message-label">
            <message-button :contractmodels.sync="contractmodel" :flag.sync="flag" :title.sync="titles" />
          </div>
          <div id="message-table-div" style="margin-bottom: 25px;">
            <table class="message-table-z">
              <tr>
                <th>
                  <span class="point"></span><label>合同状态：</label><span id="contract-colsStatus" class="size-12" style="margin-right: 250px;">{{ showstatus }}</span>
                </th>
                <p style="background: transparent;height: 20px;"></p>
                <th id="message-table-right">
                  <span class="point"></span><label>合同来源：</label><span id="contract-userName" class="size-12">{{ contractmodel.userName }}</span>
                </th>
              </tr>
              <tr v-if="contractmodel.options ==''"></tr>
              <tr v-else-if="contractmodel.options && contractmodel.options.length > mainwidth">
                <th colspan="2">
                  <span class="point"></span>
                  <label>{{ remindTitle }}</label>
                  <span id="contract-options" class="size-12">{{contractoptions}}...<span @click="showmore(contractmodel.options)" class="show-more-w" style="color:#4081ff;">查看更多</span></span>
                </th>
              </tr>
              <tr v-else>
                <th colspan="2">
                  <span class="point"></span>
                  <label>{{ remindTitle }}</label>
                  <span id="contract-options" class="size-12" v-html="contractoptions"></span>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div id="container-states">
        <div style="padding-top: 20px;">合同签署信息</div>
        <div style="margin-top: 55px;position: relative;">
          <div :class="contractmodel.colsStatus==10&&contractmodel.rowsStatus==1&&contractmodel.userName=='自建'?'message-short-message container-states-message':'container-states-message'">
            <div id="container-states-main">
              <div class="states-main-row" v-if="logContractState == '合同签署完成'">
                  <div class="main-row-time" style="padding-top:0"></div>
                  <div class="main-row-state" style="padding-top:0">
                  <div class="main-row-img-z2 position6"><div style="height: 32px;"></div></div></div>
                  <div class="main-row-p" style="padding-top:0">合同签署完成</div>
                  <div class="main-row-message" style="padding-top:0"><div></div></div>
              </div>
              <div class="states-main-row" v-if="logContractState == '合同已作废'">
                  <div class="main-row-time" style="padding-top:0"></div>
                  <div class="main-row-state" style="padding-top:0">
                  <div class="main-row-img-z2 position5"><div style="height:31px;"></div></div></div>
                  <div class="main-row-p" style="padding-top:0">合同已作废</div>
                  <div class="main-row-message" style="padding-top:0"><div></div></div>
              </div>
              <div class="states-main-row" :class="index === 0 && logContractState != '合同签署完成' && logContractState != '合同已作废'?'first-row':''" v-for="(item, index) in signstrs" :key="index">

                <div class="main-row-time">{{ item.optDate }}</div>
                    <div class="main-row-state">
                        <div v-if="item.optName == '签署合同'" class="main-row-img-z position4"><div></div></div>
                        <div v-else-if="item.optName == '发送签署给'" class="main-row-img-z position3"><div></div></div>
                        <div v-else-if="item.optName == '发送查看'" class="main-row-img-z position2"><div></div></div>
                        <div v-else-if="item.optName == '创建合同'" class="main-row-img-z position1"><div></div></div>
                        <div v-else class="main-row-img-z position1"><div></div></div>
                    </div>
                    <div class="main-row-p">{{ item.optName }}</div>
                        <div class="main-row-message">
                          <div>{{ item.optUser }}</div>
                        </div>
                        <div  v-if="item.sendUser != null" class="main-row-send" style="max-width: 400px;">
                          <div v-for="(item, index) in item.sendUser.split('、')" :key="index">&nbsp;&gt;&nbsp;&nbsp;&nbsp;{{ item }}</div>
                        </div>
                    </div>
                </div>
              </div>
          <div id="container-states-left">
            <div v-if="unSignedReclist != null && unSignedReclist.length > 0">
              <div v-for="(item, index) in unSignedReclist" :key="index" v-if="!item.isRemaind">
                <span class="float-left" :title="item.signSrcName">{{item.signName}}</span>
                <span class="float-right container-states-remind" @click="remaindFunc(item.signUid, index)">提醒</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sas-dialog-lawer :show.sync="showLawer" :pid="cPid" :contractTitle="cContractTitle"/>
     <sas-dialog
        :show.sync="CheckManVisible"
        title="remindTitle"
        width="30%"
      >
        <div class="auth-view-alert-w">
          <span v-for="(item, index) in strs" :key="index" class='strs-padding-w' title='item'>{{ item.length>25 ? item.substring(0,24)+'...': item}}</span>
        </div>

      </sas-dialog>
  </div>
</template>

<script>
  import dialogLawer from '~/components/dialog/dialog-lawer'
  import messageButton from '~/components/contract/message-button'
  import base from '~/framework/core/vue-base'
  import apis from '~/config/api'
  import { mapState } from 'vuex'
  import $ from 'jquery'
  export default {
    name: 'manage-contract-message',
    layout: 'manager',
    extends: base,
    metaInfo: {
      title: "合同信息—云合同",
    },
    data () {
      return {
        messageMap: {},
        codeval:'',
        title:'',
        contractmodel:'',
        mainwidth: '',
        remindTitle: '签约人：',
        flag: '',
        titles: '',
        titlestime: '',
        showstatus: '',
        logContractState: '',
        contractoptions: '',
        showLawer:false,
        CheckManVisible:false,
        strs: [],
        signstrs: [],
        userlist: [],
        unSignedReclist: [],
        cid: this.$route.query.cid, //当前合同id
        cPid: this.$route.query.pid, //当前pid
        cContractTitle: '' //当前合同标题
      }
    },
    computed: {
        ...mapState({
            hasLinked: state => state.user.hasLinked
        })
    },
    watch: {
    },
    mounted () {
      this.openContractSign();
    },
    methods: {
      openContractSign(){
        const self = this;
          let gmtModify;
         self.$axios.get(apis.contractSignLog, {
          params: {
            cid: self.cid
          }
        }).then((res) => {

          let code = res.data.code;
          let datalist = res.data.data;
          let { ContractParterModel,
                title,
                definedTagNo,
                definedTagitle,
                stateFlag,
                contractState,
                signedRec,
                unSignedRec,
                flag,
                contractCreateTime } = datalist;

          if(code == 200){
            self.contractmodel = ContractParterModel;
            self.flag = flag;
            self.titles = title;
            self.titlestime = contractCreateTime;
            self.logContractState = contractState;
            self.unSignedReclist = unSignedRec;
            self.makeRow(signedRec)
            self.statusFmt(ContractParterModel.colsStatus);
            self.mainwidth = ($("#container-main-message").width() - 200) / 17;

            if (ContractParterModel.options.length > self.mainwidth) {
              //gmtModify = ContractParterModel.options;
              let str = self.cutString(ContractParterModel.options, self.mainwidth - 1);
              self.contractoptions= str;
            } else {
              self.contractoptions = ContractParterModel.options;
            }

            if(ContractParterModel.colsStatus==2||ContractParterModel.colsStatus==33){
              this.remindTitle = "查看人:"
            }

          }
           if (code == 201) {
             $('#setting2').html(datalist.msg);
           }
        });
      },
      makeRow(rows){
        this.signstrs = rows;
        for(let i in rows){
          if (rows[i].sendUser != null) {
            this.userlist = rows[i].sendUser.split('、');
          }
        }
      },
      statusFmt(colsStatus) {
        switch (colsStatus) {
          case 0:
            this.showstatus = "起草中-可编辑";break;
          case 1:
            this.showstatus = "起草中-授权中";break;
          case 2:
            this.showstatus = "起草中-查看中";break;
          case 3:
            this.showstatus = "起草中-律师审查中";break;
          case 4:
            this.showstatus = "起草中-待发送";break;
          case 10:
            this.showstatus = "等待他人的签名-我已签";break;
          case 20:
            this.showstatus = "需要我的签名-要我签";break;
          case 30:
            this.showstatus = "已完成-已提交";break;
          case 31:
            this.showstatus = "已完成-审查完成";break;
          case 32:
            this.showstatus = "已完成-签署完成";break;
          case 33:
            this.showstatus = "已完成-查看中";break;
          case 40:
            this.showstatus = "已作废-已撤回";break;
          case 41:
            this.showstatus = "已作废-被退回";break;
          case 42:
            this.showstatus = "已作废-被废弃";break;
          default:
            this.showstatus = "未知";break;
        }
      },
      cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
          return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
          s = s + str.charAt(i);
          if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
              return s.substring(0, s.length - 1) + "...";
            }
          } else {
            strlen = strlen + 1;
            if (strlen >= len) {
              return s.substring(0, s.length - 2) + "...";
            }
          }
        }
        return s;
      },
      strT(title){
        let str = title;
        title = str.replace(/'/g,"str;");
        return title;
      },
      strD(title){
        var str = title;
        title = str.replace(/str;/g,"&#39;");
        return title;
      },
      lawyerSrv(cTitle, pid, view){
        this.showLawer = true;
        this.cPid = pid;
        this.cContractTitle = cTitle;
      },
      deleteHT(pid, colsStatus){
        var html = "";
        if (colsStatus == 1) {
          html = "温馨提醒：该合同目前处于“授权中”，若你执行此操作，所有被授权者的授权将被立即收回，律师审查服务将被终止，如果放弃操作请点击返回。<br><br>";
        }
        this.$confirm('请再次确认是否删除该合同！', '删除合同', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(apis.delete, {
            pid: pid
          }, function (result) {
            if (result.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message:  result.msg
              });
            }
            history.go(-1);
          });

        });
      },
      toMakeAnEndTheLawyerOrder(pid) {
        this.$confirm('温馨提示：若你执行此操作，律师审查服务将立即终止，并默认你对该服务满意，你确定要执行此操作吗？', '终止律师审查服务', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(apis.toMakeAnEndTheLawyerOrder, {
            pid: pid
          }, function (result) {
            if (result.success) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              window.location.reload();
            } else {
              this.$message({
                type: 'error',
                message:  result.msg
              });
            }
            history.go(-1);
          });

        });
      },
      UndoSign(pid) {
        this.$confirm('提示：你正在进行合同撤销签名操作，请仔细确认。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(apis.undoSign, {
            pid: pid
          }, function (ret) {
            if (ret.code == 200) {
              if (ret.data == 'true') {
                this.$message({
                  type: 'success',
                  message: '撤销签名成功!'
                });
              } else { //未实名认证
                this.$message({
                  type: 'error',
                  message:  "撤销签名失败"
                });
              }
              window.location.reload();
            }
            history.go(-1);
          });

        });
      },
      contractRevocation(pid) {
        this.$confirm('合同撤回后，对方将无法签署，你确定要撤回吗？', '撤回要约', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(apis.revocation, {
            pid: pid
          }, function (result) {
            if (result.success) {
              this.$message({
                type: 'success',
                message: '已撤回!'
              });
              window.location.reload();
            } else {
              this.$message({
                type: 'error',
                message:  result.msg
              });
            }
          });

        });
      },
      contractSendBack(pid) {
        this.$confirm('退回后你将无法再看到该份合同，你确定要退回吗？', '我要退回', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(apis.sendBack, {
            pid: pid
          }, function (result) {
            if (result.success) {
              this.$message({
                type: 'success',
                message: '已撤回!'
              });
              window.location.reload();
            } else {
              this.$message({
                type: 'error',
                message:  result.msg
              });
            }
          });

        });
      },
      showmore(viewid){
        this.strs = viewid.split(",");
        this.CheckManVisible = true;
      },
      async remaindFunc(remaindUser, indexNo) {
        const remainlist = await this.$axios.post(apis.remaindSign+`?contractId=${this.cid}`,{
          remaindUserId: remaindUser
        }).then((res)=> res.data);

        if(remainlist.code == 200){
          this.unSignedReclist.splice(indexNo, 1);
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText:'已发送提醒'
          });
        }else{
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:remainlist.msg
          })
        }
      },
    },
    components: {
      'sas-dialog-lawer':dialogLawer,
      'messageButton':messageButton,
    }
  }
</script>
<style>
  .main-row-img-z {
    background-color: #b9c5dd;
    border-radius: 50px;
    height: 30px;
    width: 30px;
    position: relative;
    left: -16px;
    top: 9px;
    display: inline-block
  }

  .first-row .main-row-img-z {
    background-color: #4081ff
  }
    .states-main-row {
      display: table-row;
      vertical-align: top;
    }

    .states-main-row > div {
      display: table-cell;
      padding-top: 45px;
    }
    .main-row-img-z2 {
      position: relative;
      left: -20px;
      top: -14px;
    }
    .main-row-img-z>div, .main-row-img-z2 > div {
      background-image: url("~assets/img/src/contract/icon.png");
      height: 25px;
      width: 31px;
      margin: 3px 5px;
    }
    .position1 > div {
      background-position: -24px -353px
    }

    .position2 > div {
      background-position: -24px -376px
    }

    .position3 > div {
      background-position: -24px -399px
    }

    .position4 > div {
      background-position: -24px -422px
    }

    .position5 > div {
      background-position: -26px -476px
    }

    .position6 > div {
      background-position: -28px -511px
    }

    .first-row .position1 > div {
      background-position: -1px -353px
    }

    .first-row .position2 > div {
      background-position: -1px -376px
    }

    .first-row .position3 > div {
      background-position: -1px -399px
    }

    .first-row .position4 > div {
      background-position: -1px -422px
    }
    .first-row > div {
      display: table-cell !important;
      padding-top: 0 !important;
    }
    .main-row-state {
      border-left: 2px solid #b9c5dd;
      height: 100%;
    }
    .main-row-time {
      padding-right: 104px;
    }
    .main-row-send{padding-left: 173px;}

    #container-states-left{display: inline-block;position: absolute;right: 8px;top: 12px;}
    #container-states-left>div div {
      width: 223px;
      height: 27px;
      line-height: 27px;
      background-color: #f1f1f1;
      margin: 0 0 5px 0;
      padding: 0 5px; }
    .container-states-remind{color:#4081ff;}
    .container-states-remind:hover{cursor:pointer;}
    @media (max-width: 1920px){
      .main-row-p {
          padding-right: 84px;
      }
      .main-row-state {
        border-left: 2px solid #b9c5dd;
        height: 100%;
      }

    }

</style>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .contract-message{
    height: 100%;
    .all-border {
      margin-top: 15px;
      background-color: #fff;
      border: 1px solid #b9c5dd;
      margin-bottom: 45px;
      min-height: calc(100% - 34px);
    }
    #container-main-title{
      text-align: center;
      margin: 30px 24px 0;
      border-bottom: 1px dashed #b9c5dd;
    }
    #title-name {
      font-size: 18px;
      font-weight: 700;
    }
    #title-time {
      padding: 12px;
    }
    .size-12 {
      font-size: 12px;
    }
    .container-main-message{
      text-align: center;
    }
    .message-table-z{
      margin: auto;
    }
    table {
      background-color: transparent;
      border-spacing: 0;
      border-collapse: collapse;
    }
    th {
      text-align: left;
    }
    td, th {
      padding: 0;
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
    }
    .message-table-z tr th {
      line-height: 40px;
      font-weight: 400;
    }
    .point {
      background-color: #585858;
      width: 5px;
      height: 5px;
      display: inline-block;
      border-radius: 50px;
      margin: 0 10px 0 5px;
    }
    #message-table-right {
      text-align: end;
    }
    #container-states {
      border-top: 1px solid #b9c5dd;
      margin: 0 33px;
      max-height: calc(100vh - 455px);
      height: auto;
      overflow-y: auto;
    }
    .container-states-message {
      display: inline-block;
      width: 75%;
      padding-bottom: 50px;
    }
    .container-states-message {
      width: 100%;
    }
    @media (max-width: 1920px) {
      .all-border {
        margin-bottom: 5px;
      }
      #container-states{
        max-height: calc(100vh - 367px);
      }
    }
    @media (max-width: 1600px){
      .main-row-send {
        padding-left: 5px;
      }
      #container-states{
        max-height: calc(100vh - 360px);
      }
    }
    @media (max-width: 1366px){
        .message-short-message {
          width: 72%;
        }
      // .container-states-message {
      //   width: 72%;
      // }
      .main-row-time{
        padding-right: 33px;
      }
      .main-row-send {
        padding-left: 27px;
      }
      #container-states{
        max-height: calc(100vh - 378px);
      }
    }

    #container-states-main {
      display: table;
      margin: auto;
    }

    #message-label{
      margin-top: 25px;
    }
    .auth-view-alert-w {
    width: 93%;
    margin: 25px auto;
    text-align: left;
  }
  .strs-padding-w {
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    color: #959595;
    display: inline-block;
    margin: 0 10px 10px 0;
    padding: 5px 10px;
  }
  .strs-padding-w:hover {
    color: #313131;
    cursor: pointer;
  }

  }

</style>
