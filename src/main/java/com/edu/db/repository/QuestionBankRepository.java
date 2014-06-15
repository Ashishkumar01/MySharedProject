package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.pojo.QuestionDocument;

public interface QuestionBankRepository extends CrudRepository<QuestionDocument, Long> {
	
	/**
	 * finds all questions
	 */
	List<QuestionDocument> findAll();
	
	/**
	 * gets questions for Subject
	 * @param subject
	 * @return
	 */
	List<QuestionDocument> findBySubject(String subject);
	
	/**
	 * gets questions for subject & subject category
	 * @param subject
	 * @param subjectCategory
	 * @return
	 */
	List<QuestionDocument> findBySubjectAndSubjectCategory(String subject, String subjectCategory);

}
