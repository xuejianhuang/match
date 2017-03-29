package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.StatusEnum;




public class MemberService extends BaseDao<Member> implements
		IMemberService
{
	@Override
	public Member verifyMember(String account, String password)
	{
		password = Encrypt.encryptPassword(password);
		Object[] obj=new Object[2];
		obj[0]=account;
		obj[1]=password;
		Member member = (Member) uniqueResult("from Member where account=? and password=?",obj);
		
		return member;
	}

	@Override
	public void getMemberByPage(Map map, int page, int pageSize,
			String account, String roleId, Operator oper)
	{
		

		
	}

	@Override
	public int txSave(Member member)
	{
		int value=0; //标示保存操作是否成功。1为成功，0为失败
		member.setId(null);
		member.setStatus(StatusEnum.initialize.ordinal());
		String password=member.getPassword().toString();
		member.setPassword(Encrypt.encryptPassword(password));
		
		if(!checkAccountWhetherExist(member.getAccount(),member.getId()))
		{
			
				save(member);
				value=1;
		}
		return value;
	}

	@Override
	public void txDel(Operator operator, String[] idlist)
	{
		for (String id : idlist)
		{
			Member member=this.findById(id);
			delete(member);
			writeLog(operator, "删除", "会员", member);
		}		
	}

	@Override
	public boolean txUpdate(Member member, String id)
	{
		member.setId(id);
		if(!checkAccountWhetherExist(member.getAccount(),id))
		{
		   saveOrUpdate(member);
	       return true;
		}
		else
		{
			return false;
		}
	}

	private boolean checkAccountWhetherExist(String account,String id)
	{
		long oper_flag=getCount("select count(*) from Member where  status!="
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
