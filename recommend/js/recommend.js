// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	// 1：法律法规；2：标准规范；3：政策文件；4：安全咨询；5：互学互鉴；6案例分析
	id:0,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		// this.id = +Utils.getQueryString("id") || "";
		// if(!this.id){
		// 	layer.msg("没有获取到课程id");
		// 	return;
		// }

		this.bindEvent();

		this.getUrlType();
		this.getCourseByType();
	},
	bindEvent:function(){
		// $("#buybtn").onbind("click",this.buyBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getUrlType:function(){
		var url = location.href;
		var on = 0;
		if(url.indexOf('legal.html') > -1){
			on = 1;
		}else if(url.indexOf('standard.html') > -1){
			on = 2;
		}
		else if(url.indexOf('policy.html') > -1){
			on = 3;
		}
		else if(url.indexOf('safety.html') > -1){
			on = 4;
		}
		else if(url.indexOf('share.html') > -1){
			on = 5;
		}
		else if(url.indexOf('case.html') > -1){
			on = 6;
		}
		this.id = on;
	},
	getCourseByType:function(){
		Utils.load();
		var url = Base.serverUrl + "/home/getCourseByType/" + this.id;
		var condi = {};

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var data = res.data || {};
				var hotCourse = data.hotCourse || [];
				this.setHotCourseHtml(hotCourse);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	setHotCourseHtml:function(data){
		var html = [];
		for(var i = 0,len = data.length; i < len; i++){
			var id = data[i].hotId;
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
			this.getHotCourseInfoHttp(data[j].hotId);
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





