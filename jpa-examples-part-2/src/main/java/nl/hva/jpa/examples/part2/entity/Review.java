package nl.hva.jpa.examples.part2.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Review {

    @Id
    @GeneratedValue
    private Integer id;
    private String description;
    private String rating;

    @ManyToOne
    private Course reviewedCourse;

    protected Review() {}

    public Review(String description, String rating) {
        this.description = description;
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Course getReviewedCourse() {
        return reviewedCourse;
    }

    public void setReviewedCourse(Course reviewedCourse) {
        this.reviewedCourse = reviewedCourse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return Objects.equals(id, review.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
