/*
 * 动态计算当前设置font-size缩放值
 * defaultW和defaultSize为参考设计稿取值,为了方便计算
 * 比如iphone6的尺寸为750*1334,那么换算到html为375*667,注意这个值和网页设置的viewport相关
 * 那么为什么不把defaultSize设置为10呢,我猜主要是因为chrome浏览器font-size最小取值为12px,
 * 那么如果动态设置html的font-size为10px,系统还是会计算为12px
 */

;var _fontsize = 20;
function FontSize() {
	var W = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth ;
	var defaultW = 375;
	var defaultSize = 20;
	W = W > 640 ? defaultW : W;
	_fontsize = (W / defaultW * defaultSize).toFixed(2);
	document.getElementsByTagName('html')[0].style.fontSize = _fontsize + 'px';
}
FontSize();