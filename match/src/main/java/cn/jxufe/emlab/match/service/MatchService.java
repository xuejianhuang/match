package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Match;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class MatchService extends BaseDao<Match> implements IMatchService {
	/*
	 * 添加赛事
	 */
	@Override
	public void txSaveMatch(Operator oper, Match match) {
		match.setId(null);
		match.setStatus(StatusEnum.initialize.ordinal());
		match.setYear(DateUtil.getDateYear(match.getHoldtime()));
		save(match);
		writeLog(oper, "添加", "赛事", match);
	}

	/*
	 * 批量删除赛事
	 */
	@Override
	public void txDeleteMatch(Operator operator, String[] idlist) {
		for (String id : idlist) {
			Match match = this.findById(id);
			if (match != null) {
				delete(match);
				writeLog(operator, "删除", "赛事", match);
			}
		}
	}

	/*
	 * 更新赛事
	 */
	@Override
	public void txUpdateMatch(Operator oper, Match match, String id) {
		// findById(id);
		match.setId(id);
		match.setYear(DateUtil.getDateYear(match.getHoldtime()));
		saveOrUpdate(match);
		writeLog(oper, "修改", "赛事", match);
	}

	/*
	 * 分页查询赛事
	 */
	@Override
	public void getMatchByPage(Map map, int page, int pageSize, int year,
			Operator oper) {
		ArrayList<Object> values = new ArrayList<Object>();
		String hql = "from Match  where  status!="
				+ StatusEnum.disable.ordinal();
		if (year > 0) {

			hql += " and year =?";
			values.add(year);
		}
		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, values, page, pageSize);
	}

	/*
	 * 得到所有比赛的年份
	 */
	public List<Integer> getMatchYear(Operator oper) {
		String hql = "select year from Match group by year order by year ";
		return publicFind(hql);
	}

	/*
	 * 得到所有赛事的名称和id
	 */
	public List<NameAndId> getAllMatchNameAndId(Operator oper) {
		List<NameAndId> list = new ArrayList<NameAndId>();
		NameAndId nameAndId = null;
		List<Match> roleList = null;
		String hql = "from Match where status!=" + StatusEnum.disable.ordinal()
				+ " order by createtime desc";
		roleList = find(hql);
		nameAndId = new NameAndId();
		nameAndId.setId("");
		nameAndId.setName("全部");
		list.add(nameAndId);
		for (Match match : roleList) {
			nameAndId = new NameAndId();
			nameAndId.setId(match.getId());
			nameAndId.setName(match.getCaption());
			list.add(nameAndId);
		}
		return list;
	}

}
