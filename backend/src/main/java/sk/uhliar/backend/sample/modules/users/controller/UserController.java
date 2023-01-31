package sk.uhliar.backend.sample.modules.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.service.UserService;

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
        return ResponseEntity.ok(userService.users());
    }

    @Operation(summary = "Get user details by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Information about user", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ApiUser.class))}),
            @ApiResponse(responseCode = "401", description = "Unauthorized access", content = @Content)}
    )
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping(value = "/user.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity users(@RequestParam @Parameter(description="id of the user") Integer id) {
        return ResponseEntity.ok(userService.user(id));
    }

    @GetMapping(value = "/email-exists.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity emailExists(@RequestParam String email) {
        return ResponseEntity.ok(userService.emailExists(email));
    }

    @GetMapping(value = "/roles.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity roles() {
        return ResponseEntity.ok(userService.roles());
    }

    @PostMapping(value = "/add.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String password
    ) {
        userService.add(role, email, name, password);
        return ResponseEntity.ok(true);
    }

    @PostMapping(value = "/edit.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity edit(
            @RequestParam Integer id,
            @RequestParam Integer role,
            @RequestParam String email,
            @RequestParam String name
    ) {
        userService.edit(id, role, email, name);
        return ResponseEntity.ok(true);
    }

    @PostMapping(value = "/edit-password.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity add(
            @RequestParam Integer id,
            @RequestParam String password
    ) {
        userService.editPassword(id, password);
        return ResponseEntity.ok(true);
    }

    @GetMapping(value = "/delete.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(
            @RequestParam Integer id
    ) {
        userService.delete(id);
        return ResponseEntity.ok(true);
    }
}
