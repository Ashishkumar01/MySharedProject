package com.omoknow.portal.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.portal.db.domain.UserExamset;

public interface UserExamsetRepository extends CrudRepository<UserExamset, Long> {
	List<UserExamset> findByEmail(String email);
}
