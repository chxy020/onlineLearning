// JavaScript Document
/**
 * file:注册
 * author:chenxy
 * date:2016-05-23
*/

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	xieyi:100,
	
	codeInter:null,
	
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		//this.moreLoad = $("#loadmore");
		$(window).onbind("load",this.pageLoad,this);
		$(window).onbind("touchmove",this.pageMove,this);
		this.bindEvent();
	},
	bindEvent:function(){
		$("#tel").onbind("input",this.telOnInput,this);
		$("#vcode").onbind("input",this.vcodeOnInput,this);
		
		$("#getCodeBtn").onbind("touchstart",this.btnDown,this);
		$("#getCodeBtn").onbind("touchend",this.getCodeBtnUp,this);
		
		$("#regbtn").onbind("touchstart",this.btnDown,this);
		$("#regbtn").onbind("touchend",this.regBtnUp,this);
		
		$("#loginbtn").onbind("touchstart",this.btnDown,this);
		$("#loginbtn").onbind("touchend",this.loginBtnUp,this);
	},
	pageLoad:function(){
	},
	pageMove:function(evt){
		this.moved = true;
	},
	pageHide:function(){
	},
	btnDown:function(evt){
		this.moved = false;
		var ele = evt.currentTarget;
		$(ele).addClass("curr");
	},
	btnUp:function(evt){
		var ele = evt.currentTarget;
		$(ele).removeClass("curr");
	},
	//手机号码检测
	telOnInput:function(evt){
		var tel = $("#tel");
		var val = tel.val().trim() || "";
		if(val.length >= 11){
			tel.val(val.slice(0,11));
			if(this.codeInter === null){
				$('#getCodeBtn').removeClass('countdown');
			}
		}
		else{
			$('#getCodeBtn').addClass('countdown');
		}
	},
	//验证码检测
	vcodeOnInput:function(evt){
		var vcode = $("#vcode");
		var val = vcode.val().trim() || "";
		if(val.length >= 6){
			vcode.val(val.slice(0,6));
		}
		else{
			return;
		}
	},
	//获取注册验证码
	getCodeBtnUp:function(evt){
		this.btnUp(evt);
		evt.preventDefault();
		
		if(this.moved){
			return;
		}
		
		var has = $('#getCodeBtn').hasClass('countdown');
		if(has){
			return;
		}
		
		var tel = $("#tel").val().trim() || "";
		if(tel === ""){
			Utils.alert("请输入手机号");
			return;
		}
		if(tel.length !== 11 || !Utils.isTel(tel)){
			Utils.alert("手机号输入错误");
			return;
		}
		
		if(this.codeInter === null){
			//请求获取验证码服务
			this.getRegCodeHttp(tel);
		}
		else{
			console.log("正在倒计时...")
			return;
		}
	},
	//验证码倒计时
	getCodeCountDown:function(){
		var t = this;
		var time = 60;
		
		if(this.codeInter === null){
			var timebtn = $("#getCodeBtn");
			timebtn.addClass("countdown");
			this.codeInter = setInterval(function(){
				time--;
				if(time > -1){
					timebtn.html(time + "秒");
				}
				else{
					timebtn.html("重新获取");
					timebtn.removeClass("countdown");
					clearInterval(t.codeInter);
					t.codeInter = null;
				}
			},1000);
		}
	},
	//注册
	regBtnUp:function(evt){
		this.btnUp(evt);
		evt.preventDefault();
		
		if(this.moved){
			return;
		}
		
		var tel = $("#tel").val().trim() || "";
		var vcode = $("#vcode").val().trim() || "";
		var shopname = $("#shopname").val().trim() || "";
		var bname = $("#bname").val().trim() || "";
		var invitecode = $("#invitecode").val() || "";
		
		if(tel === ""){
			Utils.alert("请输入手机号");
			return;
		}
		if(tel.length !== 11 || !Utils.isTel(tel)){
			Utils.alert("手机号输入错误");
			return;
		}
		if(vcode === ""){
			Utils.alert("请输入验证码");
			return;
		}
		if(vcode.length !== 6 || !Utils.isNumber(vcode)){
			Utils.alert("验证码输入错误");
			return;
		}
		if(shopname === ""){
			Utils.alert("请输入店铺名称或柜台号");
			return;
		}
		if(bname === ""){
			Utils.alert("请输入店主姓名");
			return;
		}
		if(invitecode === ""){
			Utils.alert("请输入邀请码");
			return;
		}
		
		//注册
		this.sendRegHttp(tel,vcode,shopname,bname,invitecode);
	},
	//跳转到登录
	loginBtnUp:function(evt){
		history.go(-1);
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
	sendRegHttp:function(tel,vcode,shopname,bname,invitecode){
		console.log("sendRegHttp__1");
		
		Utils.load();
		
		var url = Base.serverUrl;
		var condi = {};
		condi.body = Base.body;
		condi.body.tokentype = 1;
		condi.call = {"api":"Bll.Buyer.User.Region.region","version":"100"};
		condi.data = {};
		condi.data.mobile = tel;
		condi.data.name = bname;
		condi.data.commercial_name = shopname;
		condi.data.invite_code = invitecode;
		condi.data.code = vcode;
		condi.data.register_from = "WEB";
		condi.data.district = "";
		condi.data.address = "";
		condi.data.city = "";
		condi.data.version = "";
		
		console.log(JSON.stringify(condi));
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				console.log("sendRegHttp__2",res);
				var status = res.status - 0;
				var msg = _ErrorCode_[status] || res.msg || "";
				if(status === 0){
					//注册成功
					var data = res.data || {};
					var str = JSON.stringify(data);
					//保存用户数据到本地
					Utils.offlineStore.set("__userinfo__",str,true);
					//清除个人中心数据
					Utils.offlineStore.set("_usercenternum_","",false);
					//清除本地选择城市数据
					Utils.offlineStore.set("__selectedcity__","",true);
					
					//注册完成直接跳转到,选择城市,必须选择城市才能进入首页,后台说自己改,默认北京,还是跳首页
					location.href = "index.html";
				}
				else{
					Utils.alert(msg);
				}
				
				Utils.loadClose();
			},
			error:function(res){
				Utils.alert("注册错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
	// 添加事件监听
	//window.onorientationchange = page.orientationChange;
});





