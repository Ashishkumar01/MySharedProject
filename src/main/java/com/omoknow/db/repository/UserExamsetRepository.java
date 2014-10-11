package com.omoknow.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.db.domain.UserExamset;

public interface UserExamsetRepository extends CrudRepository<UserExamset, Long> {
	List<UserExamset> findByEmail(String email);
}
