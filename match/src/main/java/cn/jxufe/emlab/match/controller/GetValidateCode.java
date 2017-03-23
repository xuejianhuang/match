package cn.jxufe.emlab.match.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import cn.jxufe.emlab.match.util.DrawImage;
import cn.jxufe.emlab.match.util.KeyEnum;




@SuppressWarnings("serial")
public class GetValidateCode extends BaseAction
{
	
	  
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getCode() throws IOException
	{
		BufferedImage buffImg=DrawImage.randomDrawImage(70,20,4);
		Map session=getSession();
	    session.put(KeyEnum.VALIDATE_CODE_KEY,DrawImage.code);
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
}
