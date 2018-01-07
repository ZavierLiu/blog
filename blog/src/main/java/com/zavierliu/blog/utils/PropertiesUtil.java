package com.zavierliu.blog.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Properties文件加载工具类
 * @project：blog   
 * @className：PropertiesUtil      
 * @author：Zavier Liu    
 * @date：2017年11月12日 上午12:00:40    
 * @version
 */
public class PropertiesUtil {

    private static Log log = LogFactory.getLog(PropertiesUtil.class);

    /**
    * 以特定编码格式加载Properties文件
    * @title:getProperties 
    * @param obj
    * @param fileName
    * @param charsetName
    * @return Properties        
    * @Exception
    */
    public static Properties getProperties(Class<Object> obj, String fileName, String charsetName) {
        Properties properties = new Properties();
        InputStream inputStream = obj.getClassLoader().getResourceAsStream(fileName);
        try {
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, charsetName);
            properties.load(inputStreamReader);
            return properties;
        }
        catch (UnsupportedEncodingException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            return null;
        }
        catch (IOException e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            return null;
        }
        catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(e);
            }
            return null;
        }
        finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                }
                catch (IOException e) {
                    if (log.isErrorEnabled()) {
                        log.error(e);
                    }
                }
                catch (Exception e) {
                    if (log.isErrorEnabled()) {
                        log.error(e);
                    }
                }
            }
        }
    }

    /**
     * 以默认编码格式utf-8加载Properties文件
     * @title:getProperties 
     * @param obj
     * @param fileName
     * @return Properties        
     * @Exception
     */
    public static Properties getProperties(Class<Object> obj, String fileName) {
        return getProperties(obj, fileName, "UTF-8");
    }

}
