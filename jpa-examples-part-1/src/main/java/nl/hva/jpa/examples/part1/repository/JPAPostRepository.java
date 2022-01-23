package nl.hva.jpa.examples.part1.repository;

import nl.hva.jpa.examples.part1.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class JPAPostRepository implements PostRepository {

    @Autowired
    private EntityManager em;

    @Override
    public Post save(Post post) {
        return em.merge(post);
    }

    @Override
    public List<Post> findAll() {
        TypedQuery<Post> namedQuery = em.createNamedQuery("find_all_posts", Post.class);

        return namedQuery.getResultList();
    }

}
