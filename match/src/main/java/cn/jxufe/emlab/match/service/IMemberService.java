package cn.jxufe.emlab.match.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.MemberVO;
import cn.jxufe.emlab.match.pojo.Operator;



public interface IMemberService extends IBaseDao<Member>{
	public Member verifyMember(String account, String password);
	
	public void getMemberByPage(Map map, final int page, final int pageSize,String account,String name,String school,String major,Operator oper);
	
	public void sendEmailTOMember(String account,String name,String school,String major,String title,String content,String resource,String trainItemId,String matchProjectId,String groupName,Operator oper);
	
	public int txSave(Member member);
	public void txDel(Operator operator, String[] idlist);
	public boolean txUpdate(Member member,String id);
	
	public Member txMemberUpdate(Member member,String id);
	
	public int txAttendTrain(String memeberId,String trainItemId);
	
	public int txAttendIndividualMatchProject(String memeberId,String matchProjectId);
	
	public int txBuildTeamMatchProjectGroup(String memeberId,String matchProjectId,String caption);
	
	public int txAttendGroup(String memeberId,String groupId );
	
	public boolean txCancelTrain(String memeberId,String trainItemId);
	
	public boolean txCancelMatchProject(String memberId, String matchProjectId);
	
	public boolean txDeleteTeamMember(Member operMember,String memberId,String groupId);
	
	
	public List<Member> getTrainMemberList(String account, String name, String trainItemId, String school,String major,Operator oper);
	
	public List<MemberVO> getMatchProjectMemberList(String account, String name, String matchProjectId, String school,String major,String groupName,Operator oper);
	
	public Map<String,Double> getPropertyRatio(String property);
	public Map<String,Integer> getMemberSignupYearLine();
}
