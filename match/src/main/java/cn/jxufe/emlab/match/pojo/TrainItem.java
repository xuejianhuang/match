package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;
import java.util.Date;


/**
 * MatchProject entity. @author MyEclipse Persistence Tools
 */

public class TrainItem extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


    // Fields    

     private String id;
     private String name;
     private String comment;
     private Timestamp createtime;
     private String caption;
     private String matchId;
     private String matchProjectId;
     private String introduction;
     private Date startDate;
     private Date endDate;
     private int isLocked;
     private int status;
     private String logo;


    // Constructors

    /** default constructor */
    public TrainItem() {
    }

	/** minimal constructor */
    public TrainItem(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public TrainItem(String id, String name, String comment, Timestamp createtime, String caption, String matchId,  String matchProjectId, String introduction, Date startDate, Date endDate, int isLocked, int status, String logo) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.createtime = createtime;
        this.caption = caption;
        this.matchId = matchId;
        this.matchProjectId=matchProjectId;
        this.introduction = introduction;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isLocked = isLocked;
        this.status = status;
        this.logo = logo;
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

    public String getCaption() {
        return this.caption;
    }
    
    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getMatchId() {
        return this.matchId;
    }
    
    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

   

	public void setIsLocked(int isLocked) {
		this.isLocked = isLocked;
	}

	public int getIsLocked() {
		return isLocked;
	}

	
    public String getMatchProjectId() {
		return matchProjectId;
	}

	public void setMatchProjectId(String matchProjectId) {
		this.matchProjectId = matchProjectId;
	}

	public String getIntroduction() {
        return this.introduction;
    }
    
    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Date getStartDate() {
        return this.startDate;
    }
    
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }
    
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    public int getStatus() {
        return this.status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }

    public String getLogo() {
        return this.logo;
    }
    
    public void setLogo(String logo) {
        this.logo = logo;
    }
   








}