package sk.uhliar.backend.sample.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Success<T> {
    private boolean success;
    private String timestamp;
    private Object data;

    private Success() {
        this.success = true;
        this.timestamp = Utils.timestamp();
    }

    public Success<T> data(T data) {
        this.data = data;
        return this;
    }

    public static Success create(){
        return new Success();
    }

    public <T> ResponseEntity<Success> build(){
        return new ResponseEntity<Success>(this, HttpStatus.OK);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Object getData() {
        return data;
    }
}
