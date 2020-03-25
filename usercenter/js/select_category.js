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

		// this.id = +Utils.getQueryString("classId") || "";
		// if(!this.id){
		// 	layer.msg("没有获取到课程id");
		// 	return;
		// }

		this.bindEvent();

		// this.getPayInfoHttp();

		
	},
	bindEvent:function(){
		$(".celectlist li").onbind("click",this.changeTypeClick,this);
		$("#regFormBtn02").onbind("click",this.paybtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	typeid:0,
	changeTypeClick:function(evt){
		var ele = evt.currentTarget;
		$(".celectlist li").removeClass("on");
		$(ele).addClass("on");
		this.typeid = +ele.id;
	},
	paybtnClick:function(){
		location.href="/usercenter/category_confirmation.html?type="+this.typeid;
	}

};

//页面初始化
$(function(){
	var page = new PageManager({});
});





