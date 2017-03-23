package cn.jxufe.emlab.match.util;

import org.hibernate.cfg.Configuration;  
import org.hibernate.tool.hbm2ddl.SchemaExport;  
public class ExportDB {
	  /**  
     * 将hbm转成ddl  
     *   
     * @param args  
     */  
    public static void main(String[] args) {  
        // 如果直接new Configuration 默认读取的是hibernate.properties 文件  
        // 后边再加.configure()读取的才是hibernate.cfg.xml 文件，  
        Configuration cfg = new Configuration().configure();  
        // 创建SchemaExport对象  
        SchemaExport export = new SchemaExport(cfg);  
        // 生成ddl文件，并在控制台输出  
        export.create(true, true);  
    }  
  

}
