package cn.jxufe.emlab.match.service;
import java.util.List;
import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;
public interface IMenuService  extends IBaseDao<Menu>{
	/*
	 * 查询所有一级菜单
	 */
	public List<Menu> getMenuNav();
	/*
	 * 查询某个一级菜单下的所有子菜单
	 */
	public List<Menu> getSubMenu(int porder);
	/*
	 * 添加菜单
	 */
	public void txSaveMenu(Operator oper,Menu menu);
	/*
	 * 删除菜单
	 */
	public void txDeleteMenu(Operator oper,String[] idList);
	/*
	 * 更新菜单
	 */
	public void txUpdateMenu(Operator oper,Menu menu,String id);
		
}
