// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.id = +Utils.getQueryString("id") || "";
		if(!this.id){
			layer.msg("没有获取到文章id");
			return;
		}


		this.getPageContent();
	},
	bindEvent:function(){
		// $("#buybtn").onbind("click",this.buyBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getPageContent:function(){
		Utils.load();
		var url = Base.serverUrl + "/home/getPage/" + this.id;
		var condi = {};

		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(data){
				var pageContent = data.pageContent || "";
				$(".pindao_cont").html(pageContent);
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





