// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	classType:['煤矿安全','金属非金属矿山安全','化工安全','金属冶炼安全,建筑施工安全','道路运输安全','其他安全（不包括消防安全）','拓展课程','热门课程'],
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		// this.getUserInfoHttp();
		this.getEnterRecordList();
	},
	bindEvent:function(){
		// $("#subbtn").onbind("click",this.setLogin,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getEnterRecordList:function(){
		var list = Utils.offlineStore.get("__enterRecordList") || "";
		if(list){
			list = JSON.parse(list);
			var html = [];
			list.forEach(function(item){
				html.push('<tr>');
				html.push('<td>' + item.name +'</td>');
				html.push('<td>' + item.idCard + '</td>');
				html.push('<td>' + item.phone + '</td>');
				html.push('<td>' + this.classType[+item.classType] + '</td>');
				html.push('</tr>');
			}.bind(this));
			$("#recordlist").html(html.join());
		}
	},







	getUserInfoHttp:function(condi){
		
		Utils.load();
		var url = Base.serverUrl + "/center";
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				var course = obj.course || 0;
				var collection = obj.collection || 0;
				var studyCount = obj.studyCount || 0;
				var studying = obj.studying || [];

				studying = [
					{
						"courseTitle": "氧化安全课程",
						"studyTime": "19:30",
						"courseImg": "https:\/\/ss0.bdstatic.com\/70cFvHSh_Q1YnxGkpoWK1HF6h",
						"videoId": "1",
						"id": 9
					},
					{
						"courseTitle": "消防安全课程",
						"studyTime": "10:01",
						"courseImg": "https:\/\/timgsa.baidu.com\/timg?image&quality=80&siz",
						"videoId": "2",
						"id": 10
					}
				]
				var examCount = obj.examCount || 0;
				var examOver = obj.examOver || [];
				examOver = [
					{
						"score": "85",
						"qualified": "1",
						"testTime": "2020-02-24 17:00:00",
						"id": 1,
						"testTitle": "氧化安全考模拟考试"
					},
					{
						"score": "60",
						"qualified": "0",
						"testTime": "2020-02-25 17:00:00",
						"id": 2,
						"testTitle": "化工安全考正式考试"
					}
				]

				$("#course").html(course);
				$("#examCount").html(examCount);
				$("#collection").html(collection);
				$("#studyCount").html(studyCount);

				this.studyingListHtml(studying);
				this.examOverListHtml(examOver);
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





