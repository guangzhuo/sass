<template>
    <div class="errWrap">
        <div class="conatainer">
          <div class="error-bg-hu">
            <div class="error-title-hu">支付遇到问题</div>
            <div class="error-text-p">
              <div class="error-mar-p" v-for="(item,index) in acticeList" :key="index">
                <p>{{ item.title }}</p>
                <div class="text-box-hu" v-if="item.smallTitle">
                  <span v-html="item.smallTitle"></span>
                </div>
              </div>
            </div>
            <div class="text-center">
              <div class="error-footer-hu">
                <div></div>
                <span>如有疑问请联系客服</span>
                <div></div>
              </div>
              <div class="row footer-text-hu">
                <p>400-600-3669</p>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "pay_error",
      metaInfo: {
        title: '支付问题—云合同'
      },
      layout: 'contract',
      data() {
        return {
          acticeList:[
            {
              title: '1. 当你点击确认支付后，请不要关闭打开的页面，否则支付将无法完成。'
            },
            {
              title: '2. 如果你的支付信息银行没有及时传输给我们，导致银行卡已经扣款成功，但商品没有购买成功，我们感到非常抱歉。 不过请放心，我们会在第二个工作日和银行对账，确认你的扣款成功后，在能完成购买的情况下，立刻帮你完成购买， 否则相应款项会原路径返回你的支付账户。'
            },
            {
              title: '3. 打开支付页面，提示“该页无法显示”或空白页，可能是什么原因？',
              smallTitle:`A. 没有升级IE浏览器，导致加密级别过低，无法进入银行系统。<br/>
                          B. 上网环境或上网方式受限，可能是网络服务商限制，建议更换一种上网方式。<br/>
                          C. 尝试刷新页面；如果刷新不能解决问题，可能由于浏览器缓存设置的原因，请在IE菜单->工具->Internet选项->点击“删除cookies”和“删除文件”，用以清除临时文件。`
            },
            {
              title:'4. 银行页面打不开的解决方法？',
              smallTitle:`A. 没有升级IE浏览器，导致加密级别过低，无法进入银行系统。<br/>
                          B. 如果是个人电脑，请关闭你的防火墙再试。 <br/>
                          C. 在IE浏览器“工具”菜单->Internet选项->高级->安全，在SSL2.0和SSL3.0的选项前打勾。 <br/>
                          D. 查看密钥长度是否支持128位(IE->帮助->关于Internet Explorer)，如果低于128，请升级密钥包。`
            },
            {
              title:'5、为什么交易付款不成功？',
              smallTitle:`A. 你的银行卡尚未开通网上银行支付功能，建议你到当地营业厅开通网上银行<br/>
                          B. 所用银行卡超出该银行支持地域范围，请你更换银行卡试试；<br/>
                          C. 银行卡已过期、作废、挂失或者余额不足等，建议你咨询你的开户行；<br/>
                          D. 输入的银行卡号、密码或证件号等与预置的不符，建议你重新输入正确的卡密码或证件号等，如果你忘记了密码，请你及时与所属银行联系办理密码重置；<br/>
                          E. 银行系统数据传输可能出现异常，建议你刷新页面或者稍后重启电脑；<br/>
                          F. 快捷支付异常原因：账户绑定的银行卡过期或者你换了新的银行卡没有重新绑定，银行卡信息输入错误、短信码填错、信用卡CVV2写错、频繁请求、系统升级维护的原因，还请你根据系统提示查看具体原因重新操作付款。<br/>
                          G. 如遇活动高峰期导致付款不成功，建议你重新打开页面进行支付。`
            }
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
.errWrap{
  position: absolute;
  top:50px;
  left:0px;
  right:0px;
  background: #e6ecf5;
  padding: 25px 0 50px;
}
  .conatainer{
    width:1200px;
    margin:0 auto;
  }
  .error-bg-hu{
    background: #fff;
    padding: 150px 80px 45px;
    position: relative;
    .error-title-hu{
      position: absolute;
      text-align: center;
      font-size: 18px;
      left:-5px;
      top:0px;
      width: 160px;
      height: 50px;
      background: #699CFF;
      border-radius: 4px;
      line-height: 50px;
      color: #fff;
      &::after{
        position: absolute;
        left:-3px;
        bottom:-3px;
        content:'';
        width: 0;
        height: 0;
        border-top: 5px solid #2B66D8;
        border-left: 5px solid transparent;
        margin-left: 3px;
      }
    }
  }
  .error-text-p{
    color: #333;
    font-size: 18px;
    .error-mar-p{
      margin-bottom: 35px;
      p{
        margin-bottom: 20px;
      }
      .text-box-hu{
        background: #F3F5FB;
        border-radius: 2px;
        padding: 20px 15px;
        border: 1px solid #efefef;
        span{
          font-size: 16px;
          color: #959595;
        }
      }
    }
  }
  .text-center {
    text-align: center;
    .error-footer-hu {
      div {
        width: 93px;
        height: 1px;
        background: #D9D9D9;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        margin: 0 20px;
      }
    }
    .footer-text-hu{
      font-size: 24px;
      margin-top: 30px;
    }
  }
</style>
