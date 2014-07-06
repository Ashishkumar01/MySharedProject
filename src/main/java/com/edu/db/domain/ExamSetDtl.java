package com.edu.db.domain;

import java.util.List;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.data.annotation.Reference;

@Entity
@Table(name="exam_set_dtl")
public class ExamSetDtl{
	@Id
	@GeneratedValue
	@PrimaryKey
	private Long id;
	
	/*@Column(name="exam_set_id", nullable=false)
	private String examSetId;*/
	
	@Column(name="subject",nullable=false)
	private String subject;
	
	@Column(name="start_index",nullable=false)
	private int startIndex;
	
	@Column(name="end_index",nullable=false)
	private int endIndex;
	
	@Column
	private boolean active;
	
	/*
	 * question_ids linked to a subject, concatenated by comma
	 */
	@Column(name="linked_questions",nullable=false)
	private String linkedQuestions;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="exam_set_id",nullable = false)
	private ExamSet examSet;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ExamSet getExamSet() {
		return examSet;
	}

	public void setExamSet(ExamSet examSet) {
		this.examSet = examSet;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getLinkedQuestions() {
		return linkedQuestions;
	}

	public void setLinkedQuestions(String linkedQuestions) {
		this.linkedQuestions = linkedQuestions;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
		
}
