package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnore;

import cn.jxufe.emlab.match.poi.ExcelVOAttribute;


/**
 * Member entity. @author MyEclipse Persistence Tools
 */

public class Member extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


    // Fields    

     private String id;
     @ExcelVOAttribute(name="姓名",column="B")
     private String name;
     private String comment;
     private Timestamp createtime;
     @ExcelVOAttribute(name="账号",column="A")
     private String account;
     private String password;
     private int isJxufe;
     private int profession;
     @ExcelVOAttribute(name="手机号",column="C")
     private String phone;
     private Timestamp signupTime;
     private int status;
     
     @ExcelVOAttribute(name="学校",column="D")
     private String school;
     
     @ExcelVOAttribute(name="专业",column="E")
     private String major;
     private Set<TrainItem> trainItems;


    // Constructors

    /** default constructor */
    public Member() {
    }

	/** minimal constructor */
    public Member(String id) {
        this.id = id;
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

    public String getAccount() {
        return this.account;
    }
    
    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return this.password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public int getIsJxufe() {
        return this.isJxufe;
    }
    
    public void setIsJxufe(int isJxufe) {
        this.isJxufe = isJxufe;
    }

    public int getProfession() {
        return this.profession;
    }
    
    public void setProfession(int profession) {
        this.profession = profession;
    }

    public String getPhone() {
        return this.phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Timestamp getSignupTime() {
        return this.signupTime;
    }
    
    public void setSignupTime(Timestamp signupTime) {
        this.signupTime = signupTime;
    }

    public int getStatus() {
        return this.status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    
    

    public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	@JsonIgnore public Set<TrainItem> getTrainItems() {
		return trainItems;
	}

	 @JsonIgnore	public void setTrainItems(Set<TrainItem> trainItems) {
		this.trainItems = trainItems;
	}
   








}