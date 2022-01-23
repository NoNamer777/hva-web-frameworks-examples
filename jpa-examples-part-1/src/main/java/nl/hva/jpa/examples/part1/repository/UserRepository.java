package nl.hva.jpa.examples.part1.repository;

import nl.hva.jpa.examples.part1.entity.User;

import java.util.List;

public interface UserRepository {
    User save(User user);

    void delete(User user);

    User findById(int id);

    List<User> findAll();
}
