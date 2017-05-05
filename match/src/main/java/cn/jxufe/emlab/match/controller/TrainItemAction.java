/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.service.ITrainItemService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "rawtypes" })
public class TrainItemAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private ITrainItemService trainItemService;
	private TrainItem trainItem;
	private String[] idlist;
	private String id;
	private int rows;
	private int page;
	private String matchId;
	private int isLocked;

	public String getTrainItemByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		trainItemService.getTrainItemByPage(jsondata, page, rows, matchId,
				operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public String getTraimMemberNum() throws IOException {

		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		jsondata.put("rows",
				trainItemService.getTrainMemberNum(matchId, operator).toString());
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public String getTrainStatisticsByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		trainItemService.getTrainStatisticsByPage(jsondata, page, rows, matchId,
				operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public String getEnableTrainItem() throws IOException
	{
		Map jsondata = new HashMap();
		List<TrainItem> list= trainItemService.getEnableTrainItem();
		jsondata.put("rows",list);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public String getAttendTrainItem() throws IOException
	{
		Map jsondata = new HashMap();
		trainItemService.getAttendTrainItem(jsondata, page, rows);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public String getTrainItemByMemberId() throws IOException
	{
		Map jsondata = new HashMap();
		Member sessionMember=(Member) getSession().get(KeyEnum.MEMBER);
		if(sessionMember==null)
		{
			jsondata.put(KeyEnum.STATUS,  StatusEnum.timeout);
		}
		else
		{
		List<TrainItem> list= trainItemService.getTrainByMemberId(sessionMember.getId());
		jsondata.put("rows",list);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		}
		jsonViewIE(jsondata);
		return null;
	}

	@SuppressWarnings("unchecked")
	public String saveTrainItem() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		if (trainItemService.txSaveTrainItem(oper, trainItem)) {
			status = StatusEnum.success;
		} else {
			status = StatusEnum.failed;
			jsondata.put(KeyEnum.REASON, "结束时间不能在开始时间之前");
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		// menu=new Menu();
		return null;
	}

	public String deleteTrainItem() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		trainItemService.txDeleteTrainItem(oper, idlist);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}

	public String updateTrainItem() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		trainItemService.txUpdateTrainItem(oper, trainItem, id);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	public String changeTrainItemIsLockedStatus() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
		trainItemService.txUpdateTrainItemIsLockedStatus(oper, id, isLocked);
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	public String getTrainItemById() throws IOException {

		Map jsondata = new HashMap();
		jsondata.put("content",
				trainItemService.findById(id));
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}



	public ITrainItemService getTrainItemService() {
		return trainItemService;
	}

	public void setTrainItemService(ITrainItemService trainItemService) {
		this.trainItemService = trainItemService;
	}

	public TrainItem getTrainItem() {
		return trainItem;
	}

	public void setTrainItem(TrainItem trainItem) {
		this.trainItem = trainItem;
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

	public int getIsLocked() {
		return isLocked;
	}

	public void setIsLocked(int isLocked) {
		this.isLocked = isLocked;
	}


}
