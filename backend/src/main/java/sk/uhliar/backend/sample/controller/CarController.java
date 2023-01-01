package sk.uhliar.backend.sample.controller;

import java.util.List;
import java.util.Objects;
import java.util.function.IntSupplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sk.uhliar.backend.sample.controller.model.Car;
import sk.uhliar.backend.sample.utils.StandardResponse;

@RestController
public class CarController {

	private static List<Car> cars = Stream.of(new Car(1,"Alfa Romeo"),new Car(2,"Ferrari"),new Car(3,"Skoda")).collect(Collectors.toList());

	@GetMapping(value="/cars.json",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<StandardResponse<List<Car>>> list() throws Exception{
		if(true)throw new Exception("AAA");
		return new ResponseEntity<StandardResponse<List<Car>>>(StandardResponse.success(cars), HttpStatus.OK);
	}

	@GetMapping(value="/add.json",produces = MediaType.APPLICATION_JSON_VALUE)
	public synchronized ResponseEntity<StandardResponse<Boolean>> add(@RequestParam String name) {
		Integer newId = cars.stream().mapToInt(Car::getId).max().orElse(0) + 1;
		cars.add(new Car(newId,name));
		return new ResponseEntity<StandardResponse<Boolean>>(StandardResponse.success(true), HttpStatus.OK);
	}

	@GetMapping(value="/delete.json",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<StandardResponse<Boolean>> delete(@RequestParam Integer id) {
		cars = cars.stream().filter(c->!Objects.equals(c.getId(), id)).collect(Collectors.toList());
		return new ResponseEntity<StandardResponse<Boolean>>(StandardResponse.success(true), HttpStatus.OK);
	}

}
