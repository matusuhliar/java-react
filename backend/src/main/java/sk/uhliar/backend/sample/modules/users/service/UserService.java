package sk.uhliar.backend.sample.modules.users.service;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import sk.uhliar.backend.sample.modules.users.model.AppUser;

import java.util.List;

@Service
public class UserService {

    private NamedParameterJdbcTemplate tpl;

    public UserService(NamedParameterJdbcTemplate tpl) {
        this.tpl = tpl;
    }

    public List<AppUser> list() {
        var rowMapper = BeanPropertyRowMapper.newInstance(AppUser.class);
        return tpl.query("SELECT * FROM [User]", rowMapper);
    }
}
