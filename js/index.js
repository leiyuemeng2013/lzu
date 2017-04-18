mui.init();

//注册事件来禁止返回
mui.back = function() {
	var btnArray = ['取消', '确定'];
	mui.confirm('         是否退出应用？？', '       LzuGo提示您', btnArray, function(e) {
		if(e.index == 1) {
			plus.runtime.quit();
		}
	})
}

//滚动初始化
mui.ready(function() {
	//初始化滚动功能
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: true, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true, //是否启用回弹
	});
});

//路径地址数组
var urlArr = ['US_Infor.json', 'CS_Infor.json', 'SA_Infor.json', 'PS_Infor.json', 'AD_Infor.json', 'CC_Infor.json', 'OS_Infor.json'];
//
var targetArr = document.querySelectorAll('.mui-slider-group .mui-scroll');
//加载数据
mui.ready(function() {
	//加载显示数据
	mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
		pullListener(index, pullRefreshEl);
	});
});

function pullListener(index, container) {

	//从数组中获取地址
	var url = urlArr[index];
	//发起请求获得数据
	httpRequest(url, function(data) {

		//为这一列创建其中的cell，并放入这一列的dataArr中
		for(var i = 0; i < data.infor.length; i++) {

			addCell(container, data.infor[i]);

		}
	});
}

function addCell(container, data) {

	//创建cell的最外层
	var li = document.createElement('li');

	li.setAttribute('class', 'mui-table-view-cell mui-media');

	//创建a,并为其添加一个index属性用于存放cell的id
	var a = document.createElement('a');

	//添加数据
	a.setAttribute('data_url', data.url);
	a.setAttribute('data_name', data.name);
	a.innerHTML = data.name;

	li.appendChild(a);
	//将cell添加到容器中
	container.querySelector(".mui-table-view").appendChild(li);
}

mui.plusReady(function() {
	//预加载详情页页面	
	var page = mui.preload({
		url: 'detail.html',
		id: 'detail.html', //默认使用当前页面的url作为id
		styles: {
			top: '0px',
			bottom: '0px'
		}, //窗口参数
		extras: {} //自定义扩展参数
	});
	//为所有cell添加点击事件
	mui('.mui-table-view').on('tap', 'a', function(event) {
		//点击cell后将该cell的index    （id）传至详情页
		var url = this.getAttribute('data_url');
		var name = this.getAttribute('data_name');

		mui.fire(page, 'goDetail', {
			url: url,
			name: name
		});

		//跳转到详情页中
		mui.openWindow({
			id: 'detail.html',
			url: 'detail.html',
		});

	});

});

//封装ajax请求（可以本地请求）
function httpRequest(url, callback) {
	var fullUrl = "infor/" + url;
	mui.ajax(fullUrl, {
		dataType: 'json',
		type: 'get',
		success: function(data) {
			callback(data);
		},
		error: function(xhr, type, err) {
			console.log(err);
		}
	});
}