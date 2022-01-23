package nl.hva.jpa.entity.singletable;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("C")
public class CommercialVehicle1 extends Vehicle1 {

    private int maximumWGrossWeight;

    public CommercialVehicle1() {}

    public CommercialVehicle1(String licensePlate, String owner, String manufacturer, String model, int maximumWGrossWeight) {
        super(licensePlate, owner, manufacturer, model);
        this.maximumWGrossWeight = maximumWGrossWeight;
    }

    public int getMaximumWGrossWeight() {
        return maximumWGrossWeight;
    }

    public void setMaximumWGrossWeight(int maximumWGrossWeight) {
        this.maximumWGrossWeight = maximumWGrossWeight;
    }
}
