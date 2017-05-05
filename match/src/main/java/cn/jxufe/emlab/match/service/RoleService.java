package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.core.Utils;
import cn.jxufe.emlab.match.pojo.Leaf;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.Role;
import cn.jxufe.emlab.match.pojo.RoleMenu;
import cn.jxufe.emlab.match.pojo.Tree;
import cn.jxufe.emlab.match.pojo.TreeTrunk;
import cn.jxufe.emlab.match.util.Cache;
import cn.jxufe.emlab.match.util.StatusEnum;

/*
 * 查询所有的角色
 */
public class RoleService extends BaseDao<Role> implements IRoleService {
	@Override
	public List<Role> getRole(Operator oper) {
		{
			return find("from Role");
		}
	}

	/*
	 * 添加角色
	 */
	@Override
	public void txSaveRole(Operator oper, Role role) {
		role.setId(null);
		save(role);
		writeLog(oper, "添加", "角色", role);
	}
	/*
	 * 更新角色
	 */
	@Override
	public void txUpdateRole(Operator oper, Role role, String id) {
			Role newRole = findById(id);
			newRole.setName(role.getName());
			newRole.setComment(role.getComment());
			saveOrUpdate(newRole);
			writeLog(oper, "修改", "角色", role);
	}
	/*
	 * 删除角色
	 */
	@Override
	public void txDeleteRole(Operator oper, String[] idList) {
		Role role = null;
			for (String id : idList) {
				role = findById(id);
				delete(role);
				writeLog(oper, "删除", "角色", role);

			}
	}
	/*
	 * 获取访问权限树
	 */
	@Override
	public Tree getPrivilegesTree(Operator oper, String roleId) {
		if (roleId == null) {
			return null;
		}
		List<Menu> list = null;
		Object[] obj = null;
		if (Cache.allPrivilege != null
				&& Cache.loginRole.equals(oper.getRoleId())) {
			list = Cache.allPrivilege;
		} else {
			String hql = null; // 查出所有的目录结构
			if (oper.getRoleName().equals("admin")) {
				hql = "from Menu  order by order";
			} else {
				hql = "from Menu where id in(select menuId from RoleMenu where roleId=?) order by order";
				obj = new Object[1];
				obj[0] = oper.getRoleId();
			}
			list = getHibernateTemplate().find(hql, obj);
			Cache.allPrivilege = list;
			Cache.loginRole = oper.getRoleId();
		}
		List<Menu> list2 = null;
		if (Cache.rolePrivileg != null && Cache.choseRole.equals(roleId)) {
			list2 = Cache.rolePrivileg;
		} else {
			obj = new Object[1];
			obj[0] = roleId;
			list2 = getHibernateTemplate()
					.find("from Menu where id in(select menuId from RoleMenu where roleId=?) order by order",
							obj);// 查出对应角色的目录结构
			Cache.rolePrivileg = list2;
			Cache.choseRole = roleId;
		}
		Menu pri = null;
		Menu child_pri = null;
		int order = 0;
		Tree tree = new Tree();
		TreeTrunk treeTrunk = null;
		Leaf leaf = null;
		tree.setText("导航菜单");
		for (int i = 0; i < list.size(); i++) {
			pri = list.get(i);
			if (pri.getPorder() == 0) {
				treeTrunk = new TreeTrunk();
				treeTrunk.setId(pri.getId());
				treeTrunk.setText(pri.getName());
				treeTrunk.setIconCls(pri.getIcon());

				order = pri.getOrder();
				for (int j = 0; j < list.size(); j++) {

					child_pri = list.get(j);
					if (child_pri.getPorder() == order) {
						leaf = new Leaf();
						leaf.setId(child_pri.getId());
						leaf.setText(child_pri.getName());
						leaf.setIconCls(child_pri.getIcon());
						if (isContains(list2, child_pri)) {
							leaf.setChecked(true);

						} else {
							leaf.setChecked(false);
						}
						treeTrunk.getChildren().add(leaf);
					}

				}
				if (treeTrunk.getChildren().size() > 0) {
					tree.getChildren().add(treeTrunk);
				}
			}
		}

		return tree;
	}

