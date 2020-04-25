// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	classTitle:"",
	currentClassId:0,
	pageSize:10,
	pageNum:1,
	allPages:1,
	userCate:-1,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.getUserInfo();

		this.bindEvent();

		this.getCourseType();
	},
	bindEvent:function(){
		$("#classtitle").onbind("keydown",this.keyDownSearch,this);
		$("#searchbtn").onbind("click",this.keySearch,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getUserInfo:function(){
		var user = Utils.offlineStore.get("__userInfo",true) || "";
		if(!!user){
			user = JSON.parse(user);
			this.userCate = +user.userCate;
			// userCate字段（0:煤矿安全、1:金属非金属矿山安全、2:化工安全、 3:金属冶炼安全、
			// 4:建筑施工安全、5:道路运输安全、6:其他安全（不包括消防安全））
			// userAudit字段获得，0：未审核；1：审核中；2：审核通过；3：审核未通过。 
		}
	},
	keySearch:function(evt){
		this.pageNum = 1;
		this.getCourseHttp();
	},
	keyDownSearch:function(evt){
		var keycode = evt.keyCode;
		if(keycode == 13){
			this.pageNum = 1;
			this.getCourseHttp();
		}
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
				
				// this.currentClassId = 0;
				// this.getCourseHttp();
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	bulidCourseTypeHtml:function(rows){
		this.currentClassId = 0;

		var html = [];
		rows.forEach(function(item,i){
			// if(i == 0){
			// 	// this.getCourseHttp(item.id);

			// 	html.push('<li data="' + item.id +'" class="course-nav-item on">');
			// 	html.push('<a href="javascript:;">'+item.name+'</a>');
			// 	html.push('</li>');
			// }else{
				html.push('<li data="' + item.id +'" class="course-nav-item">');
				html.push('<a href="javascript:;">'+item.name+'</a>');
				html.push('</li>');
			// }

			// userCate字段（0:煤矿安全、1:金属非金属矿山安全、2:化工安全、 3:金属冶炼安全、
			// 4:建筑施工安全、5:道路运输安全、6:其他安全（不包括消防安全））
			if(this.userCate == 0){
				if(item.name == "煤矿安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 1){
				if(item.name == "金属非金属矿山安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 2){
				if(item.name == "化工安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 3){
				if(item.name == "金属冶炼安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 4){
				if(item.name == "建筑施工安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 5){
				if(item.name == "道路运输安全"){
					this.currentClassId = item.id;
				}
			}else if(this.userCate == 6){
				if(item.name == "其他安全（不包括消防安全）"){
					this.currentClassId = item.id;
				}
			}
		}.bind(this));

		$("#course-type").append(html.join(''));

		$("#course-type > li").rebind('click',this.changeCourseType,this);

		$("#course-type > li[data='" + this.currentClassId +"']").addClass("on");
		this.getCourseHttp();
	},
	changeCourseType:function(evt){
		var ele = evt.currentTarget;
		var classId = +$(ele).attr("data");
		$("#course-type > li").removeClass("on");
		$(ele).addClass("on");
		this.pageNum = 1;
		this.currentClassId = classId;
		this.getCourseHttp();
	},
	getCourseHttp:function(){
		Utils.load();
		var url = Base.serverUrl + "/gen/course/selectBy";
		var condi = {};
		if(this.currentClassId){
			condi.classId = this.currentClassId;
		}
		condi.classTitle = this.classTitle = $("#classtitle").val() || "";
		condi.pageSize = this.pageSize;
		condi.pageNum = this.pageNum;
		
		// condi.classType = 0;
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var rows = res.rows || [];
				this.setHotCourseHtml(rows);
				var current = res.current || 1;
				var pages = res.pages || 1;
				this.allPages = pages;
				this.setPagesHtml(current,pages);
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

	setPagesHtml:function(current,pages){
		var html = [];
		html.push('<li data="0" class="item prev prev-disabled">');
		html.push('<span class="num" trace="srp_bottom_pageup">');
		html.push('<span>首页</span>');
		html.push('</span>');
        html.push('</li>');
        html.push('<li data="pre" class="item prev prev-disabled">');
        html.push('<span class="num" trace="srp_bottom_pageup">');
		html.push('<span>上一页</span>');
		html.push('</span>');
		html.push('</li>');
		
		for(var i = 1; i <= pages; i++){
			if(i==current){
				html.push('<li data="' + i + '" class="item active">');
				html.push('<span class="num">' + i +'</span>');
				html.push('</li>');
			}else{
				html.push('<li data="' + i + '" class="item ">');
				html.push('<span class="num">' + i +'</span>');
				html.push('</li>');
			}
		}
		html.push('<li data="next" class="item next">');
        html.push('<a class="num icon-tag" href="#">');
		html.push('<span>下一页</span>');
		html.push('</a>');
		html.push('</li>');
		html.push('<li data="' + pages +'" class="item next">');
        html.push('<span class="num" trace="srp_bottom_pageup">');
		html.push('<span>末页</span>');
		html.push('</span>');
		html.push('</li>');

		$("#pages").html(html.join(''));

		$("#pages li").rebind('click',this.changeListPage,this);
	},
	changeListPage:function(evt){
		var ele = evt.currentTarget;
		var num = $(ele).attr("data");
		if(num == "pre"){
			if(this.pageNum == 1){
				layer.msg("当前是第一页");
				return;
			}
			this.pageNum--;
		}else if(num == "next"){
			if(this.pageNum == this.allPages){
				layer.msg("当前是最后一页");
				return;
			}
			this.pageNum++;
		}else{
			this.pageNum = +num;
		}

		
		this.getCourseHttp();
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





