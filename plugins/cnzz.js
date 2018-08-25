


export default function (router) {
    //声明_czc对象:
    var _czc = _czc || [];
    //绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
    _czc.push(["_setAccount", "1262545808"]);
    _czc.push(["_setAutoPageview", false]);
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1262545808'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1262545808' type='text/javascript'%3E%3C/script%3E"));

    window.onAppReady((app) => {
        app.$router.afterEach((to, from) => {
            _czc.push([ "_trackPageview",to.fullPath]);
        })
    }) 
  
}

