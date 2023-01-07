package sk.uhliar.backend.sample;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.transaction.annotation.Transactional;
import sk.uhliar.backend.sample.modules.users.model.ApiUser;
import sk.uhliar.backend.sample.modules.users.model.ApiUserRole;

@SpringBootApplication()
@EnableConfigurationProperties
@EntityScan(basePackages = {"sk.uhliar"})
public class SampleApplication implements CommandLineRunner {

	@PersistenceContext
	private EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(SampleApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		ApiUserRole apiUserRole1 = new ApiUserRole();
		apiUserRole1.setKey("ADMIN");
		apiUserRole1.setName("Administrátor");
		ApiUserRole apiUserRole2 = new ApiUserRole();
		apiUserRole2.setKey("USER");
		apiUserRole2.setName("Užívateľ");
		em.persist(apiUserRole1);
		em.persist(apiUserRole2);

		ApiUser apiUser = new ApiUser();
		apiUser.setName("Matúš Uhliar");
		apiUser.setEmail("matus.uhliar@gmail.com");
		apiUser.setPassword("$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6");
		apiUser.getRoles().add(apiUserRole1);
		em.persist(apiUser);

	}
}
