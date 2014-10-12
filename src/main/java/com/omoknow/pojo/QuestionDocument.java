package com.omoknow.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="question_bank")
public class QuestionDocument {
	@Id
	@GeneratedValue
	@Column
	@PrimaryKey
	private Long id;
	
	@Transient
	private List<Questions> questions;
	
	@Column(name="subject", nullable=false)
	private String subject;
	
	@Column(name="subject_category", nullable=false)
	private String subjectCategory;
	
	@Column(name="metadata")
	private String metaData;
	
	@Column(name="question_type", nullable=false)
	private String questionType;
	
	@Column(name="question_sub_type", nullable=true)
	private String questionSubType;
	
	@Column(name="question_category", nullable=false)
	private String questionCategory;
	
	@Column(name="option_type", nullable=false)
	private String optionType;
	
	@Column(name="is_passage", nullable=false)
	private String isPassage;
	
	private String passageSheetName;
	
	@Column(name="passage")
	private String passage;
	
	@Column(name="is_graph")
	private String isGraph;
	
	@Column(name="passage_question_count")
	private String passageQuestionCount;
	
	@Column(name="has_image")
	private String hasImage;
	
	@Column(name="image_path")
	private String imagePath;
	
	@Column(name="toughness_level")
	private String toughnessLevel;
	
	@Column(name="time_allowed")
	private String timeAllowed;
	
	@Column(name="language_supported")
	private String languageSupported;
	
	public QuestionDocument() {
		questions = new ArrayList<Questions>();
	}

	public static QuestionDocument newBeanInstance() {
		return new QuestionDocument();
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Questions> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}

	public String getQuestionSubType() {
		return questionSubType;
	}

	public void setQuestionSubType(String questionSubType) {
		this.questionSubType = questionSubType;
	}

	public String getLanguageSupported() {
		return languageSupported;
	}

	public void setLanguageSupported(String languageSupported) {
		this.languageSupported = languageSupported;
	}	

}
