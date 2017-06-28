package io.medlife.p2papp.main.web.model.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import io.medlife.p2papp.main.web.model.Feedback;
import io.medlife.p2papp.main.web.model.Request;

public interface RequestRepository extends MongoRepository<Request,String> {
	
    public List<Request> findByEName(@Param("name") String eName);
    public List<Request> findByEManagerName(@Param("name") String eManagerName);
    public List<Request> findByApprovalStatus(@Param("status") String approvalStatus);
    
    // Find pending requests given manager name
	public List<Request> findByApprovalStatusAndEManagerName(String approvalStatus, String eManagerName);
	public Request findByRequestId(@Param("id") String r_id);

}
