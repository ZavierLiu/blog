package com.zavierliu.blog.dao;

import java.util.List;

import com.zavierliu.blog.model.Article;

public interface ArticleMapper {

    // int insertSelective(Article article);
    //
    // int updateById(Article article);
    //
    // int updateByIdSelective(Article article);

    Article selectById(int id);

    List<Article> selectByParam(Article article);

    // int deleteById(Integer id);

}