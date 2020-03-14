// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		this.getHomeDataHttp();
	},
	bindEvent:function(){
	},
	pageLoad:function(){
	},
	//跳转到首页
	gotoIndex:function(evt){
		location.href = "../index.html";
	},
	getHomeDataHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/home";
		
		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var data = res.data || {};
				var slideShow = data.sildeShow || [];
				var hot = data.hot || [];
				this.setSlideImageHtml(slideShow);
				this.setHotCourseHtml(hot);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	setSlideImageHtml:function(data){
		var images = [];
		var slidetab = [];
		for(var i = 0,len = data.length; i < len; i++){
			var item = data[i] || {};
			var courseId = item.courseId;
			var imgSrc = item.imgSrc;
			if(i == 0){
				images.push('<li class="on"><a href="/video/video_watch.html?id=' + courseId + '"><img src="' + imgSrc + '"></a></li>');
				slidetab.push('<span class="on">1</span>');
			}else{
				images.push('<li ><a href="/video/video_watch.html?id=' + courseId + '"><img src="' + imgSrc + '"></a></li>');
				slidetab.push('<span class="">' + (i+1) + '</span>');
			}
		}
		$(".testSlidePics").html(images.join(''));
		$(".testSlideTabs").html(slidetab.join(''));

		this.slideImageInit();
	},
	slideImageInit:function(){
		$(".testSlide1").slideGradual({
	        slideCon:".testSlidePics",
	        tabCon:".testSlideTabs",
	        btnLeft:".testBtnLeft",
	        btnRight:".testBtnRight",
	        fadeInTime:900,
	        fadeOutTime:1400,
	        intervalTime:3400
	    });
	    $(".testSlide2").slideGradual({
	        slideCon:".testSlidePics",
	        tabCon:".testSlideTabs",
	        fadeInTime:900,
	        fadeOutTime:1400,
	        intervalTime:3400
	    });
	},
	setHotCourseHtml:function(data){
		var html = [];
		for(var i = 0,len = data.length; i < len; i++){
			var id = data[i].hotCourse;
			html.push('<div id="course_' + id + '" class="course-card-container">');
			html.push('<a href="/video/video_watch.html?id=' + id + '" class="course-card">');
			// html.push('<a target="_blank" href="/video/video_watch.html?id=' + id + '" class="course-card">');
			html.push('<img id="course_img_' + id + '" src="img/keimg1.png" style="width:240px;height:135px;">');
			html.push('<p id="course_title_' + id + '" >热门课程</p>');
			html.push('</a>');
			html.push('</div>');
		}
		
		$("#hotcourse").html(html.join(''));

		for(var j = 0, len2 = data.length; j < len2; j++){
			this.getHotCourseInfoHttp(data[j].hotCourse);
		}
	},

	getHotCourseInfoHttp:function(id){
		var url = Base.serverUrl + "/home/"+id;
		var condi = {};
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var data = res.data || {};
				var id = data.id || id;
				$("#course_img_" + id).attr("src",data.courseImg);
				$("#course_title_" + id).html(data.classTitle);
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





