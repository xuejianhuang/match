package cn.jxufe.emlab.match.util;

import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	public static int getDateYear(Date date)
	{
		Calendar cal=Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.YEAR);
	}

}
