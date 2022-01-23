package nl.hva.jpa.examples.part2.repository;

import nl.hva.jpa.examples.part2.entity.Passport;
import nl.hva.jpa.examples.part2.entity.Student;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class StudentRepositoryTest {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PassportRepository passportRepository;

    @Test
    void testSavingStudent() {

        Passport passport = new Passport();
        passport.setNumber("MXY2295");

        Passport savedPassport = passportRepository.save(passport);

        Student s = new Student();
        s.setName("Mary Jane");
        s.setStudentPassport(savedPassport);

        studentRepository.save(s);
    }

    @Test
    void testGettingStudent() {
        Student s = studentRepository.findById(20001);

        logger.info("student name " + s.getName() + " passport " + s.getStudentPassport());
        assertEquals("Mary Palmer",s.getName());

    }
}
