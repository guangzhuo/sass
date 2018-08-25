<template>
  <div class="userManage">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item>用户信息</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="user-home-h">
      <lvx-col :span="12" class="user-bg">
        <h5>基本信息</h5>
        <div class="box1-mar">
          <lvx-col :span="8">
            <div class="user-img">
              <img v-imgerror :src="user.user_avatar" class="avatar">
              <lvx-upload
                class="avatar-uploader"
                action="/user/userInfo/modifyUserAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <i class="lvx-icon-setting"></i>修改头像
              </lvx-upload>
            </div>
          </lvx-col>
          <lvx-col :span="16" class="info-text" :class="{textMar: isThree}">
            <div class="info-mar row">
              <div class="fl"><b>账户信息：</b></div>
              <div class="fl"><div class="info-color info-width text-overflow" :title="user.loginEmail">{{user.loginEmail}}</div></div>
            </div>
            <div class="info-mar row">
              <div class="fl"><b>实名信息：</b></div>
              <div class="fl">
                <div v-if="user.userCertify" class="info-color info-width text-overflow" :title="user.userCertify.relName">
                  <span v-if="user.certify_status == 2">{{ user.userCertify.relName }}</span>
                  <span v-else>-</span>
                </div>
                <div v-else-if="user.companyCertify" class="info-color text-overflow info-width" :title="user.companyCertify.corpName">
                  <span v-if="user.certify_status == 2">{{ user.companyCertify.corpName }}</span>
                  <span v-else>-</span>
                </div>
                <div v-else class="info-color">{{user.certify_status != 2 ? '-' : ''}}</div>
              </div>
            </div>
            <div class="info-mar row">
              <div class="fl"><b>有效证件：</b></div>
              <div class="fl">
                <div v-if="user.companyCertify" class="info-color">
                  <span v-if="user.certify_status == 2">{{ user.companyCertify.corpCode != null ? user.companyCertify.corpCode : '-'}}</span>
                  <span v-else>-</span>
                </div>
                <div v-else-if="user.userCertify" class="info-color">
                  <span v-if="user.certify_status == 2">{{ user.userCertify.idCard }}</span>
                  <span v-else>-</span>
                </div>
                <div v-else class="info-color">{{user.certify_status != 2 ? '-' : ''}}</div>
              </div>
            </div>
            <div class="info-mar row" v-if="isThree">
              <div class="fl"><b>关联用户：</b></div>
              <div class="fl">
                <span class="info-color" v-if="hasLinked.length < 1">未关联的第三方平台账号</span>
                <img v-imgerror v-else v-for="(app,index) in hasLinked" :key="index" class="info-img" width="30" height="30" :src="getAppImgUrl(app.appId)" :title="app.appName" />
              </div>
            </div>
            <div class="info-mar row" v-if="noLinked.length > 0">
              <sas-button category="primary" size="small" @click="addLinkDialog = true">添加关联</sas-button>
              <sas-dialog
                :show.sync="addLinkDialog"
                title="选择以下用户关联"
                width="35%"
              >
                <div class="row link-app" style="height: 400px; overflow-y: auto">
                  <div class="fl" v-for="(app,index) in noLinked" :key="index">
                    <sas-button category="gray" class="app-info text-overflow" @click="linkApp(app.sdkUserId)" :title="app.appName+':'+app.userName" style="max-width: 600px;">{{app.appName}}:{{app.userName}}</sas-button>
                  </div>
                  <sas-dialog
                    :show.sync="linkAppDialog"
                    title="关联云合同"
                    width="30%"
                    @close="closeLink('ruleForm')"
                    append-to-body="true"
                  >
                    <div style="padding: 30px 80px 30px 50px;">
                      <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                        <lvx-form-item label="手机号">
                          <sas-input v-xss disabled :model.sync="user.cellNum"></sas-input>
                        </lvx-form-item>
                        <lvx-form-item label="名称" prop="name">
                          <sas-input v-xss :model.sync="ruleForm.name" placeholder="请输入名称"></sas-input>
                        </lvx-form-item>
                        <lvx-form-item label="证件号码" prop="number">
                          <sas-input v-xss :model.sync="ruleForm.number" placeholder="请输入证件号码"></sas-input>
                        </lvx-form-item>
                        <div class="row text-center">
                          <sas-button category="primary" @click="submitForm('ruleForm')">确定</sas-button>
                        </div>
                      </lvx-form>
                    </div>
                  </sas-dialog>
                </div>
              </sas-dialog>
            </div>
          </lvx-col>
        </div>
      </lvx-col>
      <lvx-col :span="12" class="user-box">
        <div class="user-bg box2-mar">
          <div class="row">
            <lvx-col :span="12">
              <h5>签署服务</h5>
            </lvx-col>
            <lvx-col :span="12">
              <div class="fr sign-btn">
                <div class="row">
                  <router-link :to="{path:'signature'}" >
                    <sas-button category="primary" size="small" class="btn-mar">立即购买</sas-button>
                  </router-link>
                </div>
                <div class="row">
                  <router-link :to="{path:'purchaseList'}" >
                    <sas-button category="secondary" size="small">购买记录</sas-button>
                  </router-link>
                </div>
              </div>
            </lvx-col>
          </div>
          <div class="row align-center">
            <div class="inline-block relative circle-mar">
              <canvas id="time-graph-canvas"></canvas>
              <div class="row left-sign">
                <p>剩余签署份数</p>
                <p>{{user.leftSignCnt}}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <lvx-col :span="12"><span class="point-l">•&nbsp;</span>已购买(份)：{{user.totalSignCnt}}</lvx-col>
            <lvx-col :span="12" class="text-right"><span class="point-r">•&nbsp;</span>已使用(份)：{{user.usedSignCnt}}</lvx-col>
          </div>
        </div>
      </lvx-col>
      <!-- <lvx-col :span="8" class="user-bg">
        <h5>优惠活动</h5>
        <div class="box3-mar">
          <div class="text-center relative img1">
            <img v-imgerror src="~/assets/img/src/user/userManage/contract-bg.png" width="75%" height="75%">
            <div class="text-left">
              <p>1块钱签署合同</p>
              <p>套餐1000元/1000次</p>
              <router-link :to="{path:'signature'}">
                <sas-button size="small" class="box3-btn">查看详情</sas-button>
              </router-link>
            </div>
          </div>
        </div>
        <div  class="box3-mar">
          <div class="img2 relative">
            <img v-imgerror src="~/assets/img/src/user/userManage/coin-label.png" width="50" height="60">
            <img v-imgerror src="~/assets/img/src/user/userManage/coin-icon.png" width="70" height="70">
            <div class="coin">你的云币：<span>{{ user.balance }}</span></div>
            <sas-button class="link-span" @click="getCoinDialog = true">如何获取</sas-button>
            <sas-dialog
              :show.sync="getCoinDialog"
              title="如何获取云币？"
              width="700px"
            >
              <div ><img v-imgerror src="~/assets/img/src/user/userManage/getCoin.png" width="100%"></div>
            </sas-dialog>
          </div>
        </div>
      </lvx-col> -->
    </div>
    <div class="manage-security">
      <img v-imgerror src="~/assets/img/src/user/userManage/manage-security.png" width="20" height="20">安全保障
    </div>
    <div class="user-manage-h">
      <lvx-col :span="6">
        <div class="align-center">
          <div class="inline-block">
            <i class="iconsprite icon-phone"></i>
            <p>绑定手机</p>
          </div>
          <div class="security-color">
            <p>绑定手机登录，增强信息安全</p>
            <p>已绑定</p>
          </div>
          <router-link :to="{path:'/manage/user/mobile/modifyMobile'}">
            <sas-button category="secondary">修改手机号</sas-button>
          </router-link>
        </div>
      </lvx-col>
      <lvx-col :span="6">
        <div class="align-center">
          <div class="inline-block">
            <i class="iconsprite icon-name"></i>
            <p>实名认证</p>
          </div>
          <div class="security-color">
            <p>关联实名信息，加强安全堡垒</p>
            <p :class="{status0:isStatus0,status1:isStatus1,status3:isStatus3}">{{cerStatus[parseInt(user.certify_status)]}}</p>
          </div>
          <div v-if="user.certify_status == 2 || (user.over == 1 && user.certify_status == 1)">
            <sas-button category="secondary" disabled>{{cerOperation[parseInt(user.certify_status)]}}</sas-button>
          </div>
          <div v-else>
            <sas-button category="secondary" @click="toAuthView">{{cerOperation[parseInt(user.certify_status)]}}</sas-button>
          </div>
        </div>
      </lvx-col>
      <lvx-col :span="6">
        <div class="align-center">
          <div class="inline-block">
            <i class="iconsprite icon-password"></i>
            <p>登录密码</p>
          </div>
          <div class="security-color">
            <p>防止信息泄露，重新设置密码</p>
            <p>已设置</p>
          </div>
          <router-link :to="{path:'/manage/user/password/modifyPwd'}">
            <sas-button category="secondary">修改密码</sas-button>
          </router-link>
        </div>
      </lvx-col>
      <lvx-col :span="6">
        <div class="align-center">
          <div class="inline-block">
            <i class="iconsprite icon-question"></i>
            <p>密保问题</p>
          </div>
          <div class="security-color">
            <p>设置问题验证，防止密码篡改</p>
            <p v-if="user.hasQueston" class="status0">未设置</p>
            <p v-else>已设置</p>
          </div>
          <router-link v-if="user.hasQueston" :to="{path:'/manage/user/password/addPwdProtection'}">
            <sas-button category="secondary">设置密保</sas-button>
          </router-link>
          <router-link v-else :to="{path:'/manage/user/password/resetPwdProtection'}">
            <sas-button category="secondary">重置密保</sas-button>
          </router-link>
        </div>
      </lvx-col>
    </div>
    <sas-cert-choose :show.sync="showCertChoose"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import base from '~/framework/core/vue-base'
  import dialogCertChoose from '~/components/dialog/dialog-cert-choose'
  export default{
    name:'userManage',
    layout: 'manager',
    extends:base,
    metaInfo:{
      title:'我的信息-云合同'
    },
    data(){
      return {
        user:{
          user_avatar:''
        },
        cerStatus: ['未认证', '认证中', '已认证', '认证失败','未完成'],
        cerOperation: ['立即认证', '认证中', '已认证', '重新认证','继续认证'],
        ruleForm:{
          phone: '',
          name: '',
          number: ''
        },
        addLinkDialog: false, //添加关联
        getCoinDialog: false, //获取云币
        linkAppDialog: false, //关联云合同
        isStatus0: false,
        isStatus1: false,
        isStatus3: false,
        circleWidth: 200,
        circleHeight: 200,
        lineHeight: 22,
        screenWidth: document.body.clientWidth,
        showCertChoose: false,
        rules:{
          name:[
            { required: true, message: '名称必填', trigger: 'change' },
            { max: 50, message: '名称必须小于50位', trigger: 'change' }
          ],
          number:[
            { required: true, message: '证件号码必填', trigger: 'blur' },
            { max: 30, message: '证件号码必须小于30位', trigger: 'blur' }
          ],
        }
      }
    },
    async fetchData (to, context) {
      let self = context;
      const r = await self.$axios({
          method: 'get',
          url: apis.getThirdUserList,
        })
        .then((res)=> res.data);
      var thirdUser = r.data;
      var hasLinked1 = [];
      var noLinked1 = [];
      if(thirdUser.length != 0){
        self.$store.state.myAccount.userManage.isThree = true;
      }
      for(var i=0;i<thirdUser.length;i++){
        if(thirdUser[i].linked == true){
          hasLinked1 = hasLinked1.concat(thirdUser[i]);
        }else{
          noLinked1 = noLinked1.concat(thirdUser[i]);
        }
      }
      self.$store.state.myAccount.userManage.hasLinked = hasLinked1;
      self.$store.state.myAccount.userManage.noLinked = noLinked1;
  },
  computed: {
  ...mapState({
        hasLinked: state => state.myAccount.userManage.hasLinked,
        noLinked: state => state.myAccount.userManage.noLinked,
        isThree: state => state.myAccount.userManage.isThree,

    })
  },
  components: {
      'sas-cert-choose': dialogCertChoose
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val;
    }
  },
  mounted(){
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      if(that.screenWidth > 1600){
        that.circleWidth = 200;
        that.circleHeight = 200;
        that.lineHeight = 22;
      }
      if(that.screenWidth <= 1600){
        that.circleWidth = 180;
        that.circleHeight = 180;
        that.lineHeight = 20;
      }
      if(that.screenWidth <= 1366){
        that.circleWidth = 150;
        that.circleHeight = 150;
        that.lineHeight = 16;
      }
      this.userInit();
    })()
    }
    if(that.screenWidth > 1600){
      that.circleWidth = 200;
      that.circleHeight = 200;
      that.lineHeight = 22;
    }
    if(that.screenWidth <= 1600){
      that.circleWidth = 180;
      that.circleHeight = 180;
      that.lineHeight = 20;
    }
    if(that.screenWidth <= 1366){
      that.circleWidth = 150;
      that.circleHeight = 150;
      that.lineHeight = 16;
    }
    this.userInit();
  },
  methods:{
    async userInit(){
      let self = this;
      const userInfo = new Promise(function (resolve, reject) {
        self.$axios({
            method: 'get',
            url: apis.userInfo,
          })
          .then(function (res) {
            self.user = res.data.data;
            var usePercent = self.user.usePercent;
            if(usePercent > 100){
              usePercent = 100;
            }
            var time_canvas = document.getElementById("time-graph-canvas");
            self.drawMain(time_canvas,100 - usePercent, "#4081ff", "#e6ebf6");
            self.user.usedSignCnt = self.user.totalSignCnt - self.user.leftSignCnt;
            self.user.leftSignCnt = String(self.user.leftSignCnt).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
            self.user.totalSignCnt = String(self.user.totalSignCnt).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
            self.user.usedSignCnt = String(self.user.usedSignCnt).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
            if(self.user.certify_status == 0){
              self.isStatus0 = true;
            }
            if(self.user.certify_status == 1){
              self.isStatus1 = true;
            }
            if(self.user.certify_status == 3){
              self.isStatus3 = true;
            }
            if(self.user.companyCertify.licenseNum != ''){
              self.user.companyCertify.companyCardNum = self.user.companyCertify.licenseNum
            }else{
              self.user.companyCertify.companyCardNum = self.user.companyCertify.corpCode
            }
          })
      });
      return userInfo
    },
    /* 上传头像 */
    handleAvatarSuccess(res, file) {
      return(this.user.user_avatar = URL.createObjectURL(file.raw));
    },
    /* 图片不超过2M */
    beforeAvatarUpload(file){
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPEG && !isJPG && !isGIF && !isPNG && !isBMP) {
        const message = this.$createMessage({
          type:'info',
          duration:3000,
          spinnerText:'图片格式不正确'
        });
      }
      if (!isLt2M) {
        const message = this.$createMessage({
          type:'info',
          duration:3000,
          spinnerText:'上传图片大小不能超过 2MB!'
        });
      }
      return(isJPEG || isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    /* 第三方APP */
    getAppImgUrl(appId){
      return  '/user/userInfo/appImgShow?appId='+appId;
    },
    linkApp(appId){
      this.linkAppDialog = true;
      sessionStorage.setItem("appId",appId);
    },
    closeLink(formName){
      this.$refs[formName].resetFields();
    },
    /*关联第三方*/
    async submitForm(formName){
      var appName = this.ruleForm.name;
      var appNumber = this.ruleForm.number;
      var appId = sessionStorage.getItem("appId");
      const self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios({
            method: 'get',
            url: apis.linkUser,
            params: {'sdkUserId':appId,'name':appName,'cardNumber':appNumber},
          }).then(function(res){
            if(res.data.code == 200 && res.data.success){
              self.linkAppDialog = false;
              const message = self.$createMessage({
                type:'success',
                duration:3000,
                spinnerText:'关联成功'
              });
              location.reload();
              self.$refs[formName].resetFields();
            }else{
              const message = self.$createMessage({
                type:'error',
                duration:3000,
                spinnerText:res.data.msg
              })
            }
          }).catch(() => {
            this.$message({
            type: 'error',
            message: '关联失败'
          });
        });
        } else {
          return false;
    }
    });
    },
    toAuthView(){
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
      /*switch(this.user.userType) {
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
          if(this.user.certify_status == '0' || this.user.certify_status == '3') { //实名认证 、认证失败
            this.$router.push({path: '/manage/user/check/company', query: {tab: 0}});
          /!*if(this.user.certify_status == '1') { //认证中
            this.$router.push({path: '/manage/user/check/company', query: {tab: 1}});*!/
            //go 企业基础认证页面
          } else if(this.user.certify_status == '4') { //继续认证
            this.$router.push({path: '/manage/user/check/company', query: {tab: 1}});
            //go 企业增强认证页面
          } else if(this.user.certify_status == '2') { //认证成功
            //go 个人基础信息页面
            this.$router.push({name: 'manage-user-manage-userManage'});
          }
          break;
        default:
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText:'账号异常，请联系客服'
          });
          break;
      }*/
    },
    /* 绘制圆环 */
    drawMain(drawing_elem, percent, forecolor, bgcolor) {
      /*
       @drawing_elem: 绘制对象
       @percent：绘制圆环百分比, 范围[0, 100]
       @forecolor: 绘制圆环的前景色，颜色代码
       @bgcolor: 绘制圆环的背景色，颜色代码
       */
      var context = drawing_elem.getContext("2d");
      drawing_elem.width = this.circleWidth;
      drawing_elem.height = this.circleHeight;
      var center_x = drawing_elem.width / 2;
      var center_y = drawing_elem.height / 2;
      var rad = Math.PI*2/100;
      var speed = 0;
      var lineHeight = this.lineHeight;
      // 绘制背景圆圈
      function backgroundCircle(){
        context.save();
        context.beginPath();
        context.lineWidth = lineHeight; //设置线宽
        var radius = center_x - context.lineWidth;
        context.lineCap = "round";
        context.strokeStyle = bgcolor;
        context.arc(center_x, center_y, radius, 0, Math.PI*2, false);
        context.stroke();
        context.closePath();
        context.restore();
      }

      //绘制运动圆环
      function foregroundCircle(n){
        context.save();
        context.strokeStyle = forecolor;
        context.lineWidth = lineHeight;
        context.lineCap = "round";
        var radius = center_x - context.lineWidth;
        context.beginPath();
        context.arc(center_x, center_y, radius , Math.PI/2, Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
      }
      function text(n){
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = forecolor;
        var font_size = 40;
        context.font = font_size + "px Helvetica";
        var text_width = context.measureText(n.toFixed(0)+"%").width;
        context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);
        context.restore();
      }

      //执行动画
      (function drawFrame(){
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
        backgroundCircle();
        if(percent != 0){
          foregroundCircle(speed);
        }
        if(speed >= percent) return;
        speed += 1;
      }());
    }
  }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/base.scss";
  @mixin h{height: 100%;}
  .userManage{
  @include responsive-default {
    margin: 0 auto;
    height: 100%;
    min-height: 630px;
    .fl{float: left;}
    .fr{float: right;}
    .clear-both{clear: both}
    .block{display: block;}
    .inline-block{display: inline-block}
    .align-center{text-align: center}
    .relative{position: relative}
    .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}

    .user-home-h{
      font-size: 12px;
      height: 48%;
      margin-top: 20px;
      .user-box{padding: 0 3vh; @include h;}
      .user-bg{@include h; background-color: white; padding: 5vh 6.4vh;  overflow: hidden; /*min-height: 255px; */}
      .sign-btn{
      .btn-mar{margin: 10px 0;}
        button{padding: 5px;}
      }
      .info-color{color: #959595;}
      .info-img{padding: 0 5px 5px 0;}
      .box1-mar{
        margin-top: 30px;
      .user-img{
        margin-top: 3vh;
        display: inline-block;
        .avatar{
          width: 80px;
          height: 80px;
          border-radius: 40px;
          padding: 2px;
          border: 2px solid #c1c1c1;
          background-color: #fff; text-align: center;
        }
        .avatar-uploader{
          text-align: center;
          color: #959595;
          margin-top: 15px;
        .lvx-upload {
          font-size: 12px;
          color: #959595;
        }
      }
    }
    .textMar{margin-top: 1vh;}
    .link-app{
      padding: 20px; min-height: 200px;
      .app-info{margin: 5px 10px; border-radius: 0;}
      .app-pad{
        padding: 30px 80px 30px 50px;
        button{width: 100px;}
      }
    }
  }
  .box2-mar{
    .circle-mar{margin-top: 0}
    .left-sign{
      font-size: 14px;position: absolute; top: 75px; left: 60px;
      p:last-child{font-size: 24px;}
    }
    .point-l{font-size: 18px;}
    .point-r{font-size: 18px; color:#7691ce}
  }
  .box3-mar{
    margin-top: 20px;
    .img1{
      background-color: #4081ff; color: #fff; width: 100%; min-height: 88px;
    div{
      position: absolute; top: 22px; left: 40px;
      p:first-child{font-size: 18px; margin-bottom: 0;}
      p:nth-child(2){font-size: 14px; margin-bottom: 12px;}
      .box3-btn{border:1px solid #fff; color: #fff; padding: 5px;
      &:hover{background-color: #4081ff;}}
      }
    }
    .img2{
      background-color: #fff8f1; width: 100%; color: #ffc466; height: 110px;
      img:first-child{position: absolute; right: 0;}
      img:nth-child(2){position: absolute; top: 22px; left: 45px;}
      .coin{
        position: absolute; top: 32px; left: 140px; font-size: 14px;
      span{font-size: 24px;}
      }
      .link-span{
        color: #9b9997;text-decoration: underline; position: absolute; bottom: 10px; right: 30px;
        padding:0;background-color: #fff8f1; border:none; font-size: 12px;
      &:hover{color: #96a9d3; text-decoration: none;}
      }
    }
  }
  }
    .manage-security{
      padding: 15px 0; font-size: 12px;
      img{margin-right: 10px;}
      }
    .user-manage-h{
      height: calc(52% - 74px); border-radius: 2px; background-color: #fff; padding: 7vh 0; overflow: hidden;
      .inline-block{
      p{margin: 10px 0 20px;}
      }
    .icon-phone{
      background-image: url('~assets/img/src/user/userManage/message.png');
      background-position: -14px -18px;
      width: 64px; height: 40px;
    }
    .icon-name{
      background-image: url('~assets/img/src/user/userManage/message.png');
      background-position: -14px -88px;
      width: 64px; height: 40px;
    }
    .icon-password{
      background-image: url('~assets/img/src/user/userManage/message.png');
      background-position: -14px -157px;
      width: 64px; height: 40px;
    }
    .icon-question{
      background-image: url('~assets/img/src/user/userManage/message.png');
      background-position: -14px -226px;
      width: 64px; height: 40px;
    }
    .security-color{
      color: #959595; font-size: 12px; margin-bottom: 30px;
      p{margin-bottom: 20px;}
      .status0{color: #4081ff;}
      .status1{color: #fc8f28;}
      .status3{color: #e60000;}
    }
    button{width: 112px;}
    }
  }
  .info-text{
    margin-top: 4vh;
    .info-mar{margin-bottom: 20px}
  }
  /*.info-width{width: 240px}*/
  @media (max-width: 1600px) {
    .info-text{.info-mar{margin-bottom: 18px}}
    .info-width{width: 180px}
    .user-home-h{
      .user-bg{padding: 3vh 4.5vh}
      .box2-mar{
      .circle-mar{margin-top: -10px;}
      .left-sign{top: 66px; left: 48px;}
      }
      .box3-mar{
        margin-top: 15px;
        .img1{
        div{
          top: 13px; left: 35px;
        }
      }
    }
  }
  .user-manage-h{
    padding: 5.2vh 0;
    .security-color {
      margin-bottom: 20px;
      p {margin-bottom: 15px;}
      }
    }
  }
  @media (max-width: 1366px) {
    .info-text{.info-mar{margin-bottom: 10px}}
    .info-width{width: 130px}
    .user-home-h{
      height: 46%;
      .user-bg{padding: 1.5vh 4vh}
      .box1-mar{
        margin-top: 20px;
        .textMar{margin-top: 0;}
      }
      .box2-mar{
      .circle-mar{margin-top: -20px;}
      .left-sign{
        font-size: 12px; top: 55px; left: 40px;
        p:last-child{font-size: 18px;}
        }
      }
      .box3-mar{
        margin-top: 12px;
        .img1{
          div{
            top: 10px; left: 25px;
          p:first-child{font-size: 16px;}
          p:nth-child(2){margin-bottom: 5px;}
          }
        }
        .img2{
          height: 85px;
        img:nth-child(2){top: 12px; left: 30px; width: 65px;}
        .coin{
          top: 25px; left: 110px; font-size: 12px;
          span{font-size: 20px;}
          }
        }
      }
    }
    .user-manage-h{
      padding: 2vh 0;
      .inline-block{
        p{margin: 5px 0 10px;}
      }
      .security-color {
        margin-bottom: 12px;
        p {margin-bottom: 8px;}
        }
      }
    }
  }
  @media(max-width: 1366px){
    .userManage{
      min-height: 540px;

    }
  }
</style>
