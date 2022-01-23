package nl.hva.jpa.entity.joined;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("P")
public class PassengerVehicle3 extends Vehicle3 {

    private int numberOfPassengers;

    public PassengerVehicle3() {}

    public PassengerVehicle3(String licensePlate, String owner, String manufacturer, String model, int numberOfPassengers) {
        super(licensePlate, owner, manufacturer, model);
        this.numberOfPassengers = numberOfPassengers;
    }

    public int getNumberOfPassengers() {
        return numberOfPassengers;
    }

    public void setNumberOfPassengers(int numberOfPassengers) {
        this.numberOfPassengers = numberOfPassengers;
    }

    @Override
    public String toString() {
        return super.toString() + " PassengerVehicle3{" +
                "numberOfPassengers=" + numberOfPassengers +
                '}';
    }
}
