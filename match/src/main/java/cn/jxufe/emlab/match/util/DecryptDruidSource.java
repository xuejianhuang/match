package cn.jxufe.emlab.match.util;

import com.alibaba.druid.filter.config.ConfigTools;
import com.alibaba.druid.pool.DruidDataSource;

public class DecryptDruidSource extends DruidDataSource {
	@Override
	public void setUsername(String username) {
		try {
			username = ConfigTools.decrypt(username);
		} catch (Exception e) {
			e.printStackTrace();
		}
		super.setUsername(username);
	}

	@Override
	public void setPassword(String password) {
		try {
			password = ConfigTools.decrypt(password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		super.setPassword(password);
	}

	public static void main(String[] args) throws Exception {
		// 生成加密后的密码，放到jdbc.properties
		String pwd = null;
		try {
			pwd = ConfigTools.encrypt("123456");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(pwd);
		System.out.println(ConfigTools.decrypt(pwd));
	}

}
