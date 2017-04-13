package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MemberService extends BaseDao<Member> implements IMemberService {
	private ITrainItemService trainItemService;
	private IGroupService groupService;

	@Override
	public Member verifyMember(String account, String password) {
		password = Encrypt.encryptPassword(password);
		List<Object> values = new ArrayList<Object>();
		values.add(account);
		values.add(password);
		Member member = (Member) uniqueResult(
				"from Member where account=? and password=?", values);

		return member;
	}

	@Override
	public void getMemberByPage(Map map, int page, int pageSize,
			String account, String name, String school, String major,
			Operator oper) {

		String hql = "from Member where  status!="
				+ StatusEnum.disable.ordinal();
		ArrayList<Object> values = new ArrayList<Object>();
		if (null != name && name.length() != 0) {
			hql += " and name like ?";
			values.add("%" + name + "%");
		}

		if (null != account && account.length() != 0) {
			hql += " and account = ?";
			values.add(account);
		}
		if (null != school && school.length() != 0) {
			hql += " and school like ?";
			values.add("%" + school + "%");
		}
		if (null != major && major.length() != 0) {
			hql += " and major like ?";
			values.add("%" + major + "%");
		}
		fillPagetoMap(map, hql, values, page, pageSize);

	}

	public List<Member> getTrainMemberList(String account, String name,
			String school, String major, String trainItemId, Operator oper) {
		ArrayList<Object> values = new ArrayList<Object>();

		String sql = "select * from T_member where status!="
				+ StatusEnum.disable.ordinal(); // id in( select memberId from
												// T_trainMember where
												// trainItemId='b7574d5a-2a21-45e9-bf80-fc6e1febb2ee')

		if (null != account && account.length() != 0) {
			sql += " and account=?";
			values.add(account);
		}

		if (null != name && name.length() != 0) {
			sql += " and name like ?";
			values.add("%" + name + "%");
		}
		if (null != school && school.length() != 0) {
			sql += " and school like ?";
			values.add("%" + school + "%");

		}
		if (null != major && major.length() != 0) {
			sql += " and major like ?";
			values.add("%" + major + "%");
		}
		if (null != trainItemId && trainItemId.length() != 0) {
			sql += " and id in( select memberId from T_trainMember where trainItemId=?)";
			values.add(trainItemId);
		}
		return findSQL(sql, values);
	}

	@Override
	public int txSave(Member member) {
		int value = 0; // 标示保存操作是否成功。1为成功，0为失败
		member.setId(null);
		member.setStatus(StatusEnum.initialize.ordinal());
		String password = member.getPassword().toString();
		member.setPassword(Encrypt.encryptPassword(password));

		if (!checkAccountWhetherExist(member.getAccount(), member.getId())) {

			save(member);
			value = 1;
		}
		return value;
	}

	@Override
	public void txDel(Operator operator, String[] idlist) {
		for (String id : idlist) {
			Member member = this.findById(id);
			delete(member);
			writeLog(operator, "删除", "会员", member);
		}
	}

	@Override
	public boolean txUpdate(Member member, String id) {
		Member nativeMember = findById(id);
		if (!checkAccountWhetherExist(member.getAccount(), id)) {
			nativeMember.setPassword(Encrypt.encryptPassword(member
					.getPassword()));
			nativeMember.setAccount(member.getAccount());
			nativeMember.setName(member.getName());
			nativeMember.setPhone(member.getPhone());
			nativeMember.setIsJxufe(member.getIsJxufe());
			nativeMember.setProfession(member.getProfession());
			nativeMember.setSchool(member.getSchool());
			nativeMember.setMajor(member.getMajor());
			// saveOrUpdate(nativeMember);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Member txMemberUpdate(Member member, String id) {
		Member nativeMember = findById(id);
		if (null != nativeMember && member != null) {
			nativeMember.setName(member.getName());
			nativeMember.setPhone(member.getPhone());
			nativeMember.setMajor(member.getMajor());
			if (member.getPassword() != null
					&& member.getPassword().length() != 0) {
				nativeMember.setPassword(member.getPassword());
			}
			return nativeMember;
		} else {
			return member;
		}
	}

	private boolean checkAccountWhetherExist(String account, String id) {

		List<Object> values = new ArrayList<Object>();
		values.add(account);
		values.add(id);
		long oper_flag = getCount("select count(*) from Member where  status!="
				+ StatusEnum.disable.ordinal() + " and account=? and id!=?",
				values);
		if (oper_flag == 0) {
			return false;
		} else {
			return true;
		}

	}

	public boolean txAttendTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			Member memeber = findById(memeberId);
			if (!memeber.getTrainItems().contains(item)) {
				memeber.getTrainItems().add(item);
				saveOrUpdate(memeber);
				return true;
			}
		}
		return false;
	}

	public boolean txAttendIndividualMatchProject(String memeberId,
			String matchProjectId) {
		if (memeberId != null && null != matchProjectId) {
			Group group = groupService.individualMatchProjectBuildGroup(
					memeberId, matchProjectId);
			if (group != null) {
				Member memeber = findById(memeberId);
				if (!memeber.getGroups().contains(group)) {
//					executeQuery("insert into T_memberGroup (groupId,memberId,status) values('"
//							+ group.getId()
//							+ "','"
//							+ memeberId
//							+ "',"
//							+ StatusEnum.enable.ordinal() + ")");
					memeber.getGroups().add(group);
					// saveOrUpdate(memeber);
					return true;
				}
			}
		}
		return false;
	}

	public boolean txBuildTeamMatchProjectGroup(String memeberId,
			String matchProjectId, String caption) {
		if (memeberId != null && null != matchProjectId) {
			Group group = groupService.teamMatchProjectBuildGroup(memeberId,
					matchProjectId, caption);
			Member member = findById(memeberId);
			if (member != null && null != group) {
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) {
						groupService.delete(group);
						return false;
					}
				}
//					executeQuery("insert into T_memberGroup (groupId,memberId,status) values('"
//							+ group.getId()
//							+ "','"
//							+ memeberId
//							+ "',"
//							+ StatusEnum.enable.ordinal() + ")");
					member.getGroups().add(group);
					return true;
			}
		}
		return false;

	}
