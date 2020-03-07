
(function(){
	var username = "";
	var user = Utils.offlineStore.get("__user",true) || "";
	if(!!user){
		user = JSON.parse(user);
		username = user.username || "";
	}

	var __header = [];
	__header.push('<div class="head_content clearfix">');
	__header.push('<div class="w1190">');
	__header.push('<div class="head_logo">');
	__header.push('晋安安全');
	__header.push('</div>');
	__header.push('<div class="head_list">');
	__header.push('<ul>');
	__header.push('<li><a href="">法律法规</a></li>');
	__header.push('<li class="on"><a href="">标准规范</a></li>');
	__header.push('<li><a href="">政策文件</a></li>');
	__header.push('<li><a href="">安全咨询</a></li>');
	__header.push('<li><a href="">互学互荐</a></li>');
	__header.push('<li><a href="">案例分析</a></li>');
	__header.push('<li class="dl">');
	// __header.push('<!-- 登录前 -->');
	if(username==""){
		__header.push('<a href="login/login.html">登录</a>');
	}else{
		// __header.push('<!-- 登录后 -->');
		// __header.push('<span onclick="loginOut()">'+username+' 退出</span>');
		__header.push('<a href="usercenter/personal_center.html">'+username+'</a>');
	}
	__header.push('</li>');
	__header.push('</ul>');
	__header.push('</div>');
	__header.push('</div>');
	__header.push('</div>');


	document.write(__header.join(''));
})();
