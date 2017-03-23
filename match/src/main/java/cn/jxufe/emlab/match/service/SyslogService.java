package cn.jxufe.emlab.match.service;

import java.sql.Timestamp;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Syslog;



public class SyslogService extends BaseDao<Syslog> implements ISyslogService {
	public void getSyslogByCondition(Map map,String userId,String name,String comment,Timestamp startTime,Timestamp endTime,int pageSize,int pageNum)
	{		
		String sql="";
		if(startTime!=null && endTime!=null)
			sql="from Syslog where createtime >= '"+startTime+"' and createtime <='"+endTime+"' ";
		else if(startTime!=null)
			sql="from Syslog where createtime >= '"+startTime+"' ";
		else if(endTime!=null)
			sql="from Syslog where createtime <='"+endTime+"' ";
		else
			sql="from Syslog where 1=1";
		if(userId!=null){
			if(!userId.equals(""))
				sql = sql+"and userId like '%"+userId+"%' ";
		}
		if(name!=null){
			if(!name.equals(""))
				sql = sql+"and name like '%"+name+"%' ";
		}
		if(comment!=null){
			if(!comment.equals(""))
				sql = sql+"and comment like '%"+comment+"%' ";
		}
		sql = sql + " order by createtime desc";
//		List<Syslog> syslogList=findByPage(sql,null,(pageNum-1)*pageSize,pageSize);
		fillPagetoMap(map, sql, null, pageNum, pageSize);
	}

}
