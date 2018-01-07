package com.zavierliu.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NavControl {

    @RequestMapping({ "article/", "article" })
    public String article() {
        return "article/list";
    }
}
