package com.edu.model;

import java.util.List;

import com.edu.db.domain.ExamScore;
import com.edu.db.domain.ExamStats;

public class ExamReport {	
	private ExamScore examScore;
	private List<ExamStats> examStatList;
	
	public ExamScore getExamScore() {
		return examScore;
	}
	public void setExamScore(ExamScore examScore) {
		this.examScore = examScore;
	}
	public List<ExamStats> getExamStatList() {
		return examStatList;
	}
	public void setExamStatList(List<ExamStats> examStatList) {
		this.examStatList = examStatList;
	}

}
