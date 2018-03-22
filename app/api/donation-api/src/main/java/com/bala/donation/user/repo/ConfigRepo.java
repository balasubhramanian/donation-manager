package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.user.entity.ConfigEntity;

public interface ConfigRepo extends JpaRepository<ConfigEntity, Long> {

    List<ConfigEntity> findByModule(String moduleName);

}
