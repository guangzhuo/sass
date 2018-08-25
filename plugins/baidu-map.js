import { asyncLoadJsFile } from '~/framework/core/utils'
export default function () {
	window.HOST_TYPE = "2";
  window.BMap_loadScriptTime = (new Date).getTime();
	return asyncLoadJsFile('https://api.map.baidu.com/getscript?v=2.0&ak=5XIkFqy9TdvOBKePYQzoQhkMrxIp10O4&services=&t=20171206160303')
    
	// return asyncLoadJsFile('https://api.map.baidu.com/getscript?v=2.0&ak=eb90ECrF7BpjWQcLFkmNTkV2&services=&t=20171206160303')
}
