import './index.scss';

const event = Symbol('event');
const isShow = Symbol('isShow');
const renderHTML = Symbol('renderHTML');
const init = Symbol('init');

export default class Collapse{
	constructor(){
		if (!arguments[0].id) {
			throw new Error("element'id is required");
		};
		if (!arguments[0].list.length) {
			throw new Error("element'array is required");
		};
		this.id = arguments[0].id;
		this.isOneTab = typeof arguments[0].isOneTab == 'undefined' ? true : arguments[0].isOneTab;
		this.list = arguments[0].list;
		this.activeTab = (arguments[0].activeTab >= this.list.length ? 0 : arguments[0].activeTab) || 0;
		this.fn = arguments[0].fn;
		this[init]();
	};
	[event](){
		let tar = document.getElementById(this.id);
		tar.onclick = (e) =>{
			let ele = e.target.classList,
				par = e.target.parentElement.classList,
				eleSib = e.target.nextElementSibling;
			if (ele.contains('xui_collapse_head') && !par.contains('xui_collapse_disabled')) {
				if (ele.contains('xui_collapse_active')) {
					ele.remove('xui_collapse_active');
				} else{
					this.isOneTab && this[isShow]();
					ele.add('xui_collapse_active');
				};
				this.fn && this.fn(e.target, eleSib);
			};
		};
	};
	[isShow](){
		let tar = document.getElementById(this.id);
		tar.querySelectorAll('.xui_collapse_section').forEach(function(item, index){
			item.querySelector('.xui_collapse_head').classList.remove('xui_collapse_active');
		});
	};
	[renderHTML](){
		let divs = '';
		for(let i = 0; i < this.list.length; i++){
			let each = this.list[i], activeTab = this.activeTab == i ? 'xui_collapse_active' : '';
			let isDisabled = each.disabled ? 'xui_collapse_disabled' : '';
			divs += `
				<div class="xui_collapse_section ${isDisabled}">
					<div class="xui_collapse_head ${activeTab}">${each.title}</div>
					<div class="xui_collapse_body">${each.content}</div>
				</div>
			`;
		};
		document.getElementById(this.id).innerHTML = divs;
		this[event]();
	};
	[init](){
		this[renderHTML]();
	};
};