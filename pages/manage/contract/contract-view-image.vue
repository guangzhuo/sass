<template>
  <div class="contract-view-image">
    <div class="inner-box" v-show="!showError">
      <div class="btns" v-if="!error" :style="{transform: `translateX(-${scrollLeft}px)`}">
        <ul class="edit-handle clearfix">
          <li class="item add icon-li" @click="onOpenFiles" v-if="showAddAttachmentBtn" @mouseover="activeToolsBtn = 'add'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'add' ? 'icon-contract-addfile-active' : 'icon-contract-addfile']"></i>
            添加附件
            <input type="file" name="" ref="add-files" style="display:none;" :accept="attachmentAccept" :multiple="attachmentMutiple" @change="onOpenAttachmentDialog">
          </li>
          <li  class="item sign icon-li" @click="onSignContract" v-if="showSignBtn" @mouseover="activeToolsBtn = 'sign'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'sign' ? 'icon-btn-sign-b' : 'icon-btn-sign-g']"></i>
            签署
          </li>
          <li class="item send icon-li" @click="onSendContract" v-if="showSendBtn" @mouseover="activeToolsBtn = 'send'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'send' ? 'icon-btn-send-b' : 'icon-btn-send-g']"></i>
            发送
          </li>
          <li class="item send icon-li" @click="onConfirmCancelSign" v-if="showCancelSignBtn" @mouseover="activeToolsBtn = 'cancelSign'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'cancelSign' ? 'icon-contract-cancel-sign-active' : 'icon-contract-cancel-sign']"></i>
            撤销签名
          </li>
          <li class="item icon-li" @click="onSetAlarm" v-if="showAlarmBtn" @mouseover="activeToolsBtn = 'setAlarm'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'setAlarm' ? 'icon-cantract-set-alarm-active' : 'icon-cantract-set-alarm']"></i>
            设置提醒
          </li>
          <li class="item icon-li" @click="onCancelView" v-if="showCancelViewBtn" @mouseover="activeToolsBtn = 'cancelWatch'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'cancelWatch' ? 'icon-contract-cancel-watch-active' : 'icon-contract-cancel-watch']"></i>
            取消查看方
          </li>
          <li class="item icon-li" @click="onDownLoadContract" v-if="showDownLoadContractBtn" @mouseover="activeToolsBtn = 'download'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'download' ? 'icon-contract-download-active' : 'icon-contract-download']"></i>
            下载合同
          </li>
          <li class="item icon-li" @click="onConfrimRecall" v-if="showRecallBtn" @mouseover="activeToolsBtn = 'recall'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'recall' ? 'icon-contract-recall-active' : 'icon-contract-recall']"></i>
            撤回
          </li>
          <li class="item icon-li" @click="onConfrimDrawback" v-if="showDrawbackBtn" @mouseover="activeToolsBtn = 'drawback'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'drawback' ? 'icon-contract-drawback-active' : 'icon-contract-drawback']"></i>
            退回
          </li>
          <li class="item icon-li" @click="onConfirmDel" v-if="showDelBtn" @mouseover="activeToolsBtn = 'del'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'del' ? 'icon-contract-del-active' : 'icon-contract-del']"></i>
            删除
          </li>
          <li class="item icon-li" @click="onCopyContract" v-if="showCopyBtn" @mouseover="activeToolsBtn = 'copy'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'copy' ? 'icon-contract-copy-active' : 'icon-contract-copy']"></i>
            复制合同
          </li>
        </ul>
      </div>
      <div class="view-image" v-if="!error">
        <div class="view-inner">
          <header>
            <div class="title" :title="contractData.title" v-text="contractData.title"></div>
          </header>
          <div class="image-box" v-for="item in imgList">
            <img :src="item.src">
          </div>
          <div class="image-box" v-for="item in signInfoList">
            <img :src="item.src">
          </div>
          <div class="sign-name-box" v-for="(item, index) in contractSignList">
            <canvas v-if="(item.userType == 1 && item.sealType == 1) || (item.userType == 2 && item.sealType == 1)" :id="`seal${index}`" width="200" height="130" :value="item.userName" :style="`position:absolute;left: ${item.left}px;top: ${item.top}px;`"></canvas>      
            <canvas v-if="(item.userType == 1 && item.sealType == 0) || (item.userType == 2 && item.sealType == 0)" :id="`seal${index}`" width="200" height="240" :value="item.userName" :style="`position:absolute;left: ${item.left}px;top: ${item.top - 65}px;`"></canvas>    
          </div>
        </div>
      </div>
      <div class="error" v-if="error">
        <div class="error-box">
          <div>合同内容为空！请重新加载。。。</div>
        </div>
      </div>
      <sas-attachment-view :file-list="contractData.fileList" class="attachment"  @after-view="toAttachmentView" @after-del="onDelAttachment" :allow-del="showAddAttachmentBtn"/>
      <sas-dialog-attachment :show.sync="attachmentDialogVisible" :files.sync="attachmentFile" :postUrl="postUrl" :alreadyUploadFilesCount="contractData.fileList.length"/>
      <sas-confirm title="你还未实名认证，请前往认证." :isShow.sync="confirmToCert" @enSure="toCert"/>
      <sas-confirm title="提示" smallTitle="你正在进行合同撤销签名操作，请仔细确认。" :isShow.sync="confirmToCancelSign" @enSure="onCancelSign"/>
      <sas-confirm title="删除合同" :smallTitle="textDelContract" :isShow.sync="confirmDelContract" @enSure="onDelContract"/>
      <sas-confirm title="撤回邀约" smallTitle="合同撤回后，对方将无法签署，你确定要撤回吗？" :isShow.sync="confirmRecallContract" @enSure="onRevocationContract"/>
      <sas-confirm  title="我要退回" smallTitle="退回后你将无法再看到该份合同，你确定要退回吗？" :isShow.sync="confirmDrawbackContract" @enSure="onDrawbackContract('view-image', pid)"/>
      <sas-dialog-purchase :show.sync="purchaseDialogVisible" />
      <sas-dialog-alarm :show.sync="alramDialogVisible" :cid="cid" />
      <!-- <sas-dialog-addalarm :show.sync="dialogAddAlarmVisiable"/> -->
      <sas-dialog-watchlist :show.sync="watchlistDialogVisible" :pid="pid" :title="watchListDialogTitle"/>
      <sas-dialog-add-fail :show.sync="dialogAddFailVisiable"/>
      <sas-dialog-no-signet :show.sync="visibleDialogNoSignet" />
    </div>
    <div class="error-wraper" v-show="showError">抱歉，你无权进行这项操作！</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import apis from '~/config/api'
