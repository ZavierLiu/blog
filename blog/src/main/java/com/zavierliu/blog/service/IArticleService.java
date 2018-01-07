package com.zavierliu.blog.service;

import com.github.pagehelper.Page;
import com.zavierliu.blog.model.Article;

public interface IArticleService {
    /**
     * 获取文章列表
     * @title:getPage 
     * @return Page<Article>        
     * @Exception
     */
    public Page<Article> getPage(Article article, int pageNum, int pageSize);

}
