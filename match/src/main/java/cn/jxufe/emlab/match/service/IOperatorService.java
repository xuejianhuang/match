package cn.jxufe.emlab.match.service;
import java.util.List;
import java.util.Map;
import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;

public interface IOperatorService  extends IBaseDao<Operator>{
	/*
	 * 验证后台用户登入
	 */
	public Operator verifyUser(String username, String password);
	/*
	 * 根据条件分页查询用户
	 */
	public void getOperatorByPage(Map map, final int page, final int pageSize,String account,String roleId,Operator oper);
	/*
	 * 保存用户
	 */
	public int txSave(Operator operator,Operator OperatorToSave);
	/*
	 * 删除用户
	 */
	public void txDel(Operator operator, String[] idlist);
	/*
	 * 更新用户信息
	 */
	public boolean txUpdate(Operator oper,Operator operator,String id);
	/*
	 * 得到用户可以访问的菜单
	 */
	public List<Menu> getPrivileges(Operator operator);
}
