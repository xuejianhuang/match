package cn.jxufe.emlab.match.pojo;

import java.sql.Timestamp;
import java.util.Date;

/**
 * TMatchId entity. @author MyEclipse Persistence Tools
 */

public class Match extends cn.jxufe.emlab.match.pojo.BasePojo implements
		java.io.Serializable {

	// Fields

	private String id;
	private String name;
	private String comment;
	private Timestamp createtime;
	private String caption;
	private String sponsor;
	private String organizer;
	private String coSponsor;
	private int level;
	private String address;
	private Date holdtime;
	private String detail;
	private String bannerUrl;
	private String bannerThumbnailUrl;
	private int status;

	// Constructors

	/** default constructor */
	public Match() {
	}

	/** minimal constructor */
	public Match(String id) {
		this.id = id;
	}

	/** full constructor */
	public Match(String id, String name, String comment,
			Timestamp createtime, String caption, String sponsor,
			String organizer, String coSponsor, int level, String address,
			Date holdtime, String detail, String bannerUrl,
			String bannerThumbnailUrl, int status) {
		this.id = id;
		this.name = name;
		this.comment = comment;
		this.createtime = createtime;
		this.caption = caption;
		this.sponsor = sponsor;
		this.organizer = organizer;
		this.coSponsor = coSponsor;
		this.level = level;
		this.address = address;
		this.holdtime = holdtime;
		this.detail = detail;
		this.bannerUrl = bannerUrl;
		this.bannerThumbnailUrl = bannerThumbnailUrl;
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

	public String getCaption() {
		return this.caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getSponsor() {
		return this.sponsor;
	}

	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}

	public String getOrganizer() {
		return this.organizer;
	}

	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public String getCoSponsor() {
		return this.coSponsor;
	}

	public void setCoSponsor(String coSponsor) {
		this.coSponsor = coSponsor;
	}

	public int getLevel() {
		return this.level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getHoldtime() {
		return this.holdtime;
	}

	public void setHoldtime(Date holdtime) {
		this.holdtime = holdtime;
	}

	public String getDetail() {
		return this.detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getBannerUrl() {
		return this.bannerUrl;
	}

	public void setBannerUrl(String bannerUrl) {
		this.bannerUrl = bannerUrl;
	}

	public String getBannerThumbnailUrl() {
		return this.bannerThumbnailUrl;
	}

	public void setBannerThumbnailUrl(String bannerThumbnailUrl) {
		this.bannerThumbnailUrl = bannerThumbnailUrl;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}