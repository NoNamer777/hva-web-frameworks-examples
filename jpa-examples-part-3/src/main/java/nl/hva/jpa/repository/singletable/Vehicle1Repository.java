package nl.hva.jpa.repository.singletable;

import nl.hva.jpa.entity.singletable.Vehicle1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
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
public class Vehicle1Repository<T extends Vehicle1> {

    @Autowired
    private EntityManager em;

    public List<T> findAll() {
        T x = null;
        Query query = em.createQuery("SELECT v FROM " + x.getClass().getName() + " v");

        return query.getResultList();
    }

    public T findByLicensePlate(String licensePlate, Class<T> c) {
        return em.find(c,licensePlate);
    }

    public T save(T v) {
        return em.merge(v);
    }

    public T delete(T v) {
        T toRemove = em.merge(v);
        em.remove(toRemove);
        return toRemove;
    }

}
