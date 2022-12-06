package com.example.careerForDeveloper.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "project")
public class Project implements Comparable<Project>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId;

    @Column(length = 100, nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 30)
    private String techName;

    @Column(nullable = false)
    private int limitedMember;

    @Column(nullable = false)
    private int partMember;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(length = 5000, nullable = false)
    private String contents;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(length = 20, nullable = false)
    private String status;

    @Override
    public int compareTo(Project o) {
        return (int)o.getProjectId() - (int)this.getProjectId();
    }
}
