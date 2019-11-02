;(function(w){
	function Full(){
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
				'rgb(203, 12, 249)',
				'rgb(131,175,155)',
				'rgb(6,157,128)',
				'rgb(252,157,154)',
				'rgb(229,187,129)',
				'rgb(227,160,93)',
				'rgba(241, 77, 159, 0.75)',
				'rgba(228, 101, 243, 0.75)',
				'rgba(137, 101, 243, 0.6)',
				'rgba(253, 133, 182, 0.7)',
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
                prevEle = tar.previousElementSibling,
                prev = prevEle && prevEle.style,
                nextEle = tar.nextElementSibling,
				next = nextEle && nextEle.style,
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
                    nextEle && nextEle.classList.add('show_animation');
                    tar && tar.classList.remove('show_animation');
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
                    prevEle && prevEle.classList.add('show_animation');
                    tar && tar.classList.remove('show_animation');
					this.config.fn && this.config.fn(tar, tar.previousElementSibling);
				};
			};
			sty.transition = this.config.transition;
			sty.webkitTransition = this.config.transition;
        },
        randomNum(min, max){
	    	if (typeof min == 'number' && typeof max == 'number' && max > min) {
	    		return Math.round(Math.random() * (max - min) + min);
	    	} else{
	    		throw new Error('must be two numbers or in right order');
	    	};
        },
        isMobile(){
	    	return 'ontouchstart' in window;
        },
        zeroFill(e) {
	        if (e < 0) {
				return e = e > -10 ? '-0' + (-e) : e;
			}else{
				return e = e < 10 ? '0' + e : e;
			};
	    },
        pastTime(time){
	    	let downTime = null;
	    	let args = arguments[0];
	    	if (!(args.pastDate && args.target)) {
	    		throw new Error('date and target are required');
	    	};
	    	args.pastDate = args.pastDate.replace(/\//g,'-');
	    	clearInterval(downTime);
	    	downTime = setInterval(()=>{
	    		let start = new Date(args.pastDate),
	    		end = new Date();
				let diff = (end - start) / 1000;
		    	let day = parseInt((diff / 24 / 3600),10),
				    hour = parseInt((diff % (24 * 3600) / 3600),10),
				    minute = parseInt((diff % 3600 / 60),10),
				    second = parseInt((diff % 60),10);
				day = this.zeroFill(day);
				hour = this.zeroFill(hour);
				minute = this.zeroFill(minute);
				second = this.zeroFill(second);
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
        deleteEle(ele){
	    	let tar = document.querySelectorAll(ele);
	    	if (tar.length) {
	    		let list = [...tar];
	    		for(let i in list){
	    			if(list.hasOwnProperty(i)){
						list[i].remove();
					};
	    		};
	    	};
	    },
        loading(isShow, ele, string){
            this.deleteEle('.xui_loading');
	    	if (!isShow) {
	    		return;
	    	};
	    	let tar = document.createElement('div');
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
	    	tar.classList.add('xui_loading');
	    	if (typeof ele == 'string') {
	    		tar.classList.add('xui_part_loading');
	    		document.querySelector(ele).appendChild(tar);
	    	} else{
	    		document.body.appendChild(tar);
	    	};
	    },
		init(){
			let tar = document.getElementById(this.config.id);
			let ele = tar.children, dir = this.config.direction;
			let fst = this.config.currentPage;
			for(let i = 0;i < ele.length; i++){
                ele[i].classList.add('xui_page');
                i === 0 && ele[0].classList.add('show_animation');
				//some options
				let arr = this.config.colorArr;
				this.config.isBackground && arr.length && (ele[i].style.background = arr[this.randomNum(0,arr.length - 1)]);
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
			if (this.isMobile()) {
				let startX = 0, endX = 0,
					startY = 0, endY = 0;
				tar.addEventListener('touchstart',(e)=>{
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
				});
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
    w.fullPage = Full;
    w.pastTime = page.pastTime.bind(page);
    w.loading = page.loading.bind(page);
})(window);