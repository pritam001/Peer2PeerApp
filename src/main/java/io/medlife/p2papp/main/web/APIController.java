package io.medlife.p2papp.main.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.medlife.p2papp.main.web.model.Employee;
import io.medlife.p2papp.main.web.model.Feedback;
import io.medlife.p2papp.main.web.model.Request;
import io.medlife.p2papp.main.web.model.repo.EmployeeRepository;
import io.medlife.p2papp.main.web.model.repo.FeedbackRepository;
import io.medlife.p2papp.main.web.model.repo.RequestRepository;

@RestController
public class APIController {
	
	@Autowired
	private EmployeeRepository e_repository;
	@Autowired
	private RequestRepository r_repository;
	@Autowired
	private FeedbackRepository f_repository;
	
	// employee mappings
	
	@RequestMapping("/api/employees/{e_id}/pendingfeedbacks")
	public List<Feedback> ShowPendingFeedbacks(@PathVariable String e_id){
		
		return f_repository.findByPeerFeedbackIsNullAndPeerNameAndKudosFlag(e_repository.findByEId(e_id).geteName(), false);
	}
	
	@RequestMapping("/api/employees/{e_id}/pendingfeedbacks/{f_id}")
	public Feedback ShowThisPendingFeedback(@PathVariable String f_id){
		
		return f_repository.findByFeedbackId(f_id);
	}
	
	@RequestMapping("/api/employees/{e_id}/sentfeedbacks")
	public List<Feedback> ShowSentFeedbacks(@PathVariable String e_id){
		
		return f_repository.findByPeerFeedbackIsNotNullAndPeerNameAndKudosFlag(e_repository.findByEId(e_id).geteName(), false);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/sendrequest")
	public void PostFeedbackRequest(@RequestBody Request request){
		
		r_repository.insert(request);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/pendingfeedbacks/{f_id}/submit")
	public void SubmitFeedback(@RequestBody String feedbackString, @PathVariable String f_id){
		
		Feedback feedback = f_repository.findByFeedbackId(f_id);
		feedback.peerFeedback = feedbackString;
		f_repository.save(feedback);
	}
	
	// kudos mappings
	
	@RequestMapping("/api/employees/{e_id}/receivedkudos")
	public List<Feedback> ViewReceivedKudos(@PathVariable String e_id){
		
		return f_repository.findByENameAndKudosFlag(e_repository.findByEId(e_id).geteName(), true);
	}
	
	@RequestMapping("/api/employees/{e_id}/sentkudos")
	public List<Feedback> ViewSentKudos(@PathVariable String e_id){
		
		return f_repository.findByPeerNameAndKudosFlag(e_repository.findByEId(e_id).geteName(), true);
	}
	
	@RequestMapping("/api/employees/{e_id}/consolidatedkudos/received")
	public List<Feedback> ViewConsolidatedKudosReceivedByTeam(@PathVariable String e_id){
		
		// Manager should get consolidated weekly kudos received by his team
		return f_repository.findByEManagerNameAndKudosFlag(e_repository.findByEId(e_id).geteName(), true);
	}
	
	@RequestMapping("/api/employees/{e_id}/consolidatedkudos/sent")
	public List<Feedback> ViewConsolidatedKudosSentByTeam(@PathVariable String e_id){
		
		// Manager should get consolidated weekly kudos sent by his team
		List<Feedback> sentFeedback = new ArrayList<Feedback>();
		List<String> team = new ArrayList<String>();
		for(Employee employee : e_repository.findByEManagerName(e_repository.findByEId(e_id).geteName())){
			team.add(employee.eName);
		}
		for(String eName : team){
			sentFeedback.addAll(f_repository.findByPeerFeedbackIsNotNullAndPeerNameAndKudosFlag(eName, true));
		}
		return sentFeedback;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/sendkudos")
	public void SendKudos(@RequestBody Feedback feedback){
		
		// Modifications to the kudos feedback
		feedback.kudosFlag = true;
		feedback.eManagerName = e_repository.findByEName(feedback.eName).eManagerName;
		f_repository.insert(feedback);
	}
	
	// manager mappings
	
	@RequestMapping("/api/employees/{e_id}/pendingapprovals")
	public List<Request> ShowPendingApprovals(@PathVariable String e_id){
		
		return r_repository.findByApprovalStatusAndEManagerName("Pending", e_repository.findByEId(e_id).geteName());
	}
	
	@RequestMapping("/api/employees/{e_id}/pendingapprovals/{r_id}")
	public Request ShowThisPendingApproval(@PathVariable String r_id){
		
		return r_repository.findByRequestId(r_id);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/pendingapprovals/{r_id}/modifypeer")
	public void ModifyPeerOfThisRequest(@RequestBody String[] peerList, @PathVariable String r_id){
		
		Request request = r_repository.findByRequestId(r_id);
		request.peerList = peerList;
		r_repository.save(request);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/pendingapprovals/{r_id}/reject")
	public void RejectThisRequest(@PathVariable String r_id){
		
		Request request = r_repository.findByRequestId(r_id);
		request.approvalStatus = "Rejected";
		r_repository.save(request);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/api/employees/{e_id}/pendingapprovals/{r_id}/approve")
	public void ApproveThisRequest(@PathVariable String r_id){
		
		Request request = r_repository.findByRequestId(r_id);
		request.approvalStatus = "Approved";
		r_repository.save(request);
		
		// add empty feedbacks to feedback repository for each peer
		for(String peer : request.peerList){
			Feedback feedback = new Feedback(peer, request.eName, request.eManagerName, null, false);
			f_repository.insert(feedback);
		}
	}
	
	@RequestMapping("/api/employees/{e_id}/viewfeedbacks")
	public List<Feedback> ViewFeedbacksReceivedByManagersEmployee(@PathVariable String e_id){
		
		return f_repository.findByPeerFeedbackIsNotNullAndEManagerNameAndKudosFlag(e_repository.findByEId(e_id).geteName(), false);
	}
	
	@RequestMapping("/api/employees/{e_id}/viewfeedbacks/searchbyename/{e_name}")
	public List<Feedback> ViewFeedbacksReceivedByAParticularEmployee(@PathVariable String e_id, @PathVariable String e_name){
		
		return f_repository.findByPeerFeedbackIsNotNullAndEManagerNameAndENameAndKudosFlag(e_repository.findByEId(e_id).geteName(), e_name, false);
	}
	
	
	
}
