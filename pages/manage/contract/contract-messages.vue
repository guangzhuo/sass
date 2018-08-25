<template>
  <div class="manage-contract-mesages">
    <div class="container-content-bg-w">
      <div class="row container-content-white">
        <header>
          <lvx-button @click="allread">全部设置为已读</lvx-button>
        </header>
        <section class="contract-table">
          <lvx-table
            tooltip-effect="light"
            :data="messlist.listMap"
            style="width: 100%"
            header-row-class-name="con-th-d"
            @row-click="openContractSign"
          >
          <template slot="empty">
              <div class="empty-div">
                <div class="empty-left">
                  <div class="empty-left-up"></div>
                  <div class="empty-left-down">+</div>
                </div>
                <div class="empty-middle-up"></div>
                <div class="empty-middle-down"></div>
                <div class="empty-right">
                  <div class="empty-right-up"></div>
                  <div class="empty-right-down">+</div>
                </div>
                <div class="empty-text">暂无消息</div>
              </div>
          </template>
            <lvx-table-column
              width="100">
              <template slot-scope="scope">
                <i class="lvx-noRead" v-if="scope.row.isRead != 1"></i>
                <i class="lvx-isRead" v-else></i>
              </template>
            </lvx-table-column>
            <lvx-table-column
              :show-overflow-tooltip="true"
              label="消息内容">
              <template slot-scope="scope">
                <span>{{ scope.row.messageContent }}</span>
              </template>
            </lvx-table-column>
            <lvx-table-column
              label="消息类型" width="280">
              <template slot-scope="scope">
                {{ scope.row.messageType |typeFormatter }}
              </template>
            </lvx-table-column>
            <lvx-table-column
              label="消息到达时间" width="200">
              <template slot-scope="scope">
                {{ scope.row.gmtCreate |dateFormatter }}
              </template>
            </lvx-table-column>
          </lvx-table>
        </section>
      </div>
      <footer class="row text-right" style="background-color: #fff;" v-if="messlist.totalNum > pageSize">
        <sas-pagination :total="messlist.totalNum" :currentPage="currentPage" :pageSize="pageSize" @current-change="pageChange"></sas-pagination>
        <!-- <sas-pagination :total="messlist.totalNum" :currentPage="currentPage" :pageSize="pageSize" @current-change="pageChange"></sas-pagination> -->
      </footer>
    </div>
    <sas-dialog
        :show.sync="DialogVisible"
        title="当前消息"
        width="538px"
      >
        <div class="mess-center" v-html="messageStr"></div>
        <footer style="width:100%;text-align:center;padding: 12px 0px;">
          <sas-button category="primary" @click="forwardcheck">前往查看</sas-button>
          <sas-button category="primary" @click="DialogVisible = false" >返&nbsp;&nbsp;回</sas-button>
        </footer>
      </sas-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import apis from '~/config/api'
  import $ from 'jquery'
  import utils from '~/mixins/utils'

  export default {
    name: 'manage-contract-mesages',
    layout: 'manager',
    metaInfo: {
      title: "消息列表—云合同",
    },
    // loading: (context)=>{
    //   return context.$createLoading({
    //     spinnerText: '正在读取数据，请稍等'
    //   });
    // },
    async fetchData(to, context){
      let self = context;
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 280) / 66);
      const List = await self.$axios.get(apis.getpage, {
        params: {
          offset:0,
          limit: limitvalue,
          user_id: 0,
        }
      }).then((data) => data.data.data);
    for(var i=0;i<List.rows.length;i++){
      List.rows[i].messageContent1 = List.rows[i].messageContent;
      List.rows[i].messageContent = List.rows[i].messageContent.replace(/<br>/g,"")
    }
    self.$store.state.Contract.list.messlist = {
      totalNum: List.total || 0,
      listMap: List.rows  || [],
    };
    },
    data () {
      return {
        currentPage:1,
        pageSize:1,
        DialogVisible:false,
        messageStr:'',
        temprows:[],
        userOrderMsg: false,
        lawyerOrderMsg: false,
      }
    },
    filters:{
      typeFormatter(val){
        let type = "";
        switch (val) {
            case 0:
                type = "系统消息";
                break;
            case 1:
                type = "合同消息";
                break;
            case 2:
                type = "提醒消息";
                break;
            case 3:
                type = "活动返赠";
                break;
            default :
                break;
        }
        return type;
      },
      dateFormatter(time) {
        var day = new Date(time);
        var Year = 0, Month = 0, Day = 0, Hour = 0, Minutes = 0, Seconds = 0;
        var CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth() + 1;
        Day = day.getDate();
        Hour = day.getHours();
        Minutes = day.getMinutes();
        Seconds = day.getSeconds();
        CurrentDate += Year + "-";
        (Month >= 10) ? CurrentDate += Month + "-" : CurrentDate += "0" + Month + "-";
        (Day >= 10) ? CurrentDate += Day + " " : CurrentDate += "0" + Day + " ";
        CurrentDate += Hour + ":";
        (Minutes >= 10) ? CurrentDate += Minutes + ":" : CurrentDate += "0" + Minutes + ":";
        (Seconds >= 10) ? CurrentDate += Seconds : CurrentDate += "0" + Seconds;

        return CurrentDate;
    },
    },
    mixins: [utils],
    computed: {
      ...mapState({
        messlist: state => state.Contract.list.messlist,
        showMesBadge: state => state.Header.showMesBadge
      })
    },
    watch: {
    },
    mounted () {
      let clientheight = document.documentElement.clientHeight;
      let limitvalue = Math.floor((clientheight - 280) / 66);
      this.pageSize = limitvalue;
      const that = this;
      // window.onresize = function(){
      //   let whiteheight = $(".container-content-white").height();
      //   if(whiteheight > 244){
      //       that.pageSize = Math.floor((whiteheight - 142) / 66);
      //   }else{
      //       that.pageSize = 1;
      //   }
      //   that.confresh();
      // }
    },
    methods: {
      classheader({ row, rowIndex }){
        if (rowIndex ==0) {
          return 'con-th-d'
        } else {
          return ''
        }
      },
      async confresh(){
        const List = await this.$axios.get(apis.getpage, {
          params:{
            offset: (this.currentPage-1)*this.pageSize,
            limit: this.pageSize,
            user_id: 0,
          }
        }).then((res)=> res.data.data);

        this.$store.state.Contract.list.messlist = {
          listMap: List.rows,
          totalNum: List.total,
        }
      },
      async pageChange(val){
        this.currentPage=val;
        let clientheight = document.documentElement.clientHeight;
        let limitvalue = Math.floor((clientheight - 280) / 66);
        this.pageSize = limitvalue;
        let offsevalue = (this.currentPage-1) * this.pageSize;
        const List = await this.$axios.get(apis.getpage, {
          params: {
            offset:offsevalue,
            limit:this.pageSize,
            user_id: 0,
          }
        }).then((data) => data.data.data);

        this.$store.state.Contract.list.messlist = {
        listMap: List.rows,
        totalNum: List.total,
      };
      },
      allread(){
        const self = this;
        self.$confirm('全部设置成已读？', '设置消息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$axios.post(apis.putstates)
            .then((res) => {
                if(res.data.code == 200){
                    window.location.reload();
                }
            });

        }).catch(() => {
        return;
        });

      },
      async openContractSign(row, event, column){
        const mesNum = await this.$axios.get(apis.getMesNum).then((data) => data.data.data);
        if (mesNum.count > 1) {
          this.$store.state.Header.showMesBadge = true;
        } else {
          this.$store.state.Header.showMesBadge = false;
        }
         this.DialogVisible = true;
         let cid = row.contractId;

          this.displaydialog( row, cid);
          this.updateisR(cid);

      },
      displaydialog(rows, cid){
        let showSuccessClass = "hide";
        this.temprows = rows;
        switch (rows.ext1Int) {
            case 101:
                showSuccessClass = "modal-btn";
                break;
            case 102:
                showSuccessClass = "modal-btn";
                break;
            case 105:
                showSuccessClass = "modal-btn";
                break;
            case 107:
                showSuccessClass = "modal-btn";
                break;
            case 108:
                showSuccessClass = "modal-btn";
                break;
            case 109:
                showSuccessClass = "modal-btn";
                break;
            case 199:
                showSuccessClass = "modal-btn";
                break;
            case 401:
                showSuccessClass = "modal-btn";
                this.userOrderMsg = true;
                break;
            case 403:
                showSuccessClass = "modal-btn";
                this.lawyerOrderMsg = true;
                break;
            case 404:
                showSuccessClass = "modal-btn";
                this.userOrderMsg = true;
                break;
            default:
        }
        // let arr = rows.messageContent1.split('<br>温馨提示：');
        /*debugger
        let message = `<div class='remind'>${arr[0]}</div>`;

        if (arr[1] != undefined) {
            message = `<div class='leaveWord'>对方留言:</div>
                    <div class='levaeMessage'>${arr[1]}</div>`;
        }*/
        this.messageStr = rows.messageContent1 ? rows.messageContent1 : rows.messageContent;
      },
      updateisR(cid){
       // console.log(cid);
       if (this.temprows.isRead === 0) {
          //  $($element).find("i").removeClass();
          //  $($element).find('i').addClass("iconfont icon-envelopeopen msg_read");
          const self = this;
        self.$axios.post(apis.putstate,{
          id: self.temprows.id
        }).then(res =>  self.temprows.isRead = 1);

       }
      },
      forwardcheck(){
        if(this.userOrderMsg){
            open(`${this.__getRouterBase()}/manage/order/my-order?searchOrder=${this.temprows.ext2Var}`);
        }else if(this.lawyerOrderMsg){
            open(`${this.__getRouterBase()}/manage/order/my-service-order?searchOrder=${this.temprows.ext2Var}`);
        }else{
            const self = this;
            let newPage  = window.open('about:blank');
            self.$axios.get(apis.l_pageFlagByCid,{
              params:{
                cid: self.temprows.contractId
              }
            })
            .then((res) => {
                //console.log(res);
                let success = res.data.success;
                if (success){
                    let flag = res.data.data.flag;
                    let id = res.data.data.pid;
                    if(flag == 1){
                      newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view?pid=${id}&cid=${self.temprows.contractId}`;
                      // open(`${this.__getRouterBase()}/manage/contract/contract-view?pid=${id}&cid=${self.temprows.contractId}`);
                    }
                    if(flag == 2){
                      newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${id}&cid=${self.temprows.contractId}`;
                      // open(`${this.__getRouterBase()}/manage/contract/contract-view-image?pid=${id}&cid=${self.temprows.contractId}`);
                    }
                    if(flag == 3){
                      newPage.location.href = `${this.__getRouterBase()}/manage/contract/contract-postil?pid=${id}&cid=${self.temprows.contractId}`;
                      // open(`${this.__getRouterBase()}/manage/contract/contract-postil?pid=${id}&cid=${self.temprows.contractId}`);
                    }
                }else{
                  self.$createMessage({
                    type:'error',
                    duration:3000,
                    spinnerText:res.data.msg
                  });
                  newPage.close();
                }
            });
        }
      },
    },
    components: {

    }
  }
