package cn.jxufe.emlab.match.util;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;



import cn.jxufe.emlab.match.poi.ExcelUtil;
import cn.jxufe.emlab.match.pojo.Member;


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
		Member m1=new Member();
		m1.setId("12");
		m1.setAccount("asd@qq.com");
		m1.setPhone("1");
		m1.setName("zhangsan");
		Member m2=new Member();
		m2.setAccount("asd@qq.com");
		m2.setPhone("1234");
		m2.setName("zhangsan");
		List<Member> list=new ArrayList<Member>();
		list.add(m2);
		list.add(m1);
		FileOutputStream out = null;
		try {
			out = new FileOutputStream("d:\\test.xls");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		ExcelUtil<Member> util = new ExcelUtil<Member>(Member.class);// 创建工具类.
		util.exportExcel(list, "学生信息", 65536, out);// 导出
		System.out.println("----执行完毕----------");
		
	}


}
