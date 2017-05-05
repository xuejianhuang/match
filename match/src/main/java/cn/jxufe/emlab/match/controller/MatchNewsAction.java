/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IMatchNewsService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "rawtypes" })
public class MatchNewsAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IMatchNewsService matchNewsService;
	private MatchNews matchNews;
	private String[] idlist;
	private String id;
	private int rows;
	private int page;
	private String matchId;

	public String getMatchNewsByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		matchNewsService.getMatchNewsByPage(jsondata, page, rows, matchId, operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}



	@SuppressWarnings("unchecked")
	public String saveMatchNews() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNewsService.txSaveMatchNews(oper, matchNews);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		// menu=new Menu();
		return null;
	}

	public String deleteMatchNews() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNewsService.txDeleteMatchNews(oper, idlist);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}

	public String updateMatchNews() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		matchNewsService.txUpdateMatchNews(oper, matchNews, id);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	public String getMatchNewsById() throws IOException {

		Map jsondata = new HashMap();
		jsondata.put("rows",
				matchNewsService.getMatchNewsById(id));
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}


	public void setMatchNewsService(IMatchNewsService matchNewsService) {
		this.matchNewsService = matchNewsService;
	}



	public void setMatchNews(MatchNews matchNews) {
		this.matchNews = matchNews;
	}



	public MatchNews getMatchNews() {
		return matchNews;
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
