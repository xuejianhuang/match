package cn.jxufe.emlab.match.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;

public class DownloadAction extends BaseAction {
	private String target;

	public String download() throws IOException {
		Map<String, String> json = new HashMap<String, String>();
		ServletContext context = (ServletContext) (ActionContext.getContext()
				.get(ServletActionContext.SERVLET_CONTEXT));
		HttpServletRequest reqeust = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		target = new String(target.getBytes("iso-8859-1"),"UTF-8");
		String fullFilePath = reqeust.getServletContext().getRealPath("/")
				+ target;

		/* 读取文件 */

		File file = new File(fullFilePath);

		/* 如果文件存在 */

		if (file.exists()) {

			// String filename = URLEncoder.encode(file.getName(), "UTF-8");
			String filename = new String(file.getName().getBytes(),
					"ISO-8859-1");
			// String filename = file.getName();

			response.reset();
			// resp.setCharacterEncoding("UTF-8");

			response.setContentType("application/x-msdownload");

			response.addHeader("Content-Disposition", "attachment; filename=\""
					+ filename + "\"");

			int fileLength = (int) file.length();

			response.setContentLength(fileLength);

			/* 如果文件长度大于0 */

			if (fileLength != 0) {

				/* 创建输入流 */

				InputStream inStream = new FileInputStream(file);

				byte[] buf = new byte[4096];

				/* 创建输出流 */

				ServletOutputStream servletOS = response.getOutputStream();

				int readLength;

				while (((readLength = inStream.read(buf)) != -1)) {

					servletOS.write(buf, 0, readLength);

				}
				inStream.close();

				servletOS.flush();

				servletOS.close();

			}
		}

		return null;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

}
