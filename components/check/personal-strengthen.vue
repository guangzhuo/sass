<template>
  <div class="personstreng">
    <!--<header class="message-line float-left">请上传有效证件照：</header>-->
    <!--证件面板 -->
    <section class="idcard" >

      <lvx-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        status-icon
        label-width="130px"
        class="demo-ruleForm">
        <lvx-form-item label="证件类型： ">
          <lvx-radio-group v-model="radioType" @change="thatRadio">
            <lvx-radio label="1">身份证</lvx-radio>
            <lvx-radio label="4">港澳通行证</lvx-radio>
            <lvx-radio label="5">台胞证</lvx-radio>
            <lvx-radio label="2">护照</lvx-radio>
          </lvx-radio-group>
        </lvx-form-item>
        <lvx-form-item label="真实姓名： " prop="name">
          <lvx-input
            type="text"
            class="sammWidth"
            placeholder="请输入你的真实姓名"
            v-model.trim="ruleForm2.name"
            auto-complete="off"></lvx-input>
        </lvx-form-item>
        <lvx-form-item label="证件号：" prop="cardId">
          <lvx-input
            type="text"
            class="sammWidth"
            placeholder="请输入你的证件号"
            ref="cardIdInput"
            :autofocus="autofocus"
            v-model.trim="ruleForm2.cardId"
            auto-complete="off"></lvx-input>
        </lvx-form-item>
        <lvx-form-item label="证件照片：">

          <!--身份证-->
          <div v-show="radioType === '1'">
            <!--身份证正面 v-if="cardType == 1"-->
            <section class="personstreng-content-front" >
              <div class="upload-right">
                <div class="demo-idcard-front"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="fileCardFront" :src="fileCardFront.url" class="avatar">
                  <i v-else class="personpic1"></i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessCardFront"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
            <!--身份证反面 v-if="cardType == 1"-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-idcard-reverse"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="fileCardReverse" :src="fileCardReverse.url" class="avatar">
                  <i v-else class="personpic2"></i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessCardReverse"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>

            <!--身份证手持-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-hand-card"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="fileHandCard" :src="fileHandCard.url" class="avatar">
                  <i v-else class="personpic3"></i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handCardReverse"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
          </div>

          <!--港澳通行证-->
          <div v-show="radioType === '4'">
            <!--港澳通行正面 v-if="cardType == 1"-->
            <section class="personstreng-content-front" >
              <div class="upload-right">
                <div class="demo-idcard-front ganAoCard01"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="ganAoCard01" :src="ganAoCard01.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">往来港澳通行证正面</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessGanAoCard01"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
            <!--港澳通行反面 v-if="cardType == 1"-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-idcard-reverse ganAoCard02"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="ganAoCard02" :src="ganAoCard02.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">入境证明</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessGanAoCard02"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>

            <!--港澳通行手持-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-hand-card ganAoCard03"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="ganAoCard03" :src="ganAoCard03.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">手持证件照</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessGanAoCard03"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
          </div>

          <!--台胞证-->
          <div v-show="radioType === '5'">
            <section class="personstreng-content-front" >
              <div class="upload-right">
                <div class="demo-idcard-front TaiBaoZ01"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="TaiBaoZ01" :src="TaiBaoZ01.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">台胞证正面</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessTaiBaoZ01"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
            <!--港澳通行反面 v-if="cardType == 1"-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-idcard-reverse TaiBaoZ02"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="TaiBaoZ02" :src="TaiBaoZ02.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">入境证明</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessTaiBaoZ02"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>

            <!--港澳通行手持-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-hand-card TaiBaoZ03"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="TaiBaoZ03" :src="TaiBaoZ03.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">手持证件照</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessTaiBaoZ03"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
          </div>

          <!--护照 2-->
          <div v-show="radioType === '2'">
            <!--护照正面 v-if="cardType == 1"-->
            <section class="personstreng-content-front" >
              <div class="upload-right">
                <div class="demo-idcard-front HuZhao01"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="HuZhao01" :src="HuZhao01.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">护照正面</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessHuZhao01"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
            <!--护照反面 v-if="cardType == 1"-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-idcard-reverse HuZhao02"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="HuZhao02" :src="HuZhao02.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">入境证明</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessHuZhao02"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>

            <!--护照手持-->
            <section class="personstreng-content-reverse" >
              <div class="upload-right">
                <div class="demo-hand-card HuZhao03"></div>
                <div class="image-upload-button">示例图片</div>
              </div>
              <div class="upload-left">
                <div class="cert-upload-example">
                  <img v-if="HuZhao03" :src="HuZhao03.url" class="avatar">
                  <i v-else class="lvx-icon-plus">
                    <span class="plus-fontSize">手持证件照</span>
                  </i>
                </div>
                <lvx-upload
                  class="upload-first"
                  action="/user/file/uploadAuthImg"
                  :on-success="handleSuccessHuZhao03"
                  :show-file-list="false"
                  :accept="mime.certificationAttachment"
                  :on-disallow="handelDisallow"
                  :before-upload="handleUploadBefore"
                >
                  <lvx-button size="small" type="primary" class="firstclick">点击上传</lvx-button>
                </lvx-upload>
              </div>
            </section>
          </div>

        </lvx-form-item>
        <lvx-form-item>
          <sas-button category="primary" @click="submitCertification">提交认证</sas-button>
        </lvx-form-item>
      </lvx-form>


    </section>

    <!--<footer class="button-width">
      <div class="message">*证件上传（支持格式：GIF,JPG,JPEG,BMP,PNG;≤2M）</div>
      <sas-button category="gray" @click="goBack">返回上一步</sas-button>
      <sas-button category="primary" @click="submitCertification">提交认证</sas-button>
    </footer>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import apis from '~/config/api'
