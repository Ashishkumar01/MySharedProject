package com.edu.pojo;

import java.util.List;


public class Question{

	private String question;

	private List<Option> options;

	private String directions;
	public String getDirections() {
		return directions;
	}

	public void setDirections(String directions) {
		this.directions = directions;
	}

	private List<String> metaData;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Option> getOptions() {
		return options;
	}

	public void setOptions(List<Option> options) {
		this.options = options;
	}

	public List<String> getMetaData() {
		return metaData;
	}

	public void setMetaData(List<String> metaData) {
		this.metaData = metaData;
	}

	public static Question newBeanInstance() {
		return new Question();
	}
}
