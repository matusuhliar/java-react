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

    @GetMapping(value="/list.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity list() {
        return Success.create().data(userService.list()).build();
    }

    @PostMapping(value="/add.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String password
        ) {
        userService.add(email,name,password);
        return Success.create().data(true).build();
    }

    @PostMapping(value="/edit.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer id,
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String password
    ) {
        userService.edit(id,email,name,password);
        return Success.create().data(true).build();
    }
}
