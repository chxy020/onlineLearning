// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		// this.id = +Utils.getQueryString("classId") || "";
		// if(!this.id){
		// 	layer.msg("没有获取到课程id");
		// 	return;
		// }

		this.bindEvent();

		this.getUserArchives();

		
	},
	bindEvent:function(){
		$(".close_btn").onbind("click",this.closeTip,this);
		$("#regFormBtn02").onbind("click",this.closeTip,this);
		$("#printbtn").onbind("click",this.printPage,this);
		$("#sendbtn").onbind("click",this.sendStudentFile,this);
		$("#temporarybtn").onbind("click",this.temporaryStudentFile,this);
		$("#backbtn").onbind("click",this.goBack,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	goBack:function(){
		location.href = "/usercenter/personal_center.html";
	},
	closeTip:function(){
		$(".J-mask,.J-fuwutiaokuan").hide();
	},
	printPage:function(){
		$("#studentfile").jqprint({
			debug: false, 
			importCSS: true, 
			printContainer: true, 
			operaSupport: false
		});
	},
	getUserArchives:function(){
		var url = Base.serverUrl + "/gen/archives";
		Utils.load();
		var condi = {};
		$.Ajax({
			url:url,type:"GET",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				
				$("#userName").val(obj.userName);
				$("#userName").next().html(obj.userName);
				$("#sex").val(obj.sex == 0 ? '男' : '女');
				$("#sex").next().html(obj.sex == 0 ? '男' : '女');
				$("#birthday").val(obj.birthday);
				$("#birthday").next().html(obj.birthday);
				$("#position").val(obj.position);
				$("#position").next().html(obj.position);
				$("#idCard").val(obj.idCard);
				$("#idCard").next().html(obj.idCard);
				$("#education").val(obj.education);
				$("#education").next().html(obj.education);
				$("#major").val(obj.major);
				$("#major").next().html(obj.major);
				$("#unitName").val(obj.unitName);
				$("#unitName").next().html(obj.unitName);
				$("#work").val(obj.work);
				$("#work").next().html(obj.work);
				$("#address").val(obj.address);
				$("#address").next().html(obj.address);
				$("#postcode").val(obj.postcode);
				$("#postcode").next().html(obj.postcode);
				$("#credentialsNum").val(obj.credentialsNum);
				$("#credentialsNum").next().html(obj.credentialsNum);
				$("#practiceNum").val(obj.practiceNum);
				$("#practiceNum").next().html(obj.practiceNum);
				$("#certificateNum").val(obj.certificateNum);
				$("#certificateNum").next().html(obj.certificateNum);
				$("#registeredType").val(obj.registeredType);
				$("#registeredType").next().html(obj.registeredType);
				$("#registeredStart").val(obj.registeredStart);
				$("#registeredStart").next().html(obj.registeredStart);
				$("#registeredEnd").val(obj.registeredEnd);
				$("#registeredEnd").next().html(obj.registeredEnd);
				$("#phone").val(obj.phone);
				$("#phone").next().html(obj.phone);
				$("#remake").val(obj.remake);
				$("#remake").next().html(obj.remake);
				if(+obj.trainingType==0){
					$("#trainingType0").prop("checked",'checked');
				}else{
					$("#trainingType1").prop("checked",'checked');
				}
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	getFileData:function(){
		var userName = $("#userName").val().trim() || "";
		var sex = $("#sex").val().trim() || "";
		var birthday = $("#birthday").val().trim() || "";
		var position = $("#position").val().trim() || "";
		var idCard = $("#idCard").val().trim() || "";
		var education = $("#education").val().trim() || "";
		var major = $("#major").val().trim() || "";
		var unitName = $("#unitName").val().trim() || "";
		var work = $("#work").val().trim() || "";
		var address = $("#address").val().trim() || "";
		var postcode = $("#postcode").val().trim() || "";
		var credentialsNum = $("#credentialsNum").val().trim() || "";
		var practiceNum = $("#practiceNum").val().trim() || "";
		var certificateNum = $("#certificateNum").val().trim() || "";
		var registeredType = $("#registeredType").val().trim() || "";
		var registeredStart = $("#registeredStart").val().trim() || "";
		var registeredEnd = $("#registeredEnd").val().trim() || "";
		var phone = $("#phone").val().trim() || "";
		var remake = $("#remake").val().trim() || "";
		var trainingType = $("[name='trainingType']:checked").val().trim() || 0;
		
		if(!userName){
			layer.msg("姓名不能为空");
			return false;
		}

		var datereg = /^(\d{4})-(\d{2})-(\d{2})$/gi;
		
		if(birthday){
			if(!datereg.test(birthday)){
				layer.msg("出生日期格式错误，格式为yyyy-MM-dd");
				return;
			}
			datereg.lastIndex=0;
		}
		if(registeredStart){
			if(!datereg.test(registeredStart)){
				layer.msg("注册有效期开始时间格式错误，格式为yyyy-MM-dd");
				return;
			}
			datereg.lastIndex=0;
		}
		if(registeredEnd){
			if(!datereg.test(registeredEnd)){
				layer.msg("注册有效期结束时间格式错误，格式为yyyy-MM-dd");
				return;
			}
			datereg.lastIndex=0;
		}
		
		var condi = {};
		condi.userName = userName;
		condi.sex = sex == "男" ? 0 : 1;
		condi.birthday = birthday;
		condi.position = position;
		condi.idCard = idCard;
		condi.education = education;
		condi.major = major;
		condi.unitName = unitName;
		condi.work = work;
		condi.address = address;
		condi.postcode = postcode;
		condi.credentialsNum = credentialsNum;
		condi.practiceNum = practiceNum;
		condi.certificateNum = certificateNum;
		condi.registeredType = registeredType;
		condi.registeredStart = registeredStart;
		condi.registeredEnd = registeredEnd;
		condi.phone = phone;
		condi.remake = remake;
		condi.trainingType = trainingType;

		return condi;
	},
	sendStudentFile:function(){
		//保存数据
		var url = Base.serverUrl + "/gen/archives/saveArchives";
		var condi = this.getFileData();
		if(!condi){
			return;
		}
		condi.state = 1;
		Utils.load();
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

	temporaryStudentFile:function(){
		
		var url = Base.serverUrl + "/gen/archives/saveArchives";
		var condi = this.getFileData();
		if(!condi){
			return;
		}
		condi.state = 0;
		Utils.load();
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				
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





