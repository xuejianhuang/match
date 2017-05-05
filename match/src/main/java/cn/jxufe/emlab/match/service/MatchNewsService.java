package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MatchNewsService extends BaseDao<MatchNews> implements
		IMatchNewsService {
	/*
	 * 保存赛事新闻(后台管理)
	 */
	@Override
	public void txSaveMatchNews(Operator oper, MatchNews matchNews) {

		matchNews.setId(null);
		matchNews.setStatus(StatusEnum.initialize.ordinal());
		save(matchNews);
		writeLog(oper, "添加", "新闻", matchNews);
	}
	/*
	 * 批量删除赛事新闻
	 */
	@Override
	public void txDeleteMatchNews(Operator operator, String[] idlist) {
		for (String id : idlist) {
			MatchNews matchNews = this.findById(id);
			if (matchNews != null) {
				delete(matchNews);
				writeLog(operator, "删除", "新闻", matchNews);
			}
		}
	}
	/*
	 * 更新赛事新闻
	 */
	@Override
	public void txUpdateMatchNews(Operator oper, MatchNews matchNews, String id) {

		matchNews.setId(id);
		saveOrUpdate(matchNews);
		writeLog(oper, "修改", "新闻", matchNews);
	}
	/*
	 * 分页查询某个赛事下的新闻
	 */
	@Override
	public void getMatchNewsByPage(Map map, int page, int pageSize, String matchId,
			Operator oper) {
	    List<Object> values = new ArrayList<Object>();
		String hql="from MatchNews where  status!="
				+ StatusEnum.disable.ordinal() ;
		if(null!=matchId&&matchId.length()!=0){
		
			hql+=" and matchId = ? ";
			values.add(matchId);
		}
		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, values, page, pageSize);
	}
	/*
	 * 更加id查询赛事新闻
	 */
	public MatchNews getMatchNewsById(String id)
	{
		return findById(id);
	}

	

}
