package cn.jxufe.emlab.match.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.jxufe.emlab.match.core.BaseDao;
import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.pojo.TrainItem;
import cn.jxufe.emlab.match.util.Encrypt;
import cn.jxufe.emlab.match.util.StatusEnum;

public class MemberService extends BaseDao<Member> implements IMemberService {
	private ITrainItemService trainItemService;

	@Override
	public Member verifyMember(String account, String password) {
		password = Encrypt.encryptPassword(password);
		Object[] obj = new Object[2];
		obj[0] = account;
		obj[1] = password;
		Member member = (Member) uniqueResult(
				"from Member where account=? and password=?", obj);

		return member;
	}

	@Override
	public void getMemberByPage(Map map, int page, int pageSize,
			String account, String name, Operator oper) {

		String hql = "from Member where  status!="
				+ StatusEnum.disable.ordinal();
		int paramNums = 0;
		ArrayList<Object> al = new ArrayList<Object>();
		if (null != name && name.length() != 0) {
			hql += " and name like ?";
			al.add("%" + name + "%");
			paramNums++;
		}

		if (null != account && account.length() != 0) {
			hql += " and account = ?";
			al.add(account);
			paramNums++;
		}
		Object[] values = al.toArray(new Object[paramNums]);
		fillPagetoMap(map, hql, values, page, pageSize);

	}

	public List<Member> getTrainMemberList(String account, String name, String trainItemId, Operator oper) {
		
		String sql="select * from T_member where status!="
					+ StatusEnum.disable.ordinal() ;  //id in( select memberId from T_trainMember where trainItemId='b7574d5a-2a21-45e9-bf80-fc6e1febb2ee')
	
		if (null != account&&account.length()!=0){
			sql += " and account='"+account+"'";
		}
		
		if (null != name && name.length() != 0) {
			sql += " and name like '%"+name+"%'";
		}

		if (null != trainItemId && trainItemId.length() != 0) {
			sql += " and id in( select memberId from T_trainMember where trainItemId='"+trainItemId+"')";
		}
		return findBySQL(sql);
	}

	@Override
	public int txSave(Member member) {
		int value = 0; // 标示保存操作是否成功。1为成功，0为失败
		member.setId(null);
		member.setStatus(StatusEnum.initialize.ordinal());
		String password = member.getPassword().toString();
		member.setPassword(Encrypt.encryptPassword(password));

		if (!checkAccountWhetherExist(member.getAccount(), member.getId())) {

			save(member);
			value = 1;
		}
		return value;
	}

	@Override
	public void txDel(Operator operator, String[] idlist) {
		for (String id : idlist) {
			Member member = this.findById(id);
			delete(member);
			writeLog(operator, "删除", "会员", member);
		}
	}

	@Override
	public boolean txUpdate(Member member, String id) {
		Member nativeMember = findById(id);
		if (!checkAccountWhetherExist(member.getAccount(), id)) {
			nativeMember.setPassword(Encrypt.encryptPassword(member
					.getPassword()));
			nativeMember.setAccount(member.getAccount());
			nativeMember.setName(member.getName());
			nativeMember.setPhone(member.getPhone());
			nativeMember.setIsJxufe(member.getIsJxufe());
			nativeMember.setProfession(member.getProfession());
			// saveOrUpdate(nativeMember);
			return true;
		} else {
			return false;
		}
	}

	private boolean checkAccountWhetherExist(String account, String id) {
		long oper_flag = getCount("select count(*) from Member where  status!="
				+ StatusEnum.disable.ordinal() + " and account='" + account
				+ "' and id!='" + id + "'");
		if (oper_flag == 0) {
			return false;
		} else {
			return true;
		}

	}

	public boolean txAttendTrain(String memeberId, String trainItemId) {
		if (memeberId != null && null != trainItemId) {
			TrainItem item = trainItemService.findById(trainItemId);
			Member memeber = findById(memeberId);
			if (!memeber.getTrainItems().contains(item)) {
				memeber.getTrainItems().add(item);
				saveOrUpdate(memeber);
				return true;
			}
		}
		return false;
	}

	public ITrainItemService getTrainItemService() {
		return trainItemService;
	}

	public void setTrainItemService(ITrainItemService trainItemService) {
		this.trainItemService = trainItemService;
	}

}
