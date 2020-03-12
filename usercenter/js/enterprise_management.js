// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	pageNum:1,
	pageSize:10,
	recordsList:[],
	modifyId:"",
	deleteId:"",
	classType:['煤矿安全','金属非金属矿山安全','化工安全','金属冶炼安全,建筑施工安全','道路运输安全','其他安全（不包括消防安全）'],
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		this.bindEvent();

		this.getListHttp();
	},
	bindEvent:function(){
		$("#addbtn").onbind("click",this.addBtnClick,this);
		$("#addFormBtn02").onbind("click",this.subBtnClick,this);
		$("#allckbox").onbind("click",this.allCkboxClick,this);
		$("#subFormBtn02").onbind("click",this.subRecordClick,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	subRecordClick:function(){
		var ckbox = $("#recordslist input:checkbox:checked");
		var ids = [];
		ckbox.each(function(item){
			var id = this.id.split("_")[1];
			ids.push(id);
		});
		var list = this.recordsList.filter(function(item){
			return ids.indexOf(item.id+"") > -1;
		});

		if(list.length > 0){
			Utils.offlineStore.set("__enterRecordList",JSON.stringify(list));
			location.href = "/usercenter/enterprise_management_confirm.html";
		}else{
			layer.msg("没有选择学员");
		}
		// console.log(list)
		
	},
	allCkboxClick:function(evt){
		var ck = $("#allckbox").is(':checked');
		this.recordsList.forEach(function(item){
			var ckid = "ckr_" + item.id;
			$("#"+ckid).attr("checked",ck);
		});
	},
	addBtnClick:function(){
		this.modifyId = "";
		$("#addmask").show();
		$("#addform").show();
	},
	subBtnClick:function(){
		var name = $("#name").val().trim() || "";
		var idcard = $("#idcard").val().trim() || "";
		var phone = $("#phone").val().trim() || "";
		var classType = +$("#classType").val().trim();
		
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
		condi.classType = classType;

		this.addCompanyInsHttp(condi);
	},
	addCompanyInsHttp:function(condi){
		Utils.load();

		if(!this.modifyId){
			var url = Base.serverUrl + "/companyHome/ins";
		}else{
			condi.id = this.modifyId;
			var url = Base.serverUrl + "/companyHome/modify";
		}
		
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				this.getListHttp();
				$("#addmask").hide();
				$("#addform").hide();
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
		// condi.pageNum = this.pageNum;
		// condi.pageSize = this.pageSize;
		// condi.name = Base
		// condi.idCard = Base
		// condi.phone = Base
		// condi.classType = Base
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				var records = obj.records || [];
				this.recordsList = records;
				this.recordsListHtml(records);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	recordsListHtml:function(list){
		

		var html = [];
		list.forEach(function(item){
			html.push('<tr>');
			html.push('<td class="center">');
			html.push('<input type="checkbox" name="genre1" id="ckr_' + item.id + '" value="' + item.id +'" />');
			html.push('<label for="ckr_' + item.id + '" class="J-check"></label>');
			html.push('</td>');
			html.push('<td>' + item.name +'</td>');
			html.push('<td>' + item.idCard + '</td>');
			html.push('<td>' + item.phone + '</td>');
			html.push('<td>' + this.classType[+item.classType]  + '</td>');
			html.push('<td><a data="' +item.id+ '" href="javascript:;" class="view_a edititem">编辑</a><a data="' +item.id+ '" href="javascript:;" class="view_a ml10 deleteitem">删除</a></td>');
			html.push('</tr>');
		}.bind(this));
		$("#recordslist").html(html.join(''));

		$(".edititem").rebind('click',this.editRecordItem,this);
		$(".deleteitem").rebind('click',this.deleteRecordItem,this);
	},

	editRecordItem:function(evt){
		var ele = evt.currentTarget;
		var id = +$(ele).attr("data");
		var item = this.recordsList.filter(function(item){
			return item.id == id;
		})[0] || {};

		this.modifyId = item.id;
		$("#name").val(item.name);
		$("#idcard").val(item.idCard);
		$("#phone").val(item.phone);
		$("#classType").val(item.classType+"");
		$(".selectBox").html(this.classType[+item.classType]);
		
		$("#addmask").show();
		$("#addform").show();
	},
	deleteRecordItem:function(evt){
		layer.confirm('确定删除吗？', {
			btn: ['确定', '取消']
		}, function (index) {
			var ele = evt.currentTarget;
			var id = +$(ele).attr("data");
			var item = this.recordsList.filter(function(item){
				return item.id == id;
			})[0] || {};

			this.deleteId = item.id;
			this.deleteRecordHttp();
			layer.close(index);
			
		}.bind(this));
	},
	deleteRecordHttp:function(){
		if(!this.deleteId){
			return;
		}
		Utils.load();
		var url = Base.serverUrl + "/companyHome/del";
		var condi = {};
		condi.ids = this.deleteId;
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				this.getListHttp();
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





