/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IOperatorService;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings({ "unchecked", "serial" })
public class OperatorAction extends BaseAction {
	private String account;
	private String password;
	private String oldPassword;
	private String newPassword;
	private String verifyPassword;
	private String validateCode;
	private String name;
	private IOperatorService operatorService;
	private Operator operator;
	private String[] idlist;
	private String id;
	private int page;
	private int rows;
	private String roleId;

	@SuppressWarnings("rawtypes")
	public String logout() throws IOException {
		getSession().clear();
		Map jsondata = new HashMap();
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;

	}

	@SuppressWarnings("rawtypes")
	public String relogin() throws IOException {

		Map jsondata = new HashMap();
		String reason = null;
		StatusEnum status = null;
		Operator operator = operatorService.verifyUser(account, password);

		if (operator == null) {
			reason = "用户名或密码不正确";
			status = StatusEnum.failed;
		} else {
			status = StatusEnum.success;
			getSession().put(KeyEnum.OPERATOR, operator);
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;
	}

	@SuppressWarnings("rawtypes")
	public String changePassword() throws IOException {
		Map jsondata = new HashMap();
		Operator operator = (Operator) getSession().get(KeyEnum.OPERATOR);
		oldPassword = Encrypt.encryptPassword(oldPassword);
		StatusEnum status = null;
		String reason = null;
		if (operator == null) {

			status = StatusEnum.timeout;
		} else if (!operator.getPassword().equals(oldPassword)) {
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
			operator.setPassword(newPassword);
			operatorService.saveOrUpdate(operator);
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
		if (session.get("time") == null) {
			session.put("time", 0);
		}
		int time = (Integer) session.get("time");
		time++;
		session.put("time", time);
		if (time > 3) {
			if (validateCode == null
					|| validateCode.isEmpty()
					|| null == session.get(KeyEnum.VALIDATE_IMAGE_CODE_KEY)
					|| !validateCode.equalsIgnoreCase(session.get(
							KeyEnum.VALIDATE_IMAGE_CODE_KEY).toString())) {
				reason = "验证码输入不正确";
				status = StatusEnum.failed;
				jsondata.put(KeyEnum.STATUS, status);
				jsondata.put(KeyEnum.REASON, reason);
				jsonViewIE(jsondata);
				return null;
			}
		}
		Operator operator = operatorService.verifyUser(account, password);

		if (operator == null) {
			reason = "用户名或密码不正确";
			status = StatusEnum.failed;
		} else {
			status = StatusEnum.success;
			session.put(KeyEnum.OPERATOR, operator);
		}

		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;

	}

	public String getPrivileges() throws IOException {
		Map<String, Object> session = this.getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		String reason = null;
		StatusEnum status = null;
		Map jsondata = new HashMap();
		if (null != oper) {

			List items = operatorService.getPrivileges(oper);
			status = StatusEnum.success;
			jsondata.put(KeyEnum.RESULT, items);

		} else {
			status = StatusEnum.timeout;
		}
		jsondata.put(KeyEnum.STATUS, status);
		jsondata.put(KeyEnum.REASON, reason);
		jsonViewIE(jsondata);
		return null;
	}

	public String forgetPassword() throws Exception {

		return null;
	}

	public String getOperatorByPage() throws IOException {
		Map session = this.getSession();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		operatorService.getOperatorByPage(jsondata, page, rows, account,
				roleId, operator);
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}

	public String addOperator() throws IOException {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null) {
			int flag = operatorService.txSave(oper, operator);
			if (flag == 1)
				jsondata.put(KeyEnum.STATUS, StatusEnum.success);
			else {
				jsondata.put(KeyEnum.STATUS, StatusEnum.failed);
				jsondata.put(KeyEnum.REASON, "操作失败，该操作员已存在！请重新输入！");
			}

		} else {
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;

	}

	public String deleteOperator() throws IOException {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null) {
			operatorService.txDel(oper, idlist);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		} else {
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}

	public String editOperator() throws IOException {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		StatusEnum status = StatusEnum.success;
		String reason = null;
		if (oper != null) {
			if (null != newPassword && newPassword.length() != 0) {
				if (newPassword != null && verifyPassword != null
						&& !newPassword.equals(verifyPassword)) {
					status = StatusEnum.failed;
					reason = "新密码两次输入不一致";
				} else {
					// status = StatusEnum.success;
					operator.setPassword(newPassword);
				}
			}
			if (!operatorService.txUpdate(oper, operator, id)) {
				status = StatusEnum.failed;
				reason = "账号已存在";
			}

		} else {
			status = StatusEnum.timeout;
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

	public void setOperatorService(IOperatorService operatorService) {
		this.operatorService = operatorService;
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

	public Operator getOperator() {
		return operator;
	}

	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	/*
	 * public String[] getIdlist() { return idlist; }
	 * 
	 * public void setIdlist(String[] idlist) { this.idlist = idlist; }
	 */

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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

}
