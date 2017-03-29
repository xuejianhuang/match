package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;


/**
 * Member entity. @author MyEclipse Persistence Tools
 */

public class Member extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


    // Fields    

     private String id;
     private String name;
     private String comment;
     private Timestamp createtime;
     private String account;
     private String password;
     private int isJxufe;
     private int profession;
     private String phone;
     private Timestamp signupTime;
     private int status;


    // Constructors

    /** default constructor */
    public Member() {
    }

	/** minimal constructor */
    public Member(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public Member(String id, String name, String comment, Timestamp createtime, String account, String password, int isJxufe, int profession, String phone, Timestamp signupTime, int status) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.createtime = createtime;
        this.account = account;
        this.password = password;
        this.isJxufe = isJxufe;
        this.profession = profession;
        this.phone = phone;
        this.signupTime = signupTime;
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
   








}