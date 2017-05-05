package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.map.ObjectMapper;
import cn.jxufe.emlab.match.poi.ExcelUtil;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public abstract class BaseAction extends ActionSupport
{

	private static final long serialVersionUID = 1L;
	protected String forwardUrl;
	private String pageURL;
	private static final DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@SuppressWarnings("rawtypes")
	protected Map getSession()
	{
		return ActionContext.getContext().getSession();
	}

	protected HttpServletRequest getRequest()
	{
		return (HttpServletRequest) ActionContext.getContext().get(
				ServletActionContext.HTTP_REQUEST);
	}

	protected HttpServletResponse getResponse()
	{
		return (HttpServletResponse) ActionContext.getContext().get(
				ServletActionContext.HTTP_RESPONSE);
	}

	public void setPageURL(String page)
	{
		this.pageURL = page;
	}

	public String getPageURL()
	{
		return pageURL;
	}

	public String goPage()
	{
		forwardUrl = pageURL;
		return "forwardURL";
	}

	public String getForwardUrl()
	{
		return forwardUrl;
	}

	public void setForwardUrl(String forwardUrl)
	{
		this.forwardUrl = forwardUrl;
	}

	public String execute()
	{
		return SUCCESS;
	}

	protected void jsonView(Object o) throws IOException
	{
		getResponse().setContentType("application/json;charset=utf-8");
		PrintWriter writer = ServletActionContext.getResponse().getWriter();
		ObjectMapper mapper = new ObjectMapper();
		mapper.getSerializationConfig().setDateFormat(format);
		mapper.writeValue(writer, o);
	}
	protected  void exportExcel(ExcelUtil util,List list,String fileName) throws IOException
	{
		if(null!=util&&list!=null)
		{
		HttpServletResponse response=getResponse();
		OutputStream os=response.getOutputStream();
		response.reset();// 清空输出流        
	    response.setHeader("Content-disposition", "attachment; filename="+ new String(fileName.getBytes("GB2312"),"ISO8859-1"));   // 设定输出文件头        
	    response.setContentType("application/msexcel");// 定义输出类型   
	     util.exportExcel(list, fileName, 65536, os);// 导出
		}
	}
	protected void jsonViewIE(Object o) throws IOException
	{
		getResponse().setContentType("text/html;charset=utf-8");
		PrintWriter writer = ServletActionContext.getResponse().getWriter();
		ObjectMapper mapper = new ObjectMapper();
		mapper.getSerializationConfig().setDateFormat(format);
		mapper.writeValue(writer, o);
	}
	protected void testView(Object o) throws IOException
	{
		getResponse().setContentType("text/plain;charset=UTF-8");
		//getResponse().setContentType("application/json;charset=UTF-8"); 
		PrintWriter writer = ServletActionContext.getResponse().getWriter();
		ObjectMapper mapper = new ObjectMapper();
		mapper.getSerializationConfig().setDateFormat(format);
	}

	protected void returnResponseText(String text) throws IOException
	{
		HttpServletResponse response=getResponse();
		 response.setHeader("pragma","no-cache");
		  response.setHeader("cache-control","no-cache");
		//response.setContentType("text/plain;charset=UTF-8");
		PrintWriter out=response.getWriter();
		out.write(text);
		out.flush();
		out.close();
	}

}
