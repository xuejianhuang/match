package cn.jxufe.emlab.match.service;

import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.MatchProject;
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
		String hql = "from TrainItem ";
		if (null != matchId && matchId.length() != 0) {

			hql += " where matchId = '" + matchId + "' ";
		}

		hql = hql + " order by createtime desc";
		fillPagetoMap(map, hql, null, page, pageSize);
	}
	

}
