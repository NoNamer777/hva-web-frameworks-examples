package nl.hva.jpa.repository.singletable;

import nl.hva.jpa.entity.singletable.PassengerVehicle1;
import nl.hva.jpa.entity.singletable.Vehicle1;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TestVehicleRepository {

    @Autowired
    private Vehicle1Repository<PassengerVehicle1> repo;

    @Test
    void testAddingPassengerVehicle() {


        PassengerVehicle1 created = new PassengerVehicle1("ABC-73-BC","Jur van Oerle","Honda","Civic",5);

        PassengerVehicle1 saved = repo.save(created);

        PassengerVehicle1 retrieved = repo.findByLicensePlate("ABC-73-BC",PassengerVehicle1.class);

        assertEquals(created.getManufacturer(),retrieved.getManufacturer());
        assertEquals(created.getOwner(),retrieved.getOwner());
    }

}
