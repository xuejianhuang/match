package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.MatchNews;
import cn.jxufe.emlab.match.pojo.MatchProject;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;



public interface ITrainItemService  extends IBaseDao<TrainItem>{
	
	public void getTrainItemByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	public List<TrainItem> getEnableTrainItem();
	public boolean txSaveTrainItem(Operator oper,TrainItem trainItem);
	public void txDeleteTrainItem(Operator oper,String[] idList);
	public boolean txUpdateTrainItem(Operator oper,TrainItem trainItem,String id);
	public void txUpdateTrainItemIsLockedStatus(Operator oper,String id,int isLocked);
	public void getTrainStatisticsByPage(Map map, int page, int pageSize,String matchId, Operator oper);
}
