/*
 created by xumeng
 http://xumengzi.top/
*/ 
;(function(w) {
	function Xui() {
		this.version = '0.6.2';
	};

	Xui.prototype = {
	    constructor: Xui,
	    addZero(e) {
	        if (e < 0) {
				return e = e > -10 ? '-0' + (-e) : e;
			}else{
				return e = e < 10 ? '0' + e : e;
			};
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
				day = this.addZero(day);
				hour = this.addZero(hour);
				minute = this.addZero(minute);
				second = this.addZero(second);
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
	    		event(){
	    			document.body.addEventListener('click', this.choose, false);
	    			document.body.addEventListener('keyup', this.search, false);
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
	    			if (e.target.classList.contains('xui_drop_btn')) {
	    				e.target.nextSibling.classList.remove('none');
	    				// e.target.nextSibling.classList.toggle('none');
	    				// if ((e.target.nextSibling.classList.contains('none'))) {
	    				// 	console.log('3');
	    				// 	e.target.nextSibling.classList.remove('none');
	    				// } else{
	    				// 	e.target.nextSibling.classList.add('none');
	    				// };
	    			} else if(e.target.parentNode.className == 'xui_drop_list'){
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
	    					inpArr[i].value = '';
	    				};
	    			};
	    		},
	    		init(args){
	    			this.renderHTML(args);
	    			this.event();
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
	        month = this.addZero(month);
	        let day = date.getDate();
	        day = this.addZero(day);
	        if (bool) {
	            let hour = date.getHours();
	            hour = this.addZero(hour);
	            let min = date.getMinutes();
	            min = this.addZero(min);
	            let sec = date.getSeconds();
	            sec = this.addZero(sec);
	            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
	        };
	        return year + '-' + month + '-' + day;
	    },
	    decodeStr(str) {
	        return decodeURIComponent(str);
	    },
	    deleteEle(ele){
	    	document.querySelector(ele) && document.querySelector(ele).remove();
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
	    loading(isShow, type){
	    	//delete already exists
	    	this.deleteEle('.xu_loading');
	    	if (!isShow) {
	    		return;
	    	};
	    	let tar = document.createElement('div');
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
		    	`;
	    	}
	    	tar.classList.add('xu_loading');
	    	document.body.appendChild(tar);
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
	    message(){
	    	//delete already exists
	    	this.deleteEle('xu_message');
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<span>${arguments[0]}</span>
	    	`;
	    	tar.classList.add('xu_message');
	    	document.body.appendChild(tar);
	    	setTimeout(() => {
	    		arguments[2] && arguments[2]();
    			this.deleteEle('.xu_message');
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
	    	that.deleteEle('xu_img');
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
	    subLastStr(str) {
	        return str.substr(0, str.length - 1);
	    },
	    tab(){
	    	let args = arguments[0];
	    	let tar = document.getElementById(args.id);
	    	let tab = tar.getElementsByTagName('li');
			let list = tar.querySelectorAll('.xui_tab_body div');
			list = Array.prototype.slice.call(list);
			args.activeIndex = args.activeIndex >= tab.length ? 0 : args.activeIndex ? args.activeIndex : 0;
			console.log(args.activeIndex);
			if (tab.length !== list.length) {
				throw new Error("tab's number error");
			};
			if (typeof args.activeIndex == 'number') {
				for(let l  in list){
					list[l].style.display = l == args.activeIndex ? 'block' : 'none';
				};
			};
			for(let i=0; i < tab.length; i++){
				i == args.activeIndex && tab[i].classList.add('selected');
				tab[i].onclick = function(e){
					if (e.currentTarget.className == 'selected') {return;};
					for(let j in list){
						if (i == j) {
							list[j].style.display = 'block';
							tab[j].classList.add('selected');
							args.fn && args.fn();
						} else{
							list[j].style.display = 'none';
							tab[j].classList.remove('selected');
						};
					};
				};
			};
	    },
	    toArray(arrLike){
	    	return Array.prototype.slice.call(arrLike);
	    },
	    prompt(){
	    	//delete already exists
	    	this.deleteEle('.xu_prompt');
	    	const defaults = {
	    		text: '温馨提示',
	    		tips: '',
				type: 'default',
				isShowClose: false,
				delay: 1000,
				fn: null,
				confirmBtn: null,
				cancelBtn: null,
	    	};
	    	const opts = Object.assign({},defaults, arguments[0]);
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<div class="xu_content">
	    			${opts.isShowClose ? `<span class="xu_close"></span>` : ``}
			    	<div class="xu_text">
			    		<span class=${opts.type}>${opts.text}</span>
			    		<div class="tips">${opts.tips}</div>
			    	</div>
			    	<div class="xu_btn">
				    	${opts.confirmBtn ? '<button class="xui_btn xui_btn_default">'+ opts.confirmBtn.text +'</button>' : ''}
				    	${opts.cancelBtn ? '<button class="xui_btn xui_btn_cancel">'+ opts.cancelBtn.text +'</button>' : ''}
			    	</div>
			    </div>
	    	`;
	    	tar.classList.add('xu_prompt');
	    	document.body.appendChild(tar);
	    	//按钮回调
	    	let clickEvent = (fn, tar) => {
	    		document.querySelector('.xu_prompt').addEventListener('click',(e) => {
		    		if (e.target.nodeName == 'BUTTON' && e.target.className.indexOf(tar) > -1) {
		    			console.log(fn);
		    			// fn();
		    			this.deleteEle('.xu_prompt');
		    		};
		    	});
	    	};
	    	if (opts.confirmBtn && this.isFunction(opts.confirmBtn.fn)) {
	    		clickEvent(opts.confirmBtn.fn, 'xui_btn');
	    	};
	    	if (opts.cancelBtn && this.isFunction(opts.cancelBtn.fn)) {
	    		clickEvent(opts.cancelBtn.fn, 'xui_btn');
	    	};
	    	if (opts.isShowClose) {
	    		document.querySelector('.xu_close').addEventListener('click',(e) => {
	    			this.deleteEle('.xu_prompt');
		    	});
	    	};
	    	//remove element
	    	if (opts.delay !== 0) {
	    		setTimeout(() => {
	    			this.deleteEle('.xu_prompt');
	    			if (opts.fn) {
	    				opts.fn();
	    			};
		    	}, opts.delay);
	    	};
	    },
	};
	w.xui = new Xui;
})(window);