package sk.uhliar.backend.sample.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;


@ControllerAdvice
public class ExceptionHandlingController {
    Logger logger = LoggerFactory.getLogger(ExceptionHandlingController.class);
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleExceptions(Exception exception, WebRequest webRequest) {
      logger.error("Exception occurred during request",exception);
      return ResponseEntity.internalServerError().body("Exception occurred: " + exception.getMessage());
    }
}

