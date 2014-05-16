package com.edu.pojo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;


@PersistenceCapable(detachable = "true")
public class QuestionDocument extends SimulatorBean {
	@Persistent
	private List<Question> question;
	
	@Persistent
	private String directions;
	
	public String getDirections() {
		return directions;
	}

	public void setDirections(String directions) {
		this.directions = directions;
	}

	@Persistent
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

	public static QuestionDocument loadFile(File src) throws Exception {
		return (QuestionDocument) JaxbBean.load(src, QuestionDocument.class);
	}

	public static QuestionDocument newBeanInstance() {
		return new QuestionDocument();
	}
}
