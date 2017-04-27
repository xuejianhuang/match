/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Group;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.MemberVO;
import cn.jxufe.emlab.match.pojo.Operator;
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
	private String tutor1;
	private String tutor2;
	private String groupName;
	private String prize;
	private String groupId;

	public String getGroupByConditions() throws IOException {
		Map jsondata = new HashMap();
		groupService.getGroupByConditions(jsondata, page, rows,tutor1,matchProjectId,buildMemberName, caption);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}

	public String getTeamMatchProjectGroup() throws IOException {
		Map jsondata = new HashMap();
		Map session = getSession();
		Member member = (Member) session.get(KeyEnum.MEMBER);
		StatusEnum status = StatusEnum.success;
		if (member == null) {
			status = StatusEnum.timeout;
		} else {
			Group group = groupService.getTeamMatchProjectGroup(member.getId(),
					matchProjectId);
			jsondata.put("group", group);
			if (group.getBuildMemberId().equals(member.getId())) {
				jsondata.put("isCaption", true);
			}
			if(group.getMatchProject().getIsLocked()==1)
			{
				jsondata.put("isLocked", true);
			}
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	public String getMatchProjectGroupList() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		List<Group> list = groupService.getMatchProjectGroupList(tutor1, tutor2,matchProjectId,groupName, prize,operator);
		jsondata.put("rows", list);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	
	public String setGroupPrize() throws IOException {
		StatusEnum status;
		Map jsondata = new HashMap();
		groupService.setGroupPrize(groupId, prize);;
		status = StatusEnum.success;
		jsondata.put(KeyEnum.STATUS, status);
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

	public String getTutor1() {
		return tutor1;
	}

	public void setTutor1(String tutor1) {
		this.tutor1 = tutor1;
	}

	public String getTutor2() {
		return tutor2;
	}

	public void setTutor2(String tutor2) {
		this.tutor2 = tutor2;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getPrize() {
		return prize;
	}

	public void setPrize(String prize) {
		this.prize = prize;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}



}
