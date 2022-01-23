package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
@Transactional
public class StudentRepository {

    @Autowired
    private EntityManager em;

    public Student findById(int id) {
        return em.find(Student.class,id);
    }

    public Student save(Student student) {

        Student result = em.merge(student);

        return result;
    }


}
