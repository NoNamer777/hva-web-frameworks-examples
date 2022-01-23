package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Passport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
@Transactional
public class PassportRepository {

    @Autowired
    private EntityManager em;

    public Passport save(Passport passport) {
        Passport result = em.merge(passport);
        return result;
    }

    public Passport findById(int id) {
        return em.find(Passport.class,id);
    }


}
