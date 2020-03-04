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
		$("#subbtn").onbind("click",this.setReg,this);
	},
	pageLoad:function(){
	},
	//注册
	setReg:function(evt){

		var username = $("#username").val().trim() || "";
		var password = $("#password").val() || "";
		
		console.log(username,name,idcard,password1,password2,agreeck)
		
		var condi = {};
		condi.username = username;
		condi.password = password;
		//登录
		this.sendLoginHttp(condi);
	},
	//跳转到登录
	loginBtnUp:function(evt){
		history.go(-1);
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

				Utils.loadClose();
			},
			error:function(res){
				console.log(res);
				layer.msg("登录错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





