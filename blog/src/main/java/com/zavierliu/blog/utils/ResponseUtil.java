package com.zavierliu.blog.utils;

import java.util.HashMap;
import java.util.Map;

import com.github.pagehelper.Page;

public class ResponseUtil {

    public static <E> Map<String, Object> getResponseMap(Page<E> page) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg", "操作成功");
        map.put("code", 1);
        map.put("total", page.getTotal());
        map.put("rows", page.getResult());
        return map;
    }

    public static Map<String, Object> getResponseMap(Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg", "操作成功");
        map.put("code", 1);
        map.put("data", data);
        return map;
    }

    public static Map<String, Object> getResponseMap(String msg, String code, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg", msg);
        map.put("code", code);
        map.put("data", data);
        return map;
    }
}
