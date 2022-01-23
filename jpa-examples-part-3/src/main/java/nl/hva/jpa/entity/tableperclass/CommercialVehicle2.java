package nl.hva.jpa.entity.tableperclass;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
public class CommercialVehicle2 extends Vehicle2 {

    private int maximumGrossWeight;

    public CommercialVehicle2() {}

    public CommercialVehicle2(String licensePlate, String owner, String manufacturer, String model, int maximumWGrossWeight) {
        super(licensePlate, owner, manufacturer, model);
        this.maximumGrossWeight = maximumGrossWeight;
    }

    public int getMaximumWGrossWeight() {
        return maximumGrossWeight;
    }

    public void setMaximumWGrossWeight(int maximumGrossWeight) {
        this.maximumGrossWeight = maximumGrossWeight;
    }
}
