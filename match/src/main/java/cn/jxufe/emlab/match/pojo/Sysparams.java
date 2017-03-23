package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;

/**
 * Sysparams entity. @author MyEclipse Persistence Tools
 */

public class Sysparams extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable {

	// Fields

	private String id;
	private String name;
	private String comment;
	private Timestamp createtime;
	private Integer backlistFlag;
	private String mailServer;
	private String mailPassword;
	private String mailUser;

	// Constructors

	/** default constructor */
	public Sysparams() {
	}

	/** minimal constructor */
	public Sysparams(String id) {
		this.id = id;
	}

	/** full constructor */
	public Sysparams(String id, String name, String comment,
			Timestamp createtime, Integer backlistFlag, String mailServer,
			String mailPassword, String mailUser) {
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.backlistFlag = backlistFlag;
		this.mailServer = mailServer;
		this.mailPassword = mailPassword;
		this.mailUser = mailUser;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Timestamp getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}

	public Integer getBacklistFlag() {
		return this.backlistFlag;
	}

	public void setBacklistFlag(Integer backlistFlag) {
		this.backlistFlag = backlistFlag;
	}

	public String getMailServer() {
		return this.mailServer;
	}

	public void setMailServer(String mailServer) {
		this.mailServer = mailServer;
	}

	public String getMailPassword() {
		return this.mailPassword;
	}

	public void setMailPassword(String mailPassword) {
		this.mailPassword = mailPassword;
	}

	public String getMailUser() {
		return this.mailUser;
	}

	public void setMailUser(String mailUser) {
		this.mailUser = mailUser;
	}

}