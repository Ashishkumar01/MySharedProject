package com.omoknow.db.domain;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="exam_score")
public class ExamScore{
	@Id
	@GeneratedValue
	@Column(name="exam_score_id")
	@PrimaryKey
	private Long examScoreId;
	
	@Column(name="exam_id", nullable=false)
	private String examId;
	
	@Column(name="user_id",nullable=false)
	private String userId;
	
	@Column(name="attempt_no", nullable=false)
	private int attemptNo;
	
	@Column(name="exam_date")
	private String examDate;
	
	@Column(name="total_questions")
	private int totalQuestions;
	
	@Column(name="total_attempted")
	private int totalAttempted;
	
	@Column(name="maximum_marks")
	private int maximumMarks;
	
	@Column(name="score_obtained")
	private float scoreObtained;
	
	@Column(name="total_correct")
	private int totalCorrect;
	
	@Column(name="total_time_allowed")
	private String totalTimeAllowed;
	
	@Column(name="total_time_taken")
	private String totalTimeTaken;
	
	@Column
	private float percentile;
	
	@Column
	private int rank;
	
	@Column(name="negative_marks")
	private float negativeMarks;
	
	@Column
	private int credits;
	
	@Column(name="exam_status")
	private String examStatus;

	public Long getExamScoreId() {
		return examScoreId;
	}

	public void setExamScoreId(Long examScoreId) {
		this.examScoreId = examScoreId;
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

	public int getTotalQuestions() {
		return totalQuestions;
	}

	public void setTotalQuestions(int totalQuestions) {
		this.totalQuestions = totalQuestions;
	}

	public int getTotalAttempted() {
		return totalAttempted;
	}

	public void setTotalAttempted(int totalAttempted) {
		this.totalAttempted = totalAttempted;
	}

	public int getMaximumMarks() {
		return maximumMarks;
	}

	public void setMaximumMarks(int maximumMarks) {
		this.maximumMarks = maximumMarks;
	}

	public float getScoreObtained() {
		return scoreObtained;
	}

	public void setScoreObtained(float scoreObtained) {
		this.scoreObtained = scoreObtained;
	}

	public int getTotalCorrect() {
		return totalCorrect;
	}

	public void setTotalCorrect(int totalCorrect) {
		this.totalCorrect = totalCorrect;
	}

	public String getTotalTimeAllowed() {
		return totalTimeAllowed;
	}

	public void setTotalTimeAllowed(String totalTimeAllowed) {
		this.totalTimeAllowed = totalTimeAllowed;
	}

	public String getTotalTimeTaken() {
		return totalTimeTaken;
	}

	public void setTotalTimeTaken(String totalTimeTaken) {
		this.totalTimeTaken = totalTimeTaken;
	}

	public float getPercentile() {
		return percentile;
	}

	public void setPercentile(float percentile) {
		this.percentile = percentile;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public float getNegativeMarks() {
		return negativeMarks;
	}

	public void setNegativeMarks(float negativeMarks) {
		this.negativeMarks = negativeMarks;
	}

	public int getCredits() {
		return credits;
	}

	public void setCredits(int credits) {
		this.credits = credits;
	}

	public int getAttemptNo() {
		return attemptNo;
	}

	public void setAttemptNo(int attemptNo) {
		this.attemptNo = attemptNo;
	}

	public String getExamStatus() {
		return examStatus;
	}

	public void setExamStatus(String examStatus) {
		this.examStatus = examStatus;
	}
	
}
