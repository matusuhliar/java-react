package sk.uhliar.backend.sample.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sk.uhliar.backend.sample.utils.Success;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@RequestMapping(value = "/authenticate.json",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestParam String username,@RequestParam String password) throws Exception {
		authenticate(username, password);
		Tokens tokens = new Tokens(
			jwtTokenUtil.generateTokenAuthToken(username),
			jwtTokenUtil.generateRefreshToken(username)
		);
		userDetailsService.storeTokens(username,tokens);
		return Success.create().data(tokens).build();
	}

	@RequestMapping(value = "/authenticate-refresh.json",produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestParam String refreshToken) throws Exception {
		if(!jwtTokenUtil.isTokenExpired(refreshToken)){
			final String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
			Tokens tokens = new Tokens(
					jwtTokenUtil.generateTokenAuthToken(username),
					jwtTokenUtil.generateRefreshToken(username)
			);
			userDetailsService.storeTokens(username,tokens);
			return Success.create().data(tokens).build();
		}
		throw new Exception("TOKEN_EXPIRED");
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
