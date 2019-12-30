<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 4.1.6 Window

>你知道浏览器里的`window`对象, 有多少属性吗? 跟着我来看看吧!

>可以选择打卡, 那么这个将标记为已会, 并在文章开头显示, 另外复制文字也可以提供快捷搜索的哦, 快去试试吧

<style>
  .window {
    max-width: 800px;
    margin: 50px auto;
    font-family: consolas;
    font-size: 18px;
    position: relative;
  }
  .window .window-status{
    margin: 10px 0;
  }
  .window .window-status span{
    font-weight: bold;
    color: indigo;
  }
  .window::before,
  .window::after {
    display: inline-block;
    position: absolute;
    top: -30px;
    left: 50%;
    transition: all .3s ease-out;
  }
  .window::before {
    content: attr(data-prev);
    transform: translateX(-100%);
  }
  .window::after {
    content: attr(data-next);
    transform: translateX(100%);
  }
  .window:hover::before {
    transform: translateX(-50%);
  }
  .window:hover::after {
    transform: translateX(50%);
  }
  .window .window-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6px;
    padding: 8px;
    border: 1px #ccc solid;
    background-color: #fff;
    border-radius: 4px;
    transition: all .4s ease-out;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
  .window .window-item::before{
    content: '';
    position: absolute;
    width: 58%;
    height: 6px;
    left: 20%;
    top: -7px;
    border: 1px #393838 solid;
    z-index: -1;
    border-color: transparent #333 transparent #333;
  }
  .window .window-item:first-child:before{
    display: none;
  }
  .window .window-item:nth-child(n){
    transform: skewX(10deg);
  }
  .window .window-item:nth-child(2n){
    transform: skewX(-10deg);
  }
  .window .window-item.checked {
    opacity: .8;
    border-color: green;
  }
  .window .window-item.checked::after {
    content: '√';
    position: absolute;
    top: 50%;
    right: 1%;
    transform: translateY(-50%);
    color: green;
  }
  .window .window-item:hover {
    /* transform: scale(1.1) translateY(-10px); */
    transform: skewX(0);
    box-shadow: none;
    /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15); */
  }
  .window-item label {
    flex: 1;
  }
  .window-item span {
    flex: 1;
    word-break: break-word;
  }
  .window-item span.xui_checkbox_box {
    width: 100px;
    flex: initial;
  }
</style>

<div class="window" data-prev="win" data-next="dow">
  <div class="window-status">
    window上总共有<span class="allTotal">--</span>个属性(不包括原型),
    学会了<span class="alreadyCount">--</span>个 (如果有别的属性, 那可能是别人或者你加的)
  </div>
</div>

<script>
  ;(function(){
    var arr = [];
    var str = localStorage.getItem('localArr');
    var localArr = [];
    var exincludeArr = [
      'xui', 'arr', 'str', 'localArr', 'setData', 
      'NUM', 'tempDiv', 'exincludeArr', 'xuiVersion', 
      ];
    if (str) {
      localArr = str.split(',')
    }

    let tempDiv = document.createElement('div');
    let NUM = 0;
    for (let i in window) {
      if (window.hasOwnProperty(i) && !exincludeArr.includes(i)) {
        let z = window[i]
        let div = document.createElement('div');
        div.classList.add('window-item');
        if (localArr.includes(i)) {
          div.classList.add('checked');
        };
        NUM++;
        div.setAttribute('title', '这是啥? 复制了去看看');
        div.innerHTML = `
            <span class="xui_checkbox_box" data-attr="${i}">打卡</span>
            <label>${i}</label><span>${z}</span>
          `;
        tempDiv.appendChild(div)
      };
      document.querySelector('.allTotal').innerHTML = NUM;
      document.querySelector('.alreadyCount').innerHTML = localArr.length || 0;
      document.querySelector('.window').appendChild(tempDiv);
    };
    document.querySelector('.window').addEventListener('click', function (e) {
      let tar = e.target;
      if (tar.className.includes('xui_checkbox_box')) {
        if (tar.parentElement.className.includes('checked')) {
          return;
        }
        xui.prompt({
          tips: '提示',
          text: '学会了吗?',
          isShowClose: true,
          confirmBtn: {
            text: 'YES',
            fn() {
              tar.parentElement.classList.add('checked');
              let attr = tar.getAttribute('data-attr');
              setData(attr);
            }
          },
          cancelBtn: {
            text: 'NO',
            fn() {
              xui.message('加油哦!');
            }
          },
        });
      }
    })

    function setData(val) {
      if (!localArr.includes(val)) {
        localArr.push(val);
        localStorage.setItem('localArr', localArr);
        document.querySelector('.alreadyCount').innerHTML = localArr.length || 0;
      }
    }
    new xui.selected().set({
      searchEngine: ['bing', 'google'],
      newTab: false,
      background: '#fff',
      zIndex: 9999,
    });
  })();
</script>

