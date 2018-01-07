var Grid = function(gridId, ajax, columnDatas) {
	this.gridId = gridId; // 列表ID
	this.columnDatas = columnDatas; // 列信息

	this.needTotal = true;
	//查询参数
	this.params = new Object();
	//ajax请求url
	this.ajaxUrl = ajax;
	//表格数据
	this.gridData = [];
	//表格数据条数
	this.total = null;
	// 默认参数列表
	this.defaults = {
		bInputPage: true, //是否显示页码跳转输入框，自定义参数
		bInputGo: false, //是否正在使用跳转页面，为了区分正常显示还是跳转显示，初始化不使用，自定义参数
		inputgopage: 1, //跳转到第几页，当bInputGo为true时才起作用
		bProcessing: true, // DataTables载入数据时，是否显示‘进度’提示
		bAutoWidth: false, // 展开、合起菜单栏时，表格自适应宽度
		aLengthMenu: [10, 25, 50, 100], // 自定义长度菜单的选项
		inputPage: true, //是否显示页面跳转输入框
		iDisplayLength: 10, // 分页，每页的显示数量
		scrollX: "", // 水平滚动
		sScrollY: "",
		ordering: false, // 是否启动各个字段的排序功能 ,默认不排序
		order: [
			[0, 'asc']
		], // 默认的排序方式，第1列，升序排列
		info: true, // 是否显示页脚信息，DataTables插件左下角显示记录数
		paging: true, // 是否分页
		bPaginate: true, // 是否显示（应用）分页器
		oScroll: {
			bCollapse: null,
			sX: null,
			sY: null
		},
		callBack: function() {}, // 表格加载完成回调函数
		stateSave: false, // Datatables设置
		// stateSave选项后，可以保存最后一次分页信息、排序信息，当页面刷新，或者重新进入这个页面，恢复上次的状态。
		stateDuration: 0, // -1 保存到session中， 0~更大保存到localstorage中， 以秒计算
		// 0表示没有时间限制
		trCheckedCallBack: trCheckedCallBack, // 行选中回调
		trUnCheckedCallBack: trUnCheckedCallBack, // 行取消选中回调
		drawCallback: tableDrawCallback,
		new_style: false
		// 表单加载完成回调
	};
	this.oTable = null;
}

