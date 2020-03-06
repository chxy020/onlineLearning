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
		$("#regFormBtn02").onbind("click",this.setReg,this);
	},
	pageLoad:function(){
	},
	//注册
	setReg:function(evt){
		var username = $("#username").val().trim() || "";
		// var vcode = $("#vcode").val().trim() || "";
		var password1 = $("#password1").val() || "";
		var password2 = $("#password2").val() || "";
		
		var name = $("#name").val().trim() || "";
		var comname = $("#comname").val().trim() || "";
		var email = $("#email").val().trim() || "";
		
		var traininglevel = +$("#traininglevel").val() || 0;
		

		var agreeck = $("#agreeck").is(":checked");

		var agreeck = $("#checkbox-1").is(":checked");

		if(!agreeck){
			layer.msg('请阅读服务条款');
			return;
		}
		
		
		// console.log(username,name,idcard,password1,password2,agreeck)
		
		var condi = {};
		condi.username = username;
		condi.password = password2;
		condi.name = name;
		condi.comname = comname;
		condi.email = email;
		condi.traininglevel = traininglevel;
		condi.usertype = 2;
		//注册
		this.sendRegHttp(condi);
	},
	gotoLogin:function(evt){
		location.href = "../login/login.html";
	},
	
	//发送获取验证码http请求
	getRegCodeHttp:function(tel){
		console.log("getRegCodeHttp___1");
		
		//this.getCodeCountDown();
		//return;
		
		var url = Base.serverUrl;
		//var url = "http://127.0.0.1:1001"
		var condi = {};
		condi.body = Base.body;
		condi.body.tokentype = 3;
		condi.call = {"api":"Bll.Buyer.User.Region.sendCodeSms","version":"100"};
		condi.data = {};
		condi.data.device = "WEB";
		condi.data.numbers = tel;
		//1是短信 2是语音
		condi.data.type = 1;
		
		console.log(JSON.stringify(condi));
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				console.log("getRegCodeHttp___2",res);
				var status = res.status - 0;
				var msg = _ErrorCode_[status] || res.msg || "";
				if(status === 0){
					//验证码获取成功
				}
				else{
					Utils.alert(msg);
				}
				
				this.getCodeCountDown();
			},
			error:function(res){
				Utils.alert("获取短信验证码错误");
				
				this.getCodeCountDown();
			}
		});
	},
	//注册请求
	sendRegHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/regist";
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				layer.msg(res.message || "注册成功");
				var t = this;
				setTimeout(function(){
					t.gotoLogin();
				},1200);
			},
			error:function(res){
				layer.msg(res.message || "注册错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





