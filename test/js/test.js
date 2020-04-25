var allClicke = [];
var PageManager = function(obj) {
	this.init.apply(this, arguments);
};
var testId = '';
var title = '';
PageManager.prototype = {
	constructor: PageManager,
	time: 61,
	testId: '',
	init: function() {
		//this.httpTip = new Utils.httpTip({});
		testId = +Utils.getQueryString("testId") || "";
		if(!testId){
			layer.msg("没有获取到测试id");
			return;
		}
		// this.bindEvent();
	},
	bindEvent: function() {
		Utils.load();
		var url = Base.serverUrl + "/testwork/getquestions/" + testId;
		$.Ajax({
			async: false,
			url: url,
			type: "POST",
			dataType: "json",
			context: this,
			global: false,
			success: function(res) {
				var data = res.data || {};

				var radio = data.radio || [];
				var multi = data.multi || [];
				var judge = data.judge || [];
				var time = data.testWork.testTime;
				title = data.testWork.testTitle;
				$("#title").html(title);
				this.setTestHtml(radio, multi, judge);

			},
			error: function(res) {
				layer.msg(res.message || "请求错误");
			}
		});

	},
	setTestHtml: function(radio, multi, judge) {
		var html = [];
		var htmlMul = [];
		var htmlJud = [];

		var htmlCardRadio = [];
		var htmlCardMulti = [];
		var htmlCardJudge = [];

		var radioCount = 0;
		var multiCount = 0;
		var judgeCount = 0;

		//单选题渲染开始
		for (var i = 0, len = radio.length; i < len; i++) {
			radioCount++;
			var pointid = i;
			pointid = ++pointid;
			var id = radio[i].id;
			var title = radio[i].title;
			var chooses = radio[i].choose;
			var choose = chooses.split(';');
			choose.pop()
			htmlCardRadio.push('<li><a href="#qu_0_' + id + '">' + pointid + '</a></li>')
			html.push('<li id="qu_0_' + id + '">');
			html.push('<div class="test_content_nr_tt" >');
			html.push('<i>' + pointid + '</i>' + title + '</font>');
			html.push('</div>');
			html.push('<div class="test_content_nr_main" id="subject'+id+'">');
			html.push('<ul>');
			for (var j = 0, lent = choose.length; j < lent; j++) {
				var point = j;
				point = ++point;
				var cho = choose[j].split(':');
				html.push('<li class="option">');
				html.push('<input type="radio" class="radioOrCheck" name="radio_' + id + '_' + pointid + '" id="0_answer_' +
					pointid +
					'_option_' + point + '" />');
				html.push('<label for="0_answer_' + pointid + '_option_' + point + '">');
				html.push('' + cho[0] + '.&nbsp');
				html.push('<p class="ue" style="display: inline;">' + cho[1] + '</p>');
				html.push('</label>');
				html.push('</li>');
			}
			allClicke.push("radio_" + id + "_" + pointid);
			html.push('</ul>');

			html.push('</div>');





			html.push('</div>');
			html.push('</li>');
		}
		//单选题渲染结束

		//多选题渲染开始
		for (var i = 0, len = multi.length; i < len; i++) {
			multiCount++;
			var pointid = i;
			pointid = ++pointid;
			var id = multi[i].id;
			var title = multi[i].title;
			var chooses = multi[i].choose;
			var choose = chooses.split(';');
			choose.pop()
			htmlCardMulti.push('<li><a href="#qu_1_' + id + '">' + pointid + '</a></li>')
			htmlMul.push('<li id="qu_1_' + id + '">');
			htmlMul.push('<div class="test_content_nr_tt" >');
			htmlMul.push('<i>' + pointid + '</i>' + title + '</font>');
			htmlMul.push('</div>');
			htmlMul.push('<div class="test_content_nr_main" id="subject'+id+'">');
			htmlMul.push('<ul>');
			for (var j = 0, lent = choose.length; j < lent; j++) {
				var point = j;
				point = ++point;
				var cho = choose[j].split(':');
				htmlMul.push('<li class="option">');
				htmlMul.push('<input type="checkbox" class="radioOrCheck" name="multi_' + id + '_' + pointid +
					'" id="1_answer_' + pointid +
					'_option_' + point + '" />');
				htmlMul.push('<label for="1_answer_' + pointid + '_option_' + point + '">');
				htmlMul.push('' + cho[0] + '.');
				htmlMul.push('<p class="ue" style="display: inline;">' + cho[1] + '</p>');
				htmlMul.push('</label>');
				htmlMul.push('</li>');
			}
			allClicke.push("multi_" + id + "_" + pointid);
			htmlMul.push('</ul>');
			htmlMul.push('</div>');
			htmlMul.push('</li>');
		}
		//多选题渲染结束

		//判断题渲染开始
		for (var i = 0, len = judge.length; i < len; i++) {
			judgeCount++;
			var pointid = i;
			pointid = ++pointid;
			var id = judge[i].id;
			var title = judge[i].title;
			var chooses = judge[i].choose;
			htmlCardJudge.push('<li><a href="#qu_2_' + id + '">' + pointid + '</a></li>')
			htmlJud.push('<li id="qu_2_' + id + '">');
			htmlJud.push('<div class="test_content_nr_tt" >');
			htmlJud.push('<i>' + pointid + '</i>' + title + '</font>');
			htmlJud.push('</div>');
			htmlJud.push('<div class="test_content_nr_main" id="subject'+id+'">');
			htmlJud.push('<ul>');
			for (var j = 0, lent = 2; j < lent; j++) {
				var point = j;
				point = ++point;
				htmlJud.push('<li class="option">');
				htmlJud.push('<input type="radio" class="radioOrCheck" name="judge_' + id + '_' + pointid + '" id="2_answer_' +
					pointid +
					'_option_' + point + '" />');
				htmlJud.push('<label for="2_answer_' + pointid + '_option_' + point + '">');
				if (j == 0) {
					htmlJud.push('A.&nbsp');
					htmlJud.push('<p class="ue" style="display: inline;">正确</p>');
				} else {
					htmlJud.push('B.&nbsp');
					htmlJud.push('<p class="ue" style="display: inline;">错误</p>');
				}

				htmlJud.push('</label>');
				htmlJud.push('</li>');
			}
			allClicke.push("judge_" + id + "_" + pointid);
			htmlJud.push('</ul>');
			htmlJud.push('</div>');
			htmlJud.push('</li>');
		}
		//判断题渲染结束

		//渲染数据 题目
		$("#test_content_ju").html(htmlJud.join(''));
		$("#test_content_ra").html(html.join(''));
		$("#test_content_mu").html(htmlMul.join(''));
		//渲染数据 答题卡
		$("#card_ra").html(htmlCardRadio.join(''));
		$("#card_mul").html(htmlCardMulti.join(''));
		$("#card_jud").html(htmlCardJudge.join(''));
		//渲染数据 题目个数
		$("#radioCount").html(radioCount);
		$("#multiCount").html(multiCount);
		$("#judgeCount").html(judgeCount);
		$("#radioCountCard").html(radioCount);
		$("#multiCountCard").html(multiCount);
		$("#judgeCountCard").html(judgeCount);
	},
	pageLoad: function() {},
	gotoLogin: function(evt) {
		location.href = "../login/login.html";
	}
};
window.jQuery(function($) {
	"use strict";

	$('time1').countDown({
		with_separators: true
	});
	$('#times1').countDown({
		css_class: 'countdown-alt-1'
	});
	$('#times2').countDown({
		css_class: 'countdown-alt-1',
		onTimeElapsed:function(){
			console.log("考试时间到-----");
			//考试时间到
			submitTest();
		}
	});
	// $('.alt-2').countDown({
	// 	css_class: 'countdown-alt-2'
	// });
});

