package cn.jxufe.emlab.match.core;

import java.sql.Timestamp;
import java.util.Date;

public class Utils {
	public static String getNewUUID(){
		return java.util.UUID.randomUUID().toString();
	}
	
	public static Timestamp getNow(){
		return new Timestamp((new Date()).getTime());
	}
}
