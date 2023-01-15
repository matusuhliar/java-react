package sk.uhliar.backend.sample.jwt;

public class Tokens {
    private String token;
    private String refreshToken;

    public Tokens(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
