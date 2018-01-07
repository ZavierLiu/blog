<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="/js/lib/layui/css/layui.css" rel="stylesheet"
	type="text/css" />
<link href="/css/common.css" rel="stylesheet" type="text/css" />
<title>文章管理</title>
</head>

<body class="layui-layout-body">
	<div class="layui-layout layui-layout-admin">

		<%@include file="../header.jsp"%>
		<%@include file="../side.jsp"%>

		<div class="layui-body">
			<!-- 内容主体区域 -->
			<div style="padding: 15px;">
				<table class="table table-bordered" id="table" class="display"
					cellspacing="0" width="100%">
					<thead>
						<tr>
							<th data-number="true"></th>
							<th data-checkbox="true"></th>
							<th data-field="title">文章标题</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<%@include file="../footer.jsp"%>
	<script type="text/javascript" src="/js/admin/article/list.js"></script>
</body>
</html>