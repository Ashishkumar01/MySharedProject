package com.omoknow.portal.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.portal.pojo.QuestionDocument;

public interface QuestionBankRepository extends CrudRepository<QuestionDocument, Long> {
	
	/**
	 * finds all questions
	 */
	List<QuestionDocument> findAll();
	
}
