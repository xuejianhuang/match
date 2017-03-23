package cn.jxufe.emlab.match.controller;

import java.io.IOException;

import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.KeyEnum;




@SuppressWarnings("serial")
public class GetSession extends BaseAction
{
	
	public String getUserInfo() throws IOException{
		Operator oper=(Operator) getSession().get(KeyEnum.OPERATOR);
		jsonViewIE(oper);
		return null;
	}
}
