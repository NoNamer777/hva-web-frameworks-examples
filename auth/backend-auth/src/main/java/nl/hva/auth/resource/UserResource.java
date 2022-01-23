package nl.hva.auth.resource;

import nl.hva.auth.entity.User;
import nl.hva.auth.repository.UserRepository;
import nl.hva.auth.repository.exception.UserNotFoundException;
import nl.hva.auth.resource.exception.AuthorizationException;
import nl.hva.auth.resource.security.JWTokenInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserResource {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/rest/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/rest/users/{email}")
    public User getUserByEmail(
            @PathVariable String email) {

        User userById = userRepo.findByEmail(email);

        if(userById == null) {
            throw new UserNotFoundException("id = " + email);
        }

        return userById;
    }


    @DeleteMapping("/rest/users/{email}")
    public ResponseEntity<User> deleteUser(@PathVariable String email, @RequestAttribute(value = JWTokenInfo.KEY) JWTokenInfo tokenInfo) {

        if(!tokenInfo.isAdmin()) {
            throw new AuthorizationException("only administrators can remove members");
        }

        User user = getUserByEmail(email);

        userRepo.delete(user);

        return ResponseEntity.ok(user);

    }

    @PutMapping("/rest/users")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {

        User userById = userRepo.findByEmail(user.getEmail());

        if(userById == null) {
            throw new UserNotFoundException("id = " + user.getEmail());
        }

        userRepo.save(user);

        return ResponseEntity.ok().build();
    }
}