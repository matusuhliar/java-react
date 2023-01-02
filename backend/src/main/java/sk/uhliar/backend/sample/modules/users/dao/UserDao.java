package sk.uhliar.backend.sample.modules.users.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import sk.uhliar.backend.sample.modules.users.model.DTOUser;

import java.util.List;

@Repository
public class UserDao {
    private NamedParameterJdbcTemplate tpl;


    public UserDao(NamedParameterJdbcTemplate tpl) {
        this.tpl = tpl;
    }

    public List<DTOUser> list() {
        var rowMapper = BeanPropertyRowMapper.newInstance(DTOUser.class);
        return tpl.query("SELECT * FROM [User]", rowMapper);
    }

    public DTOUser loadUserByUsername(String username) {
        MapSqlParameterSource msps = new MapSqlParameterSource();
        msps.addValue("username",username);
        var rowMapper = BeanPropertyRowMapper.newInstance(DTOUser.class);

        return tpl
                .query("SELECT * FROM [User] WHERE username = :username",msps, rowMapper)
                .stream()
                .findFirst()
                .orElse(null);
    }
}
