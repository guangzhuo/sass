import Vue from 'vue';
const service = function ({type = 'info',duration=3000, spinnerText}={}) {
    var styleval = '';//定义颜色
    //判断消息类型，type默认值为info

    switch (type){
      case 'info': styleval = '#e6f0ff'; break;
      case 'success':styleval = '#e6faff'; break;
      case 'warning': styleval='#fff7de'; break;
      case 'error':styleval='#ffedec';break;
      default:
        styleval = '#e6f0ff';
    }
    let MessageOptions = {
      type: type,
      duration:duration
    };
    if (spinnerText){
      MessageOptions = Object.assign(MessageOptions,{
        lock: true,
        message:`<span style="color:#333">${spinnerText}<span>`,
        dangerouslyUseHTMLString: true,
        customStyle: {
          backgroundColor: styleval,
          minWidth: '316px',
          padding: '8px 15px 8px 20px'
        }
      });
    }

    return Vue.prototype.$message(MessageOptions)
}

export default service;
