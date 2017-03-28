package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;
import java.util.Date;


/**
 * MatchNewsId entity. @author MyEclipse Persistence Tools
 */

public class MatchNews extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


    // Fields    

     /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
     private String name;
     private String comment;
     private Timestamp createtime;
     private String matchId;
     private String caption;
     private String abstractText;
     private String body;
     private String bigImageUrl;
     private String smallImageUrl;
     private Date publishTime;
     private int status;


    // Constructors

    /** default constructor */
    public MatchNews() {
    }

	/** minimal constructor */
    public MatchNews(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public MatchNews(String id, String name, String comment, Timestamp createtime, String matchId, String caption, String abstractText, String body, String bigImageUrl, String smallImageUrl, Date publishTime, int status) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.createtime = createtime;
        this.matchId = matchId;
        this.caption = caption;
        this.abstractText = abstractText;
        this.body = body;
        this.bigImageUrl = bigImageUrl;
        this.smallImageUrl = smallImageUrl;
        this.publishTime = publishTime;
        this.status = status;
    }

   
    // Property accessors

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return this.comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }

    public Timestamp getCreatetime() {
        return this.createtime;
    }
    
    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

    public String getMatchId() {
        return this.matchId;
    }
    
    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public String getCaption() {
        return this.caption;
    }
    
    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getAbstractText() {
        return this.abstractText;
    }
    
    public void setAbstractText(String abstractText) {
        this.abstractText = abstractText;
    }

    public String getBody() {
        return this.body;
    }
    
    public void setBody(String body) {
        this.body = body;
    }

    public String getBigImageUrl() {
        return this.bigImageUrl;
    }
    
    public void setBigImageUrl(String bigImageUrl) {
        this.bigImageUrl = bigImageUrl;
    }

    public String getSmallImageUrl() {
        return this.smallImageUrl;
    }
    
    public void setSmallImageUrl(String smallImageUrl) {
        this.smallImageUrl = smallImageUrl;
    }

   
    public Date getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}

	public int getStatus() {
        return this.status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
}