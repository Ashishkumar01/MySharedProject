package com.edu.pojo;

import java.util.List;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
@PersistenceCapable(detachable="true")
public class Question extends SimulatorBean {

	@Persistent
	private String question;

	@Persistent
	private List<Option> options;

	public String getQuestion() {
		return question;
	}

	@XmlElement
	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Option> getOptions() {
		return options;
	}

	@XmlElement
	public void setOptions(List<Option> options) {
		this.options = options;
	}

	public static Question newBeanInstance() {
		return new Question();
	}
}
