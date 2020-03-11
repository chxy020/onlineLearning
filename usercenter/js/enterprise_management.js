// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	pageNum:1,
	pageSize:1,
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		this.getListHttp();
	},
	bindEvent:function(){
		$("#addbtn").onbind("click",this.addBtnClick,this);
		$("#addFormBtn02").onbind("click",this.subBtnClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},

	addBtnClick:function(){
		$("#addmask").show();
		$("#addform").show();
	},
	subBtnClick:function(){
		var name = $("#name").val().trim() || "";
		var idcard = $("#idcard").val().trim() || "";
		var phone = $("#phone").val().trim() || "";
		var classType = $("#classType").val().trim() || "";
		
		$("#namemsg").html("");
		if(!name){
			$("#namemsg").html("姓名不能为空");
			return;
		}

		$("#idcardmsg").html("");
		if(!idcard){
			$("#idcardmsg").html("身份证号不能为空");
			return;
		}
		if(idcard.length != 18){
			$("#idcardmsg").html("身份证号输入错误");
			return;
		}

		$("#phonemsg").html("");
		if(!name){
			$("#phonemsg").html("手机号不能为空");
			return;
		}

		if(!Utils.isTel(phone)){
			$("#phonemsg").html("手机号输入错误");
			return;
		}

		var condi = {};
		condi.name = name;
		condi.idCard = idcard;
		condi.phone = phone;
		condi.classType = 3;

		this.addCompanyInsHttp(condi);
	},
	addCompanyInsHttp:function(condi){
		Utils.load();
		var url = Base.serverUrl + "/companyHome/ins";
		
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





