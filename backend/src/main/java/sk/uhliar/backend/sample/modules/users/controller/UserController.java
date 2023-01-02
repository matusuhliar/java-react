package sk.uhliar.backend.sample.modules.users.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.uhliar.backend.sample.modules.users.model.AppUser;
import sk.uhliar.backend.sample.modules.users.service.UserService;
import sk.uhliar.backend.sample.utils.StandardResponse;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value="/list.json",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StandardResponse<List<AppUser>>> list() {
        return new ResponseEntity<>(StandardResponse.success(userService.list()), HttpStatus.OK);
    }

}
