package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Course;
import nl.hva.jpa.examples.part2.entity.Review;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ReviewRepositoryTest {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    @Test
    public void testAddingReview() {

        Course c = courseRepository.findById(10000);

        Review r = new Review("Good course","5");
        r.setReviewedCourse(c);

        r = repository.save(r);

        r = repository.findById(r.getId());

        assertEquals(r.getDescription(),"Good course");


    }

}
