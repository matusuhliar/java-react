package sk.uhliar.backend.sample.jwt;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.service.UserService;

import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	private UserService userService;

	public JwtUserDetailsService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ApiUser user = this.userService.loadUserByUsername(username);
		if (user!=null) {
			return new User(
				user.getUsername(),
				user.getPassword(),
				user.getRoles().stream().map(r->new JwtGrantedAuthority(r.getKey())).collect(Collectors.toList())
			);
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}