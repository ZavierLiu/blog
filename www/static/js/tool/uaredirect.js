function uaredirect(hostname) {
	if((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
		var str = hostname + ':' + location.port + location.pathname + location.search + location.hash;
		location.replace(str);
	}
}

uaredirect("http://m.liuzhongwee.com");