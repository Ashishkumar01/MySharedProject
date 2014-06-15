package com.edu.db.domain;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="exam_set_dtl")
public class ExamSetDtl{
	@Id
	@GeneratedValue
	@PrimaryKey
	private Long id;
	
	@Column(name="exam_set_id", nullable=false)
	private String examSetId;
	
	@Column(name="question_id",nullable=false)
	private String questionId;		
	
	@ManyToOne
	@JoinColumn(name="exam_set_id",insertable=false, updatable=false)
	private ExamSet examSet;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getExamSetId() {
		return examSetId;
	}

	public void setExamSetId(String examSetId) {
		this.examSetId = examSetId;
	}

	public String getQuestionId() {
		return questionId;
	}

	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}

	public ExamSet getExamSet() {
		return examSet;
	}

	public void setExamSet(ExamSet examSet) {
		this.examSet = examSet;
	}
		
}
