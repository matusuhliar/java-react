package sk.uhliar.backend.sample.modules.users.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import sk.uhliar.backend.sample.jwt.Tokens;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.model.ApiUserRole;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDao {

    @PersistenceContext
    private EntityManager em;

    public List<ApiUser> findAll() {
        return (List<ApiUser>) em.createQuery("SELECT U FROM api_user U ORDER BY U.id ASC").getResultList();
    }

    public ApiUserRole getRoleById(Integer id) {
        return (ApiUserRole) em.find(ApiUserRole.class,id);
    }

    public List<ApiUserRole> findAllRoles() {
        return (List<ApiUserRole>) em.createQuery("SELECT R FROM api_role R").getResultList();
    }

    public ApiUser findByEmail(String username) {
        return (ApiUser) em.createQuery("SELECT U FROM api_user U WHERE email=:email").setParameter("email",username).getResultList().stream().findFirst().orElse(null);
    }

    public ApiUser save(ApiUser apiUser) {
        em.persist(apiUser);
        return apiUser;
    }

    public ApiUser getUserById(Integer id) {
        return em.find(ApiUser.class,id);
    }

    public void delete(Integer id) {
        ApiUser user = getUserById(id);
        user.setRoles(new ArrayList<>());
        em.persist(user);
        em.remove(user);
    }

    public void storeTokens(String username, Tokens tokens) {
        ApiUser user = findByEmail(username);
        user.setToken(tokens.getToken());
        user.setRefreshToken(tokens.getRefreshToken());
        em.persist(user);
    }
}
