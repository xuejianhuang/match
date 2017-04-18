package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
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
	public Group teamMatchProjectBuildGroup(String buildMemberId,
			String matchProjectId, String caption) {
		if (null != buildMemberId && matchProjectId != null) {
			String sql = "select * from T_group where status!="
					+ StatusEnum.disable.ordinal() + " and buildMemberId='"
					+ buildMemberId + "' and matchProjectId='" + matchProjectId
					+ "'";
			List<Group> list = findSQL(sql);
			if (null == list || list.size() == 0) {
				Group group = new Group();
				group.setBuildMemberId(buildMemberId);
				group.setCaption(caption);
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
			String matchProjectId, String buildMemberName, String caption) {

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
			if (null != group) {
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

	public IMatchProjectService getMatchProjectService() {
		return matchProjectService;
	}

	public void setMatchProjectService(IMatchProjectService matchProjectService) {
		this.matchProjectService = matchProjectService;
	}

}
