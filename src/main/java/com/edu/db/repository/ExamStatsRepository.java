package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.db.domain.ExamStats;

public interface ExamStatsRepository extends CrudRepository<ExamStats, Long> {
	/**
	 * finds all exam scores for a user
	 * @param userId
	 * @return
	 */
	List<ExamStats> findByUserId(String userId);
	
	/**
	 * finds all exam scores for an exam Id
	 * @param examId
	 * @return
	 */
	List<ExamStats> findByExamId(String examId);
	
	/**
	 * finds all exam scores 
	 * @param examId
	 * @param userId
	 * @param attemptNo
	 * @return
	 */
	List<ExamStats> findByExamIdAndUserIdAndAttemptNo(String examId, String userId, int attemptNo);
}
