package io.medlife.p2papp.main.web.model;

import org.springframework.data.annotation.Id;

public class Employee {
	
	@Id
	public String eId;
	
	public String eName;
	public String eType;
	public String eManagerName;
	public String eEmail;
	
	public Employee() { }

	public Employee(String eName, String eType, String eManagerName, String eEmail){
		super();
		this.eName = eName;
		this.eType = eType;
		this.eManagerName = eManagerName;
		this.eEmail = eEmail;
	}
	
	@Override
    public String toString() {
        return String.format(
                "Employee[eId='%s', eName='%s', eType='%s', eManager_name='%s', eEmail='%s']",
                eId, eName, eType, eManagerName, eEmail);
    }

	public String geteId() {
		return eId;
	}

	public void seteId(String eId) {
		this.eId = eId;
	}

	public String geteName() {
		return eName;
	}

	public void seteName(String eName) {
		this.eName = eName;
	}

	public String geteType() {
		return eType;
	}

	public void seteType(String eType) {
		this.eType = eType;
	}

	public String geteManagerName() {
		return eManagerName;
	}

	public void seteManagerName(String eManagerName) {
		this.eManagerName = eManagerName;
	}

	public String geteEmail() {
		return eEmail;
	}

	public void seteEmail(String eEmail) {
		this.eEmail = eEmail;
	}
		
}
