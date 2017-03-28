package cn.jxufe.emlab.match.service;

import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class MatchNewsService extends BaseDao<MatchNews> implements
		IMatchNewsService {
	@Override
	public void txSaveMatchNews(Operator oper, MatchNews matchNews) {

		matchNews.setId(null);
		matchNews.setStatus(StatusEnum.initialize.ordinal());
		save(matchNews);
		writeLog(oper, "添加", "新闻", matchNews);
	}

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

	@Override
	public void txUpdateMatchNews(Operator oper, MatchNews matchNews, String id) {

		matchNews.setId(id);
		saveOrUpdate(matchNews);
		writeLog(oper, "修改", "新闻", matchNews);
	}

	@Override
	public void getMatchNewsByPage(Map map, int page, int pageSize, String matchId,
			Operator oper) {
		String hql="from MatchNews ";
		if(null!=matchId&&matchId.length()!=0){
		
			hql+=" where matchId = '"+matchId+"' ";
		}
		
		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, null, page, pageSize);
	}

}
