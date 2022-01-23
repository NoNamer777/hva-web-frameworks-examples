package nl.hva.rest.entity;

public class HelloWorldBean {

    private String greeting;

    public HelloWorldBean(String greeting) {
        this.greeting = greeting;
    }

    public String getGreeting() {
        return this.greeting;
    }
}
