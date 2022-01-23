package nl.hva.jpa.examples.part1.repository;

import nl.hva.jpa.examples.part1.entity.User;
import nl.hva.jpa.examples.part1.repository.JPAUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest
class TestUserRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired // repository is automatically injected into the test instance
    private UserRepository repository;

    @Test
    void testFindingAUser() {

        User u = repository.findById(10005);
        assertEquals("Okechukwu Onwunli",u.getName());

    }

    @Test
    @DirtiesContext // indicates that the test is dirty and should therefore be closed and removed from the context cache
    void testRemovingAUser() {

        User u = repository.findById(10005);

        repository.delete(u);

        assertNull(repository.findById(10005));
    }

    @Test
    @DirtiesContext
    void testAddingAUser() {

        User u = new User("Maria Palmer",new Date());

        u = repository.save(u);

        assertNotNull(u.getId());

        u = repository.findById(u.getId());

        assertEquals("Maria Palmer", u.getName());

    }

    @Test
    @DirtiesContext
    void testUpdatingAUser() {

        User u = repository.findById(10004);

        u.setName("Mr Martijn Thorig");

        repository.save(u);

        u = repository.findById(10004);

        assertEquals("Mr Martijn Thorig", u.getName());

    }

}
