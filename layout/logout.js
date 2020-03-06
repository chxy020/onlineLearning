
function loginOut(){
	console.log("loginOut.....");

	Utils.offlineStore.remove("__userInfo",true);
	Utils.offlineStore.remove("__user",true);
	Utils.offlineStore.remove("__token",true);

	location.href="index.html";
}