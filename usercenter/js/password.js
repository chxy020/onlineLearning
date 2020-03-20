// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	time:61,
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();
	},
	bindEvent:function(){
		$("#regFormBtn02").onbind("click",this.setChangePwd,this);
	},
	pageLoad:function(){
	},
	getMsgCode:function(){

		var username = $("#username").val();
		var icode = $("#icode").val() || "";

		$("#usernamemsg").html("");
		if(!username){
			$("#usernamemsg").html("手机号不能为空");
			return;
		}
		if(!Utils.isTel(username)){
			$("#usernamemsg").html("手机号输入错误");
			return;
		}

		$("#icodemsg").html("");
		if(!icode){
			$("#icodemsg").html("验证码不能为空");
			return;
		}
		if(icode.length != 4){
			$("#icodemsg").html("验证码输入错误");
			return;
		}

		var condi = {};
		condi.status = 0;
		condi.username = username;
		condi.code = icode;
		this.getMsgCodeHttp(condi);
	},
	getMsgCodeHttp:function(condi){
		Utils.load();
		var url = Base.serverUrl + "/getCode";

		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				if(res.code == 0){
					var data = res.data || "";
					
				}else{
					layer.msg(res.message || "请求错误");
				}
				$(".message_code_again").show();
				this.msgCodeTime();
			},
			error:function(res){
				layer.msg(res.message || "请求错误");

				$(".message_code_again").show();
				this.msgCodeTime();
			}
		});
	},
	msgCodeTime:function(){
		if(this.time > 0){
			this.time--;
			$(".message_code_again em").html(this.time);
			setTimeout(function(){
				this.msgCodeTime();
			}.bind(this),1000);
		}else{
			$(".message_code_again").hide();
		}
	},

	setChangePwd:function(evt){

		var username = $("#username").val().trim() || "";
		var oldPassword = $("#password3").val() || "";
		var password1 = $("#password1").val() || "";
		var password2 = $("#password2").val() || "";
		
		$("#usernamemsg").html("");
		if(!username){
			$("#usernamemsg").html("手机号不能为空");
			return;
		}
		if(!Utils.isTel(username)){
			$("#usernamemsg").html("手机号输入错误");
			return;
		}

		$("#password3msg").html("");
		if(!oldPassword){
			$("#password3msg").html("旧密码不能为空");
			return;
		}

		$("#password1msg").html("");
		if(!password1){
			$("#password1msg").html("新密码不能为空");
			return;
		}

		$("#password2msg").html("");
		if(!password2){
			$("#password2msg").html("新密码不能为空");
			return;
		}


		if(password1 != password2){
			$("#password2msg").html("两次密码输入不一致");
			return;
		}
		

		var agreeck = $("#checkbox-1").is(":checked");

		if(!agreeck){
			layer.msg('请阅读服务条款');
			return;
		}
		
		
		// console.log(username,name,idcard,password1,password2,agreeck)
		
		var condi = {};
		condi.username = username;
		condi.newPassword = password2;
		condi.oldPassword = oldPassword;
		// condi.usertype = 1;
		this.sendChangePasswordHttp(condi);
	},
	gotoLogin:function(evt){
		location.href = "../login/login.html";
	},
	sendChangePasswordHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/user/modifyPassword";
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				layer.msg(res.message || "请求错误");
				setTimeout(function(){
					this.gotoLogin();
				}.bind(this),1200);
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





