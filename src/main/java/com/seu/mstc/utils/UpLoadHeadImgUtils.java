package com.seu.mstc.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UpLoadHeadImgUtils {
    private static final Logger logger = LoggerFactory.getLogger(UpLoadHeadImgUtils.class);

    public static String MSTCBLOG_DOMAIN = "http://127.0.0.1/";       //存到数据库的路径
    public static String IMAGE_DIR = "F:\\mstcpic\\";                 //保存图片的路径

    public static String[] IMAGE_FILE_EXTD = new String[] {"png", "bmp", "jpg", "jpeg"};

    public static boolean isFileAllowed(String fileName) {
        for (String ext : IMAGE_FILE_EXTD) {
            if (ext.equals(fileName)) {
                return true;
            }
        }
        return false;
    }
}