/*
 * (non-Javadoc)
 * @see cn.jxufe.emlab.match.service.IMemberService#txAttendGroup(java.lang.String, java.lang.String)
 * return 0:加入小组成功
 *        1:加入失败，小组已达最大人数
 *        2:加入失败，已加入其他小组
 */
	public int txAttendGroup(String memeberId, String groupId) {
		if (memeberId != null && null != groupId) {
			Member member = findById(memeberId);
			Group group = groupService.findById(groupId);
		
			if (member != null && null != group) {
				int maxCount=group.getMatchProject().getGroupMemberCount();
				int hasCount=group.getMembers().size();
				if(hasCount>=maxCount)
				{
					return 1;
				}
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) {
						return 2;
					}
				}
//				executeQuery("insert into T_memberGroup (groupId,memberId,status) values('"
//						+ group.getId()
//						+ "','"
//						+ memeberId
//						+ "',"
//						+ StatusEnum.initialize.ordinal() + ")");
				member.getGroups().add(group);
				return 0;
			}
		}
		return 3;
	}

	public boolean txCancelTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			Member memeber = findById(memeberId);
			if (memeber.getTrainItems().contains(item)) {
				memeber.getTrainItems().remove(item);
				return true;
			}
		}
		return false;
	}

	public ITrainItemService getTrainItemService() {
		return trainItemService;
	}

	public void setTrainItemService(ITrainItemService trainItemService) {
		this.trainItemService = trainItemService;
	}

	public IGroupService getGroupService() {
		return groupService;
	}

	public void setGroupService(IGroupService groupService) {
		this.groupService = groupService;
	}

}
