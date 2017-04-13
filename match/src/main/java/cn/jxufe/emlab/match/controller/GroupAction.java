/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.service.IGroupService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;



@SuppressWarnings({ "rawtypes" })
public class GroupAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private IGroupService groupService;
	private String matchProjectId;
	private int rows;
	private int page;
	private String buildMemberName;
	private String caption;
	public String getGroupByConditions() throws IOException
	{
		Map jsondata = new HashMap();
		groupService.getGroupByConditions(jsondata, page, rows, matchProjectId, buildMemberName, caption);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	public IGroupService getGroupService() {
		return groupService;
	}
	public void setGroupService(IGroupService groupService) {
		this.groupService = groupService;
	}
	public String getMatchProjectId() {
		return matchProjectId;
	}
	public void setMatchProjectId(String matchProjectId) {
		this.matchProjectId = matchProjectId;
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
	public String getBuildMemberName() {
		return buildMemberName;
	}
	public void setBuildMemberName(String buildMemberName) {
		this.buildMemberName = buildMemberName;
	}
	public String getCaption() {
		return caption;
	}
	public void setCaption(String caption) {
		this.caption = caption;
	}
	
	
}
