package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CourseRepository {

    @Autowired
    private EntityManager em;

    public Course findById(int id) {
        return em.find(Course.class,id);
    }

    public Course save(Course course) {

        Course result = em.merge(course);

        return result;
    }

    public void removeById(int id) {
        Course c = findById(id);

        em.remove(c);
    }

    public List<Course> findCoursesByPriceRange(double min, double max) {
        TypedQuery<Course> namedQuery =
                em.createNamedQuery("find_course_by_price_range", Course.class);

        return namedQuery
                    .setParameter("min",min)
                    .setParameter("max",max)
                    .getResultList();

    }

    public List<Course> findAllCourses() {
        TypedQuery<Course> namedQuery =
                em.createNamedQuery("find_all_courses", Course.class);

        return namedQuery.getResultList();

    }



}
