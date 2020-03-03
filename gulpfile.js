//导入工具包 require('node_modules里对应模块')
//本地安装gulp所用到的地方

/*
npm install --save-dev gulp-uglify
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-minify-html

npm install --save-dev jshint gulp-jshint
npm install --save-dev gulp-concat
npm install --save-dev del
压缩图片
npm install --save-dev gulp-imagemin
npm install --save-dev imagemin-pngquant
npm install --save-dev imagemin-jpegtran

gulp-livereload(自动刷新)
npm install --save-dev gulp-livereload
*/

/*
把less文件转换为css。
npm install --save-dev gulp-less
var gulp = require('gulp'),
    less = require("gulp-less");
gulp.task('compile-less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

gulp-sass安装：
npm install --save-dev gulp-sass
var gulp = require('gulp'),
    sass = require("gulp-sass");

gulp.task('compile-sass', function () {
    gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});
*/


var gulp = require('gulp');
//压缩js
var uglify = require('gulp-uglify');
//压缩css
var minify = require('gulp-minify-css');
//压缩html
var minihtml = require('gulp-minify-html');
//js代码检查
var jshint = require("gulp-jshint");
//删除文件
var del = require('del');

/*
//压缩图片
var imagemin = require('gulp-imagemin');
//png图片压缩插件
var pngquant = require('imagemin-pngquant');
var pngquant = require('imagemin-jpegtran');

//自动刷新
var livereload = require('gulp-livereload');

//文件合并
var concat = require("gulp-concat");
*/

//压缩js
gulp.task('jsmini',function(){
	//获取文件，同时过滤掉.min.js文件
	gulp.src(['js/*.js','!js/*.min.js'])
	.pipe(uglify())
	//输出文件
	.pipe(gulp.dest('dist/js/'));
});

//拷贝文件img/*.{png,jpg,gif,ico}
gulp.task('move_libs', function(cb) {
    gulp.src(
        ['libs/*/*','!libs/*.js','css/BebasNeuewebfont/*','img/'],
        {
        	//如果设置为 base: 'js' 将只会复制 js目录下文件, 其他文件会忽略
            base: './'
        }
    ).pipe(gulp.dest('dist/'));
    
    cb();
});

//移动config
gulp.task('move_config_test',['move_libs'],function() {
	setTimeout(function(){
		del(['dist/libs/base.js']);
		//获取文件，同时过滤掉.min.js文件
		gulp.src(['config/test/base.js'])
		.pipe(uglify())
		//输出文件
		.pipe(gulp.dest('dist/libs/'));
		
		console.log("测试服务器,配置文件压缩完成");
	},5000)
});

//压缩libs js
gulp.task('jsmini_libs',function(){
	//获取文件，同时过滤掉.min.js文件
	gulp.src(['libs/*.js'])
	.pipe(uglify())
	//输出文件
	.pipe(gulp.dest('dist/libs/'));
});

//压缩css
gulp.task('cssmini',function(){
	gulp.src(['css/*.css','!css/*.min.css'])
	.pipe(minify())
	.pipe(gulp.dest('dist/css'));
})

//压缩html
gulp.task('htmlmini', function () {
    gulp.src('*.html')
    .pipe(minihtml())
    .pipe(gulp.dest('dist/'));
})

//文件合并
gulp.task('concat', function () {
	//要合并的文件
    gulp.src(['dist/libs/*.js'])
    //合并匹配到的js文件并命名为 "all.js"
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/libs/'));
});

gulp.task('jslint', function () {
    gulp.src('js/*.js')
    .pipe(jshint())
    //输出检查结果
    .pipe(jshint.reporter());
});



//定义默认任务
gulp.task('test',['jsmini','move_libs','jsmini_libs','cssmini','htmlmini','move_config_test']); 

//生产环境
gulp.task('online',['jsmini','move_libs','jsmini_libs','cssmini','htmlmini']); 


/*
//压缩png图片
gulp.task('imgmini_png', function () {
    return gulp.src('img/*.png')
        .pipe(imagemin({
            progressive: true,
            //使用pngquant来压缩png图片
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('imgmini', function () {
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

//压缩png图片
gulp.task('imgmini_png', function () {
    return gulp.src('img/*.png')
        .pipe(imagemin({
            progressive: true,
            //使用pngquant来压缩png图片
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));
});
// 任务：压缩jpg
gulp.task('jpgmin',function(){
    return gulp.src('img/*.jpg')
           .pipe(imagemin({
                progressive: true,
                use:[jpegtran()]
           }))
           .pipe(gulp.dest('dist/img/'));
});
*/

/*
// 任务：压缩png
gulp.task('pngmin',function(){
    return gulp.src('book/*.png')
           .pipe(imagemin({
                quality: '65-80', 
                speed: 4,
                use:[pngquant()]
           }))
           .pipe(gulp.dest('book_min/'));
});
*/

/*
gulp.task('jslint', function () {
    gulp.src('js/*.js')
    .pipe(jshint())
    //输出检查结果
    .pipe(jshint.reporter());
});

gulp.task('concat', function () {
	//要合并的文件
    gulp.src(['dist/libs/*.js'])
    //合并匹配到的js文件并命名为 "all.js"
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/libs/'));
});

//定义默认任务
gulp.task('default',['jsmini','jsmini_libs','cssmini','htmlmini','imgmini_png']); 


gulp.task('listen', function() {
	gulp.src('js/*.js')
	.pipe(livereload());
});

gulp.task('watch', function() {
	//要在这里调用listen()方法
	livereload.listen();
	//监听目录下的文件，若文件发生变化，则调用watch任务。
	gulp.watch('js/*.js', ['listen']);
});

gulp.task('delfile', function(fn) {
	del(['dist/'],fn);
	console.log(11111111111111);
});
gulp.task('del', ['delfile'], function() {
	console.log(22222);
    gulp.start('default');
});


/*图片压缩
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
 
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
 
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});


var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    //确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant');
 
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    //确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
    cache = require('gulp-cache');
    
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
*/

//    less = require('gulp-less'),
    //文件合并
//   concat = require('gulp-concat');
//  jshint = require('gulp-jshint'),
//  uglify = require('gulp-uglify'),
//  imagemin = require('gulp-imagemin'),
//  rename = require('gulp-rename'),
//  
//  notify = require('gulp-notify');

//文件合并
//gulp-concat
//文本替换
//gulp-replace
//图片压缩
//gulp-imagemin
//css压缩
//gulp-cssmin
//js压缩
//gulp-uglify
//文件拷贝
//gulp-copy


//定义一个testLess任务（自定义任务名称）
//gulp.task('testLess', function () {
//  gulp.src('src/less/index.less') //该任务针对的文件
//      .pipe(less()) //该任务调用的模块
//      .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
//});
//
//gulp.task('scripts',function(){
//  gulp.src('./js/*/js')
//  .pipe(concat('index.js'));
//});  
//
//gulp.task('default',['testLess','scripts']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径