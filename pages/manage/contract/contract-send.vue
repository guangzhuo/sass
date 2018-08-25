<template>
  <div class="contract-send">
    <div class="div-prompt">
      <p id="creator_msg"></p>
    </div>
    <section class="edit-content-w">
      <div class="col-xs-12">
        <div class="row send-margin1 send-border-z">
          <div class="row ">
            <div class="contract-info">
              <i class="contract-title-icon iconsprite icon-status1"></i>
              <span class="contract-title-text">合同信息</span>
            </div>
            <div class="row send-font3-z">
              <span >发送合同名称：《{{contractCreater.title}}》</span>
            </div>
            <div class="row send-font4-z">
              <span>合同链接地址：</span><span class="send-span-z" v-text="contractLinkText"></span>
            </div>
          </div>
        </div>
        <div class="row send-content-w">
          <div class="fl send-content-l">
            <div class="row  send-margin1 send-border-z">
              <div class="row">
                <div class="col-xs-6 send-font2-z">
                  <span id="receiver">接受对象</span>
                </div>
                <div class="col-xs-6 send-font1-z">
                  <div class="input-group">
                  <span>
                    <sas-add-input v-model="searchUserName" placeholder="直接输入用户名" btn-text="添加" :input-width="262" @after-search="afterAdd"/>
									</span>
                  </div>
                </div>
              </div>
              <div class="text-center-z" style="height: 286px;overflow-y: scroll;">
                <table class="send-user-table">
                  <thead class="t-head">
                    <tr class="send-tab-top-z all-cursor">
                      <td class="col-xs-2">序号</td>
                      <td class="col-xs-6">接收对象</td>
                      <td class="col-xs-2">发送类型</td>
                      <td class="col-xs-2">操作</td>
                    </tr>
                  </thead>
                  <tbody class="t-body">
                    <tr v-for="(item,index) in objlist" :key="index" >
                      <td class='col-xs-2'>{{index+1}}</td>
                      <td class='col-xs-6'>
                        <div title='item.contactsName'>{{__clipTextOverflow(item.contactsName, 20)}}</div>
                      </td>
                      <td class='col-xs-2'>
                        <div class='send_box-z'>
                          <div>
                            <contract-switch-btn v-if="sendActionType == 'view&copy'" :active.sync="item.types"/>
                            <label v-if="sendActionType == 'view'" class='send_label_selected-z' >查看</label>
                            <label v-if="sendActionType == 'sign'" class='send_label_selected-z' >签署</label>
                          </div>
                        </div>
                      </td>
                      <td class='col-xs-2'>
                        <span class='send-span1-z sas-cursor-pointer' @click='delUser(index)'>删除</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row col-xs-12 send-border-z send-margin-top">
              <div class="row ">
                <div class="row send-font2-z">
                  <span id="messages">留言信息</span>
                </div>
                <div class="row">
                  <div class="send-font5-z">
                    <div class="row send-font5-z textarea-message-z message-wraper">
                      <textarea rows="6" v-model="tmessage" name="message"  maxlength="150" style="width: 100%; border: none; background: none; resize: none;" placeholder="请填写留言..."></textarea>
                      <span  class="tip">还可输入{{ 150 - tmessage.length }}个字</span>
                    </div>
                    <span  class="promp-span" v-text="tmessage.length > 280 ? '提示： 留言超出最大长度！':''"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fr send-content-r">
            <div class="row send-margin1 send-border-z">
              <div class="send-font6-z text-center-z" id="mycontacts">
                <table class="zimu" >
                  <tr>
                    <td id="th_zimu" :class="[activeZimu == 'all'?'zimuSelect-z':'']" ><span @click='showAll();activeZimu = "all"'>全部</span></td>
                    <td @click='selectContactInfoByFirstSpell("a");activeZimu = "a"' :class="[activeZimu == 'a'?'zimuSelect-z':'']">A</td>
                    <td @click='selectContactInfoByFirstSpell("B");activeZimu = "b"' :class="[activeZimu == 'b'?'zimuSelect-z':'']">B</td>
                    <td @click='selectContactInfoByFirstSpell("c");activeZimu = "c"' :class="[activeZimu == 'c'?'zimuSelect-z':'']">C</td>
                    <td @click='selectContactInfoByFirstSpell("d");activeZimu = "d"' :class="[activeZimu == 'd'?'zimuSelect-z':'']">D</td>
                    <td @click='selectContactInfoByFirstSpell("e");activeZimu = "e"' :class="[activeZimu == 'e'?'zimuSelect-z':'']">E</td>
                    <td @click='selectContactInfoByFirstSpell("f");activeZimu = "f"' :class="[activeZimu == 'f'?'zimuSelect-z':'']">F</td>
                    <td @click='selectContactInfoByFirstSpell("g");activeZimu = "g"' :class="[activeZimu == 'g'?'zimuSelect-z':'']">G</td>
                    <td @click='selectContactInfoByFirstSpell("h");activeZimu = "h"' :class="[activeZimu == 'h'?'zimuSelect-z':'']">H</td>
                    <td @click='selectContactInfoByFirstSpell("i");activeZimu = "i"' :class="[activeZimu == 'i'?'zimuSelect-z':'']">I</td>
                    <td @click='selectContactInfoByFirstSpell("j");activeZimu = "j"' :class="[activeZimu == 'j'?'zimuSelect-z':'']">J</td>
                    <td @click='selectContactInfoByFirstSpell("k");activeZimu = "k"' :class="[activeZimu == 'k'?'zimuSelect-z':'']">K</td>
                    <td @click='selectContactInfoByFirstSpell("l");activeZimu = "l"' :class="[activeZimu == 'l'?'zimuSelect-z':'']">L</td>
                    <td @click='selectContactInfoByFirstSpell("m");activeZimu = "m"' :class="[activeZimu == 'm'?'zimuSelect-z':'']">M</td>
                  </tr>
                  <tr>
                    <td @click='selectContactInfoByFirstSpell("n");activeZimu = "n"' :class="[activeZimu == 'n'?'zimuSelect-z':'']">N</td>
                    <td @click='selectContactInfoByFirstSpell("o");activeZimu = "o"' :class="[activeZimu == 'o'?'zimuSelect-z':'']">O</td>
                    <td @click='selectContactInfoByFirstSpell("p");activeZimu = "p"' :class="[activeZimu == 'p'?'zimuSelect-z':'']">P</td>
                    <td @click='selectContactInfoByFirstSpell("q");activeZimu = "q"' :class="[activeZimu == 'q'?'zimuSelect-z':'']">Q</td>
                    <td @click='selectContactInfoByFirstSpell("r");activeZimu = "r"' :class="[activeZimu == 'r'?'zimuSelect-z':'']">R</td>
                    <td @click='selectContactInfoByFirstSpell("s");activeZimu = "s"' :class="[activeZimu == 's'?'zimuSelect-z':'']">S</td>
                    <td @click='selectContactInfoByFirstSpell("t");activeZimu = "t"' :class="[activeZimu == 't'?'zimuSelect-z':'']">T</td>
                    <td @click='selectContactInfoByFirstSpell("u");activeZimu = "u"' :class="[activeZimu == 'u'?'zimuSelect-z':'']">U</td>
                    <td @click='selectContactInfoByFirstSpell("v");activeZimu = "v"' :class="[activeZimu == 'v'?'zimuSelect-z':'']">V</td>
                    <td @click='selectContactInfoByFirstSpell("w");activeZimu = "w"' :class="[activeZimu == 'w'?'zimuSelect-z':'']">W</td>
                    <td @click='selectContactInfoByFirstSpell("x");activeZimu = "x"' :class="[activeZimu == 'x'?'zimuSelect-z':'']">X</td>
                    <td @click='selectContactInfoByFirstSpell("y");activeZimu = "y"' :class="[activeZimu == 'y'?'zimuSelect-z':'']">Y</td>
                    <td @click='selectContactInfoByFirstSpell("z");activeZimu = "z"' :class="[activeZimu == 'z'?'zimuSelect-z':'']">Z</td>
                    <td @click='selectContactInfoByCharp("#");activeZimu = "#"' :class="[activeZimu == '#'?'zimuSelect-z':'']">#</td>
                  </tr>
                </table>
              </div>
              <div class="tab-contacts-z">
                <table class="contract-user-table">
                  <thead>
                    <tr class="head">
                      <td class="h-td">名称</td>
                      <td class="h-td">用户名</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="t-row" v-for="(item, index) in $store.state.Contract.ContractSend.contactUserList" :key="index"  @click="addUser(item)">
                      <td class="r-td">
                        <div :title="item.contactsName">{{__clipTextOverflow(item.contactsName, 10)}}</div>
                      </td>
                      <td class="r-td">{{__clipTextOverflow(item.contactsEmail, 13)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row text-center-z send-button-line-z">
              <sas-button category="primary" @click="sending" :disabled="sendBtnDisabled">{{objsend}}</sas-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import apis from "~/config/api";
import $ from "jquery";
import searchInput from '~/components/common/search-input';
import untils from '~/mixins/utils';
import _ from 'lodash';
import switchButton from '~/components/contract/switch-button';
import axios from 'axios'
export default {
  name: "contract-send",
  layout: "contract",
  metaInfo: {
    title: "合同发送—云合同",
  },
  mixins: [untils],
  data() {
    return {
      cid: this.$route.query.cid || '',
      pid: this.$route.query.pid || '',
      objlist: [], //待发送用户列表
      objsend: "确定发送",
      tmessage: "", //留言
      searchUserName: '',
      activeZimu: 'all',
      sendBtnDisabled: false
    };
  },
  async fetchData (to, context) {
    let self = context;
    let [pid, cid] = [to.query.pid, to.query.cid];
    const r = await self.$axios.get(apis.l_sendPage, {params: {pid: pid, cid: cid}}).then((data)=>data.data); //获取合同创建者
    if(r.data.creator) {
      const f = await self.$axios.get(apis.l_pageFlag, {params: {pid: pid}}).then((data)=>data.data); //获取合同类型
      self.$store.state.Contract.ContractSend.contractFlag = f.data.flag;
    }
    const l = await self.$axios.get(apis.contactUserList, {params: {order: 'asc'}}).then((data)=>data.data); //获取合同人员列表
    self.$store.state.Contract.ContractSend.contractCreater = r.data.creator;
    self.$store.state.Contract.ContractSend.contactUserList = l.data;
    self.$store.state.Contract.ContractSend.tempContactUserList = l.data;
  },
  computed: {
    ...mapState({
      user: state=> state.user,
      contractCreater: state=> state.Contract.ContractSend.contractCreater,
      contractFlag: state=> state.Contract.ContractSend.contractFlag,
    }),
    sendActionType(){
      if(this.contractCreater.colsStatus == 0 || this.contractCreater.colsStatus == 2 || this.contractCreater.colsStatus == 32 || this.contractCreater.colsStatus == 33){
				if (this.contractCreater.roleId == 1){
          return 'view&copy';
        } else {
          return 'view';
        }
      } else if(this.contractCreater.colsStatus == 4){
        return 'sign';
      } else {
        return '';
      }

    },
    contractLinkText() {
      if(this.contractFlag == 1) {
        return `www.yunhetong.com/manage/contract/contract-view?pid=${this.pid}&cid=${this.contractCreater.contractId}`;
      } else if (this.contractFlag == 2) {
        return `www.yunhetong.com/manage/contract/contract-view-image?pid=${this.pid}&cid=${this.contractCreater.contractId}`;
      } else if (this.contractFlag == 3) {
        return `www.yunhetong.com/manage/contract/contract-postil?pid=${this.pid}&cid=${this.contractCreater.contractId}`;
      }
    }
  },
  filters: {
  },
  watch: {
  },
  mounted() {

  },
  methods: {
    afterAdd() {
      var reg = /^[\w_][\w_@\\.]{2,39}$/;
      if(!reg.test(this.searchUserName)) {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "用户名格式不正确"
        });
        return false;
      }
      if(this.searchUserName == this.user.loginEmail) {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "抱歉，系统不支持你发送合同给自己！"
        });
        return false;
      }
      this.addUser({contactsEmail: this.searchUserName.toLocaleLowerCase()});
    },
    /*
    描述：根据特定字符#筛选数据
    */
    selectContactInfoByCharp() {
      this.$store.state.Contract.ContractSend.contactUserList = _.filter(this.$store.state.Contract.ContractSend.tempContactUserList, (o)=> {
        let firstNumber = parseInt(o.contactsEmail.substr(0, 1));
        return _.isNumber(firstNumber) && !Number.isNaN(firstNumber);
      });
    },
    /*
    描述： 根据字母筛选数据
    */
    selectContactInfoByFirstSpell(firstWord) {
      this.$store.state.Contract.ContractSend.contactUserList = _.filter(this.$store.state.Contract.ContractSend.tempContactUserList, (o)=> { return o.contactsEmail.startsWith(firstWord); });
    },
    showAll(){
      this.$store.state.Contract.ContractSend.contactUserList = this.$store.state.Contract.ContractSend.tempContactUserList;
    },
    async addUser(contactUser) {
      let r = this.isCanAddUser(contactUser);
      if(r) {
        const c = await this.isContractSigner(contactUser);
        if(c == 'isSigner') {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: `${contactUser.contactsEmail}已是该合同的签署方`
          });
          return;
        } else if (c == 'userNotExist') {
          this.$createMessage({
            type:'error',
            duration:3000,
            spinnerText: '用户不存在'
          });
        } else if (c == 'none') {

          const u = await this.$axios.get(apis.getContactByLoginEmail, {params: {loginEmail: contactUser.contactsEmail}}).then((data)=>data.data);
          if(u.success) {
            if(this.sendActionType == 'view&copy' || this.sendActionType == 'view') {
              u.data.contactInfo.types = 1;
            } else if (this.sendActionType == 'sign') {
              u.data.contactInfo.types = 3;
            }
            this.objlist.push(u.data.contactInfo);
          }
          this.$createMessage({
            type:'success',
            duration:3000,
            spinnerText: '已加入'
          });
        }

      }
    },
    /*
    描述：添加用户到待发送列表前校验
    返回值： 通过 true 、不通过 false
    */
    isCanAddUser(contactUser) {
      let r = _.findIndex(this.objlist, (o)=> { return o.contactsEmail == contactUser.contactsEmail; }); //待发送列表中是否已有此人
      if(r >= 0) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '该账号已在接收方列表中'
        });
        return false;
      }

      if (this.objlist.length > 999) {
        this.$createMessage({
          type:'error',
          duration:3000,
          spinnerText: '每次发送支持最多 1000 个接收方！'
        });
        return false;
      }
      return true;
    },
    async getUserByEmail(email) {
      return await this.$axios.post(apis.getUserByEmail, {
        loginEmail: email
      }).then((data)=>data.data);
    },
    /*
    描述： 添加的用户是否是合同签署方
    返回值: 是 isSigner 、否 none、用户不存在 userNotExist
    */
    async isContractSigner(contactUser) {
      let user = await this.getUserByEmail(contactUser.contactsEmail);
      if(user.success && user.data) {
        if(user.data.userId == this.contractCreater.creator) {
          return 'isSigner';
        } else {
          return 'none';
        }
      } else {
        return 'userNotExist';
      }
    },
    delUser(ind) {
      this.objlist.splice(ind, 1);
    },
    async sending(ev) {
      if(this.objlist.length < 1) {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "请至少添加 1 个接收对象！"
        });
        return false;
      }
      if(this.tmessage.length > 280) {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: "留言超出最大长度！"
        });
        return false;
      }

      this.objsend = "正在发送……";
      this.sendBtnDisabled = true;
      let [types, emails] = [[], []];
      for (let i in this.objlist) {
        types.push(this.objlist[i].types);
        emails.push(this.objlist[i].contactsEmail);
      }
      const r = await axios({
        url: apis.l_send,
        method: 'post',
        transformRequest: [function (data, headers) {
          let ret = '';
          _.forEach(data, (value, key)=> {
            if(_.isArray(value)) {
              _.forEach(value, (arrayValue, arrayIndex)=>{
                ret += encodeURIComponent(`${key}[${arrayIndex}]`) +
                '=' +
                encodeURIComponent(arrayValue) +
                '&';
              });
            } else {
              ret += encodeURIComponent(key) +
              '=' +
              encodeURIComponent(value) +
              '&'
            }
          });
          return ret;
        }],
        data: {
          cid: this.cid || this.contractCreater.contractId,
          msg: this.tmessage,
          types: types,
          emails: emails
        }
      }).then((data)=>data.data);
      if(r.success) {
        this.objsend = "合同已发出";
        this.sendBtnDisabled = false;
        this.$createMessage({
          type: "success",
          duration: 3000,
          spinnerText: "合同已发出"
        });
        if(opener != null) {
          opener.location.reload();
        };
        setTimeout(()=>{
          this.__closeCurWindow();
        }, 2000)
      } else {
        this.$createMessage({
          type: "error",
          duration: 3000,
          spinnerText: r.msg
        });
        this.objsend = "重新发送";
        this.sendBtnDisabled = false;
        if(r.code == 206) {

        }
      }
    }
  },
  components: {
    'sas-add-input': searchInput,
    'contract-switch-btn': switchButton
  }
};
</script>

