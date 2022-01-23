package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Course;
import nl.hva.jpa.examples.part2.entity.Student;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CourseRepositoryTest {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Test
    @Transactional // This annotation is here just to show how lazy fetch works - please avoid using @Transactional in tests
    void testFindingACourse() {

        Course course = courseRepository.findById(10001);
        assertEquals("AI",course.getName());

        logger.info("reviews = " + course.getReviews());
    }

    @Test
    @DirtiesContext
    void testRemoveACourse() {
        courseRepository.removeById(10001);
        assertNull(courseRepository.findById(10001));
    }

    @Test
    @DirtiesContext
    void testAddingStudents() {

        Student s1 = new Student("Paul Tyler");
        Student s2 = new Student("Vera Ulrich");
        s1 = studentRepository.save(s1);
        s2 = studentRepository.save(s2);

        Course c1 = new Course("Blockchain");
        c1.addStudent(s1);
        c1.addStudent(s2);

        courseRepository.save(c1);

    }

    @Test
    void testListCoursesByPrice() {
        List<Course> courses = courseRepository.findCoursesByPriceRange(1000,2000);

        logger.info("courser = " + courses);

    }

    @Test
    void testListAllCourses() {
        List<Course> courses = courseRepository.findAllCourses();

        logger.info("courser = " + courses);

    }



}
