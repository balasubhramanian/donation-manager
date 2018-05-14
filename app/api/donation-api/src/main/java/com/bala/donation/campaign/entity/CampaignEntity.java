package com.bala.donation.campaign.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.bala.donation.common.entity.BaseEntity;
import com.bala.donation.user.entity.ConfigEntity;

@Entity
@Table(name = "campaign")
public class CampaignEntity extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "type_id") private ConfigEntity type;

    @Temporal(TemporalType.TIMESTAMP) private Date startDate;
    @Temporal(TemporalType.TIMESTAMP) private Date endDate;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public ConfigEntity getType() {
        return type;
    }

    public void setType(ConfigEntity type) {
        this.type = type;
    }

}
