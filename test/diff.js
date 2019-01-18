/**
 * equal
 * @param {Object} left
 * @param {Object} right
 * @returns {boolean}
 */
function equal(left, right){
    var type = typeof left;
    if(type === typeof right){
        switch(type){
            case 'object':
                //比较2个对象，将key值转为数组
                var lKeys = Object.keys(left);
                var rKeys = Object.keys(right);
                if(lKeys.length === rKeys.length){
                    for(var i = 0; i < lKeys.length; i++){
                        var key = lKeys[i];
                        //排除原型上的值
                        if(!right.hasOwnProperty(key) || (left[key] !== right[key])){
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                return left === right;
        }
    } else {
        return false;
    }
}

/**
 * match
 * @param {Object} left
 * @param {Object} right
 * @returns {boolean}
 */
function isMatch(left, right){
    //同样需要比较attr，是因为attr可能是一个对象，比如input上
    return (left.name === right.name) && equal(left.attr, right.attr);
}

/**
 * common logic of `LCSHeadFirst’ and `LCSTailFirst‘
 * @param {Object} old
 * @param {Object} cur
 * @param {Function} match
 * @param {Number} x
 * @param {Array} lastLine
 * @param {Array} currLine
 */
function LCSProc(old, cur, match, x, lastLine, currLine){
    if(match(old, cur)){
        var sequence = (lastLine[x-1] || []).slice(0);
        sequence.push({ l: old, r: cur });
        currLine[x] = sequence;
    } else {
        var lSeq = currLine[x-1];
        var tSeq = lastLine[x];
        if(lSeq && tSeq){
            if(lSeq.length < tSeq.length){
                currLine[x] = tSeq.slice(0);
            } else {
                currLine[x] = lSeq.slice(0);
            }
        } else if(lSeq) {
            currLine[x] = lSeq.slice(0);
        } else if(tSeq) {
            currLine[x] = tSeq.slice(0);
        }
    }
}

/**
 * Longest common subsequence (obverse)  最常见的子序列-从头开始
 * @param {Array} left
 * @param {Array} right
 * @param {Function} match
 * @returns {Array}
 */
function LCSHeadFirst(left, right, match){
    var lastLine = [];
    var currLine = [];
    var y = left.length;
    var len = right.length;
    while(y--){
        var old = left[y];
        var i = len;
        while(i--){
            var cur = right[i];
            var x = len -  i - 1;
            LCSProc(old, cur, match, x, lastLine, currLine);
        }
        lastLine = currLine;
        currLine = [];
    }
    return (lastLine.pop() || []);
}

/**
 * Longest common subsequence (reverse) 最常见的子序列-从尾部开始，相反方向
 * @param {Array} left
 * @param {Array} right
 * @param {Function} match
 * @returns {Array}
 */
function LCSTailFirst(left, right, match){
    var lastLine = [];
    var currLine = [];
    left.forEach(function(old){
        right.forEach(function(cur, x){
            LCSProc(old, cur, match, x, lastLine, currLine);
        });
        lastLine = currLine;
        currLine = [];
    });
    return (lastLine.pop() || []);
}

/**
 * diff change
 * @param {Object} left
 * @param {Object} right
 * @param {Object} opt
 * @returns {Array}
 */
var diff = function(left, right, opt){
    var ret = [];
    var change = {
        type: 0,
        node: right
    };
    //对标签上的style进行判断，事先在walk.js里对其进行了md5加密，同时文字也这样处理
    if(left.style !== right.style){
        /*
        |= 按位或赋值  并不是 != 
        这个计算逻辑是：
        var a = 2; a |= 4;
        a === 6  => true
        二进制
        0000000010
        +
        0000000100
        =
        0000000110  == 6
        */
        change.type |= opt.changeType.STYLE;
    }
    var LCS = opt.priority === 'head' ? LCSHeadFirst : LCSTailFirst;
    LCS(left.child, right.child, isMatch).forEach(function(node){
        var old = node.l;
        var cur = node.r;
        //当数组不为空的时候，会打上matched为true的标记，否则会一直递归
        cur.matched = old.matched = true;
        if(cur.name === '#'){
            if(old.text !== cur.text){
                // match node, but contents are different.
                change.type |= opt.changeType.TEXT;
            }
        } else {
            // 一直递归到返回空数组，然后走下边的左右循环，最后return一个数组
            ret = ret.concat(diff(old, cur, opt));
        }
    });
    /*
        这个循环函数主要是给每一项添加增，删，改的type和node
        如果是增加，那么肯定是right.child不为空，那么right.child里面就是增加的tag
        否则就是left.child不为空，然后里面就是remove的tag
        如果有修改，最终的结果肯定是某一个树不为空
    */
    right.child.forEach(function(node){
        if(!node.matched){
            if(node.name === '#'){
                // add text, but count as text change
                change.type |= opt.changeType.TEXT;
            } else {
                // add element
                ret.push({
                    type: opt.changeType.ADD,
                    node: node
                });
            }
        }
    });
    left.child.forEach(function(node){
        if(!node.matched){
            if(node.name === '#'){
                // remove text, but count as text change
                change.type |= opt.changeType.TEXT;
            } else {
                // removed element
                ret.push({
                    type: opt.changeType.REMOVE,
                    node: node
                });
            }
        }
    });
    if(change.type){
        ret.push(change);
    }
    return ret;
};

window.diff = diff;