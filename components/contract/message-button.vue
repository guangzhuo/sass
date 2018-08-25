<template>
  <div>
    <SasButton v-if="examine" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="viewOpen">查看</SasButton>
    <router-link v-if="showEditBtn" class="conbutton"  :to="{path:'/manage/contract/contract-edit',query:{pid: contractmodels.id}}" target="_blank">编辑</router-link>
    <SasButton v-if="lawyercheck" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="lawyerSrv">律师审查</SasButton>
    <router-link v-if="send" class="conbutton"  :to="{path:'/manage/contract/contract-send',query:{pid: contractmodels.id}}" target="_blank">发送</router-link>
    <SasButton v-if="sign" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="onSignContract(contractmodels.id, contractmodels.contractId, contractmodels.roleId)">签署</SasButton>
    <SasButton v-if="cancelviewer" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="onCancelView">取消查看方</SasButton>
    <SasButton v-if="netstop" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="toMakeAnEndTheLawyerOrder(contractmodels.id)">终止服务</SasButton>
    <SasButton v-if="revokesign" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="onConfirmCancelSign">撤销签名</SasButton>
    <SasButton v-if="withdraw" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="showrevocation = true">撤回</SasButton>
    <SasButton v-if="sendback" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="confirmSendBack = true">退回</SasButton>
    <SasButton v-if="copyparter" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="fromParter(contractmodels.id);">复制合同</SasButton>
    <SasButton v-if="replisomepdf" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="copyPdf(contractmodels.id)">复制合同</SasButton>
    <SasButton v-if="settingalert" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="onSetAlarm">设置提醒</SasButton>
    <SasButton v-if="remove" category="dotted" style="margin-left: 10px;color: #333;border-color: #d9d9d9;"  @click="onConfirmDel">删除</SasButton>
    <sas-dialog-check :show.sync="showLawer" :pid="contractmodels.id" :contractTitle="contractmodels.title" />
    <lvx-dialog
      title="终止律师审查服务"
      :visible.sync="showLowyerOder"
      width="30%"
      top="18%"
      >
      <span class="endservce">
        <span class='FBI-warning'>!</span>
        温馨提示：若你执行此操作，律师审查服务将立即终止，并默认你对该服务满意，你确定要执行此操作吗？</span>
      <div slot="footer" style="text-align:center;">
        <lvx-button @click="showLowyerOder = false">取 消</lvx-button>
        <lvx-button type="primary" @click="lawyerEnd">确 定</lvx-button>
      </div>
    </lvx-dialog>
    <sas-dialog-watchlist :show.sync="watchlistDialogVisible" :pid="contractmodels.id" :title="watchListDialogTitle"/>
    <sas-dialog-purchase :show.sync="purchaseDialogVisible" />
    <sas-dialog-alarm :show.sync="alramDialogVisible" :cid="contractmodels.contractId" />
    <sas-dialog-no-signet :show.sync="visibleDialogNoSignet" />
    <sas-confirm class="text-left" title="你还未实名认证，请前往认证." :isShow.sync="confirmToCert" @enSure="toCert"/>
    <div style="text-align:left;">
      <sas-confirm title="删除合同" :smallTitle="textDelContract" :isShow.sync="confirmDelContract" @enSure="onDelContract"/>
    </div>
    <div style="text-align:left;">
      <sas-confirm title="我要退回" smallTitle="退回后你将无法再看到该份合同，你确定要退回吗？" :isShow.sync="confirmSendBack" @enSure="contractSendBack(contractmodels.id)"/>
    </div>
    <div style="text-align:left;">
      <sas-confirm title="撤回要约" smallTitle="合同撤回后，对方将无法签署，你确定要撤回吗？" :isShow.sync="showrevocation" @enSure="contractRevocation(contractmodels.id)"/>
    </div>
    <sas-confirm title="提示：你正在进行合同撤销签名操作，请仔细确认。" :isShow.sync="confirmToCancelSign" @enSure="onCancelSign"/>

  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import dialoglawcheck from '~/components/dialog/dialog-lawcheck'
  import dialogauth from '~/components/dialog/dialog-view-authdiv'
  import dialogremind from '~/components/dialog/dialog-remind'
  import dialogPurchase from '~/components/dialog/dialog-purchase'
  import dialogWatchList from '~/components/dialog/dialog-watchlist'
  import dialogNoSignet from '~/components/dialog/dialog-no-signet'
  import contractMixins from '~/mixins/contract-mixins'
  import utilsMixins from '~/mixins/utils'
  export default {
    mixins: [contractMixins, utilsMixins],
    data () {
      return {
        visible: this.show,
        moldesvalue: this.contractmodels,
        flagval: this.flag,
        titlesval: this.title,
        showLawer: false,
        cansign: false,
        showLowyerOder:false,
        taskModal:false,
        showremind:false,
        confirmSendBack:false,
        showrevocation:false,
      }
    },
    props: {
      flag: [Boolean, Number],
      contractmodels: [Object, String],
      title: String,
    },
    computed:{
      ...mapState({
        user: state => state.user,
      }),
      examine(){
        return this.moldesvalue.rowsStatus == 0 || this.moldesvalue.rowsStatus == 1 || this.moldesvalue.rowsStatus == 2 || this.moldesvalue.rowsStatus == 3 || this.moldesvalue.rowsStatus == 4;
      },

      showEditBtn(){
        // return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus ==0 && this.moldesvalue.createType == 0) ||
        //   (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1);

        return this.moldesvalue.rowsStatus  == 0 && (
          (this.moldesvalue.colsStatus ==0 && this.moldesvalue.createType == 0)
          ||
          (this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId==1 && this.moldesvalue.createType == 0)
        );
      },
      lawyercheck(){
        // return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 0 && this.flagval !== 2) ||
        //   (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1);
        return this.moldesvalue.rowsStatus == 0 && (
          (this.moldesvalue.colsStatus == 0 && this.moldesvalue.createType == 0 && this.flag != 2)
          ||
          (this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1 && this.moldesvalue.createType ==0)
        );
      },
      send(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 0) ||
          (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1) ||
          (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 4) ||
          (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus == 32) ||
          (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus == 33 && this.moldesvalue.roleId == 1 && this.moldesvalue.gmtModify != -1);
      },
      sign(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 0) ||
          (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1) ||
          (this.moldesvalue.rowsStatus == 2 &&  this.moldesvalue.roleId != 1);
      },
      cancelviewer(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 2 && this.moldesvalue.roleId == 1) ||
          (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus == 33 && this.moldesvalue.roleId == 1 && this.moldesvalue.gmtModify != -1);
      },
      netstop(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 3 && this.moldesvalue.roleId == 1);
      },
      revokesign(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.colsStatus == 4 );
      },
      remove(){
        return (this.moldesvalue.rowsStatus == 0 && this.moldesvalue.roleId == 1 && this.moldesvalue.colsStatus != 3) ||
              (this.moldesvalue.rowsStatus == 3 && (this.moldesvalue.roleId == 1 || this.moldesvalue.colsStatus != 33)) ||
              (this.moldesvalue.rowsStatus == 4 && (this.moldesvalue.roleId == 1 || this.moldesvalue.colsStatus != 33));
      },
      withdraw(){
        return (this.moldesvalue.rowsStatus == 1 && this.moldesvalue.roleId == 1);
      },
      sendback(){
        return (this.moldesvalue.rowsStatus == 2 && this.moldesvalue.roleId != 1);
      },
      copyparter(){
        return (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus < 32 && this.moldesvalue.createType == 0) ||
                (this.moldesvalue.rowsStatus == 4 && (this.moldesvalue.roleId == 1 || this.moldesvalue.colsStatus != 33) && this.moldesvalue.createType == 0);
      },
      replisomepdf(){
        return (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus < 32 && this.moldesvalue.createType != 0) ||
                (this.moldesvalue.rowsStatus == 4 && (this.moldesvalue.roleId == 1 || this.moldesvalue.colsStatus != 33) && this.moldesvalue.createType != 0);
      },
      settingalert(){
        /*return (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus == 32) ||
                (this.moldesvalue.rowsStatus == 3 && this.moldesvalue.colsStatus == 32 && this.moldesvalue.roleId == 1);*/
        return this.moldesvalue.rowsStatus == 3 &&
          (
            this.moldesvalue.colsStatus == 32
            ||
            (this.moldesvalue.colsStatus == 33 && this.moldesvalue.roleId == 1)
          );
      },
    },
    mounted () {
     // console.log(this.moldesvalue);
    },
    watch: {
      contractmodels(val, old){
        this.moldesvalue = val;
      },
      flag(val, old){
        this.flagval = val;
      },
      title(val, old){
        this.titlesval = val;
      }
    },
    methods: {
      viewOpen(){
        let routeDate;

        if (this.flagval == 1) {
          routeDate = this.$router.resolve({ name: 'manage-contract-contract-view', query:{ pid: this.contractmodels.id, cid: this.contractmodels.contractId } });
        }
        if (this.flagval == 2) {
          routeDate = this.$router.resolve({ name: 'manage-contract-contract-view-image', query:{ pid: this.contractmodels.id, cid: this.contractmodels.contractId } });
        }
        if (this.flagval == 3) {
           routeDate = this.$router.resolve({ name: 'manage-contract-contract-postil', query:{ pid: this.contractmodels.id, cid: this.contractmodels.contractId } });
        }

        window.open(routeDate.href, '_blank');
      },
      lawyerSrv(){
        this.showLawer = true;
      },
      /*
      描述: 签署合同事件
      */
      async onSignContract(pid, cid, roleId){
        let newPage = window.open('about:blank');
        const loading = this.$createLoading();
        const certstatus = await this.$axios.get(apis.getCertStatus).then((res)=>res.data).catch(err=>{
          this.$createMessage({
            type:'error',
            duration:2000,
            spinnerText:"网络异常，请重新尝试!"
          });
          newPage.close();
        });//获取认证信息

        if(certstatus.code == 200){
          if(certstatus.data == 'unCerted'){//未实名认证
            newPage.close();
            this.confirmToCert = true;
            loading.close();
          }else{//已实名认证
            const NumIsNotFull = await this.$axios.get(apis.checkContractNumIsNotFull, {
              params: {
                contractId: cid
              }
            }).then((res)=>res.data);//获取剩余签署份数

            if(NumIsNotFull.code !== 200){//剩余签署份数不够，弹窗购买套餐弹窗
              newPage.close();
              this.purchaseDialogVisible = true;
              loading.close();
            }else{
              const s = await this.$axios.get(apis.n_query, {
                params: {
                  pageNo: 1,
                  limit: 3
                }
              }).then((res)=>res.data); // 读取我的印章列表

              const a = await this.$axios.post(apis.authorizedSignList, {
                pageNo: 1,
                limit: 3
              }).then((res)=>res.data); // 读取授权的印章列表

              if(!s.data.rows.length && !a.data.rows.length) { //校验是否已有签名印章
                newPage.close();
                this.visibleDialogNoSignet = true;
                loading.close();
              } else {
                const pageFlag = await this.$axios.get(apis.l_pageFlag,{
                  params:{
                    pid: pid
                  }
                }).then((res)=>res.data);//根据状态跳转合同链接
                if(pageFlag.success){

                  let contract = pageFlag.data.cid;
                  if(roleId == 1){//合同创建者
                    const g = await this.genContractImages(pid).then((data)=>data);
                    if (g){
                      loading.close();
                      newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-sign?pid=${pid}&cid=${contract}`;
                      // open(`${this.__getRouterBase()}/manage/contract/contract-sign?pid=${pid}&cid=${contract}`);
                    }else{
                      newPage.close();
                      loading.close();
                      this.$createMessage({
                        type:'error',
                        duration:2000,
                        spinnerText:"合同加密失败,请重新尝试"
                      });
                    }
                  }else{//合同参与方
                    loading.close();
                    newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-sign?pid=${pid}&cid=${cid}`;
                    // open(`${this.__getRouterBase()}/manage/contract/contract-sign?pid=${pid}&cid=${cid}`);
                  }
                } else {
                  newPage.close();
                  loading.close();
                  this.$createMessage({
                    type:'error',
                    duration:2000,
                    spinnerText: pageFlag.msg
                  });
                  
                }
              }
            }
          }

        } else {
          newPage.close();
        }
      },
      /*
      描述：生成合同图片
      pid:
      返回值：
        成功：true
        失败：false
      */
      async genContractImages(pid) {
        const r = await this.$axios.post(apis.genContractImage, {
          pid: pid,
        }).then((data)=>data.data);
        if(r.code == 200) {
          return true;
        } else {
          return false;
        }
      },
      /*
      描述：取消查看方事件
      */
      onCancelView(){
        this.doCancelView(this.contractmodels.title);
      },
      toMakeAnEndTheLawyerOrder(){
        this.showLowyerOder = true;
      },
      /*
        描述：终止服务事件
       */
      lawyerEnd(){
        this.$axios.post(apis.toMakeAnEndTheLawyerOrder,{
            pid: this.contractmodels.id
        }).then((res) => {
          if (res.data.success) {
            this.$createMessage({
              type:'success',
              duration:2000,
              spinnerText:"操作成功"
            })
            window.location.reload();
          } else {
            this.$createMessage({
              type:'error',
              duration:2000,
              spinnerText: result.msg
            })
          }
        })
      },
      /*
      描述：撤销签名事件
      */
      onConfirmCancelSign(){
        this.doConfirmCancelSign();
      },
      /*
      描述：撤销签名执行
      */
      onCancelSign() {
        this.doCancelSign('contract-messages', this.contractmodels.id, this.contractmodels.contractId);
      },
      /*
      描述：
        打开删除合同二次确认框
      */
      onConfirmDel(){
        this.doConfirmDel(this.contractmodels.colsStatus);

      },
      /*
      描述：
        删除合同执行
      */
      onDelContract() {
        this.doDelContract(this.contractmodels.id, 'contract-messages');
      },
      contractRevocation(pid){
        const self = this;

        self.$axios.post(apis.revocation,{
          pid: pid
        }).then((res) => {
          if (res.data.code == 200) {
            if (res.data.success) {
              self.$message({
                type: 'success',
                message: `已撤回`
              });
            } else { //未实名认证
              self.$message({
                type: 'error',
                message: res.data.msg
              });
            }
            window.location.reload();
          }
        });

      },
      /*
      描述：退回合同 调用contract mixins 与合同图片查看 退回合同调用统一入口处理
      */
      contractSendBack(pid){
        this.onDrawbackContract('contract-messages', pid);
        // const self = this;

        // self.$axios.post(apis.sendBack,{
        //     pid: pid
        // }).then((res) => {
        //   if (res.data.code == 200) {
        //     if (res.data.success) {
        //       self.$message({
        //         type: 'success',
        //         message: `已退回`
        //       });
        //     } else { //未实名认证
        //       self.$message({
        //         type: 'error',
        //         message: res.data.msg
        //       });
        //     }
        //     window.location.reload();
        //   }
        // });

      },
      fromParter(pid){
        let newPage = window.open('about:')
        const self = this;
        self.$axios.get(apis.l_fromParter,{
          params:{
            pid: pid
          }
        }).then((res) => {
          let pid = res.data.data.pid;
          newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-edit?pid=${pid}`;
          // open(`${this.__getRouterBase()}/manage/contract/contract-edit?pid=${pid}`, '_blank');
        }).catch((err)=>{
          newPage.close();
          self.$message({
            type: 'error',
            message: err
          });
        });
      },
      copyPdf(pid){
        let newPage = window.open('about:')
        const self = this;
        self.$axios.get(apis.l_fromParterPdf,{
          params:{
            pid: pid
          }
        }).then((res) => {
          let cid = res.data.data.cid;
          let pid = res.data.data.pid;
          newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${pid}&cid=${cid}`;
          // open(`${this.__getRouterBase()}/manage/contract/contract-edit?pid=${pid}&cid=${cid}`, '_blank');
        }).catch((err)=>{
          newPage.close();
          self.$message({
            type: 'error',
            message: err
          });
        });
      },
      /*
      描述：
        设置提醒事件
      */
      onSetAlarm(){
        this.alramDialogVisible = true;
      },
      refreshTaskModalData(contractId){

        this.showremind = true;

      },
      deleteMsgTask(id){
        var contractId = $("#contractId").attr("value");
        const self = this;
        self.$axios.post(apis.msgtaskdelete,{
            id: id
        }).then((res) => {
          if (res.data.code == 200) {
            self.refreshTaskModalData(contractId);
          } else {
            self.$message({
              type: 'error',
              message: '消息提醒删除失败,请重新删除'
            });
          }
        });
      }
    },
    components: {
      'sas-dialog-check': dialoglawcheck,
      'sas-dialog-auth': dialogauth,
      'sas-dialog-alarm': dialogremind,
      'sas-dialog-purchase': dialogPurchase,
      'sas-dialog-watchlist': dialogWatchList,
      'sas-dialog-no-signet': dialogNoSignet
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .conbutton{
    color: rgb(51, 51, 51);
    padding: 12px 20px;
    background-color: #fff;
    border:1px dashed rgb(217, 217, 217);
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    text-decoration:none;
    margin-left: 10px;
  }
  .endservce{
    padding: 0px 50px;
    display: block;
    text-align: left;
    .FBI-warning{
      width: 25px;
      line-height: 25px;
      background: #ffc600;
      border-radius: 50px;
      color: #fff;
      display: inline-block;
      font-size: 16px;
      text-align: center;
  }
  }

  .lawer-dialog{
    .content{
      .box{
        .process{
          padding: 25px 0;
          border-bottom: 1px solid #f1f1f1;
          background-color: #f9fafd;
          text-align: center;
          img{
            width: 90%;
            padding-left: 48px;
            padding-right: 48px;
          }
        }
        .title{
          padding: 20px 0;
          font-size: 16px;
          .small{
            color: #afafaf;
            font-size: 12px;
          }
        }
        .action-panel{
          padding-bottom: 30px;
          .lawyer-pad{
            padding: 0 20px;
            .lawyer-service-box{
              border: 1px solid #dbe1ee;
              padding: 20px 20px 30px;
              background-color: #f5f7fb;
              .action-title{

              }
              .subtitle{
                font-size: 12px;
                color: #a8a8a8;
              }
              .img{
                margin-top: 20px;
                .purchase{
                  border: 1px solid #b9c5dd;
                  background-color: #fff;
                  color: #a8a8a8;
                  padding: 8px 15px;
                  border-radius: 4px;
                  width: 86px;
                  height: 32px;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

