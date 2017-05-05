package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.DateUtil;
import cn.jxufe.emlab.match.util.StatusEnum;

public class TrainItemService extends BaseDao<TrainItem> implements
		ITrainItemService {
	/*
	 * 添加培训项目
	 */
	@Override
	public boolean txSaveTrainItem(Operator oper, TrainItem trainItem) {
		if (null != trainItem) {
			if (DateUtil.validateDateOrder(trainItem.getStartDate(),
					trainItem.getEndDate())) { //验证培训的开始时间是否在结束时间之前
				trainItem.setId(null);
				trainItem.setStatus(StatusEnum.initialize.ordinal());
				save(trainItem);
				writeLog(oper, "添加", "培训项", trainItem);
				return true;
			}
		}
		return false;
	}
	/*
	 * 删除培训
	 */
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
	/*
	 * 更新培训
	 */
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
	/*
	 * 更新培训是否可以报名的状态
	 */
	public void txUpdateTrainItemIsLockedStatus(Operator oper, String id,
			int isLocked) {
		TrainItem trainItem = findById(id);
		if (null != trainItem) {
			trainItem.setIsLocked(isLocked);
		}
	}
	/*
	 * 分页查询培训项目
	 */
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
	/*
	 * 统计报名信息
	 */
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
			item.setMemberSum(item.getMembers().size());  //报名总人数
		
		}
	}
	/*
	 * 分页查询所有培训项目(根据是否可以报名和创建时间排序)
	 */
	public void getAttendTrainItem(Map map, int page,  int pageSize) {
		
		String hql = "from TrainItem where  status!="
				+ StatusEnum.disable.ordinal() ;
		hql = hql + " order by isLocked, createtime desc";
	    fillPagetoMap(map, hql,null, page, pageSize);
	}
	/*
	 * 获取可以报名的培训
	 */
	public List<TrainItem> getEnableTrainItem() {
		String hql = "from TrainItem where  isLocked='0' order by createtime desc";
		return find(hql);
	}
	/*
	 * 查询某个会员报名的所有培训
	 */
	public List<TrainItem>  getTrainByMemberId(String memberId)
	{
		String sql="select * from T_trainItem where status!="
				+ StatusEnum.disable.ordinal() ;  //id in( select memberId from T_trainMember where trainItemId='b7574d5a-2a21-45e9-bf80-fc6e1febb2ee')
	if (null != memberId && memberId.length() != 0) {
		sql += " and id in( select trainItemId from T_trainMember where memberId='"+memberId+"') order by createtime desc";
	}
	return findSQL(sql);
	}
	/*
	 * 得到培训报名人数
	 */
	public JsonArray getTrainMemberNum(String matchId,Operator oper)
	{
		ArrayList<Object> al = new ArrayList<Object>();
		String hql = "from TrainItem where  status!="
				+ StatusEnum.disable.ordinal() ;
		if (null != matchId && matchId.length() != 0)
		{
			hql+=" and matchId=?";
			al.add(matchId);
		}
		hql = hql + " order by createtime desc";
		List<TrainItem> trainList = find(hql, al);
		JsonArray jsonArray = new JsonArray();
		for(TrainItem item:trainList) {
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("trainCaption",
					item.getCaption());
			jsonObject.addProperty("memberNum", item.getMembers().size());
			jsonArray.add(jsonObject);
		}
		return jsonArray;
	}

}
