<template>
  <section class="contract-sign">
    <div class="wrapper-bg">
      <div id="movecontainment" style="overflow:hidden;position: relative;margin-bottom: 75px;">
         <!--左侧合同内容 -->
        <div id="contract" class="contract-sign-content" v-if="!error">
          <header style="background: #fff;">
            <div class="title-input-w" v-text="contractData.contract.title"></div>
          </header>
          <div>
            <div class="image-box" v-for="item in imgList">
              <img :src="item.src">
            </div>
            <div class="sign-name-box" v-for="(item, index) in contractSignList">
              <canvas v-if="item.userType == 1" :id="`seal${index}`" width="200" height="130" :value="item.userName" :style="`position:absolute;left: ${item.left}px;top: ${item.top}px;`"></canvas>      
              <canvas v-if="item.userType == 2" :id="`seal${index}`" width="200" height="240" :value="item.userName" :style="`position:absolute;left: ${item.left}px;top: ${item.top - 65}px;`"></canvas>    
            </div>
          </div>
        </div>
        <div class="error" v-if="error">
          <div class="error-box">
            <div>合同内容为空！请重新加载。。。</div>
          </div>
        </div>

        <!--右侧印章列表 -->
        <div  class="sign-margin-w c fr" :style="{transform: `translateX(-${scrollLeft}px)`}">
          <div class="row view-sign-operate-w">
            <div class="view-image-ul-width">
              <sas-button category="primary" size="medium" @click="doSign" >完成签约</sas-button>
            </div>
          </div>
          <div class="fl">
            <lvx-tabs type="border-card" class="signet-wraper" @tab-click="signetTypeChange" v-model="currentSignetTabsValue">
              <lvx-tab-pane label="我的印章" name="mySignet">
                <div class="my-signet-list">
                  <div class="noData" v-if="mySignetData.total == 0">
                    暂未设置印章！
                  </div>
                  <div :id="`my-signet${index}`"  class="my-signet-wraper signet-item" v-for="(item, index) in mySignetData.rows" :data-orgx="item.org_x" :data-orgy="item.org_y" :data-signetid="item.id">
                    <img class="my-signet-img" :src="`data:image/png;base64,${item.sign}`"/>
                  </div>
                  <!-- <img :id="`my-signet${index}`" v-for="(item, index) in mySignetData.rows" class="my-signet-img" :src="`data:image/png;base64,${item.sign}`" :data-orgx="item.org_x" :data-orgy="item.org_y" :data-signetid="item.id"/> -->
                  <section class="pagination-wraper">
                    <lvx-pagination
                      layout="prev, next"
                      prev-text="上一页"
                      next-text="下一页"
                      @current-change="doSearhMySignets"
                      :page-size="signetListPageSize"
                      :total="mySignetData.total">
                    </lvx-pagination>
                  </section>
                </div>
              </lvx-tab-pane>
              <lvx-tab-pane label="授权的印章" name="myAuthSignet">
                <div class="my-authorized-signet-list">
                  <div class="noData" v-if="myAuthorizedSignetData.total == 0">
                    暂未设置印章！
                  </div>
                  <div :id="`my-authorized-signet${index}`" class="my-signet-wraper" v-for="(item, index) in myAuthorizedSignetData.rows" :data-orgx="item.org_x" :data-orgy="item.org_y" :data-signetid="item.signId">
                    <img  class="my-signet-img" :src="`data:image/png;base64,${item.sign}`" />
                  </div>
                  <!-- <img :id="`my-authorized-signet${index}`" v-for="(item, index) in myAuthorizedSignetData.rows" :data-orgx="item.org_x" :data-orgy="item.org_y" :data-signetid="item.id" class="my-signet-img" :src="`data:image/png;base64,${item.sign}`" /> -->
                  <section class="pagination-wraper">
                    <lvx-pagination
                      layout="prev, next"
                      prev-text="上一页"
                      next-text="下一页"
                      @current-change="doSearhMyAuthorizedSignets"
                      :page-size="signetListPageSize"
                      :total="myAuthorizedSignetData.total">
                    </lvx-pagination>
                  </section>
                </div>
              </lvx-tab-pane>
            </lvx-tabs>
            <!-- <div class="sign-div"><h3 class="con-sing-w sign-h3-w c">签名列表</h3></div>
            <img id="img0" src=""  class="con-sing-w img-sign all-cursor" style="display:none;" />
            <img id="img1" src="" class="con-sing-w img-sign all-cursor" style="display:none;" />
            <img id="img2" src="" class="con-sing-w img-sign all-cursor" style= "display:none;" /> -->
          </div>
       </div>
      </div>
    </div>

    
    <sas-confirm title="你还未实名认证，请前往认证." :isShow.sync="confirmToCert" @enSure="toCert"/>
    <sas-dialog-purchase :show.sync="purchaseDialogVisible" />
    <sas-confirm 
      title="温馨提醒：该合同目前处于“授权中”，若你执行此操作，所有被授权者的授权将被立即收回，律师审查服务将被终止，如果放弃操作请点击取消。" :isShow.sync="confirmCancelAuth" @enSure="confirmSign"
    />
    <sas-dialog-send-sms :show.sync="visibleSendSmsDialog" @after-send="afterSendSms"/>
    <sas-dialog-no-signet :show.sync="visibleDialogNoSignet" />
    <sas-attachment-view :file-list="contractData.fileList" class="attachment"  @after-view="toAttachmentView" :allow-del="false"/>
  </section>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import apis from "~/config/api";
