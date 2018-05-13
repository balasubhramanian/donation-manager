package com.bala.donation.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bala.donation.user.entity.ConfigEntity;

public interface ConfigRepo extends JpaRepository<ConfigEntity, Long> {

    List<ConfigEntity> findByModule(String moduleName);

    List<ConfigEntity> findByModuleAndStatus(String moduleName, String status);

    @Query("select c.value from ConfigEntity c where c.module = :moduleName and c.name= :configName")
    String findByModuleAndName(@Param("moduleName") String moduleName, @Param("configName") String configName);

}
