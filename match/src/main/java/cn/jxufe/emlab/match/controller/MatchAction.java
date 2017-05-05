/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IMatchService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "rawtypes" })
public class MatchAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IMatchService matchService;
	private Match match;
	private String[] idlist;
	private String id;
	private int rows;
	private int page;
	private int year;

	public String getMatchByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		matchService.getMatchByPage(jsondata, page, rows, year, operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}

	public String getAllMatchYear() throws IOException {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		jsonViewIE(matchService.getMatchYear(oper));
		return null;
	}

	@SuppressWarnings("unchecked")
	public String saveMatch() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchService.txSaveMatch(oper, match);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		// menu=new Menu();
		return null;
	}

	public String deleteMatch() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchService.txDeleteMatch(oper, idlist);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}

	public String updateMatch() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchService.txUpdateMatch(oper, match, id);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	 public String getAllMatchNameAndId() throws IOException
	    {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		jsonViewIE(matchService.getAllMatchNameAndId(oper));
		return null;
	    }
	    

	public void setMatchService(IMatchService matchService) {
		this.matchService = matchService;
	}

	public Match getMatch() {
		return match;
	}

	public void setMatch(Match match) {
		this.match = match;
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

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

}
