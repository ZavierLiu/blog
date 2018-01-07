package com.zavierliu.blog.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.zavierliu.blog.model.Article;
import com.zavierliu.blog.service.IArticleService;
import com.zavierliu.blog.utils.ResponseUtil;

/**
 * 文章Controller
 * @project：blog   
 * @className：ArticleController      
 * @author：Zavier Liu    
 * @date：2017年12月3日 下午3:27:31    
 * @version
 */
@Controller
@RequestMapping("/api/article")
public class ArticleController {

    @Autowired
    private IArticleService articleService;

    /**
     * 获取文章分页列表
     * @title:getPages 
     * @return Map<String,Object>        
     * @Exception
     */
    @ResponseBody
    @RequestMapping(value = "page")
    public Map<String, Object> getPages(@RequestParam(value = "pageNum", required = false) int pageNum,
            @RequestParam(value = "pageSize", required = false) int pageSize) {
        Page<Article> articles = articleService.getPage(null, pageNum, pageSize);
        return ResponseUtil.getResponseMap(articles);
    }
}
