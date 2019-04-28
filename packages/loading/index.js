import './index.scss';
class loading {
	constructor(){
		this.version = '0.1.1';
	}
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
};

export default new loading;