<style type="text/css">
.zimu th {
  width: 25px;
}
.zimu th span:hover {
  cursor: pointer;
}
.zimu td {
  width: 25px;
}
.zimu td:hover {
  cursor: pointer;
}
.zimuSelect-z {
  background: 0 0;
  color: #4081ff;
}
#th_zimu {
  font-size: 12px;
  width: 35px;
}
#contacts .th-inner {
  padding: 3px;
}
.tab-contacts-z {
  overflow-y: scroll;
  height: 443px;
  background-color: #fff;
  overflow-y: scroll;
  height: 433px;
  text-align: center;
}
.table > thead > tr > th {
  color: #313131;
}
#tb_contactsList tbody td:first-child {
  border-left: none;
}

#tb_contactsList .table > thead > tr > th {
  background-color: #ffffff;
  border-bottom: 1px solid #b9c5dd;
}
.edit-icon-fixed-w {
  display: none;
}
#tb_contactsList .table > thead > tr > th {
  color: #313131;
}
#tb_contactsList th .th-inner {
  padding: 8px;
  line-height: 24px;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
  box-sizing: border-box;
  text-align: center;
}
#tb_contactsList tbody td:first-child {
  border-left: none;
}
#tb_contactsList .table > tbody > tr > td {
  padding: 5px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 0px solid #ddd;
}
#tb_contactsList tbody td {
  border-bottom: 1px solid #b8c6dc;
}
.send-font6-z {
  border-bottom: 1px dashed #b9c5dd;
  padding: 10px 14px;
}
textarea {
  outline: 0;
}
</style>
<style lang="scss"  scoped >
@import "~styles/base.scss";
.contract-send {
  @include responsive-default {
    background: #e6ecf5;
    overflow: hidden;
    width: 100%;
    display: block;
    padding-top: 75px;
    padding: 0 calc(50% - 570px);
    min-height: calc(100vh - 80px);


    .contract-info{
      line-height: 39px;
      height: 60px;
      background-color: #f7faff;
      border-bottom: 1px dashed #b9c5dd;
      font-size: 16px;
      padding: 10px 15px;
    }
    /*这里是新加入的css*/
    .edit-content-w {
      margin-top: 25px;
    }
    .send-border-z {
      border: 1px solid #b9c5dd;
    }
    .send-font2-z {
      height: 60px;
      background-color: #f7faff;
      border-bottom: 1px dashed #b9c5dd;
      font-size: 16px;
      padding: 10px 15px;
    }
    .send-font2-z > span,
    .send-font3-z > span,
    .send-font4-z > span {
      display: inline-block;
      margin-top: 8px;
      font-weight: 400;
    }
    .send-font2-z > span {
      margin-left: 20px;
    }
    .send-font2-z > span:before {
      content: "";
      background-image: url("~assets/img/src/contract/contract_icon_w.png");
      height: 20px;
      width: 20px;
      display: inline-block;
      float: left;
      position: relative;
      top: 2px;
      left: -3px;
    }
    .send-font2-z #title:before {
      background-position: -19px -200px;
    }

    .send-font3-z,
    .send-font4-z {
      height: 60px;
      border-bottom: none;
      background-color: #fff;
      padding: 10px 15px;
    }

    .send-span-z {
      color: #4081ff;
    }
    .send-content-w,
    .send-margin-top {
      margin-top: 30px;
    }
    .fl,
    .float-left {
      float: left;
    }
    .send-content-l {
      width: 755px;
    }
    .send-border-z {
      border: 1px solid #b9c5dd;
    }
    #receiver:before {
      background-position: -19px -222px;
    }
    .send-font1-z {
      padding: 15px 20px;
      height: 60px;
      border-bottom: 1px dashed #b9c5dd;
      background-color: #f7faff;
    }
    .input-group {
      position: relative;
      display: table;
      border-collapse: separate;
    }
    .input-group .form-control {
      display: table-cell;
    }
    .input-group .form-control {
      position: relative;
      z-index: 2;
      float: left;
      width: 100%;
      margin-bottom: 0;
    }
    .form-control-z {
      height: 29px;
      background-color: #e6ecf5;
    }
    .form-control {
      background: #f8f8f8;
    }
    .form-control {
      display: block;
      width: 100%;
      height: 29px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 0px;
      -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
      -o-transition: border-color ease-in-out 0.15s,
        box-shadow ease-in-out 0.15s;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    input {
      font-size: 100%;
    }
    .send-bottom-bg-z {
      background-color: #4081ff;
      color: #fff;
      height: 29px;
      width: 51px;
      border-radius: 0 !important;
      padding: 0 !important;
    }
    .input-group-btn-z {
      left: 0;
    }
    .input-group-btn {
      position: relative;
      font-size: 0;
      white-space: nowrap;
      width: 1%;
      vertical-align: middle;
      display: table-cell;
    }
    .input-group-btn:last-child > .btn {
      margin-left: -1px;
      border-left: 0;
    }
    .btn {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 0px;
    }
    button {
      font-family: inherit;
      -webkit-appearance: button;
      text-transform: none;
      overflow: visible;
      margin: 0;
      font: inherit;
    }
    .text-center-z {
      background-color: #fff;
      text-align: center;
    }

    .send-tab-top-z {
      border-bottom: none;
    }
    table td[class*="col-"],
    table th[class*="col-"] {
      position: static;
      display: table-cell;
      float: none;
    }
    td,
    th {
      padding: 0;
    }
    .td-width {
      width: 120px;
    }
    .tab-contacts-z {
      overflow-y: scroll;
      height: 443px;
    }
    #users tr:hover {
      background-color: #f5f5f5;
    }
    .showE {
      font-size: 12px;
      color: #b0b1b0;
    }
    .div-contacts {
      margin: -15px 0;
      padding: 0 15px;
      max-height: 356px;
      overflow-y: auto;
    }
    #dlgContacts {
      list-style: none;
      overflow-y: auto;
      width: 100%;
    }
    #dlgContacts tr {
      font-size: 15px;
      vertical-align: bottom;
      border-bottom: 1px solid #dcdcdc;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    #dlgContacts tr:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    #dlgContacts tr td {
      padding-left: 10px;
    }

    .slt-type {
      width: 60px;
    }
    #messages:before {
      background-position: -19px -244px;
    }
    .fr {
      float: right;
    }
    .send-content-r {
      width: 365px;
    }
    .textarea-message-z {
      background-color: #fff;
      padding: 10px 15px;
    }
    .send-font5-z {
      height: 130px;
    }
    #Surplus {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #bbb;
    }

    table {
      background-color: transparent;
      border-spacing: 0;
      border-collapse: collapse;
    }
    .zimuSelect {
      background-color: #7fcff4;
      color: #fff;
    }
    .zimu th {
      width: 25px;
    }
    .zimu th span:hover {
      cursor: pointer;
    }
    .zimu td {
      width: 25px;
    }
    .zimu td:hover {
      cursor: pointer;
    }
    #contacts .th-inner {
      padding: 3px;
    }
    .div_AvaImg img {
      border-radius: 50%;
    }
    /*.send_box {width: 100px; margin: 5px auto 0; position: relative;}*/
    .send_box {
      margin: 5px auto 0;
      position: relative;
    }
    .send_tab {
      width: 40px;
      margin: 5px 5px 0;
      float: left;
    }
    /*.send_label{padding: 0 5px; color: #7fcff4; text-align: center;}*/
    /*.send_label_selected{background-color: #7fcff4; color: #fff;  border-radius: 5px;}*/
    .div-prompt {
      display: none;
    }

    .table > thead > tr > th {
      background-color: #ffffff;
      border-bottom: 1px solid #b9c5dd;
    }

    .edit-icon-fixed-w {
      display: none;
    }
    .table > thead > tr > th {
      color: #313131;
    }

    .send-button-line-z {
      background-color: #e6ecf5;
      margin-top: 34px;
    }

    #sending {
      width: 224px;
    }
    .modal-btn {
      background-color: #4081ff;
      border-radius: 5px;
      color: #fff;
      height: 40px;
    }
    .send_label-z,
    .send_label_selected-z {
      width: 43px;
      color: #4081ff;
      font-weight: 500;
      margin-bottom: 0;
      cursor: pointer;
    }

    .send-span-z {
      color: #4081ff;
    }

    .send-span1-z {
      color: red;
    }
    .send_box-z {
      height: 24px;
    }

    .white-button-z:after {
      content: "";
      background-color: #fff;
      width: 43px;
      height: 20px;
      display: inline-block;
      position: absolute;
      z-index: -1;
      left: 47px;
      animation: left 0.4s;
      border-radius: 4px;
    }
    .select-z:after {
      left: 3px;
      animation: right 0.4s;
    }
    @media (max-width: 1600px) {
      .send-content-w {
        margin-bottom: 40px;
      }
    }
    /*-----------------*/

    .td-width {
      width: 120px;
    }
    .show-help {
      display: none;
      position: absolute;
      top: -32px;
      left: 506px;
      z-index: 1001;
      text-align: left;
    }
    .help-title {
      padding: 2px 10px;
      font-size: 14px;
      color: #fff;
      background-color: #1560ad;
    }
    .help-content {
      padding: 4px 10px 6px;
      font-size: 12px;
      color: black;
      background-color: #eeefef;
    }
    .arrow-down {
      position: absolute;
      margin-left: 270px;
      margin-top: 0px;
      border-style: solid;
      border-color: #eeefef transparent transparent;
      border-width: 10px 15px 0px;
    }
    #users span {
      cursor: pointer;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    .promp-span {
      float: left;
      color: red;
      padding-top: 10px;
      display: none;
    }
    .sign-obj {
      margin: 64px auto;
    }
    .tab-contacts-z {
      overflow-y: scroll;
      height: 443px;
    }
    #users tr:hover {
      background-color: #f5f5f5;
    }
    .showE {
      font-size: 12px;
      color: #b0b1b0;
    }
    .div-contacts {
      margin: -15px 0;
      padding: 0 15px;
      max-height: 356px;
      overflow-y: auto;
    }
    #dlgContacts {
      list-style: none;
      overflow-y: auto;
      width: 100%;
    }
    #dlgContacts tr {
      font-size: 15px;
      vertical-align: bottom;
      border-bottom: 1px solid #dcdcdc;
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    #dlgContacts tr:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    #dlgContacts tr td {
      padding-left: 10px;
    }
    .slt-type {
      width: 60px;
    }
    /*************************选择联系人相关  Add By SeanWu***********************************/
    #div-selectContact table a {
      color: #0099cc;
      text-decoration: none;
    }
    #div-selectContact table th {
      font-size: 15px;
      text-align: center;
    }
    #div-selectContact table a:hover {
      color: #f8b62c;
      text-decoration: none;
    }
    #div-selectContact table td {
      text-align: center;
    }
    #tbContactUserList {
      margin-bottom: 0;
      color: #555;
    }
    #th_zimu {
      font-size: 12px;
      width: 35px;
    }
    #formId tr {
      height: 38px;
    }
    .zimuSelect {
      background-color: #7fcff4;
      color: #fff;
    }
    .zimu th {
      width: 25px;
    }
    .zimu th span:hover {
      cursor: pointer;
    }
    .zimu td {
      width: 25px;
    }
    .zimu td:hover {
      cursor: pointer;
    }
    #contacts .th-inner {
      padding: 3px;
    }
    .div_AvaImg img {
      border-radius: 50%;
    }
    /*.send_box {width: 100px; margin: 5px auto 0; position: relative;}*/
    .send_box {
      margin: 5px auto 0;
      position: relative;
    }
    .send_tab {
      width: 40px;
      margin: 5px 5px 0;
      float: left;
    }
    /*.send_label{padding: 0 5px; color: #7fcff4; text-align: center;}*/
    /*.send_label_selected{background-color: #7fcff4; color: #fff;  border-radius: 5px;}*/
    .div-prompt {
      display: none;
    }
    .send-user-table{
      width: 100%;
      thead tr{
        height: 38px;
        td{
          padding: 10px 0;
        }
      }
      .t-body{
        td{
          padding: 10px 0;
        }
      }
    }
    .contract-user-table{
      width: 100%;
      .h-td{
        padding: 8px;
        line-height: 24px;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: normal;
        width: 50%;
      }
      .t-row{
        cursor: pointer;
        &:hover{
          background-color: #f9f9f9;
        }
        .r-td{
          padding: 5px;
          line-height: 1.42857143;
          vertical-align: top;
          border-top: 1px solid #b8c6dc;
        }
      }
    }
    .message-wraper{
      position: relative;
      .tip{
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: #bbb;
      }
    }
  }
}
</style>
