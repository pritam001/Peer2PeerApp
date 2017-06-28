package io.medlife.p2papp.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.medlife.p2papp.main.web.model.Employee;
import io.medlife.p2papp.main.web.model.Feedback;
import io.medlife.p2papp.main.web.model.Request;
import io.medlife.p2papp.main.web.model.repo.EmployeeRepository;
import io.medlife.p2papp.main.web.model.repo.FeedbackRepository;
import io.medlife.p2papp.main.web.model.repo.RequestRepository;

@SpringBootApplication
public class ApplicationStarter implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationStarter.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}

}