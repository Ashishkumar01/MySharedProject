package com.edu.model;

import java.util.List;

public class UserExamMappings {	
	private String email;
	private List<UserXExam> examMappingList;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<UserXExam> getExamMappingList() {
		return examMappingList;
	}
	public void setExamMappingList(List<UserXExam> examMappingList) {
		this.examMappingList = examMappingList;
	}
}

