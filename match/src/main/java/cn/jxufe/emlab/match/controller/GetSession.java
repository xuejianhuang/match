package cn.jxufe.emlab.match.controller;

import java.io.IOException;

import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.KeyEnum;




@SuppressWarnings("serial")
public class GetSession extends BaseAction
{
	
	public String getOperatorInfo() throws IOException{
		Operator oper=(Operator) getSession().get(KeyEnum.OPERATOR);
		jsonViewIE(oper);
		return null;
	}
	public String getMemberInfo() throws IOException{
		Member memeber=(Member) getSession().get(KeyEnum.MEMBER);
		jsonViewIE(memeber);
		return null;
	}
}
