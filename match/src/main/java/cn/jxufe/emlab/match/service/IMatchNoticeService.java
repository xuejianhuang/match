package cn.jxufe.emlab.match.service;


import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchNotice;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchNoticeService  extends IBaseDao<MatchNotice>{
	
	public void getMatchNoticeByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	public void txSaveMatchNotice(Operator oper,MatchNotice matchNotice);
	public void txDeleteMatchNotice(Operator oper,String[] idList);
	public void txUpdateMatchNotice(Operator oper,MatchNotice matchNotice,String id);
		
}
