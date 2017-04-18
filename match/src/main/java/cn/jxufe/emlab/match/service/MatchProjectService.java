package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;






import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class MatchProjectService extends BaseDao<MatchProject> implements
		IMatchProjectService {
	private IMemberService memberService;

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
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from MatchProject  where  status!="
				+ StatusEnum.disable.ordinal();
		if (matchId != null && matchId.length() != 0) {

			hql += " and matchId = ? ";
			al.add(matchId);
		}

		hql = hql + " order by createtime desc";
		return find(hql, al);
	}

	public List<MatchProject> getEnableMatchProject() {
		String hql = "from MatchProject where  isLocked='0' order by createtime desc";
		return find(hql);
	}

	public List<MatchProject> getMatchProjectByMemberId(String memberId) {
		List<MatchProject> list = new ArrayList<MatchProject>();
		Member member = memberService.findById(memberId);
		if (null != member) {
			Set<Group> groups = member.getGroups();
			for (Group group : groups) {
				list.add(group.getMatchProject());
			}
			Collections.sort(list, new Comparator() {

				@Override
				public int compare(Object o1, Object o2) {
					MatchProject m1=(MatchProject) o1;
					MatchProject m2=(MatchProject) o2;
					if(m1.getCreatetime().after(m2.getCreatetime()))
					{
						return -1;
					}
					else
					{
						return 1;
					}
					// TODO Auto-generated method stub
				}
			});
		}
		return list;
	}

	public IMemberService getMemberService() {
		return memberService;
	}

	public void setMemberService(IMemberService memberService) {
		this.memberService = memberService;
	}

}
