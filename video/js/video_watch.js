// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	classType:0,
	playTime:10000,
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
				// 课程类型   0: 视频 1: PPT
				this.classType = +res.classType;
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
				var obj = res.courseCategory || [];
				var videoShort = obj.videoShort || "";
				if(this.classType == 0){
					$("#video1").show();


					$("#video1,#video2").attr("src",videoShort);
					$("#video1")[0].play();
					// $("#video2")[0].play();
				}else{
					var imgs = videoShort.split(',');
					var html = [];
					imgs.forEach(function(item){
						html.push('<div class="swiper-slide"><img src="' + item + '" /></div>');
					});
					$(".swiper-wrapper").html(html.join(''));

					$(".swiper-container").show();
					
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						autoplay: this.playTime
					});
				}
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





