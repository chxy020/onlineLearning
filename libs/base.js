/**
 * file:全局变量
 * author:chenxy
 * date:2015-05-21
*/

;(function(window) {
	if (typeof Base === "undefined") {
		Base = {};
	}

	var serverUrl = "http://2a963r3510.picp.vip";

	//从本地获取token数据
	var token = "";
	if(typeof(Utils) !== "undefined"){
		token = Utils.offlineStore.get("__token",true) || "";
	}

	Base.token = token;
	Base.serverUrl = serverUrl;
}(window));





//错误码
var _ErrorCode_ = {
	'1':'调用的类不存在.',
	'2':'调用的类方法不存在.',
	'3':'未知异常.',
	'4':'调用方式不正确.',
	'5':'参数异常',
	'6':'代码发生严重错误!',
	'7':'执行过程异常抛出!',
	'8':'系统执行异常.',
	'9':'返回消息未定义',
	'10':'请求未授权',
	'-1':'数据格式出错',
	'-2':'token为空',
	'-3':'缓存处理异常',
	'-4':'请求出现异常'
};
