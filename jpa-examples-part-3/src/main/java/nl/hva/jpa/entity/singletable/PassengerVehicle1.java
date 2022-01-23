package nl.hva.jpa.entity.singletable;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("P")
public class PassengerVehicle1 extends Vehicle1 {

    private int numberOfPassengers;

    public PassengerVehicle1() {}

    public PassengerVehicle1(String licensePlate, String owner, String manufacturer, String model, int numberOfPassengers) {
        super(licensePlate, owner, manufacturer, model);
        this.numberOfPassengers = numberOfPassengers;
    }

    public int getNumberOfPassengers() {
        return numberOfPassengers;
    }

    public void setNumberOfPassengers(int numberOfPassengers) {
        this.numberOfPassengers = numberOfPassengers;
    }
}
