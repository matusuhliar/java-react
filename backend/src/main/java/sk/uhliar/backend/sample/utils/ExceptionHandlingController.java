package sk.uhliar.backend.sample.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ExceptionHandlingController {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Fail> handleExceptions(Exception exception, WebRequest webRequest) {
      return Fail.create().message("Exception occurred: " + exception.getMessage()).cause(exception).build();
    }
}

