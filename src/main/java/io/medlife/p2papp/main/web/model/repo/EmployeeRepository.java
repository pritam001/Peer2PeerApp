package io.medlife.p2papp.main.web.model.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import io.medlife.p2papp.main.web.model.Employee;

//@RepositoryRestResource(collectionResourceRel = "employees", path = "employees")
public interface EmployeeRepository extends MongoRepository<Employee, String> {
	
	public Employee findByEName(@Param("name") String eName);
    public List<Employee> findByEType(@Param("type") String eType);
	public List<Employee> findByENameLike(@Param("name") String eNameRegex);
	public List<Employee> findByETypeLike(@Param("type") String eTypeRegex);
	public Employee findByEId(@Param("id") String eId);
	public List<Employee> findByEManagerName(String eManagerName);

}
