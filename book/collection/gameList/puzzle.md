<link rel="stylesheet" type="text/css" href="../../assets/xui.css">
<script type="text/javascript" src="../../assets/xui.js"></script>

# 4.1.5.1 puzzle

### 拼图游戏

>拼图游戏需要一些技巧, 来把一个九宫格的图拼好, 来试试吧!

<img id="success" style="width: 160px;" src="../../img/success.png">

>说明: 成功的图, 点击查看大图

<style type="text/css">
    body{
        font-size: 14px;
    }
    body .box-container{
        text-align: center;
    }
    .puzzle{
        max-width: 600px;
        font-size: 0;
        margin: 0 auto;
    }
    .puzzle > div{
        width: 33.3%;
        height: 110px;
        font-size: 14px;
        vertical-align: bottom;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        font-weight: bold;
        font-family: consolas;
    }
    .puzzle > div:nth-child(1){
        background-color: antiquewhite;
    }
    .puzzle > div:nth-child(2){
        background-color:aqua;
    }
    .puzzle > div:nth-child(3){
        background-color:indianred;
    }
    .puzzle > div:nth-child(4){
        background-color:#fd7127;
    }
    .puzzle > div:nth-child(5){
        background-color:chartreuse;
    }
    .puzzle > div:nth-child(6){
        background-color:pink ;
    }
    .puzzle > div:nth-child(7){
        background-color:darkmagenta;
    }
    .puzzle > div:nth-child(8){
        background-color:deepskyblue;
    }
    .puzzle > div:nth-child(9){
        background-color:olivedrab;
    }
    .operate{
        width: 200px;
        height: 100px;
        position: relative;
        margin: 0 auto;
    }
    .operate button {
        position: absolute;
        margin: 0;
    }
    .operate button:nth-child(1) {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .operate button:nth-child(2) {
        bottom: 0;
        left: 50%;
        top: auto;
        transform: translateX(-50%);
    }
    .operate button:nth-child(3) {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .operate button:nth-child(4) {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
    .description{
        display: flex;
        max-width: 600px;
        margin: 8px auto;
        justify-content: space-around;
    }
</style>

<div class="box-container">
    <div class="puzzle"></div>
    <div class="tips"></div>
    <div class="description">
        <div class="current">当前步数: <span>0</span>步</div>
        <div class="score">历史最好成绩: <span>0</span></div>
    </div>
    <div class="operate">
        <button class="xui_btn xui_btn_default" data-type="1">↑</button>
        <button class="xui_btn xui_btn_default" data-type="2">↓</button>
        <button class="xui_btn xui_btn_default" data-type="3">←</button>
        <button class="xui_btn xui_btn_default" data-type="4">→</button>
    </div>
    <button class="xui_btn xui_btn_cancel reset">重置</button>
</div>

<script>
    document.getElementById('success').onclick = function(e){
        xui.showImg(e.target.src, 'success');
    };
    ;(function(){
        let NUM = 0;
        let bestNUM = localStorage.getItem('score') || 0;

        const noOrder = e =>{
            return [1, 2, 3, 4, 5, 6, 7, 8, 0].sort((a,b)=>{
                return Math.random() * 2 - 1
            });
        }
        let oBtn = document.querySelector('.operate');
        const tips = ['卧槽, 好厉害', '加油!', '别灰心!', '相信自己'];
        let initArr = noOrder();
        const render = (arr) =>{
            let divs = document.querySelector('.puzzle');

            divs.innerHTML = '';
            for(let i in arr){
                if(arr.hasOwnProperty(i)){
                    let temp = document.createElement('div');
                    temp.innerHTML = arr[i] || '';
                    divs.appendChild(temp)
                }
            }
            document.querySelector('.current').children[0].innerHTML = NUM
        }
        
        document.querySelector('.reset').addEventListener('click', e =>{
            location.reload()
        })
        const setPuzzle = (arr) =>{
            render(arr);
            bestNUM = NUM
            NUM+=1
            if(arr.join('') === '123456780'){
                document.querySelector('.tips').innerHTML = tips[0];
                let temp = localStorage.getItem('score') || bestNUM;
                bestNUM = temp > bestNUM ? bestNUM : temp;
                localStorage.setItem('score', bestNUM);
            }
        }
        
        document.querySelector('.score').children[0].innerHTML = bestNUM
        oBtn.addEventListener('click', e =>{
            let ele = e.target;
            let type = ele.getAttribute('data-type');
            if(type){
                let zero = initArr.indexOf(0)
                let tempArr = [];
                let target = null;
                if(type == 1){
                    if(zero > 5){
                        return
                    }
                    target = zero + 3;
                }
                if(type == 2){
                    if(zero < 3){
                        return
                    }
                    target = zero - 3;
                }
                if(type == 3){
                    if([2,5,8].includes(zero)){
                        return
                    }
                    target = zero + 1;
                }
                if(type == 4){
                    if([0,3,6].includes(zero)){
                        return
                    }
                    target = zero - 1;
                }
                tempArr = initArr
                let a = initArr.splice(target, 1, 0)
                let b = initArr.splice(zero, 1, a[0])
                setPuzzle(tempArr)
            }
        })
        setPuzzle(initArr)
    })(window);
    
</script>