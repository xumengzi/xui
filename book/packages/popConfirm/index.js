import './index.less';

const init = Symbol('init');
const event = Symbol('event');
const renderHTML = Symbol('renderHTML');

/* 
    目前需求完善的点有
    1. 点击弹窗外隐藏该弹窗
*/
export default class popConfirm {
    constructor(){
        this.version = '0.0.1';
        if (!arguments[0].ele) {
            throw new Error("element is required");
        };
        const defaults = {
            content: 'Are you sure to delete it?',
            confirm: {
                btn: 'ok',
                fn: null,
            },
            cancel: {
                btn: 'cancel',
                fn: null,
            },
        };
        const opts = Object.assign({}, defaults, arguments[0]);
        this.opts = opts;
        this[init]();
    }
    [event](){
        document.querySelector('.xui_popconfirm').addEventListener('click',(e) => {
            let tar = e.target.classList;
            if (tar.contains('xui_pop_cancel')) {
                this.deleteEle('.xui_popconfirm');
                this.opts.cancel.fn && this.opts.cancel.fn();
            };
            if (tar.contains('xui_pop_confirm')) {
                this.deleteEle('.xui_popconfirm');
                this.opts.confirm.fn && this.opts.confirm.fn();
            };
        });
    }
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
    }
    [renderHTML](){
        const { opts } = this;
        let template = `
            <div class="xui_pop_head">
                <span class="xui_danger">?</span>
                <span class="xui_cont">${opts.content}</span>
            </div>
            <div class="xui_pop_foot">
                <button class="xui_btn xui_btn_default">${opts.confirm.btn}</button>
                <button class="xui_btn xui_btn_cancel">${opts.cancel.btn}</button>
            </div>
        `;
        let div = document.createElement('div');
        div.classList.add('xui_popconfirm');
        div.innerHTML = template;
        opts.ele.parentElement.appendChild(div);
        this[event]();
    }
    [init](){
        this[renderHTML]();
    }
};