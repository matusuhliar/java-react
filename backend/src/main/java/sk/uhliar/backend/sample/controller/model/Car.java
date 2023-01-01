package sk.uhliar.backend.sample.controller.model;

public class Car {
    private String name;
    private Integer id;

    public Car(Integer id,String name) {
        this.name = name;
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    
}
