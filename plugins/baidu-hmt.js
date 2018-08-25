
export default function (router) {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?e4c284b2d6a561858c166f48f8bd3ad2";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  window.onAppReady((app) => {
    app.$router.afterEach((to, from) => {
      _hmt.push([ "_trackPageview",to.fullPath]);
    })
  }) 
  
}

