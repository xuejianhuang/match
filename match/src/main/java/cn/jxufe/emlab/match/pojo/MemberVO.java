package cn.jxufe.emlab.match.pojo;

// default package



import cn.jxufe.emlab.match.poi.ExcelVOAttribute;

/**
 * Member entity. @author MyEclipse Persistence Tools
 */

public class MemberVO   {

	/**
	 * 
	 */

	// Fields
	@ExcelVOAttribute(name = "组名", column = "A")
	private String groupName;
	
	@ExcelVOAttribute(name = "账号", column = "B")
	private String account;
	
	@ExcelVOAttribute(name = "姓名", column = "C")
	private String name;

	@ExcelVOAttribute(name = "手机号", column = "D")
	private String phone;
	
	@ExcelVOAttribute(name = "学校", column = "E")
	private String school;
	
	@ExcelVOAttribute(name = "专业", column = "F")
	private String major;
	
	@ExcelVOAttribute(name = "角色", column = "G")
	private String role;

	/** default constructor */
	public MemberVO() {
	}

	public MemberVO(String groupName, String account, String name,
			String phone, String school, String major,String role) {
		super();
		this.groupName = groupName;
		this.account = account;
		this.name = name;
		this.phone = phone;
		this.school = school;
		this.major = major;
		this.role=role;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	

}