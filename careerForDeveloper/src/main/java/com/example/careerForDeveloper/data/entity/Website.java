package com.example.careerForDeveloper.data.entity;

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
public class Website {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long websiteId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 20, nullable = false)
    private String websiteName;

    @Column(length = 100, nullable = false)
    private String website;
}
