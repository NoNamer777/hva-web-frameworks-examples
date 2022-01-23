package nl.hva.jpa.repository.tableperclass;

import nl.hva.jpa.entity.tableperclass.PassengerVehicle2;
import nl.hva.jpa.entity.tableperclass.Vehicle2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TestVehicleRepository {

    @Autowired
    private Vehicle2Repository<PassengerVehicle2> repo;

    @Test
    void testAddingPassengerVehicle() {


        PassengerVehicle2 created = new PassengerVehicle2("ABC-73-BC","Jur van Oerle","Honda","Civic",5);

        PassengerVehicle2 saved = repo.save(created);

        PassengerVehicle2 retrieved = repo.findByLicensePlate("ABC-73-BC", PassengerVehicle2.class);

        assertEquals(created.getManufacturer(),retrieved.getManufacturer());
        assertEquals(created.getOwner(),retrieved.getOwner());
    }

}
