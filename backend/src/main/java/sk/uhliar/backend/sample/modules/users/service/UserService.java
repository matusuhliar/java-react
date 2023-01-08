package sk.uhliar.backend.sample.modules.users.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.model.ApiUserRole;
import sk.uhliar.backend.sample.modules.users.repository.UserDao;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService {

    private UserDao userDao;
    private PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public List<ApiUser> users() {
        return userDao.findAll();
    }

    public List<ApiUserRole> roles() {
        return userDao.findAllRoles();
    }

    public ApiUser loadUserByUsername(String username){
        return userDao.findByEmail(username);
    }

    @Transactional
    public ApiUser add(Integer roleId,String email, String name, String password) {

        ApiUserRole role = this.userDao.getRoleById(roleId);

        ApiUser apiUser = new ApiUser();
        apiUser.setEmail(email);
        apiUser.setName(name);
        apiUser.setPassword(passwordEncoder.encode(password));

        apiUser.getRoles().add(role);
        return this.userDao.save(apiUser);
    }

    @Transactional
    public ApiUser edit(Integer id, Integer roleId, String email, String name) {
        ApiUserRole role = this.userDao.getRoleById(roleId);
        ApiUser apiUser = this.userDao.getUserById(id);
        apiUser.setId(id);
        apiUser.setEmail(email);
        apiUser.setName(name);
        apiUser.setRoles(Stream.of(role).collect(Collectors.toList()));
        return this.userDao.save(apiUser);
    }
    @Transactional
    public ApiUser editPassword(Integer id, String password) {
        ApiUser apiUser = this.userDao.getUserById(id);
        apiUser.setPassword(passwordEncoder.encode(password));
        return this.userDao.save(apiUser);
    }

    public ApiUser user(Integer id) {
        return this.userDao.getUserById(id);
    }

    @Transactional
    public void delete(Integer id) {
        this.userDao.delete(id);
    }

    public boolean emailExists(String email) {
        return this.userDao.findByEmail(email)!=null;
    }
}
