import * as axios from 'axios'
import _ from 'lodash'
import  { createRouter } from '../../app/router'

const router = createRouter();
let options = {
  timeout: 100000,
  // withCredentials: true,
  // headers: {
  //   post: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //   }
  // }
  // transformRequest: [function (data, headers) {
  //   debugger
  //   let ret = '';
  //   switch(true) {
  //     case (_.isPlainObject(data) === true):
  //       for (let it in data) {
  //         ret += encodeURIComponent(it) +
  //         '=' +
  //         encodeURIComponent(data[it]) +
  //         '&'
  //       }
  //       return ret;
  //     break;
  //     case (_.isArray(data) === true):
  //       _.forEach(data, (value)=>{
  //         _.forIn(value, (v_v, v_k)=> {
  //          ret += encodeURIComponent(v_k) +
  //           '=' +
  //           encodeURIComponent(v_v) +
  //           '&';
  //         });
          
  //       });
  //       return ret;
  //     break;
  //   }
  // }],
  // params: {
  //   _: +new Date()
  // },
  headers: {'X-Requested-With': 'XMLHttpRequest'},
};

let axiosInstance = axios.create(options);
axiosInstance.interceptors.request.use((config)=> {

  if(!config.params) {
    config.params = {};
  }
  config.params._ = Date.now();
  if (config.method === 'post' && config.data) {
    // debugger
    config.transformRequest = [
      function(data) {
        let ret = '';
        switch(true) {
          case (_.isPlainObject(data) === true):
            for (let it in data) {
              ret += encodeURIComponent(it) +
              '=' +
              encodeURIComponent(data[it]) +
              '&'
            }
            return _.trimEnd(ret, '&');
          break;
          case (_.isArray(data) === true):
            _.forEach(data, (value)=>{
              _.forIn(value, (v_v, v_k)=> {
               ret += encodeURIComponent(v_k) +
                '=' +
                encodeURIComponent(v_v) +
                '&';
              });
              
            });
            return ret;
          break;
        }
      }
    ]
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response)=> {
  // 对响应数据做点什么
  return response;
}, (error)=> {
  let [statusCode, statusText] = [error.response.status, error.response.statusText];
  // console.error('error urlpath:' + error.config.url)
  // console.error('error type: ' + error.response.status)
  // console.error('error text:' + error.response.statusText)
  
  // console.log(error);
  if(statusCode == 404) {
    _lvx.router.push({path: '/404'});
  } else if (statusCode >= 500) {
    _lvx.router.push({path: '/error/500'});
  } else if (statusCode ==  401) {
    _lvx.router.push({path: '/login'});
  }
  // return Promise.resolve({
  //   // `data` 由服务器提供的响应
  //   data: {
  //     code: -1,
  //     data: {}
  //   },

  //   // `status` 来自服务器响应的 HTTP 状态码
  //   status: 200,

  //   // `statusText` 来自服务器响应的 HTTP 状态信息
  //   statusText: 'OK',

  //   // `headers` 服务器响应的头
  //   headers: {},

  //   // `config` 是为请求提供的配置信息
  //   config: {}
  // });
  return Promise.reject(error.message);
});

export default axiosInstance;
