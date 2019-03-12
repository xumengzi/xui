;(function(w, options){
	var defaultOptions = {
		isShowError: true,
		isSubStr: true,
		collectPercent: 1
	};
	var opts = mergeObj({}, defaultOptions, options);
	var doc = document;
	var UPLOAD_URL = opts.src;

	if(!UPLOAD_URL){
		throw new Error("the src is required");
	};

	function isFunction(fn){
		return typeof fn === 'function';
	};

	function mergeObj(){
		var args = arguments, newObj = args[0];
		for(var i in args[1]){
			newObj[i] = args[1][i];
		};
		if(arguments.length === 3){
			for(var j in args[2]){
				newObj[j] = args[2][j];
			};
		};
		return newObj;
	};

	function toList(args){
		var list = '';
		for(var i in args){
			if(args.hasOwnProperty(i)){
				list += args[i] + ',';
			}
		};
		list = list.substr(0, list.length - 1);
		return list;
	}

	function jsonS(data){
		return typeof json === 'string' ? JSON.parse(data) : JSON.stringify(data);
	};

	// w.onerror = function(message, source, lineNo, colNo, error){
	//     const errorInfo = {
	//     	message: message,
	//     	source: source,
	//     	lineNumber: lineNo,
	//     	colNumber: colNo,
	//     	error: error,
	//     	type: 'Uncaught'
	// 	};
	// 	console.log(error);
	//     sendError(errorInfo);
	// };

	w.addEventListener('error', function(event){
		var e = event;
		var tarList = 'window';
		//如果不是特定的元素，e.target就和window相等，所以要排除掉
		if(e.target !== window){
			var path = '';
			event.path.reverse().map(item =>{
				item.nodeType < 9 && (path += item.nodeName.toLowerCase() + '>')
			});
			path = path.substr(0, path.length -1);
			tarList = {
				classList: e.target.classList && toList(e.target.classList),
				id: e.target.id,
				path: path,
				nodeName: e.target.nodeName.toLowerCase(),
				text: e.target.innerHTML
			};
		};
		
		const errorInfo = {
	    	message: e.message,
	    	fileName: e.filename,
	    	lineNumber: e.colno,
	    	colNumber: e.lineno,
			stack: e.error && e.error.stack,
			target: tarList,
	    	type: e.type
		};
	    sendError(errorInfo);
	    !opts.isShowError && e.preventDefault();
	},true);

	w.addEventListener('unhandledrejection', function(event){
		var e = event;
		const errorInfo = {
	    	type: e.type,
	    	reason: e.reason.toString()
	    };
		sendError(errorInfo);
	    !opts.isShowError && e.preventDefault();
	});

	Promise.prototype['catch'] = function(onRejected){
		const reject = function (error) {
	        var errorInfo = {
	            message: 'Promise Catch',
	            error: error
	        };
	        sendError(errorInfo);
	        if (isFunction(onRejected)) {
	            return onRejected(error);
	        };
	    };
	    return this.then(null, reject);
	};

	function getUserInfo(){
		var n = navigator;
		const userInfo = {
			cookieEnabled: n.cookieEnabled,
			data: new Date(),
			language: n.language || n.userLanguage,
			location: location.href,
			platform: n.platform,
			product: n.product,
			referrer: doc.referrer,
			screen: w.screen.width + 'px',
			userAgent: n.userAgent
		};
		return userInfo;
	};

	function sendError(info){
		if(Math.random() < opts.collectPercent){
			var mes = new Image();
			var isQuesMark = UPLOAD_URL.indexOf('?') > -1 ? '&data=' : '?data=';
			var useInfo = getUserInfo();

			var sendObj = {
				errorInfo: info,
				useInfo: useInfo
			};
			//考虑到IE浏览器对url的长度限制大概为2000，所以这里对超长字符作一下截取
			if(!opts.isSubStr && jsonS(sendObj).length < 2000){
				delete sendObj.errorInfo;
				sendObj.maxError = 'The error message has been intercepted due to the maximum limit of url';
			};
			sendObj = jsonS(sendObj);
			mes.src = UPLOAD_URL + isQuesMark + sendObj;
		};
	};
})(window, {
	src: 'https://xumeng.site/'
});