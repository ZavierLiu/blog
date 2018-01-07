package com.zavierliu.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zavierliu.blog.dao.ArticleMapper;
import com.zavierliu.blog.model.Article;
import com.zavierliu.blog.service.IArticleService;

@Service
public class ArticleServiceImpl implements IArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public Page<Article> getPage(Article article, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page<Article> articles = (Page<Article>) articleMapper.selectByParam(article);
        return articles;
    }

}
