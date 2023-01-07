package sk.uhliar.backend.sample.modules.users.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.model.ApiUserRole;

import java.util.List;

@Repository
public class UserDao {

    @PersistenceContext
    private EntityManager em;


    public List<ApiUser> findAll() {
        return em.createQuery("SELECT U FROM api_user U").getResultList();
    }

    public ApiUserRole getRoleById(Integer id) {
        return em.find(ApiUserRole.class,id);
    }

    public List<ApiUserRole> findAllRoles() {
        return em.createQuery("SELECT R FROM api_role R").getResultList();
    }

    public ApiUser findByEmail(String username) {
        return (ApiUser) em.createQuery("SELECT U FROM api_user U WHERE email=:email").setParameter("email",username).getSingleResult();
    }

    public ApiUser save(ApiUser apiUser) {
        em.persist(apiUser);
        return apiUser;
    }

    public ApiUser getUserById(Integer id) {
        return em.find(ApiUser.class,id);
    }
}
