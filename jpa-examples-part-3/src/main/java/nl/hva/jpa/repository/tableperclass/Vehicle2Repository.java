package nl.hva.jpa.repository.tableperclass;


import nl.hva.jpa.entity.tableperclass.Vehicle2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

/**
 * A vehicle repository. For the sake of simplicity, the interface was not generated
 *
 * @param <T> The type of vehicle you are managing (passenger, or commercial)
 */
@Repository
@Transactional
public class Vehicle2Repository<T extends Vehicle2> {

    @Autowired
    private EntityManager em;

    public List<T> findAll(Class<T> c) {
        TypedQuery<T> namedQuery = em.createQuery("SELECT v FROM " + c.getName() + " v", c);

        return namedQuery.getResultList();
    }

    public T findByLicensePlate(String licensePlate, Class<T> c) {
        return em.find(c,licensePlate);
    }

    public T save(T v) {
        return em.merge(v);
    }

    public  T delete(T v) {
        T toRemove = em.merge(v);

        em.remove(toRemove);

        return toRemove;
    }

}
