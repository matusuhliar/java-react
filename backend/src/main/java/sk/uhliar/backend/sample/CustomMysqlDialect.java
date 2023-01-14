package sk.uhliar.backend.sample;

import org.hibernate.dialect.MySQLDialect;

public class CustomMysqlDialect extends MySQLDialect {
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
