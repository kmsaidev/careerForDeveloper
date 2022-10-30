package com.example.careerForDeveloper.data.entity;

import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long profileId;

    @Column(length = 200)
    private String availableTime;

    @Builder
    public Profile(String availableTime){
        this.availableTime = availableTime;
    }
}
