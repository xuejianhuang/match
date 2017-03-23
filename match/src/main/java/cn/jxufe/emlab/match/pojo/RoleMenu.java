package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;

/**
 * RoleMenu entity. @author MyEclipse Persistence Tools
 */

public class RoleMenu extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable
{

	// Fields

	private String id;
	private String name;
	private String comment;
	private Timestamp createtime;
	private int status;
	private String roleId;
	private String menuId;

	// Constructors

	/** default constructor */
	public RoleMenu()
	{
	}

	/** minimal constructor */
	public RoleMenu(String id, String roleId, String menuId)
	{
		this.id = id;
		this.roleId = roleId;
		this.menuId = menuId;
	}

	/** full constructor */
	public RoleMenu(String id, String name, String comment,
			Timestamp createtime, int status, String roleId, String menuId)
	{
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.status = status;
		this.roleId = roleId;
		this.menuId = menuId;
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

	public String getRoleId()
	{
		return this.roleId;
	}

	public void setRoleId(String roleId)
	{
		this.roleId = roleId;
	}

	public String getMenuId()
	{
		return this.menuId;
	}

	public void setMenuId(String menuId)
	{
		this.menuId = menuId;
	}

}