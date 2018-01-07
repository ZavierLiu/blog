package com.zavierliu.blog.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Locale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import freemarker.template.Version;

/**
 * Freemarker模板工具类
 * @project：blog   
 * @className：FreeMarkerUtil      
 * @author：Zavier Liu    
 * @date：2017年12月3日 下午10:24:47    
 * @version
 */
public class FreeMarkerUtil {
    private static Log log = LogFactory.getLog(FreeMarkerUtil.class);

    // 使用的FreeMarker版本
    private final static Version VERSON = Configuration.VERSION_2_3_27;

    // 默认路径
    private final static String BASE_PACKAGE_PATH = "/template";

    /**
     * 从默认路径获取模板文件
     * @title:getTemplate 
     * @param name
     * @return Template        
     * @Exception
     */
    public static Template getTemplate(String name) {
        return getTemplate(BASE_PACKAGE_PATH, name);
    }

    /**
     * 获取模板文件
     * @title:getTemplate 
     * @param basePackagePath 模板所在路径
     * @param name 模板名称
     * @return Template        
     * @Exception
     */
    public static Template getTemplate(String basePackagePath, String name) {
        try {
            Configuration config = new Configuration(VERSON);
            config.setOutputEncoding("UTF-8");
            config.setDefaultEncoding("UTF-8");
            config.setEncoding(Locale.CHINA, "UTF-8");
            config.setClassForTemplateLoading(FreeMarkerUtil.class, basePackagePath);
            Template template = config.getTemplate(name);
            return template;
        }
        catch (TemplateNotFoundException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
        catch (MalformedTemplateNameException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
        catch (ParseException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
        catch (IOException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
        return null;
    }

    /**
    * 生成html静态文件
    * @title:createHtml 
    * @param templateName 模板名称
    * @param dataModel 数据模型
    * @param htmlPath 生成的html路径
    * @param htmlName 生成的html名称
    * @return void        
    * @Exception
    */
    public static void createHtml(String templateName, Object dataModel, String htmlPath, String htmlName) {
        Template template = getTemplate(templateName);
        try (FileWriter out = new FileWriter(new File(htmlPath + File.separator + htmlName));) {
            template.process(dataModel, out);
        }
        catch (IOException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
        catch (TemplateException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            e.printStackTrace();
        }
    }

}
