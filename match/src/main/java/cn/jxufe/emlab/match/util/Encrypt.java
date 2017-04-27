package cn.jxufe.emlab.match.util;


import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;










import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.druid.support.json.JSONUtils;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import cn.jxufe.emlab.match.poi.ExcelUtil;
import cn.jxufe.emlab.match.pojo.Member;


public class Encrypt
{
	public static String encryptPassword(String password)
	{
		if(password!=null)
		{
		Md5 md5 = new Md5();
		md5.Md5(password);
		password = md5.compute(); // Md5加密
		}
		return password;
	}
	public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException
	{
		JsonObject obj=new JsonObject();
		obj.addProperty("name", 1);
		obj.addProperty("shcool", "o");
		JsonArray a=new JsonArray();
		a.add(obj);
		System.out.println(a);
		
		String json="{\"account\":\"761780598@qq.com\",\"name\":\"huang\",\"phone\":\"18070496344\"}";
	ObjectMapper mapper=new ObjectMapper();
	Member member=mapper.readValue(json, Member.class);
	System.out.println(member.getAccount());
		
		
	}


}
