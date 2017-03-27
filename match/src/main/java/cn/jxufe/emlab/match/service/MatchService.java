package cn.jxufe.emlab.match.service;

import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;



@SuppressWarnings("unchecked")
public class MatchService extends BaseDao<Match> implements IMatchService
{
	@Override
	public void txSaveMatch(Operator oper, Match match)
	{
		match.setId(null);
		match.setStatus(StatusEnum.initialize.ordinal());
		match.setYear(DateUtil.getDateYear(match.getHoldtime()));
		save(match);
		writeLog(oper,"添加","赛事",match);
	}
	@Override
	public void txDeleteMatch(Operator operator, String[] idlist)
	{
		for (String id : idlist)
		{
			Match match=this.findById(id);
			if(match!=null)
			{
			delete(match);
			writeLog(operator, "删除", "赛事", match);
			}
			//delete(id);
		}		
	}

	@Override
	public void txUpdateMatch(Operator oper, Match match, String id)
	{
		//findById(id);
		   match.setId(id);
		   match.setYear(DateUtil.getDateYear(match.getHoldtime()));
		   saveOrUpdate(match);
	      writeLog(oper, "修改", "赛事",match);	
	}

	@Override
	public void getMatchByPage(Map map, int page, int pageSize, int year,
			Operator oper) {
		String hql="from Match ";
		if(year>0){
		
			hql+=" where year = '"+year+"' ";
		}
		
		hql = hql + " order by createtime desc";
//		List<Syslog> syslogList=findByPage(sql,null,(pageNum-1)*pageSize,pageSize);
		fillPagetoMap(map, hql, null, page, pageSize);
	}
	public List<Integer> getMatchYear(Operator oper)
	{
		String hql="select year from Match group by year order by year ";
		return publicFind(hql);

	}

}
