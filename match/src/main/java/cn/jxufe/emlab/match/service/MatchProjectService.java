package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class MatchProjectService extends BaseDao<MatchProject> implements
		IMatchProjectService {
	@Override
	public boolean txSaveMatchProject(Operator oper, MatchProject matchProject) {
		if (matchProject != null) {
			if (DateUtil.validateDateOrder(matchProject.getStartDate(),
					matchProject.getEndDate())) {
				matchProject.setId(null);
				matchProject.setStatus(StatusEnum.initialize.ordinal());
				save(matchProject);
				writeLog(oper, "添加", "赛项", matchProject);
				return true;
			}
		}
		return false;
	}

	@Override
	public void txDeleteMatchProject(Operator operator, String[] idlist) {
		for (String id : idlist) {
			MatchProject matchProject = this.findById(id);
			if (matchProject != null) {
				delete(matchProject);
				writeLog(operator, "删除", "赛项", matchProject);
			}
			// delete(id);
		}
	}

	@Override
	public boolean txUpdateMatchProject(Operator oper,
			MatchProject matchProject, String id) {

		if (matchProject != null) {
			if (DateUtil.validateDateOrder(matchProject.getStartDate(),
					matchProject.getEndDate())) {
				matchProject.setId(id);
				saveOrUpdate(matchProject);
				writeLog(oper, "修改", "赛项", matchProject);
				return true;
			}
		}
		return false;
	}

	public void txUpdateMatchProjectIsLockedStatus(Operator oper, String id,
			int isLocked) {
		MatchProject matchProject = findById(id);
		if (null != matchProject) {
			matchProject.setIsLocked(isLocked);
		}
	}

	@Override
	public List<MatchProject> getMatchProjectByMatchId(String matchId,
			Operator oper) {
		int paramNums = 0;
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from MatchProject  where  status!="
				+ StatusEnum.disable.ordinal() ;
		if (matchId != null && matchId.length() != 0) {

			hql += " and matchId = ? ";
			al.add(matchId);
			paramNums++;
		}

		hql = hql + " order by createtime desc";
		Object[] values = (Object[]) al.toArray(new Object[paramNums]);
		return find(hql,values);
	}
	
	public List<MatchProject> getEnableMatchProject() {
		String hql = "from MatchProject where  isLocked='0' order by createtime desc";
		return find(hql);
	}

}
