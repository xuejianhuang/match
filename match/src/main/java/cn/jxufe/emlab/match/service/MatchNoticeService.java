package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchNotice;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MatchNoticeService extends BaseDao<MatchNotice> implements
		IMatchNoticeService {
	/*
	 * 保存赛事通知(后台管理)
	 */
	@Override
	public void txSaveMatchNotice(Operator oper, MatchNotice matchNotice) {

		matchNotice.setId(null);
		matchNotice.setStatus(StatusEnum.initialize.ordinal());
		save(matchNotice);
		writeLog(oper, "添加", "通知", matchNotice);
	}
	/*
	 * 批量删除赛事通知(后台管理)
	 */
	@Override
	public void txDeleteMatchNotice(Operator operator, String[] idlist) {
		for (String id : idlist) {
			MatchNotice matchNotice = this.findById(id);
			if (matchNotice != null) {
				delete(matchNotice);
				writeLog(operator, "删除", "通知", matchNotice);
			}
		}
	}
	/*
	 * 更新赛事通知(后台管理)
	 */
	@Override
	public void txUpdateMatchNotice(Operator oper, MatchNotice matchNotice, String id) {

		matchNotice.setId(id);
		saveOrUpdate(matchNotice);
		writeLog(oper, "修改", "通知", matchNotice);
	}
	/*
	 * 分页查询某个赛事下的通知
	 */
	@Override
	public void getMatchNoticeByPage(Map map, int page, int pageSize, String matchId,
			Operator oper) {
		ArrayList<Object> values = new ArrayList<Object>();
		String hql="from MatchNotice  where  status!="
				+ StatusEnum.disable.ordinal() ;
		if(null!=matchId&&matchId.length()!=0){
		
			hql+=" and matchId =? ";
			values.add(matchId);
		}
		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, values, page, pageSize);
	}
	/*
	 * 更加id查询赛事通知
	 */
	public MatchNotice getMatchNoticeById(String id)
	{
		return findById(id);
	}

}
