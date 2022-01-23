package nl.hva.jpa.entity.tableperclass;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Vehicle2 {

    @Id
    private String licensePlate;
    private String owner; // A plain string for the sake of simplicity for this example
    private String manufacturer;
    private String model;

    public Vehicle2() {}

    public Vehicle2(String licensePlate, String owner, String manufacturer, String model) {
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.manufacturer = manufacturer;
        this.model = model;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle2 vehicle2 = (Vehicle2) o;
        return Objects.equals(licensePlate, vehicle2.licensePlate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(licensePlate);
    }
}
