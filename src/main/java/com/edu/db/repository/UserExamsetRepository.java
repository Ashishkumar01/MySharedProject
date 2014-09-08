package com.edu.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.edu.db.domain.UserExamset;

public interface UserExamsetRepository extends CrudRepository<UserExamset, Long> {
	List<UserExamset> findByEmail(String email);
}
