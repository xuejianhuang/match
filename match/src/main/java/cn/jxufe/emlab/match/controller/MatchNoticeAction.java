/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.MatchNotice;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IMatchNewsService;
import cn.jxufe.emlab.match.service.IMatchNoticeService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "rawtypes" })
public class MatchNoticeAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IMatchNoticeService matchNoticeService;
	private MatchNotice matchNotice;
	private String[] idlist;
	private String id;
	private int rows;
	private int page;
	private String matchId;

	public String getMatchNoticeByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		matchNoticeService.getMatchNoticeByPage(jsondata, page, rows, matchId, operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}



	@SuppressWarnings("unchecked")
	public String saveMatchNotice() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNoticeService.txSaveMatchNotice(oper, matchNotice);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		// menu=new Menu();
		return null;
	}

	public String deleteMatchNotice() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNoticeService.txDeleteMatchNotice(oper, idlist);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}

	public String updateMatchNotice() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNoticeService.txUpdateMatchNotice(oper, matchNotice, id);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}






	public MatchNotice getMatchNotice() {
		return matchNotice;
	}



	public void setMatchNotice(MatchNotice matchNotice) {
		this.matchNotice = matchNotice;
	}



	public void setMatchNoticeService(IMatchNoticeService matchNoticeService) {
		this.matchNoticeService = matchNoticeService;
	}



	public void setMatchId(String matchId) {
		this.matchId = matchId;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
		idlist = id.replaceAll("'", "").split(",");
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}


}
