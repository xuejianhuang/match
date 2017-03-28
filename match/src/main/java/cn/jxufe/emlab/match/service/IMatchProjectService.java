package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMatchProjectService  extends IBaseDao<MatchProject>{
	public List<MatchProject> getMatchProjectByMatchId(String matchId,Operator oper);
	public boolean txSaveMatchProject(Operator oper,MatchProject matchProject);
	public void txDeleteMatchProject(Operator oper,String[] idList);
	public boolean txUpdateMatchProject(Operator oper,MatchProject matchProject,String id);
	public void txUpdateMatchProjectIsLockedStatus(Operator oper,String id,int isLocked);
		
}