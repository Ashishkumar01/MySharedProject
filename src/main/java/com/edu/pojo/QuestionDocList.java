package com.edu.pojo;

import java.util.ArrayList;
import java.util.List;

public class QuestionDocList {
	private List<QuestionDocument> questionDocList;

	QuestionDocList() {
		questionDocList = new ArrayList<QuestionDocument>();
	}

	QuestionDocList(List<QuestionDocument> questionDoc) {
		questionDocList = questionDoc;
	}

	public List<QuestionDocument> getQuestionDocList() {
		return questionDocList;
	}

	public void setQuestionDocList(List<QuestionDocument> questionDocList) {
		this.questionDocList = questionDocList;
	}

	public static QuestionDocList getQuestionDocumentList(
			List<QuestionDocument> questionListFromExcel) {

		return new QuestionDocList(questionListFromExcel);
	}
}
