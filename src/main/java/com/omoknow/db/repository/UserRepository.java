package com.omoknow.db.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.omoknow.db.domain.User;

public interface UserRepository extends CrudRepository<User, Long> {
	List<User> findByEmail(String email);
}
