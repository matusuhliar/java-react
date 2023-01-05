package sk.uhliar.backend.sample.modules.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

public class ApiUser {
    private int id;
    private String name;

    @JsonIgnore
    private String password;

    private String email;

    private List<ApiUserRole> roles = new ArrayList<>();

    public ApiUser() {
    }

    public ApiUser(int id, String email, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    public String getEmail() {
        return email;
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

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
