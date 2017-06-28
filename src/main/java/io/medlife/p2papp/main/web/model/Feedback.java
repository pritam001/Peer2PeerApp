package io.medlife.p2papp.main.web.model;

import org.springframework.data.annotation.Id;

public class Feedback {
	
	@Id
	public String feedbackId;
	
	public String peerName;
	public String eName;
	public String eManagerName;
	public String peerFeedback;
	public Boolean kudosFlag;
	
	public Feedback() { }
	
	public Feedback(String peerName, String eName, String eManagerName, String peerFeedback, Boolean kudosFlag) {
		super();
		this.peerName = peerName;
		this.eName = eName;
		this.eManagerName = eManagerName;
		this.peerFeedback = peerFeedback;
		this.kudosFlag = kudosFlag;
	}

	public String getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(String feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getPeerName() {
		return peerName;
	}

	public void setPeerName(String peerName) {
		this.peerName = peerName;
	}

	public String geteName() {
		return eName;
	}

	public void seteName(String eName) {
		this.eName = eName;
	}

	public String geteManagerName() {
		return eManagerName;
	}

	public void seteManagerName(String eManagerName) {
		this.eManagerName = eManagerName;
	}

	public String getPeerFeedback() {
		return peerFeedback;
	}

	public void setPeerFeedback(String peerFeedback) {
		this.peerFeedback = peerFeedback;
	}

	public Boolean getKudosFlag() {
		return kudosFlag;
	}

	public void setKudosFlag(Boolean kudosFlag) {
		this.kudosFlag = kudosFlag;
	}


}
