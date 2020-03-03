/**
 * file:微信自定义分享公共类
 * author:chenxy
 * date:2015-04-22
*/
;(function(window){
	if (typeof WeiXin === "undefined") {
		WeiXin = {};
	}
	//是否已经请求到微信签名
	var hasSign = false;
	//请求微信签名
	function getWeiXinSignKey(){
		//格式化请求参数
		var location = window.location;
		var curUrl = location.href;
		var url = Base.weixinSignUrl;
		//curUrl = encodeURIComponent(curUrl);
		$.Ajax({
			type:"GET",
			data:{"surl":curUrl},
			dataType:"jsonp",
			url:url,
			success: function(data){
				//console.log("wx------",data);
				var code = data.code - 0;
				var msg = data.msg || "获取微信签名错误";
				if(code === 200){
					var obj = data.data || {};
					initWXCondi(obj);
					hasSign = true;
				}
				else{
					alert(msg);
				}
			},
			error:function(msg,a,b){
			},
			complete:function(msg){
			}
		});


		/*
		 * 微信初始化参数
		*/
		function initWXCondi(obj){
			if(typeof wx != "undefined"){
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: obj.appid,//'wx117a498bb6fd56cd', // 必填，公众号的唯一标识//wx85eb0c568187aa88
					timestamp:obj.timestamp,//"1429347449" , // 必填，生成签名的时间戳
					nonceStr: obj.noncestr,//'UfxuCpB06zaKNhZp', // 必填，生成签名的随机串
					signature: obj.signature,//'affc06d902f14c46a533b6cd70b4eb30549c4c86',// 必填，签名，见附录1
					jsApiList: ["checkJsApi","onMenuShareTimeline","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.error(function (res) {
					//alert('wx.error: '+JSON.stringify(res));
				});
			}
		}
	}

	function setWeiXinCondi(data){
		//格式化请求参数
		var shareTitle = "极路客精彩视频分享";
		//1.直播2.点播
		var type = data.type - 0 || 2;
		//type = 1;
		if(type === 1){
			shareTitle = "极路客精彩直播分享";
		}
		var shareDesc = data.desc || "精彩视频";
		//var shareLink = location.href.replace(/vid=(\w|\-)+/g,"vid=" + data.videoid);
		//shareLink = shareLink.replace(/type=\d+/g,"type=" + data.shareType);

		var shareLink = location.href;
		if(shareLink.indexOf("vid=") > -1){
			shareLink = shareLink.replace(/vid=(\w|\-)+/g,"vid=" + data.videoid);
		}
		else{
			shareLink = shareLink.substring(0,shareLink.indexOf(".html") + 5);
			shareLink = shareLink + "?vid=" + data.videoid;
		}
		if(shareLink.indexOf("type=") > -1){
			shareLink = shareLink.replace(/type=\d+/g,"type=" + data.shareType);
		}
		else{
			shareLink = shareLink + "&type=" + data.shareType;
		}

		var shareImg = data.picture || "";

		if(typeof wx != "undefined" && hasSign == true){
			wx.ready(function(){
				wx.checkJsApi({
					jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {
						// 以键值对的形式返回，可用的api值true，不可用为false
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
					}
				});

				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: shareDesc, // 分享标题
					link: shareLink, // 分享链接
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						$(".share-bar-outer").animate({"bottom":"-210px"},300,"linear",function(){
							$(".share-page").hide();
						});
						$("#wXshare-out").hide();
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

				//分享给朋友
				wx.onMenuShareAppMessage({
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: shareLink, // 分享链接
					imgUrl: shareImg, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					trigger: function (res) {
						//alert('用户点击分享到朋友圈');
					},
					success: function (res) {
						//alert('已分享');
						$(".share-bar-outer").animate({"bottom":"-210px"},300,"linear",function(){
							$(".share-page").hide();
						});
						$("#wXshare-out").hide();
					},
					cancel: function (res) {
						//alert('已取消');
					},
					fail: function (res) {
						//alert('wx.onMenuShareTimeline:fail: '+JSON.stringify(res));
					}
				});

				wx.onMenuShareQQ({
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: shareLink, // 分享链接
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						$(".share-bar-outer").animate({"bottom":"-210px"},300,"linear",function(){
							$(".share-page").hide();
						});
						$("#wXshare-out").hide();
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

				wx.onMenuShareWeibo({
					title: shareTitle, // 分享标题
					desc: shareDesc, // 分享描述
					link: shareLink, // 分享链接
					imgUrl: shareImg, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
						$(".share-bar-outer").animate({"bottom":"-210px"},300,"linear",function(){
							$(".share-page").hide();
						});
						$("#wXshare-out").hide();
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
			});

			wx.error(function (res) {
				//alert('wx.error: '+JSON.stringify(res));
			});
		}
		else{
			setTimeout(function(){
				setWeiXinCondi(data);
			},500);
		}
	}

	WeiXin.getWeiXinSignKey = getWeiXinSignKey;
	WeiXin.setWeiXinCondi = setWeiXinCondi;
})(window);























