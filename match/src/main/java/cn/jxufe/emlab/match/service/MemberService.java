package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.email.AccountEmailException;
import cn.jxufe.emlab.match.email.AccountEmailService;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MemberService extends BaseDao<Member> implements IMemberService {
	private ITrainItemService trainItemService;
	private IGroupService groupService;
	private IMatchProjectService matchProjectService;
	private AccountEmailService accountEmailService;

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

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * cn.jxufe.emlab.match.service.IMemberService#txAttendTrain(java.lang.String
	 * , java.lang.String) return 0:成功 1:失败,已经报名 2:失败，报名已结束 3：失败，参数有误
	 */
	public int txAttendTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			if (null == item || item.getIsLocked() == 1) {
				return 2;
			}

			Member memeber = findById(memeberId);
			if (!memeber.getTrainItems().contains(item)) {
				memeber.getTrainItems().add(item);
				// saveOrUpdate(memeber);
				return 0;
			} else {
				return 1;
			}
		}
		return 3;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * cn.jxufe.emlab.match.service.IMemberService#txAttendIndividualMatchProject
	 * (java.lang.String, java.lang.String) return 0:成功 1:失败,已经报名 2:失败，该比赛报名已结束
	 * 3：失败，参数有误
	 */
	public int txAttendIndividualMatchProject(String memeberId,
			String matchProjectId) {
		if (memeberId != null && null != matchProjectId) {
			MatchProject matchProject = matchProjectService
					.findById(matchProjectId);
			if (null == matchProject || matchProject.getIsLocked() == 1) // 报名结束
			{
				return 2;
			}
			Group group = groupService.individualMatchProjectBuildGroup(
					memeberId, matchProjectId);
			if (group != null) {
				Member memeber = findById(memeberId);
				if (!memeber.getGroups().contains(group)) {
					memeber.getGroups().add(group);
					// saveOrUpdate(memeber);
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		}
		return 3;
	}

	/*
	 * (non-Javadoc) 团体赛创建小组
	 * 
	 * @see
	 * cn.jxufe.emlab.match.service.IMemberService#txBuildTeamMatchProjectGroup
	 * (java.lang.String, java.lang.String, java.lang.String) return 0:成功
	 * 1:失败，已加入其他小组 2:失败，该比赛报名已结束 3：失败，参数有误
	 */
	public int txBuildTeamMatchProjectGroup(String memeberId,
			String matchProjectId, String caption) {
		if (memeberId != null && null != matchProjectId) {
			MatchProject matchProject = matchProjectService
					.findById(matchProjectId);
			if (null == matchProject || matchProject.getIsLocked() == 1) // 报名结束
			{
				return 2;
			}
			Group group = groupService.teamMatchProjectBuildGroup(memeberId,
					matchProjectId, caption);
			Member member = findById(memeberId);
			if (member != null && null != group) {
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) {
						groupService.delete(group); // 把group从session持久化对象移除
						return 1;
					}
				}
				member.getGroups().add(group);
				return 0;
			} else {
				return 1;
			}
		}
		return 3;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * cn.jxufe.emlab.match.service.IMemberService#txAttendGroup(java.lang.String
	 * , java.lang.String) return 0:加入小组成功 1:加入失败，小组已达最大人数 2:加入失败，已加入其他小组
	 * 3:加入失败，该比赛报名已结束 4：失败，参数有误
	 */
	public int txAttendGroup(String memeberId, String groupId) {
		if (memeberId != null && null != groupId) {
			final Member member = findById(memeberId);
			final Group group = groupService.findById(groupId);
			if (member != null && null != group) {
				final int maxCount = group.getMatchProject().getGroupMemberCount();
				final int hasCount = group.getMembers().size();
				if (hasCount >= maxCount) {
					return 1;
				}
				if (group.getMatchProject().getIsLocked() == 1) // 报名结束
				{
					return 3;
				}
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) {
						return 2;
					}
				}
				member.getGroups().add(group);
				final Member groupBuildMember = findById(group.getBuildMemberId());
				groupBuildMember.getAccount();//立刻加载
				new Thread(new Runnable() {
					@Override
					public void run() {
						// TODO Auto-generated method stub
					
						if (null != groupBuildMember) {
							try {
								accountEmailService
										.sendMail(
												groupBuildMember.getAccount(),
												"组员加入通知-江西财经大学大赛网",
												groupBuildMember.getName()
														+ ": 你好! "
														+ member.getSchool()
														+ member.getName()
														+ "已报名加入你的&quot;"
														+ group.getMatchProject()
																.getCaption()
														+ "&quot;竞赛&quot;"
														+ group.getCaption()
														+ "&quot;小组,目前小组人数总共有:"
														+ (hasCount + 1)
														+ "人,还差"
														+ (maxCount - hasCount - 1)
														+ "人,请登入<a href='http://localhost:8080/matchPlatform/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看");
							} catch (AccountEmailException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} // 发送邮件通知队长，有新组员加入
						}
					}
				}).start();
				
				return 0;
			}
		}
		return 4;
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
	public boolean txCancelMatchProject(String memberId, String matchProjectId) {
		if (memberId != null && null != matchProjectId) {
			Member member = findById(memberId);
			Set<Group> groups = member.getGroups();
			for (Group group : groups) {
				if (group.getMatchProject().getId().equals(matchProjectId)) {
					String emaliContent=null;
					if (group.getBuildMemberId().equals(memberId)) { //为比赛小组创建人员 
						groups.remove(group);
						groupService.delete(group);
						emaliContent=
								 ": 你好! "
								+ "你的&quot;"
								+ group.getMatchProject()
										.getCaption()
								+ "&quot;竞赛&quot;"
								+ group.getCaption()
								+ "&quot;小组组长:"+member.getName()+"解散了该小组,如果你还想参加该比赛"
								+ ",请登入<a href='http://localhost:8080/matchPlatform/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>重新报名";
					
					} else {
						groups.remove(group);
						emaliContent=
								": 你好! "
								+ member.getSchool()
								+ member.getName()
								+ "退出了你的&quot;"
								+ group.getMatchProject()
										.getCaption()
								+ "&quot;竞赛&quot;"
								+ group.getCaption()
								+ "&quot;小组"
								+ ",请登入<a href='http://localhost:8080/matchPlatform/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看";
					}
					
					final Set<Member> members = group.getMembers();
					 members.size();//立刻加载
					final String finalContent=emaliContent;
					new Thread(new Runnable() {
						@Override
						public void run() {
							// TODO Auto-generated method stub
							for (Member m : members) {
								try {
									accountEmailService
											.sendMail(
													m.getAccount(),
													"团队退出通知-江西财经大学大赛网",
													m.getName()+finalContent);
								} catch (Exception e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
						}
						}
					}).start();
					
					return true;
				}
			}
		}
		return false;
	}
	public boolean txDeleteTeamMember(Member operMember,String memberId,String groupId)
	{
		boolean result= groupService.txDeleteGroupMember(operMember, memberId, groupId);
		if(result)
		{
			 Member deleteMember=findById(memberId);
			final String account=deleteMember.getAccount();
			final String name=deleteMember.getName();
			 Group group=groupService.findById(groupId);
			final String groupName=group.getCaption();
			final String matchProjectName=group.getMatchProject().getCaption();
			new Thread(new Runnable() {
				@Override
				public void run() {
					// TODO Auto-generated method stub
						try {
							accountEmailService
									.sendMail(
											account,
											"团队移除通知-江西财经大学大赛网",
											
											name+": 你好! "
													+ "你的队长把你移除了&quot;"
													+ matchProjectName
													+ "&quot;竞赛&quot;"
													+ groupName
													+ "&quot;小组"
													+ ",请登入<a href='http://localhost:8080/matchPlatform/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看");
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				}
			}).start();
		}
		return result;
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

	public IMatchProjectService getMatchProjectService() {
		return matchProjectService;
	}

	public void setMatchProjectService(IMatchProjectService matchProjectService) {
		this.matchProjectService = matchProjectService;
	}

	public AccountEmailService getAccountEmailService() {
		return accountEmailService;
	}

	public void setAccountEmailService(AccountEmailService accountEmailService) {
		this.accountEmailService = accountEmailService;
	}

}
