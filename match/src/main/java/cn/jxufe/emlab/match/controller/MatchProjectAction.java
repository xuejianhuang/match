/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IMatchProjectService;
import cn.jxufe.emlab.match.service.IMatchService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "rawtypes" })
public class MatchProjectAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IMatchProjectService matchProjectService;
	private MatchProject matchProject;
	private String[] idlist;
	private String id;
	private String matchId;
	private int isLocked;

	public String getMatchProjectByMatchId() throws IOException {

		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		jsondata.put("rows",
				matchProjectService.getMatchProjectByMatchId(matchId, operator));
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}

	@SuppressWarnings("unchecked")
	public String saveMatchProject() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		if(matchProjectService.txSaveMatchProject(oper, matchProject))
		{
		status = StatusEnum.success;
		}
		else
		{
			status=StatusEnum.failed;
			jsondata.put(KeyEnum.REASON, "结束时间不能在开始时间之前");
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		// menu=new Menu();
		return null;
	}

	public String deleteMatchProject() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchProjectService.txDeleteMatchProject(oper, idlist);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}

	public String updateMatchProject() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		if(matchProjectService.txUpdateMatchProject(oper, matchProject, id))
		{
		status = StatusEnum.success;
		}
		else
		{
			status=StatusEnum.failed;
			jsondata.put(KeyEnum.REASON, "结束时间不能在开始时间之前");
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	
	public String changeMatchProjectIsLockedStatus() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		 matchProjectService.txUpdateMatchProjectIsLockedStatus(oper, id, isLocked);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}


	

	public void setMatchProjectService(IMatchProjectService matchProjectService) {
		this.matchProjectService = matchProjectService;
	}

	public void setMatchProject(MatchProject matchProject) {
		this.matchProject = matchProject;
	}

	public MatchProject getMatchProject() {
		return matchProject;
	}

	public void setIdlist(String[] idlist) {
		this.idlist = idlist;
	}

	public void setMatchId(String matchId) {
		this.matchId = matchId;
	}

	public int getIsLocked() {
		return isLocked;
	}

	public void setIsLocked(int isLocked) {
		this.isLocked = isLocked;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
		idlist = id.replaceAll("'", "").split(",");
	}


}
