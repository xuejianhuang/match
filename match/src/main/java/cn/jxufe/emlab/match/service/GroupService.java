package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.MemberVO;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class GroupService extends BaseDao<Group> implements IGroupService {

	private IMatchProjectService matchProjectService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * cn.jxufe.emlab.match.service.IGroupService#individualMatchProjectBuildGroup
	 * (java.lang.String, java.lang.String) 参加个人赛时建立个人小组
	 */
	@Override
	public Group individualMatchProjectBuildGroup(String buildMemberId,
			String matchProjectId) {
		if (null != buildMemberId && matchProjectId != null) {
			String sql = "select * from T_group where status!="
					+ StatusEnum.disable.ordinal() + " and buildMemberId='"
					+ buildMemberId + "' and matchProjectId='" + matchProjectId
					+ "'";
			List<Group> list = findSQL(sql);
			if (null == list || list.size() == 0) {
				Group group = new Group();
				group.setBuildMemberId(buildMemberId);
				MatchProject matchProject = matchProjectService
						.findById(matchProjectId);
				if (matchProject != null) {
					group.setMatchProject(matchProject);
				}
				save(group);
				return group;
			}
		}
		return null;
	}

	/*
	 * 团队比赛项创建组buildMemberId 创建者idmatchProjectId 参加的赛项idcaption 团队名称
	 */
	public boolean teamMatchProjectBuildGroup(String buildMemberId,
			String matchProjectId, Group group) {
		if (null != buildMemberId && matchProjectId != null) {
			String sql = "select * from T_group where status!="
					+ StatusEnum.disable.ordinal() + " and buildMemberId='"
					+ buildMemberId + "' and matchProjectId='" + matchProjectId
					+ "'";
			List<Group> list = findSQL(sql);
			if (null == list || list.size() == 0) {
				// Group group = new Group();
				group.setBuildMemberId(buildMemberId);
				// group.setCaption(caption);
				MatchProject matchProject = matchProjectService
						.findById(matchProjectId);
				if (matchProject != null) {
					group.setMatchProject(matchProject);
				}
				save(group);
				return true;
			}
		}
		return false;
	}

	public Group getTeamMatchProjectGroup(String memberId, String matchProjectId) {
		if (null != memberId && matchProjectId != null) {
			String sql = "select * from T_group where status!="
					+ StatusEnum.disable.ordinal()
					+ " and id in( select groupId from T_memberGroup where memberId='"
					+ memberId + "') and matchProjectId='" + matchProjectId
					+ "'";
			List<Group> list = findSQL(sql);
			if (null != list && list.size() != 0) {
				return list.get(0);
			}
		}
		return null;
	}

	public void getGroupByConditions(Map map, int page, int pageSize,
			String tutor, String matchProjectId, String buildMemberName,
			String caption) {

		ArrayList<Object> al = new ArrayList<Object>();
		String sql = "select * from T_group where  status!="
				+ StatusEnum.disable.ordinal();
		if (matchProjectId != null && matchProjectId.length() != 0) {
			sql += " and matchProjectId=?";
			al.add(matchProjectId);

		}
		if (null != caption && caption.length() != 0) {
			sql += " and caption like ?";
			al.add("%" + caption + "%");
		}
		if (null != buildMemberName && buildMemberName.length() != 0) {
			sql += " and buildMemberId in( select id from T_Member where name like ?)";
			al.add("%" + buildMemberName + "%");
		}
		if (null != tutor && tutor.length() != 0) {
			sql += " and (tutor1 like ? or tutor2 like ?)";
			al.add("%" + tutor + "%");
			al.add("%" + tutor + "%");
		}

		int groupMemberCount = 0;
		MatchProject matchProject = matchProjectService
				.findById(matchProjectId);
		if (matchProject != null) {
			groupMemberCount = matchProject.getGroupMemberCount();
		}
		List<Group> groups = fillPagetoMapSQL(map, sql, al, page, pageSize);
		if (groups != null) {
			for (Group group : groups) {
				if (group.getMembers().size() < groupMemberCount) // 根据小组已申请人数判断是否人数已满(注意：是申请人数，不是通过人数)
				{
					group.setFull(false);
				} else {
					group.setFull(true);
				}
			}
		}
	}

	public boolean txDeleteGroupMember(Member operMember, String memberId,
			String groupId) {
		if (groupId != null) {
			Group group = findById(groupId);
			if (null != group && group.getMatchProject().getIsLocked() == 0) {
				if (group.getBuildMemberId().equals(operMember.getId())) {
					Set<Member> set = group.getMembers();
					for (Member m : set) {
						if (m.getId().equals(memberId)) {
							set.remove(m);
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	public List<Group> getMatchProjectGroupList(String tutor1, String tutor2,
			String matchProjectId, String groupName, String prize, Operator oper) {
		ArrayList<Object> values = new ArrayList<Object>();
		String hql = "from Group where status!=" + StatusEnum.disable.ordinal();
		if (null != matchProjectId && matchProjectId.length() != 0) {
			hql += " and matchProjectId=?";
			values.add(matchProjectId);
		}

		if (null != groupName && groupName.length() != 0) {
			hql += " and caption like ?";
			values.add("%" + groupName + "%");
		}
		if (null != tutor1 && tutor1.length() != 0) {
			hql += " and tutor1 like ?";
			values.add("%" + tutor1 + "%");
		}
		if (null != tutor2 && tutor2.length() != 0) {
			hql += " and tutor2 like ?";
			values.add("%" + tutor2 + "%");
		}
		if (null != prize && prize.length() != 0) {
			hql += " and prize=?";
			values.add(prize);
		}
		List<Group> groupList = find(hql, values);

		return groupList;

	}

	public boolean txUpdateGroup(Group group) {
		if (group != null && group.getId() != null) {
			Group nativeGroup = findById(group.getId());
			if (nativeGroup.getMatchProject().getIsLocked() == 0) {
				nativeGroup.setCaption(group.getCaption());
				nativeGroup.setTutor1(group.getTutor1());
				nativeGroup.setTutor2(group.getTutor2());
				nativeGroup.setTutorPhone1(group.getTutorPhone1());
				nativeGroup.setTutorPhone2(group.getTutorPhone2());
				nativeGroup.setTutorTitle1(group.getTutorTitle1());
				nativeGroup.setTutorTitle2(group.getTutorTitle2());
				return true;
			}
		}
		return false;
	}

	public void setGroupPrize(String groupId, String prize) {
		Group g = findById(groupId);
		if (null != g) {
			g.setPrize(prize);
		}
	}

	public IMatchProjectService getMatchProjectService() {
		return matchProjectService;
	}

	public void setMatchProjectService(IMatchProjectService matchProjectService) {
		this.matchProjectService = matchProjectService;
	}

}
