package cn.jxufe.emlab.match.service;

import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IOperatorService  extends IBaseDao<Operator>{
	public Operator verifyUser(String username, String password);
	public void getOperatorByPage(Map map, final int page, final int pageSize,String account,String roleId,Operator oper);
	public int txSave(Operator operator,Operator OperatorToSave);
	public void txDel(Operator operator, String[] idlist);
	public boolean txUpdate(Operator oper,Operator operator,String id);
	public List<Menu> getPrivileges(Operator operator);
}
