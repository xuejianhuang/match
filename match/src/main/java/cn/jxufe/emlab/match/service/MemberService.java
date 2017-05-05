package cn.jxufe.emlab.match.service;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.email.AccountEmailException;
import cn.jxufe.emlab.match.email.AccountEmailService;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.MemberVO;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.Setting;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MemberService extends BaseDao<Member> implements IMemberService {
	private ITrainItemService trainItemService;
	private IGroupService groupService;
	private IMatchProjectService matchProjectService;
	private AccountEmailService accountEmailService;
	/*
	 * 验证用户登录
	 */
	@Override
	public Member verifyMember(String account, String password) {
		// password = Encrypt.encryptPassword(password);
		List<Object> values = new ArrayList<Object>();
		values.add(account);
		values.add(password);
		Member member = (Member) uniqueResult(
				"from Member where account=? and password=?", values);
		return member;
	}
	/*
	 * 更改密码
	 */
	public boolean changePwd(String account, String password) {
		List<Object> values = new ArrayList<Object>();
		values.add(account);
		Member member = (Member) uniqueResult("from Member where account=?",
				values);
		if (member != null) {
			member.setPassword(Encrypt.encryptPassword(password));
			return true;
		}
		return false;
	}
	/*
	 * 根据条件分页查询会员
	 */
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
	/*
	 * 根据筛选条件给会员发送邮件
	 */
	public void sendEmailTOMember(String account, String name, String school,
			String major, final String title, final String content,
			final String resource, String trainItemId, String matchProjectId,
			String groupName, Operator oper) {

		String sql = "select * from T_member where status!="
				+ StatusEnum.disable.ordinal();
		ArrayList<Object> values = new ArrayList<Object>();
		if (null != name && name.length() != 0) {
			sql += " and name like ?";
			values.add("%" + name + "%");
		}

		if (null != account && account.length() != 0) {
			sql += " and account = ?";
			values.add(account);
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
		if (null != matchProjectId && matchProjectId.length() != 0) {
			sql += " and id in( select memberId from T_memberGroup where groupId in(select id from T_group where matchProjectId=?))";
			values.add(matchProjectId);
		}
		if (null != groupName && groupName.length() != 0) {
			sql += " and id in( select memberId from T_memberGroup where groupId in(select id from T_group where caption like ?))";
			values.add("%" + groupName + "%");
		}
		List<Member> list = findSQL(sql, values, Member.class);
		final List<String> to = new ArrayList<String>();
		for (Member m : list) {
			to.add(m.getAccount());
		}
		new Thread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					accountEmailService.sendMailMany(to, title, content,        //群发
							resource);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
			}
		}).start();
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
		return findSQL(sql, values, Member.class);
	}
	/*
	 * 根据条件查询赛项报名名单(并且把member对象转换成EXCEL导出对象)
	 */
	public List<MemberVO> getMatchProjectMemberList(String account,
			String name, String matchProjectId, String school, String major,
			String groupName, Operator oper) {
		List<MemberVO> list = new ArrayList<MemberVO>();
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
		List<Group> groupList = groupService.find(hql, values);

		for (Group g : groupList) {
			Set<Member> memberSet = g.getMembers();
			for (Member m : memberSet) {
				if (null != account && account.length() != 0) {
					if (!m.getAccount().equals(account)) {
						continue;
					}
				}
				if (null != name && name.length() != 0) {
					if (m.getName().indexOf(name) < 0) {
						continue;
					}
				}
				if (null != school && school.length() != 0) {
					if (m.getSchool().indexOf(school) < 0) {
						continue;
					}
				}
				if (null != major && major.length() != 0) {
					if (m.getMajor().indexOf(major) < 0) {
						continue;
					}
				}
				MemberVO memberVO;    //把member对象转换成EXCEL导出对象
				if (g.getBuildMemberId().equals(m.getId())) {
					memberVO = new MemberVO(g.getCaption(), m.getAccount(),
							m.getName(), m.getPhone(), m.getSchool(),
							m.getMajor(), "队长");
				} else {
					memberVO = new MemberVO(g.getCaption(), m.getAccount(),
							m.getName(), m.getPhone(), m.getSchool(),
							m.getMajor(), "队员");
				}
				list.add(memberVO);

			}
		}
		return list;

	}
	/*
	 * 添加会员
	 */
	@Override
	public int txSave(Member member) {
		int value = 0; // 标示保存操作是否成功。1为成功，0为失败
		member.setId(null);
		member.setStatus(StatusEnum.initialize.ordinal());
		String password = member.getPassword().toString();
		member.setPassword(Encrypt.encryptPassword(password));

		if (!checkAccountWhetherExist(member.getAccount())) {

			save(member);
			value = 1;
		}
		return value;
	}
	/*
	 * 批量删除会员
	 */
	@Override
	public void txDel(Operator operator, String[] idlist) {
		for (String id : idlist) {
			Member member = this.findById(id);
			delete(member);
			writeLog(operator, "删除", "会员", member);
		}
	}
	/*
	 * 更新会员信息
	 */
	@Override
	public boolean txUpdate(Member member, String id) {
		Member nativeMember = findById(id);
		if (!checkAccountWhetherExist(member.getAccount())) {
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
	/*
	 * 更新会员信息(会员自己登入网站个人中心操作)
	 */
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

	private boolean checkAccountWhetherExist(String account) {

		List<Object> values = new ArrayList<Object>();
		values.add(account);
		long oper_flag = getCount("select count(*) from Member where  status!="
				+ StatusEnum.disable.ordinal() + " and account=?", values);
		if (oper_flag == 0) {
			return false;
		} else {
			return true;
		}

	}

	/*
	 * (non-Javadoc)
	 * 会员报名参加培训
	 * @see
	 * cn.jxufe.emlab.match.service.IMemberService#txAttendTrain(java.lang.String
	 * , java.lang.String) return 0:成功 1:失败,已经报名 2:失败，报名已结束 3：失败，参数有误
	 */
	public int txAttendTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			if (null == item || item.getIsLocked() == 1) { //报名已结束
				return 2;
			}
			Member memeber = findById(memeberId);
			if (!memeber.getTrainItems().contains(item)) {
				memeber.getTrainItems().add(item);
				// saveOrUpdate(memeber);
				return 0;
			} else {
				return 1;     //已经报名
			}
		}
		return 3; //参数有误
	}

	/*
	 * 会员报名参加个人赛项比赛
	 *  return 0:成功 1:失败,已经报名 2:失败，该比赛报名已结束  3：失败，参数有误
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
					memeberId, matchProjectId); //创建个人比赛小组
			if (group != null) {
				Member memeber = findById(memeberId);
				if (!memeber.getGroups().contains(group)) {
					memeber.getGroups().add(group);
					// saveOrUpdate(memeber);
					return 0;
				} else {
					return 1; //已经报名
				}
			} else {
				return 1;//已经报名
			}
		}
		return 3; //参数有误
	}

	/*
	 * 创建团队赛项的比赛小组
	 *  return 0:成功 1:失败，已加入其他小组 2:失败，该比赛报名已结束 3：失败，参数有误
	 */
	public int txBuildTeamMatchProjectGroup(String memeberId,
			String matchProjectId, Group group) {
		if (memeberId != null && null != matchProjectId) {
			MatchProject matchProject = matchProjectService
					.findById(matchProjectId);
			if (null == matchProject || matchProject.getIsLocked() == 1) // 报名结束
			{
				return 2;
			}
			boolean result= groupService.teamMatchProjectBuildGroup(memeberId,
					matchProjectId, group); //创建是否成功
			Member member = findById(memeberId);
			if (member != null && result) {
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) { //该会员已经参加了别的小组
						groupService.delete(group); // 把group从session持久化对象移除(把teamMatchProjectBuildGroup创建的小组删除)
						return 1;  //已加入其他小组
					}
				}
				member.getGroups().add(group);
				return 0;
			} else {
				return 1;  //已加入其他小组
			}
		}
		return 3; //参数有误

	}
	/*
	 * 更新参加团队赛项的小组信息
	 */
	public boolean txUpdateTeamMatchProjectGroup(Group group)
	{
		return groupService.txUpdateGroup(group);
	}

	/*
	 * 参加某个小组
	 *  return 
	 *   0:加入小组成功
	 *   1:加入失败，小组已达最大人数 
	 *   2:加入失败，已加入其他小组
	 *   3:加入失败，该比赛报名已结束
	 *   4：失败，参数有误
	 */
	public int txAttendGroup(String memeberId, String groupId) {
		if (memeberId != null && null != groupId) {
			Member member = findById(memeberId);
			Group group = groupService.findById(groupId);
			if (member != null && null != group) {
				int maxCount = group.getMatchProject().getGroupMemberCount();
				int hasCount = group.getMembers().size();
				if (hasCount >= maxCount) {
					return 1;             //小组已达最大人数 
				}
				if (group.getMatchProject().getIsLocked() == 1) // 报名结束
				{
					return 3;
				}
				Set<Group> groups = member.getGroups();
				for (Group g : groups) {
					if (g.getMatchProject().getId()
							.equals(group.getMatchProject().getId())) {
						return 2;                //已加入其他小组
					}
				}
				member.getGroups().add(group);
				Member groupBuildMember = findById(group.getBuildMemberId()); //队长
				final String to = groupBuildMember.getAccount();
				final String inhtml = groupBuildMember.getName()
						+ ": 你好! "
						+ member.getSchool()
						+ member.getName()
						+ "已报名加入你的&quot;"
						+ group.getMatchProject().getCaption()
						+ "&quot;竞赛&quot;"
						+ group.getCaption()
						+ "&quot;小组,目前小组人数总共有:"
						+ (hasCount + 1)
						+ "人,还差"
						+ (maxCount - hasCount - 1)
						+ "人,请登入<a href='"+Setting.deploy+"/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看";
				new Thread(new Runnable() {
					@Override
					public void run() {
						if (null != to) {
							try {
								accountEmailService.sendMail(to,
										"组员加入通知-江西财经大学大赛网", inhtml, null);
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
	/*
	 * 取消参加某个培训
	 */
	public boolean txCancelTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			if (item.getIsLocked() == 0) { // 培训报名没有结束
				Member memeber = findById(memeberId);
				if (memeber.getTrainItems().contains(item)) {
					memeber.getTrainItems().remove(item);
					return true;
				}
			}
		}
		return false;
	}
	/*
	 * 取消参加某个比赛(如果是队长取消则整个团队都解散)
	 */
	public boolean txCancelMatchProject(String memberId, String matchProjectId) {
		MatchProject matchProject = matchProjectService
				.findById(matchProjectId);
		if (memberId != null && null != matchProject
				&& matchProject.getIsLocked() == 0) {
			Member member = findById(memberId);
			Set<Group> groups = member.getGroups();
			for (Group group : groups) {
				if (group.getMatchProject().getId().equals(matchProjectId)) {
					String emaliContent = null;
					if (group.getBuildMemberId().equals(memberId)) { // 为比赛小组创建人员，整个小组都取消
						groups.remove(group);
						groupService.delete(group);
						emaliContent = "你好! "
								+ "你的&quot;"
								+ group.getMatchProject().getCaption()
								+ "&quot;竞赛&quot;"
								+ group.getCaption()
								+ "&quot;小组组长:"
								+ member.getName()
								+ "解散了该小组,如果你还想参加该比赛"
								+ ",请登入<a href='"+Setting.deploy+"/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>重新报名";

					} else {
						groups.remove(group); // 比赛小组成员
						emaliContent = "你好! "
								+ member.getSchool()
								+ member.getName()
								+ "退出了你的&quot;"
								+ group.getMatchProject().getCaption()
								+ "&quot;竞赛&quot;"
								+ group.getCaption()
								+ "&quot;小组"
								+ ",请登入<a href='"+Setting.deploy+"/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看";
					}
					Set<Member> members = group.getMembers();
					members.size();// 立刻加载
					final String finalContent = emaliContent;
					final List<String> to = new ArrayList<String>();
					for (Member m : members) {
						to.add(m.getAccount());
					}
					new Thread(new Runnable() {
						@Override
						public void run() {
							try {
								accountEmailService.sendMailMany(to,
										"团队退出通知-江西财经大学大赛网", finalContent, null);
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
					}).start();

					return true;
				}
			}
		}
		return false;
	}
	/*
	 * 队长删除小组某个成员
	 */
	public boolean txDeleteTeamMember(Member operMember, String memberId,
			String groupId) {
		boolean result = groupService.txDeleteGroupMember(operMember, memberId,
				groupId);
		if (result) {
			Member deleteMember = findById(memberId);
			final String to = deleteMember.getAccount();
			Group group = groupService.findById(groupId);
			final String inhtml = deleteMember.getName()
					+ ": 你好! "
					+ "你的队长把你移除了&quot;"
					+ group.getMatchProject().getCaption()
					+ "&quot;竞赛&quot;"
					+ group.getCaption()
					+ "&quot;小组"
					+ ",请登入<a href='"+Setting.deploy+"/jxufe_dasai/html/index.html'>江西财经大学大赛网</a>查看";
			new Thread(new Runnable() {
				@Override
				public void run() {
					// TODO Auto-generated method stub
					try {
						accountEmailService.sendMail(to, "团队移除通知-江西财经大学大赛网",
								inhtml, null);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}).start();
		}
		return result;
	}
	/*
	 * 得到参加培训或者赛项或者所有会员的学校、专业、性别等比例
	 */
	public Map<String, Double> getPropertyRatio(String property,
			String trainItemId, String matchProjectId) {
		Map<String, Double> result = new HashMap<String, Double>();
		DecimalFormat df = new DecimalFormat("#.00");

		if (property != null && property.length() != 0) {
			String sql = "select " + property
					+ ", count(*) from T_member where status!="
					+ StatusEnum.disable.ordinal();
			ArrayList<Object> values = new ArrayList<Object>();
			if (null != trainItemId && trainItemId.length() != 0) {
				sql += " and id in( select memberId from T_trainMember where trainItemId=?)";
				values.add(trainItemId);
			}
			if (null != matchProjectId && matchProjectId.length() != 0) {
				sql += " and id in( select memberId from T_memberGroup where groupId in(select id from T_group where matchProjectId=?))";
				values.add(matchProjectId);
			}
			sql += " group by " + property;
			List<Object[]> list = findSQL(sql, values, null);
			double all = 0;
			for (Object[] obj : list) {
				double count = Double.valueOf(obj[1].toString());
				all += count;
				result.put(obj[0].toString(), count);
			}
			Set<String> keySet = result.keySet();
			for (String key : keySet) {
				result.put(
						key,
						Double.parseDouble(df.format((result.get(key) / all) * 100)));
			}
		}
		return result;
	}
	/*
	 * 查询会员注册的年度变化(每年注册的人数)
	 */
	public Map<String, Integer> getMemberSignupYearLine() {
		Map<String, Integer> result = new HashMap<String, Integer>();
		String sql = "select DATEPART(year,signupTime) as Times ,COUNT(*) from T_member group by DATEPART(year,signupTime)";
		List<Object[]> list = publicFindSQL(sql);
		for (Object[] obj : list) {
			int count = Integer.valueOf(obj[1].toString());
			result.put(obj[0].toString(), count);
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
