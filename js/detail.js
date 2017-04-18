//添加go自定义事件监听
window.addEventListener('goDetail', function(event) {

	//获得被点击的cell的id
	var durl = event.detail.url;
	var dname = event.detail.name;
	console.log(dname);
	//改变标题
	document.getElementsByClassName("mui-title")[0].innerHTML = dname;
	
	mui.init({
		swipeBack: true, //启用右滑关闭功能
		subpages: [{
			url: durl, //子页面HTML地址，支持本地地址和网络地址
			id: durl, //子页面标志
			styles: {
				top: '44px', //子页面顶部位置
				//bottom:0,//子页面底部位置
				width:"99%",//子页面宽度，默认为100%
				height:"99%"//子页面高度，默认为100%
			},
			extras: {} //额外扩展参数
		}]
	});

	mui.plusReady(function (){
		//获取子页面
		var subPage = plus.webview.currentWebview().children()[0];
		
		console.log(subPage);
		var aaa = plus.webview.currentWebview().children()[0].evalJS("var meta = document.createElement('meta');meta.setAttribute('name','viewport');meta.setAttribute('content','width=device-width,initial-scale=0.5, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes');document.getElementsByTagName('head')[0].appendChild(meta);");
	
		//定义事件监听返回按钮　　关闭子页面　从新加载父页面
		mui(".mui-bar").on('tap','a',function () {
			//console.log('tap66666666666666666');
			plus.webview.close(subPage);
			plus.webview.currentWebview().reload();
		});
	});
	
});