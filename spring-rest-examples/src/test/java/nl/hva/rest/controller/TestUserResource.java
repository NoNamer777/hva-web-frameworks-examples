package nl.hva.rest.controller;

import nl.hva.rest.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URISyntaxException;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TestUserResource {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testCreatingUserShouldSucceed() throws URISyntaxException {

        // Arrange
        User user = new User(null,54321,"John Silver",new Date());

        // Act: Creating a user
        ResponseEntity<User> creationResult
                = this.restTemplate.postForEntity("/rest/users", user, User.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.CREATED);
        assertNotNull(creationResult.getBody().getId());
        assertEquals(user.getName(),creationResult.getBody().getName());
        assertEquals(user.getBirthDate(),creationResult.getBody().getBirthDate());
        assertEquals(user.getBsn(),creationResult.getBody().getBsn());

        // Act: Cross-check results - was the user persisted?
        ResponseEntity<User> queryResult = this.restTemplate.getForEntity("/rest/users/" + creationResult.getBody().getId(), User.class);

        // Assert: Check if data is correct
        assertEquals(queryResult.getStatusCode(), HttpStatus.OK);
        assertEquals(queryResult.getBody().getName(), creationResult.getBody().getName());
        assertEquals(queryResult.getBody().getBirthDate(), creationResult.getBody().getBirthDate());
        assertEquals(queryResult.getBody().getBsn(), creationResult.getBody().getBsn());
    }

}
