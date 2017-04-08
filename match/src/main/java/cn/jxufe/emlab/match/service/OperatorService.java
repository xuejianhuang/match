package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.StatusEnum;




public class OperatorService extends BaseDao<Operator> implements
		IOperatorService
{
	private IRoleService roleService;
	@Override
	public Operator verifyUser(String account, String password)
	{
		password = Encrypt.encryptPassword(password);
		String hql=null;
		List<String> list=null;
		Object[] obj=new Object[2];
		obj[0]=account;
		obj[1]=password;
		Operator operator = (Operator) uniqueResult("from Operator where account=? and password=?",obj);
		

		if (null == operator)
		{
			return null;
		}
		else
		{
			hql = "select name from Role where id=?";
			Object[] values=new Object[1];
			values[0]=operator.getRoleId();
			list = getHibernateTemplate().find(hql,values);
			if (list != null && list.size() == 1)
			{
				operator.setRoleName(list.get(0).toString());
			}
			
		}

		return operator;
	}

	@Override
	public void getOperatorByPage(Map map, int page, int pageSize,
			String account, String roleId, Operator oper)
	{
		int paramNums = 0;
			ArrayList<Object> al = new ArrayList<Object>();
			List<NameAndId> roleList=roleService.getAllRoleNameAndId(oper);
			String hql = "from Operator where  status!="
					+ StatusEnum.disable.ordinal() ;
			if(roleId!=null&&roleId.length()!=0)
			{
				hql+=" and roleId=?";
				al.add(roleId);
				paramNums ++;
				
			}
			if (null != account&&account.length()!=0){
				hql += " and account like ?";
				al.add("%"+account+"%");
				paramNums ++;
			}
			
			Object[] values = (Object[]) al.toArray(new Object[paramNums]);
			Long count=getCount(hql,values);
			List<Operator> operatorList= findByPage(hql, values, (page - 1)
					* pageSize, pageSize);
			//fillPagetoMap(map, hql, values, page, pageSize);
			for(Operator temp:operatorList)
			{
				//String roleid=temp.getRoleId().toString();
				if(null!=temp.getRoleId() && temp.getRoleId().length()!=0)
				{
					String roleid=temp.getRoleId().toString();
					for(NameAndId roleTemp:roleList)
					{
						String id=roleTemp.getId().toString();
						if(roleid.equals(id))
						{
							temp.setRoleName(roleTemp.getName().toString());
							break;
						}
					}
				}
			}
			map.put("total", count);
			map.put("rows", operatorList);

		
	}

	@Override
	public int txSave(Operator operator, Operator OperatorToSave)
	{
		int value=0; //标示保存操作是否成功。1为成功，0为失败
		OperatorToSave.setId(null);
		if(OperatorToSave.getRoleId()==null||OperatorToSave.getRoleId().length()==0)
		{
			OperatorToSave.setRoleId(operator.getRoleId());
		}
		OperatorToSave.setStatus(StatusEnum.initialize.ordinal());
		String password=OperatorToSave.getPassword().toString();
		OperatorToSave.setPassword(Encrypt.encryptPassword(password));
		
		if(!checkAccountWhetherExist(OperatorToSave.getAccount(),OperatorToSave.getId()))
		{
			
				save(OperatorToSave);
				writeLog(operator, "添加", "操作员", OperatorToSave);
				value=1;
			
		}
		return value;
	}

	@Override
	public void txDel(Operator operator, String[] idlist)
	{
		for (String id : idlist)
		{
			Operator oper=this.findById(id);
		//	oper.setStatus(StatusEnum.disable.ordinal());
			//saveOrUpdate(oper);
			delete(oper);
			writeLog(operator, "删除", "操作员", oper);
			//delete(id);
		}		
	}

	@Override
	public boolean txUpdate(Operator oper, Operator operator, String id)
	{
		//findById(id);
		operator.setId(id);
		if(!checkAccountWhetherExist(operator.getAccount(),id))
		{
			String password=operator.getPassword().toString();
			operator.setPassword(Encrypt.encryptPassword(password));
		   saveOrUpdate(operator);
	       writeLog(oper, "修改", "操作员信息",operator);	
	       return true;
		}
		else
		{
			return false;
		}
	}

	@Override
	public List<Menu> getPrivileges(Operator operator)
	{
		Object[] obj=new Object[1];
		obj[0]=operator.getRoleId();
		String hql = "from Menu where id in(select menuId from RoleMenu where roleId=?) order by order";
		List<Menu> list = getHibernateTemplate().find(hql,obj); 
		int order = 0;
		List<Menu> menuList = new ArrayList<Menu>();
		Menu menu = null;
		Menu childMenu = null;
		for (int i = 0; i < list.size(); i++)
		{
			menu = list.get(i);
			if (menu.getPorder()==0)
			{
				order = menu.getOrder();
				for (int j = 0; j < list.size(); j++)
				{

					childMenu = list.get(j);
					if (childMenu.getPorder()==order)
					{
						menu.getChildMenus().add(childMenu);
					}
				}
				if (menu.getChildMenus().size() > 0)
				{
					menuList.add(menu);
				}
			}
		}

		return menuList;

	}

	public IRoleService getRoleService()
	{
		return roleService;
	}

	public void setRoleService(IRoleService roleService)
	{
		this.roleService = roleService;
	}
	
	private boolean checkAccountWhetherExist(String account,String id)
	{
		long oper_flag=getCount("select count(*) from Operator where  status!="
				+ StatusEnum.disable.ordinal()+" and account='"
						+ account + "' and id!='"+id+"'");
		if(oper_flag==0)
		{
		return false;
		}
		else
		{
		return true;
		}
		
	}

}
