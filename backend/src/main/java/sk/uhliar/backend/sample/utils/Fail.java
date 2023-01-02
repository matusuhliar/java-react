package sk.uhliar.backend.sample.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Fail {
    private boolean success;
    private String timestamp;
    private String message;
    private Throwable cause;

    private HttpStatus httpStatus;

    public Fail() {
        this.success = false;
        this.timestamp = Utils.timestamp();
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public static Fail create(){
        return new Fail();
    }

    public Fail message(String message){
        this.message = message;
        return this;
    }

    public Fail cause(Throwable cause){
        this.cause = cause;
        return this;
    }

    public ResponseEntity<Fail> build(){
        return new ResponseEntity<Fail>(this, this.httpStatus);
    }

    public Fail httpStatus(HttpStatus status){
        this.httpStatus = status;
        return this;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getCause() {
        return cause;
    }
}