import contractMixin from '~/mixins/contract-mixins'
import utils from '~/mixins/utils'
import attachmentView from '~/components/contract/attachment/attachment-view'
import dialogPurchase from '~/components/dialog/dialog-purchase'
import dialogSendSms from '~/components/dialog/dialog-sign-sms'
import dialogNoSignet from '~/components/dialog/dialog-no-signet'
export default {
  name: "contract-sign",
  metaInfo: {
    title: "合同签署—云合同",
  },
  mixins: [contractMixin, utils],
  data() {
    return {
      cid: this.$route.query.cid, 
      pid: this.$route.query.pid,
      mySignetPageNumber: 1, //我的印章列表当前页数
      signetListPageSize: 3, //印章列表每页数据条目数
      scrollLeft: 0, //鼠标向左滚动距离
      destImgId: '' , //最终在合同内的签名ID
      confirmCancelAuth: false, //是否显示取消授权确认框
      visibleDialogNoSignet: false, //是否显示创建签名弹窗
      contractPaddingTopFromSignet: 50, //合同与印章的顶部内边距
      contractPaddingRightFromSignet: 80, //合同与印章的左部内边距
      signetPositionLeftToContractRightBorder: -226, //签名的左位移距离到合同右边缘
      visibleSendSmsDialog: false, //显示发送短信弹窗
      currentSignetTabsValue: 'mySignet', //当前印章tab的激活项name

    };
  },
  async fetchData(to, context) {
    let self = context;
    const c = await self.$axios.get(apis.l_queryContract, {params: {
      pid: to.query.pid,
      cid: to.query.cid
    }}).then((res)=>res.data); //读取合同信息
    
    const r = await self.$axios.get(apis.getContractPageSize, {params: {cid: to.query.cid || ''}}).then((res)=>res.data); //读取合同页数
    const s = await self.$axios.get(apis.n_query, {
      params: {
        pageNo: 1,
        limit: 3
      }
    }).then((res)=>res.data); // 读取我的印章列表
    const a = await self.$axios.post(apis.authorizedSignList, {
      pageNo: 1,
      limit: 3
    }).then((res)=>res.data); // 读取授权的印章列表
    

    const sl = await self.$axios.get(apis.getContractSign, {params: {cid: to.query.cid}}).then((data)=>data.data);
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
          signDate: value.signDate
        });
      });
      self.$store.state.Contract.ContractSign.contractSignList = tempList;
    }

    self.$store.state.Contract.ContractSign.contractPageSize = r;
    if(s.success) {
      _.forEach(s.data.rows, (signet)=> {
        signet.org_x = 0;
        signet.org_y = 0;
      });
      self.$store.state.Contract.ContractSign.mySignetData = s.data;
      if(!s.data.rows.length) {
        self.$createMessage({
          type:'warn',
          duration:3000,
          spinnerText: '你还未创建自己的签名'
        });
      }
    }
    if(a.success) {
      _.forEach(a.data.rows, (signet)=> {
        signet.org_x = 0;
        signet.org_y = 0;
      });
      self.$store.state.Contract.ContractSign.myAuthorizedSignetData = a.data;
    }
    if(c.success) {
      self.$store.state.Contract.ContractSign.contractData = c.data;
      if(c.data.colsStatus != 32) { //合同未签署
        let keyWordArray = ['借', '款', '利', '息', '银', '金', '钱', '支', '付', '还', '贷'];
        let reg = new RegExp(keyWordArray.join('|'), 'img');
        if(reg.test(c.data.contract.title)) {
          self.$createMessage({
            type:'warn',
            duration:3000,
            spinnerText: '网络借贷存在风险，签署前请确认对方身份，避免造成损失。'
          });
        }
      }
    }
    
  },
  watch: {
    mySignetData: function(newV, oldV) {
      if(newV.rows.length) {
        this.$nextTick(()=>{
          this.bindMySignetDragableEvent();
        })
      }
    },
    myAuthorizedSignetData: function(newV, oldV) {
      if(newV.rows.length) {
        this.$nextTick(()=>{
          this.bindMyAuthorizedSignetDragableEvent();
        })
      }
    },
    contractSignList(newVal, oldVal) {
      if(newVal.length) {
        setTimeout(()=>{
          this.drawSignNameCanvas();
        }, 0);
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      contractPageSize: state => state.Contract.ContractSign.contractPageSize,
      mySignetData: state => state.Contract.ContractSign.mySignetData,
      contractData: state => state.Contract.ContractSign.contractData,
      myAuthorizedSignetData: state => state.Contract.ContractSign.myAuthorizedSignetData,
      contractSignList: state => state.Contract.ContractSign.contractSignList
    }),
    /*
    合同图片列表
    */
    imgList: function() {
      let a = [];
      for(let i = 0; i < this.contractPageSize; i++) {
        a.push({src: `/contract/signContract/getContractImg?cid=${this.$route.query.cid}&page=${i}`});
      }
      return a;
    },
    error: function() {
      return !(this.$route.query.pid && this.$route.query.cid);
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
    
    setTimeout(()=>{
      this.bindDragableAreaEvent();
    }, 0);
  },
  methods: {
    scroll() {
      this.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    },
    /*
    描述： 跳转查看附件页面
    */
    toAttachmentView(path) {
      this.doToAttachmentView(path);
    },
    /*
    描述： 删除附件事件
    */
    async onDelAttachment(fileId) {
      this.doDelAttachment(fileId);
    },
    /*
    描述：我的印章分页查询
    */
    async doSearhMySignets(currentPage) {
      // debugger
      const s = await this.$axios.get(apis.n_query, {
        params: {
          pageNo: currentPage,
          limit: this.signetListPageSize
        }
      }).then((res)=>res.data); // 读取我的印章列表
      if(s.success) {
        this.$store.state.Contract.ContractSign.mySignetData = s.data;
      }
      //重置签名位置
      this.resetDestImgLocation();
    },
    /*
    描述：我的授权印章分页查询
    */
    async doSearhMyAuthorizedSignets(currentPage) {
      // debugger
      const a = await this.$axios.post(apis.authorizedSignList, {
        pageNo: currentPage,
        limit: this.signetListPageSize
      }).then((res)=>res.data); // 读取授权的印章列表
      if(a.success) {
        this.$store.state.Contract.ContractSign.myAuthorizedSignetData = a.data;
      }
      //重置签名位置
      this.resetDestImgLocation();
    },
    /*
    描述：为签名可拖拽区域添加拖动事件
    */
    bindDragableAreaEvent() {
      let self = this;
      $("#contract").droppable({
        drop: (event, ui) => {
          self.destImgId = ui.draggable[0].id;
        }
      });
    },
    /*
    描述：为我的印章添加拖动事件
    */
    bindMySignetDragableEvent() {
      let self = this;
      var mySignetNodes = $('.sign-margin-w').find('.fl').find('.my-signet-list').find('.my-signet-wraper');
      mySignetNodes.draggable({
        containment: "#movecontainment", //运动区域
        scroll: false //是否滚动
      });
      mySignetNodes.draggable({
        start: (event, ui) => {
          //拖拽开始时触发 start 事件
          let mySignetId = parseInt(ui.helper[0].dataset.signetid);
          let mySignetData =  _.find(self.mySignetData.rows, (o)=> { return o.id == mySignetId; });
           // debugger
          mySignetData.org_x = ui.originalPosition.left;
          mySignetData.org_y = ui.originalPosition.top;
         
          self.resetDestImgLocation($(ui.helper[0]).attr('id'));
        },
        stop: (event, ui) => {
          //拖拽停止时触发 stop 事件--中心点左右为标准
          let [org_x, org_y] = [ui.helper[0].dataset.orgx, ui.helper[0].dataset.orgy];
          this.moveEndLocation(ui, $(ui.helper[0]).attr('id'), org_x, org_y);
        }
      });
    },
    /*
    描述：为我的授权印章添加拖动事件
    */
    bindMyAuthorizedSignetDragableEvent() {
      let self = this;
      var mySignetNodes = $('.sign-margin-w').find('.fl').find('.my-authorized-signet-list').find('.my-signet-wraper');
      mySignetNodes.draggable({
        containment: "#movecontainment", //运动区域
        scroll: false //是否滚动
      });
      mySignetNodes.draggable({
        start: (event, ui) => {
          //拖拽开始时触发 start 事件
          
          let mySignetId = parseInt(ui.helper[0].dataset.signetid);
          let mySignetData =  _.find(self.myAuthorizedSignetData.rows, (o)=> { return o.signId == mySignetId; });
           // debugger
          mySignetData.org_x = ui.originalPosition.left;
          mySignetData.org_y = ui.originalPosition.top;

          self.resetDestImgLocation($(ui.helper[0]).attr('id'));
          
        },
        stop: (event, ui) => {
          //拖拽停止时触发 stop 事件--中心点左右为标准
          let [org_x, org_y] = [ui.helper[0].dataset.orgx, ui.helper[0].dataset.orgy];
          this.moveEndLocation(ui, $(ui.helper[0]).attr('id'), org_x, org_y);
        }
      });
    },
    /*
    描述：印章选项卡改变事件
    */
    signetTypeChange() {
      this.resetDestImgLocation();
    },
    /*
    描述：重置合同区域内的签名位置
    参数：正在拖动的签章id
    */
    resetDestImgLocation(dragSignetImgId = '') {
      if(this.destImgId && dragSignetImgId !== this.destImgId) {
        $(`#${this.destImgId}`).css({"left": 0, "top": 0});
        this.destImgId = '';
      }
    },
    /*
    描述：绘制印章
    */
    drawSignNameCanvas() {
       // debugger
      _.forEach(this.contractSignList, (v, i) => {
        // debugger
        if(v.userType == 1) {
          this.drawPersonalSeal(v.id, v.signDate, v.signStr);
        } else if (v.userType == 2) {
          this.drawCompanySeal(v.id, v.userName, v.signDate, v.signStr);
        }
      });
    },
    /*
    描述：点击完成签约
    */
    async doSign() {
      const r = await this.validateAfterDoSign();
      if(r === true) {
        if(this.contractData.colsStatus == 1) {
          this.confirmCancelAuth = true;
        } else {
          this.confirmSign();
        }
      }
    },
    /*
    描述：确认完成签约
    */
    confirmSign() {
      this.visibleSendSmsDialog = true;
    },
    /*
    描述：短信验证验证成功，提交合同签署
    参数：
      smsCode: 短信验证码
    */
    async afterSendSms(smsCode) {
      let signPosition = ($(`#${this.destImgId}`).offset().left - $('#contract').offset().left + 100) + '' + ';' + ($(`#${this.destImgId}`).offset().top - 38 -104 + '');
      let postData = {
        cid: this.cid,
        pid: this.pid,
        smsCode: smsCode,
        signId: $(`#${this.destImgId}`)[0].dataset.signetid,
        signLocation: signPosition
      };
      const r = await this.$axios.post(apis.signContract, postData).then((res)=>res.data);
      if(r.code == 200) {
        if (window.opener != null) {
          window.opener.location.reload();
        }
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '签署成功'
        });
        this.$router.push({path: '/manage/contract/contract-view-image', query: {cid: this.cid, pid: this.pid}});
        // if(r.data.rowsStatus == 0 && r.data.colsStatus == 4) {
        //   this.$router.push({path: '/manage/contract/contract-view-image', query: {cid: this.cid, pid: this.pid}});
        // } else {
        //   location.reload();
        // }
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    },
    /*
    描述：完成签约前校验
    */
    async validateAfterDoSign() {
      //实名认证校验
      const c = await this.$axios.get(apis.getCertStatus).then((res)=>res.data);
      if(c.code == 200) {
        if(c.data == 'unCerted') { //未实名认证
          this.confirmToCert = true;
          return false;
        } else { //已认证
          //校验用户是否创建印章
          if(!this.myAuthorizedSignetData.rows.length && !this.mySignetData.rows.length) {
            this.visibleDialogNoSignet = true;
            return false;
          }
          //剩余签署份数校验
          const n = await this.$axios.get(apis.checkContractNumIsNotFull, {
            params: {
              contractId: this.cid
            }
          }).then((data)=>data.data); //获取剩余签署份数

          if(n.code !== 200) { //剩余签署份数不够，弹窗购买套餐弹窗
            this.purchaseDialogVisible = true;
            return false;
          } else { //签署份数充足
            //合同区域是否有有效签名印章
            if(!this.destImgId) {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: '请先拖拽签名'
              });
              return false;
            }

            //校验签名是否落在分页线处
            //合同顶部区域到网页顶部的距离 / 合同印章的高度 / 合同每页的定义高度
            let [contractHeightToTop, heightSignet, contractHeightOnePage] = [190, 123, 1275]; 
            //签章顶部到合同有效区域的距离
            let signetHeightToTop = $(`#${this.destImgId}`).offset().top - contractHeightToTop;
            if( ((signetHeightToTop + heightSignet + this.contractPaddingTopFromSignet) % contractHeightOnePage) < (heightSignet + this.contractPaddingTopFromSignet) 
                || 
                ($(`#${this.destImgId}`).offset().top - contractHeightToTop) < this.contractPaddingTopFromSignet
                ||
                (signetHeightToTop % contractHeightOnePage) < this.contractPaddingTopFromSignet
              ) {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: '签名不能定位在分页处'
              });
              return false;
            }

            //校验签名是否距离合同边缘太近
            let signetPositionLeft = this.signetPositionLeftToContractRightBorder - this.contractPaddingRightFromSignet;

            if(parseInt($(`#${this.destImgId}`)[0].style.left) > signetPositionLeft) {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: '请尽量不要在合同边缘加盖印章'
              });
              return false;
            } else {
              return true;
            }

          }
        }
        
      }
      
    },
    /*
    描述：判断签名是否在允许的区域范围内，如果不在则重置到拖动之前的有效位置
    参数：
      ui: 拖动的UI
      imgId: 拖动的签名ID
      x: 签名拖动之前的x值
      y: 签名拖动之前的y值
    */
    moveEndLocation(ui, imgId, x, y) {
      /*190 是合同顶部到网页顶部的距离 ; -226 是签名图片到合同有效区域的左边界的距离*/
      // debugger
      let [offsetTopLimit] = [190];
      let [imgOffsetTop, imgPositionLeft] = [ui.offset.top, ui.position.left];
      if(imgOffsetTop < offsetTopLimit || imgPositionLeft > this.signetPositionLeftToContractRightBorder) { //头部或左侧超出允许的区域
        $(`#${imgId}`).css("left", parseInt(x));
        $(`#${imgId}`).css("top", parseInt(y));
      }
    }
  },
  components: {
    'sas-attachment-view': attachmentView,
    'sas-dialog-purchase': dialogPurchase,
    'sas-dialog-send-sms': dialogSendSms,
    'sas-dialog-no-signet': dialogNoSignet
  }
};
</script>

