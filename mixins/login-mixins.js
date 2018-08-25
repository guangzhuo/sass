import apis from '~/config/api'
let loginMixin = {
  data() {
    return {
     
    };
  },
  computed: {
    _expTime() {
      return 'expTime';
    },
    _sessionTime() {
      return 1790000; //过期时间30分钟
    }
  },
  methods: {
    /*
    描述：设置登陆过期时间
    参数： 
      time: 过期时间xxx毫秒级
    */
    resetExpTime(time) {
      let expDate = time == -1 ? new Date(time) : new Date();
      expDate.setTime(expDate.getTime() + this._sessionTime);
      if(navigator.cookieEnabled){//是否启用cookie
          document.cookie = "validFlag=ok;path=/;expires=" + expDate.toUTCString();
      }
      if(sessionStorage){//是否支持sessionStorage
          sessionStorage.setItem(this._expTime, expDate.getTime());
      }
    },
    /*
    描述：退出登陆接口调用
    参数： 
      targetUrl: xxx
    */
    async logout(targetUrl) {
      return await this.$axios.get(apis.loginout, {
        params: {
          baseUrl: `${location.protocol}//${location.host}`,
          targetUrl: targetUrl
        }
      }).then((data) => data.data);
    },
    /*
    描述：
      根据登陆用户token id
    参数：
      _name: 登陆id
      _passwd: 登陆密码
      verify: 验证票(验证码信息、用户基本信息)
        {
          username: '',
          password: '',
          csessionid: '',
          sig: '',
          token: '',
          scene: '',
          lt: 'LT-763-cRBIVTjngujIa9gYKcTVMsITSfkYpB',
          execution: 'e4s1',
          _eventId: 'submit'
        }
    返回值：
      正常：Token id
      异常：''
    */
    async getTGT (_name, _passwd, verify) {
      let self = this;
      let loginData = Object.assign({username: _name,password: _passwd,service: `${location.protocol}//${location.host}/user/userInfo/login?loginFlag=1`}, verify);
      var reg = new RegExp("TGT-.*?org");
      var TGT = '';
      const token = await self.$axios({
          method: 'post',
          url: apis.getTicket,
          data: loginData
      })
      .then((response)=> response);
      TGT = reg.exec(token.data).toString();
      return TGT;
    },
    /*
      描述：
        获取登陆用户session id
      参数：
        _name: 登陆id
        _passwd: 登陆密码
        token: token id
      返回值：
        正常：Session id
        异常：''
    */
    async getST(_name, _passwd, token) {
      let self = this;
      let sessionId = '';
      const r = await self.$axios.post(`${apis.getTicket}/${token}`, {
        username: _name,
        password: _passwd,
        service: `${location.protocol}//${location.host}/user/userInfo/login?loginFlag=1`
      }).then((response)=> response);

      sessionId = r.data;
      return sessionId;
    },
    /*
      描述：
        登陆应用
      参数：
        fx:
        sessionId: sessionid
      返回值：
        成功：true
        失败：false
    */
    async loginApp(fx, sessionId) {
      let self = this;
      let url  = apis.userLogin + (fx ? "?loginFlag=1&ticket=" + sessionId : "");
      const r = await self.$axios.get(url).then((data) =>data.data);
      if(r.userId > 0) {
        return true;
      } else {
        if(location.hostname == 'localhost') {
          return true;
        } else {
          return false
        }
      }
    }
  }
};
export default loginMixin;