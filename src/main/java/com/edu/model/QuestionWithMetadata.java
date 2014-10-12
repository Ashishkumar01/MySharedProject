package com.edu.model;

import java.util.ArrayList;
import java.util.List;

import com.edu.pojo.Question;


public class QuestionWithMetadata {

	private Long id;
	
	private List<Question> questions;
	
	private String subject;
	
	private String subjectCategory;
	
	private String metaData;
	
	private String questionType;
	
	private String questionSubType;
	
	private String questionCategory;
	
	private String optionType;
	
	private String isPassage;
	
	private String passageSheetName;
	
	private String passage;
	
	private String isGraph;
	
	private String passageQuestionCount;
	
	private String hasImage;
	
	private String imagePath;
	
	private String toughnessLevel;
	
	private String timeAllowed;
	
	private String languageSupported;
	
	public QuestionWithMetadata() {
		questions = new ArrayList<Question>();
	}

	public static QuestionWithMetadata newBeanInstance() {
		return new QuestionWithMetadata();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSubjectCategory() {
		return subjectCategory;
	}

	public void setSubjectCategory(String subjectCategory) {
		this.subjectCategory = subjectCategory;
	}

	public String getMetaData() {
		return metaData;
	}

	public void setMetaData(String metaData) {
		this.metaData = metaData;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getQuestionSubType() {
		return questionSubType;
	}

	public void setQuestionSubType(String questionSubType) {
		this.questionSubType = questionSubType;
	}

	public String getQuestionCategory() {
		return questionCategory;
	}

	public void setQuestionCategory(String questionCategory) {
		this.questionCategory = questionCategory;
	}

	public String getOptionType() {
		return optionType;
	}

	public void setOptionType(String optionType) {
		this.optionType = optionType;
	}

	public String getIsPassage() {
		return isPassage;
	}

	public void setIsPassage(String isPassage) {
		this.isPassage = isPassage;
	}

	public String getPassageSheetName() {
		return passageSheetName;
	}

	public void setPassageSheetName(String passageSheetName) {
		this.passageSheetName = passageSheetName;
	}

	public String getPassage() {
		return passage;
	}

	public void setPassage(String passage) {
		this.passage = passage;
	}

	public String getIsGraph() {
		return isGraph;
	}

	public void setIsGraph(String isGraph) {
		this.isGraph = isGraph;
	}

	public String getPassageQuestionCount() {
		return passageQuestionCount;
	}

	public void setPassageQuestionCount(String passageQuestionCount) {
		this.passageQuestionCount = passageQuestionCount;
	}

	public String getHasImage() {
		return hasImage;
	}

	public void setHasImage(String hasImage) {
		this.hasImage = hasImage;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getToughnessLevel() {
		return toughnessLevel;
	}

	public void setToughnessLevel(String toughnessLevel) {
		this.toughnessLevel = toughnessLevel;
	}

	public String getTimeAllowed() {
		return timeAllowed;
	}

	public void setTimeAllowed(String timeAllowed) {
		this.timeAllowed = timeAllowed;
	}

	public String getLanguageSupported() {
		return languageSupported;
	}

	public void setLanguageSupported(String languageSupported) {
		this.languageSupported = languageSupported;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	
}
