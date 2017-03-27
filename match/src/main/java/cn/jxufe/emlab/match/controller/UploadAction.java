package cn.jxufe.emlab.match.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletContext;

import net.coobird.thumbnailator.Thumbnails;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.codehaus.jackson.map.ObjectMapper;

import com.opensymphony.xwork2.ActionContext;

public class UploadAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6382684172085779788L;
	private File filedata;
	private String filename;
	private String contentType;
	private String filedataFileName,filedataContentType;
	private String type;
	private final static String IMG_EXT = "jpg|gif|png";
	private final static String LINK_EXT = "zip|rar|txt|doc|xls|ppt";
	private final static String UPLOAD_PATH = "/upload";
	
	public void setFiledataFileName(String filedataFileName) {
		this.filedataFileName = filedataFileName;
	}
	public String getFiledataFileName() {
		return filedataFileName;
	}
	public void setFiledataContentType(String filedataContentType) {
		this.filedataContentType = filedataContentType;
	}
	public String getFiledataContentType() {
		return filedataContentType;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getType() {
		return type;
	}
	public void setFiledata(File filedata) {
		this.filedata = filedata;
	}
	public File getFiledata() {
		return filedata;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	
	public String upload() throws IOException{
		String extAllowed=null;
		Map<String,String> json = new HashMap<String,String>();
		if("link".equals(type))
			extAllowed = LINK_EXT;
		if("img".equals(type))
			extAllowed = IMG_EXT;
		if(!isExtAllow(filedataFileName,extAllowed)){
			json.put("err", "文件类型错误！");
			json.put("msg", "");			
		}else{
			ServletContext context = (ServletContext) (ActionContext
					.getContext().get(ServletActionContext.SERVLET_CONTEXT));
			
			String path = context.getRealPath(UPLOAD_PATH);
			String newFileName = getRandomFilename(filedataFileName);
			File target = new File(path, newFileName);
			try {
			//	Thumbnails.of(filedata).size(340, 200).toFile(target);
		    	FileUtils.copyFile(filedata, target);
				json.put("err", "");
				json.put("msg", "/match_web/upload/" + newFileName);
			} catch (IOException e) {
				json.put("err", "文件上传失败！");
				json.put("msg", "");				
			}
		}
			getResponse().setContentType("text/html;charset=utf-8");
			PrintWriter writer = ServletActionContext.getResponse().getWriter();
			ObjectMapper mapper = new ObjectMapper();
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			mapper.getSerializationConfig().setDateFormat(format);
			mapper.writeValue(writer, json);		
		
//		jsonView(json);
		return null;
	}
	
	static public String getRandomFilename(String filename){
		String extension = filename.substring(filename.lastIndexOf("."));
		DateFormat format = new SimpleDateFormat("yyMMddHHmmss");
		String nameHeader = format.format(new Date());
		return nameHeader+new Random().nextInt(100)+extension;
	}
	
	private Boolean isExtAllow(String filename,final String ext){
		String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase().substring(1);
		String[] exts = ext.split("\\|");
		for(String item:exts){
			if(item.equals(extension))
				return true;
		}
		return false;
	}

}
