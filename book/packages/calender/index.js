import './index.scss';

const event = Symbol('event');
const init = Symbol('init');
const renderHTML = Symbol('renderHTML');
const handleClickCal = Symbol('handleClickCal');
const removeCal = Symbol('removeCal');

export default class calendar{
	constructor(){
		if (!arguments[0].id) {
            throw new Error("element'id is required");
		};
		let tar = new Date();
		const t = {
			y: tar.getFullYear(),
			m: tar.getMonth() + 1,
		};
		const defaults = {
			id: '',
			fn: null,
			year: t.y,
			month: t.m
		};
		this.currentDate = null;
        const opts = Object.assign({}, defaults, arguments[0]);
        this.opts = opts;
		// isDisabled or not
		this.ele = document.getElementById(this.opts.id);
		if (this.ele.getAttribute('disabled')) {
			return;
		};
		this[init]();
	};
	[event](){
		let tar = document.querySelector('.xui_calendar_picker');
		tar.addEventListener('click', this[handleClickCal].bind(this), false);
		document.body.addEventListener('click', e=>{
			let o = e.target.classList;
			let isClose = o.contains('xui_date_input') || o.contains('xui_calendar_icon') || o.contains('xui_date_picker');
			if (!isClose) {
				this.deleteEle('.xui_calendar_picker');
			};
			//remove value
			if (o.contains('xui_close_small')) {
				this.currentDate = '';
				this.ele.value = '';
			};
		});
	};
	[handleClickCal](e){
		let o = e.target.classList;
		//choose date
		let isChooseDate = !o.contains('xui_calendar_invalid') && (o.contains('xui_calendar_valid') || o.contains('xui_calendar_foot'));
		if (isChooseDate) {
			let date = e.target.getAttribute('data-date');
			this.currentDate = date;
			this.opts.fn && this.opts.fn(date);
			this.deleteEle('.xui_calendar_picker');
			document.body.removeEventListener('click', this[handleClickCal].bind(this), false);
		};
		
		//set date
		if (o.contains('xui_calendar_icon')) {
			let type = e.target.getAttribute('data-set');
			this.opts.month -=0;
			this.opts.year -=0;
			if (type == 1) {
				this.opts.month -= 1;
				if (this.opts.month < 1) {
					this.opts.month = 12;
					this.opts.year--;
				};
			};
			type == 2 && (this.opts.year -= 1);
			type == 3 && (this.opts.year += 1);
			if (type == 4) {
				this.opts.month += 1;
				if (this.opts.month > 12) {
					this.opts.month = 1;
					this.opts.year++;
				};
			};
			this[renderHTML](this.opts.year, this.opts.month);
		};
		//remove calendar
		if (e.target.className == '') {
			this.deleteEle('.xui_calendar_picker');
			document.body.removeEventListener('click', this[handleClickCal].bind(this), false);
		};
	};
	[removeCal](){
		let del = document.getElementById(this.opts.id).parentNode;
		let eact = del.querySelectorAll('.xui_calendar_picker');
		if (eact.length) {
			for(let d = 0; d < eact.length; d++){
				eact[d] && eact[d].remove();
				document.body.removeEventListener('click', this[handleClickCal], false);
			};
		};
	};
	[renderHTML](year, month){
		this[removeCal]();
		//tag
		let tag = 0, lTag = 0;
		//total
		let totalNum = 42;
		let tar = new Date();
		const t = {
			y: year,
			m: month,
		};
		let firstDay = +new Date(`${t.y}-${t.m}`).getDay(),
			allDays = +new Date(t.y, t.m, 0).getDate();
		let tds = `<tr>`;
		//prev month
		if (this.opts.isOtherMonths) {
			let lastDays = +new Date(t.y, t.m - 1, 0).getDate();
			for(let i = firstDay -1; i >= 0; i--){
				tag++;
				lTag++;
				let prevd= (month == 1 ? `${t.y-1}-12-${lastDays - i}` : `${t.y}-${this.setNum(t.m-1)}-${lastDays - i}`);
				let isStarted = '',isEnded = '';
				if (this.opts.startDate) {
					if (+new Date(prevd) < +new Date(this.opts.startDate) || +new Date(prevd) > +new Date(this.opts.endDate)) {
						isStarted = 'xui_calendar_invalid';
					};
				};
				if (this.opts.endDate) {
					isEnded = +new Date(this.opts.endDate) > +new Date(prevd) ? '' : 'xui_calendar_invalid';
				};
				tds += `
					<td>
						<div data-date=${prevd} title=${prevd} class="xui_calendar_valid xui_calendar_prev ${isStarted} ${isStarted}">
							${lastDays - i}
						</div>
					</td>
				`;
				if (tag % 7 == 0) {
					tds += `</tr><tr>`;
				};
			};
		} else{
			for(let i = firstDay -1; i >= 0; i--){
				tag++;
				lTag++;
				tds += `<td><div></div></td>`;
				if (tag % 7 == 0) {
					tds += `</tr><tr>`;
				};
			};
		};
		//current month
		for(let j = 1; j <= allDays; j++){
			tag++;
			lTag++;
			let currd = `${t.y}-${this.setNum(t.m)}-${this.setNum(j)}`;
			let isStarted = '',isEnded = '',isSelected = '';
			if (this.opts.startDate) {
				isStarted = +new Date(this.opts.startDate) < +new Date(currd) ? '' : 'xui_calendar_invalid';
			};
			if (this.opts.endDate) {
				isEnded = +new Date(this.opts.endDate) > +new Date(currd) ? '' : 'xui_calendar_invalid';
			};
			isSelected = (j == tar.getDate() ? 'xui_calendar_selected' : '');
			tds += `
				<td>
					<div data-date=${currd} title=${currd} class="xui_calendar_valid ${isStarted} ${isEnded} ${isSelected}">
						${j}
					</div>
				</td>
			`
			if (tag % 7 == 0) {
				tds += `</tr><tr>`;
			};
		};
		//next month
		if (this.opts.isOtherMonths){
			for(let k = 1; k <= totalNum - lTag; k++){
				tag++;
				let nextd= (month != 12 ? `${t.y}-${this.setNum(t.m+1)}-${this.setNum(k)}` : `${t.y+1}-01-${this.setNum(k)}`);
				let isStarted = '',isEnded = '';
				if (this.opts.startDate) {
					isStarted = +new Date(this.opts.startDate) < +new Date(nextd) ? '' : 'xui_calendar_invalid';
				};
				if (this.opts.endDate) {
					isEnded = +new Date(this.opts.endDate) > +new Date(nextd) ? '' : 'xui_calendar_invalid';
				};
				tds += `
					<td>
						<div data-date=${nextd} title=${nextd} class="xui_calendar_valid xui_calendar_next ${isStarted} ${isEnded}">
							${k}
						</div>
					</td>
				`
				if (tag % 7 == 0) {
					tds += `</tr><tr>`;
				};
			};
		} else{
			for(let k = 1; k <= totalNum - lTag; k++){
				tag++;
				tds += `<td><div></div></td>`
				if (tag % 7 == 0) {
					tds += `</tr><tr>`;
				};
			};
		};
		//zh-cn or en
		let calHeadEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			calHeadCn = ['日', '一', '二', '三', '四', '五', '六'],
			calMonthEn = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			calMonthCn = ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			calHeadArr = '',
			calHeadHtml = '',
			calMonthHtml= '';
		calHeadArr = this.opts.isChinese ? calHeadCn : calHeadEn;
		todayText = this.opts.isChinese ? '今天' : 'today';
		calMonthHtml = this.opts.isChinese ? calMonthCn[Number(this.setNum(month))] : calMonthEn[Number(this.setNum(month))];
		let calHeadYear = this.opts.isChinese ? `年` : `year`;
		let calHeadMonth = this.opts.isChinese ? `月` : `month`;
		for(let i in calHeadArr){
			if(calHeadArr.hasOwnProperty(i)){
				calHeadHtml += `<th class="xui_calendar_th">${calHeadArr[i]}</th>`;
			};
		};
		//show today or not
		let isToday = ``;
		if (this.opts.isToday) {
			let istoDay = '';;
			let tDate = `${t.y}-${this.setNum(t.m)}-${this.setNum(tar.getDate())}`;
			if (this.opts.startDate) {
				if (+new Date(tDate) < +new Date(this.opts.startDate) || +new Date(tDate) > +new Date(this.opts.endDate)) {
					istoDay = 'xui_calendar_invalid';
				};
			};
			isToday = `
				<div class="xui_calendar_foot ${istoDay}" data-date=${tDate}>
					${todayText}
				</div>
			`;
		};
		//render calendar
		let calHTML = `
				<div class="xui_calendar_head">
					<div>
						<div data-set=2 title=${calHeadYear} class="xui_calendar_icon xui_calendar_icon_year xui_calendar_left"></div>
						<div data-set=1 title=${calHeadMonth} class="xui_calendar_icon xui_calendar_left"></div>
					</div>
					<div class="xui_calendar_choose">
						<span title=${year}>${year}</span>
						<span title=${calMonthHtml}>${calMonthHtml}</span>
					</div>
					<div>
						<div data-set=4 title=${calHeadMonth} class="xui_calendar_icon xui_calendar_right"></div>
						<div data-set=3 title=${calHeadYear} class="xui_calendar_icon xui_calendar_icon_year xui_calendar_right"></div>
					</div>
				</div>
				<div class="xui_calendar_body">
					<table>
						<thead>
							<tr>
								${calHeadHtml}
							</tr>
						</thead>
						<tbody>
							${tds}
						</tbody>
					</table>
				</div>
				${isToday}
		`;
		let con = document.createElement('div');
		con.classList.add('xui_calendar_picker');
		con.innerHTML = calHTML;
		document.getElementById(this.opts.id).after(con);
		this[event]();
	};
	getCurrentDate(){
		return this.currentDate;
	};
	setCurrentDate(date){
		let reg = /^(\d{4})[-\/]{1}(\d{2})[-\/]{1}(\d{2})$/;
		let lastDate = '';
		date -=0;
		if(reg.test(date)){
			lastDate = date.replace(/\//, '-');
		};
		if(Number.isInteger(date)){
			let d = new Date(date);
			let yyyy = d.getFullYear(),
				mm = d.getMonth() + 1,
				dd = d.getDate();
			mm = this.setNum(mm);
			dd = this.setNum(dd);
			lastDate = `${yyyy}-${mm}-${dd}`;
		};
		this.ele.value = this.currentDate = lastDate;
	};
	setNum(num){
		return num < 10 ? '0' + num : num;
	};
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
	};
	[init](){
		let y = this.opts.year,
			m = this.opts.month;
		this[renderHTML](y, m);
	};
};