package nl.hva.jpa.entity.joined;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("C")
public class CommercialVehicle3 extends Vehicle3 {

    private int maximumWGrossWeight;

    public CommercialVehicle3() {}

    public CommercialVehicle3(String licensePlate, String owner, String manufacturer, String model, int maximumWGrossWeight) {
        super(licensePlate, owner, manufacturer, model);
        this.maximumWGrossWeight = maximumWGrossWeight;
    }

    public int getMaximumWGrossWeight() {
        return maximumWGrossWeight;
    }

    public void setMaximumWGrossWeight(int maximumWGrossWeight) {
        this.maximumWGrossWeight = maximumWGrossWeight;
    }

    @Override
    public String toString() {
        return super.toString() + " CommercialVehicle3{" +
                "maximumWGrossWeight=" + maximumWGrossWeight +
                '}';
    }
}
