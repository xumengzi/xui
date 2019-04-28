import './index.scss';

const renderHTML = Symbol('renderHTML');
const event = Symbol('event');
const handleEnter = Symbol('handleEnter');
const handleClick = Symbol('handleClick');

export default class Page {
    constructor() {
        let args = arguments[0];
        if (!args.id) {
            throw new Error("element'id is required");
        };
        if (!args.total) {
            throw new Error("element'total is required");
        };
        this.id = args.id;
        this.index = args.index || 1;
        this.total = args.total;
        this.isShowDot = args.isShowDot;
        this.isShowNum = args.isShowNum;
        this.isJumpPage = args.isJumpPage;
        this[renderHTML](this.index);
        this[event]();
    };
    [event]() {
        let tar = document.getElementById(this.id);
        tar.addEventListener('click', e =>{this[handleClick](e)});
        tar.addEventListener('keyup', e =>{this[handleEnter](e)});
    };
    [handleEnter](e) {
        let reg = /^\d{1,}$/, val = e.target.value;
        if (!reg.test(val) || val == 0) {
            e.target.value = '';
        };
        if (e.keyCode == 13) {
            val = val > this.total ? this.total : val;
            this[renderHTML](val);
            this.onKeyUp && this.onKeyUp(val);
        };
    };
    [handleClick](e) {
        let tar = e.target;
        let ele = tar.classList;
        if (ele.contains('xui_page_valid')) {
            let index = tar.getAttribute('data-num');
            this.onClick && this.onClick(index);
            this[renderHTML](index);
        };
    };
    [renderHTML](index) {
        index -= 0;
        let tot = this.total;
        // count 5 numbers between them
        let spans = '';
        let tag = 0;
        if (index < 3) {
            tag = 1;
        }else if (index <= tot - 2) {
            tag = index - 2;
        }else if (index > tot - 2) {
            tag = index - 3;
            tag = tag > (tot - 4) ? (tot - 4) : tag;
        };
        for (let i = tag; i < (tag + 5); i++) {
            let isSelected = '';
            isSelected = index == i ? 'xui_page_selected' : '';
            spans += `
                <span class="xui_page_valid ${isSelected}" title=${i} data-num=${i}>${i}</span>
            `;
        };
        /*
        some options
        */
        let isShowPrevDot = '', isShowLastDot = '', isShowNumber = '', isJumpPage = '';
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
            isJumpPage = `<input type="text" class="xui_input xui_page_go" placeholder="go" />`;
        };
        let isPrevInvalid = '', isLastInvalid = '';
        isPrevInvalid = index == 1 ? 'xui_page_invalid' : 'xui_page_valid';
        isLastInvalid = ((index == this.total) ? 'xui_page_invalid' : 'xui_page_valid');
        let page = `
            <div class="xui_page_content">
                <span class="xui_page_nav ${isPrevInvalid}" title="First Page" data-num=1>First</span>
                <span class="xui_page_nav ${isPrevInvalid}" title="Previous Page" data-num=${index - 1}>Prev</span>
                ${isShowPrevDot}
                ${spans}
                ${isShowLastDot}
                <span class="xui_page_nav ${isLastInvalid}" title="Next Page" data-num=${index + 1}>Next</span>
                <span class="xui_page_nav ${isLastInvalid}" title="Last Page" data-num=${this.total}>Last</span>
                ${isJumpPage}
                ${isShowNumber}
            </div>
        `;
        document.getElementById(this.id).innerHTML = page;
    };
};