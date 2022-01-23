package nl.hva.jpa.entity.tableperclass;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
public class PassengerVehicle2 extends Vehicle2 {

    private int numberOfPassengers;

    public PassengerVehicle2() {}

    public PassengerVehicle2(String licensePlate, String owner, String manufacturer, String model, int numberOfPassengers) {
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
