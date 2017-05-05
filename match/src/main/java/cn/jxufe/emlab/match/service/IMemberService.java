package cn.jxufe.emlab.match.service;

import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.MemberVO;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMemberService extends IBaseDao<Member>{
	/*
	 * 验证会员登录
	 */
	public Member verifyMember(String account, String password);
	/*
	 * 更改密码
	 */
	public boolean changePwd(String account,String pwd);
	/*
	 * 根据条件分页查询会员
	 */
	public void getMemberByPage(Map map, final int page, final int pageSize,String account,String name,String school,String major,Operator oper);
	
	/*
	 * 根据筛选条件给会员发送邮件
	 */
	public void sendEmailTOMember(String account,String name,String school,String major,String title,String content,String resource,String trainItemId,String matchProjectId,String groupName,Operator oper);
	/*
	 * 添加会员
	 */
	public int txSave(Member member);
	/*
	 * 批量删除会员
	 */
	public void txDel(Operator operator, String[] idlist);
	/*
	 * 更新会员信息(后台管理员操作)
	 */
	public boolean txUpdate(Member member,String id);
	/*
	 * 更新会员信息(会员自己登入网站个人中心操作)
	 */
	public Member txMemberUpdate(Member member,String id);
	/*
	 * 会员报名参加培训
	 */
	public int txAttendTrain(String memeberId,String trainItemId);
	/*
	 * 会员报名参加个人赛项比赛
	 */
	public int txAttendIndividualMatchProject(String memeberId,String matchProjectId);
	/*
	 * 创建团队赛项的比赛小组
	 */
	public int txBuildTeamMatchProjectGroup(String memeberId,String matchProjectId,Group group);
	/*
	 * 更新参加团队赛项的小组信息
	 */
	public boolean txUpdateTeamMatchProjectGroup(Group group);
	/*
	 * 参加某个小组
	 */
	public int txAttendGroup(String memeberId,String groupId );
	/*
	 * 取消参加某个培训
	 */
	public boolean txCancelTrain(String memeberId,String trainItemId);
	/*
	 * 取消参加某个比赛(如果是队长取消则整个团队都解散)
	 */
	public boolean txCancelMatchProject(String memberId, String matchProjectId);
	/*
	 * 队长删除小组某个成员
	 */
	public boolean txDeleteTeamMember(Member operMember,String memberId,String groupId);
	
	/*
	 * 根据条件查询培训名单
	 */
	public List<Member> getTrainMemberList(String account, String name, String trainItemId, String school,String major,Operator oper);
	/*
	 * 根据条件查询赛项报名名单(并且把member对象转换成EXCEL导出对象)
	 */
	public List<MemberVO> getMatchProjectMemberList(String account, String name, String matchProjectId, String school,String major,String groupName,Operator oper);
	/*
	 * 得到参加培训或者赛项或者所有会员的学校、专业、性别等比例
	 */
	public Map<String,Double> getPropertyRatio(String property,String trainItemId,String matchProjectId);
	/*
	 * 查询会员注册的年度变化(每年注册的人数)
	 */
	public Map<String,Integer> getMemberSignupYearLine();
}
