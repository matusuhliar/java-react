package sk.uhliar.backend.sample.modules.users.service;

import org.springframework.stereotype.Service;
import sk.uhliar.backend.sample.modules.users.dao.UserDao;
import sk.uhliar.backend.sample.modules.users.model.DTOUser;

import java.util.List;

@Service
public class UserService {

    private UserDao dao;

    public UserService(UserDao dao) {
        this.dao = dao;
    }

    public List<DTOUser> list() {
        return dao.list();
    }

    public DTOUser loadUserByUsername(String username){
        return dao.loadUserByUsername(username);
    }
}
