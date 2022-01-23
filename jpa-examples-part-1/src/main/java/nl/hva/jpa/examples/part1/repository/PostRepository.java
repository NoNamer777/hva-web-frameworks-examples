package nl.hva.jpa.examples.part1.repository;

import nl.hva.jpa.examples.part1.entity.Post;

import java.util.List;

public interface PostRepository {
    Post save(Post post);
    List<Post> findAll();
}
