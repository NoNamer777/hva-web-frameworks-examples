package nl.hva.rest.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import nl.hva.rest.controller.exception.UserNotFoundException;
import nl.hva.rest.entity.User;
import nl.hva.rest.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Api(value = "user management",description = "a set of endpoints for user management")
public class UserResource {

    @Autowired
    private UserRepository repo;

    @GetMapping("/rest/users")
    @ApiOperation(value = "Returns a list of users", response = User.class)
    public List<User> getAllUsers() {
        return repo.findAll();
    }



    @GetMapping("/rest/users/{id}")
    @ApiOperation(value = "Returns a representation of a user given the specified id", response = List.class)
    public User getUserById(
            @ApiParam(value = "the unique key of the user", required = true)
            @PathVariable int id) {

        User user = repo.findOne(id);

        if(user == null) {
            throw new UserNotFoundException("id = " + id);
        }

        return user;
    }

    @PostMapping("/rest/users")
    @ApiOperation(value = "Creates a user")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User savedUser = repo.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("/rest/users/{id}")
    @ApiOperation(value = "Removes a user given the specified id")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {

        User user = repo.deleteById(id);

        if(user == null) {
            throw new UserNotFoundException("id="+id);
        }

        return ResponseEntity.ok(user);

    }

    @PutMapping("/rest/users")
    @ApiOperation(value = "Update a user")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {

        User previous = repo.findOne(user.getId());

        if(previous == null) {
            throw new UserNotFoundException("id="+user.getId());
        }

        repo.save(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/rest/users/filtered1")
    @JsonView(User.UserView.OnlyUserIdAndName.class)
    @ApiOperation(value = "Returns a list of users (only id and name)", response = User.class)
    public List<User> getAllUsersFiltered1() {

        List<User> users = repo.findAll();

        return users;
    }

    @GetMapping("/rest/users/filtered2")
    @JsonView(User.UserView.OnlyBsnAndBirthDate.class)
    @ApiOperation(value = "Returns a list of users (do not expose BSN)", response = User.class)
    public List<User> getAllUsersFiltered2() {

        List<User> users = repo.findAll();

        return users;
    }



}
