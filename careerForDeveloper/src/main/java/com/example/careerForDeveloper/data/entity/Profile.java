package com.example.careerForDeveloper.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Table
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@NoArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long profileId;

    @Column(length = 1000)
    private String tech;

    @Column(length = 200)
    private String availableTime;

    @Builder
    public Profile(String tech, String availableTime){
        this.tech = tech;
        this.availableTime = availableTime;
    }
}
