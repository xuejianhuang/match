package cn.jxufe.emlab.match.service;


import java.util.List;
import java.util.Map;
import com.google.gson.JsonArray;
import cn.jxufe.emlab.match.core.IBaseDao;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;



public interface ITrainItemService  extends IBaseDao<TrainItem>{
	/*
	 * 分页查询培训项目
	 */
	public void getTrainItemByPage(Map map,  int page,  int pageSize,String matchId,Operator oper);
	/*
	 * 分页查询所有培训项目
	 */
	public void getAttendTrainItem(Map map, int page,  int pageSize);
	/*
	 * 获取可以报名的培训
	 */
	public List<TrainItem> getEnableTrainItem();
	/*
	 * 添加培训项目
	 */
	public boolean txSaveTrainItem(Operator oper,TrainItem trainItem);
	/*
	 * 删除培训
	 */
	public void txDeleteTrainItem(Operator oper,String[] idList);
	/*
	 * 更新培训
	 */
	public boolean txUpdateTrainItem(Operator oper,TrainItem trainItem,String id);
	/*
	 * 更新培训是否可以报名的状态
	 */
	public void txUpdateTrainItemIsLockedStatus(Operator oper,String id,int isLocked);
	/*
	 * 统计报名信息
	 */
	public void getTrainStatisticsByPage(Map map, int page, int pageSize,String matchId, Operator oper);
	/*
	 * 得到培训报名人数
	 */
	public JsonArray getTrainMemberNum(String matchId,Operator oper);
	/*
	 * 查询某个会员报名的所有培训
	 */
	public List<TrainItem> getTrainByMemberId(String memberId);
	
	
}
