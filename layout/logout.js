
function loginOut(){
	console.log("loginOut.....");
	layer.confirm('确定退出吗？', {
		btn: ['确定', '取消']
	}, function (index) {
		Utils.offlineStore.remove("__userInfo",true);
		Utils.offlineStore.remove("__user",true);
		Utils.offlineStore.remove("__token",true);

		location.href="/index.html";
	}.bind(this));
}