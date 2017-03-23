package cn.jxufe.emlab.match.service;

import java.sql.Timestamp;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Syslog;



public interface ISyslogService extends IBaseDao<Syslog> {
	public void getSyslogByCondition(Map map,String userId,String name,String comment,Timestamp startTime,Timestamp endTime,int pageSize,int pageNum);
}
