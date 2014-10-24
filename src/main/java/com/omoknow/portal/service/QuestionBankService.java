package com.omoknow.portal.service;

import java.util.List;

import com.omoknow.portal.pojo.QuestionDocument;
import com.omoknow.portal.pojo.QuestionSearchParameters;

public interface QuestionBankService {
	
	/**
	 * finds all questions
	 */
	List<QuestionDocument> findAll();
	
	/**
	 * Search questions based on any parameters provided
	 * @param searchParameters
	 * @return
	 */
	List<QuestionDocument> findQuestions(QuestionSearchParameters searchParameters);

}
