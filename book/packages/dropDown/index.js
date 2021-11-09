import './index.scss';

const init = Symbol('init');
const renderHTML = Symbol('renderHTML');
const event = Symbol('event');
const choose = Symbol('choose');
const search = Symbol('search');

export default class dropDown{
    constructor(){
        if (!arguments[0].id) {
            throw new Error("element'id is required");
        };
        const defaults = {
            id: '',
            isSearch: false,
            placeHolder: 'search',
        };
        const opts = Object.assign({}, defaults, arguments[0]);
        this.opts = opts;
        this.tarEle = document.getElementById(this.opts.id);
        this[init]();
    };
    [renderHTML](){
        let tar = this.tarEle,
        opt = tar.getElementsByTagName('option');
        tar.classList.add('none');
        let uls = document.createElement('ul');
        if (this.opts.isSearch) {
            let inp = document.createElement('input');
            inp.setAttribute('type','text');
            this.opts.placeHolder = this.opts.placeHolder || 'type to search'; 
            inp.setAttribute('placeHolder',this.opts.placeHolder);
            inp.setAttribute('value', '');
            inp.classList.add('xui_input');
            inp.classList.add('xui_input_search');
            uls.appendChild(inp);
        };
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
        let but = document.createElement('button');
        but.innerHTML = opt[0].innerHTML;
        but.value = opt[0].value;
        but.classList.add('xui_btn');
        but.classList.add('xui_drop_btn');
        con.appendChild(but);
        con.appendChild(uls);
        tar.after(con);
    };
    [event](){
        let tar = this.tarEle,
            ele = tar.nextElementSibling,
            searchInp = ele.querySelector('.xui_input_search');
        ele.addEventListener('click', e =>{this[choose](e)});
        document.addEventListener('click', e =>{
            let tar = e.target.classList;
            if (!(tar.contains('xui_drop_li') || tar.contains('xui_drop_btn') || tar.contains('xui_input_search'))) {
                let newArr = [...(document.querySelectorAll('.xui_drop_list'))];
                if(!newArr.length){
                    return;
                };
                for(let i in newArr){
                    if(newArr.hasOwnProperty(i)){
                        newArr[i].classList.add('none');
                        newArr[i].previousSibling.classList.remove('xui_drop_active');
                    };
                };
            };
        });
        searchInp && searchInp.addEventListener('keyup', e =>{
            this[search](e)
        });
    };
    [search](e){
        if (e.target.classList.contains('xui_input_search')) {
            let val = e.target.value.trim();
            let list = e.target.parentNode.querySelectorAll('li');
            list = this.toArray(list);
            for(let i in list){
                if(list.hasOwnProperty(i)){
                    if (val != '' && list[i].innerHTML.indexOf(val) == -1) {
                        list[i].classList.add('none');
                    }else{
                        list[i].classList.remove('none');
                    };
                }
            };
        }
    };
    getCurrentValue(){
        return this.tarEle.value;
    };
    toArray(arrLike){
        return Array.prototype.slice.call(arrLike);
    };
    [choose](e){
        let tar = e.target.classList;
        if (tar.contains('xui_drop_btn')) {
            tar.toggle('xui_drop_active');
            e.target.nextSibling.classList.toggle('none');
        } else if(e.target.parentNode.classList.contains('xui_drop_list')){
            if (e.target.nodeName == 'INPUT') {return};
            document.getElementById(this.opts.id).value = e.target.getAttribute('value');
            e.target.parentNode.previousSibling.value = e.target.getAttribute('value');
            e.target.parentNode.previousSibling.innerHTML = e.target.innerHTML;
            e.target.parentNode.previousSibling.classList.remove('xui_drop_active');
            e.target.parentNode.classList.add('none');
        } else{
            if (!document.querySelectorAll('.xui_drop_list').length) {return;};
            let newArr = this.toArray(document.querySelectorAll('.xui_drop_list'));
            for(let i in newArr){
                if(newArr.hasOwnProperty(i)){
                    newArr[i].classList.add('none');
                    for(let j = 0; j < newArr[i].childNodes.length ; j++){
                        newArr[i].childNodes[j].classList.contains('none') && newArr[i].childNodes[j].classList.remove('none');
                    };
                };
            };
            let inpArr = this.toArray(document.querySelectorAll('.xui_input_search'));
            for(let i in newArr){
                if(newArr.hasOwnProperty(i)){
                    inpArr[i] && (inpArr[i].value = '');
                };
            };
        };
    };
    [init](){
        this[renderHTML]();
        this[event]();
    };
};