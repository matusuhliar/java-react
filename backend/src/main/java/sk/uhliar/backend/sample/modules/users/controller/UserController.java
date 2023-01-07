package sk.uhliar.backend.sample.modules.users.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.service.UserService;
import sk.uhliar.backend.sample.utils.Success;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value="/users.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity users() {
        return Success.create().data(userService.users()).build();
    }

    @GetMapping(value="/user.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity users(@RequestParam Integer id) {
        return Success.create().data(userService.user(id)).build();
    }
    @GetMapping(value="/roles.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity roles() {
        return Success.create().data(userService.roles()).build();
    }

    @PostMapping(value="/add.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String password
        ) {
        userService.add(role,email,name,password);
        return Success.create().data(true).build();
    }

    @PostMapping(value="/edit.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity edit(
            @RequestParam Integer id,
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name
    ) {
        userService.edit(id,role,email,name);
        return Success.create().data(true).build();
    }

    @PostMapping(value="/edit-password.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer id,
            @RequestParam String password
    ) {
        userService.editPassword(id,password);
        return Success.create().data(true).build();
    }
}
