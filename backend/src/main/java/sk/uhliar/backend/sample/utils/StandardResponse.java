package sk.uhliar.backend.sample.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class StandardResponse<T> {
    private boolean success;
    private String timestamp;

    private String message;

    private Throwable cause;
    private T data;

    private StandardResponse(boolean success,String message,Throwable cause,T data) {
        this.data = data;
        this.success = success;
        this.message = message;
        this.cause = cause;
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
        df.setTimeZone(tz);
        this.timestamp = df.format(new Date());
    }

    public static <T> StandardResponse<T> success(T data){
        return new StandardResponse<>(true, "OK",null,data);
    }

    public static <T> StandardResponse<T> failure(String message){
        return new StandardResponse<>(false, message,null, null);
    }
    public static <T> StandardResponse<T> failure(String message,Exception exception){
        return new StandardResponse<>(false, message,exception,null);
    }
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public Throwable getCause() {
        return cause;
    }
}
