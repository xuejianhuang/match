package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchService  extends IBaseDao<Match>{
	public void getMatchByPage(Map map,  int page,  int pageSize,int year,Operator oper);
	public void txSaveMatch(Operator oper,Match match);
	public void txDeleteMatch(Operator oper,String[] idList);
	public void txUpdateMatch(Operator oper,Match match,String id);
	public List<Integer> getMatchYear(Operator oper);
	
	public List<NameAndId> getAllMatchNameAndId(Operator oper); 

		
}
