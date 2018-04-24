package com.bala.donation.userpledge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bala.donation.userpledge.entity.UserPledgeEntity;

public interface UserPledgeRepo extends JpaRepository<UserPledgeEntity, Long> {

    List<UserPledgeEntity> findByUserDetailsId(long userId);

    UserPledgeEntity findByUserDetailsIdAndId(Long userId, Long id);

}
