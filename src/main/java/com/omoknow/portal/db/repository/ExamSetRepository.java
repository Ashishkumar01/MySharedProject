package com.omoknow.portal.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.portal.db.domain.ExamSet;

public interface ExamSetRepository extends CrudRepository<ExamSet, Long> {

	
	/**
	 * finds all exam scores given code
	 * @param code
	 * @return
	 */
	List<ExamSet> findByCode(String code);
	
	/**
	 * finds exams for examId
	 * @param code
	 * @return
	 */
	List<ExamSet> findByExamSetId(Long examSetId);

}
