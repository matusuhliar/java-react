package sk.uhliar.backend.sample.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import sk.uhliar.backend.sample.utils.StandardResponse;

@Controller
public class ExceptionHandlingController {

  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(Exception.class)
  public StandardResponse handleException(Exception ex) {
      // Optionally do additional things with the exception, for example map
      // individual field errors (from e.getBindingResult()) to the Error object
      return StandardResponse.failure(ex);
  }

  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(RuntimeException.class)
  public StandardResponse handleException(RuntimeException ex) {
      // Optionally do additional things with the exception, for example map
      // individual field errors (from e.getBindingResult()) to the Error object
      return StandardResponse.failure(ex);
  }

}