$(function (){
//lunbo
	(function($){
	    $.fn.extend({
	        slideGradual : function(options){
	            var slides = $(this);
	            if(slides.length > 0){
	                slides.each(function(i){
	                    var _this=slides[i];
	                    //默认参数
	                    var defaults={
	                        slideCon:"",        //必选参数 图片所在的区域，适用结构  slideCon.ul>li
	                        tabCon:"",          //必选参数 焦点区域     结构没限制
	                        btnLeft:"",         //可选参数 向左的按钮
	                        btnRight:"",        //可选参数 向右的按钮
	                        autoPlay:true,      //可选参数 默认自动轮播
	                        fadeInTime:1000,    //可选参数 fadeIn时间
	                        fadeOutTime:2000,   //可选参数 fadeOut时间
	                        intervalTime:4000   //可选参数 运动间隔时间
	                    };
	                    //把option参数合并到defaults中，并把defaults赋值给  options
	                    options=$.extend(defaults,options);
	                    var $slideCon=$(_this).find(options.slideCon);
	                    var $lis=$slideCon.find("li");     //li元素
	                    var $tabCon=$(_this).find(options.tabCon);
	                    var $tabs=$tabCon.children("*");    //每一个焦点
	                    var $btnLeft=$(_this).find(options.btnLeft);
	                    var $btnRight=$(_this).find(options.btnRight);
	                    var curIndex=$(_this).find(options.tabCon).children("*.on").index();
	                    var lastIndex=0;//初始化
	                    var picLen=$slideCon.find("li").length;     //图片的总个数
	                    var timer=null;
	                    function autoMove(){
	                        curIndex++;
	                        if(curIndex==picLen){
	                            curIndex=0;
	                        }
	                        $lis.eq(curIndex).fadeIn(options.fadeInTime);
	                        $lis.eq(lastIndex).fadeOut(options.fadeOutTime);
	                        $tabs.eq(curIndex).addClass("on").siblings().removeClass("on");
	                        lastIndex=curIndex;//变换值
	                    }
	                    $tabs.each(function(index,ele){
	                        $(ele).click(function(){
	                            curIndex=$(this).index();
	                            clearInterval(timer);
	                            if(lastIndex!=curIndex){
	                                $(this).addClass("on").siblings().removeClass("on");
	                                $lis.eq(curIndex).fadeIn(1000);
	                                $lis.eq(lastIndex).fadeOut(2000);
	                                lastIndex=curIndex;
	                            }
	                        });
	                    });
	                    //鼠标放上去关闭定时器 离开开始定时器
	                    function hoverFn(obj) {
	                        //是自动轮播的话，触发  hover事件
	                        if(options.autoPlay){
	                            obj.hover(function () {
	                                clearInterval(timer);
	                            },function () {
	                                timer=setInterval(function(){
	                                    autoMove();
	                                },options.intervalTime);
	                            });
	                        }
	                    }
	                    hoverFn($slideCon);
	                    hoverFn($tabCon);
	                    hoverFn($btnLeft);
	                    hoverFn($btnRight);
	                    //是否自动轮播
	                    if(options.autoPlay){
	                        timer=setInterval(function(){
	                            autoMove();
	                        },options.intervalTime);
	                    }
	                    // right
	                    if(options.btnRight && $btnRight.length){
	                        $btnRight.click(function () {
	                            autoMove();
	                        });
	                    }
	                    // left
	                    if(options.btnLeft && $btnLeft.length){
	                        $btnLeft.click(function () {
	                            curIndex--;
	                            if(curIndex==-1){
	                                curIndex=picLen-1;
	                            }
	                            $lis.eq(curIndex).fadeIn(options.fadeInTime);
	                            $lis.eq(lastIndex).fadeOut(options.fadeOutTime);
	                            $tabs.eq(curIndex).addClass("on").siblings().removeClass("on");
	                            lastIndex=curIndex;//变换值
	                        });
	                    }
	                    //
	                });
	            }
	        }

	    });
	})(jQuery);

	$(function () {
	    $(".testSlide1").slideGradual({
	        slideCon:".testSlidePics",
	        tabCon:".testSlideTabs",
	        btnLeft:".testBtnLeft",
	        btnRight:".testBtnRight",
	        fadeInTime:900,
	        fadeOutTime:1400,
	        intervalTime:3400
	    });
	    $(".testSlide2").slideGradual({
	        slideCon:".testSlidePics",
	        tabCon:".testSlideTabs",
	        fadeInTime:900,
	        fadeOutTime:1400,
	        intervalTime:3400
	    });
	});    
})
$(function (){
	$(".dpt_banner").mouseover(function() {
		$(".row0-btnRight").show();
		$(".row0-btnLeft").show();
	});
	$(".dpt_banner").mouseout(function() {
		$(".row0-btnRight").hide();
		$(".row0-btnLeft").hide();
	});
})



















