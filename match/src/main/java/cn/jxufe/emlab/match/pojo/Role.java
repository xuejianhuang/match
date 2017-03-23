package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */

public class Role extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable
{

	// Fields

	private String id;
	private String name;
	private String comment;
	private Timestamp createtime;
	private int status;

	// Constructors

	/** default constructor */
	public Role()
	{
	}

	/** minimal constructor */
	public Role(String id)
	{
		this.id = id;
	}

	/** full constructor */
	public Role(String id, String name, String comment, Timestamp createtime,
			int status)
	{
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.status = status;
	}

	// Property accessors

	public String getId()
	{
		return this.id;
	}

	public void setId(String id)
	{
		this.id = id;
	}

	public String getName()
	{
		return this.name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getComment()
	{
		return this.comment;
	}

	public void setComment(String comment)
	{
		this.comment = comment;
	}

	public Timestamp getCreatetime()
	{
		return this.createtime;
	}

	public void setCreatetime(Timestamp createtime)
	{
		this.createtime = createtime;
	}

	public int getStatus()
	{
		return status;
	}

	public void setStatus(int status)
	{
		this.status = status;
	}


}