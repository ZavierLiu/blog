require(['/static/js/conf/requireConfig.js'], function() { //首先需要加载配置文件
	require(['appConfig', 'domReady', 'goUp', 'scrollFix'], function(appConfig, domReady, goUp, scrollFix) {
		layui.use(['carousel', 'flow'], function() {
			domReady(function(doc) {
				var carousel = layui.carousel;
				var flow = layui.flow;
				//建造实例
				carousel.render({
					elem: '#carousel',
					width: '100%', //设置容器宽度
					arrow: 'hover', //悬浮显示箭头
					interval: 2000, //自动切换时间
					height: 300,
				});
				goUp.init({
					trigger: 100
				});
			})
		});
	});
})