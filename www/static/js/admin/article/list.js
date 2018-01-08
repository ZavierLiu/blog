$().ready(function() {
	sideRender($('.zavier-side'));

	var grid = new Grid("table", "/api/article/page");
	grid.init();

	var ue = UE.getEditor('container');
});