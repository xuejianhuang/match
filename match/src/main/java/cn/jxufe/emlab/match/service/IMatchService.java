package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;
import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
public interface IMatchService  extends IBaseDao<Match>{
	/*
	 * 分页查询赛事
	 */
	public void getMatchByPage(Map map,  int page,  int pageSize,int year,Operator oper);
	/*
	 * 添加赛事
	 */
	public void txSaveMatch(Operator oper,Match match);
	/*
	 * 批量删除赛事
	 */
	public void txDeleteMatch(Operator oper,String[] idList);
	/*
	 * 更新赛事
	 */
	public void txUpdateMatch(Operator oper,Match match,String id);
	/*
	 * 得到所有赛事的年份
	 */
	public List<Integer> getMatchYear(Operator oper);
	/*
	 * 得到所有赛事的名称和id
	 */
	public List<NameAndId> getAllMatchNameAndId(Operator oper); 

		
}
