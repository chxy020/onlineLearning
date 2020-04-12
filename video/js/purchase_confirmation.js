// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	userAudit:0,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.id = +Utils.getQueryString("classId") || "";
		if(!this.id){
			layer.msg("没有获取到课程id");
			return;
		}

		this.bindEvent();

		this.getUserInfo();
		
		this.getPayInfoHttp();

		
	},
	bindEvent:function(){
		$(".submit_btn").onbind("click",this.playBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getUserInfo:function(){
		var user = Utils.offlineStore.get("__userInfo",true) || "";
		if(!!user){
			user = JSON.parse(user);
			this.userAudit = +user.userAudit || 0;
			// var nickname = user.userNickname || "";

			// var auditStatus = ["未审核","审核中","审核通过","审核未通过"];
			// $("#userNickname").html(nickname);
			// $("#userAudit").html(auditStatus[this.userAudit]);
			// userAudit字段获得，0：未审核；1：审核中；2：审核通过；3：审核未通过。 
		}
	},
	getPayInfoHttp:function(){
		Utils.load();
		var url = Base.serverUrl + "/pay/create"
		var condi = {};
		condi.classId = this.id;

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				var html = [];
                html.push('<p>课程名： <span>' + obj.classTitle + '</span></p>');
                html.push('<p>课程数量：<span>' + obj.classCount + '节</span></p>');
				html.push('<p>总金额：<span>' + obj.totalFee + '元</span></p>');
				
				$(".pc_text").html(html.join(''));
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	orderNumber:"",
	playBtnClick:function(){
		var iswx = $("#wxpay:checked").val();
		if(iswx){
			this.wxPay();
		}else{
			this.aliPay();
		}
	},
	aliPay:function(){
		Utils.load();
		var url = Base.serverUrl + "/aliPay/classAliPay"
		var condi = {};
		condi.classId = this.id;

		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || "";
				if(obj){
					$("body").html(obj);
					
					// this.getOrderStatusHttp();
				}else{
					layer.msg("没有获取到支付页面");
				}
				
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	wxPay:function(){
		Utils.load();
		var url = Base.serverUrl + "/pay/classWxPay"
		var condi = {};
		condi.classId = this.id;

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				if(obj.payScanner){
					this.orderNumber = obj.orderNumber || "";
					$("#payCode").show();
					$("#payCode img").attr("src",obj.payScanner);
					
					this.getOrderStatusHttp();
				}else{
					layer.msg("没有获取到支付二维码");
				}
				
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},

	getOrderStatusHttp:function(){
		if(this.orderNumber){
			// Utils.load();
			var url = Base.serverUrl + "/pay/orderStatus"
			var condi = {};
			condi.orderNum = this.orderNumber;
			
			$.Ajax({
				url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
				success: function(res){
					var obj = res.data || {};
					// {"data":{"orderStatus":false},"message":"订单状态获取成功"}
					if(obj.orderStatus){
						//为0或3时打开档案填写表格，并弹出对话框提醒用户档案必须填写
						if(this.userAudit == 0 || this.userAudit == 3){
							location.href = "/usercenter/archives.html";
						}else{
							history.go(-1);
						}
					}else{
						setTimeout(function(){
							this.getOrderStatusHttp();
						}.bind(this),1000);
					}
				},
				error:function(res){
					layer.msg(res.message || "请求错误");
				}
			});
		}
	}




















};

//页面初始化
$(function(){
	var page = new PageManager({});
});





