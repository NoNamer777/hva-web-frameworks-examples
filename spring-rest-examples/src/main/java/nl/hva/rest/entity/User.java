package nl.hva.rest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.Objects;

@ApiModel(description = "Information about users")
public class User {

    @JsonView(UserView.OnlyUserIdAndName.class)
    private Integer id;

    @JsonView(UserView.OnlyUserIdAndName.class)
    private String name;

    @ApiModelProperty(notes = "Birth date cannot be in the past")
    @JsonView(UserView.OnlyBsnAndBirthDate.class)
    private Date birthDate;

    @JsonView(UserView.OnlyBsnAndBirthDate.class)
    private Integer bsn;

    @JsonIgnore
    private String passwordHash;

    public User() {}

    public User(Integer id, Integer bsn, String name, Date birthDate) {
        setId(id);
        setBsn(bsn);
        setName(name);
        setBirthDate(birthDate);
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getBsn() {
        return bsn;
    }

    public void setBsn(Integer bsn) {
        this.bsn = bsn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public static class UserView {

        public static class OnlyUserIdAndName {}
        public static class OnlyBsnAndBirthDate{}
    }

}


