package com.edu.pojo;

import java.util.ArrayList;
import java.util.List;


public class QuestionDocument {
	private List<Question> question;
	
	private String directions;

	private String sheetName;
	
	public String getSheetName() {
		return sheetName;
	}

	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}

	private boolean isGrouped;
	
	public boolean isGrouped() {
		return isGrouped;
	}

	public void setGrouped(boolean isGrouped) {
		this.isGrouped = isGrouped;
	}

	public String getDirections() {
		return directions;
	}

	public void setDirections(String directions) {
		this.directions = directions;
	}

	private List<String> metaData;

	public QuestionDocument() {
		question = new ArrayList<Question>();
		metaData = new ArrayList<String>();
	}

	public List<Question> getQuestions() {
		return question;
	}

	public void setQuestions(List<Question> quesion) {
		this.question = quesion;
	}

	public List<String> getMetaData() {
		return metaData;
	}

	public void setMetaData(List<String> metaData) {
		this.metaData = metaData;
	}

	public static QuestionDocument newBeanInstance() {
		return new QuestionDocument();
	}
}
