// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	classType:0,
	playTime:10000,
	titleId:[],
	showTime:[],
	swiper:null,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.id = +Utils.getQueryString("classId") || "";
		if(!this.id){
			layer.msg("没有获取到课程id");
			return;
		}

		this.bindEvent();

		this.getPayInfoHttp();

		
	},
	bindEvent:function(){
		$(".submit_btn").onbind("click",this.playBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
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
						history.go(-1);
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





