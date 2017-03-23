package cn.jxufe.emlab.match.controller;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.Syslog;
import cn.jxufe.emlab.match.service.ISyslogService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;




public class SyslogAction extends BaseAction{
	private ISyslogService syslogService;
	private Syslog syslog;
	private String userId;
	private String name;
	private String comment;
	private Timestamp startTime;
	private Timestamp endTime;
	private int rows;
	private int page;
	
	public String getSyslog() throws IOException
	{
		Map<String, Object> session = this.getSession();
		Operator operator=(Operator)session.get(KeyEnum.OPERATOR);
		String status;
		Map jsondata = new HashMap();
		
		if (operator == null)
		{
			jsondata.put(KeyEnum.STATUS,StatusEnum.failed);
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}else{
			try{
				syslogService.getSyslogByCondition(jsondata,userId, name, comment, startTime, endTime, rows, page);
				jsondata.put(KeyEnum.STATUS,StatusEnum.success);
			}catch(Exception e){
				e.printStackTrace();
				jsondata.put(KeyEnum.STATUS,StatusEnum.failed);
				jsondata.put(KeyEnum.REASON,"数据读取异常");
			}
			
		}
		jsonViewIE(jsondata);
		return null;
	}

	public ISyslogService getSyslogService() {
		return syslogService;
	}

	public void setSyslogService(ISyslogService syslogService) {
		this.syslogService = syslogService;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}


	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setSyslog(Syslog syslog) {
		this.syslog = syslog;
	}

	
}