//页面初始化
$(function() {
	var page = new PageManager({});
	$('li.option label').click(function() {
		var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
		var cardLi = $("a[href='#" + examId + "']"); // 根据题目ID找到对应答题卡
		// 设置已答题
		if (!cardLi.hasClass('hasBeenAnswer')) {
			cardLi.addClass('hasBeenAnswer');
		}

	});
});
function reset(){
	console.log(123);
}

function submitTest() {
	var names = [];
	var ids = [];
	var allIn = false;
	$.each(allClicke, function(idx, item) {
		var q1ck = false;
		$("[name='" + item + "'").each(function(item) {
			if ($(this).is(":checked")) {
				//只有有一个选项选中即可
				var name = $(this).context.name;
				var id = $(this).context.id;
				names.push(name);
				ids.push(id);
				q1ck = true;
			}
		});
		if (!q1ck) {
			layer.msg("还有题没有作答");
			ids = [];
			names = [];
			allIn = false;
			return;
		} else {
			allIn = true
		}
	})
	if (allIn) {
		Utils.load();
		var radioInput = '';
		var multiInput = '';
		var judgeInput = '';
		var preNum = 0;
		var index = 0;
		$.each(ids, function(idx, data) {
			data = data.split('_');
			var id = names[idx].split('_')[1];
			var subjectType = data[0];
			var subjectInput = data[4];
			var multiSubjevtNum = data[2];
			if (subjectType == 0) {
				//单选题
				if (subjectInput == 1) {
					radioInput += id + ',A;'
				}
				if (subjectInput == 2) {
					radioInput += id + ',B;'
				}
				if (subjectInput == 3) {
					radioInput += id + ',C;'
				}
				if (subjectInput == 4) {
					radioInput += id + ',D;'
				}
				if (subjectInput == 5) {
					radioInput += id + ',E;'
				}
				if (subjectInput == 6) {
					radioInput += id + ',F;'
				}
				if (subjectInput == 7) {
					radioInput += id + ',G;'
				}
				if (subjectInput == 8) {
					radioInput += id + ',H;'
				}
				if (subjectInput == 9) {
					radioInput += id + ',I;'
				}
				if (subjectInput == 10) {
					radioInput += id + ',J;'
				}
			}
			if (subjectType == 1) {
				//多选题
				if (index === 0) {
					if (subjectInput == 1) {
						multiInput += id + ',A'
					}
					if (subjectInput == 2) {
						multiInput += id + ',B'
					}
					if (subjectInput == 3) {
						multiInput += id + ',C'
					}
					if (subjectInput == 4) {
						multiInput += id + ',D'
					}
					if (subjectInput == 5) {
						multiInput += id + ',E'
					}
					if (subjectInput == 6) {
						multiInput += id + ',F'
					}
					if (subjectInput == 7) {
						multiInput += id + ',G'
					}
					if (subjectInput == 8) {
						multiInput += id + ',H'
					}
					if (subjectInput == 9) {
						multiInput += id + ',I'
					}
					if (subjectInput == 10) {
						multiInput += id + ',J'
					}

					index++;
				} else {
					if (preNum === multiSubjevtNum) {
						if (subjectInput == 1) {
							multiInput += 'A'
						}
						if (subjectInput == 2) {
							multiInput += 'B'
						}
						if (subjectInput == 3) {
							multiInput += 'C'
						}
						if (subjectInput == 4) {
							multiInput += 'D'
						}
						if (subjectInput == 5) {
							multiInput += 'E'
						}
						if (subjectInput == 6) {
							multiInput += 'F'
						}
						if (subjectInput == 7) {
							multiInput += 'G'
						}
						if (subjectInput == 8) {
							multiInput += 'H'
						}
						if (subjectInput == 9) {
							multiInput += 'I'
						}
						if (subjectInput == 10) {
							multiInput += 'J'
						}
					} else {
						preNum = multiSubjevtNum;
						if (subjectInput == 1) {
							multiInput += ';' + id + ',A'
						}
						if (subjectInput == 2) {
							multiInput += ';' + id + ',B'
						}
						if (subjectInput == 3) {
							multiInput += ';' + id + ',C'
						}
						if (subjectInput == 4) {
							multiInput += ';' + id + ',D'
						}
						if (subjectInput == 5) {
							multiInput += ';' + id + ',E'
						}
						if (subjectInput == 6) {
							multiInput += ';' + id + ',F'
						}
						if (subjectInput == 7) {
							multiInput += ';' + id + ',G'
						}
						if (subjectInput == 8) {
							multiInput += ';' + id + ',H'
						}
						if (subjectInput == 9) {
							multiInput += ';' + id + ',I'
						}
						if (subjectInput == 10) {
							multiInput += ';' + id + ',J'
						}
					}
				}


				preNum = multiSubjevtNum;
			}
			if (subjectType == 2) {
				//判断
				if (subjectInput == 1) {
					judgeInput += id + ',A;'
				}
				if (subjectInput == 2) {
					judgeInput += id + ',B;'
				}

			}

		})
		multiInput = multiInput + ';';
		//请求完成试卷
		var url = Base.serverUrl + "/testwork/score";
		$.Ajax({
			async: false,
			url: url,
			type: "POST",
			dataType: "json",
			data: {
				"id": testId,
				"radio": radioInput,
				"judge": judgeInput,
				"multi": multiInput
			},
			context: this,
			global: false,
			success: function(res) {
				var data = res.data || {};
				layer.msg(res.message || "交卷成功");
				console.log(data);
				var radio = data.radio || [];
				var multi = data.multi || [];
				var judge = data.judge || [];
				var score = data.score;
				$.each(radio,function(idx,data){
					var answer = data.answer;
					var parsing = data.parsing || '暂无解析';
					var id = data.id;
					var anInt = data.answerInt;
					var html =[];
					if(anInt === 0){
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-right">恭喜您，答对了!</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
					}else{
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-wrong">正确答案：'+answer+'</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
					}
					$("#subject"+id).append(html.join(''));
				})
				$.each(multi,function(idx,data){
					var answer = data.answer;
					var parsing = data.parsing || '暂无解析';
					var html =[];
					var anInt = data.answerInt;
					var id = data.id;
					if(anInt === 0){
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-right">恭喜您，答对了!</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
					}else{
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-wrong">正确答案：'+answer+'</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
					}
					
					$("#subject"+id).append(html.join(''));
				})
				$.each(judge,function(idx,data){
					var answer = data.answer;
					var parsing = data.parsing || '暂无解析';
					var id = data.id;
					var anInt = data.answerInt;
					var html =[];
					if(anInt === 0){
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-right">恭喜您，答对了!</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：');
						html.push('</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
						html.push('</div>');
						html.push('</div>');
					}else {
						html.push('<div class="row-tishi" style="margin-top:20px;">');
						html.push('<p class="color-wrong">正确答案：'+answer);
						html.push('</p>');
						html.push('<div class="color-explain">');
						html.push('<div class="row">解析：');
						html.push('</div>');
						html.push('<div class="content">'+parsing+'</div>');
						html.push('</div>');
						html.push('</div>');
						html.push('</div>');
					}
					
					$("#subject"+id).append(html.join(''));
				})
				
				$("#SubmitBtn").hide();
				$("#times2").hide();
				$("#times1").hide();
				var htmlbutton = [];
				htmlbutton.push('<font><input type="button" id="clickHdler" name="test_jiaojuan" onclick="reset()" value="重新开始"></font>');
				$("#title").html(title+'(考试结束)&nbsp&nbsp&nbsp总分数:'+score);
				$("#test_times").append(htmlbutton.join(''));
				$("#clickHdler").on("click",function(){
					window.location.reload();
				});
			},
			error: function(res) {
				layer.msg(res.message || "请求错误");
			}
		});

		// var testForm = $("#testForm").serializeArray();
		// $.each(testForm, function(idx, data) {
		// 	var name = data.name;
		// 	console.log(name);
		// })
	}


}




function ChangeHourMinutestr(str) {
	if (str !== "0" && str !== "" && str !== null) {
		return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
			(Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (
			str % 60).toString());
	} else {
		return "";
	}
}
