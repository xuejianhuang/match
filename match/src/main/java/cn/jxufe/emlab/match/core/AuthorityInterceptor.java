package cn.jxufe.emlab.match.core;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.map.ObjectMapper;

import cn.jxufe.emlab.match.pojo.Member;
import cn.jxufe.emlab.match.pojo.Operator;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.StatusEnum;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class AuthorityInterceptor extends AbstractInterceptor {
	public String intercept(ActionInvocation invocation) throws Exception {
		ActionContext ctx = invocation.getInvocationContext();

		// ////////////////
		String actionName = invocation.getInvocationContext().getName();

		String actionMethod = invocation.getProxy().getMethod();
		if (actionMethod != null) {
			if (actionMethod.startsWith("get")
					|| actionMethod.startsWith("login")
					|| actionMethod.startsWith("signup")
					|| actionMethod.startsWith("relogin")
					||actionMethod.startsWith("forgetPassword")
					) {
				return invocation.invoke();
			}
		}

		// /////////////
		Map<String, Object> session = ctx.getSession();
		Member member = (Member) session.get(KeyEnum.MEMBER);
		Map jsondata = new HashMap();
		Operator operator = (Operator) session.get(KeyEnum.OPERATOR);
		if ((operator != null)
				|| (member != null && actionName.startsWith("member"))) {
			return invocation.invoke();
		} else {
			// ctx.put("tip", "系统使用超时，请重新登录...");
			jsondata.put(KeyEnum.STATUS, StatusEnum.timeout);
			// jsonView(jsondata);

			HttpServletResponse response = (HttpServletResponse) ctx
					.get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
			response.setContentType("text/html;charset=utf-8");
			PrintWriter writer = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(writer, jsondata);
			
			return null;
		}
	}

}
