
(function(){
	var username = "";
	var user = Utils.offlineStore.get("__user",true) || "";
	if(!!user){
		user = JSON.parse(user);
		username = user.username || "";
	}
	var userType = 0;
	if(typeof(Utils) !== "undefined"){
		var userInfo = Utils.offlineStore.get("__userInfo",true) || "";
		if(userInfo){
			userType = JSON.parse(userInfo).userType;
		}
	}

	var url = location.href;
	var on = -1;
	if(url.indexOf('index.html') > -1){
		on = 0;
	}else if(url.indexOf('legal.html') > -1){
		on = 1;
	}else if(url.indexOf('standard.html') > -1){
		on = 2;
	}
	else if(url.indexOf('policy.html') > -1){
		on = 3;
	}
	else if(url.indexOf('safety.html') > -1){
		on = 4;
	}
	else if(url.indexOf('share.html') > -1){
		on = 5;
	}
	else if(url.indexOf('case.html') > -1){
		on = 6;
	}
	else if(url.indexOf('course.html') > -1){
		on = 7;
	}else if(url.indexOf('personal_center.html') > -1){
		on = 8;
	}else if(url.indexOf('the_test_list.html') > -1){
		on = 9;
	}

	var __header = [];
	__header.push('<div class="head_content clearfix">');
	__header.push('<div class="w1190">');
	__header.push('<div class="head_logo">');
	__header.push('晋安安全');
	__header.push('</div>');
	__header.push('<div class="head_list">');
	__header.push('<ul>');
	if(on == 0){
		__header.push('<li class="on"><a href="/index.html">首页</a></li>');
	}else{
		__header.push('<li><a href="/index.html">首页</a></li>');
	}
	if(on == 1){
		__header.push('<li class="on"><a href="/recommend/legal.html">法律法规</a></li>');
	}else{
		__header.push('<li><a href="/recommend/legal.html">法律法规</a></li>');
	}
	if(on == 2){
		__header.push('<li class="on"><a href="/recommend/standard.html">标准规范</a></li>');
	}else{
		__header.push('<li><a href="/recommend/standard.html">标准规范</a></li>');
	}
	if(on == 3){
		__header.push('<li class="on"><a href="/recommend/policy.html">政策文件</a></li>');
	}else{
		__header.push('<li><a href="/recommend/policy.html">政策文件</a></li>');
	}
	if(on == 4){
		__header.push('<li class="on"><a href="/recommend/safety.html">安全咨询</a></li>');
	}else{
		__header.push('<li><a href="/recommend/safety.html">安全咨询</a></li>');
	}
	if(on == 5){
		__header.push('<li class="on"><a href="/recommend/share.html">互学互荐</a></li>');
	}else{
		__header.push('<li><a href="/recommend/share.html">互学互荐</a></li>');
	}
	if(on == 6){
		__header.push('<li class="on"><a href="/recommend/case.html">案例分析</a></li>');
	}else{
		__header.push('<li><a href="/recommend/case.html">案例分析</a></li>');
	}
	if(on == 7){
		__header.push('<li class="on"><a href="/course/course.html">所有课程</a></li>');
	}else{
		__header.push('<li><a href="/course/course.html">所有课程</a></li>');
	}
	if(on == 9){
		__header.push('<li class="on"><a href="/test/the_test_list.html">试卷查看</a></li>');
	}else{
		__header.push('<li><a href="/test/the_test_list.html">试卷查看</a></li>');
	}
	
	__header.push('<li class="dl">');
	// __header.push('<!-- 登录前 -->');
	if(username==""){
		__header.push('<a href="/login/login.html" class="dl">登录</a>');
	}else{
		// __header.push('<!-- 登录后 -->');
		// __header.push('<span onclick="loginOut()">'+username+' 退出</span>');
		__header.push('<div>');
		if(on == 8){
			if(userType == 0){
				__header.push('<a href="/usercenter/personal_center.html" style="color: #00a0e9;">个人中心</a><span></span><a href="javascript:loginOut()" class="tc">'+username+'</a>');
			}else{
				__header.push('<a href="/usercenter/enterprise_management.html" style="color: #00a0e9;">个人中心</a><span></span><a href="javascript:loginOut()" class="tc">'+username+'</a>');
			}
		}else{
			if(userType == 0){
				__header.push('<a href="/usercenter/personal_center.html" >个人中心</a><span></span><a href="javascript:loginOut()" class="tc">'+username+'</a>');
			}else{
				__header.push('<a href="/usercenter/enterprise_management.html" >个人中心</a><span></span><a href="javascript:loginOut()" class="tc">'+username+'</a>');
			}
		}
		__header.push('</div>');
		// __header.push('<a href="/usercenter/personal_center.html">'+username+'</a>');
	}
	__header.push('</li>');
	__header.push('</ul>');
	__header.push('</div>');
	__header.push('</div>');
	__header.push('</div>');


	document.write(__header.join(''));
})();
