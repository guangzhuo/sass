<template>
   <div class="editor-contract">
    <section class="row tools">
      <div class="col-xs-4 dialog">
        <sas-button category="primary"  size="small" icon="iconsprite icon-btn-upload1" v-if="showEditBtn" @click="goEditView">编辑</sas-button>
        <sas-button category="primary"  size="small" icon="iconsprite icon-btn-upload1" v-if="modelType === 'edit' || modelType === 'create'" @click="showUpload = true">本地上传</sas-button>
        <sas-button category="primary"  size="small" icon="iconsprite icon-btn-timport" @click="templateVisible = true" v-if="modelType === 'edit' || modelType === 'create'">载入模板</sas-button>
        <sas-button category="primary"  size="small" icon="iconsprite icon-btn-lawerwrite" v-if="modelType === 'edit' || modelType === 'create'" @click="lawerWrite">律师代写</sas-button>
        <sas-button category="primary"  size="small" icon="iconsprite icon-btn-lawerwrite" v-if="showLawerReviewBtn" @click="lawerCheck">律师审查</sas-button>
      </div>
      <div class="row col-xs-8 btns">
        <ul class="edit-handle">
          <li class="item" @click="onSave" v-if="showSaveBtn">
            <sas-button category="primary" size="medium" :disabled="saveDisabled">保存</sas-button>
          </li>
          <li class="item add icon-li" v-if="showAddAttachmentBtn" @click="onOpenFiles" @mouseover="activeToolsBtn = 'addfile'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'addfile' ? 'icon-contract-addfile-active' : 'icon-contract-addfile']"></i>
            添加附件
            <input  type="file" name="" ref="add-files" :accept="attachmentAccept" :multiple="attachmentMutiple" style="display:none;" @change="onOpenAttachmentDialog">
          </li>
          <li  class="item sign icon-li" v-if="showSignBtn" @click="onSignContract" @mouseover="activeToolsBtn = 'sign'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'sign' ? 'icon-btn-sign-b' : 'icon-btn-sign-g']"></i>
            签署
          </li>
          <li  class="item send icon-li" v-if="showSendBtn" @click="onSendContract"  @mouseover="activeToolsBtn = 'send'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'send' ? 'icon-btn-send-b' : 'icon-btn-send-g']"></i>
            发送
          </li>
          <li class="item add icon-li" v-if="showCopyBtn" @click="onCopyContract" @mouseover="activeToolsBtn = 'copy'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'copy' ? 'icon-contract-copy-active' : 'icon-contract-copy']"></i>
            复制合同
          </li>
          <li class="item add icon-li" v-if="showDelBtn" @click="onConfirmDel" @mouseover="activeToolsBtn = 'del'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'del' ? 'icon-contract-del-active' : 'icon-contract-del']"></i>
            删除
          </li>
          <li class="item add icon-li" v-if="showCancelViewBtn" @click="onCancelView" @mouseover="activeToolsBtn = 'cancelWatch'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'cancelWatch' ? 'icon-contract-cancel-watch-active' : 'icon-contract-cancel-watch']"></i>
            取消查看方
          </li>
          <li class="item send" v-if="showSaveAndExitBtn" @click="onExitPostilView">
            <sas-button category="primary"  size="medium"   >保存并退出</sas-button>
          </li>
          <li class="item send icon-li" v-if="showTerminateBtn" @click="onConfrimTerminateService" @mouseover="activeToolsBtn = 'terminate'" @mouseleave="activeToolsBtn = ''">
            <i :class="['iconsprite', activeToolsBtn == 'terminate' ? 'icon-contract-terminate-service-active' : 'icon-contract-terminate-service']"></i>
            终止服务
          </li>
        </ul>
      </div>
    </section>
    <div class="row edit-area">
      <ul  class="row edit-content-ul">
        <li class="sas-float-left sas-height-full first">
          <p class="l-title"><i class="iconsprite icon-contract-menu"></i>目录结构</p>
          <ul  class="l-cursor">
            <li v-for="item in dicMapData" :name="item.key" :class="item.tagName" v-text="item.text" @click="goToView(item.key)"></li>
          </ul>
        </li>
        <li class="sas-float-right sas-height-full second" >
          <header class="sas-position-relative">
            <lvx-input :input-style="inputBorderStyle"  v-if="modelType === 'view' || modelType === 'create' || modelType === 'edit'" :readonly="titleRead" @focus="$v.contractData.title.$touch()" placeholder="请输入合同标题" v-model="contractData.title" @change="onTitleInput()"></lvx-input>
           <!-- <input :input-style="inputBorderStyle"  v-if="modelType === 'view' || modelType === 'create' || modelType === 'edit'" :readonly="titleRead" @focus="$v.contractData.title.$touch()" placeholder="请输入合同标题" v-model="contractData.title" @blur="onTitleInput()" /> -->
            <span v-text="contractData.title" v-if="modelType === 'postil'" class="title-text"></span>
            <div class="postil-span" v-if="modelType === 'postil'">右键添加批注</div>
          </header>
          <div style="height:calc(100% - 40px);">
            <div class="ueditor-body sas-height-full">
              <div class="edit-panel" v-if="modelType === 'edit' || modelType === 'create'">
                <script id="editor" type="text/plain" style="width:823px;"></script>
              </div>
              <div id="editor-rd" class="edit-readonly" v-html="contractHtml" style="width:823px;" v-if="modelType === 'view'">
              </div>
              <div  class="edit-postil" v-if="modelType === 'postil'">
                <script id="editor-postil" type="text/plain" style="width:823px;"></script>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <sas-attachment-view :file-list="contractData.fileList" @after-view="toAttachmentView" @after-del="onDelAttachment" :allow-del="modelType =='edit' ? true : false" class="attachment" />
    <sas-dialog-upload :show.sync="showUpload" />
    <sas-dialog-lawer :show.sync="showLawer" />
    <sas-dialog-lawercheck :show.sync="showLawerCheck" :pid="pid" :contractTitle="contractData.title"/>
    <sas-dialog-template :show.sync="templateVisible" @open="onTemplateOpen"/>
    <sas-dialog-postil :show.sync="postilDialogVisible" @after-ok="onAfterEditPostil" :type="postilDialogType" :content="updatePostilContent"/>
    <sas-dialog-attachment :show.sync="attachmentDialogVisible" :files.sync="attachmentFile" :postUrl="postUrl" :alreadyUploadFilesCount="contractData.fileList.length"/>
    <sas-dialog-purchase :show.sync="purchaseDialogVisible" />
    <sas-dialog-watchlist :show.sync="watchlistDialogVisible" :pid="pid" :title="watchListDialogTitle"/>
    <sas-dialog-add-fail :show.sync="dialogAddFailVisiable"/>
    <sas-dialog-no-signet :show.sync="visibleDialogNoSignet" />
    <div id="postil-pop" class="postil-pop" v-show="postilVisible" @mouseover="postilVisible = true" @mouseleave="postilVisible = false">
      <div class="ptop">
        <span class="puname" v-text="hoverPostil.userName"></span>
        <span class="deleteP" @click="confirmDelPostil = true">删除</span>
        <span class="updateP" @click="openUpdatePostil">修改</span>
        <span class="pdate" v-text="hoverPostil.gmtCreate"></span>
        <div class="arrow-down"></div>
      </div>
      <div class="pCont" v-text="hoverPostil.content"></div>
    </div>
    <sas-confirm title="确定要删除该批注吗？" :isShow.sync="confirmDelPostil" @enSure="delPostil"/>
    <sas-confirm title="你还未实名认证，请前往认证." :isShow.sync="confirmToCert" @enSure="toCert"/>
    <sas-confirm title="删除合同" :smallTitle="textDelContract" :isShow.sync="confirmDelContract" @enSure="onDelContract"/>
    <sas-confirm title="若你执行此操作，律师审查服务将立即终止，并默认你对该服务满意，你确定要执行此操作吗？" :isShow.sync="confirmTerminateService" @enSure="doTerminateService"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import { required, minLength, maxLength,between } from 'vuelidate/lib/validators'
