package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;

public abstract class BasePojo implements java.io.Serializable {

	private static final long serialVersionUID = -6985997893250934863L;
	protected String id;
	protected String name;
	protected String comment;
	protected Timestamp createtime;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Timestamp getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}
}
