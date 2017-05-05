package cn.jxufe.emlab.match.service;
import java.util.List;
import java.util.Map;
import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
public interface IGroupService  extends IBaseDao<Group>{
	/*
	 *个人赛项创建组
	 *buildMemberId 创建者id
	 *matchProjectId 参加的赛项id
	 */
	public Group individualMatchProjectBuildGroup(String buildMemberId,String matchProjectId);
	/*
	 *团队比赛项创建组
	 *buildMemberId 创建者id
	 *matchProjectId 参加的赛项id
	 *group 创建的组
	 */
	public boolean teamMatchProjectBuildGroup(String buildMemberId,String matchProjectId,Group group);
	/*
	 * 根据条件查询相应的比赛组
	 * matchProjectId：参加的赛项id
	 * buildMemberName：小组创建者的名字
	 * caption：小组名字
	 * tutor：指导老师
	 */
	public void getGroupByConditions(Map map, int page, int pageSize,String tutor,String matchProjectId,String buildMemberName,String caption);
	/*获得参赛人员参加某项赛项的小组
	 * memberId：参赛人员id
	 * matchProjectId:参加赛项的id
	 */
	public Group getTeamMatchProjectGroup(String memberId,String matchProjectId);
	/*
	 * 队长删除小组中的某个成员
	 * operMember：队长
	 * memberId：被删除对象的ID
	 * groupId:小组id
	 * 
	 */
	public boolean txDeleteGroupMember(Member operMember,String memberId,String groupId);
	/*
	 * 根据查询条件获得某个赛项下的所有参赛小组
	 * tutor1：指导老师1
	 * tutor2：指导老师2
	 * matchProjectId：赛项id
	 * groupName:小组名称
	 * prize：获得奖项
	 */
	public List<Group> getMatchProjectGroupList(String tutor1, String tutor2, String matchProjectId,String groupName,String prize,Operator oper);
	/*
	 * 给参赛小组设置奖项
	 * groupId：小组Id
	 * prize:奖项级别
	 */
	public void setGroupPrize(String groupId,String prize);
	
	/*
	 * 更新小组信息
	 */
	public boolean txUpdateGroup(Group group);
}
