package nl.hva.jpa.examples.part2.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NamedQueries({
        @NamedQuery(name="find_all_courses",
                query="SELECT c from Course c"),
        @NamedQuery(name="find_course_by_price_range",
            query="SELECT c from Course c WHERE c.price >= :min  AND c.price <= :max ORDER BY c.price")
})
public class Course {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private double price;

    @OneToMany(mappedBy = "reviewedCourse", cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "course_student",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id") )
    private List<Student> students = new ArrayList<>();

    public Course() {}

    public Course(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void addReview(Review review) {
        review.setReviewedCourse(this);
        this.reviews.add(review);
    }

    public boolean removeReview(Review review) {
        return this.reviews.remove(review);
    }

    public List<Student> getStudents() {
        return this.students;
    }

    public void addStudent(Student student) {

        this.students.add(student);
        student.addCourse(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return Objects.equals(id, course.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

}
