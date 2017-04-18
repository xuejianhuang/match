package cn.jxufe.emlab.match.controller;


import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import cn.jxufe.emlab.match.email.AccountEmailService;
import cn.jxufe.emlab.match.util.DrawImage;
import cn.jxufe.emlab.match.util.KeyEnum;
import cn.jxufe.emlab.match.util.RandomGenerator;




@SuppressWarnings("serial")
public class GetValidateCode extends BaseAction
{
	private String email;
    private  AccountEmailService accountEmailService;
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getImageCode() throws IOException
	{
		BufferedImage buffImg=DrawImage.randomDrawImage(70,20,4);
		Map session=getSession();
	    session.put(KeyEnum.VALIDATE_IMAGE_CODE_KEY,DrawImage.code);
		HttpServletResponse resp=getResponse();
		resp.setHeader("Pragma", "no-cache");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0);

		resp.setContentType("image/jpeg");

		ServletOutputStream sos = resp.getOutputStream();
		ImageIO.write(buffImg, "jpeg", sos);
		sos.close();
		return null;
	}
	public String sendEmailCode() throws Exception
	{
		String randomString=RandomGenerator.getRandomString(4);
		accountEmailService.sendMail( email, "江西财经大学大赛网认证码", randomString);
		Map session=getSession();
	    session.put(KeyEnum.VALIDATE_EMAIL_CODE_KEY,randomString);
		return null;
	}
	public AccountEmailService getAccountEmailService() {
		return accountEmailService;
	}
	public void setAccountEmailService(AccountEmailService accountEmailService) {
		this.accountEmailService = accountEmailService;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
