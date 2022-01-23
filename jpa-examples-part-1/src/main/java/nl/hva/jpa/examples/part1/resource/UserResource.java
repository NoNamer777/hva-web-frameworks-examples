package nl.hva.jpa.examples.part1.resource;

import nl.hva.jpa.examples.part1.entity.User;
import nl.hva.jpa.examples.part1.repository.UserRepository;
import nl.hva.jpa.examples.part1.resource.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class UserResource {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/rest/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/rest/users/{id}")
    public User getUserById(
            @PathVariable int id) {

        User userById = userRepo.findById(id);

        if(userById == null) {
            throw new UserNotFoundException("id = " + id);
        }

        return userById;
    }

    @PostMapping("/rest/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User savedUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder.
                        fromCurrentRequest().path("/{id}").
                            buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("/rest/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {

        User user = getUserById(id);

        userRepo.delete(user);

        return ResponseEntity.ok(user);

    }

    @PutMapping("/rest/users")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {


        User userById = userRepo.findById(user.getId());

        if(userById == null) {
            throw new UserNotFoundException("id = " + user.getId());
        }

        userRepo.save(user);



        return ResponseEntity.ok().build();
    }

}
