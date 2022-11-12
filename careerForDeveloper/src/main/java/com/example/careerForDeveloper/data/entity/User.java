package com.example.careerForDeveloper.data.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.sql.Blob;
import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 200, nullable = false)
    private String pwd;

    @Column(length = 20, nullable = false)
    private String nickname;

    private String profileImageLoc;

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(length = 20, nullable = false)
    private String status;

    @Column(length = 200)
    private String introduce;

    @Column(length = 200)
    private String refreshToken;

    @Builder
    public User(String email, String pwd, String nickname, Timestamp createdAt){
        this.email = email;
        this.pwd = pwd;
        this.nickname = nickname;
        this.createdAt = createdAt;
    }
}
