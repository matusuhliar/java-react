package sk.uhliar.backend.sample.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class StandardResponse<T> {
    private boolean success;
    private String timestamp;
    private T data;

    private StandardResponse(boolean success,T data) {
        this.data = data;
        this.success = success;
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
        df.setTimeZone(tz);
        this.timestamp = df.format(new Date());
    }

    public static <T> StandardResponse<T> success(T data){
        return new StandardResponse<>(true, data);
    }

    public static <T> StandardResponse<T> failure(T data){
        return new StandardResponse<>(true, data);
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

}
