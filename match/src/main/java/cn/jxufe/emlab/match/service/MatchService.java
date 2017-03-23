package cn.jxufe.emlab.match.service;

import java.util.Calendar;
import java.util.Collection;
import java.util.Map;

import org.springframework.dao.DataAccessException;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;



@SuppressWarnings("unchecked")
public class MatchService extends BaseDao<Match> implements IMatchService
{
	@Override
	public void txSaveMatch(Operator oper, Match match)
	{
		match.setId(null);
		match.setStatus(StatusEnum.initialize.ordinal());
		save(match);
		writeLog(oper,"添加","赛事",match);
	}


	@Override
	public void getMatchByPage(Map map, int page, int pageSize, int year,
			Operator oper) {
		String hql="from Match ";
		if(year>0){
		
			hql+=" where holdtime > '"+year+"' and holdtime <='"+(year+1)+"' ";
		}
		
		hql = hql + " order by createtime desc";
//		List<Syslog> syslogList=findByPage(sql,null,(pageNum-1)*pageSize,pageSize);
		fillPagetoMap(map, hql, null, page, pageSize);
	}

}
