package sk.uhliar.backend.sample.modules.users.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
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


    public UserDao(NamedParameterJdbcTemplate tpl) {
        this.tpl = tpl;
    }

    public List<ApiUser> list() {
        var rowMapper = BeanPropertyRowMapper.newInstance(UserQueryResult.class);
        List<UserQueryResult> users = tpl.query("SELECT U.id,U.name,U.password,U.email,R.\"key\" as roleKey, R.name as roleName FROM [User] U INNER JOIN [UserRole] UR ON U.ID=UR.userId INNER JOIN [Role] R ON R.ID=UR.roleId ORDER BY U.ID", rowMapper);
        return toApiUser(users);
    }

    public ApiUser loadUserByUsername(String username) {
        MapSqlParameterSource msps = new MapSqlParameterSource();
        msps.addValue("username",username);
        var rowMapper = BeanPropertyRowMapper.newInstance(UserQueryResult.class);
        return toApiUser(tpl.query("SELECT U.id,U.name,U.password,U.email,R.\"key\" as roleKey, R.name as roleName FROM [User] U INNER JOIN [UserRole] UR ON U.ID=UR.userId INNER JOIN [Role] R ON R.ID=UR.roleId WHERE username = :username ORDER BY U.ID",msps, rowMapper))
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
}
