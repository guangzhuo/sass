import _ from 'lodash'
import Enum from './Enum'
import Maps from './Maps'
let utils = {
  data() {
    return {
      
      // __orderStatusDic: [{
      //   value: '',
      //   label: '全部'
      // }, {
      //   value: Enum.OrderStatusEnum.unpaid,
      //   label: '待支付'
      // }, {
      //   value: Enum.OrderStatusEnum.unreceiving,
      //   label: '待接单'
      // }, {
      //   value: Enum.OrderStatusEnum.inservice,
      //   label: '进行中'
      // }, {
      //   value: Enum.OrderStatusEnum.unconfirmed,
      //   label: '待确认'
      // },{
      //   value: Enum.OrderStatusEnum.completed,
      //   label: '已完成'
      // },{
      //   value: Enum.OrderStatusEnum.canceled,
      //   label: '已取消'
      // }],
    };
  },
  computed: {
    __orderStatusEnum() { return Enum.OrderStatusEnum },
    __orderStatusDic() {
      return [{
        value: '',
        label: '全部'
      }, {
        value: Enum.OrderStatusEnum.unpaid,
        label: '待支付'
      }, {
        value: Enum.OrderStatusEnum.unreceiving,
        label: '待接单'
      }, {
        value: Enum.OrderStatusEnum.inservice,
        label: '进行中'
      }, {
        value: Enum.OrderStatusEnum.unconfirmed,
        label: '待确认'
      },{
        value: Enum.OrderStatusEnum.completed,
        label: '已完成'
      },{
        value: Enum.OrderStatusEnum.canceled,
        label: '已取消'
      }];
    },
    __serviceOrderStatusDic() {
      return [{
        value: '',
        label: '全部'
      }, {
        value: Enum.ServiceOrderStatusEnum.unreceiving,
        label: '待接单'
      }, {
        value: Enum.ServiceOrderStatusEnum.inservice,
        label: '进行中'
      }, {
        value: Enum.ServiceOrderStatusEnum.unconfirmed,
        label: '待确认'
      },{
        value: Enum.ServiceOrderStatusEnum.completed,
        label: '已完成'
      }];
    }
  },
  filters: {
    __formatDataFilter(val) {
      var day = new Date(val);
      var Year = 0, Month = 0, Day = 0, Hour = 0;
      var CurrentDate = "";
      //初始化时间
      Year = day.getFullYear();//ie火狐下都可以
      Month = day.getMonth() + 1;
      Day = day.getDate();
      Hour = day.getHours();
      // Minute = day.getMinutes();
      // Second = day.getSeconds();
      CurrentDate += Year + "年";
      if (Month >= 10) {
          CurrentDate += Month + "月";
      } else {
          CurrentDate += "0" + Month + "月";
      }
      if (Day >= 10) {
          CurrentDate += Day + "日 ";
      } else {
          CurrentDate += "0" + Day + "日 ";
      }
      return CurrentDate;
    },
    __orderStatusFilter(statusVal) {
      return Maps.OrderStatusMap[statusVal];
    },
    __serviceOrderStatusFilter(statusVal) {
      return Maps.ServiceOrderStatusMap[statusVal];
    },
    __hiddenPhoneNumMiddle(phoneNum) {
      return phoneNum.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2');
    }

  },
  methods: {
    /*
    描述：时间戳格式化
    参数： 
      time: 时间戳
    返回值:
      String: YYYY年MM月DD日
    */
    __formatDate(time) {
      var day = new Date(time);
      var Year = 0, Month = 0, Day = 0, Hour = 0;
      var CurrentDate = "";
      //初始化时间
      Year = day.getFullYear();//ie火狐下都可以
      Month = day.getMonth() + 1;
      Day = day.getDate();
      Hour = day.getHours();
      // Minute = day.getMinutes();
      // Second = day.getSeconds();
      CurrentDate += Year + "年";
      if (Month >= 10) {
          CurrentDate += Month + "月";
      } else {
          CurrentDate += "0" + Month + "月";
      }
      if (Day >= 10) {
          CurrentDate += Day + "日 ";
      } else {
          CurrentDate += "0" + Day + "日 ";
      }
      /*        if (Hour >= 10) {
       CurrentDate += Hour+ "时";
       } else {
       CurrentDate += "0" + Hour+ "时";
       }*/
      return CurrentDate;
    },
    /*
    描述：时间戳格式化
    参数： 
    返回值:
      String: 全局router配置项base的值
    */
    __getRouterBase() {
      return this.$router.options.base;
    },
    /*
    描述：关闭当前窗体
    */
    __closeCurWindow() {
      //FF中需要修改配置window.close方法才能有作用，为了不需要用户去手动修改，所以用一个空白页面显示并且让后退按钮失效
      //Opera浏览器旧版本(小于等于12.16版本)内核是Presto，window.close方法有作用，但页面不是关闭只是跳转到空白页面，后退按钮有效，也需要特殊处理

      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
        window.open('','_parent');
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },
    __clipTextOverflow(str, length) {
      if(str.length > length) {
        return `${str.substring(0, length)}...`;
      } else {
        return str;
      }
    }
  }
};
export default utils;