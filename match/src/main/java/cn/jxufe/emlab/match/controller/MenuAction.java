/**
 * 
 */
package cn.jxufe.emlab.match.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.service.IMenuService;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;




@SuppressWarnings({ "rawtypes" })
public class MenuAction extends BaseAction
{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4779692247834026042L;
	private IMenuService menuService;
	private int porder;
	private Menu menu;
	private String[] idlist;
	private String id;

	@SuppressWarnings("unchecked")
	public String getAllMenuNav() throws IOException
	{
		Map jsondata = new HashMap();
		jsondata.put("rows",menuService.getMenuNav());
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
	@SuppressWarnings("unchecked")
	public String getSubMenu() throws IOException
	{
		Map jsondata = new HashMap();
		jsondata.put("rows",menuService.getSubMenu(porder));
		jsondata.put(KeyEnum.STATUS, StatusEnum.success);
		jsonViewIE(jsondata);
		return null;
	}
 @SuppressWarnings("unchecked")
public String saveMenu() throws IOException
 {
	     StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
			if (null == oper)
			{
				status =StatusEnum.timeout;
			}
			else
			{
				menu.setPorder(porder);
				menuService.txSaveMenu(oper,menu);
				status = StatusEnum.success;
			}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
		//menu=new Menu();
	 return null;
 }
 public String deleteMenu() throws IOException
 {
	   StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
			if (null == oper)
			{
				status =StatusEnum.timeout;
			}
			else
			{
				//menu.setPorder(porder);
				menuService.txDeleteMenu(oper,idlist);
				status =StatusEnum.success;
			}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
	 return null;
 }
 public String updateMenu() throws IOException
 {
	 StatusEnum status;
		Map jsondata = new HashMap();
		Map map = getSession();
		Operator oper = (Operator) map.get(KeyEnum.OPERATOR);
			if (null == oper)
			{
				status =StatusEnum.timeout;
			}
			else
			{
				menu.setPorder(porder);
				menuService.txUpdateMenu(oper,menu,id);
				status = StatusEnum.success;
			}
		jsondata.put(KeyEnum.STATUS, status);
		jsonViewIE(jsondata);
	 return null;
 }
	public void setMenuService(IMenuService menuService)
	{
		this.menuService = menuService;
	}
	public int getPorder()
	{
		return porder;
	}
	public void setPorder(int porder)
	{
		this.porder = porder;
	}
	public Menu getMenu()
	{
		return menu;
	}
	public void setMenu(Menu menu)
	{
		this.menu = menu;
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
	
}
