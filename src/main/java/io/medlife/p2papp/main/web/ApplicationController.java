package io.medlife.p2papp.main.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import io.medlife.p2papp.main.web.model.Employee;
import io.medlife.p2papp.main.web.model.Feedback;
import io.medlife.p2papp.main.web.model.Request;
import io.medlife.p2papp.main.web.model.repo.EmployeeRepository;
import io.medlife.p2papp.main.web.model.repo.FeedbackRepository;
import io.medlife.p2papp.main.web.model.repo.RequestRepository;


@Controller
public class ApplicationController {
	
	// administrator mappings

	@RequestMapping("/admin")
	public String HomePageAdmin(){
		
		return "admin_view.html";
	}
	
	@RequestMapping("/")
	public String HomePage(){
		
		return "index.html";
	}
	
	@RequestMapping("/cookielogin")
	public String LoginPage(){
		
		return "employee_cookie_login.html";
	}
	
	@RequestMapping("/feedback")
	public String FeedbackPage(){
		
		return "feedback_view.html";
	}
	
	@RequestMapping("/request")
	public String RequestPage(){
		
		return "request_view.html";
	}
	
	@RequestMapping("/kudos")
	public String KudosPage(){
		
		return "kudos_view.html";
	}

	
	@Autowired
	private EmployeeRepository e_repository;
	@Autowired
	private RequestRepository r_repository;
	@Autowired
	private FeedbackRepository f_repository;
	
	@RequestMapping("/admin/resetdatabase")
	public String ResetDatabase(){

		e_repository.deleteAll();

		// save a couple of employees
		e_repository.save(new Employee("Manager1", "Manager", "DeptHead1", "demo_email"));
		e_repository.save(new Employee("Manager2", "Manager", "DeptHead1", "demo_email"));
		e_repository.save(new Employee("Alice", "Engineer", "Manager1", "demo_email"));
		e_repository.save(new Employee("John", "Engineer", "Manager1", "demo_email"));
		e_repository.save(new Employee("Alexa", "Engineer", "Manager1", "demo_email"));
		e_repository.save(new Employee("Olive", "Engineer", "Manager2", "demo_email"));
		e_repository.save(new Employee("Tom", "Engineer", "Manager2", "demo_email"));
		e_repository.save(new Employee("Brad", "Engineer", "Manager1", "demo_email"));
		
		r_repository.deleteAll();
		r_repository.save(new Request("Alice", new String[] {"John", "Alexa"}, "Manager1", "Pending"));
		r_repository.save(new Request("Brad", new String[] {"John", "Alexa"}, "Manager1", "Rejected"));
		r_repository.save(new Request("John", new String[] {"Brad", "Alice", "Alexa"}, "Manager1", "Approved"));
		r_repository.save(new Request("Tom", new String[] {"Olive"}, "Manager2", "Pending"));
		r_repository.save(new Request("Olive", new String[] {"Tom"}, "Manager2", "Approved"));
		
		f_repository.deleteAll();
		f_repository.save(new Feedback("Tom", "Olive", "Manager2", "Some dummy kudos given hhfhfhfj", true));
		f_repository.save(new Feedback("Alice", "John", "Manager1", "Some dummy kudos given djhfjfhf", true));
		f_repository.save(new Feedback("Alice", "Alexa", "Manager1", "Some dummy kudos given fhskdfjf", true));
		f_repository.save(new Feedback("Olive", "Tom", "Manager2", "Some dummy kudos given jhfsgsgfh", true));
		f_repository.save(new Feedback("John", "Brad", "Manager1", "Some dummy kudos given gddhhh", true));
		
		f_repository.save(new Feedback("Tom", "Olive", "Manager2", "Some dummy feedback given hhfhfhfj", false));
		f_repository.save(new Feedback("Alice", "John", "Manager1", "Some dummy feedback given djhfjfhf", false));
		f_repository.save(new Feedback("John", "Alexa", "Manager1", "Some dummy feedback given fhskdfjf", false));
		f_repository.save(new Feedback("Olive", "Tom", "Manager2", "Some dummy feedback given jhfsgsgfh", false));
		f_repository.save(new Feedback("John", "Brad", "Manager1", "Some dummy feedback given gddhhh", false));
		
		f_repository.save(new Feedback("Tom", "Olive", "Manager2", null, false));
		f_repository.save(new Feedback("Alice", "John", "Manager1", null, false));
		f_repository.save(new Feedback("Alice", "Alexa", "Manager1", null, false));
		f_repository.save(new Feedback("John", "Olive", "Manager1", null, false));
		f_repository.save(new Feedback("John", "Brad", "Manager1", null, false));
		f_repository.save(new Feedback("Tom", "Olive", "Manager2", null, false));
		f_repository.save(new Feedback("Alexa", "John", "Manager1", null, false));
		f_repository.save(new Feedback("Alexa", "Alice", "Manager1", null, false));
		f_repository.save(new Feedback("Olive", "Tom", "Manager2", null, false));
		f_repository.save(new Feedback("Brad", "John", "Manager1", null, false));
		
		return "Database reset done by admin";
	}
	
	
}
