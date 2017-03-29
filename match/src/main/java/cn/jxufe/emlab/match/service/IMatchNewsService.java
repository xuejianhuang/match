package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchNewsService  extends IBaseDao<MatchNews>{
	
	public void getMatchNewsByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	public void txSaveMatchNews(Operator oper,MatchNews matchNews);
	public void txDeleteMatchNews(Operator oper,String[] idList);
	public void txUpdateMatchNews(Operator oper,MatchNews matchNews,String id);
	
	public MatchNews getMatchNewsById(String id);
		
}