Grid.prototype = {

	init: function(options) {
		var _that = this;
		// 将用户自定义的信息赋值给default
		if(options) {
			$.each(options, function(i, val) {
				if(typeof val == 'object' && _that.defaults[i]) {
					$.extend(_that.defaults[i], val);
				} else {
					_that.defaults[i] = val;
				}
			});
		}
		//如果列信息未加载过，再加载列信息
		if(!this.columnDatas) {
			this.initColumnsData();
		}
		_that.oTable = $('#' + this.gridId).DataTable({
			"grid": _that,
			"aLengthMenu": this.defaults.aLengthMenu, // 自定义长度菜单的选项
			"bInputgo": this.defaults.bInputGo,
			"inputgopage": this.defaults.inputgopage,
			"bInputPage": this.defaults.bInputPage,
			"iDisplayLength": this.defaults.iDisplayLength, // 分页，每页显示的数量
			"bProcessing": this.defaults.bProcessing, // DataTables载入数据时，是否显示‘进度’提示
			"order": this.defaults.order, // 默认的排序方式，第1列，升序排列
			"ordering": this.defaults.ordering, // 是否启动各个字段的排序功能 ,默认不排序
			"bAutoWidth": this.defaults.bAutoWidth, // 展开、合起菜单栏时，表格自适应宽度
			"bServerSide": true,
			"fnServerData": this.retrieveData,
			"sAjaxSource": "",
			"bRetrieve": true,
			"paging": this.defaults.paging,
			"scrollX": this.defaults.scrollX, // 水平滚动
			"sScrollY": this.defaults.sScrollY, //垂直滚动
			"scrollCollapse": this.defaults.scrollCollapse, //
			"bPaginate": this.defaults.bPaginate, // 是否显示（应用）分页器
			"bInfo": this.defaults.info, // 是否显示页脚信息，DataTables插件左下角显示记录数
			"columns": this.columnDatas,
			"stateSave": this.defaults.stateSave, // 保存状态
			"stateDuration": this.defaults.stateDuration, // 保存状态的时间
			"oScroll": {
				"bCollapse": this.defaults.oScroll.bCollapse,
				"sX": this.defaults.oScroll.sX,
				"sY": this.defaults.oScroll.sY
			},
			"initComplete": function() { // 初始化加载回调函数
				_that.defaults.callBack();
			}, // 结束
			"drawCallback": function(settings) {
				var api = this.api();
				_that.defaults.drawCallback(settings, api);
				if(_that.defaults.sScrollY != "") {
					$(window).bind('resize', function() {
						grid.oTable.draw(true);
					});
				}
			}
		});

		this.params = new Object();
	},

	/***************************************************************************
	 * 表格加载 数据请求
	 **************************************************************************/
	retrieveData: function(sSource, aoData, fnCallback, oSettings) {
		var _that = oSettings.oInit.grid;
		var pageNum; //当前显示页码

		if(_that.defaults.bInputgo) { //使用页面跳转，需要修改对应的参数
			var pageNum = _that.defaults.inputgopage;
			_that.defaults.bInputgo = false; //使用完就立马关闭，下一次需要使用的时候再开启
			//从第几条数据开始显示，计算内部当前页码
			oSettings._iDisplayStart = parseInt(pageNum - 1) * 10;
			aoData[0].value = pageNum / 10
			aoData[3].value = pageNum
		}

		var start = aoData[3].value;
		var limit = aoData[4].value;
		var pageNum = parseInt(start / limit) + 1;
		// 当前的grid对象

		//是否分页
		var paging = _that.defaults.paging;

		var isMultiField = false;
		//排序方向
		var order = null;
		//排序列
		var columnName = null;
		//多列排序
		var sortList = null;

		//加载出的数据
		if(_that.ajaxUrl) {
			var url = _that.ajaxUrl;
			// 查询时，查询全部数据条数
			_that.setParameter("needTotal", true);
			// 判断是否分页，如果不分页，则传递limit为-1
			if(paging) {
				// 分页信息
				_that.setParameter("pageNum", pageNum);
				_that.setParameter("pageSize", limit);
			} else { // 不分页
				_that.setParameter("pageSize", 0);
			}

			//排序信息
			if(_that.defaults.ordering) {
				if(columnName && order) {
					_that.setParameter("orderfield", columnName);
					_that.setParameter("orderdir", order);
				} else if(isMultiField) {
					_that.setParameter("defaultSort", sortList);
				}
			}
			//			var json = JSON.stringify(_that.params);
			var json = '';
			$.each(_that.params, function(index, obj) {
				json += '&' + index + '=' + obj;
			})

			try {
				$.ajax({
					url: url,
					type: "POST",
					async: true,
					contentType: "application/x-www-form-urlencoded",
					//					dataType: "json",
					data: json,
					success: function(data) {
						_that.gridData = data.rows;
						_that.total = data.total;
						for(i = 0; i < _that.gridData.length; i++) {
							_that.gridData[i]["ROWNUM_"] = i + 1;
						}

						var draw = aoData[0].value;

						var json = {
							"draw": draw, //第几页
							"iTotalRecords": _that.total, //一共多少条数据
							"iTotalDisplayRecords": _that.total,
							"aaData": _that.gridData //数据
						};
						// 渲染数据
						fnCallback(json);

						//页码跳转事件绑定
						var length = _that.defaults.iDisplayLength;
						if(_that.defaults.bInputPage) {
							$("#select_input").remove();
							$("#" + _that.gridId + "_length").parent().append("<div id='select_input'>到第<input onkeyup=\"this.value=this.value.replace(/\\D/g,\'\')\" onafterpaste=\"this.value=this.value.replace(/\D/g,\'\')\" />页</div>");
							var _that_pagesize = parseInt(0);
							//判断是否能整除
							if(!(_that.total % length)) {
								_that_pagesize = parseInt(_that.total / length);
							} else {
								_that_pagesize = parseInt(_that.total / length) + 1;
							}
							$("#select_input input").attr("page_length", _that_pagesize);
							$("#select_input input").unbind('keypress').bind('keypress', function(event) {
								if(event.keyCode == "13") {
									var filter = $(this).val();
									if(filter && (filter <= _that_pagesize) && (filter > 0)) {
										_that.defaults.inputgopage = ($("#select_input input").val() - 1) * 10;
										_that.defaults.bInputgo = true;
										_that.reload();

									} else {
										layer.msg("页码查出范围请重新输入");
										$("#select_input input").val("");
									}
									return false;
								}
							});
						}
					},
					error: function(data, textstatus) {
						alert(data.responseText);
						return;
					}
				});
			} catch(e) {
				alert("请求数据出错");
				return;
			}
		}

		// checkbox绑定全（不）选定事件
		if(!_that.defaults.info) {
			$("#grid_info").remove();
		}
		if(!_that.defaults.bPaginate) {
			$("#grid_length").remove();
		}

		$(".table>thead>tr>th input[type='checkbox']").on("click", function(e) {
			//选中
			if(e.target.checked) {
				var selector = $(this).parentsUntil("table").parent("table#" + _that.gridId).find("tbody>tr>td input[type='checkbox']");
				$(selector).each(function() {
					var inputCtrl = $(this);
					inputCtrl.prop("checked", true);
					inputCtrl.parents("tr").addClass("selected");
				});
				// 解决个别表格不能全选的问题
				var selectorTemp = $(this).parentsUntil("table").parent("table").parent().parent(".dataTables_scrollHead").next().find("tbody>tr>td input[type='checkbox']");
				$(selectorTemp).each(function() {
					var inputCtrl = $(this);
					inputCtrl.prop("checked", true);
					inputCtrl.parents("tr").addClass("selected");
				});
			} else {
				var selector = $(this).parentsUntil("table").parent("table#" + _that.gridId).find("tbody>tr>td input[type='checkbox']");
				$(selector).each(function() {
					var inputCtrl = $(this);
					inputCtrl.prop("checked", false);
					inputCtrl.parents("tr").removeClass("selected");
				});
				// 解决个别表格不能全取消的问题
				var selectorTemp = $(this).parentsUntil("table").parent("table").parent().parent(".dataTables_scrollHead").next().find("tbody>tr>td input[type='checkbox']");
				$(selectorTemp).each(function() {
					var inputCtrl = $(this);
					inputCtrl.prop("checked", false);
					inputCtrl.parents("tr").removeClass("selected");
				});
			}
		});

		// 表格行内，单选多选点击时，触发给当前行增加\删除类
		//$(".table>tbody>tr>td input[type='checkbox']")
		$(".table>tbody>tr>td").find("input[type='checkbox']:first").on("click", function(e) {
			if(e.target.checked) {
				$(this).parents("tr").addClass("selected");
				_that.defaults.trCheckedCallBack(this);
			} else {
				$(this).parents("tr").removeClass("selected");
				_that.defaults.trUnCheckedCallBack(this);
			}
		});
		//$(".table>tbody>tr>td input[type='radio']")
		$(".table>tbody>tr>td").find("input[type='radio']").on("click", function(e) {
			if(e.target.checked) {
				$(this).parents("tr").siblings().removeClass("selected");
				$(this).parents("tr").addClass("selected");
				_that.defaults.trCheckedCallBack(this);
			} else {
				$(this).parents("tr").removeClass("selected");
				_that.defaults.trUnCheckedCallBack(this);
			}
		});
	},
	/***
	 * 初始化表格列信息
	 * **/
	initColumnsData: function() {
		var _that = this;
		if(!_that.columnDatas) {
			_that.columnDatas = [];
		}
		//根据表头信息获取列的定义及列的个性化定义
		$('#' + _that.gridId + ' thead tr').each(function(trindex, trelement) { //复杂表头时产生多行
			$(this).find("th").each(function(thindex, thelement) {
				var columnObject = new Object();
				var column = false; //避免加入空对象   
				//序号列
				if($(this).attr("data-number")) {
					column = true;
					columnObject["data"] = "ROWNUM_";
					columnObject["title"] = "序号";
					columnObject["bSortable"] = false;
					columnObject["sClass"] = "center";
					columnObject["sWidth"] = "50px";
				} else if($(this).attr("data-checkbox")) {
					//复选框列
					column = true;
					columnObject["data"] = null;
					columnObject["title"] = "<input type='checkbox' id='gird_selectAll' name='checkboxAll'>";
					columnObject["bSortable"] = false;
					columnObject["sClass"] = "center";
					columnObject["sWidth"] = "50px";
					columnObject["mRender"] = function(data, type, full) {
						return '<input type="checkbox" class="grid_checkbox" name="checkboxAll"/>';
					}
				} else if($(this).attr("data-radiobox")) {
					//单选框列
					column = true;
					columnObject["data"] = null;
					columnObject["title"] = "";
					columnObject["bSortable"] = false;
					columnObject["sClass"] = "center";
					columnObject["sWidth"] = "50px";
					columnObject["mRender"] = function(data, type, full) {
						return '<input type="radio" class="grid_radiobox" name="grid_radio"/>';
					}
				} else {
					//列对应的数据
					if($(this).attr("data-field")) {
						column = true;
						columnObject["data"] = $(this).attr("data-field");
					} else {
						column = true;
						columnObject["data"] = null;
						columnObject["defaultContent"] = "";
					}
					//是否允许排序
					if($(this).attr("data-sortable")) {
						column = true;
						if($(this).attr("data-sortable") == "false") {
							columnObject["bSortable"] = false;
						} else {
							columnObject["bSortable"] = true;
						}
					}
					//列的类信息
					if($(this).attr("data-class")) {
						column = true;
						columnObject["sClass"] = $(this).attr("data-class");
					}
					//渲染函数
					if($(this).attr("data-render")) {
						var render = $(this).attr("data-render"); //根据方法名生成对应的方法
						if(render == "checkbox") {
							columnObject["mRender"] = function(data, type, full) {
								return '<input type="checkbox" value="' + data + '" title="' + data + '" id="checkbox" name="checkboxlist"/>';
							}
						} else if(render == "radio") {
							columnObject["mRender"] = function(data, type, full) {
								return '<input type="radio" value="' + data + '" title="' + data + '" id="radio" name="radiolist"/>';
							}
						} else {
							columnObject["mRender"] = eval(render);
						}
					}
					if($(this).attr("data-field")) {
						column = true;
						if($(this).attr("data-dict")) {
							var dict_name = $(this).attr("data-field");
							var dict_key = $(this).attr("data-dict");
							var dict_date = G3.SC.loadDict(dict_key);
							columnObject["mRender"] = function(data, type, full) {
								var text_data = "";
								for(var i = 0; i < dict_date.length; i++) {
									if(dict_date[i].value === data) {
										text_data = dict_date[i].text;
									}
								}
								return "<span val='" + data + "' data-dict='" + dict_key + "'>" + text_data + "</span>"
							}
							//提示tips
							/*show_tips(this);
							function show_tips(this){
								if($(this).attr("data-tips")){
								var place=$(this).attr("data-tips");
								columnObject["tips"] = function(data,type,full){
									return "<span data-toggle='tooltip' data-placement='"+place+"' title='"+text_data+"'>"+text_data+"</span>"
								}else{
								return "<span data-toggle='tooltip' title='"+text_data+"'>"+text_data+"</span>"
								
									}
								} 
						
							}*/

						} else {
							columnObject["data"] = $(this).attr("data-field");
						}
					}
					/*if($(this).attr("data-dict")){
						column = true;
						var dict_name=$(this).attr("data-field");
						var dict_date=G3.SC.loadDict("AICMER_SC_ACCOUNTS");
						columnObject["mRender"] = function(data,type,full){
							return "<span data-toggle='tooltip' data-placement='"+place+"' title='"+data+"'>"+data+"</span>"
						}
						
					}*/
				}

				if(column) { //避免加入空对象
					_that.columnDatas.push(columnObject);
					column = false;
				}
			});
		});
	},
	reload: function() { // 重新加载数据
		$('#' + this.gridId).dataTable().fnDestroy();
		// grid的load方法执行cmd的load方法，不加载上一次的查询条件
		this.init(this.defaults);
	},
	/***************************************************************************
	 * 参数
	 * 
	 * @param name
	 *            参数名称
	 * @param value
	 *            参数值
	 **************************************************************************/
	setParameter: function(name, value) {
		//如果有空格，去掉前后空格
		if(value && typeof value == "string") {
			value = value.trim();
		}
		this.params[name] = value;
	},
	/**
	 * 根据键值从map对象中取值
	 * 
	 * @method get
	 * @param {String}key键值
	 * @return {Oject} 值
	 */
	getParameter: function(key) {
		var val = this.params[key];
		return val;
	},
}
//行选中回调
function trCheckedCallBack(obj) {

}
//行取消回调
function trUnCheckedCallBack(obj) {

} //表格加载回调
function tableDrawCallback(settings, api) {

}