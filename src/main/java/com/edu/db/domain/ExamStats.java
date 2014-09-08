package com.edu.db.domain;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="exam_stats")
public class ExamStats{
	@Id
	@GeneratedValue
	@Column
	@PrimaryKey
	private Long id;
	
	@Column(name="exam_id", nullable=false)
	private String examId;
	
	@Column(name="user_id",nullable=false)
	private String userId;		
	
	@Column(name="exam_date")
	private String examDate;
	
	@Column(name="module_name")
	private String moduleName;
	
	@Column(name="question_id")
	private String questionId;
	
	@Column(name="is_correct")
	private String isCorrect;
	
	@Column(name="user_answer")
	private String userAnswer;
	
	@Column(name="correct_answer")
	private String correctAnswer;
	
	@Column
	private float score;
	
	@Column(name="time_allowed")
	private String timeAllowed;
	
	@Column(name="time_taken")
	private String timeTaken;
	
	@Column
	private int level;
	
	@Column(name="attempt_no", nullable=false)
	private int attemptNo;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getQuestionId() {
		return questionId;
	}

	public void setQuestionId(String questionId) {
		this.questionId = questionId;
	}

	public String getIsCorrect() {
		return isCorrect;
	}

	public void setIsCorrect(String isCorrect) {
		this.isCorrect = isCorrect;
	}

	public String getUserAnswer() {
		return userAnswer;
	}

	public void setUserAnswer(String userAnswer) {
		this.userAnswer = userAnswer;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getTimeAllowed() {
		return timeAllowed;
	}

	public void setTimeAllowed(String timeAllowed) {
		this.timeAllowed = timeAllowed;
	}

	public String getTimeTaken() {
		return timeTaken;
	}

	public void setTimeTaken(String timeTaken) {
		this.timeTaken = timeTaken;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getExamId() {
		return examId;
	}

	public void setExamId(String examId) {
		this.examId = examId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getExamDate() {
		return examDate;
	}

	public void setExamDate(String examDate) {
		this.examDate = examDate;
	}

	public int getAttemptNo() {
		return attemptNo;
	}

	public void setAttemptNo(int attemptNo) {
		this.attemptNo = attemptNo;
	}

	
}
