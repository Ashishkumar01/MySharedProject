package com.omoknow.controller.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.omoknow.db.domain.User;
import com.omoknow.db.domain.UserExamset;
import com.omoknow.db.repository.UserExamsetRepository;
import com.omoknow.db.repository.UserRepository;
import com.omoknow.model.UserExamMappings;
import com.omoknow.model.UserXExam;
import com.google.gson.Gson;

@RestController
@RequestMapping("/user")
public class UserRegister {
	
	@Autowired
	UserRepository repository;
	
	@Autowired
	UserExamsetRepository examsetRepo;
	
	@Autowired
	Gson gson;
	
	/**
	 * Saves user registration details
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void register(@RequestBody String userData) {
		try {
			System.out.println("User data user:"+userData);
			User user = gson.fromJson(userData, User.class);
			System.out.println("User data Email:"+user.getEmail()+" Name:"+user.getFirst_name()+" Gender:"+user.getGender());
			List<User> userListSaved=repository.findByEmail(user.getEmail());
			if(userListSaved.isEmpty()){
				repository.save(user);
			}else{
				System.out.println("User already exist!!!");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/mapExam", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void mapExamset(@RequestBody String userExamMappings) {
		try {
			System.out.println("User mapping data:"+userExamMappings);
			UserExamMappings examMappings=gson.fromJson(userExamMappings, UserExamMappings.class);
			String email=examMappings.getEmail();
			List<UserExamset> userExamsetList = examsetRepo.findByEmail(email);
			if(!userExamsetList.isEmpty()){
				for(UserExamset set:userExamsetList){
					examsetRepo.delete(set.getId());
				}				
			}
			
			UserExamset userExamset=null;
			List<UserXExam> examMappingList=examMappings.getExamMappingList();
			for(UserXExam userXExam:examMappingList){
				userExamset=new UserExamset();
				userExamset.setEmail(email);
				userExamset.setExamSetId(userXExam.getId());
				userExamset.setExamSetName(userXExam.getName());
				
				examsetRepo.save(userExamset);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * gets examsets available for this user by email
	 * @return
	 */
	@RequestMapping(value = "/examsets", method = RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Map<String,String>> getAllExamSets(@RequestBody String userEmail) {
		System.out.println("getAllExamSets() request received.");
		List<Map<String,String>> examList=new ArrayList<Map<String,String>>();
		Map<String,String> json = null;
		try {
			List<UserExamset> setList=(List<UserExamset>) examsetRepo.findByEmail(userEmail);
			for(UserExamset exam:setList){
				json = new HashMap<String,String>();
				json.put("id", exam.getExamSetId().toString());
				json.put("name", exam.getExamSetName());
				
				examList.add(json);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return examList;		
	}

}
