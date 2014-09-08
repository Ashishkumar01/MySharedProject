package com.edu.db.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="user") 
public class User {
	
	@Id
	@GeneratedValue
	@Column
	private Long id;
	
	@Column(unique=true, nullable=false)
	private String email;
	
	@Column
	private String first_name;
	
	@Column
	private String last_name;
	
	@Column
	private String gender;
	
	@Column
	private String role;
	
	@Column
	private String locale;
	
	@Column
	private boolean isActive;
	
	/*@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "user_examset", joinColumns = { 
			@JoinColumn(name = "id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "exam_set_id", nullable = false, updatable = false) })
	public Set<ExamSet> examSetList;*/

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

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

/*	public Set<ExamSet> getExamSetList() {
		return examSetList;
	}

	public void setExamSetList(Set<ExamSet> examSetList) {
		this.examSetList = examSetList;
	}*/
	
	
}
