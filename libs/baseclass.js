/**
 * file: 基类
 * author: chenxy
 * date: 2016-05-21
 */

function BaseClass(){
	//页面动作控制属性
	if(typeof this.moved === "undefined"){
		this.moved = false;
	}
	
	//联网超时强提示框关闭按钮事件
	if(typeof this.closeTipBtnUp === "undefined"){
		this.closeTipBtnUp = function(evt){
			if(evt != null){
				var ele = evt.currentTarget;
				$(ele).removeClass("curr");
				if(!this.moved){
					$("#servertip").hide();
					this.isTipShow = false;
					//base.alert("父类关闭",true);
				}
			}
			else{
				$("#servertip").hide();
				this.isTipShow = false;
			}
		};
	}
	
	//联网超时强提示框重试按钮事件
	if(typeof this.retryBtnUp === "undefined"){
		this.retryBtnUp = function(evt){
			if(evt != null){
				var ele = evt.currentTarget;
				$(ele).removeClass("curr");
				if(!this.moved){
					$("#servertip").hide();
					this.isTipShow = true;
					//基础类只负责关闭提示框,如果需要重试,需要自己重写函数
					//base.alert("父类重试",true);
				}
			}
		};
	}
};


//基础工具类
function BaseTools(){
	//获取dom
	if(typeof this.$ === "undefined"){
		//因为原生的获取dom是最快的,如果我们获取dom,不需要调用jquery的方法,就用这个吧
		this.$ = function(id){
			//先写个简单的,以后抽空把document.querySelector封装起来
			if(id != null){
				return document.getElementById(id);
			}
		};
	}
	
	
	//过滤特殊字符
	if(typeof this.filterCode === "undefined"){
		this.filterCode = function(str){
			var res = "";
			if(str !== "" && typeof str !== "undefined"){
				var reg = /\\+|\~+|\!+|\@+|\#+|¥+|\￥+|\%+|\^+|\&+|\*+|\(+|\)+|\'+|(\")+|\$+|`+|\“+|\”+|\‘+|\’+|\s+/g;
				res = str.replace(reg,"");
			}
			return res;
		};
	}
	
	//解析Json数据
	if(typeof this.parseData === "undefined"){
		this.parseData = function(data){
			if(data !== "" && data !== null && typeof(data) !== "undefined"){
				if(typeof (data) === "object"){
					return data;
				}
				else{
					try{
						var o = JSON.parse(data);
						return o;
					}
					catch(e){
						return null;
					}
				}
			}
			return null;
		};
	}
	
	
	//经纬度计算两点间的距离
	if(typeof this.getDistance === "undefined"){
		//start 起点经纬度,数据格式 start = {lon:,lat:}
		//end 终点定位度,数据格式 end = {lon:,lat:}
		//dir 是否计算方向
		this.getDistance = function(start,end,dir){
			if(start.lon != null && start.lat != null && end.lon != null && end.lat != null){
				function rad(d){
					return d * Math.PI / 180.0;
				}
				var slon = (start.lon - 0) / 3600000;
				var slat = (start.lat - 0) / 3600000;
				var elon = (end.lon - 0) / 3600000;
				var elat = (end.lat - 0) / 3600000;
				//赤道半径
				var EARTH_RADIUS = 6378137;
				var radLat1 = rad(slat);
				var radLat2 = rad(elat);
				var a = radLat1 - radLat2;
				var b = rad(slon) - rad(elon);
				
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
				s = s * EARTH_RADIUS;
				//返回米
				//s = Math.round(s * 10000) / 10000;
				
				//返回公里
				var kilometer = Math.round(s * 10000) / 10000000;
				var kl = kilometer + "";

				//判断是否要计算方向
				if(!dir){
					if(kl.length > 4){
						//保留两位小数
						return kilometer.toFixed(2);
					}
					else{
						return kilometer;
					}
				}
				else{
					var PI = Math.PI;
					var str = "";
					//计算方向
					var aRad = Math.atan2(elat - slat,elon - slon);
					
					var east = 22.5 / 180 * PI;
					var southeast = -22.5 / 180 * PI;
					if(aRad > southeast && aRad <= east){
						str = "正东";
					}
					var northeast = 67.5 / 180 * PI;
					if(aRad > east && aRad <= northeast){
						str = "东北"
					}
					var north = 112.5 / 180 * PI;
					if(aRad > northeast && aRad <= north){
						str = "正北";
					}
					var northwest = 157.5 / 180 * PI;
					if(aRad > north && aRad <= northwest){
						str = "西北";
					}
					var west = -157.5 / 180 * PI;
					if(aRad > northwest || aRad <= west){
						str = "正西";
					}
					var southwest = -112.5 / 180 * PI;
					if(aRad > west && aRad <= southwest){
						str = "西南";
					}
					var south = -67.5 / 180 * PI;
					if(aRad > southwest && aRad <= south){
						str = "正南";
					}
					if(aRad > south && aRad <= southeast){
						str = "东南";
					}
					/*
					if(aRad >= -PI/6 && (aRad <= PI/6)){
						str = "正东";
					}
					if(aRad >= PI/6 && (aRad <= PI/3)){
						str = "东北";
					}
					if(aRad >= PI/3 && (aRad <= PI*2/3)){
						str = "正北";
					}
					if(aRad >= PI*2/3 && (aRad <= PI*5/6)){
						str = "西北";
					}
					if(aRad >= PI*5/6 || (aRad <=- PI*5/6)){
						str = "正西";
					}
					if(aRad >= -PI*5/6 && (aRad <= -PI*2/3)){
						str = "西南";
					}
					if(aRad >= -PI*2/3 && (aRad <= -PI*2/3)){
						str = "正南";
					}
					if(aRad >= -PI*2/3 && (aRad <= -PI/3)){
						str = "东南";
					}
					*/
					var dis = 0;
					if(kl.length > 4){
						//保留两位小数
						dis = kilometer.toFixed(2);
						if(dis > 1000){
							dis = kilometer.toFixed(1);
						}
					}
					else{
						dis = kilometer;
					}

					return {dir:str,dis:dis};
				}
			}
			return "";
		};
		
	}

	//动态计算页面高度
	if(typeof this.countPageHeight === "undefined"){
		this.countPageHeight = function(){
			//修改页面高度
			var height = $(window).height() || 735;
			//减去页面边框
			height = height - 10;
			if(height > 0){
				var dom = document.getElementById("poid-box");
				if(dom){
					dom.style.minHeight = height + "px";
				}
			}
		}
	}
};