	private boolean isContains(List<Menu> list, Menu privilege) {
		for (Menu pri : list) {
			if (pri.getId().equals(privilege.getId())) {
				return true;
			}
		}
		return false;
	}
	/*
	 * 保存用户访问权限
	 */
	@Override
	public void txSavePrivilege(Operator oper, String roleId,
			String[] menuOrderList) {
		if (roleId == null) {
			return;
		}
		Object[] obj = new Object[1];
		List<Menu> rolePrivilege = null;
		if (Cache.rolePrivileg != null && Cache.choseRole.equals(roleId)) {
			rolePrivilege = Cache.rolePrivileg;
		} else {
			obj[0] = roleId;
			rolePrivilege = getHibernateTemplate()
					.find("from Menu where id in(select menuId from RoleMenu where roleId=?) order by order",
							obj);// 查出对应角色的目录结构
			Cache.rolePrivileg = rolePrivilege;
			Cache.choseRole = roleId;

		}
		List<RoleMenu> removeMenu = findRemove(rolePrivilege, menuOrderList,
				roleId);
		List<RoleMenu> addMenu = findAdd(rolePrivilege, menuOrderList, roleId);
		for (RoleMenu pri : removeMenu) {
			getHibernateTemplate().delete(pri);
		}
		for (RoleMenu pri : addMenu) {
			if (pri.getId() == null)
				pri.setId(Utils.getNewUUID());
			if (pri.getCreatetime() == null)
				pri.setCreatetime(Utils.getNow());
			getHibernateTemplate().save(pri);
		}
		Cache.allPrivilege = null;
		Cache.choseRole = null;
		Cache.loginRole = null;
		Cache.rolePrivileg = null;
		writeLog(oper, "修改", "操作权限" + roleId, null);
	}

	private List<RoleMenu> findRemove(List<Menu> roleList, String[] menuIdList,
			String roleId) {
		List<RoleMenu> remove = new ArrayList<RoleMenu>();
		RoleMenu roleMenu = null;
		String id = null;
		Object[] obj = new Object[2];
		obj[0] = roleId;
		List<Menu> removeMenu = new ArrayList<Menu>();
		for (Menu menu : roleList) {
			removeMenu.add(menu);
		}
		for (Menu menu : roleList) {
			for (int i = 0; i < menuIdList.length; i++) {
				id = menuIdList[i];
				if (id.equals(menu.getId())) {
					removeMenu.remove(menu);
					break;
				}
			}
		}
		for (Menu menu : removeMenu) {
			obj[1] = menu.getId();
			roleMenu = (RoleMenu) getHibernateTemplate().find(
					"from RoleMenu where roleId=? and menuId=?", obj).get(0);
			remove.add(roleMenu);
		}
		return remove;
	}

	private List<RoleMenu> findAdd(List<Menu> roleList, String[] menuIdList,
			String roleId) {
		List<String> menuId = new ArrayList<String>();
		for (String str : menuIdList) {
			menuId.add(str);
		}
		List<RoleMenu> addPrivilege = new ArrayList<RoleMenu>();
		RoleMenu roleMenu = null;
		Menu pri = null;
		for (int i = 0; i < roleList.size(); i++) {
			pri = roleList.get(i);
			if (menuId.contains(pri.getId())) {
				menuId.remove(pri.getId());
			}

		}
		for (String str : menuId) {
			roleMenu = new RoleMenu();
			roleMenu.setMenuId(str);
			roleMenu.setRoleId(roleId);
			addPrivilege.add(roleMenu);
		}
		return addPrivilege;
	}

	public List<NameAndId> getAllRoleNameAndId(Operator oper) {
		List<NameAndId> list = new ArrayList<NameAndId>();
		NameAndId nameAndId = null;
		List<Role> roleList = null;
		// if(null!=oper&&(oper.getRoleName().equals("admin")||oper.getRoleName().equals("touristAdmin")))
		// {
		String hql = "from Role where status!=" + StatusEnum.disable.ordinal();
		roleList = find(hql);
		// }
		nameAndId = new NameAndId();
		nameAndId.setId("");
		nameAndId.setName("所有角色");
		list.add(nameAndId);
		for (Role role : roleList) {
			nameAndId = new NameAndId();
			nameAndId.setId(role.getId());
			nameAndId.setName(role.getComment());
			list.add(nameAndId);
		}

		return list;
	}

	public List<NameAndId> getRoleNameAndId(Operator oper) {
		List<NameAndId> list = new ArrayList<NameAndId>();
		NameAndId nameAndId = null;
		List<Role> roleList = null;
		// if(null!=oper&&(oper.getRoleName().equals("admin")||oper.getRoleName().equals("touristAdmin")))
		// {
		String hql = "from Role where status!=" + StatusEnum.disable.ordinal();
		roleList = find(hql);
		// }
		for (Role role : roleList) {
			nameAndId = new NameAndId();
			nameAndId.setId(role.getId());
			nameAndId.setName(role.getComment());
			list.add(nameAndId);
		}

		return list;
	}
}
