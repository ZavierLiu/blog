#blog
  



- ## nginx配置 ##
在NGINX_HOME/conf/nginx.conf中添加以下内容：

<pre>
server {
	listen       80;
    server_name  www.zblog.com;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
    	root   D:/data/git/blog/www/html;
        index  index.html index.htm;
    }

	location ~ /(js|img|css) {
	    root   D:/data/git/blog/www/static;
	}

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
    	root   html;
    }
}

server {
	listen       80;
    server_name  console.zblog.com;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    #转发请求
    location / {
    	proxy_pass   http://127.0.0.1:8080/blog/;
    }

    #定位静态资源
	location ~ /(js|img|css) {
	    root   D:/data/git/blog/www/static;
	}

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
   	error_page   500 502 503 504  /50x.html;
    location = /50x.html {
    	root   html;
    }
}

</pre>



