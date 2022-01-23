package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Course;
import nl.hva.jpa.examples.part2.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
@Transactional
public class ReviewRepository {

    @Autowired
    private EntityManager em;

    public Review findById(int id) {
        return em.find(Review.class,id);
    }

    public Review save(Review review) {

        Review result = em.merge(review);

        return result;
    }

}
