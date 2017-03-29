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
import cn.jxufe.emlab.match.service.IMemberService;
import cn.jxufe.emlab.match.service.IOperatorService;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "unchecked", "serial" })
public class MemberAction extends BaseAction {
	private String account;
	private String password;
	private String oldPassword;
	private String newPassword;
	private String verifyPassword;
	private String validateCode;
	private String name;
	private IMemberService memberService;
	private Member member;
	private String[] idlist;
	private String id;
	private int page;
	private int rows;

	@SuppressWarnings("rawtypes")
	public String logout() throws IOException {
		getSession().clear();
		Map jsondata = new HashMap();
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;

	}

	@SuppressWarnings("rawtypes")
	public String changePassword() throws IOException {
		Map jsondata = new HashMap();
		Member member= (Member) getSession().get(KeyEnum.MEMBER);
		oldPassword = Encrypt.encryptPassword(oldPassword);
		StatusEnum status = null;
		String reason = null;
		if (member == null) {

			status = StatusEnum.timeout;
		} else if (!member.getPassword().equals(oldPassword)) {
			status = StatusEnum.failed;
			reason = "原密码输入不正确";
		} else if (newPassword != null && verifyPassword != null
				&& !newPassword.equals(verifyPassword))

		{
			status = StatusEnum.failed;
			reason = "新密码两次输入不一致";
		} else {
			status = StatusEnum.success;
			newPassword = Encrypt.encryptPassword(newPassword);
			member.setPassword(newPassword);
			memberService.saveOrUpdate(member);
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;
	}

	@SuppressWarnings({ "rawtypes" })
	public String login() throws Exception {
		Map jsondata = new HashMap();
		Map session = getSession();
		StatusEnum status = null;
		String reason = null;
		Member member = memberService.verifyMember(account, password);

		if (member == null) {
			reason = "用户名或密码不正确";
			status = StatusEnum.failed;
		} else {
			status = StatusEnum.success;
			session.put(KeyEnum.MEMBER, member);
		}

		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;

	}


	public String forgetPassword() throws Exception {

		return null;
	}

	public String getMemberByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		memberService.getMemberByPage(jsondata, page, rows, account,"", operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}

	public String signup() throws IOException {
		Map session = getSession();
		Map jsondata = new HashMap();
			int flag = memberService.txSave(member);
			if (flag == 1)
				jsondata.put(KeyEnum.STATUS, StatusEnum.success);
			else {
				jsondata.put(KeyEnum.STATUS, StatusEnum.failed);
				jsondata.put(KeyEnum.REASON, "操作失败，该操作员已存在！请重新输入！");
			}
		jsonViewIE(jsondata);
		return null;

	}

	public String deleteMember() throws IOException {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null) {
			memberService.txDel(oper, idlist);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		} else {
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}

	public String editMember() throws IOException {
		Map session = getSession();
		Map jsondata = new HashMap();
		StatusEnum status = StatusEnum.success;
		String reason = null;
			if (null != newPassword && newPassword.length() != 0) {
				if (newPassword != null && verifyPassword != null
						&& !newPassword.equals(verifyPassword)) {
					status = StatusEnum.failed;
					reason = "新密码两次输入不一致";
				} else {
					// status = StatusEnum.success;
					member.setPassword(newPassword);
				}
			}
			if (!memberService.txUpdate(member, id)) {
				status = StatusEnum.failed;
				reason = "账号已存在";
			}

		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public void setMemberService(IMemberService memberService) {
		this.memberService = memberService;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getVerifyPassword() {
		return verifyPassword;
	}

	public void setVerifyPassword(String verifyPassword) {
		this.verifyPassword = verifyPassword;
	}

	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	/*
	 * public String[] getIdlist() { return idlist; }
	 * 
	 * public void setIdlist(String[] idlist) { this.idlist = idlist; }
	 */

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
		idlist = id.replaceAll("'", "").split(",");
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}


}