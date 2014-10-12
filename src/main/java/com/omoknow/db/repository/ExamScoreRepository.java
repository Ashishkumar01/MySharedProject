package com.omoknow.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.db.domain.ExamScore;

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
	
	/**
	 * finds all exam scores for given examId & userId, ordered by attempt no descending
	 * @param examId
	 * @param userId
	 * @param attemptNo
	 * @return
	 */
	List<ExamScore> findByExamIdAndUserIdOrderByAttemptNoDesc(String examId, String userId);
	
	/**
	 * finds all exam scores 
	 * @param examId
	 * @param userId
	 * @param attemptNo
	 * @return
	 */
	List<ExamScore> findByExamIdAndUserIdAndAttemptNo(String examId, String userId, int attemptNo);
}
