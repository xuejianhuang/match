package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;

import com.google.gson.JsonArray;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchProjectService  extends IBaseDao<MatchProject>{
	/*
	 * 获得某个赛事下的所有赛项
	 */
	public List<MatchProject> getMatchProjectByMatchId(String matchId,Operator oper);
	/*
	 * 查询所有可以报名的赛项
	 */
	public List<MatchProject> getEnableMatchProject();
	/*
	 * 查询所有的赛项
	 */
	public void getAttendMatchProject(Map map, int page,  int pageSize);
	/*
	 * 添加赛项
	 */
	public boolean txSaveMatchProject(Operator oper,MatchProject matchProject);
	/*
	 * 批量删除赛项
	 */
	public void txDeleteMatchProject(Operator oper,String[] idList);
	/*
	 * 更新赛项
	 */
	public boolean txUpdateMatchProject(Operator oper,MatchProject matchProject,String id);
	/*
	 * 修改赛项是否锁定
	 */
	public void txUpdateMatchProjectIsLockedStatus(Operator oper,String id,int isLocked);
	/*
	 * 查询某个人参加的所有赛项
	 */
	public List<MatchProject> getMatchProjectByMemberId(String memberId);
	/*
	 * 统计赛项的报名情况（报名人数）
	 */
	public void getMatchProjectMemberStatisticsByPage(Map map, int page, int pageSize,String matchId, Operator oper);
	
	/*
	 * 统计赛项的报名情况(人数，组数)
	 */
	public JsonArray getMatchProjectMemberNumAndGroupNum(String matchId,Operator oper);
		
}
