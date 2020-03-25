// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();
	},
	bindEvent:function(){
		$("#subbtn").onbind("click",this.setLogin,this);
		$("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	keyDown:function(evt){
		if(evt.keyCode == 13){
			this.setLogin();
		}
	},
	//登录
	setLogin:function(evt){

		var username = $("#username").val().trim() || "";
		var password = $("#password").val().trim() || "";
		
		
		var condi = {};
		condi.username = username;
		condi.password = password;
		//登录
		this.sendLoginHttp(condi);
	},
	//跳转到首页
	gotoIndex:function(evt){
		location.href = "../index.html";
	},
	
	//注册请求
	sendLoginHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/login";
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				var userInfo = obj.userInfo || {};
				var user = obj.user || {};
				var token = obj.token || "";

				Utils.offlineStore.set("__userInfo",JSON.stringify(userInfo),true);
				Utils.offlineStore.set("__user",JSON.stringify(user),true);
				Utils.offlineStore.set("__token",token,true);

				if(userInfo.userCate == null){
					location.href = "/usercenter/select_category.html";
				}else{
					this.gotoIndex();
				}
			},
			error:function(res){
				layer.msg(res.message || "登录错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





