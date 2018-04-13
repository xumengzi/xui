/*
 created by xumeng
 http://xumengzi.top/
*/ 

/*
include most functions and styles etc.
*/ 
;(function(w) {
	function Xui() {
		this.version = '1.7.9';
		console.log("xui v" + this.version)
	};

	Xui.prototype = {
	    constructor: Xui,
	    zeroFill(e) {
	        if (e < 0) {
				return e = e > -10 ? '-0' + (-e) : e;
			}else{
				return e = e < 10 ? '0' + e : e;
			};
	    },
	    ajax(){
    	    let arg = arguments[0];
		    let url = arg.url,
		        type = arg.type || 'GET',
		        params = arg.params || null;
		    return new Promise(function(resove, reject){
		        let XHR = new XMLHttpRequest();
		        XHR.open(type, url, true);
		        XHR.send(JSON.stringify(params));
		        XHR.onreadystatechange = function(){
		            if(XHR.readyState == 4){
		                if(XHR.status == 200){
		                    resove(XHR.response);
		                } else{
		                    reject(new Error(XHR.response));
		                }
		            }
		        };
		    })
	    },
	    checkLegal(type, str) {
	        let reg;
	        switch (type) {
	        case "name":
	            reg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
	            break;
	        case "mobile":
	            reg = /^1[34578]\d{9}$/;
	            break;
	        case "email":
	            reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	            break;
	        };
	        return reg.test(str);
	    },
	    codeStr(str) {
	        return encodeURIComponent(str);
	    },
	    copyToClipBoard(str, tips){
	    	if (typeof str == 'undefined') {
	    		throw new Error('oops,nothing to copy?');
	    	};
	    	if (document.execCommand('copy')) {
	    		tips = tips || '复制成功';
	    		document.querySelector('.fake_input_value') && document.querySelector('.fake_input_value').remove();
                let fakeInput = document.createElement('input');
                fakeInput.style.position = 'absolute';
                fakeInput.style.left = '-100%';
                fakeInput.value = str;
                fakeInput.classList.add('fake_input_value');
                fakeInput.setSelectionRange(0, str.length);
                document.body.appendChild(fakeInput);
                document.querySelector('.fake_input_value').select();
                document.querySelector('.fake_input_value').focus();
                document.execCommand('copy');
                this.message(tips);
                document.querySelector('.fake_input_value') && document.querySelector('.fake_input_value').remove();
	    	} else{
	    		this.message("Your browser doesn't support");
	    	};
	    },
	    countDown(){
	    	let downTime = null;
	    	let args = arguments[0];
	    	if (!(args.endDate && args.target)) {
	    		throw new Error('结束日期和目标元素必传');
	    	};
	    	args.endDate = args.endDate.replace(/\//g,'-');
	    	clearInterval(downTime);
	    	downTime = setInterval(()=>{
	    		let start = this.now(),
	    		end = this.now(args.endDate);
				let diff = (end - start) / 1000;
		    	let day = parseInt((diff / 24 / 3600),10),
				    hour = parseInt((diff % (24 * 3600) / 3600),10) - 8,
				    minute = parseInt((diff % 3600 / 60),10),
				    second = parseInt((diff % 60),10);
				day = this.zeroFill(day);
				hour = this.zeroFill(hour);
				minute = this.zeroFill(minute);
				second = this.zeroFill(second);
				if (args.isStop && diff <= 0) {
					clearInterval(downTime);
					day = hour = minute = second = '00';
				};
				function addNode(tar, nodeName){
					return '<'+nodeName + '>' + tar + '</' + nodeName + '>';
				};
				if (args.nodeName) {
					day = addNode(day, args.nodeName);
					hour = addNode(hour, args.nodeName);
					minute = addNode(minute, args.nodeName);
					second = addNode(second, args.nodeName);
				};
				document.querySelectorAll('.' + args.target).forEach((item, index)=>{
					item.innerHTML = day + '天' + hour + '时' + minute + '分' + second + '秒';
				});
	    	},1000);
	    },
	    decodeStr(str) {
	        return decodeURIComponent(str);
	    },
	    deleteEle(ele){
	    	let tar = document.querySelectorAll(ele);
	    	if (tar.length) {
	    		let list = [...tar];
	    		for(let i in list){
	    			list[i].remove();
	    		};
	    	};
	    },
	    dropDown(){
	    	let that = this;
	    	const drop = {
	    		renderHTML(args){
	    			let tar = document.getElementById(args.id),
	    			opt = tar.getElementsByTagName('option');
			    	tar.classList.add('none');
			    	let uls = document.createElement('ul');
			    	// add input
			    	if (args.isSearch) {
			    		let inp = document.createElement('input');
				    	inp.setAttribute('type','text');
				    	args.placeHolder = args.placeHolder || 'type to search'; 
				    	inp.setAttribute('placeHolder',args.placeHolder);
				    	inp.setAttribute('value', '');
				    	inp.classList.add('xui_input');
				    	inp.classList.add('xui_input_search');
				    	uls.appendChild(inp);
			    	};
			    	// add li
			    	for(let i = 0; i < opt.length; i++){
			    		let name = opt[i].innerHTML,
			    			val = opt[i].value;
			    		let lis = document.createElement('li');
			    		lis.innerHTML = name;
			    		lis.setAttribute('value', val);
			    		lis.classList.add('xui_drop_li');
			    		uls.appendChild(lis);
			    	};
			    	uls.classList.add('xui_drop_list');
			    	uls.classList.add('none');
			    	let con = document.createElement('div');
			    	con.classList.add('xui_drop_down');
			    	// add button
			    	let but = document.createElement('button');
			    	but.innerHTML = opt[0].innerHTML;
			    	but.value = opt[0].value;
			    	but.classList.add('xui_btn');
			    	but.classList.add('xui_drop_btn');
			    	con.appendChild(but);
			    	con.appendChild(uls);
			    	tar.after(con);
	    		},
	    		event(args){
	    			let tar = document.getElementById(args.id),
	    				ele = tar.nextElementSibling,
	    				search = ele.querySelector('.xui_input_search');
	    			ele.addEventListener('click', this.choose, false);
	    			document.body.onclick = function(e){
			    		let tar = e.target.classList;
			    		if (!(tar.contains('xui_drop_li') || tar.contains('xui_drop_btn') || tar.contains('xui_input_search'))) {
			    			let newArr = [...(document.querySelectorAll('.xui_drop_list'))];
							for(let i in newArr){
								newArr[i].classList.add('none');
								for(let j = 0; j < newArr[i].childNodes.length ; j++){
									newArr[i].childNodes[j].classList.contains('none') && newArr[i].childNodes[j].classList.remove('none');
								};
							};
			    		}
			    	};
	    			search && search.addEventListener('keyup', this.search, false);
	    		},
	    		search(e){
	    			if (e.target.classList.contains('xui_input_search')) {
	    				let val = e.target.value.trim();
	    				let list = e.target.parentNode.querySelectorAll('li');
	    				list = that.toArray(list);
	    				for(let i in list){
	    					if (val != '' && list[i].innerHTML.indexOf(val) == -1) {
	    						list[i].classList.add('none');
	    					}else{
	    						list[i].classList.remove('none');
	    					};
	    				};
	    			}
	    		},
	    		choose(e){
	    			let tar = e.target.classList;
	    			if (tar.contains('xui_drop_btn')) {
	    				// e.target.nextSibling.classList.remove('none');
	    				e.target.nextSibling.classList.toggle('none');
	    				// if ((e.target.nextSibling.classList.contains('none'))) {
	    				// 	console.log('3');
	    				// 	e.target.nextSibling.classList.remove('none');
	    				// } else{
	    				// 	e.target.nextSibling.classList.add('none');
	    				// };
	    			} else if(e.target.parentNode.classList.contains('xui_drop_list')){
	    				if (e.target.nodeName == 'INPUT') {return};
	    				document.getElementById(args.id).value = e.target.getAttribute('value');
	    				e.target.parentNode.previousSibling.value = e.target.getAttribute('value');
	    				e.target.parentNode.previousSibling.innerHTML = e.target.innerHTML;
	    				e.target.parentNode.classList.add('none');
	    			} else{
    					if (!document.querySelectorAll('.xui_drop_list').length) {return;};
	    				let newArr = that.toArray(document.querySelectorAll('.xui_drop_list'));
	    				for(let i in newArr){
	    					newArr[i].classList.add('none');
	    					for(let j = 0; j < newArr[i].childNodes.length ; j++){
	    						newArr[i].childNodes[j].classList.contains('none') && newArr[i].childNodes[j].classList.remove('none');
	    					};
	    				};
	    				let inpArr = that.toArray(document.querySelectorAll('.xui_input_search'));
	    				for(let i in newArr){
	    					inpArr[i] && (inpArr[i].value = '');
	    				};
	    			};
	    		},
	    		init(args){
	    			this.renderHTML(args);
	    			this.event(args);
	    		}
	    	};
	    	let args = arguments[0];
	    	drop.init(args);
	    },
	    formatDate(date, bool) {
	        date = (typeof date !== 'number' ? date.replace(/[^\d]/g, '') - 0 : date);
	        date = new Date(date);
	        let year = date.getFullYear();
	        let month = date.getMonth() + 1;
	        month = this.zeroFill(month);
	        let day = date.getDate();
	        day = this.zeroFill(day);
	        if (bool) {
	            let hour = date.getHours();
	            hour = this.zeroFill(hour);
	            let min = date.getMinutes();
	            min = this.zeroFill(min);
	            let sec = date.getSeconds();
	            sec = this.zeroFill(sec);
	            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
	        };
	        return year + '-' + month + '-' + day;
	    },
	    getCookie(name){
			let myCookie = document.cookie;
			let reg = new RegExp("([\\s]?)" + name + "=([\\d\\w]+)");
			//2017/12/06 修改为正则匹配
			//是的,普通循环显得太low
			return (myCookie.match(reg) === null ? '' : decodeURIComponent(myCookie.match(reg)[2]));
			// myCookie = myCookie.split('; ');
			// for(let i = 0;i < myCookie.length; i++){
			// 	let sinCookie = myCookie[i].split('=');
			// 	if (sinCookie[0] == name) {
			// 		return sinCookie[1];
			// 	};
			// };
			// return '';
	    },
	    loading(isShow, ele, string){
	    	//delete already exists
	    	this.deleteEle('.xui_loading');
	    	if (!isShow) {
	    		return;
	    	};
	    	let tar = document.createElement('div');
	    	type = undefined;
	    	if (type == 1) {
	    		tar.innerHTML = `
	    			<div>
			    		<div class="dot circle1"></div>
						<div class="dot circle2"></div>
						<div class="dot circle3"></div>
						<div class="dot circle4"></div>
						<div class="dot circle5"></div>
						<div class="dot circle6"></div>
						<div class="dot circle7"></div>
						<div class="dot circle8"></div>
						<div class="dot circle9"></div>
						<div class="dot circle10"></div>
						<div class="dot circle11"></div>
						<div class="dot circle12"></div>
					</div>
		    	`;
	    	} else if(type == 2){
	    		tar.innerHTML = `
	    			<div>
			    		<div class="dott dot1"></div>
						<div class="dott dot2"></div>
						<div class="dott dot3"></div>
					</div>
		    	`;
	    	} else{
	    		tar.innerHTML = `
	    			<div>
			    		<div class="fence fence1"></div>
			    		<div class="fence fence2"></div>
			    		<div class="fence fence3"></div>
			    		<div class="fence fence4"></div>
			    		<div class="fence fence5"></div>
			    		<div class="fence fence6"></div>
		    		</div>
		    		${string ? `<div>${string}</div>`: ``}
		    	`;
	    	}
	    	tar.classList.add('xui_loading');
	    	if (typeof ele == 'string') {
	    		tar.classList.add('xui_part_loading');
	    		document.querySelector(ele).appendChild(tar);
	    	} else{
	    		document.body.appendChild(tar);
	    	};
	    },
	    hasClass(source, target){
	    	return source.indexOf(target) > -1 ? true : false;
	    },
	    isArray(arr) {
	        if (Array.isArray) {
	            return Array.isArray(arr);
	        } else {
	            return Object.prototype.toString.call(arr) === '[object Array]';
	        };
	    },
	    isFunction(fn) {
	        return typeof fn === 'function';
	    },
	    isMobile(){
	    	return Math.random() > .5 
						    	? 
						    	/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
						    	:
						    	'ontouchstart' in window;
	    },
	    message(){
	    	//delete already exists
	    	this.deleteEle('xui_message');
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<span>${arguments[0]}</span>
	    	`;
	    	tar.classList.add('xui_message');
	    	document.body.appendChild(tar);
	    	setTimeout(() => {
	    		arguments[2] && arguments[2]();
    			this.deleteEle('.xui_message');
	    	}, arguments[1] || 1000);
	    },
	    now(date, days, bool) {
	    	if (typeof days == 'number') {
	    		return this.formatDate(new Date(date).setDate(new Date(date).getDate() + days), bool);
	    	} else{
	    		date = date || new Date();
	    		return +new Date(date);
	    	};
	    },
	    queryString(str) {
	        let url = location.href;
	        let reg = new RegExp("([?&])" + str + "=([^&]*)([?&]?)");
	        return (url.match(reg) === null ? '' : decodeURIComponent(url.match(reg)[2]));
	    },
	    randomNum(min, max){
	    	if (typeof min == 'number' && typeof max == 'number' && max > min) {
	    		return Math.round(Math.random() * (max - min) + min);
	    	} else{
	    		throw new Error('must be two numbers or in right order');
	    	};
	    },
	    recordData(){
	    	if (!arguments[0]) {throw new Error('parameters are required!');}
	    	let data = arguments[0].data,
	    		url = arguments[0].url;
	    	let isQuestionMark = url.indexOf('?') > -1 ? '&' : '?';
	    	let params = '';
			for(let i in data){
				let each = data[i];
				params += '&' + i + '=' + (each ? each : '');
			};
			params = isQuestionMark + params.substr(1, params.length);
			(new Image(1, 1)).src = url + params;
	    },
	    removeCookie(name){
			let val = this.getCookie(name);
			this.setCookie(name, val, -1);
	    },
	    removeMul(arr) {
	        if (arr instanceof Array) {
	            let newArr = [];
	            for ( let i of arr ) {
	                !newArr.includes(i) && newArr.push(i);
	            };
	            return newArr;
	        } else {
	            return false;
	        };
	    },
	    setCookie(name, value, days, path){
			if (!name) {
				throw new Error('cookie名必传');
			};
			if (!value) {
				throw new Error('cookie值必传');
			};
			let now = new Date();
			let date = now.setDate(days);
			let newDate = new Date(date);
			switch(arguments.length){
				case 3:
				document.cookie = name + '=' + value + '; expires=' + newDate;
				break;
				case 4:
				document.cookie = name + '=' + value + '; expires=' + newDate + '; path=/' + path;
				break;
				default:
				document.cookie = name + '=' + value;
				break;
			};
	    },
	    shallowCopy(obj){
		  	let newObj = {};
		  	for(let i in obj){
			    if(obj.hasOwnProperty(i)){
			      	newObj[i] = obj[i];
			    };
		  	};
		  	return newObj;
		},
		showImg(){
			let that = this;
            //delete already exists
	    	that.deleteEle('xui_img');
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<span class="xui_close"></span>
	    		<div class="xui_img_con">
	    			<img class="xui_img" src=${arguments[0]} alt="">
	    			<div class="xui_icon">
	    				<span class="xui_left" xui-type="1"></span>
	    				<span class="xui_zoomin" xui-type="2"></span>
	    				<span class="xui_zoomout" xui-type="3"></span>
	    				<span class="xui_right" xui-type="4"></span>
	    				${arguments[1] ? `<a class="xui_download" href=${arguments[0]} download=${arguments[1]}></a>` : ''}
	    			</div>
	    		</div>
	    	`;
	    	tar.classList.add('xui_img_content');
	    	document.body.appendChild(tar);
	    	function showImgPic(e){
	    		if (e.target.className == 'xui_close') {
	    			that.deleteEle('.xui_img_content');
	    			document.body.removeEventListener('click', showImgPic, false);
	    		};
	    		if (e.target.getAttribute('xui-type')) {
	    			let tar = document.querySelector('.xui_img');
	    			//get current img rotate degrees
	    			let rotate = tar.style.transform && tar.style.transform.match(/-?\d/igm).join('') - 0;
	    			let width = tar.style.width && tar.style.width.match(/\d/igm).join('') - 0;
	    			switch(e.target.getAttribute('xui-type') - 0){
	    				case 1:
	    					let leftDeg = rotate + 90;
	    					tar.style.transform = `rotate(${leftDeg}deg)`;
	    					tar.style.webkitTransform = `rotate(${leftDeg}deg)`;
	    					tar.style.mozTransform = `rotate(${leftDeg}deg)`;
	    					tar.style.MsTransform = `rotate(${leftDeg}deg)`;
	    					break;
	    				case 2:
	    					width = (width > 140 ? 140 : width) || 100;
	    					tar.style.width = width + 10 + '%';
	    					tar.style.marginLeft = -(width + 10 - 100) / 2 + '%';
	    					break;
	    				case 3:
	    					width = width ? (width < 60 ? 60 : width) : 100;
	    					tar.style.width = width - 10 + '%';
	    					tar.style.marginLeft = -(width - 10 - 100) / 2 + '%';
	    					break;
	    				case 4:
	    					let rightDeg = rotate - 90;
	    					tar.style.transform = `rotate(${rightDeg}deg)`;
	    					tar.style.webkitTransform = `rotate(${rightDeg}deg)`;
	    					tar.style.mozTransform = `rotate(${rightDeg}deg)`;
	    					tar.style.MsTransform = `rotate(${rightDeg}deg)`;
	    					break;
	    				default:
	    					break;
	    			};
	    		};
	    	};
	    	document.body.addEventListener('click', showImgPic, false);
		},
		snowFlake(){
			let args = arguments[0],
				tar = document.getElementById(args.id);
			args.direction == 'left' && tar.classList.add('xui_snow_left');
			tar.classList.add('xui_snow');
		},
	    subLastStr(str) {
	        return str.substr(0, str.length - 1);
	    },
	    tab(){
	    	let args = arguments[0];
	    	let tar = document.getElementById(args.id);
	    	let tab = tar.getElementsByTagName('li');
			let list = tar.querySelectorAll('.xui_tab_body div');
			list = [...list];
			args.animateType = args.animateType || 'none';
			args.activeIndex = args.activeIndex >= tab.length ? 0 : args.activeIndex ? args.activeIndex : 0;
			if (tab.length !== list.length) {
				throw new Error("tab's number error");
			};
			if (typeof args.activeIndex == 'number') {
				for(let l  in list){
					if (args.animateType == 'toLeft') {
						list[l].style.transform = l == args.activeIndex ? 'translate(0%)' : 'translate(-100%)';
					} else if(args.animateType == 'toRight'){
						list[l].style.transform = l == args.activeIndex ? 'translate(0%)' : 'translate(100%)';
					} else{
						list[l].style.display = l == args.activeIndex ? 'block' : 'none';
					};
				};
			};
			for(let i=0; i < tab.length; i++){
				i == args.activeIndex && tab[i].classList.add('selected');
				tab[i].onclick = function(e){
					if (e.currentTarget.className == 'selected') {return;};
					for(let j in list){
						if (i == j) {
							if (args.animateType != 'none') {
								list[j].style.transform = 'translate(0%)';
							} else{
								list[j].style.display = 'block';
							};
							tab[j].classList.add('selected');
							args.fn && args.fn();
						} else{
							if (args.animateType == 'toLeft') {
								list[j].style.transform = 'translate(-100%)';
							} else if(args.animateType == 'toRight'){
								list[j].style.transform = 'translate(100%)';
							} else{
								list[j].style.display = 'none';
							};
							tab[j].classList.remove('selected');
						};
					};
				};
			};
	    },
	    toArray(arrLike){
	    	return Array.prototype.slice.call(arrLike);
	    },
	    twoWayBinding(input, output){
	    	let obj = {},arr = [];
			Object.defineProperty(obj, 'outVal', {
				set(val){
					let num = val;
					let reg1 = /^(\d{3})(\d{0,3})$/,
						reg2 = /^(\d{3})(\d{4})(\d{0,4})$/;
					let lastVal = num;
					reg1.test(num) && (lastVal = num.replace(reg1, `$1 $2`));
					reg2.test(num) && (lastVal = num.replace(reg2, `$1 $2 $3`));
					arr['outVal'] = lastVal;
				},
				get(){
					return arr['outVal'];
				},
			});

			let tar = document.querySelector(input),
				show = document.querySelector(output);
			tar.onkeyup = function(e){
				obj['outVal'] = e.target.value;
				show.innerHTML = arr['outVal'];
			};
	    },
	    prompt(){
	    	//delete already exists
	    	this.deleteEle('.xui_prompt');
	    	const defaults = {
	    		tips: '温馨提示',
	    		text: 'hello,world',
				isShowClose: true,
				fn: null,
				confirmBtn: null,
				cancelBtn: null,
	    	};
	    	const opts = Object.assign({},defaults, arguments[0]);
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<div class="xui_content">
	    			${opts.isShowClose ? `<span class="xui_close"></span>` : ``}
			    	<div class="xui_text">
			    		<div class="xui_title"><span>${opts.tips}</span></div>
			    		<div class="tips">${opts.text}</div>
			    	</div>
			    	<div class="xui_btn_box">
				    	${opts.cancelBtn ? '<button class="xui_btn xui_btn_cancel xui_cancel">'+ opts.cancelBtn.text +'</button>' : ''}
				    	${opts.confirmBtn ? '<button class="xui_btn xui_btn_default xui_confirm">'+ opts.confirmBtn.text +'</button>' : ''}
			    	</div>
			    </div>
	    	`;
	    	tar.classList.add('xui_prompt');
	    	document.body.appendChild(tar);
	    	//按钮回调
    		document.querySelector('.xui_content').addEventListener('click',(e) => {
	    		let tar = e.target.classList;
	    		if (tar.contains('xui_close') || tar.contains('xui_cancel')) {
	    			this.deleteEle('.xui_prompt');
	    			opts.cancelBtn && opts.cancelBtn.fn && opts.cancelBtn.fn();
	    		};
	    		if (tar.contains('xui_confirm')) {
	    			this.deleteEle('.xui_prompt');
	    			opts.confirmBtn && opts.confirmBtn.fn && opts.confirmBtn.fn();
	    		};
	    	});
	    },
	};

	w.xui = new Xui;
})(window);

/*
here is a calendar plugin
*/ 
;(function(w){
	function calendar(){
		xui.deleteEle('.xui_calendar_picker');
		cal.config = {};
		let tar = new Date();
		const t = {
			y: tar.getFullYear(),
			m: tar.getMonth() + 1,
		};
		cal.config.year = t.y;
		cal.config.month = t.m;
		cal.config = Object.assign({}, cal.config, arguments[0]);
		// 是否禁止点击
		let ele = document.getElementById(cal.config.id),
			child = ele && ele.children[0];
		if (ele.getAttribute('disabled')) {
			return;
		};
		//初始化日历
		cal.init();
		document.body.onclick = function(e){
			let o = e.target.classList;
			let isClose = o.contains('xui_date_input') || o.contains('xui_calendar_icon') || o.contains('xui_date_picker');
			if (!isClose) {
				xui.deleteEle('.xui_calendar_picker');
			};
			//remove value
			if (o.contains('xui_close_small')) {
				e.target.parentNode.querySelector('.xui_date_input').value = ''
			};
		};
	};
	const cal = {
		config: {},
		event(){
			let tar = document.querySelector('.xui_calendar_picker');
			tar.addEventListener('click', cal.handleClickCal.bind(this), false);
		},
		handleClickCal(e){
			let that = cal;
			let o = e.target.classList;
			//choose date
			let isChooseDate = !o.contains('xui_calendar_invalid') && (o.contains('xui_calendar_valid') || o.contains('xui_calendar_foot'));
			if (isChooseDate) {
				let date = e.target.getAttribute('data-date');
				that.config.fn && that.config.fn(date);
				xui.deleteEle('.xui_calendar_picker');
				document.body.removeEventListener('click', cal.handleClickCal.bind(this), false);
			};
			
			//set date
			if (o.contains('xui_calendar_icon')) {
				let type = e.target.getAttribute('data-set');
				that.config.month -=0;
				that.config.year -=0;
				if (type == 1) {
					that.config.month -= 1;
					if (that.config.month < 1) {
						that.config.month = 12;
						that.config.year--;
					};
				};
				type == 2 && (that.config.year -= 1);
				type == 3 && (that.config.year += 1);
				if (type == 4) {
					that.config.month += 1;
					if (that.config.month > 12) {
						that.config.month = 1;
						that.config.year++;
					};
				};
				that.renderHTML(that.config.year, that.config.month);
			};
			//remove calendar
			if (e.target.className == '') {
				xui.deleteEle('.xui_calendar_picker');
				document.body.removeEventListener('click', cal.handleClickCal.bind(this), false);
			};
		},
		removeCal(){
			let del = document.getElementById(this.config.id).parentNode;
			let eact = del.querySelectorAll('.xui_calendar_picker');
			if (eact.length) {
				for(let d = 0; d < eact.length; d++){
					eact[d] && eact[d].remove();
					// document.querySelector('.xui_calendar_picker') && document.querySelector('.xui_calendar_picker').removeEventListener('click', cal.test, false)
					document.body.removeEventListener('click', cal.handleClickCal, false);
				};
			};
		},
		renderHTML(year, month){
			this.removeCal();
			//换行标志位
			let tag = 0,
				lTag = 0;
			//总的表格数
			let totalNum = 42;
			let tar = new Date();
			const t = {
				y: year,
				m: month,
			};
			let firstDay = new Date(`${t.y}-${t.m}`).getDay(),
				allDays = new Date(t.y, t.m, 0).getDate();
			let tds = `<tr>`;
			//prev month
			if (this.config.isOtherMonths) {
				let lastDays = new Date(t.y, t.m - 1, 0).getDate();
				for(let i = firstDay -1; i >= 0; i--){
					tag++;
					lTag++;
					let prevd= (month == 1 ? `${t.y-1}-12-${lastDays - i}` : `${t.y}-${this.setNum(t.m-1)}-${lastDays - i}`);
					let isStarted = '',isEnded = '';
					if (this.config.startDate) {
						if (new Date(prevd) < new Date(this.config.startDate) || new Date(prevd) > new Date(this.config.endDate)) {
							isStarted = 'xui_calendar_invalid';
						};
					};
					if (this.config.endDate) {
						isEnded = new Date(this.config.endDate) > new Date(prevd) ? '' : 'xui_calendar_invalid';
					};
					tds += `
						<td>
							<div data-date=${prevd} title=${prevd} class="xui_calendar_valid xui_calendar_prev ${isStarted} ${isStarted}">
								${lastDays - i}
							</div>
						</td>
					`;
					if (tag % 7 == 0) {
						tds += `</tr><tr>`;
					};
				};
			} else{
				for(let i = firstDay -1; i >= 0; i--){
					tag++;
					lTag++;
					tds += `<td><div></div></td>`;
					if (tag % 7 == 0) {
						tds += `</tr><tr>`;
					};
				};
			};
			//current month
			for(let j = 1; j <= allDays; j++){
				tag++;
				lTag++;
				let currd = `${t.y}-${this.setNum(t.m)}-${this.setNum(j)}`;
				let isStarted = '',isEnded = '',isSelected = '';
				if (this.config.startDate) {
					isStarted = new Date(this.config.startDate) < new Date(currd) ? '' : 'xui_calendar_invalid';
				};
				if (this.config.endDate) {
					isEnded = new Date(this.config.endDate) > new Date(currd) ? '' : 'xui_calendar_invalid';
				};
				isSelected = (j == tar.getDate() ? 'xui_calendar_selected' : '');
				tds += `
					<td>
						<div data-date=${currd} title=${currd} class="xui_calendar_valid ${isStarted} ${isEnded} ${isSelected}">
							${j}
						</div>
					</td>
				`
				if (tag % 7 == 0) {
					tds += `</tr><tr>`;
				};
			};
			//next month
			if (this.config.isOtherMonths){
				for(let k = 1; k <= totalNum - lTag; k++){
					tag++;
					let nextd= (month != 12 ? `${t.y}-${this.setNum(t.m+1)}-${this.setNum(k)}` : `${t.y+1}-01-${this.setNum(k)}`);
					let isStarted = '',isEnded = '';
					if (this.config.startDate) {
						isStarted = new Date(this.config.startDate) < new Date(nextd) ? '' : 'xui_calendar_invalid';
					};
					if (this.config.endDate) {
						isEnded = new Date(this.config.endDate) > new Date(nextd) ? '' : 'xui_calendar_invalid';
					};
					tds += `
						<td>
							<div data-date=${nextd} title=${nextd} class="xui_calendar_valid xui_calendar_next ${isStarted} ${isEnded}">
								${k}
							</div>
						</td>
					`
					if (tag % 7 == 0) {
						tds += `</tr><tr>`;
					};
				};
			} else{
				for(let k = 1; k <= totalNum - lTag; k++){
					tag++;
					tds += `<td><div></div></td>`
					if (tag % 7 == 0) {
						tds += `</tr><tr>`;
					};
				};
			};
			//文字是否设置为中文
			let calHeadEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				calHeadCn = ['日', '一', '二', '三', '四', '五', '六'],
				calMonthEn = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				calMonthCn = ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				calHeadArr = '',
				calHeadHtml = '',
				calMonthHtml= '';
			calHeadArr = this.config.isChinese ? calHeadCn : calHeadEn;
			todayText = this.config.isChinese ? '今天' : 'today';
			calMonthHtml = this.config.isChinese ? calMonthCn[Number(this.setNum(month))] : calMonthEn[Number(this.setNum(month))];
			let calHeadYear = this.config.isChinese ? `年` : `year`;
			let calHeadMonth = this.config.isChinese ? `月` : `month`;
			for(let i in calHeadArr){
				calHeadHtml += `<th class="xui_calendar_th">${calHeadArr[i]}</th>`;
			};
			//是否显示今天
			let isToday = ``;
			if (this.config.isToday) {
				let istoDay = '';;
				let tDate = `${t.y}-${this.setNum(t.m)}-${this.setNum(tar.getDate())}`;
				if (this.config.startDate) {
					if (new Date(tDate) < new Date(this.config.startDate) || new Date(tDate) > new Date(this.config.endDate)) {
						istoDay = 'xui_calendar_invalid';
					};
				};
				isToday = `
					<div class="xui_calendar_foot ${istoDay}" data-date=${tDate}>
						${todayText}
					</div>
				`;
			};
			//绘制日历
			let calHTML = `
					<div class="xui_calendar_head">
						<div>
							<div data-set=2 title=${calHeadYear} class="xui_calendar_icon xui_cal endar_icon_year xui_calendar_left"></div>
							<div data-set=1 title=${calHeadMonth} class="xui_calendar_icon xui_calendar_left"></div>
						</div>
						<div class="xui_calendar_choose">
							<span title=${year}>${year}</span>
							<span title=${calMonthHtml}>${calMonthHtml}</span>
						</div>
						<div>
							<div data-set=4 title=${calHeadMonth} class="xui_calendar_icon xui_calendar_right"></div>
							<div data-set=3 title=${calHeadYear} class="xui_calendar_icon xui_calendar_icon_year xui_calendar_right"></div>
						</div>
					</div>
					<div class="xui_calendar_body">
						<table>
							<thead>
								<tr>
									${calHeadHtml}
								</tr>
							</thead>
							<tbody>
								${tds}
							</tbody>
						</table>
					</div>
					${isToday}
			`;
			let con = document.createElement('div');
			con.classList.add('xui_calendar_picker');
			con.innerHTML = calHTML;
			// let close = document.createElement('span');
			// close.classList.add('xui_close_small');
			// close.setAttribute('data-date','');
			// document.getElementById(this.config.id).after(close);
			document.getElementById(this.config.id).after(con);
			this.event();
		},
		setNum(num){
			return num < 10 ? '0' + num : num;
		},
		init(){
			let y = this.config.year,
				m = this.config.month;
			this.renderHTML(y, m);
		}
	};
	Object.getPrototypeOf(xui).calendar = calendar;
})(window);

/*
here is a page plugin
*/
;(function(w){
	function Page(){
		let args = arguments[0];
		let that = this;
		if (!args.id) {
			throw new Error("element'id is required");
		};
		if (!args.total) {
			throw new Error("total is required");
		};
		that.id = args.id;
		that.index = args.index || 1;
		that.total = args.total;
		that.isShowDot = args.isShowDot;
		that.isShowNum = args.isShowNum;
		that.isJumpPage = args.isJumpPage;

		that.renderHTML(that.index);
		this.event();
	};
	Page.prototype.event = function(){
		let tar = document.getElementById(this.id);
		tar.addEventListener('click', this.handleClick.bind(this), false);
		tar.addEventListener('keyup', this.handleEnter.bind(this), false);
	};
	Page.prototype.handleEnter = function(e){
		let reg = /^\d{1,}$/,
			val = e.target.value;
		if (!reg.test(val) || val == 0) {
			e.target.value = '';
		};
		if (e.keyCode == 13) {
			val = val > this.total ? this.total : val;
			this.renderHTML(val);
			this.onKeyUp && this.onKeyUp(val);
		};
	};
	Page.prototype.handleClick = function(e){
		let tar = e.target;
		let ele = tar.classList;
		if (ele.contains('xui_page_valid')) {
			let index = tar.getAttribute('data-num');
			this.onClick && this.onClick(index);
			this.renderHTML(index);
		};
	};
	Page.prototype.renderHTML = function(index){
		index -=0;
		let tot = this.total;
		// 循环中间的5个数字
		let spans = '';
		let tag = 0;
		if (index < 3) {
			tag = 1;
		} else if(index <= tot - 2){
			tag = index - 2;
		} else if(index > tot - 2){
			tag = index - 3;
			tag = tag > (tot - 4) ? (tot - 4) : tag;
		};
		for(let i = tag; i < (tag + 5) ; i++){
			let isSelected = '';
			isSelected = index == i ? 'xui_page_selected' : '';
			spans += `
				<span class="xui_page_valid ${isSelected}" title=${i} data-num=${i}>${i}</span>
			`
		};
		/*
		提供配置选项,分别是是否展示..., 分页数字,go快捷选项
		*/ 
		let isShowPrevDot = '', 
			isShowLastDot = '',
			isShowNumber = '',
			isJumpPage = '';
		if (this.isShowDot && index > 3) {
			isShowPrevDot = `<span class="xui_page_initial">...</span>`;
		};
		if (this.isShowDot && index < tot - 2) {
			isShowLastDot = `<span class="xui_page_initial">...</span>`;
		};
		if (this.isShowNum) {
			isShowNumber = `<span class="xui_page_initial">${index}/${this.total}</span>`;
		};
		if (this.isJumpPage) {
			isJumpPage = `<input type="text" class="xui_input xui_page_go" placeholder="go" />
	    	`;
		};
		let isPrevInvalid = '', isLastInvalid = '';
		isPrevInvalid = index == 1 ? 'xui_page_invalid' : 'xui_page_valid';
		isLastInvalid = ((index == this.total) ? 'xui_page_invalid' : 'xui_page_valid');
		let page = `
			<div class="xui_page_content">
				<span class="xui_page_nav ${isPrevInvalid}" title="First Page" data-num=1>First</span>
				<span class="xui_page_nav ${isPrevInvalid}" title="Previous Page" data-num=${index-1}>Prev</span>
				${isShowPrevDot}
				${spans}
				${isShowLastDot}
				<span class="xui_page_nav ${isLastInvalid}" title="Next Page" data-num=${index+1}>Next</span>
				<span class="xui_page_nav ${isLastInvalid}" title="Last Page" data-num=${this.total}>Last</span>
				${isJumpPage}
				${isShowNumber}
			</div>
		`;
		document.getElementById(this.id).innerHTML = page;
	};
	Object.getPrototypeOf(xui).pagination = Page;
})(window);

/*
here is a slider plugin
*/
;(function(w){
	function Slider(){
		let defaults = {
			index: 0,
			duration: 3000,
			isShowDot: true,
			isShowSwitch: false,
			animation: '.5s linear',
			timer: null,
		};
		let args = arguments[0];
		defaults = Object.assign({}, defaults, args);
		this.defaults = defaults;
		this.init();
	};
	Slider.prototype.event = function(){
		let ele = document.getElementById(this.defaults.id);
		let dot = ele.querySelector('.xui_slider_dot_con');
		dot.addEventListener('mouseover', this.handleCountAng.bind(this), false);
		dot.addEventListener('mouseout', this.autoAnimated.bind(this), false);

		let ang = ele.querySelector('.xui_slider_tab_con');
		ang.addEventListener('click', this.handleCountAng.bind(this), false);
		ang.addEventListener('mouseout', this.autoAnimated.bind(this), false);
	};
	Slider.prototype.autoAnimated = function(){
		clearInterval(this.defaults.timer);
		let time = this.defaults.duration;
		this.defaults.timer = setInterval(()=>{
			this.defaults.index++;
			this.defaults.index = (this.defaults.index > this.defaults.imgList.length - 1 ? 0 : this.defaults.index);
			this.handleChangeImg();
		}, time);
	};
	Slider.prototype.handleCountAng = function(e){
		clearInterval(this.defaults.timer);
		document.querySelector('.xui_slider_tab_con').removeEventListener('click', this.handleCountAng.bind(this), false);
		if (e.target.classList.contains('xui_slider_dot')) {
			let inx = e.target.getAttribute('data-index');
			this.defaults.index = inx;
			this.handleChangeImg();
		};
		if (e.target.classList.contains('xui_slider_ang')) {
			let inx = e.target.getAttribute('data-type') - 0;
			this.defaults.index += inx;
			this.defaults.index = (this.defaults.index > this.defaults.imgList.length - 1 ? 0 : this.defaults.index);
			this.defaults.index = this.defaults.index < 0 ? this.defaults.imgList.length - 1 : this.defaults.index;
			this.handleChangeImg();
		};
	};
	Slider.prototype.handleChangeImg = function(){
		//修改圆点的位置
		this.handleChangeDot();
		let each = 100 / (this.defaults.imgList.length - 0);
		let ang = - (each * this.defaults.index) + '%';
		//切换回调
		this.defaults.fn && this.defaults.fn(this.defaults.index);
		//修改图片的位置
		let ele = document.getElementById(this.defaults.id),
			tar = ele.querySelector('.xui_slider_img').style;
		tar.transform = `translate(${ang})`;
		tar.webkitTransform = `translate(${ang})`;
		tar.mozTransform = `translate(${ang})`;
		tar.MsTransform = `translate(${ang})`;
		tar.transition = this.defaults.animation;
		tar.webkitTransition = this.defaults.animation;
	};
	Slider.prototype.handleChangeDot = function(){
		let ele = document.getElementById(this.defaults.id);
		let tar = ele.querySelector('.xui_slider_dot_con');
		let spans = tar.children;
		for(let i = 0; i< spans.length ; i++){
			spans[i].getAttribute('data-index') == this.defaults.index
				? 
				spans[i].classList.add('selected') 
				: 
				spans[i].classList.remove('selected');
		};
	};
	Slider.prototype.renderHTML = function(){
		let imgs = this.defaults.imgList, list = '', spans = '';
		for(let i in imgs){
			let isSelected = i == 0 ? 'selected' : '';
			list += `
				<div><a href=${imgs[i].link} target="_blank"><img src="${imgs[i].img}"></a></div>
			`;
			spans += `
				<span data-index=${i} class="xui_slider_dot ${isSelected}"></span>
			`;
		};
		let slider = `
			<div class="xui_slider_content">
				<div class="xui_slider_img" style="width:${this.defaults.imgList.length}00%">
					${list}
				</div>
				<div class="xui_slider_dot_con ${this.defaults.isShowDot ? '' : 'none'}">
					${spans}
				</div>
				<div class="xui_slider_tab_con ${this.defaults.isShowSwitch ? '' : 'none'}">
					<span data-type=-1 class="xui_slider_ang"></span>
					<span data-type=1 class="xui_slider_ang"></span>
				</div>
			</div>
		`;
		document.getElementById(this.defaults.id).innerHTML = slider;
		(this.defaults.isShowDot || this.defaults.isShowSwitch) && this.event();
		this.autoAnimated();
	};
	Slider.prototype.init = function(){
		this.renderHTML();
	};
	Object.getPrototypeOf(xui).slider = Slider;
})(window);

/*
here is a scrollLoad plugin
*/ 
;(function(w){
	let that = null;
	function Scroll(){
		this.id = arguments.length && arguments[0].id;
		that = this;
	};
	Scroll.prototype.toBottomHeight = function(){
		let diff = 0;
		if (this.getScrollTop() == 0) {
			return this.getClientHeight()
		} else{
			return this.getScrollHeight() - this.getScrollTop() - this.getClientHeight();
		};
	};
	//获取可视区域的高度
	Scroll.prototype.getClientHeight = function(){
		let clientHeight = 0;
		if (that.id) {
			return document.getElementById(that.id).clientHeight;
		};
		if (document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		} else{
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		};
		return clientHeight;
	};
	//滚动条当前的位置
	Scroll.prototype.getScrollTop = function(){
		let scrollTop = 0;
		if (that.id) {
			return document.getElementById(that.id).scrollTop;
		};
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if(document.body){
			scrollTop = document.body.scrollTop;
		};
		return scrollTop;
	};
	//文档总高度
	Scroll.prototype.getScrollHeight = function(){
		if (that.id) {
			return document.getElementById(that.id).scrollHeight;
		};
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	};
	Scroll.prototype.init = function(){
		let tar = that.id ? document.getElementById(that.id) : window;
		tar.onscroll = function(){
			let height = that.toBottomHeight();
			that.onscroll(height);
		};
	};
	Object.getPrototypeOf(xui).scroll = Scroll;
})(window);

/*
here is a fullPage plugin
*/ 
;(function(w){
	function full(){
		let args = arguments[0];
		const defaults = {
			currentPage: 0,
			direction: 'Y',
			isShowDot: true,
			isBackground: true,
			distance: 60,
			transition: '1s ease',
			colorArr: [
				'rgb(200,200,169)',
				'rgb(131,175,155)',
				'rgb(114,111,128)',
				'rgb(6,157,128)',
				'rgb(252,157,154)',
				'rgb(229,187,129)',
				'rgb(34,8,7)',
				'rgb(227,160,93)',
				'rgb(56,13,49)',
				'rgb(89,61,67)',
			],
		};
		this.obj = Object.assign({}, defaults, args);
		if (!this.obj.id) {
			throw new Error("element'id is required");
		};
		page.config = this.obj;
		page.config.list = document.getElementById(page.config.id).children;
		if (!page.config.list.length) {
			throw new Error('nothing aha ?');
		};
		page.init();
	};
	const page = {
		config: {},
		event(e){
			if (e.target.classList.contains('xui_page')) {
				let dir = e.deltaY > 0 ? '1' : '-1';
				this.move(e, dir);
			};
		},
		move(e, direction){
			let tar = e.target,
				sty = tar.style,
				prev = tar.previousElementSibling && tar.previousElementSibling.style,
				next = tar.nextElementSibling && tar.nextElementSibling.style,
				dir = this.config.direction;
			if (direction == 1) {
				if (tar.nextElementSibling && sty.transform == `translate${dir}(0%)`) {
					sty.transform = `translate${dir}(-100%)`;
					sty.webkitTransform = `translate${dir}(-100%)`;
					next.transform = `translate${dir}(0%)`;
					next.webkitTransform = `translate${dir}(0%)`;
					next.mozTransform = `translate${dir}(0%)`;
					next.transition = this.config.transition;
					next.webkitTransition = this.config.transition;
					this.config.fn && this.config.fn(tar, tar.nextElementSibling);
				};
			} else{
				if (tar.previousElementSibling && sty.transform == `translate${dir}(0%)`) {
					sty.transform = `translate${dir}(100%)`;
					sty.webkitTransform = `translate${dir}(100%)`;
					prev.transform = `translate${dir}(0%)`;
					prev.webkitTransform = `translate${dir}(0%)`;
					prev.mozTransform = `translate${dir}(0%)`;
					prev.transition = this.config.transition;
					prev.webkitTransition = this.config.transition;
					this.config.fn && this.config.fn(tar, tar.previousElementSibling);
				};
			};
			sty.transition = this.config.transition;
			sty.webkitTransition = this.config.transition;
		},
		init(){
			let tar = document.getElementById(this.config.id);
			let ele = tar.children, dir = this.config.direction;
			let fst = this.config.currentPage;
			for(let i = 0;i < ele.length; i++){
				ele[i].classList.add('xui_page');
				//一些配置项
				let arr = this.config.colorArr;
				this.config.isBackground && arr.length && (ele[i].style.background = arr[xui.randomNum(0,arr.length - 1)]);
				this.config.isShowDot && ele[i].setAttribute('data-page', `${i+1}/${ele.length}`);
				if (i < fst) {
					ele[i].style.transform = `translate${dir}(-100%)`;
				} else if(i == fst){
					ele[i].style.transform = `translate${dir}(0%)`;
				} else{
					ele[i].style.transform = `translate${dir}(100%)`;
				};
			};
			w.onwheel = (e) => {
				this.event(e);
			};
			if (xui.isMobile()) {
				let startX = 0, endX = 0,
					startY = 0, endY = 0;
				tar.addEventListener('touchstart',(e)=>{
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
				});
				// tar.addEventListener('touchmove',(e)=>{
				// 	console.log(e);
				// });
				tar.addEventListener('touchend',(e)=>{
					endX = e.changedTouches[0].pageX;
					endY = e.changedTouches[0].pageY;
					let diffX = endX - startX,
						diffY = endY - startY;
					let dis = this.config.distance;
					let diff = this.config.direction == 'X' ? diffX : diffY;
					let dir = 0;
					if (diff > Math.abs(dis)) {
						dir = -1;
						this.move(e, dir);
					} else if(diff < -dis){
						dir = 1;
						this.move(e, dir);
					};
				});
			};
		},
	};
	Object.getPrototypeOf(xui).fullPage = full;
})(window);

/*
here is a cascader plugin
*/ 
;(function(w){
	class Cascader{
		constructor(){
			this.id = arguments[0].id;
			this.val = {
				v0: '',
				v1: '',
				v2: '',
			};
			this.data = arguments[0].data;
			this.rep = arguments[0].rep;
			this.init();
		};
		event(){
			let ele = document.getElementById(this.id),
				tar = ele.querySelectorAll('.xui_select');
			for(let i = 0; i < tar.length; i++){
				tar[i].onchange = (e) => {
					let val = e.target.value;
					i == 0 && (this.val.v0 = val);
					i == 1 && (this.val.v1 = val);
					i == 2 && (this.val.v2 = val);
					this.renderHTML(val, i);
					ele.setAttribute('data-value', JSON.stringify(this.val));
				};
			};
		};
		renderHTML(chose, index){
			let firSelect = '',
				secSelect = '',
				thiSelect = '', 
				isEmpty = true;
			firSelect += `<select class="xui_select"><option>请选择</option>`;
			secSelect += `<select class="xui_select"><option>请选择</option>`;
			thiSelect += `<select class="xui_select"><option>请选择</option>`;
			for(let i in this.data){
				let f = this.data[i];
				let a = this.rep.firKey,
					b = this.rep.firList,
					c = this.rep.secKey,
					d = this.rep.secList,
					e = this.rep.thiKey;
				(firSelect += `<option value=${f[a]} ${f[a] == chose ? 'selected' : ''}>${f[a]}</option>`);
				for(let j in f[b]){
					let s = f[b][j];
					if (index == 0) {
						f[a] == chose && (secSelect += `<option value=${s[c]} ${s[c] == chose ? 'selected' : ''}>${s[c]}</option>`);
					} else if(index == 1){
						this.val.v0 == f[a] && (secSelect += `<option value=${s[c]} ${s[c] == chose ? 'selected' : ''}>${s[c]}</option>`);
					};
					for(let k in s[d]){
						let t = s[d][k];
						if (this.val.v0 == f[a] && this.val.v1 == s[c]) {
							isEmpty = false;
							(thiSelect += `<option value=${t[e]} ${t[e] == chose ? 'selected' : ''}>${t[e]}</option>`);
						};
					};
				};
			};
			firSelect += `</select>`;
			secSelect += `</select>`;
			thiSelect += `</select>`;

			let des = document.getElementById(this.id),
				sec = des.querySelectorAll('.xui_select');
			if (chose) {
				if (index == 0) {
					des.innerHTML = firSelect + secSelect + thiSelect;
				} else if(index == 1){
					sec[1].innerHTML = secSelect;
					sec[2].innerHTML = thiSelect;
					if (isEmpty) {
						sec[2].classList.add('none');
					} else{
						sec[2].classList.remove('none');
					};
				} else{
					sec[2].innerHTML = thiSelect;
				};
			} else{
				des.innerHTML = firSelect + secSelect + thiSelect;
			};
			this.event();
		};
		init(){
			this.renderHTML(undefined, 0);
		};
	};
	Object.getPrototypeOf(xui).cascader = Cascader;
})(window);

/*
here is a collapse plugin
*/ 
;(function(w){
	class Collapse{
		constructor(){
			if (!arguments[0].id) {
				throw new Error("element'id is required");
			};
			if (!arguments[0].list.length) {
				throw new Error("array is required");
			};
			this.id = arguments[0].id;
			this.isOneTab = typeof arguments[0].isOneTab == 'undefined' ? true : arguments[0].isOneTab;
			this.list = arguments[0].list;
			this.activeTab = (arguments[0].activeTab >= this.list.length ? 0 : arguments[0].activeTab) || 0;
			this.fn = arguments[0].fn;
			this.init();
		};
		event(){
			let tar = document.getElementById(this.id);
			tar.onclick = (e) =>{
				let ele = e.target.classList,
					eleSib = e.target.nextElementSibling;
				if (ele.contains('xui_collapse_head')) {
					if (ele.contains('xui_collapse_active')) {
						ele.remove('xui_collapse_active');
					} else{
						this.isOneTab && this.isShow();
						ele.add('xui_collapse_active');
					};
					this.fn && this.fn(e.target, eleSib);
				};
			};
		};
		isShow(){
			let tar = document.getElementById(this.id);
			tar.querySelectorAll('.xui_collapse_section').forEach(function(item, index){
				item.querySelector('.xui_collapse_head').classList.remove('xui_collapse_active');
			});
		};
		renderHTML(){
			let divs = '';
			for(let i = 0; i < this.list.length; i++){
				let each = this.list[i],
					activeTab = this.activeTab == i ? 'xui_collapse_active' : '';
				divs += `
					<div class="xui_collapse_section">
						<div class="xui_collapse_head ${activeTab}">${each.title}</div>
						<div class="xui_collapse_body">${each.content}</div>
					</div>
				`;
			};
			document.getElementById(this.id).innerHTML = divs;
			this.event();
		};
		init(){
			this.renderHTML();
		};
	};
	Object.getPrototypeOf(xui).collapse = Collapse;
})(window);

/*
here is a digitalOperation plugin
*/ 
;(function(w){
	class Digital{
		constructor(){
			if (!arguments[0].id) {
				throw new Error("element'id is required");
			};
			const defaults = {
				min: 1,
                max: 1000,
                step: 1,
                precision: 2,
                isLimit: 9,
                isInput: true,
                fn: null,
			};
			const opts = Object.assign({}, defaults, arguments[0]);
			this.opts = opts;
			this.id = arguments[0].id;
			this.init();
		};
		event(){
			let tar = document.getElementById(this.id),
				add = tar.querySelector('.xui_add'),
				sub = tar.querySelector('.xui_sub'),
				step = this.opts.step,
				min = this.opts.min,
				max = this.opts.max,
				isPrecision = step.toString().indexOf('.') > -1;
			tar.onclick = (e) =>{
				let ele = e.target.classList,
					int = tar.querySelector('.xui_digital_input');
				if (ele.contains('xui_sub') || ele.contains('xui_add')) {
					let type = e.target.getAttribute('data-type');
					int.value = type == 1 
								? 
								(int.value-0+step > max ? max : int.value-0+step)
								: 
								(int.value-step < min ? min : int.value-step);
					//如果是小数, 那么需要精度
					isPrecision && (int.value = Number(int.value).toFixed(this.opts.precision));
					isDisabled(int.value);
					this.opts.fn && this.opts.fn(int.value);
				};
			};
			tar.querySelector('.xui_digital_input').onchange = (e) => {
				let reg = /^[\+\-\.]?(\d)*\.*\d+$/,
					val = e.target.value;
				if (!reg.test(val)) {
					e.target.value = min;
				} else{
					e.target.value = (val > max)
									? 
									this.opts.max 
									: 
									(val < min) ? min : val;
					e.target.value -= 0;
					//如果是小数, 那么需要精度
					isPrecision && (e.target.value = Number(e.target.value).toFixed(this.opts.precision));
					isDisabled(e.target.value);
					this.opts.fn && this.opts.fn(e.target.value);
				};
			};
			function isDisabled(val){
				if (val >= max) {
					add.setAttribute('disabled', true);
				} else{
					add.removeAttribute('disabled');
				};
				if (val <= min) {
					sub.setAttribute('disabled', true);
				} else{
					sub.removeAttribute('disabled');
				};
			};
		};
		renderHTML(){
			let dig = `
				<button class="xui_btn xui_btn_default xui_sub" disabled data-type="-1">-</button>
        		<input type="text" class="xui_input xui_digital_input" 
	        		maxlength=${this.opts.isLimit}
	        		value=${
			        			(this.opts.step.toString().indexOf('.') > -1) 
				        		? 
				        		this.opts.min.toFixed(this.opts.precision) 
				        		: 
				        		this.opts.min
				        	}
	        		${this.opts.isInput ? '' : 'readonly'}
        		/>
        		<button class="xui_btn xui_btn_default xui_add" data-type="1">+</button>
			`;
			document.getElementById(this.id).innerHTML = dig;
			this.event();
		};
		init(){
			this.renderHTML();
		};
	};
	Object.getPrototypeOf(xui).digital = Digital;
})(window);

/*
here is a sliderBar plugin
*/ 
;(function(w){
	class sliderBar{
		constructor(){
			if (!arguments[0].id) {
				throw new Error("element'id is required");
			};
			const defaults = {
                max: 100,
                currentVal: .5,
                unit: '',
                precision: 0,
                dragStart: null,
                dragMove: null,
                dragEnd: null
			};
			const opts = Object.assign({}, defaults, arguments[0]);
			this.opts = opts;
			this.id = arguments[0].id;
			this.init();
		};
		event(){
			let that = this;
			let tar = document.getElementById(this.opts.id),
                progress = tar.querySelector('.xui_bar_progress'),
                dot = tar.querySelector('.xui_bar_dot'),
                percent  = tar.querySelector('.xui_bar_percent');
            let currDis = 0,
                tarDis = 0,
                tarWidth = tar.offsetWidth,
                dis = 0,
                laterPercent = 0,
                showPercent = 0;
            tar.addEventListener('mousedown', dragStart, false);
            function dragStart(e){
            	if (e.currentTarget.classList.contains('xui_slider_disabled')) {
            		return;
            	};
                currDis = e.clientX || e.pageX;
                tarDis = that.calLeftDis(tar);
                dis = currDis - tarDis;
                that.opts.dragStart && that.opts.dragStart(dis);
                document.addEventListener('mousemove', dragMove, false);
                document.addEventListener('mouseup', dragEnd, false);
            };
            function dragMove(e){
                let nowDis = e.clientX || e.pageX;
                dis = nowDis - tarDis;
                that.opts.dragMove && that.opts.dragMove(dis);
                setDistance(dis, true);
            };
            function dragEnd(e, bool){
                setDistance(dis);
                that.opts.dragEnd && that.opts.dragEnd(setDistance(dis));
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
            };
            function setDistance(dis){
                showPercent = laterPercent = (dis / tarWidth);
                let prop = that.opts.max / 100;
                laterPercent *= that.opts.max / prop;
                showPercent *= that.opts.max;
                showPercent = showPercent.toFixed(that.opts.precision);
                laterPercent = laterPercent > 100 ? 100 : laterPercent < 0 ? 0 : laterPercent;
                showPercent = showPercent > that.opts.max ? that.opts.max : showPercent < 0 ? 0 : showPercent;
                showPercent += that.opts.unit;
                laterPercent += '%';
                dot.style.left = laterPercent;
                dot.setAttribute('title', showPercent);
                dot.setAttribute('data-num', showPercent);
                progress.style.width = laterPercent;
                return showPercent;
            }
		};
		calLeftDis(ele){
			let tmp = ele.offsetLeft,
			par = ele.offsetParent;
			while(par != null){
				tmp += par.offsetLeft;
				par = par.offsetParent;
			};
			return tmp;
		};
		renderHTML(){
			let currentPer,showPer;
			currentPer = this.opts.currentVal * this.opts.max / (this.opts.max / 100);
			currentPer = currentPer.toFixed(this.opts.precision);
			showPer = this.opts.currentVal * this.opts.max;
			showPer = showPer.toFixed(this.opts.precision);
			showPer += this.opts.unit;
			currentPer += '%';
			let dig = `
				<div class="xui_bar">
	                <div class="xui_bar_progress" style="width: ${currentPer}"></div>
	                <span class="xui_bar_dot" 
		                title="${showPer}" 
		                data-num="${showPer}" 
		                style="left: ${currentPer}"
	                ></span>
	            </div>
			`;
			document.getElementById(this.id).innerHTML = dig;
			this.event();
		};
		init(){
			this.renderHTML();
		};
	};
	Object.getPrototypeOf(xui).sliderBar = sliderBar;
})(window);