import attachmentView from '~/components/contract/attachment/attachment-view'
import dialogAttahment from '~/components/dialog/dialog-attachment'
import dialogPurchase from '~/components/dialog/dialog-purchase'
import dialogAlarm from '~/components/dialog/dialog-remind'
import dialogWatchList from '~/components/dialog/dialog-watchlist'
import contractMixin from '~/mixins/contract-mixins'
import utils from '~/mixins/utils'
import mime from '~/mixins/mime'
import dialogFileFail from '~/components/dialog/dialog-attachment-fail'
import dialogNoSignet from '~/components/dialog/dialog-no-signet'
export default {
  name: 'contract-view-image',
  metaInfo: {
    title: '合同查看-云合同'
  },
  // loading: (context)=>{
  //   return context.$createLoading({
  //     spinnerText: '正在读取数据，请稍等'
  //   });
  // },
  layout: 'contract',
  mixins: [contractMixin, utils],
  data () {
    return {
      scrollLeft: 0,
      cid: this.$route.query.cid || '',
      pid: this.$route.query.pid || '',
      activeToolsBtn: '', //当前操作按钮名称
      attachmentAccept: mime.contractAttachment,
      attachmentMutiple: true, //添加附件客服多选
      dialogAddFailVisiable: false, //添加附件文件类型错误弹窗
    }
  },
  async fetchData (to, context) {
    let self = context;
    let [pid = '', cid = ''] = [to.query.pid, to.query.cid];
    if(!!(pid && cid)) {
      const r = await self.$axios.get(apis.getContract1, { //获取合同基本信息
        params:{
          pid: pid
        }
      }).then((data)=> data.data);

      const p = await self.$axios.get(apis.getContractPageSize, { //获取PPDF合同pagesize
        params:{
          cid: cid
        }
      }).then((data)=> data.data);

      const sl = await self.$axios.get(apis.getContractSign, {params: {cid: cid}}).then((data)=>data.data);
      if(sl.code == 200) {
        let tempList = [];
        _.forEach(sl.data, (value, index)=> {
          tempList.push({
            id: `seal${index}`,
            left: value.left - 100, //图片中心点定位
            top: value.top - 5, //图片中心点定位, 5=55-50;有以前的图片中心 - 合同标题高度
            signStr: value.signStr, 
            userType: value.userType,
            userName: value.userName,
            signDate: value.signDate,
            sealType: value.sealType
          });
        });
        self.$store.state.Contract.ContractViewImage.contractSignList = tempList;
      }
      if(r.code == 200) {
        // debugger
        self.$store.state.Contract.ContractViewImage.contractData = r.data;
        if(r.data.parter.rowsStatus == 3 && r.data.parter.colsStatus == 32) {
          const s = await self.$axios.get(apis.getSignInfoPageSize, {params: {cid: cid}}).then((data)=>data.data);
          self.$store.state.Contract.ContractViewImage.signInfoPageSize = s;
        }
      } else {
        self.$store.state.Contract.ContractViewImage.showError = true;
      }
      self.$store.state.Contract.ContractViewImage.contractPageSize = p;
    } else {
      Promise.resolve();
    }
    
  },
  computed: {
    ...mapState({
      user: state => state.user,
      contractData: (state) => {
        return {
          title: state.Contract.ContractViewImage.contractData.contract.title,
          cid: state.Contract.ContractViewImage.contractData.contract.id,
          roleId: state.Contract.ContractViewImage.contractData.parter.roleId,
          rowsStatus: state.Contract.ContractViewImage.contractData.parter.rowsStatus,
          colsStatus: state.Contract.ContractViewImage.contractData.parter.colsStatus,
          fileList: state.Contract.ContractViewImage.contractData.fileList,
          parterType: state.Contract.ContractViewImage.contractData.parter.createType
        };
      },
      contractPageSize: state => state.Contract.ContractViewImage.contractPageSize,
      signInfoPageSize: state => state.Contract.ContractViewImage.signInfoPageSize,
      contractSignList: state => state.Contract.ContractViewImage.contractSignList,
      showError: state => state.Contract.ContractViewImage.showError
    }),
    showAddAttachmentBtn() { //添加附件 起草中 && 可编辑
      return this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.colsStatus == this.colsStatusEnum.editable;
    },
    showSignBtn() { //签署 需要我签名 || (起草中 && (可编辑 || （查看中 && 合同创建者）)
      return (this.contractData.rowsStatus == this.rowStatusEnum.tobesign) || (this.contractData.rowsStatus == this.rowStatusEnum.indraft && (this.contractData.colsStatus == this.colsStatusEnum.editable || (this.contractData.colsStatus == this.colsStatusEnum.watching && this.contractData.roleId == this.roleIdEnum.creater)));
    },
    showSendBtn() { //发送 (起草中 && (可编辑 || (查看中 && 合同创建者) || 待发送)) || (已完成 && (签署完成 || (查看中 && 合同创建者)))
      return (this.contractData.rowsStatus == this.rowStatusEnum.indraft && (this.contractData.colsStatus == this.colsStatusEnum.editable || (this.contractData.colsStatus == this.colsStatusEnum.watching && this.contractData.roleId == this.roleIdEnum.creater) || this.contractData.colsStatus == this.colsStatusEnum.tobesend)) || (this.contractData.rowsStatus == this.rowStatusEnum.completed && (this.contractData.colsStatus == this.colsStatusEnum.signed || (this.contractData.colsStatus == this.colsStatusEnum.watching1 && this.contractData.roleId == this.roleIdEnum.creater)));
    },
    showDelBtn() { //删除 (起草中 && (！律师审查中 && 合同创建者))  ||  (要我签名 && (！查看中 || 合同创建者))  ||  ((>要我签名 && !签署完成) && (！查看中 && >已完成))
      return (this.contractData.rowsStatus == this.rowStatusEnum.indraft && (this.contractData.colsStatus != this.colsStatusEnum.checking && this.contractData.roleId == this.roleIdEnum.creater))
        ||
        (this.contractData.rowsStatus == this.rowStatusEnum.completed && (this.contractData.colsStatus != this.colsStatusEnum.watching1 || this.contractData.roleId == this.roleIdEnum.creater))
        ||
        (this.contractData.rowsStatus > this.rowStatusEnum.tobesign && this.contractData.colsStatus != this.colsStatusEnum.signed && this.contractData.colsStatus != this.colsStatusEnum.watching1 && this.contractData.rowsStatus > this.rowStatusEnum.completed);
    },
    showAlarmBtn() { //设置提醒 (已完成 && （签署完成 || (查看中 || 合同创建者)))
      return (this.contractData.rowsStatus == this.rowStatusEnum.completed && (this.contractData.colsStatus == this.colsStatusEnum.signed || (this.contractData.colsStatus == this.colsStatusEnum.watching1 && this.contractData.roleId == this.roleIdEnum.creater)));
    },
    showCancelViewBtn() { //取消查看方 (起草中 && 查看中 && 合同创建者)  ||   (已完成 && 查看中 && 合同创建者)
      return (this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.colsStatus == this.colsStatusEnum.watching && this.contractData.roleId == this.roleIdEnum.creater)
        || 
        (this.contractData.rowsStatus == this.rowStatusEnum.completed && this.contractData.colsStatus == this.colsStatusEnum.watching1 && this.contractData.roleId == this.roleIdEnum.creater);
    },
    showDownLoadContractBtn() {//下载合同 (已完成 && （签署完成 || (查看中 || 合同创建者)))
      return (this.contractData.rowsStatus == this.rowStatusEnum.completed && (this.contractData.colsStatus == this.colsStatusEnum.signed || (this.contractData.colsStatus == this.colsStatusEnum.watching1 && this.contractData.roleId == this.roleIdEnum.creater)));
    },
    showCancelSignBtn() { //撤销签名 (起草中 && 待发送)
      return this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.colsStatus == this.colsStatusEnum.tobesend;
    },
    showRecallBtn() { //撤回 (等待他人签名 && 合同创建者)
      return this.contractData.rowsStatus == this.rowStatusEnum.waitsign && this.contractData.roleId == this.roleIdEnum.creater;
    },
    showDrawbackBtn() { //退回 (要我签名)
      return this.contractData.rowsStatus == this.rowStatusEnum.tobesign;
    },
    showCopyBtn() { //复制合同 >要我签 && !签署完成 && !查看中 && > 已完成
      return this.contractData.rowsStatus > this.rowStatusEnum.tobesign && this.contractData.colsStatus != this.colsStatusEnum.signed && this.contractData.colsStatus != this.colsStatusEnum.watching1 && this.contractData.rowsStatus > this.rowStatusEnum.completed;
    },
    imgList: function() {
      let a = [];
      for(let i = 0; i < this.contractPageSize; i++) {
        a.push({src: `/contract/signContract/getContractImg?pid=${this.$route.query.pid}&cid=${this.$route.query.cid}&page=${i}`});
      }
      return a;
    },
    signInfoList: function() {
      let a = [];
      for(let i = 0; i < this.signInfoPageSize; i++) {
        if(i == 0) {
          a.push({src: `/contract/signContract/getContractImg?cid=${this.$route.query.cid}&page=signinfo`});
        } else {
          a.push({src: `/contract/signContract/getContractImg?cid=${this.$route.query.cid}&page=signinfo_${i}`});
        }
      }
      return a;
    },
    error: function() {
      return !(this.$route.query.pid && this.$route.query.cid);
    }
  },
  filters: {

  },
  watch: {
    contractSignList(newVal, oldVal) {
      if(newVal.length) {
        this.$nextTick(()=> {
          this.drawSignNameCanvas();
        })
        
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      this.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    },
    /*
    描述： 打开添加附件对话框
    参数：
      raw: 选择的文件基本信息
    */
    onOpenAttachmentDialog(raw) {
      let files = _.toArray(raw.currentTarget.files);
      if(files.length > 10 || (this.contractData.fileList.length + files.length) > 10) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'附件总数不超过10个'
        });
        if(this.contractData.fileList.length) {
          files.splice(10 - this.contractData.fileList.length);
        } else {
          files.splice(10);
        }
      }
      if (!this.attachmentMutiple) {
        if (this.attachmentAccept) {
          let index = _.findIndex(this.attachmentAccept.split(','), function(o) {
            return o === files[0].type;
          });
          if (index < 0) {
            this.onDisallow(files);
            return;
          }
        }
      } else {
        if (this.attachmentAccept) {
          let [disallowFlag, totalSpillFlag] = [false, false];
          let totalSize = 0;
          _.forEach(files, (value)=> {
            totalSize += value.size;
            if(value.type) {
              let index = _.findIndex(this.attachmentAccept.split(','), function(o) {
                return o === value.type;
              });
              if (index < 0) {
                disallowFlag = true;
                this.onDisallow(value);
                return false;
              }
            } else { //目前发现docx格式的文件type为空,为解决此问题以下代码
              if (this.attachmentAccept.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                if (value.name.search('.docx') < 0) {
                  disallowFlag = true;
                  this.onDisallow(files);
                  return false;
                }
              }
            }

            if(value.size > 1024*1024*10) { //校验文件大小
              disallowFlag = true;
              this.onSpill();
              return false;
            }
            if(totalSize > 1024*1024*10) {
              totalSpillFlag = true;
              this.onTotalSpill();
              return false;
            }
            
          });
          if (disallowFlag || totalSpillFlag) {
            return;
          }
        }
      }
      this.doOpenAttachmentDialog(files);
    },
    onDisallow() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件格式错误,支持(doc,docx,pdf,xls,xlsx,gif,jpg,jpeg,bmp,png)'
      })
      // this.dialogAddFailVisiable = true;
    },
    onSpill() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件大小超过10M,超过部分未添加'
      });
    },
    onTotalSpill() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText:'附件总大小超过10M,超过部分未添加'
      });
    },
    /*
    描述： 上传附件打开选择文件窗体事件
    */
    onOpenFiles() {
      this.doOpenFiles();
    },
    /*
    描述： 删除附件事件
    */
    async onDelAttachment(fileId) {
      this.doDelAttachment(fileId);
    },
    /*
    描述： 跳转查看附件页面
    */
    toAttachmentView(path) {
      this.doToAttachmentView(path);
    },
    /*
    描述: 签署合同事件
    */
    onSignContract() {
      this.doSignContract(this.contractData.cid, this.pid, 'self');
    },
    /*
    描述: 签署发送事件
    */
    onSendContract() {
      this.doSendContract(this.cid, this.pid);
    },
    /*
    描述：
      打开删除合同二次确认框
    */
    onConfirmDel() {
      this.doConfirmDel(this.contractData.colsStatus);
    },
    /*
    描述：
      执行删除合同
    */
    async onDelContract() {
      this.doDelContract(this.pid, 'view-image');
    },
    /*
    描述：
      设置提醒事件
    */
    onSetAlarm() {
      this.doSetAlarm();
      // this.alramDialogVisible = true;
    },
    /*
    描述：
      下载合同事件
    */
    async onDownLoadContract() {
      let loading = this.$createLoading({
      });
      var signList = new Array();
      $("canvas").map(function () {
          var sign = {};
          var canId = $(this).attr('id');
          var canvas = document.getElementById(canId);
          var left = $(this).css('left');     //这个坐标由数据库查出来后减了100
          var top = $(this).css('top');
          sign.id = canId;
          sign.signStr = canvas.toDataURL("image/png");       //这是前台通过canvas转换过来的跟数据库存的不同
          sign.left = parseFloat(left.substring(0, left.length - 2)) + 100;

          var height = $(this).height();
          if(height == 240) {
              sign.top = parseFloat(top.substring(0, top.length - 2)) + 70;
          }else{
              sign.top = parseFloat(top.substring(0, top.length - 2)) + 5;
          }
          signList.push(sign);
      });
      let newPage = window.open('', '_self');
      const r = await this.$axios.post(apis.isContractExist, {
        cid: this.contractData.cid,
        signListStr: JSON.stringify(signList)
      }).then((data)=>data.data);
      if(r.code == 200) { //打开下载地址
        loading.close();
        newPage.location.href = `/contract/signContract/download?cid=${this.contractData.cid}`;
        // open(`/contract/signContract/download?cid=${this.contractData.cid}`, '_self');
      } else if (r.code == 206) {
        newPage.close();
        loading.close();
      } else {
        newPage.close();
        loading.close();
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '下载失败,请重新下载'
        });
      }
    },
    /*
    描述：取消查看方事件
    */
    onCancelView() {
      this.doCancelView(this.contractData.title);
    },
    /*
    描述：撤销签名事件
    */
    onConfirmCancelSign() {
      this.doConfirmCancelSign();
      // this.confirmToCancelSign = true;
    },
    /*
    描述：撤销签名执行
    */
    async onCancelSign() {
      this.doCancelSign('view-image', this.pid, this.contractData.cid);
    },
    /*
    描述：撤回合同事件,弹窗二次确认框
    */
    onConfrimRecall() {
      this.doConfrimRecall();
    },
    /*
    描述：撤回合同执行
    */
    async onRevocationContract() {
      this.doRevocationContract('view-image', this.pid);
    },
    /*
    描述：退回合同事件
    */
    onConfrimDrawback() {
      this.doConfrimDrawback();
      // this.confirmDrawbackContract = true;
    },
    // /*
    // 描述：退回合同执行
    // */
    // async onDrawbackContract() {
    //   this.onDrawbackContract('view-image', this.pid);
    // },
    /*
    描述：复制合同事件
    */
    onCopyContract() {
      if(this.contractData.parterType == 0) {
        this.doFromParter(this.pid);
      } else {
        this.doCopyPdf();
      }
    },
    /*
    描述: 执行复制pdf合同
    */
    async doCopyPdf() {
      const r = await this.$axios.get(apis.l_fromParterPdf, {params: {pid: this.pid}}).then((data)=>data.data);
      if(r.success) {
        this.$router.replace({path: '/manage/contract/contract-view-image', query: {pid: r.data.pid, cid: r.data.cid}});
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    },
    /*
    描述: 绘制印章
    */
    drawSignNameCanvas() {
       // debugger
      _.forEach(this.contractSignList, (v, i) => {
        // debugger
        if((v.userType == 1 && v.sealType == 1) || (v.userType == 2 && v.sealType == 1)) {
          this.drawPersonalSeal(v.id, v.signDate, v.signStr);
        } else if ((v.userType == 2 && v.sealType == 0) || (v.userType == 1 && v.sealType == 0)) {
          this.drawCompanySeal(v.id, v.userName, v.signDate, v.signStr);
        }
      });
    }
  },
  components: {
    'sas-attachment-view': attachmentView,
    'sas-dialog-attachment': dialogAttahment,
    'sas-dialog-purchase': dialogPurchase,
    'sas-dialog-alarm': dialogAlarm,
    'sas-dialog-watchlist': dialogWatchList,
    'sas-dialog-add-fail': dialogFileFail,
    'sas-dialog-no-signet': dialogNoSignet
  }
}
</script>

