package sk.uhliar.backend.sample.modules.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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


    @Operation(summary = "Get list of users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All users in the system", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ApiUser.class)))}),
            @ApiResponse(responseCode = "401", description = "Unauthorized access", content = @Content)}
    )
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping(value = "/users.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity users() {
        return Success.create().data(userService.users()).build();
    }

    @Operation(summary = "Get user details by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information about user", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ApiUser.class))}),
            @ApiResponse(responseCode = "401", description = "Unauthorized access", content = @Content)}
    )
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping(value = "/user.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity users(@RequestParam @Parameter(description="id of the user") Integer id) {
        return Success.create().data(userService.user(id)).build();
    }

    @GetMapping(value = "/email-exists.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity emailExists(@RequestParam String email) {
        return Success.create().data(userService.emailExists(email)).build();
    }

    @GetMapping(value = "/roles.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity roles() {
        return Success.create().data(userService.roles()).build();
    }

    @PostMapping(value = "/add.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String password
    ) {
        userService.add(role, email, name, password);
        return Success.create().data(true).build();
    }

    @PostMapping(value = "/edit.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity edit(
            @RequestParam Integer id,
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name
    ) {
        userService.edit(id, role, email, name);
        return Success.create().data(true).build();
    }

    @PostMapping(value = "/edit-password.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer id,
            @RequestParam String password
    ) {
        userService.editPassword(id, password);
        return Success.create().data(true).build();
    }

    @GetMapping(value = "/delete.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(
            @RequestParam Integer id
    ) {
        userService.delete(id);
        return Success.create().data(true).build();
    }
}
