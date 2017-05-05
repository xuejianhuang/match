package cn.jxufe.emlab.match.service;

import java.util.List;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.Role;
import cn.jxufe.emlab.match.pojo.Tree;



public interface IRoleService  extends IBaseDao<Role>{
	/*
	 * 查询所有的角色
	 */
	public List<Role> getRole(Operator oper);
	/*
	 * 添加角色
	 */
	public void txSaveRole(Operator oper,Role role);
	/*
	 * 删除角色
	 */
	public void txDeleteRole(Operator oper,String[] idList);
	/*
	 * 更新角色
	 */
	public void txUpdateRole(Operator oper,Role role,String id);
	/*
	 * 获取访问权限树
	 */
	public Tree getPrivilegesTree(Operator oper, String roleId);
	/*
	 * 保存用户访问权限
	 */
	public void txSavePrivilege(Operator oper, String roleId, String[] menuOrderList);
	public List<NameAndId> getAllRoleNameAndId(Operator oper); //获取所有的角色名和id
	public List<NameAndId> getRoleNameAndId(Operator oper); //获取belongId为空的角色名和id
}
