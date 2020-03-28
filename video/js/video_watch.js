// JavaScript Document

var PageManager = function (obj){
	this.init.apply(this,arguments);
};

PageManager.prototype = {
	constructor:PageManager,
	id:"",
	classType:0,
	playTime:10000,
	titleId:[],
	showTime:[],
	swiper:null,
	init: function(){
		//this.httpTip = new Utils.httpTip({});

		this.id = +Utils.getQueryString("id") || "";
		if(!this.id){
			layer.msg("没有获取到课程id");
			return;
		}

		this.bindEvent();

		this.getInClassHttp();

		
	},
	bindEvent:function(){
		$("#buybtn").onbind("click",this.buyBtnClick,this);
		$("#buybtn2").onbind("click",this.buyBtnClick,this);
		$("#replaybtn").onbind("click",this.replayBtnClick,this);
		$("#clearbtn").onbind("click",this.clearBtnClick,this);

		
		$("#playbtn").onbind("click",this.playBtnClick,this);
		$("#askplay").onbind("click",this.askplayBtnClick,this);
		$("#pausebtn").onbind("click",this.pauseBtnClick,this);
		
		$("#playbtn,#pausebtn,.video_content_left").onbind("mouseover",this.videoMouseover,this);
		$(".video_content_left").onbind("mouseout",this.videoMouseout,this);

		// $("#password").onbind("keydown",this.keyDown,this);
	},
	pageLoad:function(){
	},
	getInClassHttp:function(){
		Utils.load();
		var url = Base.serverUrl + "/class/inclass/" + this.id;
		var condi = {};

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || [];
				var html = [];
				var icid = 0;
				// 课程类型   0: 视频 1: PPT
				this.classType = +res.classType;
				obj.forEach(function(item,i){
					if( i == 0){
						icid = item.id;
					}
					html.push('<li data="' + item.id + '"><a href="javascript:;">' + (i+1)+'、' + item.title + '</a></li>')
				});

				$("#inclasslist").html(html.join(''));

				$("#inclasslist li").rebind('click',this.inclassItemClick,this);

				//默认加载第一条
				this.getIncateHttp(icid);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	
	inclassItemClick:function(evt){
		var ele = evt.currentTarget;
		var icid = +$(ele).attr("data");
		this.getIncateHttp(icid);
	},
	classId:0,
	videoLength:"",
	isplay:false,
	getIncateHttp:function(id){
		Utils.load();
		var url = Base.serverUrl + "/class/incate/" + id;
		var condi = {};
		condi.id = id;

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.courseCategory || [];
				var permissions = res.permissions;
				var videoShort = obj.videoShort || "";

				this.classId = obj.classId;
				this.videoLength = obj.videoLength;

				if(this.classType == 0){
					$("#video1").show();
					$("#playbtn").show();
					$("#pausebtn").hide();
					this.isplay = false;
					
					$("#video1,#video2").attr("src",videoShort);
					// permissions = 0
					// 1是无权限，0是有
					if(permissions){
						//弹出试看提示
						$("#video_content_pop2").show();

						//试看按钮
						$("#replaybtn2").rebind("click",function(){
							$("#video_content_pop2").hide();
							$("#video1")[0].play();
							if(this.IEVersion() == 8) {
								$("#video2")[0].play();
							}
							this.isplay = true;

							clearTimeout(this.inter2);
							this.setVideoPlayTime();
							clearTimeout(this.inter);
							this.getVideoPlayTime();
						},this);

						//播放结束弹出购买
						$("#video1,#video2").rebind("ended",this.videoEnded,this);
						
					}
					

					// obj.subjectTime = "00:00:05,85;"
					var times =  obj.subjectTime.split(";") || [];
					times.forEach(function(ts){
						if(!!ts){
							var time = ts.split(',') || [];
							time.forEach(function(item,i){
								if(i==0){
									var st = item.split(":") || [];
									var h = +st[0] || 0;
									var m = +st[1] || 0;
									var s = +st[2] || 0;
									var long = h*60*60 + m*60 + s;
									this.showTime.push(+long);
								}else{
									this.titleId.push(+item);
								}
							}.bind(this));
						}
					}.bind(this));
					
					// console.log(this.showTime,this.titleId)
					
					if(!permissions){
						$(".video_play").show();
						// this.getVideoPlayTime();
					}
					// this.getVideoPlayTime();
					
					// $("#video2")[0].play();
				}else{
					var imgs = videoShort.split(',');
					var html = [];
					imgs.forEach(function(item){
						html.push('<div class="swiper-slide"><img src="' + item + '" /></div>');
					});
					$(".swiper-wrapper").html(html.join(''));

					$(".swiper-container").show();
					
					this.swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						autoplayStopOnLast:true,
						autoplay: this.playTime,
						onReachEnd:function(){
							this.pptEnded();
						}.bind(this)
					});
					$('.swiper-container').mouseenter(function() {
						this.swiper.stopAutoplay();
					}.bind(this)).mouseleave(function() {
						this.swiper.startAutoplay();
					}.bind(this));
				}
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},

	coloseed:false,
	videoMouseover:function(){
		clearTimeout(this.tout);
		if(!this.coloseed){
			$(".video_play").show();
		}else{
			this.coloseed = false;
		}
	},
	tout:null,
	videoMouseout:function(){
		this.tout = setTimeout(function(){
			$(".video_play").hide();
			this.coloseed = false;
		},250);
	},
	playBtnClick:function(){
		
		$(".video_play").hide();
		$("#playbtn").hide();
		$("#pausebtn").show();

		this.coloseed = true;

		$("#video1")[0].play();
		if(this.IEVersion() == 8) {
			$("#video2")[0].play();
		}
		this.isplay = true;

		clearTimeout(this.inter2);
		this.setVideoPlayTime();
		clearTimeout(this.inter);
		this.getVideoPlayTime();
	},
	pauseBtnClick:function(){
		$("#playbtn").show();
		$("#pausebtn").hide();

		$("#video1")[0].pause();
		if(this.IEVersion() == 8) {
			$("#video2")[0].pause();
		}
		this.isplay = false;
	},
	askplayBtnClick:function(){
		this.closeChoose();
	},

	inter:null,
	getVideoPlayTime:function(){
		var playtime = Math.floor($("#video1")[0].currentTime);
		if(this.IEVersion() == 8) {
			var playtime = Math.floor($("#video2")[0].currentTime);
		}
		var pi = this.showTime.indexOf(playtime);
		if(pi > -1){
			$("#video1")[0].pause();
			if(this.IEVersion() == 8) {
				$("#video2")[0].pause();
			}
			this.isplay = false;

			var tid = this.titleId[pi];
			this.getTitleHttp(tid);
		}else{
			this.inter = setTimeout(function(){
				this.getVideoPlayTime();
			}.bind(this),1000);
		}
	},

	inter2:null,
	playtime:0,
	setVideoPlayTime:function(){
		// var playtime = Math.floor($("#video1")[0].currentTime);
		$(".video_time").html("("+ this.formatTime(this.playtime) + "/"+this.videoLength+")");
		this.inter2 = setTimeout(function(){
			var playtime = Math.floor($("#video1")[0].currentTime) || 0;
			if(this.IEVersion() == 8) {
				var playtime = Math.floor($("#video2")[0].currentTime) || 0;
			}
			if(this.isplay && playtime){
				this.playtime++;
			}
			if(this.playTime <= playtime){
				this.setVideoPlayTime();
			}
		}.bind(this),1000);
	},
	formatTime:function(m){
		var hh = parseInt(m/3600);
		var mm =  parseInt((m - hh*3600)/60);
		var ss = (m - hh*3600) - (mm*60);
		hh = hh > 9 ? hh : "0"+hh;
		mm = mm > 9 ? mm : "0"+mm;
		ss = ss > 9 ? ss : "0"+ss;
		return hh + ":" + mm + ":" + ss;
	},

	getTitleHttp:function(id){
		Utils.load();
		var url = Base.serverUrl + "/testwork/gettitle/" + id;
		var condi = {};
		condi.id = id;

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || [];

				$(".feedback_tit h3").html(obj.title);

				var choose = obj.choose.split(";");
				var col = $(".col-xs-11");
				col.each(function(i){
					if(choose[i]){
						$(this).html(choose[i]);
					}else{
						$(this).hide();
					}
				});

				$(".col-xs-1 img").rebind('click',this.checkedAnswer,this,{tid:id});
				$(".col-xs-1 img").attr("src","../img/ico_notselected.png ");
				$(".color-right").hide();
				$(".color-wrong").hide();
				$(".color-explain").hide();

				//弹出考试题目
				$(".textC").hide();
				$(".J-mask").show();
				$(".J-fuwutiaokuan").show();

				// $(".close_btn").rebind('click',this.closeChoose,this);
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},

	// tout:null,
	checkedAnswer:function(evt){
		$(".col-xs-1 img").attr("src","../img/ico_notselected.png");
		var img = evt.currentTarget;
		img.src = "../img/ico_right.png";
		var id = evt.data.tid;
		var ck = $(img).attr("data");
		var result = id+","+ck;
		// clearTimeout(this.tout);
		// this.tout = setTimeout(function(){
			this.onescoreHttp(result);
		// }.bind(this),1000);
	},
	onescoreHttp:function(result){
		Utils.load();
		var url = Base.serverUrl + "/testwork/onescore";
		var condi = {};
		condi.result = result;

		$.Ajax({
			url:url,type:"POST",data:condi,dataType:"json",context:this,global:false,
			success: function(res){
				var obj = res.data || "";
				if(obj){
					//回答错误
					
					var answer = obj.answer;
					var inputanswer = obj.inputanswer;
					var parsing = obj.parsing;
					$(".col-xs-1 img[data='" + inputanswer +"']").attr("src","../img/ico_wrong.png ");
					$(".col-xs-1 img[data='" + answer +"']").attr("src","../img/ico_right.png ");
					$("#parsing").html(parsing);
					$(".color-wrong").html("答错了，正确答案："+answer);
					$(".color-wrong").show();
					$(".color-explain").show();
					$(".color-right").hide();
				}else{
					//回答正确
					$(".color-right").show();

					$(".color-wrong").hide();
					$(".color-explain").hide();
				}

				$(".textC").show();
				
			},
			error:function(res){
				layer.msg(res.message || "请求错误");
			}
		});
	},
	closeChoose:function(evt){
		$("#video1")[0].play();
		if(this.IEVersion() == 8) {
			$("#video2")[0].play();
		}
		this.isplay = true;

		this.coloseed = true;

		clearTimeout(this.inter2);
		this.setVideoPlayTime();

		setTimeout(function(){
			clearTimeout(this.inter);
			this.getVideoPlayTime();
		}.bind(this),5000);
		
		
		$(".J-mask").hide();
		$(".J-fuwutiaokuan").hide();
	},

	videoEnded:function(){
		$("#video_content_pop").show();
	},
	ppttout:null,
	pptEnded:function(){
		clearTimeout(this.ppttout);
		this.ppttout = setTimeout(function(){
			$("#video_content_pop").show();
		},this.playTime);
	},

	buyBtnClick:function(evt){
		location.href = "/video/purchase_confirmation.html?classId=" + this.classId;
	},
	replayBtnClick:function(evt){
		$("#video_content_pop").hide();

		if($("#video1").length > 0){
			$("#video1")[0].play();
			if(this.IEVersion() == 8) {
				$("#video2")[0].play();
			}
			this.isplay = true;

			clearTimeout(this.inter2);
			this.setVideoPlayTime();
			clearTimeout(this.inter);
			this.getVideoPlayTime();
		}
		if(this.swiper){
			this.swiper.slideTo(0);
		}
	},
	clearBtnClick:function(evt){
		$("#video_content_pop").hide();
	},
	IEVersion:function () {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
		var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		if(isIE) {
			return 8;
			// var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			// reIE.test(userAgent);
			// var fIEVersion = parseFloat(RegExp["$1"]);
			// if(fIEVersion == 7) {
			// 	return 7;
			// } else if(fIEVersion == 8) {
			// 	return 8;
			// } else if(fIEVersion == 9) {
			// 	return 9;
			// } else if(fIEVersion == 10) {
			// 	return 10;
			// } else {
			// 	return 6;//IE版本<=7
			// }   
		} else if(isEdge) {
			return 'edge';//edge
		} else if(isIE11) {
			return 11; //IE11  
		}else{
			return -1;//不是ie浏览器
		}
	}
};

//页面初始化
$(function(){
	var page = new PageManager({});
});





