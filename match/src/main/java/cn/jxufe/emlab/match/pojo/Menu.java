package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


/**
 * Menu entity. @author MyEclipse Persistence Tools
 */

public class Menu extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable
{

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String comment;
	private Timestamp createtime;
	private int order;
	private int porder;
	private String icon;
	private String url;
	private int status;
	private List<Menu> childMenus = new ArrayList<Menu>();

	// Constructors

	/** default constructor */
	public Menu()
	{
	}

	/** minimal constructor */
	public Menu(String id)
	{
		this.id = id;
	}

	/** full constructor */
	public Menu(String id, String name, String comment, Timestamp createtime,
			int order, int porder, String icon, String url,
			int status)
	{
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.order = order;
		this.porder = porder;
		this.icon = icon;
		this.url = url;
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

	public int getOrder()
	{
		return this.order;
	}

	public void setOrder(int order)
	{
		this.order = order;
	}

	public int getPorder()
	{
		return this.porder;
	}

	public void setPorder(int porder)
	{
		this.porder = porder;
	}

	public String getIcon()
	{
		return this.icon;
	}

	public void setIcon(String icon)
	{
		this.icon = icon;
	}

	public String getUrl()
	{
		return this.url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}


	public int getStatus()
	{
		return status;
	}

	public void setStatus(int status)
	{
		this.status = status;
	}

	public List<Menu> getChildMenus()
	{
		return childMenus;
	}

	public void setChildMenus(List<Menu> childMenus)
	{
		this.childMenus = childMenus;
	}
	

}