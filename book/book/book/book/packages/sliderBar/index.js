import './index.scss';

export default class sliderBar{
    constructor(){
        if (!arguments[0].id) {
            throw new Error("element'id is required");
        };
        const defaults = {
            max: 100,
            currentVal: .5,
            unit: '',
            precision: 0,
            initVal: 0,
            disabled: false,
            dragStart: null,
            dragMove: null,
            dragEnd: null
        };
        const opts = Object.assign({}, defaults, arguments[0]);
        this.opts = opts;
        this.currentValue = this.opts.initVal;
        this.id = arguments[0].id;
        this.init();
    };
    event(){
        let that = this;
        let tar = document.getElementById(this.opts.id);
        let currDis = 0,
            tarDis = 0,
            dis = 0;
        tar.addEventListener('mousedown', dragStart, false);
        function dragStart(e){
            e.preventDefault();
            if (e.currentTarget.classList.contains('xui_slider_disabled')) {
                return;
            };
            currDis = e.clientX || e.pageX;
            tarDis = that.getPosition(tar, 'left');
            dis = currDis - tarDis;
            that.opts.dragStart && that.opts.dragStart(dis);
            document.addEventListener('mousemove', dragMove, false);
            document.addEventListener('mouseup', dragEnd, false);
            return false;
        };
        function dragMove(e){
            let nowDis = e.clientX || e.pageX;
            dis = nowDis - tarDis;
            that.opts.dragMove && that.opts.dragMove(dis);
            that.setDistance(dis);
        };
        function dragEnd(e, bool){
            that.setDistance(dis);
            that.opts.dragEnd && that.opts.dragEnd(that.setDistance(dis));
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        };
    };
    getPosition(e, pos = 'left'){
        return Math.round(e.getBoundingClientRect && e.getBoundingClientRect()[pos]);
    };
    getCurrentvalue(){
        return this.currentValue;
    };
    setDistance(dis, total){
        let tar = document.getElementById(this.opts.id),
            progress = tar.querySelector('.xui_bar_progress'),
            dot = tar.querySelector('.xui_bar_dot');
        let laterPercent = 0,
            showPercent = 0;
        if(total){
            showPercent = laterPercent = (dis / total);
        }else{
            showPercent = laterPercent = (dis / tar.offsetWidth);
        };
        let prop = this.opts.max / 100;
        laterPercent *= this.opts.max / prop;
        showPercent *= this.opts.max;
        showPercent = showPercent.toFixed(this.opts.precision);
        laterPercent = laterPercent > 100 ? 100 : laterPercent < 0 ? 0 : laterPercent;
        showPercent = showPercent > this.opts.max ? this.opts.max : showPercent <= 0 ? 0 : showPercent;
        showPercent += this.opts.unit;
        laterPercent += '%';
        dot.style.left = laterPercent;
        dot.setAttribute('data-num', showPercent);
        tar.setAttribute('data-num', showPercent);
        progress.style.width = laterPercent;
        this.currentValue = showPercent;
        return showPercent;
    };
    setCurrentValue(cur, total){
        this.setDistance(cur, total);
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
                    data-num="${showPer}" 
                    style="left: ${currentPer}"
                ></span>
            </div>
        `;
        let tar = document.getElementById(this.id);
        if(this.opts.disabled){
            tar.classList.add('xui_slider_disabled');
        };
        tar.setAttribute('data-num', this.opts.initVal);
        tar.innerHTML = dig;
        this.event();
    };
    init(){
        this.renderHTML();
    };
};