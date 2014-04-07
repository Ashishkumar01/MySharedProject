package com.edu.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edu.db.repository.UserRepository;
import com.edu.model.User;

@RestController
@RequestMapping("/user")
public class UserRegister {
	
	@Autowired
	UserRepository repository;
	
	/**
	 * Saves user registration details
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes="application/json")
	public void register(@RequestBody User user) {
		System.out.println("User data:"+user.getEmail()+" Name:"+user.getFirstName()+" Gender:"+user.getGender());
		//repository.save(user);
	}

}
