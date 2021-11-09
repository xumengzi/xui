import './index.scss';

const event = Symbol('event');
const showImg = Symbol('showImg');
const setImgUrl = Symbol('setImgUrl');
const renderHTML = Symbol('renderHTML');
const init = Symbol('init');

export default class LazyLoad{
    constructor(){
        const args = arguments[0];
        if (!args.id) {
            throw new Error("element'id is required");
        };
        if (!args.list) {
            throw new Error("img not found");
        };
        const defaults = {
            loadingImg: '../../img/loading.gif',
            errorImg: '../../img/error.jpg',
            hrefTarget: '',
        };
        this.opts = Object.assign({}, defaults, args);
        this.ele = document.getElementById(args.id);
        this[init]();
    };
    [event](){
        this[showImg]();
        window.onscroll = () => {
            this[showImg]();
        };
    };
    [showImg](){
        this.ele.querySelectorAll('.xui_img_box').forEach((item, index) => {
            this[setImgUrl](item);
        });
    };
    [setImgUrl](item){
        let isShow = xui.isElementInViewport(item);
        let img = item.querySelector('.xui_img_load'),
            url = img.getAttribute('data-src');
        if (isShow && url) {
            img.previousElementSibling && img.previousElementSibling.remove();
            img.setAttribute('src', url);
            img.removeAttribute('data-src');
        };
    };
    [renderHTML](){
        let imgs = ``;
        const {list, loadingImg, errorImg, hrefTarget} = this.opts;
        for(let i in list){
            if(list.hasOwnProperty(i)){
                imgs += `
                    <a href="${list[i].href || 'javascript:void(0)'}" target="${hrefTarget}">
                        <div class="xui_img_box">
                            <span class="xui_img_loading"><img src="${loadingImg}"/></span>
                            <img class="xui_img_load" onerror="this.src='${errorImg}'" data-src="${list[i].src || list[i]}"/>
                        </div>
                    </a>
                `;
            }
        };
        document.getElementById(this.opts.id).innerHTML = imgs;
        this[event]();
    };
    [init](){
        this[renderHTML]();
    };
};