package com.example.careerForDeveloper.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "project_user")
public class ProjectUser implements Comparable<ProjectUser>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectUserId;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public int compareTo(ProjectUser o) {
        return (int)(o.getProject().getProjectId() - this.getProject().getProjectId());
    }
}