<style lang="scss"  scoped >
  @import "~styles/base.scss";
  .contract-view-image{
    @include responsive-default {
      background: #e6ecf5;
      padding: 0 calc(50% - 570px) 0;
      min-height: calc(100vh - 80px);
      .error-wraper{
        text-align: center;
        padding-top: 20px;
      }
      .inner-box{
        width: 902px;
        margin: 0 auto;
        .attachment{
          position: fixed;
          bottom: 30px;
          width: 100%;
          left: 0;
        }
      }
      .btns{
        padding: 25px 0;
        overflow: hidden;
        position: fixed;
        z-index: 1;
        width: 902px;
        background: #e6ecf5;
        .edit-handle{
          margin: 0;
          padding: 0;
          list-style: none;
          float: right;
          .item{
            margin-left: 40px;
            color: #95abd5;
            font-size: 14px;
            position: relative;
            max-width: 200px;
            height: 34px;
            line-height: 60px;
            display: inline-block;
            float: left;
            cursor: pointer;
            .iconsprite{
              position: absolute;
              left: calc(50% - 12px);
              top: -6px;
            }
          }
        }
      }
      .view-image{
        padding-top: 85px;
        padding-bottom: 56px;
        .view-inner{
          position: relative;
        }
        .title{
          color: #313131;
          background: #fff;
          // width: 900px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          box-shadow: 0 2px 5px #ebebeb;
          border: none;
          text-indent: 30px;
          position: relative;
          border: 1px solid #D5D5D5;
          border-bottom: none;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .image-box {
          height: 1275px;
          border-bottom: 1px dashed #000;
          text-align: center;
          border-right: 1px solid #D5D5D5;
          border-left: 1px solid #D5D5D5;
        }
      }
      .error-box{
        border: 1px solid #D5D5D5;
        /* margin: 0 auto 60px; */
        width: 902px;
        margin: 0 auto;
        margin-top: 75px;
      }
      
    }
  }

</style>
<style lang="scss">
  .attachment-box{
    .attachment{
      width: 902px;
      margin: 0 auto;
      padding:0!important;
    }
    
  }
</style>