<style lang="scss">
.c {
  text-align: center;
  color: #999;
}
.fr {
  float: right;
}
.contract-sign{
  .sign-margin-w{
    .fl{
      .lvx-tabs__content{
        overflow: visible;
      }
    }
  }
}

</style>
<style lang="scss"  scoped >
@import "~styles/base.scss";
.contract-sign {
  background: #e6ecf5;
  min-height: calc(100vh - 80px);
  overflow: hidden;
  width: 100%;
  padding: 25px calc(50% - 570px) 0;
  
  @include responsive-default {
    .contract-sign-content {
      width: 902px;
      float: left;
      position: relative;
      border: 1px solid #b8c6dc;
      margin: 65px 0px 0px;
    }
    .error-box{
      width: 902px;
      float: left;
      position: relative;
      border: 1px solid #b8c6dc;
      margin: 65px 10px 60px;
    }
    .title-input-w {
      background: #fff;
      box-shadow: 0 1px 0 #ebebeb;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #b8c6dc;
      border: none;
      text-indent: 30px;
      position: relative;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .image-box{
      height: 1275px;
      border-bottom: 1px dashed #000;
      text-align: center;
      img{
        width: auto;
        height: auto;
        max-width: 900px;
        max-height: 1274px;
      }
    }
    
    .sign-margin-w {
      width: 200px;
      height: 506px;
      position: fixed;
      margin-left: 960px;
    }

    .view-sign-operate-w {
      margin-bottom: 15px;
      padding-right: 5px;
    }
    .fl {
      float: left;
      .signet-wraper{
        margin-top: 20px;
        width: 211px;
        
        .my-authorized-signet-list, .my-signet-list{
          min-height: 400px;
          
          .noData{
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #959595;
          }
          .my-signet-wraper{
            width: 123px;
            height: 123px;
            line-height: 121px;
            margin: 0 auto;
            border: 1px solid #b8c6dc;
            margin-bottom: 3px;
            .my-signet-img{
              height: auto;
              width: 100%;
              vertical-align: middle;
            }
            &:last-of-type{
               margin-bottom: 0px;
            }
            &:hover{
              border: 1px dotted #333;
            }
          }
          // .my-signet-img{
          //   width: 123px;
          //   height: 110px;
          //   line-height: 110px;
          //   margin: 0 auto;
          //   border: 1px solid #b8c6dc;
          //   margin-bottom: 3px;
          //   &:hover{
          //     border: 1px dotted #333;
          //   }
          // }
          .pagination-wraper{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        

      }

    }
    
    .top-ul-li-w {
      color: #fff;
      font-size: 14px;
      position: relative;
    }
    .sms-content{
      .h4-ms-w {
        margin: 50px 0 20px;
      }
      .ms-title-w {
        color: #b9c0cd;
        font-size: 16px;
      }
      .c {
        text-align: center;
      }
      .h4-ov-w {
        margin-bottom: 50px;
      }
      blue {
        color: #4081ff;
      }
      .modal-body {
        padding: 0;
        font-size: 18px;
        color: #131313;
        position: relative;
      }
      .modal-body-a-w {
        margin-bottom: 32px;
      }
      .ms-proving-w {
        margin-right: 0px;
        margin-left: 0px;
        text-align: center;
      }
    }
    .attachment{
      position: fixed;
      bottom: 30px;
      width: 100%;
      left: 0;
    }


  }
  @include responsive-lt(1366px) {
    .fl{
      .signet-wraper {
        .my-authorized-signet-list, .my-signet-list{
          // max-height: 325px;
          min-height: 336px;
          // overflow: auto;
          // margin-bottom: 20px;
          // height: 375px;
          margin-bottom: 15px;
          .my-signet-wraper{
            height: 110px;
            line-height: 108px;
            .my-signet-img{
              width: 92%;
              vertical-align: middle;
            } 
          }
        }
      }
      
    }
  }
}

#pane-0{
  .my-signet-wraper::last-child{
    margin-bottom: 0px;
  }
}
</style>
