package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Passport;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PassportRepositoryTest {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PassportRepository repository;

    @Test
    void testGettingPassport() {

        Passport p = repository.findById(30001);

        logger.info("student " + p.getOwner());
        assertEquals("M30001",p.getNumber());

    }
}
