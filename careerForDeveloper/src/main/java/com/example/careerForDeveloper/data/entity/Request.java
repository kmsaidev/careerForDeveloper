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
@Table(name = "request")
public class Request implements Comparable<Request>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestId;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 5000, nullable = false)
    private String contents;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(length = 20, nullable = false)
    private String status;

    @Override
    public int compareTo(Request o) {
        return (int)(o.getRequestId() - this.getRequestId());
    }
}
