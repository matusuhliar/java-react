package sk.uhliar.backend.sample.modules.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "api_user")
@Table(name="api_user")
public class ApiUser {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @JsonIgnore
    private String password;
    private String email;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "api_user_to_api_role",
            joinColumns = { @JoinColumn(name = "role_id")},
            inverseJoinColumns = { @JoinColumn(name = "user_id")})
    private List<ApiUserRole> roles = new ArrayList<>();

    public ApiUser() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<ApiUserRole> getRoles() {
        return roles;
    }

    public void setRoles(List<ApiUserRole> roles) {
        this.roles = roles;
    }
}
