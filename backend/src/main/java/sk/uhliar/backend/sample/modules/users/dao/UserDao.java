package sk.uhliar.backend.sample.modules.users.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.model.ApiUserRole;
import sk.uhliar.backend.sample.modules.users.model.UserQueryResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserDao {
    private NamedParameterJdbcTemplate tpl;

    private PasswordEncoder passwordEncoder;

    public UserDao(NamedParameterJdbcTemplate tpl,PasswordEncoder passwordEncoder) {
        this.tpl = tpl;
        this.passwordEncoder=passwordEncoder;
    }

    public List<ApiUser> list() {
        var rowMapper = BeanPropertyRowMapper.newInstance(UserQueryResult.class);
        List<UserQueryResult> users = tpl.query("SELECT U.id,U.name,U.password,U.email,R.\"key\" as roleKey, R.name as roleName FROM [User] U INNER JOIN [UserRole] UR ON U.ID=UR.userId INNER JOIN [Role] R ON R.ID=UR.roleId ORDER BY U.ID", rowMapper);
        return toApiUser(users);
    }

    public ApiUser loadUserByUsername(String username) {
        MapSqlParameterSource msps = new MapSqlParameterSource();
        msps.addValue("email",username);
        var rowMapper = BeanPropertyRowMapper.newInstance(UserQueryResult.class);
        return toApiUser(tpl.query("SELECT U.id,U.name,U.password,U.email,R.\"key\" as roleKey, R.name as roleName FROM [User] U INNER JOIN [UserRole] UR ON U.ID=UR.userId INNER JOIN [Role] R ON R.ID=UR.roleId WHERE email = :email ORDER BY U.ID",msps, rowMapper))
                .stream()
                .findFirst()
                .orElse(null);
    }

    private List<ApiUser> toApiUser(List<UserQueryResult> dtoUsers){
        Map<Integer,ApiUser> users = new HashMap<>();
        for(UserQueryResult dtoUser:dtoUsers){
            ApiUser user = users.get(dtoUser.getId());
            if(user == null) user = new ApiUser(dtoUser.getId(),dtoUser.getEmail(),dtoUser.getName(),dtoUser.getPassword());
            user.getRoles().add(new ApiUserRole(dtoUser.getRoleKey(),dtoUser.getRoleName()));
            users.put(user.getId(),user);
        }
        return users.values().stream().toList();
    }

    public void add(String email, String name, String password) {
        final String query = "INSERT INTO \"User\" (email,name,password) VALUES (:email,:name,:password)";
        MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("email",email);
        sqlParameterSource.addValue("name",name);
        sqlParameterSource.addValue("password",passwordEncoder.encode(password));
        KeyHolder keyHolder = new GeneratedKeyHolder();
        tpl.update(query,sqlParameterSource,keyHolder);
        Integer generatedKey = keyHolder.getKey().intValue();
        sqlParameterSource.addValue("userId",generatedKey);
        final String query1 = "INSERT INTO \"UserRole\" (userId,roleId) VALUES (:userId,1)";
        tpl.update(query1,sqlParameterSource);
    }

    public void edit(Integer id, String email, String name, String password) {
        final String query = "UPDATE \"User\" SET email=:email,name=:name,password=:password";
        MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("id",id);
        sqlParameterSource.addValue("email",email);
        sqlParameterSource.addValue("name",name);
        sqlParameterSource.addValue("password",passwordEncoder.encode(password));
        tpl.update(query,sqlParameterSource);
    }
}
