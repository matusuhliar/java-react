package sk.uhliar.backend.sample.modules.users.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

}
