package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.db.domain.ExamScore;
import com.edu.db.domain.ExamStats;

public interface ExamScoreRepository extends CrudRepository<ExamScore, Long> {
	/**
	 * finds all exam scores for a user
	 * @param userId
	 * @return
	 */
	List<ExamScore> findByUserId(String userId);
	
	/**
	 * finds all exam scores for an exam Id
	 * @param examId
	 * @return
	 */
	List<ExamScore> findByExamId(String examId);
}
