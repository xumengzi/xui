/*
* @Author: Administrator
* @Date:   2017-11-01 11:21:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-06 15:26:00
*/

;(function(w) {
	function Xu() {
	};

	Xu.prototype = {
	    constructor: Xu,
	    config: {
	        version: '1.2.1',
	    },
	    addZero(e) {
	        return e < 10 ? '0' + e : e;
	    },
	    formatDate(date, bool) {
	        date = date.replace(/[^\d]/g, '') - 0;
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
	            sec = this.addZero(min);
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
	            reg = /^\d{11}$/;
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
	    decodeStr(str) {
	        return decodeURIComponent(str);
	    },
	    deleteEle(ele){
	    	document.querySelector(ele) && document.querySelector(ele).remove();
	    },
	    loading(isShow, type){
	    	//delete already exists
	    	document.querySelector('.xu_loading') && document.querySelector('.xu_loading').remove();
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
	    tips(){
	    	//delete already exists
	    	document.querySelector('.xu_tips') && document.querySelector('.xu_tips').remove();
	    	let tar = document.createElement('div');
	    	tar.innerHTML = `
	    		<span>${arguments[0]}</span>
	    	`;
	    	tar.classList.add('xu_tips');
	    	document.body.appendChild(tar);
	    	setTimeout(() => {
    			this.deleteEle('.xu_tips');
	    	}, arguments[1] || 1000);
	    },
	    now() {
	        return +new Date();
	    },
	    queryString(str) {
	        let url = location.href;
	        let reg = new RegExp("([?&])" + str + "=([^&]*)([?&]?)");
	        return (url.match(reg) === null ? '' : decodeURIComponent(url.match(reg)[2]));
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
	    subLastStr(str) {
	        return str.substr(0, str.length - 1);
	    },
	    prompt(){
	    	//delete already exists
	    	document.querySelector('.xu_prompt') && document.querySelector('.xu_prompt').remove();
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