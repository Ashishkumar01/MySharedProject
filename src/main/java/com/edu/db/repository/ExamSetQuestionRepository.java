package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.db.domain.ExamSetDtl;

public interface ExamSetQuestionRepository extends CrudRepository<ExamSetDtl, Long> 
{
	
	/**
	 * finds exams for Id
	 * @param code
	 * @return
	 */
	List<ExamSetDtl> findById(Long id);
	
}
