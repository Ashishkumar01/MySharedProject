package com.omoknow.portal.pojo;

import java.util.List;


public class Question{

	private String questionStatement;
	private String language;

	private List<Option> options;


	public List<Option> getOptions() {
		return options;
	}

	public void setOptions(List<Option> options) {
		this.options = options;
	}

	public static Question newBeanInstance() {
		return new Question();
	}

	public String getQuestionStatement() {
		return questionStatement;
	}

	public void setQuestionStatement(String questionStatement) {
		this.questionStatement = questionStatement;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}
}
