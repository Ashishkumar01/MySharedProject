package com.edu.db.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_examset") 
public class UserExamset {
	
	@Id
	@GeneratedValue
	@Column
	private Long id;
	
	@Column(nullable=false)
	private String email;
	
	@Column(name="exam_set_id",nullable=false)
	private String examSetId;
	
	@Column(name="exam_set_name")
	private String examSetName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getExamSetId() {
		return examSetId;
	}

	public void setExamSetId(String examSetId) {
		this.examSetId = examSetId;
	}

	public String getExamSetName() {
		return examSetName;
	}

	public void setExamSetName(String examSetName) {
		this.examSetName = examSetName;
	}
	
	
}
