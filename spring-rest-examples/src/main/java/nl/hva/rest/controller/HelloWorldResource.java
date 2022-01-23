package nl.hva.rest.controller;

import nl.hva.rest.entity.HelloWorldBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldResource {

    @GetMapping("/rest/*")
    public String sayHello() {
        return "Hello World";
    }

    @GetMapping("/rest/hello-bean")
    public HelloWorldBean sayHelloBean() {
        return new HelloWorldBean("Hello World");
    }

    @GetMapping("/rest/hello-with-params/{name}")
    public HelloWorldBean sayHelloBeanWithParams(@PathVariable String name) {
        return new HelloWorldBean("Hello " + name);
    }
}
