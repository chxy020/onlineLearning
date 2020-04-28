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

		this.getInvoiceInfoHttp();

	},
	bindEvent:function(){
		$("#enterbtn").onbind("click",this.invoiceSave,this);
		$("#backbtn").onbind("click",this.goBack,this);
		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	goBack:function(){
		history.go(-1);
	},
	getInvoiceInfoHttp:function(){
		var url = Base.serverUrl + "/gen/invoice/getInvoice";
		Utils.load();
		var condi = {};
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				
				$("#title").val(obj.titles);
				$("#taxNum").val(obj.taxNum);

				if(obj.bank || obj.openNum || obj.registerAddress || obj.registerPhone){
					$("#rno").prop("checked",true)
					$("#rno").trigger("click");

					$("#bank").val(obj.bank);
					$("#openNum").val(obj.openNum);
					$("#registerAddress").val(obj.registerAddress);
					$("#registerPhone").val(obj.registerPhone);
				}

				$("#iRecipient").val(obj.invoiceRecipient);
				$("#iAddress").val(obj.invoiceAddress);
				$("#iPhone").val(obj.invoicePhone);
				$("#iCode").val(obj.invoiceCode);

				if(obj.certificateRecipient || obj.certificateAddress || obj.certificatePhone || obj.certificateCode){
				
					$("#cRecipient").val(obj.certificateRecipient);
					$("#cAddress").val(obj.certificateAddress);
					$("#cPhone").val(obj.certificatePhone);
					$("#cCode").val(obj.certificateCode);
				}else{
					$("#same").trigger("click");
				}
				

			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	invoiceSave:function(){
		var invoiceType = +$("[name='invoiceType']:checked").val();

		var title = $("#title").val().trim() || "";
		var taxNum = $("#taxNum").val().trim() || "";
		var bank = $("#bank").val().trim() || "";
		var openNum = $("#openNum").val().trim() || "";
		var registerAddress = $("#registerAddress").val().trim() || "";
		var registerPhone = $("#registerPhone").val().trim() || "";
		var iRecipient = $("#iRecipient").val().trim() || "";
		var iAddress = $("#iAddress").val().trim() || "";
		var iPhone = $("#iPhone").val().trim() || "";
		var iCode = $("#iCode").val().trim() || "";

		var same = $("#same").prop("checked");
		var cRecipient = $("#cRecipient").val().trim() || "";
		var cAddress = $("#cAddress").val().trim() || "";
		var cPhone = $("#cPhone").val().trim() || "";
		var cCode = $("#cCode").val().trim() || "";
		
		$("#title_msg").html("");
		if(!title){
			$("#title_msg").html("发票抬头不能为空");
			return;
		}

		$("#taxNum_msg").html("");
		if(!taxNum){
			$("#taxNum_msg").html("税务登记证号不能为空");
			return;
		}

		$("#bank_msg").html("");
		if(!bank && invoiceType == 0){
			$("#bank_msg").html("开户银行名称不能为空");
			return;
		}

		$("#openNum_msg").html("");
		if(!openNum && invoiceType == 0){
			$("#openNum_msg").html("基本开户账号不能为空");
			return;
		}

		$("#registerAddress_msg").html("");
		if(!registerAddress && invoiceType == 0){
			$("#registerAddress_msg").html("注册场所地址不能为空");
			return;
		}

		$("#registerPhone_msg").html("");
		if(!registerPhone && invoiceType == 0){
			$("#registerPhone_msg").html("注册固定电话不能为空");
			return;
		}

		$("#iRecipient_msg").html("");
		if(!iRecipient){
			$("#iRecipient_msg").html("发票收件人不能为空");
			return;
		}

		$("#iAddress_msg").html("");
		if(!iAddress){
			$("#iAddress_msg").html("发票邮寄地址不能为空");
			return;
		}

		$("#iPhone_msg").html("");
		if(!iPhone){
			$("#iPhone_msg").html("发票收件人联系方式不能为空");
			return;
		}

		$("#iCode_msg").html("");
		if(!iCode){
			$("#iCode_msg").html("发票收件人邮政编码不能为空");
			return;
		}
		
		$("#cRecipient_msg").html("");
		if(!cRecipient && !same){
			$("#cRecipient_msg").html("证书收件人不能为空");
			return;
		}
		$("#cAddress_msg").html("");
		if(!cAddress && !same){
			$("#cAddress_msg").html("证书收件人地址不能为空");
			return;
		}
		$("#cPhone_msg").html("");
		if(!cPhone && !same){
			$("#cPhone_msg").html("证书收件人联系方式不能为空");
			return;
		}
		$("#cCode_msg").html("");
		if(!cCode && !same){
			$("#cCode_msg").html("证书收件人邮政编码不能为空");
			return;
		}
		
		var condi = {};
		condi.title = title;
		condi.taxNum = taxNum;
		if(invoiceType == 0){
			condi.taxNum = taxNum;
			condi.bank = bank;
			condi.openNum = openNum;
			condi.registerAddress = registerAddress;
			condi.registerPhone = registerPhone;
		}

		condi.iRecipient = iRecipient;
		condi.iAddress = iAddress;
		condi.iPhone = iPhone;
		condi.iCode = iCode;
		if(same){
			condi.cRecipient = iRecipient;
			condi.cAddress = iAddress;
			condi.cPhone = iPhone;
			condi.cCode = iCode;
		}else{
			condi.cRecipient = cRecipient;
			condi.cAddress = cAddress;
			condi.cPhone = cPhone;
			condi.cCode = cCode;
		}
		
		this.sendInvoiceSaveHttp(condi);
	},

	sendInvoiceSaveHttp:function(condi){
		
		var url = Base.serverUrl + "/gen/archives/saveArchives";
		Utils.load();
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || {};
				if(res.code == 200){
					layer.msg(res.message || "保存成功");
				}
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





