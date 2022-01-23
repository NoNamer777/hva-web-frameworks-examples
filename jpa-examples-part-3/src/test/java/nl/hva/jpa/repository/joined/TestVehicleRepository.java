package nl.hva.jpa.repository.joined;

import nl.hva.jpa.entity.joined.CommercialVehicle3;
import nl.hva.jpa.entity.joined.PassengerVehicle3;
import nl.hva.jpa.entity.joined.Vehicle3;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TestVehicleRepository {

    @Autowired
    private Vehicle3Repository<PassengerVehicle3> repo;

    @Autowired
    private Vehicle3Repository<Vehicle3> repoVehicle;


    @Test
    @DirtiesContext
    void testAddingPassengerVehicle() {


        PassengerVehicle3 created = new PassengerVehicle3("ABC-73-BC","Jur van Oerle","Honda","Civic",5);

        PassengerVehicle3 saved = repo.save(created);

        PassengerVehicle3 retrieved = repo.findByLicensePlate("ABC-73-BC", PassengerVehicle3.class);

        assertEquals(created.getManufacturer(),retrieved.getManufacturer());
        assertEquals(created.getOwner(),retrieved.getOwner());
    }

    @Test
    @DirtiesContext
    void testQueryAll() {

        Vehicle3 v1 = repoVehicle.save(new PassengerVehicle3("ABC-73-BC","Jur van Oerle","Honda","Civic",5));
        Vehicle3 v2 = repoVehicle.save(new CommercialVehicle3("ZHD-22-AK","John Somers","Man","TGE",3500));

        List<Vehicle3> vehicles = repoVehicle.findAll(Vehicle3.class);

        System.out.println(vehicles);

        assertEquals(vehicles.size(),2);

    }

}
