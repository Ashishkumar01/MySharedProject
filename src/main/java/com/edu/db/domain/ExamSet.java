package com.edu.db.domain;

import java.util.List;
import java.util.Set;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="exam_set_mst")
public class ExamSet{
	@Id
	@GeneratedValue
	@PrimaryKey
	@Column(name="exam_set_id")
	private Long examSetId;
	
	@Column(name="set_name", nullable=false)
	private String name;
	
	@Column(name="set_code",nullable=false)
	private String code;		
	
	@Column(name="package_name")
	private String packageName;
	
	@Column(name="package_snippet")
	private String packageSnippet;
	
	@Column(name="total_questions")
	private String totalQuestions;
	
	@Column(name="max_marks")
	private String maxMarks;
	
	@Column(name="total_time_allowed")
	private String totalTimeAllowed;
	
	@Column(name="correct_marks")
	private String correctMarks;
	
	@Column(name="is_negative_marks")
	private String isNegativeMarks;
	
	@Column(name="negative_marks")
	private String negativeMarks;
	
	@Column
	private int level;
	
	@Column(name="attempt_allowed")
	private int attemptAllowed;
	
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="examSet")
	private List<ExamSetDtl> examSetDetails;
	
	/*@ManyToMany(fetch = FetchType.LAZY, mappedBy = "examSetList")
	public Set<User> userList;*/

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getPackageSnippet() {
		return packageSnippet;
	}

	public void setPackageSnippet(String packageSnippet) {
		this.packageSnippet = packageSnippet;
	}

	public String getTotalQuestions() {
		return totalQuestions;
	}

	public void setTotalQuestions(String totalQuestions) {
		this.totalQuestions = totalQuestions;
	}

	public String getMaxMarks() {
		return maxMarks;
	}

	public void setMaxMarks(String maxMarks) {
		this.maxMarks = maxMarks;
	}

	public String getTotalTimeAllowed() {
		return totalTimeAllowed;
	}

	public void setTotalTimeAllowed(String totalTimeAllowed) {
		this.totalTimeAllowed = totalTimeAllowed;
	}

	public String getCorrectMarks() {
		return correctMarks;
	}

	public void setCorrectMarks(String correctMarks) {
		this.correctMarks = correctMarks;
	}

	public String getIsNegativeMarks() {
		return isNegativeMarks;
	}

	public void setIsNegativeMarks(String isNegativeMarks) {
		this.isNegativeMarks = isNegativeMarks;
	}

	public String getNegativeMarks() {
		return negativeMarks;
	}

	public void setNegativeMarks(String negativeMarks) {
		this.negativeMarks = negativeMarks;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getAttemptAllowed() {
		return attemptAllowed;
	}

	public void setAttemptAllowed(int attemptAllowed) {
		this.attemptAllowed = attemptAllowed;
	}

	public List<ExamSetDtl> getExamSetDetails() {
		return examSetDetails;
	}

	public void setExamSetDetails(List<ExamSetDtl> examSetDetails) {
		this.examSetDetails = examSetDetails;
	}

	public Long getExamSetId() {
		return examSetId;
	}

	public void setExamSetId(Long examSetId) {
		this.examSetId = examSetId;
	}
	
}
