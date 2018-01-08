sideRender = function($el) {
	//初始化滚动区高度
	var scrollHeight = $el.height() - $el.find('.zavier-side-toggle').height();
	$el.find('.zavier-side-scroll').css('height', scrollHeight);

	//点击展开收起菜单项
	$el.find('.zavier-nav-item .zavier-nav-title').bind('click', function() {
		var $this = $(this);
		var nav = $this.parents('.zavier-nav-item');
		var children = nav.find('.zavier-nav-child');
		var childrenHeight = children.height() * children.length;
		var maxWrapHeight = $el.height() - $this.height() * $el.find('.zavier-nav-item').length - $el.find('.zavier-nav-toggle').height();
		//如果没有超过剩余高度则用自身高度，超过剩余高度用剩余高度
		childrenHeight = childrenHeight < maxWrapHeight ? childrenHeight : maxWrapHeight;
		//如果小于最小高度用最小高度，否则不变
		childrenHeight = childrenHeight < children.height() ? children.height() : childrenHeight;
		nav.siblings('.zavier-active').find('.zavier-nav-wrapper').css('height', '0px');
		nav.siblings('.zavier-active').removeClass('zavier-active');
		nav.find('.zavier-nav-wrapper').css('height', nav.hasClass('zavier-active') ? '0px' : childrenHeight);
		nav.toggleClass('zavier-active');
	});

	//点击展开收起侧边栏
	$el.find('.zavier-side-toggle').bind('click', function(callback) {
		$el.toggleClass('zavier-side-mini');
		$('.layui-body').css('left', $el.hasClass('zavier-side-mini') ? '50px' : '200px');
	});

	//查找与该网址对应的菜单，展开
	var $active = $el.find('a[href="' + window.location.pathname + '"]');
	$active.parent('.zavier-nav-child').addClass('zavier-active');
	$active.parents('.zavier-nav-wrapper').siblings('.zavier-nav-title').click();

	//收起菜单侧边栏时鼠标悬停展示菜单内容项
	var index;
	$el.find('.zavier-nav .zavier-nav-icon').bind('mouseover', function() {
		var $this = $(this);
		if(!$el.hasClass('zavier-side-mini')) return;
		index = layer.tips($this.siblings('span').text(), this, {
			skin: 'zavier-nav-tips',
			tips: [2, '#393D49'],
			anim: 5,
			isOutAnim: false,
			time: 0
		});
	}).bind('mouseleave', function() {
		layer.close(index);
	});
}