import _ from 'lodash'
import mime from '~/mixins/mime'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      }
      if(value.length > 25) {
        return callback(new Error('姓名长度不超过 25 个字符'));
      }
      callback();
    };
    var checkCardId = (rule, value, callback) => {
      let val_length = value&&value.length
      if (!value) {
        return callback(new Error('证件号不能为空'));
      }

      /*
      *
      * <lvx-radio label="1">身份证</lvx-radio>
            <lvx-radio label="4">港澳通行证</lvx-radio>
            <lvx-radio label="5">台胞证</lvx-radio>
            <lvx-radio label="2">护照</lvx-radio>
      * */
      switch(this.radioType) {
        case '1':
          /*if (val_length < 8 || val_length > 24) {
            return callback(new Error('身份证长度为 8-24 个字符'));
          }*/
          if( !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(value)){
            return callback(new Error('身份证格式不正确'));
          }
          /*if(/[\u4E00-\u9FA5]/g.test(value)) {
            return callback(new Error('身份证不能含有中文'));
          }*/
          callback();
          break;
        case '4':
          if (val_length != 11) {
            return callback(new Error('港澳通行证长度为11个字符'));
          }
          callback();
          break;
        case '5':
          if (val_length != 8) {
            return callback(new Error('台胞证长度为8个字符'));
          }
          callback();
          break;
        case '2':
          if (val_length > 20) {
            return callback(new Error('护照长度不能大于20个字符'));
          }
          callback();
          break;
      }
      callback();

    };
    return {
      fileCardFront: null, //身份证正面上传图片
      fileCardReverse: null, //身份证反面上传图片
      filePassport: null, //护照上传照片
      fileOfficerCard: null, //军官证上传照片
      fileHandCard: null, //手持身份证
      ganAoCard01: null, //港澳通行证01
      ganAoCard02: null, //港澳通行证02
      ganAoCard03: null, //港澳通行证03
      TaiBaoZ01: null, //台胞证01
      TaiBaoZ02: null, //台胞证02
      TaiBaoZ03: null, //台胞证03
      HuZhao01: null, //护照01
      HuZhao02: null, //护照02
      HuZhao03: null, //护照03
      mime: mime,
      radioType: '1',
      autofocus: false,
      ruleForm2: {
        name:  '',
        cardId: '',
      },
      rules2: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        cardId: [
          { validator: checkCardId, trigger: 'blur' }
        ]
      },
    }
  },

  computed: {
   /* ...mapState({
      userCertifization: state => state.User.Check.Personal.userCertifization
    })*/
   /* ...mapState({
      cardType: state => state.User.Check.Personal.cardType
    })*/
  },
  props: {
    show: Boolean
  },
  created() {
    this.defauleData()
  },
  mounted () {
  },
  watch: {
    show () {
      this.visible = this.show;
    }
  },
  mixins: [{

  }],
  methods: {
    /*初始信息*/
    defauleData() {
      this.$axios.get(apis.getUserBaseInfo).then((data)=>{
        if(data.data.success) {
          // self.$store.state.User.Check.Personal.userCertifization = r.data;
          let datas = data.data.data;
          this.radioType = datas.idType || '1';
          this.ruleForm2.name = datas.relName;
          this.ruleForm2.cardId = datas.idCard;
          if(datas.reserve1){
            this.$emit('next-type', datas.reserve1);
          }
        }
      });
    },

    thatRadio(val) {
      if(this.ruleForm2.cardId) {
        this.$refs.cardIdInput.$el.children[0].focus()
        this.$refs.cardIdInput.$el.children[0].blur()
      }

      // console.log(this.$refs.cardIdInput.$el.children[0].focus())
      // this.autofocus = false;

    },
    /*
    返回到基础信息认证
    */
    goBack() {
      this.$emit('after-pre');
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    /*
    上传文件超出限制Mime类型
    */
    handelDisallow() {
      this.$createMessage({
        type:'error',
        duration:3000,
        spinnerText: '请上传正确格式文件'
      })
    },
    /*
    上传前检查文件大小
    */
    handleUploadBefore(file) {
      if(file) {
        let sizeB = file.size; //文件字节
        let sizeM = sizeB/1024/1024; //文件Mb
        if(sizeM > 5) {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '请上传5M以下图片'
          })
          return false;
        }
      }
    },
    handleSuccessCardFront(res, file){
      this.fileCardFront = file;
    },
    handleSuccessCardReverse(res, file){
      this.fileCardReverse = file;
    },
    handleSuccessPassport(res, file){
      this.filePassport = file;
    },
    handleSuccessOfficerCard(res, file){
      this.fileOfficerCard = file;
    },
    handCardReverse(res, file) {
      this.fileHandCard = file;
    },
    /*港澳*/
    handleSuccessGanAoCard01(res, file) {
      this.ganAoCard01 = file //港澳通行证01
    },
    handleSuccessGanAoCard02(res, file) {
      this.ganAoCard02 = file //港澳通行证02
    },
    handleSuccessGanAoCard03(res, file) {
      this.ganAoCard03 = file //港澳通行证03
    },

    /*台胞证*/
    handleSuccessTaiBaoZ01(res, file) {
      this.TaiBaoZ01 = file
    },
    handleSuccessTaiBaoZ02(res, file) {
      this.TaiBaoZ02 = file
    },
    handleSuccessTaiBaoZ03(res, file) {
      this.TaiBaoZ03 = file
    },

    /*护照 HuZhao01*/
    handleSuccessHuZhao01(res, file) {
      this.HuZhao01 = file
    },
    handleSuccessHuZhao02(res, file) {
      this.HuZhao02 = file
    },
    handleSuccessHuZhao03(res, file) {
      this.HuZhao03 = file
    },

    /*人工认证老接口*/
    addBaseInfoFun() {
      let url = apis.addBaseInfo;
      let data = {
        'idType': this.radioType,
        'relName': this.ruleForm2.name,
        'idCard': this.ruleForm2.cardId
      }
      this.$axios.post(url, data).then((data)=>{
        let datas = data.data;
        if(datas.success) {
          this.addMoreInfoFun();
        } else {
          this.$emit('next-type', datas.msg)
        }

      })
    },
    async addMoreInfoFun() {
      let postData = {};
      let thatFile = {
        '1': [
          this.fileCardFront && this.fileCardFront.response.data.fileName,
          this.fileCardReverse && this.fileCardReverse.response.data.fileName,
          this.fileHandCard && this.fileHandCard.response.data.fileName
        ],
        '4': [
          this.ganAoCard01 && this.ganAoCard01.response.data.fileName,
          this.ganAoCard02 && this.ganAoCard02.response.data.fileName,
          this.ganAoCard03 && this.ganAoCard03.response.data.fileName
            ],
        '5': [
          this.TaiBaoZ01 && this.TaiBaoZ01.response.data.fileName,
          this.TaiBaoZ02 && this.TaiBaoZ02.response.data.fileName,
          this.TaiBaoZ03 && this.TaiBaoZ03.response.data.fileName
            ],
        '2': [
          this.HuZhao01 && this.HuZhao01.response.data.fileName,
          this.HuZhao02 && this.HuZhao02.response.data.fileName,
          this.HuZhao03 && this.HuZhao03.response.data.fileName
            ],
      }
      switch(this.radioType) {
        case '1':
          postData.idCardImgA = thatFile[this.radioType][0];
          postData.idCardImgB = thatFile[this.radioType][1];
          postData.idCardImgAnp = thatFile[this.radioType][2];
          break;
        case '4':
          postData.idCardImgA = thatFile[this.radioType][0];
          postData.idCardImgB = thatFile[this.radioType][1];
          postData.idCardImgAnp = thatFile[this.radioType][2];
          break;
        case '5':
          postData.idCardImgA = thatFile[this.radioType][0];
          postData.idCardImgB = thatFile[this.radioType][1];
          postData.idCardImgAnp = thatFile[this.radioType][2];
          break;
        case '2':
          postData.idCardImgA = thatFile[this.radioType][0];
          postData.idCardImgB = thatFile[this.radioType][1];
          postData.idCardImgAnp = thatFile[this.radioType][2];
          break;
      }
      const r = await this.$axios.post(apis.addMoreInfo, postData).then((data)=>data.data);
      if(r.code == 200) {
        this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '认证已提交'
        });
        // this.$router.push({path: '/manage'});
        this.$emit('next-type')
      } else {
        this.$emit('next-type', data.data.msg)
        /*this.$createMessage({
          type:'success',
          duration:3000,
          spinnerText: '认证错误'
        });*/
      }
    },
    /*
    提交认证信息
    */
     submitCertification() {
      if(this.checkBeforeSubmit()) {
        this.addBaseInfoFun()
      }
    },
    /*
    提交认证前校验
    */
    checkBeforeSubmit() {
      if(!this.ruleForm2.name) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '姓名不能为空'
        });
        return false;
      }else if(!this.ruleForm2.cardId) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '证件号不能为空'
        });
        return false;
      }else if(/[\u4E00-\u9FA5]/g.test(this.ruleForm2.cardId)) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '证件号不能有中文'
        });
        return false;
      }

      /*
      *  <lvx-radio label="1">身份证</lvx-radio>
            <lvx-radio label="4">港澳通行证</lvx-radio>
            <lvx-radio label="5">台胞证</lvx-radio>
            <lvx-radio label="2">护照</lvx-radio>

            ganAoCard01: null, //港澳通行证01
      ganAoCard02: null, //港澳通行证02
      ganAoCard03: null, //港澳通行证03
      TaiBaoZ01: null, //台胞证01
      TaiBaoZ02: null, //台胞证02
      TaiBaoZ03: null, //台胞证03
      HuZhao01: null, //护照01
      HuZhao02: null, //护照02
      HuZhao03: null, //护照03
      * */
      switch (this.radioType) {
        case '1': //身份证
          if(!this.fileCardFront) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传身份证正面'
            });
            return false;
          } else if (!this.fileCardReverse) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传身份证反面'
            });
            return false;
          }else if (!this.fileHandCard) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传手持身份证'
            });
            return false;
          }
          return true;
          break;
        case '4': //港澳通行证
          if(!this.ganAoCard01) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传港澳通行证正面'
            });
            return false;
          } else if (!this.ganAoCard02) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传港澳通行证反面'
            });
            return false;
          }else if (!this.ganAoCard03) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传手持港澳通行证'
            });
            return false;
          }
          return true;
          break;
        case '5': //台胞证
          if(!this.TaiBaoZ01) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传台胞证正面'
            });
            return false;
          } else if (!this.TaiBaoZ02) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传台胞证反面'
            });
            return false;
          }else if (!this.TaiBaoZ03) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传手持台胞证'
            });
            return false;
          }
          return true;
          break;
        case '2': //护照
          if(!this.HuZhao01) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传护照证正面'
            });
            return false;
          } else if (!this.HuZhao02) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传护照证反面'
            });
            return false;
          }else if (!this.HuZhao03) {
            this.$createMessage({
              type:'error',
              duration:3000,
              spinnerText: '请上传手持护照证'
            });
            return false;
          }
          return true;
          break;
      }

    }
  },
  components: {
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~styles/base.scss";
.personstreng{
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  /*align-items: center;*/
  @include responsive-default {
    .message-line {
      // margin-bottom: 13px;
    }
    .float-left {
      width: 540px;
      float: left;
      margin-top: 25px;
      font-size: 15px;
    }
    .lvx-icon-plus{
      font-size:30px;
      font-weight: bold;
      color:#666;
    }
    .plus-fontSize{
      display: block;
      font-size:14px;
      padding-top: 24px;
    }
    .personstreng-content-front,.personstreng-content-reverse, .personstreng-content-officer-card, .personstreng-content-passport{
      width: 540px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: flex-start;
      margin-top: 40px;
    }
    .personstreng-content-front{
      margin-top: 0;
    }
    .upload-left{
      width: 50%;
    }
    .upload-right{
      width: 50%;
    }
    .cert-upload-example{
      border: 1px dashed #E1E1E1;
      width: 237px;
      height: 189px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .upload-first{
      width: 237px;
      margin-top: 10px;
      text-align: center;
    }
    .personpic1{
      background: url("~assets/img/src/certify/noId.png") no-repeat;
      display: inline-block;
      width: 146px;
      height: 143px;
      vertical-align: middle;
      background-size: contain;
    }
    .personpic2{
      background: url("~assets/img/src/certify/noIdR.png") no-repeat;
      display: inline-block;
      width: 146px;
      height: 143px;
      vertical-align: middle;
      background-size: contain;
    }
    .personpic3{
      background: url("~assets/img/src/certify/demo-no-card-left.png") no-repeat;
      display: inline-block;
      width: 146px;
      height: 143px;
      vertical-align: middle;
      background-size: contain;
    }
    .passport-bg-left{
      background: url("~assets/img/src/certify/company.png") no-repeat;
      display: inline-block;
      width: 120px;
      height: 143px;
      vertical-align: middle;
    }
    .officer-card-bg-left{
      background: url("~assets/img/src/certify/company.png") no-repeat;
      display: inline-block;
      width: 120px;
      height: 143px;
      vertical-align: middle;
    }
    .avatar{
      padding: 2px;
      max-height: 188px;
      max-width: 236px;
      vertical-align: middle;
    }
    .demo-idcard-front,.demo-idcard-reverse, .demo-officer-card, .demo-passport,.demo-hand-card{
      border: 1px dashed #E1E1E1;
      width: 237px;
      height: 189px;
      text-align: center;
      line-height: 189px;
    }

    .demo-hand-card::before{
      content:'';
      background: url("~assets/img/src/certify/demo-no-card-right.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .demo-idcard-front::before{
      content:'';
      background: url("~assets/img/src/certify/id.png") no-repeat;
      display: inline-block;
      background-size: 195px 123px;
      width: 236px;
      height: 188px;
      margin: 34px 22px;
    }
    .demo-idcard-reverse::before{
      content:'';
      background: url("~assets/img/src/certify/idR.png") no-repeat;
      display: inline-block;
      background-size: 195px 123px;
      width: 236px;
      height: 188px;
      margin: 34px 22px;
    }


    .ganAoCard01::before{
      content:'';
      background: url("~assets/img/src/certify/Ao01.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .ganAoCard02::before{
      content:'';
      background: url("~assets/img/src/certify/Ao02.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .ganAoCard03::before{
      content:'';
      background: url("~assets/img/src/certify/Ao03.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }



    .TaiBaoZ01::before{
      content:'';
      background: url("~assets/img/src/certify/TaiBaoZ01.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .TaiBaoZ02::before{
      content:'';
      background: url("~assets/img/src/certify/TaiBaoZ02.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .TaiBaoZ03::before{
      content:'';
      background: url("~assets/img/src/certify/TaiBaoZ03.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }


    .HuZhao01::before{
      content:'';
      background: url("~assets/img/src/certify/Huzhao01.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .HuZhao02::before{
      content:'';
      background: url("~assets/img/src/certify/Huzhao02.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }
    .HuZhao03::before{
      content:'';
      background: url("~assets/img/src/certify/Huzhao03.png") no-repeat center;
      display: inline-block;
      background-size: contain;
      width: 100%;
      height: 188px;
      margin: 0 auto;
    }



    .image-upload-button {
      text-align: center;
      padding-top: 10px;
    }
    .button-width{
      margin-bottom: 30px;
      width: 540px;
      text-align: center;
    }
    .message{
      color: #BBB;
      font-size: 12px;
      text-align: left;
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .sammWidth{
    width:36%;
  }
}
</style>
<style lang="scss">
</style>

