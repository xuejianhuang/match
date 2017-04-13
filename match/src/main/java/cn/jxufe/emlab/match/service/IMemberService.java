package cn.jxufe.emlab.match.service;

import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Menu;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMemberService extends IBaseDao<Member>{
	public Member verifyMember(String account, String password);
	public void getMemberByPage(Map map, final int page, final int pageSize,String account,String name,String school,String major,Operator oper);
	public int txSave(Member member);
	public void txDel(Operator operator, String[] idlist);
	public boolean txUpdate(Member member,String id);
	
	public Member txMemberUpdate(Member member,String id);
	
	public boolean txAttendTrain(String memeberId,String trainItemId);
	
	public boolean txAttendIndividualMatchProject(String memeberId,String matchProjectId);
	
	public boolean txBuildTeamMatchProjectGroup(String memeberId,String matchProjectId,String caption);
	
	public int txAttendGroup(String memeberId,String groupId );
	
	public boolean txCancelTrain(String memeberId,String trainItemId);
	
	
	public List<Member> getTrainMemberList(String account, String name, String trainItemId, String school,String major,Operator oper);
}
