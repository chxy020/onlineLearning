// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		this.getHomeDataHttp();
	},
	bindEvent:function(){
	},
	pageLoad:function(){
	},
	//跳转到首页
	gotoIndex:function(evt){
		location.href = "../index.html";
	},
	getHomeDataHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/home";
		
		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				if(res.code == 0){
					var data = res.data || {};
					var sildeShow = data.sildeShow || [];
					var hot = data.hot || [];
					
				}else{
					layer.msg(res.message || "请求错误");
				}
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





