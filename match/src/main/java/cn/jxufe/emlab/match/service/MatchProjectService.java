package cn.jxufe.emlab.match.service;

import java.util.List;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.StatusEnum;



@SuppressWarnings("unchecked")
public class MatchProjectService extends BaseDao<MatchProject> implements IMatchProjectService
{
	@Override
	public void txSaveMatchProject(Operator oper, MatchProject matchProject)
	{
		matchProject.setId(null);
		matchProject.setStatus(StatusEnum.initialize.ordinal());
		save(matchProject);
		writeLog(oper,"添加","赛项",matchProject);
	}
	@Override
	public void txDeleteMatchProject(Operator operator, String[] idlist)
	{
		for (String id : idlist)
		{
			MatchProject matchProject=this.findById(id);
			if(matchProject!=null)
			{
			delete(matchProject);
			writeLog(operator, "删除", "赛项", matchProject);
			}
			//delete(id);
		}		
	}

	@Override
	public void txUpdateMatchProject(Operator oper, MatchProject match, String id)
	{
		   match.setId(id);
		   saveOrUpdate(match);
	      writeLog(oper, "修改", "赛项",match);	
	}

	@Override
	public List<MatchProject> getMatchProjectByMatchId(String matchId,
			Operator oper) {
		String hql="from MatchProject ";
		if(matchId!=null&&matchId.length()!=0){
		
			hql+=" where matchId = '"+matchId+"' ";
		}
		
		hql = hql + " order by createtime desc";
		return find(hql);
	}

}
