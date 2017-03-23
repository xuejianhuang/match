package cn.jxufe.emlab.match.core;

import javax.servlet.ServletContext;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class SpringFactory implements ApplicationContextAware
{
	private static ServletContext sctx = null;
	private static ApplicationContext ctx = null;




	public static Object getBean(String beanName)
	{
		if(ctx==null){
			ctx = WebApplicationContextUtils.getWebApplicationContext(sctx);
		}
		return ctx.getBean(beanName);
	}

	public static void setSctx(ServletContext sctx) {
		SpringFactory.sctx = sctx;
	}

	public static ServletContext getSctx() {
		return sctx;
	}

	public static void setContext(ApplicationContext ctx){
		SpringFactory.ctx = ctx;
	}

	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		ctx = arg0;
		// TODO Auto-generated method stub
		
	}
}
