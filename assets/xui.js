/*
* @Author: Administrator
* @Date:   2017-11-01 11:21:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 10:50:39
*/

;(function(w) {
	function Xu() {
	};

	Xu.prototype = {
	    constructor: Xu,
	    config: {
	        version: '1.3.1',
	    },
	    addZero(e) {
	        if (e < 0) {
				return e = e > -10 ? '-0' + (-e) : e;
			}else{
				return e = e < 10 ? '0' + e : e;
			};
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
	    countDown(endD, target, isStop){
	    	let downTime = null;
	    	clearInterval(downTime);
	    	downTime = setInterval(()=>{
	    		let start = this.now(),
	    		end = this.now(endD);
				let diff = end - start;
		    	let day = parseInt((diff / 1000 / 24 / 3600),10),
				    hour = parseInt((diff / 1000 / 3600 % 60),10) - 8,
				    minute = parseInt((diff / 1000 / 60 % 60),10),
				    second = parseInt((diff / 1000 % 60),10);
				day = this.addZero(day);
				hour = this.addZero(hour);
				minute = this.addZero(minute);
				second = this.addZero(second);
				if (isStop && diff <= 0) {
					clearInterval(downTime);
				};
				document.querySelectorAll('.' + target).forEach((item, index)=>{
					item.innerHTML = day + '天' + hour + '时' + minute + '分' + second + '秒';
				});
				// return day + '-' + hour + '-' + minute + '-' + second;
	    	},1000);
	    },
	    decodeStr(str) {
	        return decodeURIComponent(str);
	    },
	    deleteEle(ele){
	    	document.querySelector(ele) && document.querySelector(ele).remove();
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
	    randomNum(min, max){
	    	if (typeof min == 'number' && typeof max == 'number' && max > min) {
	    		return Math.round(Math.random() * (max - min) + min);
	    	} else{
	    		throw new Error('must be two numbers or in right order');
	    	};
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
	    shallowCopy(obj){
		  	var newObj = {};
		  	for(var i in obj){
			    if(obj.hasOwnProperty(i)){
			      	newObj[i] = obj[i];
			    };
		  	};
		  	return newObj;
		},
		showBigImg(){
            //delete already exists
            let that = this;
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
	    				${arguments[1] ? `<a class="xui_download" href=${arguments[0]} download></a>` : ''}
	    			</div>
	    		</div>
	    	`;
	    	tar.classList.add('xui_img_content');
	    	document.body.appendChild(tar);
	    	function showImg(e){
	    		if (e.target.className == 'xui_close') {
	    			that.deleteEle('.xui_img_content');
	    			document.body.removeEventListener('click', showImg, false);
	    		};
	    		if (e.target.getAttribute('xui-type')) {
	    			let tar = document.querySelector('.xui_img');
	    			//get current img rotate degrees
	    			let rotate = tar.style.transform && tar.style.transform.match(/-?\d/igm).join('') - 0;
	    			let width = tar.style.width && tar.style.width.match(/\d/igm).join('') - 0;
	    			switch(e.target.getAttribute('xui-type') - 0){
	    				case 1:
	    					let a = rotate + 90;
	    					tar.style.transform = `rotate(${a}deg)`;
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
	    					let b = rotate - 90;
	    					tar.style.transform = `rotate(${b}deg)`;
	    					break;
	    				default:
	    					break;
	    			};
	    		};
	    	};
	    	document.body.addEventListener('click', showImg, false);
		},
	    subLastStr(str) {
	        return str.substr(0, str.length - 1);
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
	w.xu = new Xu;
})(window);