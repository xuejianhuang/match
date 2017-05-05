package cn.jxufe.emlab.match.service;


import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchNewsService  extends IBaseDao<MatchNews>{
	/*
	 * 分页查询某个赛事下的新闻
	 */
	public void getMatchNewsByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	/*
	 * 保存赛事新闻(后台管理)
	 */
	public void txSaveMatchNews(Operator oper,MatchNews matchNews);
	/*
	 * 批量删除赛事新闻(后台管理)
	 */
	public void txDeleteMatchNews(Operator oper,String[] idList);
	/*
	 * 更新赛事新闻(后台管理)
	 */
	public void txUpdateMatchNews(Operator oper,MatchNews matchNews,String id);
	/*
	 * 更加id查询赛事新闻
	 */
	public MatchNews getMatchNewsById(String id);
		
}