//倒计时插件
function TimeCountDown(dom,time,scope,callback){
	
}


//获取个人中心数据
function GetUserCenterData(){
	//获取个人中心数据
	if(typeof this.getUserCenterHttp === "undefined"){
		
		this.getUserCenterHttp = function(callback){
			
			//判断本地有没有个人中心数据
			var str = Utils.offlineStore.get("_usercenternum_",false) || "";
			if(str !== ""){
				var obj = JSON.parse(str);
				var cartnum = obj.cart_num - 0 || 0;
				if(cartnum > 0){
					var cs = cartnum > 99 ? "max" : "";
					if(cs === ""){
						cs = cartnum > 9 ? "more" : "";
					}
					else{
						cartnum = (cartnum + "").substring(0,2) + "+";
					}
					
					var chtml = '<s class="cartnum ' + cs + '">' + cartnum + '</s>';
					$("#cartpage").append(chtml);
				}
				return;
			}
		
		
			console.log("getUserCenterHttp____1");
		
			Utils.load();
			
			var url = Base.serverUrl;
			//var url = "http://127.0.0.1:1001"
			var condi = {};
			condi.body = Base.body;
			condi.body.tokentype = 2;
			condi.call = {"api":"Bll.Buyer.User.User.userCenter","version":"100"};
			condi.data = {};
			condi.data.device = "WEB";
			
			console.log(JSON.stringify(condi));
			
			$.Ajax({
				url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
				success: function(res){
					console.log("getUserCenterHttp____2",res);
					var status = res.status - 0;
					var msg = _ErrorCode_[status] || res.msg || "";
					if(status === 0){
						var data = res.data || {};
						//保存数据到本地
						var str = JSON.stringify(data);
						Utils.offlineStore.set("_usercenternum_",str,false);
						
						var cartnum = data.cart_num - 0 || 0;
						if(cartnum > 0){
							var cs = cartnum > 99 ? "max" : "";
							if(cs === ""){
								cs = cartnum > 9 ? "more" : "";
							}
							else{
								cartnum = (cartnum + "").substring(0,2) + "+";
							}
							
							var chtml = '<s class="cartnum ' + cs + '">' + cartnum + '</s>';
							$("#cartpage").append(chtml);
							
							if(typeof callback === "function"){
								callback.apply(this,[cartnum]);
							}
						}
					}
					else{
						Utils.alert(msg);
					}
				},
				error:function(res){
					Utils.alert("获取个人信息数据错误");
				}
			});
		}
	}
};
