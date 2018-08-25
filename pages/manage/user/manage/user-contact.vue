<template>
  <div class="userContact">
    <sas-breadcrumb >
      <sas-breadcrumb-item>用户中心</sas-breadcrumb-item>
      <sas-breadcrumb-item>通讯录</sas-breadcrumb-item>
    </sas-breadcrumb>
    <div class="row contract-head">
      <div class="row head-up">
        <lvx-col :span="3">
          <div class="head-title">联系人列表</div>
        </lvx-col>
        <lvx-col :span="3">
          <sas-button category="primary" size="small" @click="add('ruleForm')"><div class="add-icon">+</div>新增联系人</sas-button>
          <sas-dialog
            :show.sync="addContract"
            title="添加联系人"
            width="500px">
            <div class="add-dialog">
              <lvx-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <lvx-form-item label="备注名：" prop="name">
                  <sas-input v-xss :model.sync="ruleForm.name" placeholder="请输入联系人姓名"></sas-input>
                </lvx-form-item>
                <lvx-form-item label="用户名：" prop="userName">
                  <sas-input v-xss :model.sync="ruleForm.userName" placeholder="请输入登录用户名"></sas-input>
                </lvx-form-item>
                <div class="row text-center" style="margin-top: 35px;">
                  <sas-button category="primary" @click="submitForm('ruleForm')">确定</sas-button>
                  <sas-button category="gray" @click="addContract = false">取消</sas-button>
                </div>
              </lvx-form>
            </div>
          </sas-dialog>
        </lvx-col>
        <lvx-col :span="18">
          <div class="fr">
            <div class="" style="float: left"  v-for="(list,index) in selectWord" :key="index">
              <lvx-button type="text" class="word-color" :class="{'active':list.isClick}" @click="checkWord(list.zimu,list.index)"><b>{{list.zimu}}</b></lvx-button>
            </div>
          </div>
        </lvx-col>
      </div>
      <div class="row text-center">
        <lvx-col :span="10">
          <div class='head-down'>联系人备注名</div>
        </lvx-col>
        <lvx-col :span="7">
          <div class='head-down'>联系人用户名</div>
        </lvx-col>
        <lvx-col :span="7">
          <div class='head-down'>操作</div>
        </lvx-col>
      </div>
    </div>
    <div class="row contract-list" v-loading="loading" lvx-loading-background="rgba(255, 255, 255, 0)">
      <div class="row" v-if="myData.length>0">
        <lvx-table :data="myData" stripe :show-header = false style="width: 100%">
          <lvx-table-column min-width="115%">
            <template slot-scope="scope">
              <div class="text-overflow">{{scope.row.contactsName}}</div>
            </template>
          </lvx-table-column>
          <lvx-table-column prop="contactsEmail"></lvx-table-column>
          <lvx-table-column align="center">
            <template slot-scope="scope">
              <lvx-button type="text" @click="change(scope.row.contactsName,scope.row.contactsEmail)">编辑</lvx-button>丨
              <lvx-button type="text" class="delete-color" @click="deleteList(scope.row.contactsEmail)">删除</lvx-button>
            </template>
          </lvx-table-column>
        </lvx-table>
      </div>
      <div class="row text-center" v-else style="margin: 80px">
        <img v-imgerror src="~/assets/img/src/user/userManage/noMessage.png">
        <p class="no-message">没有找到匹配的记录</p>
      </div>
      <sas-dialog
        :show.sync="editContract"
        title="修改联系人"
        width="30%">
        <div class="add-dialog">
          <lvx-form :model="editForm" :rules="rules" ref="editForm" label-width="80px" class="demo-ruleForm">
            <lvx-form-item label="备注名：" prop="name">
              <lvx-input  size="small" v-model="editForm.name" placeholder="请输入联系人姓名"></lvx-input>
            </lvx-form-item>
            <lvx-form-item label="用户名：" prop="userName">
              <lvx-input  size="small" v-model="editForm.userName" placeholder="请输入登录用户名" disabled></lvx-input>
            </lvx-form-item>
            <div class="row text-center">
              <sas-button category="primary" @click="submitChange('editForm')">确定</sas-button>
              <sas-button category="gray" @click="editContract = false">取消</sas-button>
            </div>
          </lvx-form>
        </div>
      </sas-dialog>

      <sas-confirm title="确定删除." smallTitle="该操作无法恢复，是否继续！" :isShow.sync="delContract" @enSure="enSureConfirm" @cancel="delContract = false"/>

    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import _ from 'lodash'
  export default{
    name: 'userContact',
    layout: 'manager',
    metaInfo:{
      title:'通讯录-云合同'
    },
    data(){
      /*var charging = (rule, value, callback) => {
        var userName = /^[\w_][\w_@\\.]{2,39}$/;
        if (userName.test(value)){
          return callback();
        }else{
          return callback(new Error('用户名必须由3到15个字符的字母、数字、下划线、点号、@组成'));
        }
      }*/
      return {
        ruleForm:{
          name: '',
          userName: ''
        },
        editForm:{
          name: '',
          userName: ''
        },
        addContract: false, //添加联系人弹框
        editContract: false, //修改联系人弹框
        delContract: false, //删除联系人弹框
        isClick1:false,
        loading: false,
        selectWord:[
          {zimu:'全部',isClick: false,index:0}, {zimu:'A',isClick: false,index:1},
          {zimu:'B',isClick: false,index:2}, {zimu:'C',isClick: false,index:3},
          {zimu:'D',isClick: false,index:4}, {zimu:'E',isClick: false,index:5},
          {zimu:'F',isClick: false,index:6}, {zimu:'G',isClick: false,index:7},
          {zimu:'H',isClick: false,index:8}, {zimu:'I',isClick: false,index:9},
          {zimu:'J',isClick: false,index:10}, {zimu:'K',isClick: false,index:11},
          {zimu:'L',isClick: false,index:12}, {zimu:'M',isClick: false,index:13},
          {zimu:'N',isClick: false,index:14}, {zimu:'O',isClick: false,index:15},
          {zimu:'P',isClick: false,index:16}, {zimu:'Q',isClick: false,index:17},
          {zimu:'R',isClick: false,index:18}, {zimu:'S',isClick: false,index:19},
          {zimu:'T',isClick: false,index:20}, {zimu:'U',isClick: false,index:21},
          {zimu:'V',isClick: false,index:22}, {zimu:'W',isClick: false,index:23},
          {zimu:'X',isClick: false,index:24}, {zimu:'Y',isClick: false,index:25},
          {zimu:'Z',isClick: false,index:26}, {zimu:'#',isClick: false,index:27}
        ],
        rules:{
          name:[
            { required: true, message: '请输入联系人姓名', trigger: 'change' },
            { max: 45, message: '联系人姓名必须小于45个字符', trigger: 'change' }
          ],
          userName:[
            { required: true, message: '用户名必填', trigger: 'blur' },
//            { validator:charging, trigger: 'change' }
          ],
        }
      }
    },
    async fetchData (to, context) {
      let self = context;
      const r = await self.$axios({
          method: 'get',
          url: apis.contactUserList,
        })
        .then((res)=> res.data);
        self.$store.state.myAccount.userContact.myData = r.data;
        self.$store.state.myAccount.userContact.wordData = r.data;
    },
    computed: {
      ...mapState({
          myData: state => state.myAccount.userContact.myData,
          wordData: state => state.myAccount.userContact.wordData
      })
    },
    mounted(){
    },
    methods:{
      add(formName){ //添加联系人
        this.addContract = true;
        this.ruleForm.name = '';
        this.ruleForm.userName = '';
        this.$refs[formName].resetFields();
      },
      async contractList(){
        this.loading = true;
        let self = this;
        const promise = new Promise(function (resolve, reject) {
          self.$axios({
              method: 'get',
              url: apis.contactUserList,
            })
            .then(function (res) {
              if(res.data.code == 200){
                self.loading = false;
                self.$store.state.myAccount.userContact.wordData = res.data.data;
                self.$store.state.myAccount.userContact.myData = res.data.data;
              }
            })
        });
        return promise
      },
      async submitForm(formName){  //确定添加联系人
        var name = this.ruleForm.name;
        var uesrName = this.ruleForm.userName;
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const promise = new Promise(function (resolve, reject) {
              self.$axios({
                  method: 'post',
                  url: apis.addContactUser,
                  data:{'contactsName': name,'contactsEmail': uesrName}
                })
                .then(function (res) {
                  if(res.data.code == 200){
                    self.addContract= false;
                    const message = self.$createMessage({
                      type:'success',
                      duration:3000,
                      spinnerText:'联系人添加成功'
                    });
                    self.contractList();
                  }else{
                    const message = self.$createMessage({
                      type:'error',
                      duration:3000,
                      spinnerText: res.data.msg
                    })
                  }
                })
            });
            return promise
          } else {
            return false;
          }
        });
      },
      change(name,email){
        this.editContract = true;
        this.editForm.name = name;
        this.editForm.userName = email;
      },
      async submitChange(formName){  //提交修改联系人
        var name = this.editForm.name;
        var uesrName = this.editForm.userName;
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const promise = new Promise(function (resolve, reject) {
              self.$axios({
                  method: 'post',
                  url: apis.modifyContactUser,
                  data:{'contactsName': name,'contactsEmail': uesrName}
                })
                .then(function (res) {
                  if(res.data.code == 200){
                    self.editContract= false;
                    const message = self.$createMessage({
                      type:'success',
                      duration:3000,
                      spinnerText:'修改成功'
                    });
                    self.contractList();
                  }else{
                    const message = self.$createMessage({
                      type:'error',
                      duration:3000,
                      spinnerText: res.data.msg
                    })
                  }
                })
            });
            return promise
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteList(email){  //删除联系人弹框
        this.delContract = true;
        sessionStorage.setItem('email',email);
      },
      async enSureConfirm(){  //删除联系人
        var email = sessionStorage.getItem('email');
        let self = this;
        const promise = new Promise(function (resolve, reject) {
          self.$axios({
              method: 'post',
              url: apis.delContactUser,
              data:{'contactsEmail': email}
            })
            .then(function (res) {
              if(res.data.code == 200){
                self.editContract= false;
                const message = self.$createMessage({
                  type:'success',
                  duration:3000,
                  spinnerText:'删除联系人成功'
                });
                self.contractList();
              }else{
                const message = self.$createMessage({
                  type:'error',
                  duration:3000,
                  spinnerText: res.data.msg
                })
              }
            })
        });
        return promise
      },
      async checkWord(value,index){  //按字母搜索
        let tempData = [];
        for(var i=0;i<this.selectWord.length;i++){
          this.selectWord[i].isClick = false;
        }
        this.selectWord[index].isClick =! this.selectWord[index].isClick;
        if(value == '全部'){
          this.$store.state.myAccount.userContact.myData = this.wordData;
        }else if (value == '#') {
          for(var i = 0; i< this.wordData.length; i++){
            let firstNumber = parseInt(this.wordData[i].contactsEmail.substr(0,1));
            if( _.isNumber(firstNumber) && !Number.isNaN(firstNumber) ){
              tempData.push(this.wordData[i]);
            }
          }
          this.$store.state.myAccount.userContact.myData = tempData;
        } else{
          this.$store.state.myAccount.userContact.myData = [];
          for(var i = 0; i< this.wordData.length; i++){
            if(this.wordData[i].contactsEmail.substr(0,1).toLocaleUpperCase() == value){
              this.$store.state.myAccount.userContact.myData = this.myData.concat(this.wordData[i]);
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .userContact{
  .fr{float: right}
  @include responsive-default {
    margin: 0 auto;
    height: 97%;
    min-height: 250px;
    .contract-head{
      border: 1px solid #b9c5dd; margin : 20px 0;
      .head-up{
        border-bottom: 1px solid #b9c5dd; background-color: #fff; padding: 5px 3vh;
        .head-title{border-left: 5px solid #4181ff; text-indent: 9px; font-weight: 600; margin: 5px 0}
        .add-icon{
          border: 1px solid #fff; width: 18px; height: 18px; border-radius: 50%;
          line-height: 16px; display: inline-block; margin-right: 5px;
        }
      }
      .head-down{
        padding: 10px 0; border-right: 1px solid #dbe1ee;
      }
    }
    .add-dialog{padding: 40px 60px 50px;}
    .contract-list{
      overflow-y: auto;
      height: calc(100% - 137px); background-color: #fff; border: 1px solid #b9c5dd; padding: 0 15px;
      .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
      .delete-color{margin-left:0; color: red}
      .no-message{margin-right: 45px; margin-top: 20px;}
    }
    .word-color{
      padding: 0; margin: 6px; font-size: 16px; color: #333;
      &:hover{color: #4081ff; text-decoration: underline;}
    }
    .active{color: #4081ff; text-decoration: underline;}
  }
  }
</style>


