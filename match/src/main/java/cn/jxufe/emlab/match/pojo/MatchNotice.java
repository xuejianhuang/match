package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;
import java.util.Date;


/**
 * MatchNewsId entity. @author MyEclipse Persistence Tools
 */

public class MatchNotice extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


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
     private String body;
     private Date publishTime;
     private int status;


    // Constructors

    /** default constructor */
    public MatchNotice() {
    }

	/** minimal constructor */
    public MatchNotice(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public MatchNotice(String id, String name, String comment, Timestamp createtime, String matchId, String caption,  String body,  Date publishTime, int status) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.createtime = createtime;
        this.matchId = matchId;
        this.caption = caption;
        this.body = body;
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


    public String getBody() {
        return this.body;
    }
    
    public void setBody(String body) {
        this.body = body;
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