<template>
  <sas-dialog
    :show.sync="visible"
    title="完整律师服务流程详情"
    width="700px"
    class="lawer-dialog"
    @close="$emit('update:show', false)"
  >
    <div class="content">
      <div class="box">
        <div class="process">
          <img  src="~/assets/img/src/manage/process.png">
        </div>
        <div class="row title">
            <div class="col-xs-60 sas-align-right sas-float-left">请选择所需的服务类型</div>
            <div class="col-xs-30 small">（服务时间：工作日9:00-18:00）</div>
        </div>
        <div class="row action-panel">
          <div class="col-xs-8 col-xs-offset-2 lawyer-pad">
            <div class="lawyer-service-box">
              <div class="row sas-align-center action-title">
                <i class="iconsprite icon-examine-icon sas-mright-5"></i><span class="sas-color-theme sas-fsize-16">律师审查</span>
              </div>
              <div class="subtitle sas-align-center">(资深律师为你提供专业服务)</div>
              <div class="row img sas-align-center">
                <div class="col-xs-6">
                  <img src="~/assets/img/src/manage/examine.png">
                  <p>内完成</p>
                  <sas-button category="gray" size="medium" @click="toLawerOrder('LAWYER_CERSOR_2')">点击购买</sas-button>
                </div>
                <div class="col-xs-6">
                  <img src="~/assets/img/src/manage/examine1.png">
                  <p>内完成</p>
                  <sas-button category="gray" size="medium" @click="toLawerOrder('LAWYER_CERSOR_1')">点击购买</sas-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </sas-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show
      }
    },
    props: {
      show: Boolean,
      pid: {
        type: [String, Number]
      },
      contractTitle: {
        type: String
      }
    },
    mounted () {
    },
    watch: {
      show () {
        this.visible = this.show;
      }
    },
    methods: {
      toLawerOrder(code) {
        this.$router.push({path: '/manage/user/order/lawyer-order-confirm', query: {code: code, count: 1, pid: this.pid, contractTitle: this.contractTitle}});
        this.$emit('update:show', false);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~styles/base.scss";
  .col-xs-60{
    width: 60%;
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

