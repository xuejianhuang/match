package cn.jxufe.emlab.match.service;


import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.Member;



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
	 *caption 团队名称
	 */
	public Group teamMatchProjectBuildGroup(String buildMemberId,String matchProjectId,String caption);
	/*
	 * 根据条件查询相应的比赛组
	 * matchProjectId：参加的赛项id
	 * buildMemberName：小组创建者的名字
	 * caption：小组名字
	 */
	public void getGroupByConditions(Map map, int page, int pageSize,String matchProjectId,String buildMemberName,String caption);
	
	public Group getTeamMatchProjectGroup(String memberId,String matchProjectId);
	
	public boolean txDeleteGroupMember(Member operMember,String memberId,String groupId);
	
	
	
	
}
