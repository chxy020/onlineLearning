// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	pageNum:1,
	pageSize:10,
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		this.getListHttp();
	},
	bindEvent:function(){
		// $("#subbtn").onbind("click",this.setLogin,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getListHttp:function(){
		
		Utils.load();
		var url = Base.serverUrl + "/companyHome/get";
		var condi = {};
		condi.pageNum = this.pageNum;
		condi.pageSize = this.pageSize;
		// condi.name = Base
		// condi.idCard = Base
		// condi.phone = Base
		// condi.classType = Base
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	studyingListHtml:function(list){
		var html = [];
		list.forEach(function(item){
			html.push('<div class="course-card-container">');
			html.push('<a target="_blank" href="" class="course-card">');
			html.push('<img src="' + item.courseImg + '" style="width:281px;height:158px;">');
			html.push('<p>' + item.courseTitle + '</p>');
			html.push('</a>');
			html.push('</div>');
		});
		$("#studying").html(html.join(''));
	},

	examOverListHtml:function(list){
		var html = [];
		list.forEach(function(item){
			html.push('<tr>');
			html.push('<td>' + item.testTitle + '</td>');
			html.push('<td>' + item.testTime + '</td>');
            html.push('<td>' + item.score + '</td>');
            html.push('<td>' + (item.qualified == 0 ? '是' : '否') + '</td>');
            html.push('<td><a href="#" class="view_a">查看</a></td>');
            html.push('</tr>');
		});
		$("#examOver").html(html.join(''));
	},
	//跳转到首页
	gotoIndex:function(evt){
		location.href = "../index.html";
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





