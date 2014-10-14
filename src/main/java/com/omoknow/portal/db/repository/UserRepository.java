package com.omoknow.portal.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.portal.db.domain.User;

public interface UserRepository extends CrudRepository<User, Long> {
	List<User> findByEmail(String email);
}
