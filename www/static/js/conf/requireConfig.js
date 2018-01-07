/**
 * http://www.liuzhongwee.com
 */
require.config({
	"baseUrl": "/static/",
	"paths": {
		/*引用的第三方js*/
		"css": "js/lib/require-css/css",
		"jquery": ["https://cdn.bootcss.com/jquery/1.12.4/jquery.min", "js/lib/jquery/jquery-1.12.4.min"],
		"domReady": ["https://cdn.bootcss.com/require-domReady/2.0.1/domReady.min", "/js/lib/requirejs/domReady.min"],
		"dataTable": ["https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js", "/js/lib/dataTables/js/dataTables.min"],
		"layui": "js/lib/layui/layui",

		/*自定义js文件*/
		"appConfig": "js/conf/appConfig",
		"goUp": "js/tool/goUp",
		"scrollFix": "js/tool/scrollFix",
		"side":"js/tool/side"
	},
	skim: {
		'layui': {
			deps: ['jquery'],
			exports: 'layui'
		}
	}
});