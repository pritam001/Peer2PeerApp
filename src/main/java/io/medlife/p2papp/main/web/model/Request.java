package io.medlife.p2papp.main.web.model;

import org.springframework.data.annotation.Id;

public class Request {
	
	@Id
	public String requestId;
	
	public String eName;
	public String[] peerList;
	public String eManagerName;
	public String approvalStatus;
	
	public Request() { }

	public Request(String eName, String[] peerList, String eManagerName, String approvalStatus) {
		super();
		this.eName = eName;
		this.peerList = peerList;
		this.eManagerName = eManagerName;
		this.approvalStatus = approvalStatus;
	}


	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public String geteName() {
		return eName;
	}

	public void seteName(String eName) {
		this.eName = eName;
	}

	public String[] getPeerList() {
		return peerList;
	}

	public void setPeerList(String[] peerList) {
		this.peerList = peerList;
	}

	public String geteManagerName() {
		return eManagerName;
	}

	public void seteManagerName(String eManagerName) {
		this.eManagerName = eManagerName;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	

}
