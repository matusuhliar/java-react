package sk.uhliar.backend.sample.modules.users.service;

import org.springframework.stereotype.Service;
import sk.uhliar.backend.sample.modules.users.dao.UserDao;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;

import java.util.List;

@Service
public class UserService {

    private UserDao dao;

    public UserService(UserDao dao) {
        this.dao = dao;
    }

    public List<ApiUser> list() {
        return dao.list();
    }

    public ApiUser loadUserByUsername(String username){
        return dao.loadUserByUsername(username);
    }

    public void add(String email, String name, String password) {
        dao.add(email,name,password);
    }

    public void edit(Integer id, String email, String name, String password) {
        dao.edit(id,email,name,password);
    }
}
