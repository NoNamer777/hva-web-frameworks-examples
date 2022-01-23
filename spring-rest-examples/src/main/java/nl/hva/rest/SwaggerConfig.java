package nl.hva.rest;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        // @formatter:off
        //Register the controllers to swagger
        //Also it is configuring the Swagger Docket
        return new Docket(DocumentationType.SWAGGER_2).select()
                // .apis(RequestHandlerSelectors.any())
                .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
                // .paths(PathSelectors.any())
                // .paths(PathSelectors.ant("/swagger2-demo"))
                .build();
        // @formatter:on
    }

//    public static final ApiInfo API_INFO = new ApiInfo(
//            "Web Frameworks Examples - API documentation",
//            "API documentation",
//            "1.0",
//            "urn:tos",
//            "Contact",
//            "Apache 2.0",
//            "http://www.apache.org/licenses/LICENSE-2.0");
//    public static final Set<String> PRODUCES_AND_CONSUMES = new HashSet<>(Arrays.asList("application/json"));
//
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2).apiInfo(API_INFO).produces(PRODUCES_AND_CONSUMES).consumes(PRODUCES_AND_CONSUMES);
//    }

}
