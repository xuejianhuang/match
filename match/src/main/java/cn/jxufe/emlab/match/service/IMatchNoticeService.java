package cn.jxufe.emlab.match.service;


import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.MatchNotice;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchNoticeService  extends IBaseDao<MatchNotice>{
	/*
	 * 分页查询某个赛事下的通知
	 */
	public void getMatchNoticeByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	/*
	 * 保存赛事通知(后台管理)
	 */
	public void txSaveMatchNotice(Operator oper,MatchNotice matchNotice);
	/*
	 * 批量删除赛事通知(后台管理)
	 */
	public void txDeleteMatchNotice(Operator oper,String[] idList);
	/*
	 * 更新赛事通知(后台管理)
	 */
	public void txUpdateMatchNotice(Operator oper,MatchNotice matchNotice,String id);
	/*
	 * 更加id查询赛事通知
	 */
	public MatchNotice getMatchNoticeById(String id);
		
}
