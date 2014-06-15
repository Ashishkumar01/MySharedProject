package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.pojo.QuestionDocument;

public interface QuestionBankRepository extends CrudRepository<QuestionDocument, Long> {
	/**
	 * finds all exam scores for a user
	 * @param userId
	 * @return
	 */
	List<QuestionDocument> findById(Long id);

}
