package cn.jxufe.emlab.match.service;

import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchNotice;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class MatchNoticeService extends BaseDao<MatchNotice> implements
		IMatchNoticeService {
	@Override
	public void txSaveMatchNotice(Operator oper, MatchNotice matchNotice) {

		matchNotice.setId(null);
		matchNotice.setStatus(StatusEnum.initialize.ordinal());
		save(matchNotice);
		writeLog(oper, "添加", "通知", matchNotice);
	}

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

	@Override
	public void txUpdateMatchNotice(Operator oper, MatchNotice matchNotice, String id) {

		matchNotice.setId(id);
		saveOrUpdate(matchNotice);
		writeLog(oper, "修改", "通知", matchNotice);
	}

	@Override
	public void getMatchNoticeByPage(Map map, int page, int pageSize, String matchId,
			Operator oper) {
		String hql="from MatchNotice ";
		if(null!=matchId&&matchId.length()!=0){
		
			hql+=" where matchId = '"+matchId+"' ";
		}
		
		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, null, page, pageSize);
	}

}
