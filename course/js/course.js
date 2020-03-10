// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		
		this.bindEvent();

		this.getCourseType();
	},
	bindEvent:function(){
		$("#buybtn").onbind("click",this.buyBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getCourseType:function(){
		Utils.load();
		var url = Base.serverUrl + "/gen/course-type/select";
		var condi = {};

		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var rows = res.rows || [];
				this.bulidCourseTypeHtml(rows);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	bulidCourseTypeHtml:function(rows){
		var html = [];
		rows.forEach(function(item,i){
			if(i == 0){
				this.getCourseHttp(item.id);

				html.push('<li data="' + item.id +'" class="course-nav-item on">');
				html.push('<a href="javascript:;">'+item.name+'</a>');
				html.push('</li>');
			}else{
				html.push('<li data="' + item.id +'" class="course-nav-item">');
				html.push('<a href="javascript:;">'+item.name+'</a>');
				html.push('</li>');
			}
		}.bind(this));

		$("#course-type").append(html.join(''));

		$("#course-type > li").rebind('click',this.changeCourseType,this);
	},
	changeCourseType:function(evt){
		var ele = evt.currentTarget;
		var classId = +$(ele).attr("data");
		$("#course-type > li").removeClass("on");
		$(ele).addClass("on");
		this.getCourseHttp(classId);
	},
	getCourseHttp:function(classId){
		Utils.load();
		var url = Base.serverUrl + "/gen/course/selectBy";
		var condi = {};
		if(classId){
			condi.classId = classId;
		}
		
		// condi.classType = 0;
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var rows = res.rows || [];
				this.setHotCourseHtml(rows);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	setHotCourseHtml:function(data){
		var html = [];
		for(var i = 0,len = data.length; i < len; i++){
			var id = data[i].id;
			html.push('<div class="course-card-container">');
			html.push('<a href="/video/video_watch.html?id=' + id + '" class="course-card">');
			// html.push('<a target="_blank" href="/video/video_watch.html?id=' + id + '" class="course-card">');
			html.push('<img  src="' + data[i].classImg + '" style="width:240px;height:135px;">');
			html.push('<p  >' + data[i].classTitle + '</p>');
			html.push('</a>');
			html.push('</div>');
		}
		
		$("#hotcourse").html(html.join(''));

		// for(var j = 0, len2 = data.length; j < len2; j++){
		// 	this.getHotCourseInfoHttp(data[j].hotId);
		// }
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





