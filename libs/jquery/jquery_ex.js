/**
 * file:zepto扩展
 * author:ToT
 * date:2015-05-13
*/

if(typeof(jQuery) != "undefined"){
	jQuery.fn.extend({
		eachonbind: function( type,fn, scope,date ) {
			return this.each(function(){
				$(this).bind(type,date, $.proxy(fn,scope));
			});
		},
		visible: function() {
			return this.each(function(){
				$(this).css('visibility', 'visible');
			});
		},
		hidden: function() {
			return this.each(function(){
				$(this).css('visibility', 'hidden');
			});
		},
		onbind: function( type,fn, scope,date ) {
			var browser = {"tap":"click","touchstart":"mousedown","touchmove":"mousemove","touchend":"mouseup","doubleTap":"dblclick","longTap":"dblclick"};
			var agent = navigator.userAgent.toLowerCase();
			var i = agent.indexOf("android");
			var j = agent.indexOf("iphone");
			var evt = type;
			if(i == -1 && j == -1){
				evt = browser[type];
			}
			if(evt == undefined){
				evt = type;
			}
			return  $(this).bind(evt,date, $.proxy(fn,scope));
		},
		rebind:function(type,fn, scope,date ) {
			var browser = {"tap":"click","touchstart":"mousedown","touchmove":"mousemove","touchend":"mouseup","doubleTap":"dblclick","longTap":"dblclick"};
			var agent = navigator.userAgent.toLowerCase();
			var i = agent.indexOf("android");
			var j = agent.indexOf("iphone");
			var evt = type;
			if(i == -1 && j == -1){
				evt = browser[type];
			}
			if(evt == undefined){
				evt = type;
			}
			//解除绑定
			$(this).unbind(evt);
			return  $(this).bind(evt,date, $.proxy(fn,scope));
		},
		onclick: function(fn, scope ) {
			return  $(this).click($.proxy(fn,scope));
		}
	});

	jQuery.Ajax = function(option){
		if(typeof option === "object" && option != null){
			var dataType = option.dataType || "json";
			if(dataType === "jsonp"){
				//jsonp请求
				var url = option.url || "";
				if(url !== ""){
					//标示,jsonp请求,
					option.data = option.data || {};
					//option.data.rtype = 2;
					
					option.url = url + "?callback=?&timer=" + new Date().getTime();
					$.ajax(option);
				}
				else{
					return false;
				}
			}
			else{
				//调用jquery-ajax请求
				//标示,返回Access-Control-Allow-Origin头,
				option.data = option.data || {};
				//上行统一标示
				var dd = option.data.data || "";
				if(dd !== ""){
					var reqkey = option.data.data.reqkey || "";
					if(reqkey === ""){
						reqkey = Utils.getGuid();
						option.data.data.reqkey = reqkey;
					}
				}
				//option.data.rtype = 1;
				
				$.ajax(option);
			}
		}
		else{
			return false;
		}
	}
}

