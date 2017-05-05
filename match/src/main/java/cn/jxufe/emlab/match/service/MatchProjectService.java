package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MatchProjectService extends BaseDao<MatchProject> implements
		IMatchProjectService {
	private IMemberService memberService;
	/*
	 * 添加赛项
	 */
	@Override
	public boolean txSaveMatchProject(Operator oper, MatchProject matchProject) {
		if (matchProject != null) {
			if (DateUtil.validateDateOrder(matchProject.getStartDate(),
					matchProject.getEndDate())) {//验证比赛开始时间是否在结束时间之前
				matchProject.setId(null);
				matchProject.setStatus(StatusEnum.initialize.ordinal());
				save(matchProject);
				writeLog(oper, "添加", "赛项", matchProject);
				return true;
			}
		}
		return false;
	}
	/*
	 * 批量删除赛项
	 */
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
	/*
	 * 更新赛项
	 */
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
	/*
	 * 修改赛项是否锁定
	 */
	public void txUpdateMatchProjectIsLockedStatus(Operator oper, String id,
			int isLocked) {
		MatchProject matchProject = findById(id);
		if (null != matchProject) {
			matchProject.setIsLocked(isLocked);
		}
	}
	/*
	 * 获得某个赛事下的所有赛项
	 */
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
	/*
	 * 统计赛项的报名情况(人数，组数)
	 */
	public JsonArray getMatchProjectMemberNumAndGroupNum(String matchId,
			Operator oper) {
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from MatchProject  where  status!="
				+ StatusEnum.disable.ordinal();
		if (matchId != null && matchId.length() != 0) {

			hql += " and matchId = ? ";
			al.add(matchId);
		}

		hql = hql + " order by createtime desc";
		List<MatchProject> list = find(hql, al);
		JsonArray jsonArray = new JsonArray();
		for (MatchProject matchProject : list) {
			int memberSum = 0;
			Set<Group> set = matchProject.getGroups();
			for (Group g : set) {
				memberSum += g.getMembers().size();
			}
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("matchProjectCaption",
					matchProject.getCaption());
			jsonObject.addProperty("groupNum", set.size());
			jsonObject.addProperty("memberNum", memberSum);
			jsonArray.add(jsonObject);
		}
		return jsonArray;
	}
	/*
	 * 查询所有可以报名的赛项
	 */
	public List<MatchProject> getEnableMatchProject() {
		String hql = "from MatchProject where  isLocked='0' order by createtime desc";
		return find(hql);
	}
	/*
	 * 查询所有的赛项
	 */
	public void getAttendMatchProject(Map map, int page,  int pageSize) {
		
		String hql = "from MatchProject where  status!="
				+ StatusEnum.disable.ordinal() ;
		hql = hql + " order by isLocked, createtime desc";//根据是否报名结束和创建时间排序
	    fillPagetoMap(map, hql,null, page, pageSize);
	}
	/*
	 * 查询某个人参加的所有赛项
	 */
	public List<MatchProject> getMatchProjectByMemberId(String memberId) {
		List<MatchProject> list = new ArrayList<MatchProject>();
		Member member = memberService.findById(memberId);
		if (null != member) {
			Set<Group> groups = member.getGroups();
			for (Group group : groups) {
				list.add(group.getMatchProject());
			}
			Collections.sort(list, new Comparator<MatchProject>() { //对查询结果根据createtime排序
				public int compare(MatchProject m1, MatchProject m2) {
					if (m1.getCreatetime().after(m2.getCreatetime())) {
						return -1;
					} else {
						return 1;
					}
				}
			});
		}
		return list;
	}
	/*
	 * 统计赛项的报名情况
	 */
	public void getMatchProjectMemberStatisticsByPage(Map map, int page,
			int pageSize, String matchId, Operator oper) {
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from MatchProject where  status!="
				+ StatusEnum.disable.ordinal();
		if (null != matchId && matchId.length() != 0) {
			hql += " and matchId=?";
			al.add(matchId);

		}
		hql = hql + " order by createtime desc";
		List<MatchProject> list = fillPagetoMap(map, hql, al, page, pageSize);
		for (MatchProject item : list) {
			Set<Group> set = item.getGroups();
			int memberSum = 0; //总共报名人数
			item.setGroupSum(set.size());
			for (Group g : set) {
				memberSum += g.getMembers().size();
			}
			item.setMemberSum(memberSum);

		}
	}

	public IMemberService getMemberService() {
		return memberService;
	}

	public void setMemberService(IMemberService memberService) {
		this.memberService = memberService;
	}

}
