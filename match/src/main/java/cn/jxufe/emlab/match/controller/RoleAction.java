/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.Role;
import cn.jxufe.emlab.match.pojo.Tree;
import cn.jxufe.emlab.match.service.IRoleService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;



@SuppressWarnings({ "rawtypes" })
public class RoleAction extends BaseAction
{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IRoleService roleService;
	private Role role;
	private String roleId;
	private String[] idlist;
	private String id;
	private String menuId;
	private String[] menuIdList;
	public void setRoleService(IRoleService roleService)
	{
		this.roleService = roleService;
	}
	@SuppressWarnings("unchecked")
	public String getAllRole() throws IOException
	{
		List<Role> list = null;
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null)
		{
			list = roleService.getRole(oper);
			jsondata.put("rows", list);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		}
		else
		{
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}
	@SuppressWarnings("unchecked")
	public String addRole() throws IOException
	{
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null)
		{
		    roleService.txSaveRole(oper,role);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		}
		else
		{
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public String deleteRole() throws IOException
	{
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null)
		{
		    roleService.txDeleteRole(oper,idlist);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		}
		else
		{
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}
	@SuppressWarnings("unchecked")
	public String editRole() throws IOException
	{
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		Map jsondata = new HashMap();
		if (oper != null)
		{
		    roleService.txUpdateRole(oper,role,id);
			jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		}
		else
		{
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
		}
		jsonViewIE(jsondata);
		return null;
	}
	@SuppressWarnings("unchecked")
	public String getPrivilegesTree() throws IOException
	{

		Map<String, Object> session = this.getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		if (null != oper)
		{
				Tree tree = roleService.getPrivilegesTree(oper, roleId);
				List<Tree> list = new ArrayList<Tree>();
				list.add(tree);
				jsonViewIE(list);
		}
		else
		{
           return null;
		}
		return null;
	}
	@SuppressWarnings("unchecked")
	public String savePrivilege() throws Exception
	{
		StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
			if (null == oper)
			{
				status = StatusEnum.timeout;
			}
			else
			{
				roleService.txSavePrivilege(oper,roleId,menuIdList);
				status = StatusEnum.success;
			}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		return null;
	}
	
	 public String getAllRoleIdAndComment() throws IOException
	    {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		jsonViewIE(roleService.getAllRoleNameAndId(oper));
		return null;
	    }
	    
	 public String getRoleIdAndComment() throws IOException
	    {
		Map session = getSession();
		Operator oper = (Operator) session.get(KeyEnum.OPERATOR);
		jsonViewIE(roleService.getRoleNameAndId(oper));
		return null;
	    }
	 
	public Role getRole()
	{
		return role;
	}
	public void setRole(Role role)
	{
		this.role = role;
	}
	public String getId()
	{
		return id;
	}

	public void setId(String id)
	{
		this.id = id;
		idlist = id.replaceAll("'", "").split(",");
	}
	public String getRoleId()
	{
		return roleId;
	}
	public void setRoleId(String roleId)
	{
		this.roleId = roleId;
	}
	public String getMenuId()
	{
		return menuId;
	}
	public void setMenuId(String menuId)
	{
		this.menuId = menuId;
		menuIdList=menuId.replaceAll("'", "").split(",");
	}

	
}
