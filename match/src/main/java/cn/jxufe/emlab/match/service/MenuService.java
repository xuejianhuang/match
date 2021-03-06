package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;

public class MenuService extends BaseDao<Menu> implements IMenuService {

	/*
	 * 查询所有一级菜单
	 */
	@Override
	public List<Menu> getMenuNav() {

		String hql = "from Menu where  porder='0' order by order";
		return find(hql);
	}

	/*
	 * 查询某个一级菜单下的所有子菜单
	 */
	@Override
	public List<Menu> getSubMenu(int porder) {
		String hql = "from Menu where  porder=? order by order";
		return find(hql, porder);
	}

	/*
	 * 添加菜单
	 */
	@Override
	public void txSaveMenu(Operator oper, Menu menu) {
		menu.setId(null);
		int order = 0;
		Object object = null;
		List<Object> obj = new ArrayList<Object>();
		if (menu.getPorder() == 0) // 一级菜单
		{
			object = uniqueResult("select Max(m.order) from Menu m where  porder='0'");
			if (object != null) {
				order = (Integer) object;
				menu.setOrder(order + 1);
			} else {
				menu.setOrder(0);
			}
		} else // 子菜单
		{
			obj.add(menu.getPorder());
			object = uniqueResult(
					"select Max(m.order) from Menu m where porder=?", obj);
			if (object != null) {
				order = (Integer) object;
				menu.setOrder(order + 1);
			} else {
				menu.setOrder(menu.getPorder() * 100 + 1);
			}
		}
		menu.setStatus(0);
		save(menu);
		writeLog(oper, "添加", "菜单", menu);
	}

	/*
	 * 删除菜单
	 */
	@Override
	public void txDeleteMenu(Operator oper, String[] idList) {
		Menu menu = null;
		Object[] obj = new Object[1];
		for (String id : idList) {
			menu = findById(id);
			if (menu.getPorder() == 0) // 一级菜单还有删除子菜单
			{
				obj[0] = menu.getOrder();
				delete(find("from Menu where porder=?", obj));
				delete(menu);

			} else {
				delete(menu);
			}
			writeLog(oper, "删除", "菜单", menu);
		}
		return;

	}

	/*
	 * 更新菜单
	 */
	@Override
	public void txUpdateMenu(Operator oper, Menu menu, String id) {
		Menu newMenu = findById(id);
		newMenu.setName(menu.getName());
		newMenu.setComment(menu.getComment());
		newMenu.setIcon(menu.getIcon());
		newMenu.setUrl(menu.getUrl());
		saveOrUpdate(newMenu);
		writeLog(oper, "修改", "菜单", newMenu);

	}

}