</script>
<style lang="scss">
.manage-contract-mesages{
  .lvx-table thead {
    font-size: 12px;
    color: #333;
    font-weight: 500;
  }
  .lvx-table th, .lvx-table td {
    padding: 0px 18px;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }
  .lvx-table th > .cell{
    height: 40px;
    line-height: 40px;
  }
  .lvx-cascader__label{
    text-align: center;
    padding: 6px 25px 0 15px;
  }
  .lvx-input__suffix{
    right: 10px;
  }
  .lvx-table th div{
    width: 200px;
  }
  .lvx-table td{
    height: 66px;
    font-size: 12px;
    border-bottom:none;
  }
  .lvx-table .con-th-d{
    background-color: #e8f0f9;
    height: 40px;
  }
  .lvx-table__empty-block{
    overflow: hidden;
    min-height: 350px;
  }
}

</style>
<style lang="scss" scoped>
  @import "~styles/base.scss";
  .manage-contract-mesages{
    height: 100%;
    .text-overflow{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .container-header-w{
      padding-bottom:20px;
      color: #333;
      position: relative;
      a{ color: #333;
        &:hover{ color: #333;}
      }
      span{color: #4081ff; }
      // &.arrow-icon{width: 10px; height: 15px; display: inline-block; background: rgba(0, 0, 0, 0) url("../images/saas/arrow-icon.png") no-repeat scroll 3px 4px;}
    }
    .mess-center{
      /*text-align: center;*/
      padding: 28px 20px;
    }

    //列表内容
    .container-content-bg-w{
      height: 100%;
      background-color: #fff;
      .container-content-white{
        position: relative;
        background-color: $body-bg;
        width: 100%;
        min-height: calc(100% - 50px);
        padding: 18px 18px 0 18px;
      }
      .contract-table{
        margin: 20px 0;
        .lvx-isRead{
          background: url("~assets/img/src/contract/user-page.png") -324px 0 no-repeat;
          background-size: 362px 80px;
          height: 20px;
          width: 19px;
          margin-left: 10px;
          display: inline-block;
        }
        .lvx-noRead{
          background: url("~assets/img/src/contract/user-page.png") -302px 0 no-repeat;
          background-size: 362px 80px;
          height: 20px;
          width: 19px;
          margin-left: 10px;
          display: inline-block;
        }
        .nomessage {
          padding-right: 66px;
          padding-top: 17px;
        }
        .empty-div{
      width:320px;height:210px;margin:50px auto;position:relative;
    .empty-left{
      width: 70px;height: 210px;position:absolute;top: 19px;left: -70px;
		.empty-left-up{
			width: 10px;height: 10px;border: 2px solid #b9c5dd;border-radius: 50px;margin-left: 38px;
		}
		.empty-left-down{
			font-size: 20px;color: #bbc2d1;margin: 47px -23px 0px -55px;
		}
	}

	.empty-middle-up{
		width: 156px;height: 156px;border-bottom: 1px solid #b9c5dd;border-right: 1px solid #b9c5dd;position: absolute;transform: rotate(45deg);top: -77px;left: 32px;
	}
	.empty-middle-down{
		width:220px;height:141px;border-radius:4px;border:1px solid #b9c5dd;
	}

	.empty-right{
		width: 70px;height: 210px;position:absolute;top: 104px;right: 44px;
		.empty-right-up{
			width: 10px;height: 10px;border: 2px solid #b9c5dd;border-radius: 50px;margin-left: 38px;
		}
		.empty-right-down{
			font-size: 20px;color: #bbc2d1;margin: 47px -90px 0px -55px;
		}
	}

	.empty-text{
		padding-top: 30px;padding-right: 103px;
	}
}
      }
    }
    .page-position{
      position: absolute;
      bottom: 10px;
      right: 18px;
    }
  }

</style>
