<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link href="/js/lib/layui/css/layui.css" rel="stylesheet" type="text/css" />
		<link href="/css/common.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" charset="utf-8" src="/js/lib/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8" src="/js/lib/ueditor/ueditor.all.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="/js/lib/ueditor/lang/zh-cn/zh-cn.js">
		</script>
		<title>文章管理</title>
	</head>

	<body class="layui-layout-body">
		<div class="layui-layout layui-layout-admin">

			<%@include file="../header.jsp"%>
			<%@include file="../side.jsp"%>

			<div class="layui-body">
				<div class="layui-form">
					<div class="layui-form-item">
						<div class="layui-inline">
							<div class="layui-form-label">文章标题</div>
							<div class="layui-input-inline">
								<input type="text" name="price_min" class="layui-input" autocomplete="off">
							</div>
						</div>
						<div class="layui-inline">
							<div class="layui-form-label">文章标题</div>
							<div class="layui-input-inline">
								<input type="text" name="price_min" class="layui-input" autocomplete="off">
							</div>
						</div>
						<div class="layui-inline">
							<div class="layui-form-label">文章标题</div>
							<div class="layui-input-inline">
								<input type="text" name="price_min" class="layui-input" autocomplete="off">
							</div>
						</div>
						<div class="layui-btn pull-right"><i class="layui-icon">&#xe615;</i>查找</div>
						<div class="layui-clear"></div>
					</div>
				</div>
				<hr />
				<table class="table table-bordered" id="table" class="display" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th data-number="true"></th>
							<th data-checkbox="true"></th>
							<th data-field="title">文章标题</th>
							<th>操作</th>
						</tr>
					</thead>
				</table>
				<script id="container" name="content" type="text/plain">
					这里写你的初始化内容
				</script>
				<script type="text/javascript">
					var ue = UE.getEditor('container');
				</script>
			</div>
		</div>
		<%@include file="../footer.jsp"%>
		<script type="text/javascript" src="/js/admin/article/list.js"></script>
	</body>

</html>