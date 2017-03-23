package cn.jxufe.emlab.match.service;


import java.util.List;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMenuService  extends IBaseDao<Menu>{
	public List<Menu> getMenuNav();
	public List<Menu> getSubMenu(int porder);
	public void txSaveMenu(Operator oper,Menu menu);
	public void txDeleteMenu(Operator oper,String[] idList);
	public void txUpdateMenu(Operator oper,Menu menu,String id);
		
}
