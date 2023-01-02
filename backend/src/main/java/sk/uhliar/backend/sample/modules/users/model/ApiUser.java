package sk.uhliar.backend.sample.modules.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

public class ApiUser {
    private int id;
    private String username;
    private String name;

    @JsonIgnore
    private String password;

    private List<ApiUserRole> roles = new ArrayList<>();

    public ApiUser() {
    }

    public ApiUser(int id, String username, String password, String name) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.roles = roles;
    }

    public List<ApiUserRole> getRoles() {
        return roles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
