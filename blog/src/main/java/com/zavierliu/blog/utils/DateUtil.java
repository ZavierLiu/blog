package com.zavierliu.blog.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 时间日期转换工具
 * @project：blog   
 * @className：DateUtil      
 * @author：Zavier Liu    
 * @date：2017年12月3日 下午2:16:29    
 * @version
 */
public class DateUtil {
    static Log log = LogFactory.getLog(DateUtil.class);

    /**
     * 以默认格式yyyy-MM-dd HH:mm:ss返回当前时间对象
     * @title:getCurrentDate 
     * @return Date        
     * @Exception
     */
    public static Date getCurrentDate() {
        return getCurrentDate("yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 以默认格式yyyy-MM-dd HH:mm:ss返回当前时间字符串
     * @title:getCurrentDateStr 
     * @return String        
     * @Exception
     */
    public static String getCurrentDateStr() {
        return getCurrentDateStr("yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 以固定的格式返回当前时间对象
     * @title:getCurrentDate 
     * @param pattern
     * @return Date        
     * @Exception
     */
    public static Date getCurrentDate(String pattern) {
        return formatDate(new Date(), pattern);
    }

    /**
     * 以固定的格式返回当前时间字符串
     * @title:getCurrentDateStr 
     * @param pattern
     * @return String        
     * @Exception
     */
    public static String getCurrentDateStr(String pattern) {
        return dateToString(new Date(), pattern);
    }

    /**
     * 日期对象转换为固定格式的字符串
     * @title:dateToString 
     * @param date
     * @param pattern
     * @return String        
     * @Exception
     */
    public static String dateToString(Date date, String pattern) {
        return new SimpleDateFormat(pattern).format(date);
    }

    /**
     * 字符串转换为固定格式的日期对象
     * @title:StringToDate 
     * @param source  A String whose beginning should be parsed.
     * @param pattern  the pattern describing the date and time format  
     * @return Date        
     * @Exception
     */
    public static Date StringToDate(String source, String pattern) {
        try {
            return new SimpleDateFormat(pattern).parse(source);
        }
        catch (ParseException e) {
            if (log.isErrorEnabled()) {
                log.error("StringToDate:", e);
            }
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 格式化时间
     * @title:formatDate 
     * @param date
     * @param pattern
     * @return Date        
     * @Exception
     */
    public static Date formatDate(Date date, String pattern) {
        return StringToDate(dateToString(date, pattern), pattern);
    }
}
