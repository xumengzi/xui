import './index.scss';
// to be continued

const event = Symbol('event');
const autoAnimated = Symbol('autoAnimated');
const handleCountAng = Symbol('handleCountAng');
const handleChangeImg = Symbol('handleChangeImg');
const handleChangeDot = Symbol('handleChangeDot');
const renderHTML = Symbol('renderHTML');
const init = Symbol('init');

export default class Slider {
    constructor() {
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
        this[init]();
    }
    [event]() {
        let ele = document.getElementById(this.defaults.id);
        let dot = ele.querySelector('.xui_slider_dot_con');
        dot.addEventListener('mouseover', e =>{this.handleCountAng(e)}, false);
        dot.addEventListener('mouseout', e =>{this.autoAnimated(e)}, false);
        let ang = ele.querySelector('.xui_slider_tab_con');
        ang.addEventListener('click', e =>{this.handleCountAng(e)}, false);
        ang.addEventListener('mouseout', e =>{this.autoAnimated(e)}, false);
    }
    [autoAnimated]() {
        clearInterval(this.defaults.timer);
        let time = this.defaults.duration;
        this.defaults.timer = setInterval(() => {
            this.defaults.index++;
            this.defaults.index = (this.defaults.index > this.defaults.imgList.length - 1 ? 0 : this.defaults.index);
            this[handleChangeImg]();
        }, time);
    }
    [handleCountAng](e) {
        clearInterval(this.defaults.timer);
        document.querySelector('.xui_slider_tab_con').removeEventListener('click', e =>{this.handleCountAng(e)}, false);
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
    }
    [handleChangeImg]() {
        this.handleChangeDot();
        let each = 100 / (this.defaults.imgList.length - 0);
        let ang = -(each * this.defaults.index) + '%';
        this.defaults.fn && this.defaults.fn(this.defaults.index);
        let ele = document.getElementById(this.defaults.id), tar = ele.querySelector('.xui_slider_img').style;
        tar.transform = `translate(${ang})`;
        tar.webkitTransform = `translate(${ang})`;
        tar.mozTransform = `translate(${ang})`;
        tar.MsTransform = `translate(${ang})`;
        tar.transition = this.defaults.animation;
        tar.webkitTransition = this.defaults.animation;
    }
    [handleChangeDot]() {
        let ele = document.getElementById(this.defaults.id);
        let tar = ele.querySelector('.xui_slider_dot_con');
        let spans = tar.children;
        for (let i = 0; i < spans.length; i++) {
            spans[i].getAttribute('data-index') == this.defaults.index
                ?
                spans[i].classList.add('selected')
                :
                spans[i].classList.remove('selected');
        }
        ;
    }
    [renderHTML]() {
        let imgs = this.defaults.imgList, list = '', spans = '';
        for (let i in imgs) {
            if (imgs.hasOwnProperty(i)) {
                let isSelected = i == 0 ? 'selected' : '';
                list += `
					<div><a href=${imgs[i].link} target="_blank"><img src="${imgs[i].img}"></a></div>
				`;
                spans += `
					<span data-index=${i} class="xui_slider_dot ${isSelected}"></span>
				`;
            }
        }
        ;
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
        (this.defaults.isShowDot || this.defaults.isShowSwitch) && this[event]();
        this[autoAnimated]();
    }
    [init]() {
        this[renderHTML]();
    }
};