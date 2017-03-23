package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;

/**
 * Syslog entity. @author MyEclipse Persistence Tools
 */

public class Syslog extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable {

	// Fields

	private String userId;

	// Constructors

	/** default constructor */
	public Syslog() {
	}

	/** minimal constructor */
	public Syslog(String id) {
		this.id = id;
	}

	/** full constructor */
	public Syslog(String id, String name, String comment, Timestamp createtime,
			String userId) {
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.userId = userId;
	}

	// Property accessors

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}