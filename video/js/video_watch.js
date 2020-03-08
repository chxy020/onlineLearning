// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.id = +Utils.getQueryString("id") || "";
		if(!this.id){
			layer.msg("没有获取到课程id");
			return;
		}

		this.bindEvent();

		this.getInClassHttp();
	},
	bindEvent:function(){
		$("#buybtn").onbind("click",this.buyBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getInClassHttp:function(){
		Utils.load();
		var url = Base.serverUrl + "/class/inclass/" + this.id;
		var condi = {};

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || [];
				var html = [];
				var icid = 0;
				obj.forEach(function(item,i){
					if( i == 0){
						icid = item.id;
					}
					html.push('<li data="' + item.id + '"><a href="javascript:;">' + (i+1)+'、' + item.title + '</a></li>')
				});

				$("#inclasslist").html(html.join(''));

				$("#inclasslist li").rebind('click',this.inclassItemClick,this);

				//默认加载第一条
				this.getIncateHttp(icid);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	inclassItemClick:function(evt){
		var ele = evt.currentTarget;
		var icid = +$(ele).attr("data");
		this.getIncateHttp(icid);
	},

	getIncateHttp:function(id){
		Utils.load();
		var url = Base.serverUrl + "/class/incate/" + id;
		var condi = {};
		condi.id = id;
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || [];
				
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	buyBtnClick:function(evt){
		
	},
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





