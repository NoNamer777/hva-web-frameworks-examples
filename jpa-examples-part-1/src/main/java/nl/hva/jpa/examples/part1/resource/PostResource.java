package nl.hva.jpa.examples.part1.resource;

import nl.hva.jpa.examples.part1.entity.Post;
import nl.hva.jpa.examples.part1.entity.User;
import nl.hva.jpa.examples.part1.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
public class PostResource {

    @Autowired
    private UserResource userResource;

    @Autowired
    private PostRepository postRepo;

    @GetMapping("/rest/users/{id}/posts")
    public List<Post> getPosts(@PathVariable int id) {

        User user = userResource.getUserById(id);

        return user.getPosts();
    }

    @PostMapping("/rest/users/{id}/posts")
    @Transactional
    public ResponseEntity<Object> createPost(@RequestParam(name = "fail",required = false, defaultValue = "false") boolean shouldFail,
                                             @PathVariable int id, @RequestBody Post post) {

        User user = userResource.getUserById(id);

        post.setUser(user);

        postRepo.save(post);

        // used to demonstrate transaction handling
        if(shouldFail) {
            throw new RuntimeException("Failed for demo purposes. This action will rollback the database transaction");
        }

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{postId}").buildAndExpand(post.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

}
