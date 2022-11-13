package com.example.careerForDeveloper.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "comment_answer")
public class CommentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentAnswerId;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 5000, nullable = false)
    private String contents;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(length = 20, nullable = false)
    private String status;
}
