
import {isNotBrowser} from '~/framework/core/utils'

export default function (router) {
    window.onAppReady((app) => {
        if (isNotBrowser()) {
            let warnTemp = `
                <strong>部分功能不支持当前浏览器版本，建议升级或下载如下浏览器</strong>
                <div class="row browser-bg1">
                    <ul >
                        <li><a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank">
                        <img src="./static/img/ie.png"><br>新版IE浏览器</a></li>
                        <li><a href="http://www.mozillaonline.com/" target="_blank"><img src="./static/img/firefox.png"><br>火狐</a></li>
                        <li><a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html" target="_blank"><img src="./static/img/chrome.png"><br>chrome</a></li>
                    </ul>
                </div>
                <style>
                  .browser-bg1{
                    background-color: #fff;
                    text-align: center;
                  }
                  .browser-bg1 ul {
                    list-style: none;
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                  }
                  .browser-bg1 ul li {
                    float: left;
                    margin: 0 20px;
                    font-size: 11px;
                  }
                  .browser-bg1 a {
                    text-decoration: none;
                    color: #515151;
                  }
                  .browser-bg1 a:focus, .browser-bg1 a:hover {
                    text-decoration: none;
                    color: #f8b62c;
                  }
                  .browser-bg1 img {
                    width: 46px;
                    padding: 10px 0;
                  }

                </style
                `
            app.$alert(warnTemp, '提示', {
                dangerouslyUseHTMLString: true
            });
        }
    }) 
  
}

