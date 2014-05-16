package com.edu.pojo;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;


@PersistenceCapable(detachable = "true")
public class Option extends SimulatorBean {

	@Persistent
	private String optionValue;
	@Persistent
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
