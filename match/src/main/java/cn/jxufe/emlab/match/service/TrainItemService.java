package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.NameAndId;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

@SuppressWarnings("unchecked")
public class TrainItemService extends BaseDao<TrainItem> implements
		ITrainItemService {
	@Override
	public boolean txSaveTrainItem(Operator oper, TrainItem trainItem) {
		if (null != trainItem) {
			if (DateUtil.validateDateOrder(trainItem.getStartDate(),
					trainItem.getEndDate())) {
				trainItem.setId(null);
				trainItem.setStatus(StatusEnum.initialize.ordinal());
				save(trainItem);
				writeLog(oper, "添加", "培训项", trainItem);
				return true;
			}
		}
		return false;
	}

	@Override
	public void txDeleteTrainItem(Operator operator, String[] idlist) {
		for (String id : idlist) {
			TrainItem trainItem = this.findById(id);
			if (trainItem != null) {
				delete(trainItem);
				writeLog(operator, "删除", "培训项", trainItem);
			}
		}
	}

	@Override
	public boolean txUpdateTrainItem(Operator oper, TrainItem trainItem,
			String id) {
		if (null != trainItem) {
			if (DateUtil.validateDateOrder(trainItem.getStartDate(),
					trainItem.getEndDate())) {
				trainItem.setId(id);
				saveOrUpdate(trainItem);
				writeLog(oper, "修改", "培训项", trainItem);
				return true;
			}
		}
		return false;
	}

	public void txUpdateTrainItemIsLockedStatus(Operator oper, String id,
			int isLocked) {
		TrainItem trainItem = findById(id);
		if (null != trainItem) {
			trainItem.setIsLocked(isLocked);
		}
	}

	@Override
	public void getTrainItemByPage(Map map, int page, int pageSize,
			String matchId, Operator oper) {
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from TrainItem where  status!="
				+ StatusEnum.disable.ordinal() ;
		
		if (null != matchId && matchId.length() != 0) {

			hql += " and matchId = ?";
			al.add(matchId);
		}

		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql,  al, page, pageSize);
	}

	public void getTrainStatisticsByPage(Map map, int page, int pageSize,
			String matchId, Operator oper) {
		
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from TrainItem where  status!="
				+ StatusEnum.disable.ordinal() ;
		if (null != matchId && matchId.length() != 0)
		{
			hql+=" and matchId=?";
			al.add(matchId);
			
		}
		hql = hql + " order by createtime desc";
		List<TrainItem> trainList = fillPagetoMap(map, hql, al, page, pageSize);
		for(TrainItem item:trainList)
		{
			item.setMemberSum(item.getMembers().size());
		
		}
	}

	public List<TrainItem> getEnableTrainItem() {
		String hql = "from TrainItem where  isLocked='0' order by createtime desc";
		return find(hql);
	}
	public List<TrainItem>  getTrainByMemberId(String memberId)
	{
		String sql="select * from T_trainItem where status!="
				+ StatusEnum.disable.ordinal() ;  //id in( select memberId from T_trainMember where trainItemId='b7574d5a-2a21-45e9-bf80-fc6e1febb2ee')
	if (null != memberId && memberId.length() != 0) {
		sql += " and id in( select trainItemId from T_trainMember where memberId='"+memberId+"')";
	}
	return findSQL(sql);
	}

}