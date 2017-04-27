package cn.jxufe.emlab.match.pojo;
// default package

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonIgnore;


/**
 * MatchProject entity. @author MyEclipse Persistence Tools
 */

public class Group extends cn.jxufe.emlab.match.pojo.BasePojo implements java.io.Serializable {


    // Fields    

     private String id;
     private String name;
     private String comment;
     private Timestamp createtime;
     private String caption;
     private String buildMemberId;
     private Timestamp buildTime;
     private int status;
     private String tutor1;
     private String tutor2;
     private String tutorPhone1;
     private String tutorPhone2;
     private int tutorTitle1;
     private int tutorTitle2;
     private String prize;
     
     
     
     private Set<Member> members;
     
     private int memberSum;

     private MatchProject matchProject;
     
     
     private boolean isFull;

    // Constructors

    /** default constructor */
    public Group() {
    }

	/** minimal constructor */
    public Group(String id) {
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

    public String getCaption() {
        return this.caption;
    }
    
    public void setCaption(String caption) {
        this.caption = caption;
    }

  

    

	public Timestamp getBuildTime() {
		return buildTime;
	}

	public void setBuildTime(Timestamp buildTime) {
		this.buildTime = buildTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getMemberSum() {
		return memberSum;
	}

	public void setMemberSum(int memberSum) {
		this.memberSum = memberSum;
	}

	
	

	public String getBuildMemberId() {
		return buildMemberId;
	}

	public void setBuildMemberId(String buildMemberId) {
		this.buildMemberId = buildMemberId;
	}

	@JsonIgnore public MatchProject getMatchProject() {
		return matchProject;
	}

	@JsonIgnore	public void setMatchProject(MatchProject matchProject) {
		this.matchProject = matchProject;
	}

	 public Set<Member> getMembers() {
		return members;
	}

 	public void setMembers(Set<Member> members) {
		this.members = members;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Group other = (Group) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public boolean isFull() {
		return isFull;
	}

	public void setFull(boolean isFull) {
		this.isFull = isFull;
	}

	public String getTutor1() {
		return tutor1;
	}

	public void setTutor1(String tutor1) {
		this.tutor1 = tutor1;
	}

	public String getTutor2() {
		return tutor2;
	}

	public void setTutor2(String tutor2) {
		this.tutor2 = tutor2;
	}

	public String getTutorPhone1() {
		return tutorPhone1;
	}

	public void setTutorPhone1(String tutorPhone1) {
		this.tutorPhone1 = tutorPhone1;
	}

	public String getTutorPhone2() {
		return tutorPhone2;
	}

	public void setTutorPhone2(String tutorPhone2) {
		this.tutorPhone2 = tutorPhone2;
	}

	public int getTutorTitle1() {
		return tutorTitle1;
	}

	public void setTutorTitle1(int tutorTitle1) {
		this.tutorTitle1 = tutorTitle1;
	}

	public int getTutorTitle2() {
		return tutorTitle2;
	}

	public void setTutorTitle2(int tutorTitle2) {
		this.tutorTitle2 = tutorTitle2;
	}

	public String getPrize() {
		return prize;
	}

	public void setPrize(String prize) {
		this.prize = prize;
	}
    
    

	
   








}