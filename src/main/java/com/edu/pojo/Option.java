package com.edu.pojo;



public class Option{

	private String optionValue;
	private boolean correct;

	public final static String CORRECT = "CORRECT";
	public final static String INCORRECT = "INCORRECT";

	public Option() {

	}

	public Option(String optionValue, boolean isCorrect) {
		super();
		this.optionValue = optionValue;
		this.correct = isCorrect;
	}

	public String getOptionValue() {
		return optionValue;
	}

	public void setOptionValue(String optionValue) {
		this.optionValue = optionValue;
	}

	public boolean getCorrect() {
		return correct;
	}

	public void setCorrect(boolean isCorrect) {
		this.correct = isCorrect;
	}
}
