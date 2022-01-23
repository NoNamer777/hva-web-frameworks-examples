package nl.hva.rest.repo;

import nl.hva.rest.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Component
public class InMemoryUserRepository implements UserRepository {

    private static int usersCount = 0;
    private List<User> users;

    public InMemoryUserRepository() {
        users = new ArrayList<>();
        populateWithUsers();
    }

    private void populateWithUsers() {
        save(new User(null,123,"Okechukwu Onwunli", new Date()));
        save(new User(null,456,"Jur van Oerle", new Date()));
        save(new User(null,789,"Martijn Thorig", new Date()));
        save(new User(null,321,"John Somers", new Date()));
        save(new User(null,654,"Marcio Fuckner", new Date()));
    }

    @Override
    public List<User> findAll() {
        return users;
    }

    @Override
    public User save(User user) {
        if(user.getId() == null) {
            synchronized (InMemoryUserRepository.class) {
                user.setId(++usersCount);
            }
        }

        int pos = users.indexOf(user);

        if(pos == -1) {
            users.add(user);
        } else {
            users.set(pos,user);
        }

        return user;
    }

    @Override
    public User findOne(int id) {

        for(User u : users) {
            if(u.getId() == id) {
                return u;
            }
        }
        return null;
    }

    @Override
    public User deleteById(int id) {
        Iterator<User> iterator = users.iterator();
        while(iterator.hasNext()) {
            User user = iterator.next();

            if(user.getId() == id) {
                iterator.remove();
                return user;
            }
        }
        return null;
    }


}
