// JavaScript Document
/**
 * file:首页
 * author:
 * date:2016-05-23
*/

var PageManager = function (obj){
	GetUserCenterData.apply(this,arguments);
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	bannerScroll:null,
	typeScroll:null,
	newProductScroll:null,
	init: function(){
		//this.httpTip = new Utils.httpTip({});
		//this.moreLoad = $("#loadmore");
		
		$(window).onbind("load",this.pageLoad,this);
		$(window).onbind("touchmove",this.pageMove,this);
		this.bindEvent();
	},
	bindEvent:function(){
		$("#searchform").onbind("submit",this.searchFormSubmitUp,this);
		
		$("#cityname").onbind("touchstart",this.btnDown,this);
		$("#cityname").onbind("touchend",this.cityNameBtnUp,this);
		
		$("#hotmorebtn").onbind("touchstart",this.btnDown,this);
		$("#hotmorebtn").onbind("touchend",this.hotMoreBtnUp,this);
		
		$("#newmorebtn").onbind("touchstart",this.btnDown,this);
		$("#newmorebtn").onbind("touchend",this.newMoreBtnUp,this);
		
		$("#allmorebtn").onbind("touchstart",this.btnDown,this);
		$("#allmorebtn").onbind("touchend",this.allMoreBtnUp,this);
		
		$("#footerbtn > li").onbind("touchstart",this.btnDown,this);
		$("#footerbtn > li").onbind("touchend",this.footerLiUp,this);
	},
	pageLoad:function(){
   		if(this.bannerScroll == null){
			var t = this;
			var opts = {
				vScroll:false,snap:true,momentum:false,hScrollbar:false,
				onScrollStart:function(){},
				onScrollMove:function(){},
				onScrollEnd:function(){
					try{
						$('#indicator > span.active').removeClass('active');
						$('#indicator > span:nth-child(' + (this.currPageX + 1) + ')')[0].className = 'active';
					}catch(e){}
				}
			};
			this.bannerScroll = new iScroll("wrapper-banner",opts);
		}
		
		if(this.typeScroll === null){
			this.typeScroll = new iScroll('wrapper-type',{
				hScrollbar:false,vScroll:false,
			    onBeforeScrollStart: function ( e ) {
			        if ( this.absDistX > (this.absDistY + 5 ) ) {
			            e.preventDefault();
			        }
			    }
			});
		}
		
		this.refreshBannerScroll();
		this.refreshTypeScroll(5);
		
		//获取选择城市数据
		this.getLocalCityData();
		
		//获取个人中心数据
		this.getUserCenterHttp();
	},
	pageMove:function(evt){
		this.moved = true;
	},
	pageHide:function(){
	},
	btnDown:function(evt){
		this.moved = false;
		var ele = evt.currentTarget;
		$(ele).addClass("curr");
	},
	btnUp:function(evt){
		var ele = evt.currentTarget;
		$(ele).removeClass("curr");
	},
	searchFormSubmitUp:function(evt){
		evt.preventDefault();
		var txt = $("#searchtext");
		var val = txt.val().trim() || "";
		if(val.length > 0){
			console.log("搜索关键字:" + val);
			this.searchListByKey();
		}
	},
	searchListByKey:function(){
		var txt = $("#searchtext");
		var val = txt.val().trim() || "";
		if(val !== ""){
			location.href = encodeURI("list.html?typeid=all&key=" + val);
		}
	},
	getLocalCityData:function(){
		var data = Utils.offlineStore.get("__selectedcity__",true) || "";
		if(data === ""){
			//获取城市数据
			this.getCityListHttp();
		}
		else{
			var obj = JSON.parse(data);
			var cityname = obj.cityname || "";
			if(cityname !== ""){
				$("#cityname").html(cityname);
			
				//根据城市获取首页数据
				this.getAllDataHttp(cityname);
			}
			else{
				//获取城市数据
				this.getCityListHttp();
			}
		}
	},
	refreshBannerScroll:function(){
		var w = $(window).width() || 375;
		var len = $('#banner img').length;
		$('#banner > li').css('width',w + 'px');
		$('#scroller-banner').css('width',(w * len) + 'px');
		if(this.bannerScroll != null){
			this.bannerScroll.refresh();
		}
	},
	refreshTypeScroll:function(len){
		//len 分类个数
		var w = 4 * _fontsize * len;
		$("#scroller-type").css('width',w + 'px');
		if(this.typeScroll != null){
			this.typeScroll.refresh();
		}
	},
	//切换城市
	cityNameBtnUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		
		location.href = "citylist.html";
	},
	bannerImgBtnUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		
		var ele = evt.currentTarget;
		var id = ele.id || "";
		if(id === ""){return;}
		
		//跳转到详情
		//location.href = "detail.html?pid=" + id;
	},
	typeListLiUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		console.log("typeListLiUp");
		
		var ele = evt.currentTarget;
		var id = ele.id || "";
		if(id === ""){return;}
		//跳转到分类
		location.href = "list.html?typeid=" + id;
	},
	hotMoreBtnUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		console.log("hotMoreBtnUp");
		//跳转到分类
		location.href = "list.html?typeid=hot";
	},
	newMoreBtnUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		console.log("newMoreBtnUp");
		//跳转到分类
		location.href = "list.html?typeid=new";
	},
	allMoreBtnUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		console.log("allMoreBtnUp");
		//跳转到分类
		location.href = "list.html?typeid=all";
	},
	proListLiUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		
		var ele = evt.currentTarget;
		var id = ele.id || "";
		if(id === ""){return;}
		
		//跳转到详情
		location.href = "detail.html?no=" + id;
	},
	footerLiUp:function(evt){
		this.btnUp(evt);
		
		if(this.moved){
			return;
		}
		
		var ele = evt.currentTarget;
		var id = ele.id || "";
		if(id === ""){return;}
		
		switch(id){
			case "indexpage":
			break;
			case "listpage":
				location.href = "list.html?typeid=all";
			break;
			case "cartpage":
				location.href = "cart.html";
			break;
			case "userpage":
				location.href = "usercenter.html";
			break;
		}
	},
	changeBannerHtml:function(obj){
		var data = obj.lunbo || [];
		if(data.length <= 0){
			Utils.alert("该城市没有轮播图数据");
			return;
		}
		
		var li = [];
		var span = [];
		for(var i = 0,len = data.length; i < len; i++){
			var icid = data[i].ic_id || "";
			//<li><img src="img/banner.png" alt="" /></li>
			li.push('<li id="' + icid + '"><img class="bannerimg" src="img/banner.png" alt="" /></li>');
			
			if(i === 0){
				span.push('<span class="active"></span>');
			}
			else{
				span.push('<span ></span>');
			}
		}
		
		$("#banner").html(li.join(''));
		$("#indicator").html(span.join(''));
		
		//注册事件
		$("#banner > li").rebind("touchstart",this.btnDown,this);
		$("#banner > li").rebind("touchend",this.bannerImgBtnUp,this);
		
		for(var j = 0,len = data.length; j < len; j++){
			var pic = data[j].pic || "";
			if(pic !== ""){
				Utils.imageLoaded($($(".bannerimg")[j]),pic,{
					scrope:this,
					success:function(){
					}
				});
			}
		}
		
		this.refreshBannerScroll();
	},
	changeTypeListHtml:function(obj){
		var data = obj.indexType || [];
		if(data.length <= 0){
			Utils.alert("该城市没有分类数据");
			return;
		}
		
		var li = [];
		var span = [];
		for(var i = 0,len = data.length; i < len; i++){
			var d = data[i] ||{};
			var id = d.id || "";
			var name = d.class_name || "";
			//<li class=""><span>农贸</span></li>
			li.push('<li id="' + id + '" class="typeimg" ><span>' + name + '</span></li>');
		}
		
		$("#typelist").html(li.join(''));
		
		//注册事件
		$("#typelist > li").rebind("touchstart",this.btnDown,this);
		$("#typelist > li").rebind("touchend",this.typeListLiUp,this);
		
		for(var j = 0,len = data.length; j < len; j++){
			var d = data[j] ||{};
			var pic = d.img || "";
			if(pic !== ""){
				Utils.imageLoaded($($(".typeimg")[j]),pic,{
					scrope:this,
					bg:true,
					size:"2.5rem 2.5rem",
					success:function(){
					}
				});
			}
		}
		
		this.refreshTypeScroll(data.length);
	},
	//修改爆款商品html
	changeHotListHtml:function(obj){
		var data = obj.baokuan || [];
		if(data.length <= 0){
			Utils.alert("该城市没有爆款商品数据");
			return;
		}
		
		//商品大于6条显示6条,大于3小于6显示3条
		var li = [];
		var span = [];
		for(var i = 0,len = data.length; i < len; i++){
			var d = data[i] ||{};
			var sc_code = d.sc_code || "";
			var sic_code = d.sic_code || "";
			var goods_name = d.goods_name || "";
			var price = d.price - 0 || "";
			var packing = d.packing || "";
			var have_buy = d.have_buy - 0 || 0;
			
			//促销信息
			var spc_info = d.spc_info || "";
			//优惠价格
			var special_price = price;
			if(spc_info !== ""){
				//SPECIAL LADDER REWARD_GIFT
				//优惠枚举
				var typeem = {
					"special":"一口价",
					"ladder":"阶梯价",
					"reward_gift":"满赠"
				}
				//有促销信息
				spc_type = spc_info.type.toLowerCase() || "";
		
				switch(spc_type){
					case "special":
						var max_buy = spc_info.max_buy - 0;
						var spc_detail = spc_info.spc_detail || {};
						//获取优惠价格,如果已经买过了,不显示优惠价
						if(have_buy < max_buy){
							special_price = spc_detail.special_price - 0 || 0;
						}
					break;
					case "ladder":
					break;
					case "reward_gift":
					break;
				}
			}

			var islast = ((i + 1) % 3) === 0 ? "plast" : "";
			li.push('<li id="' + sic_code + '|' + sc_code + '" class="' + islast + '"><img class="hotimg" src="img/product.png" alt="" /><span class="pname" >' + goods_name + '</span>');
			li.push('<p class="pprice phot"><span class="pp">劲爆价:</span><span class="pn"><s></s><b>' + special_price + '</b><em></em><i>' + packing + '</i></span></p></li>');
			
			
			if(li.length === 6 && len < 6){
				//大于3小于6显示3条
				break;
			}
			if(li.length === 12){
				//大于6条显示6条
				break;
			}
		}
		
		$("#hotlist").html(li.join(''));
		
		//注册事件
		$("#hotlist > li").rebind("touchstart",this.btnDown,this);
		$("#hotlist > li").rebind("touchend",this.proListLiUp,this);
		
		for(var j = 0,len = data.length; j < len; j++){
			var d = data[j] ||{};
			var pic = d.goods_img || "";
			if(pic !== ""){
				Utils.imageLoaded($($(".hotimg")[j]),pic,{
					scrope:this,
					success:function(){
					}
				});
			}
		}
	},
	//修改新品商品html
	changeNewListHtml:function(obj){
		var data = obj.xinpin || [];
		if(data.length <= 0){
			Utils.alert("该城市没有新品商品数据");
			return;
		}
		
		//商品大于6条显示6条,大于3小于6显示3条
		var li = [];
		var span = [];
		for(var i = 0,len = data.length; i < len; i++){
			var d = data[i] ||{};
			var sc_code = d.sc_code || "";
			var sic_code = d.sic_code || "";
			var goods_name = d.goods_name || "";
			var price = d.price - 0 || "";
			var packing = d.packing || "";
			var have_buy = d.have_buy - 0 || 0;
			
			//促销信息
			var spc_info = d.spc_info || "";
			//优惠价格
			var special_price = price;
			if(spc_info !== ""){
				//SPECIAL LADDER REWARD_GIFT
				//优惠枚举
				var typeem = {
					"special":"一口价",
					"ladder":"阶梯价",
					"reward_gift":"满赠"
				}
				//有促销信息
				spc_type = spc_info.type.toLowerCase() || "";
				
				switch(spc_type){
					case "special":
						var max_buy = spc_info.max_buy - 0;
						var spc_detail = spc_info.spc_detail || {};
						//获取优惠价格,如果已经买过了,不显示优惠价
						if(have_buy < max_buy){
							special_price = spc_detail.special_price - 0 || 0;
						}
					break;
					case "ladder":
					break;
					case "reward_gift":
					break;
				}
			}
			
			var islast = ((i + 1) % 3) === 0 ? "plast" : "";
			li.push('<li id="' + sic_code + '|' + sc_code + '" class="' + islast + '"><img class="newimg" src="img/product.png" alt="" /><span class="pname" >' + goods_name + '</span>');
			li.push('<p class="pprice pnew"><span class="pp">新品价:</span><span class="pn"><s></s><b>' + special_price + '</b><em></em><i>' + packing + '</i></span></p></li>');
			
			
			if(li.length === 6 && len < 6){
				//大于3小于6显示3条
				break;
			}
			if(li.length === 12){
				//大于6条显示6条
				break;
			}
		}
		
		$("#newlist").html(li.join(''));
		
		//注册事件
		$("#newlist > li").rebind("touchstart",this.btnDown,this);
		$("#newlist > li").rebind("touchend",this.proListLiUp,this);
		
		for(var j = 0,len = data.length; j < len; j++){
			var d = data[j] ||{};
			var pic = d.goods_img || "";
			if(pic !== ""){
				Utils.imageLoaded($($(".newimg")[j]),pic,{
					scrope:this,
					success:function(){
					}
				});
			}
		}
	},
	//修改所有商品html
	changeAllListHtml:function(obj){
		var data = obj.other || [];
		if(data.length <= 0){
			Utils.alert("该城市没有商品数据");
			return;
		}
		
		var li = [];
		var span = [];
		for(var i = 0,len = data.length; i < len; i++){
			var d = data[i] ||{};
			var sc_code = d.sc_code || "";
			var sic_code = d.sic_code || "";
			var goods_name = d.goods_name || "";
			var price = d.price - 0 || 0;
			var packing = d.packing || "";
			var tag_type = d.tag_type - 0 || 0;
			var have_buy = d.have_buy - 0 || 0;
			
			//促销信息
			var spc_info = d.spc_info || "";
			//优惠价格
			var special_price = price;
			if(spc_info !== ""){
				//SPECIAL LADDER REWARD_GIFT
				//优惠枚举
				var typeem = {
					"special":"一口价",
					"ladder":"阶梯价",
					"reward_gift":"满赠"
				}
				//有促销信息
				spc_type = spc_info.type.toLowerCase() || "";
				
				switch(spc_type){
					case "special":
						var max_buy = spc_info.max_buy - 0;
						var spc_detail = spc_info.spc_detail || {};
						//获取优惠价格,如果已经买过了,不显示优惠价
						if(have_buy < max_buy){
							special_price = spc_detail.special_price - 0 || 0;
						}
					break;
					case "ladder":
					break;
					case "reward_gift":
					break;
				}
			}
			
			var islast = ((i + 1) % 3) === 0 ? "plast" : "";
			var pnamearr = ["","劲爆价","新品价","商品价"];
			var pname = pnamearr[tag_type] || "商品价";
			
			li.push('<li id="' + sic_code + '|' + sc_code + '" class="' + islast + '"><img class="allimg" src="img/product.png" alt="" /><span class="pname" >' + goods_name + '</span>');
			li.push('<p class="pprice pall"><span class="pp">' + pname + ':</span><span class="pn"><s></s><b>' + special_price + '</b><em></em><i>' + packing + '</i></span></p></li>');
			
		}
		
		$("#alllist").html(li.join(''));
		
		//注册事件
		$("#alllist > li").rebind("touchstart",this.btnDown,this);
		$("#alllist > li").rebind("touchend",this.proListLiUp,this);
		
		for(var j = 0,len = data.length; j < len; j++){
			var pic = data[j].goods_img || "";
			if(pic !== ""){
				Utils.imageLoaded($($(".allimg")[j]),pic,{
					scrope:this,
					success:function(){
					}
				});
			}
		}
	},
	//获取全部数据
	getAllDataHttp:function(cityname){
		console.log("getAllDataHttp___1");
		
		Utils.load();
		
		var url = Base.serverUrl;
		//var url = "http://127.0.0.1:1001"
		var condi = {};
		condi.body = Base.body;
		condi.body.tokentype = 2;
		condi.call = {"api":"Bll.Buyer.Item.Lists.index","version":"100"};
		condi.data = {};
		condi.data.city = cityname;
		condi.data.page = 1;
		
		console.log(JSON.stringify(condi));
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				console.log("getAllDataHttp___2",res);
				var status = res.status - 0;
				var msg = _ErrorCode_[status] || res.msg || "";
				if(status === 0){
					//验证码获取成功
					var data = res.data || {};
					this.changeBannerHtml(data);
					this.changeTypeListHtml(data);
					this.changeHotListHtml(data);
					this.changeNewListHtml(data);
					this.changeAllListHtml(data);
				}
				else{
					Utils.alert(msg);
				}
				
				Utils.loadClose();
			},
			error:function(res){
				Utils.alert("获取首页数据错误");
				Utils.loadClose();
			}
		});
	},
	//获取城市列表请求
	getCityListHttp:function(){
		console.log("getCityListHttp__1");
		
		Utils.load();
		
		var url = Base.serverUrl;
		var condi = {};
		condi.body = Base.body;
		condi.body.tokentype = 2;
		condi.call = {"api":"Bll.Buyer.Item.City.info","version":"100"};
		condi.data = {};
		condi.data.device = "WEB";
		
		console.log(JSON.stringify(condi));
		
		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				console.log("getCityListHttp__2",res);
				var status = res.status - 0;
				var msg = _ErrorCode_[status] || res.msg || "";
				if(status === 0){
					var data = res.data || {};
					
					var selected_city = data.selected_city || "";
					//如果没有城市数据,跳转到城市选择页面
					if(selected_city === ""){
						location.href = "citylist.html";
					}
					else{
						//保存城市信息到本地
						var obj = {};
						obj.code = "000000";
						obj.cityname = selected_city;
						var str = JSON.stringify(obj);
						Utils.offlineStore.set("__selectedcity__",str,true);
						$("#cityname").html(selected_city);
						
						//根据城市获取首页数据
						this.getAllDataHttp(selected_city);
					}
				}
				else{
					Utils.alert(msg);
				}
				
				Utils.loadClose();
			},
			error:function(res){
				Utils.alert("获取城市列表数据错误");
			}
		});
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
	// 添加事件监听
	//window.onorientationchange = page.orientationChange;
});





