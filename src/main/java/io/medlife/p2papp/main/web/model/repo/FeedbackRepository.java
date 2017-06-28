package io.medlife.p2papp.main.web.model.repo;

import java.util.Collection;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import io.medlife.p2papp.main.web.model.Employee;
import io.medlife.p2papp.main.web.model.Feedback;

public interface FeedbackRepository extends MongoRepository<Feedback,String>{
	
	public List<Feedback> findByPeerName(@Param("name") String peerName);
	public List<Feedback> findByEName(@Param("name") String eName);
	public List<Feedback> findByEManagerName(@Param("name") String eManagerName);
	// Search for words in feedback
	//public List<Feedback> findByPeerFeedbackLike(@Param("word") String feedback);
	public List<Feedback> findByKudosFlag(@Param("flag") Boolean flag);
	
	// Complex queries
	// 
	public List<Feedback> findByENameAndEManagerName(@Param("e_name") String eName, @Param("m_name") String eManagerName);
	// Given employee name, find pending feedback requests
	public List<Feedback> findByPeerFeedbackIsNullAndEName(@Param("name") String peerName);
	public List<Feedback> findByPeerFeedbackIsNotNullAndEManagerName(String eManagerName);
	public List<Feedback> findByPeerFeedbackIsNotNullAndPeerName(String peerName);
	public Feedback findByFeedbackId(@Param("id") String f_id);
	public List<Feedback> findByPeerFeedbackIsNotNullAndEManagerNameAndEName(String eManagerName, String eName);
	public List<Feedback> findByENameAndKudosFlag(String eName, boolean b);
	public List<Feedback> findByPeerNameAndKudosFlag(String peerName, boolean b);
	public List<Feedback> findByEManagerNameAndKudosFlag(String eManagerName, boolean b);
	public List<Feedback> findByPeerFeedbackIsNotNullAndPeerNameAndKudosFlag(String peerName, boolean b);
	public List<Feedback> findByPeerFeedbackIsNullAndENameAndKudosFlag(String eName, boolean b);
	public List<Feedback> findByPeerFeedbackIsNullAndPeerNameAndKudosFlag(String peerName, boolean b);
	public List<Feedback> findByPeerFeedbackIsNotNullAndEManagerNameAndKudosFlag(String eManagerName, boolean b);
	public List<Feedback> findByPeerFeedbackIsNotNullAndEManagerNameAndENameAndKudosFlag(String eManagerName, String eName, boolean b);
	
}
