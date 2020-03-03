

//qsOSZQpI4bMiwbJ-Vv1rko5JhiF6pbbs
var tinify = require("tinify");
tinify.key = "vRre-UlNwufiGsTAbd47hjK8GpbdU0I_";
//var source = tinify.fromFile("img/bank_sprite.png");
//source.toFile("dist/img/bank_sprite.png");



var fs = require("fs");
var path = require("path");


var imglen = 0;
var __dirname = "E:/project/dayugulp/"
fs.readdir(__dirname + '/img/', function (err, files) {
	if(err) {
		console.error(err);
		return;
	} else {
		imglen = files.length;
		console.log(files.length)
		files.forEach(function (file) {
			var filePath = path.normalize(__dirname + '/img/' + file);
			fs.stat(filePath, function (err, stat) {
				if(stat.isFile()) {
					filePath = filePath.replace("E:\\project\\dayugulp\\","");
					var lastname = filePath.substring(filePath.indexOf(".") + 1);
					if(lastname === "png" || lastname === "jpg"){
						console.log(filePath + ' is: ' + 'file',lastname);
						
						var source = tinify.fromFile(filePath);
						source.toFile("dist\\" + filePath);
					}
					
					
				}
				if(stat.isDirectory()) {
					console.log(filePath + ' is: ' + 'dir');
				}
			});
		});
		/*
		for(var i = 0; i < files.length; i++){
			//使用闭包无法保证读取文件的顺序与数组中保存的致
			(function () {
				var filePath = path.normalize(__dirname + '/img/' + files[i]);
				fs.stat(filePath, function (err, stat) {
					if(stat.isFile()) {
						console.log(filePath + ' is: ' + 'file');
					}
					if(stat.isDirectory()) {
						console.log(filePath + ' is: ' + 'dir');
					}
				});
			})();
		}
		*/
	}
});


function copyimg(){
	fs.readdir(__dirname + '/tinified/img/', function (err, files) {
		if(err) {
			console.error(err);
			return;
		} else {
			console.log(files.length);
			if(files.length === imglen){
				console.log("拷贝文件");
				
			}
			else{
				setTimeout(function(){
					copyimg();
				},1000)
			}
		}
	});
}

setTimeout(function(){
	//copyimg();
},1000);
