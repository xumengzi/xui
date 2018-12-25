/*
例如 顷刻，昨天，期月，数年 etc
*/
;(function(w){
	function ConvertTime(){
		return 'hello,world'
	};
	ConvertTime.prototype.version = '0.1.1';
	ConvertTime.prototype.addZero = function(d){
		return d < 10 ? '0' + d : d;
	};
	ConvertTime.prototype.now = function(days,bool){
		var n = new Date();
		if (typeof days !== 'boolean' && !isNaN(days)) {
			n.setDate(n.getDate() + days);
		};
		var y = n.getFullYear(),
			m = n.getMonth() + 1,
			d = n.getDate(),
			hh = n.getHours(),
			mm = n.getMinutes(),
			ss = n.getSeconds();
		m = this.addZero(m);
		d = this.addZero(d);
		hh = this.addZero(hh);
		mm = this.addZero(mm);
		ss = this.addZero(ss);
		var detailNowDate = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
		var simpleNowDate = y + '-' + m + '-' + d;
		return (typeof bool == 'boolean') ? detailNowDate : simpleNowDate;
	};
	ConvertTime.prototype.getTime = function(t){
		if (!t) { return };
		var selfTime = t.replace(/-/g,'/');
		selfTime = +new Date(selfTime);
		var nowDate = +new Date();
		var diff =  (nowDate - selfTime) / 1000;	//结果应该是多少毫秒
		if (diff <= 0) {
			return "unvalid";
		};
		diff /= 24 * 3600;
		diff = parseInt((diff),10);
		switch(true){
			case (diff < 1):
				diff = '即日';
				break;
			case (diff < 7):
				diff = '不到一周前';
				break;
			case (diff < 18):
				diff = '旬余';
				break;
			case (diff < 31):
				diff = '不到一个月前';
				break;
			case (diff == 31):
				diff = '期月';
				break;
			case (diff > 31 && diff < 365):
				var d = Math.ceil(diff / 31);
				if (d == 6) {
					diff = '大约半年前';
				}else if(d < 6){
					diff = '约莫' + d + '月前';
				}else{
					diff = '不终岁';
				}
				break;
			case ( diff == 365):
				var d = Math.ceil(diff / 365);
				diff = '经年';
				break;
			case ( diff > 365):
				var d = Math.ceil(diff / 365);
				diff = '不到' + d + '年前';
				break;
		}
		return diff;
	};

	var t = new ConvertTime();

	w.cTime = t;
})(window);

//生成博客列表
;(function(w){
	var blog = {
		totalLength: date.datelist.length,
		type: 'all',
		getClientHeight: function(){
			var clientHeight = 0;
			if (document.body.clientHeight && document.documentElement.clientHeight) {
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			} else{
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			};
			return clientHeight;
		},
		getScrollTop: function(){
			var scrollTop = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if(document.body){
				scrollTop = document.body.scrollTop;
			};
			return scrollTop;
		},
		getScrollHeight: function(){
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		},
		getMyBlogList: function(){
			var works = w.date.datelist;
			var lis = '';
			// console.time('start');
			for(var i = works.length - 1 ; i >= 0; i--){
				var z = works[i];
				var convertTime = cTime.getTime(z.date);
				lis += '<div class="single_blog">'+
						'<div class="time">'+
							'<span class="time_stmp" data-title='+ convertTime +'>'+z.date+'</span>'+
						'</div>'+
						'<div>'+
							'<h2 class="title">'+z.description+'</h2>'+
							'<div class="blog_content">关键词：'+z.key+'</div>'+
						'</div>'+
					'</div>';
			};
			var blog = document.getElementById("myBlog");
			blog.innerHTML = lis;
			// console.timeEnd('start');
		},
		init: function(){
			this.getMyBlogList();
		}
	};
	blog.init();
})(window);

//返回顶部
;(function(w){
	var backToTop = document.createElement("div");
	backToTop.innerHTML = '';
	backToTop.setAttribute("title","返回顶部");
	backToTop.setAttribute("class","backToTop");
	document.getElementsByTagName("body")[0].appendChild(backToTop);
	document.addEventListener("scroll",function(){
		var bodyScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var target = document.getElementsByClassName("backToTop")[0];
		if (bodyScroll > 200) {
			target.classList.add("backRotate");
		}else{
			target.classList.remove("backRotate");
		};
	},false);
	document.getElementsByClassName("backToTop")[0].onclick = function(){
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
})(window);