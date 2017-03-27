package cn.jxufe.emlab.match.util;


import java.util.Calendar;
import java.util.Date;

public class Encrypt
{
	public static String encryptPassword(String password)
	{
		Md5 md5 = new Md5();
		md5.Md5(password);
		password = md5.compute(); // Md5加密
		return password;
	}
	public static void main(String[] args)
	{
		Date d=new Date();
		System.out.println(d.getYear());
		Calendar cal=	Calendar.getInstance();
				cal.setTime(d);
		System.out.println(cal.get(Calendar.YEAR));

		String str=encryptPassword("123");
		System.out.println(str);
		System.out.println(StatusEnum.disable.ordinal());
	}


}
