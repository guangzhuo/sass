import apis from '~/config/api'
import Enum from '~/mixins/Enum'
let contractMixin = {
  data() {
    return {
      postUrl: '', //附件上传url
      confirmToCert: false, //实名认证弹窗
      purchaseDialogVisible: false, //购买套餐弹窗可见状态
      alramDialogVisible: false, //提醒列表弹窗可见状态
      confirmToCancelSign: false, //撤销签名二次确认框
      attachmentDialogVisible: false, //添加附件弹窗可见状态
      attachmentFile: [], //打开添加附件弹窗时传入的选择文件
      confirmDelContract: false, //删除合同二次确认框
      textDelContract: '请再次确认是否删除该合同！', //删除合同二次弹窗显示文本
      watchlistDialogVisible: false, //查看方弹窗可见状态
      watchListDialogTitle: '', //查看方弹窗标题
      confirmRecallContract: false, //撤回合同二次确认框
      confirmDrawbackContract: false, //退回合同二次确认框
      visibleDialogNoSignet: false, //是否显示创建签名弹窗

      /*枚举*/
      roleIdEnum: Enum.RoleEnum,
      rowStatusEnum: Enum.RowStatusEnum,
      colsStatusEnum: Enum.ColsStatusEnum,
      contractTypeEnum: Enum.ContractTypeFlagEnum
    };
  },
  computed: {
    /*
    visiable
    */
    cancelViewVisiable() { //取消查看方
      return ((this.contractData.rowsStatus == this.rowStatusEnum.indraft && this.contractData.roleId == this.roleIdEnum.creater) && this.contractData.colsStatus == this.colsStatusEnum.watching);
    }
  },
  methods: {
    toCert() {
      if(this.user.certify_status === '1' || this.user.certify_status === '2') { //认证中或已认证
        this.$router.push({path: '/manage/user/manage/userManage'}); //跳转个人信息页面
      } else {
        if(this.user.userType === 1) { //个人用户类型
          open(`/manage/user/check/personal?tab=0`)
          // this.$router.push({path: '/manage/user/check/personal', query: {tab: 0}});  //跳转个人认证页面
        } else {
          if(this.user.certifyNum == 2){
            this.$router.push({path: '/manage/user/check/company', query: {tab: 0}}); //跳转人工企业认证页面
          }else{
            open(`/manage/user/check/checkAutomatic?tab=0`)
          }
          // this.$router.push({path: '/manage/user/check/company', query: {tab: 0}}); //跳转企业认证页面
        }
      }
    },
     /*
    描述: 执行复制文本合同
    */
    async doFromParter(pid) {
      const r = await this.$axios.get(apis.l_fromParter, {params: {pid: pid}}).then((data)=>data.data);
      if(r.success) {
        this.$router.push({path: '/manage/contract/contract-edit', query: {pid: r.data.pid}});
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    },
    /*
    描述: 合同信息、合同查看、图片合同查看 的 签署合同业务
    参数：
      cid: 合同id
      pid: pid
      target: self、blank
    */
    async doSignContract(cid, pid, target) {

      const loading = this.$createLoading();
      const r = await this.$axios.get(apis.getCertStatus).then((data)=>data.data.data); //获取认证信息
      if(r === 'unCerted') {//未认证
        this.confirmToCert = true;
        loading.close();
      } else { //已认证

        // let cid = this.contractData.cid; //合同ID
        // let pid = this.$route.query.pid;

        const n = await this.$axios.get(apis.checkContractNumIsNotFull, {
          params: {
            contractId: cid
          }
        }).then((data)=>data.data); //获取剩余签署份数

        if(n.code !== 200) { //剩余签署份数不够，弹窗购买套餐弹窗
          this.purchaseDialogVisible = true;
          loading.close();
        } else {
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
            return ;
          } else {
            if(this.contractData.roleId ==1) {//合同创建者
              const g = await this.genContractImages(pid).then((data)=>data);
              if(g  === true) {
                loading.close();
                this.$router.push({ name: 'manage-contract-contract-sign', query: { pid: pid,cid: cid }});
              } else {
                this.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText: '合同加密失败，请重新尝试！'
                });
                loading.close();
              }

            } else {
              loading.close();
              this.$router.push({ name: 'manage-contract-contract-sign', query: { pid: pid,cid: cid, sid: 1 }});
            }
          }
        }
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
    描述: 合同信息、合同查看、图片合同查看 的 发送合同业务
    参数：
      cid: 合同id
      pid: pid
    */
    doSendContract(cid, pid) {
      this.$router.push({ name: 'manage-contract-contract-send', query: { pid: pid, cid: cid }});
    },
    /*
    描述: 合同信息、合同查看、图片合同查看 的 取消查看方业务: 打开查看方列表窗体
    参数：
      cTtitle: 合同 标题
    */
    doCancelView(cTtitle) {
      this.watchListDialogTitle = `《${cTtitle}》`;
      this.watchlistDialogVisible = true;
    },
    /*
    描述: 合同信息、合同查看、图片合同查看 的 删除合同事件: 打开二次确认框
    参数：
      colsStatus: 合同小状态
    */
    doConfirmDel(colsStatus) {
      if(colsStatus == this.colsStatusEnum.authing) {
        this.textDelContract = '该合同目前处于“授权中”，若你执行此操作，所有被授权者的授权将被立即收回，律师审查服务将被终止，如果放弃操作请点击返回。';
      }
      this.confirmDelContract = true;
    },
    /*
    描述: 合同信息、合同查看、图片合同查看 的 删除合同业务
    参数：
      pid: pid
      from: 执行来源 'view-image'(图片合同) 、'contract-view'(文本合同) 'contract-messages' (合同信息)
    */
    async doDelContract(pid, from) {
      const r = await this.$axios.post(apis.delete, {pid: pid}).then((data)=>data.data);
      if(r.success) {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '删除成功'
        })
        const vCb = ()=> {
          if(opener != null) {
            opener.location.reload();
          }
          setTimeout(()=>{
            this.__closeCurWindow();
          }, 2000);
        };
        const cmCb = ()=> {
          this.$router.push({path: '/manage/contract/contract'});
        };

        switch(from) {
          case 'view-image':
          case 'contract-view':
            vCb();
            break;
          case 'contract-messages':
            cmCb();
        }
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        })
      }
    },
    /*
    描述： 打开上传附件选择文件窗体
    */
    doOpenFiles() {
      this.postUrl = `${apis.uploadAccessoryFile}?contractId=${this.contractData.cid}`;
      this.$refs['add-files'].click();
    },
    /*
    描述： 打开添加附件窗体
    参数:
      raw: 选择文件的基本信息
    */
    doOpenAttachmentDialog(rawFiles) {
      this.attachmentDialogVisible = true;
      let files = rawFiles;
      let uid = Date.now();
      _.forEach(files, (file)=> {
        file.uid = uid++;
        this.attachmentFile.push({
          name: file.name,
          percentage: 0,
          raw: file,
          size: file.size,
          status: 'ready',
          uid: file.uid,
          url: URL.createObjectURL(file)
        });
      });
      this.$refs['add-files'].value = null;
    },
    /*
    描述： 打开设置提醒窗体
    */
    doSetAlarm() {
      this.alramDialogVisible = true;
    },
    /*
    描述：撤销签名事件
    */
    doConfirmCancelSign() {
      this.confirmToCancelSign = true;
    },
    /*
    描述：撤销签名执行
    参数：
      from: 执行来源 'view-image'(图片合同) 、 'contract-messages' (合同信息)
      pid:
      cid: 合同id
    */
    async doCancelSign(from, pid, cid) {
      const r = await this.$axios.post(apis.undoSign, {
        pid: pid
      }).then((data)=>data.data);
      if(r.code ==200) {
        if(r.data == 'true') {
          const toContractView = async ()=> {
            // const f = await this.sGetContractFlagByPid(pid);
            const f = await this.$axios.get(apis.l_pageFlag, {params: {pid: pid}}).then((res)=>res.data);//获取合同类型标识
            if(f.success) {
              if(f.data.flag == this.contractTypeEnum.text) { //文本合同
                if(opener !=null) {
                  opener.location.reload();
                }
                this.$router.push({path: '/manage/contract/contract-view', query: {pid: pid, cid: cid}});
              } else if(f.data.flag == this.contractTypeEnum.image) { //图片合同
                if(opener !=null) {
                  opener.location.reload();
                }
                location.reload();
              }
            } else {
              this.$createMessage({
                type:'error',
                duration:3000,
                spinnerText: f.msg
              });
            }
          };

          const doReload = ()=>{
            location.reload();
          };
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '撤销签名成功'
          });

          switch(from) {
            case 'view-image':
              toContractView();
              break;
            case 'contract-messages':
              doReload();
              break;
          }
        } else {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '撤销签名失败'
          });
        }
      }
    },
    /*
    描述：撤回合同二次确认框
    */
    doConfrimRecall() {
      this.confirmRecallContract = true;
    },
    /*
    描述：撤回合同执行
    参数：
      from: 执行来源 'view-image'(图片合同) 、 'contract-messages' (合同信息)
      pid: pid
    */
    async doRevocationContract(from, pid) {
      const r = await this.$axios.post(apis.revocationContract, {pid: pid}).then((data)=>data.data);
      if(r.success) {
        const viCb = ()=>{
          if(opener !=null) {
            opener.location.reload();
          }
          setTimeout(()=>{
            location.reload();
          }, 2000);
        };
        const cmCb = ()=>{
          location.reload();
        };
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '撤回成功'
        });

        switch(from) {
          case 'view-image':
            viCb();
            break;
          case 'contract-messages':
            cmCb();
            break;
        }
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '撤回失败'
        });
      }
    },
    /*
    描述：退回合同事件
    */
    doConfrimDrawback() {
      this.confirmDrawbackContract = true;
    },
    /*
    描述：退回合同执行
    参数：
      from: 执行来源 'view-image'(图片合同) 、 'contract-messages' (合同信息)
    */
    async onDrawbackContract(from, pid) {
      const r = await this.$axios.post(apis.sendBack, {pid: pid}).then((data)=>data.data);
      if(r.success) {
        const viCb = ()=>{
          if(opener !=null) {
            opener.location.reload();
          }
          setTimeout(()=>{
            this.__closeCurWindow();
          }, 2000);
        };
        const cmCb = ()=>{
          this.$router.push({path: '/manage/contract/contract'});
          // location.reload();
        };

        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '退回成功'
        });

        switch(from) {
          case 'view-image':
            viCb();
            break;
          case 'contract-messages':
            cmCb();
            break;
        }
      } else {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: r.msg
        });
      }
    },
    /*
    描述： 跳转查看附件页面
    参数：
      path: 附件路径
    */
    doToAttachmentView(path) {
      open(`${this.__getRouterBase()}/manage/contract/attachment-view?path=${path}`);
    },
    /*
    描述： 删除附件处理
    参数：
      fileId: 文件id
    */
    async doDelAttachment(fileId) {
      const r = await this.$axios.post(apis.delAttachment, {
        path: fileId,
        contractId: this.contractData.cid
      }).then((data)=>data.data);
      if(r.success) {
        location.reload();
      }
    },
    /*
     描述：绘制个人章签署
     参数：
      id: 绘制签名的canvas 容器id
      signDate: 签章日期
      signStr: 签章图片的base64内容
    */
    drawPersonalSeal(id, signDate, signStr){
      // debugger
      var idName = id;
      var canvas = document.getElementById(idName);
      var context = canvas.getContext('2d');

      // 绘制印章边框
      var width = canvas.width;
      var height = canvas.height;

      var img = new Image();
      img.src = "data:image/png;base64," + signStr;
      img.onload = function(){
          context.drawImage(img, 0, 0, 200, 110);//签名高度改为110px
      }

      // 年月日--2015年09月16日
      context.font = '18px 宋体';
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth = 1;
      context.strokeStyle = '#044189';
      context.strokeText(signDate, width/2, 120);//签名高度改为110px
    },
    /*
     描述：绘制企业章签署
     参数：
      id: 绘制签名的canvas 容器id
      companyName: 企业名称
      signDate: 签章日期
      signStr: 签章图片的base64内容
    */
    drawCompanySeal(id, companyName, signDate, signStr){
      var idName = id;
      var canvas = document.getElementById(idName);
      var context = canvas.getContext('2d');
      var text = "云合同专用章";
      // 绘制印章边框
      var width = canvas.width / 2;
      var height = canvas.height / 2;
      var img = new Image();
      img.src = "data:image/png;base64," + signStr;

      //绘制五角星
      /**
       * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
       * rotate:绕对称轴旋转rotate弧度
       */
      // function create5star(context, sx, sy, radius, color, rotato) {
      //   context.save();
      //   context.fillStyle = color;
      //   context.translate(sx, sy);//移动坐标原点
      //   context.rotate(Math.PI + rotato);//旋转
      //   context.beginPath();//创建路径
      //   var x = Math.sin(0);
      //   var y = Math.cos(0);
      //   var dig = Math.PI / 5 * 4;
      //   for (var i = 0; i < 5; i++) {//画五角星的五条边
      //       var x = Math.sin(i * dig);
      //       var y = Math.cos(i * dig);
      //       context.lineTo(x * radius, y * radius);
      //   }
      //   context.closePath();
      //   context.stroke();
      //   context.fill();
      //   context.restore();
      // }

      img.onload = function(){
        // context.lineWidth = 5;
        // context.strokeStyle = "#f00";
        // context.beginPath();
        // context.arc(width, height, 90, 0, Math.PI * 2);//宽、高、半径
        // context.stroke();

        //画五角星
        // create5star(context, width, height, 25, "#f00", 0);

        // 绘制印章名称--云合同专用章
        // context.font = '18px 宋体';
        // context.textBaseline = 'middle';//设置文本的垂直对齐方式
        // context.textAlign = 'center'; //设置文本的水平对对齐方式
        // context.lineWidth=1;
        // context.strokeStyle = '#f00';
        // context.strokeText(text, width, height + 60);

        // 年月日--2015年09月16日
        context.font = '18px 宋体';
        context.textBaseline = 'middle';//设置文本的垂直对齐方式
        context.textAlign = 'center'; //设置文本的水平对对齐方式
        context.lineWidth = 1;
        context.strokeStyle = '#044189';
        //var date = formatDate(new Date());
        context.strokeText(signDate, width, height + 105);

        //绘制签名
        context.drawImage(img, 10, 26, 180, 180);

        // 绘制印章单位
        // context.strokeStyle = '#f00';
        // context.translate(width,height);// 平移到此位置,
        // context.font = '23px 宋体';
        // var count = companyName.length;// 字数
        // var angle = 4 * Math.PI / (3 * (count - 1));// 字间角度
        // var chars = companyName.split("");
        // var c;
        // for (var i = 0; i < count; i++) {
        //   c = chars[i];// 需要绘制的字符
        //   if (i == 0) {
        //       context.rotate(5 * Math.PI / 6);
        //   } else{
        //       context.rotate(angle);
        //   }
        //   context.save();
        //   context.translate(70, 0);// 平移到此位置,此时字和x轴垂直，公司名称和最外圈的距离
        //   context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
        //   context.strokeText(c, 0, 0);// 此点为字的中心点
        //   context.restore();
        // }

      }
    }

  }
};
export default contractMixin;