import _ from 'lodash'
import dialogUpload from '~/components/dialog/dialog-upload'
import dialogLawer from '~/components/dialog/dialog-lawer'
import dialogLawerCheck from '~/components/dialog/dialog-lawcheck'
import dialogTemplate from '~/components/dialog/dialog-template'
import dialogPostil from '~/components/dialog/dialog-postil-edit'
import dialogAttahment from '~/components/dialog/dialog-attachment'
import dialogPurchase from '~/components/dialog/dialog-purchase'
import dialogWatchList from '~/components/dialog/dialog-watchlist'
import dialogFileFail from '~/components/dialog/dialog-attachment-fail'
import dialogNoSignet from '~/components/dialog/dialog-no-signet'
import attachmentView from '~/components/contract/attachment/attachment-view'
import contractMixin from '~/mixins/contract-mixins'
import utils from '~/mixins/utils'
import mime from '~/mixins/mime'
let ueContentChangeTimes = 0;
export default {
  data () {
    return {
      titleRead: this.modelType === 'view' ? true : false, //合同标题的只读状态
      showUpload: false, //本地上传弹框可见状态
      showLawer: false, //律师代写弹窗可见状态
      showLawerCheck: false, //律师审查可见状态
      templateVisible: this.isOpenTemplate, //载入模板弹窗可见状态
      postilDialogVisible: false, //批注弹窗可见状态
      dicMapData: [], //合同编辑区域的合同正文目录结构数据[{text:'目录1',key: 'h_1_1',tagName: 'h'}]
      postilVisible: false, //批注popover可见状态
      hoverPostil: {}, //鼠标悬浮的批注信息数据结构{id: '', content: '', userName: '', gmtCreate: ''}
      postilDialogType: '', //批注弹窗的类型：【add || update】可选
      updatePostilContent: '', //鼠标悬浮待修改的批注内容文本
      confirmDelPostil: false, //删除批注的二次确认框可见状态
      attachmentTrigger: false,
      attachmentBtnText: '查看附件',
      ue: null,
      lawerServiceType: '', //律师服务类型 ：write 代写、check 审查
      confirmTerminateService: false, //终止服务二次弹窗
      saveDisabled: false,
      attachmentAccept: mime.contractAttachment,
      inputBorderStyle: {
        borderRadius: '0px'
      },
      attachmentMutiple: true, //添加附件客服多选
      dialogAddFailVisiable: false, //添加附件文件类型错误弹窗
      activeToolsBtn: '', // 正在操作的按钮名称
      contractTitle: this.contractData.title, //合同标题
      visibleDialogNoSignet: false, //是否显示创建签名弹窗
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    showEditBtn() { //编辑按钮显示权限
      return (this.modelType === 'view' && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && (this.contractData.colsStatus == this.colsStatusEnum.editable || this.contractData.colsStatus == this.colsStatusEnum.watching)));
    },
    showLawerReviewBtn() {//律师审查
      return (this.modelType === 'view' && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && (this.contractData.colsStatus == this.colsStatusEnum.editable || this.contractData.colsStatus == this.colsStatusEnum.watching)));
    },
    showSaveBtn() {
      return this.modelType === 'edit' || this.modelType === 'create';
    },
    showAddAttachmentBtn() {
      return this.modelType === 'edit';
    },
    showDelBtn() {
      return this.modelType === 'view' && 
        (
          (this.contractData.rowsStatus == 0 && this.contractData.roleId == 1 && this.contractData.colsStatus != this.colsStatusEnum.checking) 
          || 
          (this.contractData.rowsStatus > this.rowStatusEnum.tobesign)
        );
    },
    showSignBtn() {
      return (this.modelType === 'create' || this.modelType === 'edit') || ((this.modelType === 'view') && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && (this.contractData.colsStatus == this.colsStatusEnum.editable || this.contractData.colsStatus == this.colsStatusEnum.watching)));
    },
    showSendBtn() {
      return (this.modelType === 'create' || this.modelType === 'edit') || ((this.modelType === 'view') && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && (this.contractData.colsStatus == this.colsStatusEnum.editable || this.contractData.colsStatus == this.colsStatusEnum.watching)));
    },
    showSaveAndExitBtn() {
      return this.modelType === 'postil';
    },
    showTerminateBtn() { //终止服务
      return (this.modelType === 'view' && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && this.contractData.colsStatus == this.colsStatusEnum.checking));
    },
    showCancelViewBtn() {
      return (this.modelType === 'view' && ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && this.contractData.colsStatus == this.colsStatusEnum.watching));
      // return this.modelType === 'view' && this.cancelViewVisiable;
    },
    showCopyBtn() { //复制合同 >要我签名
      return (this.modelType == 'view' && (this.contractData.rowsStatus > this.rowStatusEnum.tobesign));
    }
  },
  validations: {
    contractData: {
      title: {
        required,
        maxLength: maxLength(10)
      }
    }
  },
  props: {
    postilData: { //批注列表数据
      type: Array,
      default: ()=>{
        return [];
      }
    },
    contractData: {
      type: Object,
      default: {}
    }, /*合同信息基础数据，结构为
    {title: '合同标题',
    cid:'合同唯一id',
    cgmt: '',
    roleId: '合同所属者角色' (值与计算属性rowIdEnum对应)
    rowsStatus: '合同大状态'(rowStatusEnum)
    colsStatus:'合同小状态' (值与计算属性colsStatusEnum对应)}
    fileList: [{fileId: '', fileName: '', fileShowName: ''}]附件数据*/
    contractHtml: String, //合同正文内容富文本
    modelType: { //edit：合同编辑 | view：合同查看 | create:合同创建 | postil: 合同批注
      type: String,
      required: true
    },
    isOpenTemplate: { //是否默认打开载入模板弹窗
      type: Boolean,
      default: false
    },
    pid: [String, Number]
  },
  mounted () {
    this.validateProps();
    this.init();
  },
  destroyed() {
    // debugger
    if(this.ue) {
      this.ue.destroy();
    }
  },
  watch: {
    contractHtml(newVal, oldVal) {
      // console.log('change html')
      // debugger
      if (this.modelType === 'create' || this.modelType === 'edit') {
        this.ue.addListener("ready", ()=>{
          // debugger
          this.ue.setContent(newVal);
          this.createDicMap(this.ue.body);
        });
        // debugger
        this.ue.setContent(newVal);
        this.createDicMap(this.ue.body);
      } else if (this.modelType === 'view') {
        setTimeout(()=>{
          this.createDicMap(document.getElementById('editor-rd'));
          $("#editor-rd").find('a').removeAttr("href");
        }, 0);
      } else if (this.modelType === 'postil') {
        this.ue.addListener("ready", ()=>{
          this.ue.setContent(newVal);
          this.createDicMap(this.ue.body);
        });
        this.ue.setContent(newVal);
        this.createDicMap(this.ue.body);
        setTimeout(()=>{
          this.initPostilEditorEvent();
        }, 0);
      }
    },
    postilData(newVal, oldVal) {
      switch(this.modelType) {
        case 'view':
          this.initPostil(document.getElementById('editor-rd'));
        break;
        case 'postil':
          this.initPostil(this.ue.body);
        break;
      }

    }
  },
  mixins: [contractMixin, utils],
  methods: {
    /*
    描述： 校验传入的props合法性
    */
    validateProps() {
      if(this.modelType !== 'edit' && this.modelType !== 'view'  && this.modelType !== 'create' && this.modelType !== 'postil') {
        throw new Error("model-type must be edit or view");
      }
    },
    /*
    描述: 初始化 editor 数据、样式
    */
    init() {
      switch(this.modelType) {
        case 'edit':
        case 'create':
          this.ue = UE.getEditor('editor');
          // ueditorExtend($)
          this.initUEditorStyle()
          this.addEditorChangeListeren(()=>{

            ueContentChangeTimes++;
          });
          return;
        case 'view':
          break;
        case 'postil':
          this.ue = UE.getEditor('editor-postil',
            {allowDivTransToP: false,
            toolbars: [],
            contextMenu: [{
              label:'&emsp;<--- 在此处添加批注',
              cmdName:'cleardoc',
              exec: ()=> {
                this.openAddPostil();
              }
            }],
            initialStyle: ['sup{color: #fa0202;font-weight: bold;display: none;-moz-user-select:-moz-none;-moz-user-select:none;-o-user-select:none;-khtml-user-select:none;-webkit-touch-callout: none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}']
          });
          this.initUEditorStyle();
          break;
      }

    },
    destroy() {

    },
     /*
    描述: 初始化 editor 样式
    */
    initUEditorStyle() {
      this.ue.addListener("ready", ()=>{
        $(this.ue.body).css({"padding":"16px 34px","word-break":"break-all","word-wrap":"break-word"});
        $("#edui1_bottombar").hide();
      });
    },
    /*
    描述: 初始化 editor 添加批注的事件 样式
    */
    initPostilEditorEvent() {
      $(this.ue.body).keydown((event)=>{
        switch (event.keyCode) {
          case 17: break;
          case 33: break;
          case 34: break;
          case 35: break;
          case 36: break;
          case 37: break;
          case 38: break;
          case 39: break;
          case 40: break;
          case 116: break;
          case 123: break;
          default: {
            this.ue.selection.clearRange();
            return false;
          }
        }
      });
      $(this.ue.body).on("mousedown",(e)=>{
        this.ue.focus();
        if(e.which === 1){//点击左键菜单时，清除选区
          var str = $(e.target).attr("id");
          var Num = parseInt(str);
          if (isNaN(Num)){
            this.ue.selection.clearRange();
          }else {
            return false;
          }
        }
        if(e.which === 3){//点击右键菜单时，清除选区
          var STR = $(e.target).attr("id");
          var num = parseInt(STR);
          if (isNaN(num)){
            this.ue.selection.clearRange();
            this.ue.selection.getRange().collapse();
          }
        }
      });
    },
     /*
    描述: 初始化 所有批注信息并处理相应事件
    */
    initPostil(sourceDom) {
      // debugger
      let self = this;
      if(this.postilData.length) {
        setTimeout(()=>{
          let supNodes = $(sourceDom).find('sup');
          supNodes.css({
            "display": 'inline',
            "color": 'rgb(250, 2, 2)',
            "font-weight": 'bold',
            "cursor": 'pointer'
          });
          supNodes.mouseenter((e)=>{

            let postilId = e.currentTarget.getAttribute('id');
            let iframeDom = $('#editor-postil')[0];
            switch(this.modelType) {
              case 'view':
                $('#postil-pop').css({
                  'left': e.clientX - 360,
                  'top': e.clientY -20
                });
                break;
              case 'postil':
                $('#postil-pop').css({
                  'left': e.clientX - 360 + iframeDom.offsetLeft,
                  'top': e.clientY -20 + iframeDom.offsetTop
                });
                break;
            }

            self.postilVisible = true;
            self.hoverPostil = _.find(self.postilData, (o)=>{return (o.id + '') === postilId});
          });
          supNodes.mouseleave((e)=>{
            // console.log('mouseleave');
            setTimeout(()=>{
              if(!$("#postil-pop").is(':hover')){
                self.postilVisible = false;
              }
            }, 300);

          })

        }, 0);
      }
    },
    inputCheck() { //校验合法输入
      if(!this.$v.contractData.title.required) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'合同标题不能为空！'
        })
        return false;
      } else if(!this.ue.getContent().trim()) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'合同内容不能为空！'
        })
        return false;
      } else if(!this.onTitleInput()) {
        return false;
      } else {
        return true;
      }
    },
    /*
    描述： 保存合同
    */
    onSave() {
      const checkIsChanged = ()=> {
        return this.$v.contractData.title.$dirty || ueContentChangeTimes > 1;
      };

      if(this.inputCheck()) { //校验输入通过
        if(!checkIsChanged() && this.modelType == 'edit') { //判断内容是否编辑修改过
          this.$createMessage({
            type:'warning',
            duration:3000,
            spinnerText: "未作修改，无需保存！"
          })
        } else { //保存修改
          const loading = this.$createLoading();
          this.saveDisabled = true;
          this.save(this.pid ? 'update' : 'create') //如果有pid为合同编辑，相反为合同新增
          .then(()=>{
            this.saveDisabled = false;
            loading.close();
          });
        }
      }
    },
    onTitleInput() { //校验标题长度
      // debugger
      if(this.contractData.title.length > 64) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText:'合同标题超出最大长度！'
        })
        return false;
      } else {
        return true;
      }
    },
    /*
    描述： 保存合同接口调用
    参数：
      type: 'create' 为创建合同标识，'update' 为编辑合同标识
    返回值：
      合同信息
    */
    async save(type) {
      switch(type) {
        case 'create':
          const r = await this.$axios.post(apis.saveContract, {
            id: '',
            title: this.contractData.title,
            content: this.ue.getContent(),
            defineNo: '',
            defineTag: ''
          }).then((data)=>data.data);
          if(r.success) {
            this.$emit('after-save', r);
          }
          return r;
          break;
        case 'update':
        // debugger
          const rc = await this.$axios.post(apis.saveContract, {
            id: this.contractData.cid,
            title: this.contractData.title,
            content: this.ue.getContent(),
            defineNo: '',
            defineTag: ''
          }).then((data)=>data.data);
          if(rc.success) {
            this.$createMessage({
              type:'success',
              duration:3000,
              spinnerText:'保存成功'
            })
            this.$v.contractData.title.$reset();
            ueContentChangeTimes = 1;
            this.$emit('after-save', rc);
          }
          return rc;
          break;
      }
    },
    async saveSign(type) {//签署调用的保存
      switch(type) {
        case 'create':
          const r = await this.$axios.post(apis.saveContract, {
            id: '',
            title: this.contractData.title,
            content: this.ue.getContent(),
            defineNo: '',
            defineTag: ''
          }).then((data)=>data.data);
          if(r.success) {

          }
          return r;
          break;
        case 'update':
          const rc = await this.$axios.post(apis.saveContract, {
            id: this.contractData.cid,
            title: this.contractData.title,
            content: this.ue.getContent(),
            defineNo: '',
            defineTag: ''
          }).then((data)=>data.data);
          if(rc.success) {

          }
          return rc;
          break;
      }
    },
    async onTemplateOpen(tid) {
      const loading = this.$createLoading()
      const rt = await this.$axios.get(apis.getTemplateHtml, {
        params: {
          tid: tid
        }
      }).then((data)=> data)
      .catch((error)=> {
        // console.log(error);
      });
      const r = await this.$axios.post(apis.getTemplateTitle, {
        tid: tid
      }).then((data)=> data.data.data)
      .catch((error)=> {
        // console.log(error);
      });
      Promise.all([rt, r])
      .then(()=>{
        loading.close()
        // this.title = r.title;
        let contractData = this.contractData;
        contractData.title = r.title;
        this.$emit('update:contractData.title', contractData);

        this.ue.setContent(rt.data);
        if(rt.status == 200) {
          this.createDicMap(this.ue.body);
        }

      })

    },
    /*
      描述：创建合同导航目录
      参数：
        param1: 合同内容的DOM节点
    */
    createDicMap(sourceDom) {
      let hNodes = $(sourceDom).find('h1,h2,h3,h4,h5,h6');
      if(hNodes.length) {
        hNodes.each((i,v)=>{
          $(v).attr('name', `h_${i}`);
          if(v.innerText.trim()) {
            this.dicMapData.push({
              text: v.innerText,
              key: $(v).attr('name'),
              tagName: v.tagName
            });
          }
        });
      } else {
        this.dicMapData = [];
      }
    },
    goToView(key) {
      // debugger
      switch(this.modelType) {
        case 'create':
        case 'edit':
          $(this.ue.body).find(`[name=${key}]`)[0].scrollIntoView();
          return;
        case 'view':
          $(document.getElementById('editor-rd')).find(`[name=${key}]`)[0].scrollIntoView();
          break;
        case 'postil':
          $(this.ue.body).find(`[name=${key}]`)[0].scrollIntoView();
          break;
      }
    },
    addEditorChangeListeren(cb) {
      this.ue.addListener("contentChange", cb);
    },
    /*
    描述：
      打开删除合同二次确认框
    */
    onConfirmDel() {
      this.doConfirmDel(this.contractData.colsStatus);
    },
    /*
    描述：删除合同事件
    */
    async onDelContract() {
      this.doDelContract(this.pid, 'contract-view');
    },
    goEditView() {
      this.$emit('after-edit');
    },
    openAddPostil() {
      this.postilDialogVisible = true;
      this.postilDialogType = 'add';
    },
    openUpdatePostil() {
      this.postilDialogVisible = true;
      this.postilDialogType = 'update';
      this.updatePostilContent = this.hoverPostil.content;
    },
    onAfterEditPostil(acType, value) {
      switch(acType) {
        case 'add':
          if(value){
            this.ue.execCommand("inserthtml","<sup id='tempP' style='display: none;'>[P]</sup>");
            this.$axios.post(apis.savePostil, {
              cid: this.contractData.cid,
              cgmt: this.contractData.cgmt,
              cContent: this.ue.getContent(),
              pContent: value
            })
            .then((data)=> {
              if(data.data.success) {
                this.$emit('after-save-postil', 'add', data.data.data);
              }
            })
            .catch(function (error) {
            });
          }
          break;
        case 'update':
          this.$axios.post(apis.updatePostil, {
            id: this.hoverPostil.id,
            cid: this.contractData.cid,
            content: value
          })
          .then((data)=> {
            if(data.data.success) {
              this.hoverPostil = data.data.data.postil;
              this.$emit('after-save-postil', 'update', data.data.data);
              // console.log(this.hoverPostil)
            }
          })
          .catch(function (error) {
            // console.log(error);
          });
          break;
      }
    },
    /*
    描述: 删除批注执行
    */
    async delPostil() {
      const r = await this.$axios.post(apis.delPostil, {id: this.hoverPostil.id, cid: this.contractData.cid}).then((data)=>data.data);
      if(r.success) {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'删除成功'
        });
        location.reload();
      }
    },

    /*
    描述： 签署事件
    */
    async onSignContract(){
      switch(this.modelType) {
        case 'create':
        case 'edit':
          this.signContractByEdit();
          break;
        case 'view':
          this.signContractByView();
          break;
      }
    },
    /*
    描述：合同编辑/签署
    */
    async signContractByEdit() {
      const loading = this.$createLoading();
      const r = await this.$axios.get(apis.getCertStatus).then((data)=>data.data.data); //获取认证信息
      if(r === 'unCerted') {//未认证
        this.confirmToCert = true;
        loading.close();
      } else { //已认证
        if(this.inputCheck()) { //输入校验通过

          let saveType = this.pid ? 'update' : 'create';
          const c = await this.saveSign(saveType).then((data)=>data); //保存合同

          let cid = c.data ? c.data.id : this.contractData.cid; //合同ID
          let pid = c.data ? c.data.parter.id : this.pid;
          const n = await this.$axios.get(apis.checkContractNumIsNotFull, {
            params: {
              contractId: cid
            }
          }).then((data)=>data.data); //获取剩余签署份数
          if(n.code !== 200) { //剩余签署份数不够，弹窗购买套餐弹窗
            this.purchaseDialogVisible = true;
            loading.close();
          } else { // 合同图片是否生成成功
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
              this.visibleDialogNoSignet = true;
              loading.close();
            } else {
              const g = await this.genContractImages(pid).then((data)=>data);
              if(g===true) { // 跳转合同签署页面
                loading.close();
                this.$router.push({ name: 'manage-contract-contract-sign', query: { pid: pid,cid: cid }});
              } else {
                this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText:'合同加密失败，请重新尝试'
                })
                loading.close();
              }
            }
            
          }
        } else {
          loading.close();
        }
      }
    },
    /*
    描述：合同查看/签署
    */
    signContractByView() {
      this.doSignContract(this.contractData.cid, this.pid, 'self');
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
    描述： 发送事件
    */
    async onSendContract(){
      switch(this.modelType) {
        case 'create':
        case 'edit':
          this.sendContractByEdit();
          break;
        case 'view':
          this.sendContractByView();
          break;
      }
    },
    /*
    描述： 合同编辑/合同发送
    */
    async sendContractByEdit() {
      if(this.inputCheck()) { //输入校验通过
        const loading = this.$createLoading();
        const c = await this.saveSign(this.pid ? 'update' : 'create').then((data)=>data); //保存合同
        let cid = c.data ? c.data.id : this.contractData.cid; //合同ID
        let pid = c.data ? c.data.parter.id : this.pid;
        loading.close();
        this.$router.push({ name: 'manage-contract-contract-send', query: { pid: pid}});
      }
    },
    /*
    描述： 合同查看/合同发送
    */
    async sendContractByView() {
      this.$router.push({ name: 'manage-contract-contract-send', query: { pid: this.pid}});
    },
    /*
    描述： 上传附件打开选择文件窗体事件
    */
    onOpenFiles() {
      this.doOpenFiles();
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
          files.splice(10-this.contractData.fileList.length);
        } else {
          files.splice(10);
        }
      }
      if (!this.attachmentMutiple) { 
        if (this.attachmentAccept) { 
          if(files[0].type) {
            let index = _.findIndex(this.attachmentAccept.split(','), function(o) {
              return o === files[0].type;
            });
            if (index < 0) { //校验文件类型
              this.onDisallow(files);
              return;
            }
          } else { // 目前发现docx格式的文件type为空,为解决此问题以下代码
            if (this.attachmentAccept.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
              if (files[0].name.search('.docx') < 0) {
                this.onDisallow(files);
                return;
              }
            }
          }
          
          if(files[0].size > 1024*1024*10) { //校验文件大小
            this.onSpill();
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
              let index = _.findIndex(this.attachmentAccept.split(','), function(o) { //校验文件类型
                return o === value.type;
              });
              if (index < 0) {
                disallowFlag = true;
                this.onDisallow(value);
                return false;
              }
            } else { // 目前发现docx格式的文件type为空,为解决此问题以下代码
              if (this.attachmentAccept.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                if (value.name.search('.docx') < 0) {
                  disallowFlag = true;
                  this.onDisallow(value);
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
    描述：取消查看方事件
    */
    onCancelView() {
      this.doCancelView(this.contractData.title);
    },
    /*
    描述： 律师代写
    */
    lawerWrite() {
      this.showLawer = true;
    },
     /*
    描述： 律师审查
    */
    lawerCheck() {
      this.showLawerCheck = true;
    },
    /*
    描述：复制合同事件
    */
    onCopyContract() {
      this.doFromParter(this.pid);
    },
    /*
    描述：终止服务事件
    */
    onConfrimTerminateService() {
      this.confirmTerminateService = true;
    },
    /*
    描述：终止服务执行
    */
    async doTerminateService() {
      const r = await this.$axios.post(apis.terminateService, {pid: this.pid}).then((data)=>data.data);
      if(r.success) {
        if(opener != null) {
          opener.location.reload();
        }
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText:'操作成功'
        });
        setTimeout(()=>{
          this.__closeCurWindow();
        }, 2000);
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    },
    /*
    描述：关闭批注页面
    */
    onExitPostilView() {
      this.__closeCurWindow();
    }

  },
  components: {
    'sas-dialog-upload': dialogUpload,
    'sas-dialog-lawer': dialogLawer,
    'sas-dialog-lawercheck': dialogLawerCheck,
    'sas-dialog-template': dialogTemplate,
    'sas-dialog-postil': dialogPostil,
    'sas-dialog-attachment': dialogAttahment,
    'sas-dialog-purchase': dialogPurchase,
    'sas-attachment-view': attachmentView,
    'sas-dialog-watchlist': dialogWatchList,
    'sas-dialog-add-fail': dialogFileFail,
    'sas-dialog-no-signet': dialogNoSignet
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .editor-contract{
    @include responsive-default {
      background: #e6ecf5;
      padding: 25px calc(50% - 570px) 0;
      min-height: calc(100vh - 105px);
      position: relative;
      .tools{
        margin-bottom: 20px;
        .btns{
          .edit-handle{
            list-style-type: none;
            padding: 0;
            margin: 0;
            float: right;
            .item{
              float: left;
              .iconsprite{
                top: -6px;
              }
            }
            .icon-li{
              &:hover{
                color: $theme-color;
              }
            }
            .save{
              width: 96px;
              border: 1px solid #b8c6dc;
              text-align: center;
              border-radius: 4px;
              color: #95abd5;
              font-size: 14px;
              /* position: relative; */
              max-width: 200px;
              height: 34px;
              line-height: 34px;
              display: inline-block;
              /* float: right; */
              cursor: pointer;
              &:hover{
                background:$theme-color;
                color: #fff;
              }
            }
            .add{
              margin-left: 40px;
              color: #95abd5;
              font-size: 14px;
              max-width: 200px;
              height: 34px;
              line-height: 60px;
              display: inline-block;
              cursor: pointer;
              position: relative;
              .iconsprite{
                position: absolute;
                left: calc(50% - 12px);
                // top: -6px;
              }
            }
            .sign{
              margin-left: 40px;
              color: #95abd5;
              font-size: 14px;
              position: relative;
              max-width: 200px;
              height: 34px;
              line-height: 60px;
              display: inline-block;
              /* float: right; */
              cursor: pointer;
              .iconsprite{
                position: absolute;
                left: calc(50% - 12px);
                // top: -6px;
              }
            }
            .send{
               margin-left: 40px;
              color: #95abd5;
              font-size: 14px;
              position: relative;
              max-width: 200px;
              height: 34px;
              line-height: 60px;
              display: inline-block;
              /* float: right; */
              cursor: pointer;
              .iconsprite{
                position: absolute;
                left: calc(50% - 12px);
                // top: -6px;
              }
            }
          }
        }
      }
      .edit-area{
        .edit-content-ul{
          list-style-type: none;
          padding: 0;
          margin: 0;
          height: calc(100vh - 202px);
          .first,.second{
            border: 1px solid #b8c6dc;
          }
          .first {
            width: 296px;
          }
          .title-text{
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
          }
          .l-title{
            width: 294px;
            height: 56px;
            background: #f4f8ff;
            border-bottom: 1px solid #b8c6dc;
            line-height: 56px;
            font-size: 16px;
            text-align: center;
            position: relative;
            font-weight: 700;
            margin: 0;
            .icon-contract-menu{
              margin-right: 15px;
            }
          }
          .l-cursor{
            color: #124d93;
            height: calc(100% - 56px);
            background: #fff;
            padding-left: 15px;
            list-style-type: none;
            overflow-y: auto;
            li{
              cursor: pointer;
              &:hover{
                color: #f8b62c;
                font-weight: bold;
              }
            }
          }
          .ueditor-body{
            .edit-readonly{
              height: 100%;
              overflow-y:auto;
              background-color: #fff;
              padding: 16px 42px;

            }
            // .edit-postil{
            //   height: 100%;
            //   overflow-y:auto;
            //   background-color: #fff;
            //   padding: 16px 42px;
            // }
          }
        }

      }
      .postil-pop{
        position: fixed;
        width: 340px;
        z-index: 1000;
        .ptop{
          height: 24px;
          padding: 3px 5px;
          color: #FFF;
          border: 1px solid #686868;
          background-color: #686868;
          .puname{
            float: left;
            font-size: 13px;
          }
          .deleteP{
            float: right;
            margin-left: 4px;
            cursor: pointer;
          }
          .updateP{
            float: right;
            margin-left: 4px;
            cursor: pointer;
          }
          .pdate{
            float: right;
            margin: 1px 3px 0 0;
            font-size: 12px;
          }
          .arrow-down{
            position: absolute;
            margin-left: 334px;
            margin-top: -4px;
            border-style: solid;
            border-width: 10px 0px 15px 10px;
            border-color: transparent #EEEFEF;
          }

        }
        .pCont{
          width: 100%;
          padding: 2px 4px;
          background-color: #EEEFEF;
          border: 1px solid #EEEFEF;
          overflow-y: auto;
          overflow-x: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .postil-span{
        border: 1px solid #b8c6dc;
        border-radius: 2px;
        color: #313131;
        padding: 5px 10px;
        position: absolute;
        bottom: -32px;
        right: -1px;
        z-index: 9999;
      }
      .attachment{
        position: fixed;
        width: 100%;
        bottom: 30px;
        left: 0;
        z-index: 999;
      }
    }
  }
</style>
<style lang="scss">
  .ueditor-body{
    .edit-panel{
      height: 100%;
      [id='editor']{
        height: 100%;
        .edui-editor{
          height: 100%;
          .edui-editor-iframeholder{
            height: calc(100% - 80px) !important;
          }
        }
      }
    }
    .edit-readonly{
      a{
        color: black;
        text-decoration: none;
      }
    }
    .edit-postil{
      height: 100%;
      [id='editor-postil']{
        height: 100%;
        .edui-editor{
          height: 100%;
          .edui-editor-iframeholder{
            height: 100% !important;
          }
          .edui-editor-bottomContainer{
            display: none;
          }
        }
      }
    }
  }

</style>
