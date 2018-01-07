package com.zavierliu.blog.utils;

import java.util.Random;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 通用唯一识别码（Universally Unique Identifier）工具类
 * @project：blog   
 * @className：UUIDUtil      
 * @author：Zavier Liu    
 * @date：2017年12月3日 下午2:53:02    
 * @version
 */
public class UUIDUtil {
    static Log log = LogFactory.getLog(UUIDUtil.class);

    /**
    * 生成长度为length的随机数字
    * @title:getRandomNum 
    * @param length
    * @return String        
    * @Exception
    */
    public static String getRandomNum(int length) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    /**
     * 生成长度为length且不含数字的随机字符串
     * @title:getRandomChar 
     * @param length
     * @return String        
     * @Exception
     */
    public static String getRandomChar(int length) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
            sb.append((char) (random.nextInt(26) + temp));
        }
        return sb.toString();
    }

    /**
     * 生成长度为length的随机字符串
     * @title:random 
     * @param length
     * @return String        
     * @Exception
     */
    public static String getRandomStr(int length) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            // 随机选择生成字符还是数字
            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
            if ("char".equalsIgnoreCase(charOrNum)) {
                int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
                sb.append((char) (random.nextInt(26) + temp));
            }
            else
                if ("num".equalsIgnoreCase(charOrNum)) {
                    sb.append(String.valueOf(random.nextInt(10)));
                }
        }
        return sb.toString();
    }
}
