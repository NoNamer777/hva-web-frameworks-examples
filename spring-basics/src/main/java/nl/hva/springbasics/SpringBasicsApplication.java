package nl.hva.springbasics;

import nl.hva.springbasics.binarysearch.BinarySearch;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import java.util.Random;

@SpringBootApplication
public class SpringBasicsApplication {

    public static final int LENGTH = 50000;
    public static final int SEED = 20191023;
    public static final int SEARCH_KEY = 50;

    public static void main(String[] args) {

        // Getting the Spring Context Object
        ApplicationContext context = SpringApplication.run(SpringBasicsApplication.class, args);

        // Getting the binary search object from Spring
        BinarySearch binarySearch = context.getBean(BinarySearch.class);

        // Generating a random array
        int[] array = generateRandomArray();

        // computing starting time in ms
        long start = System.currentTimeMillis();

        // Executing the binary search
        int position = binarySearch.search(array,SEARCH_KEY);

        System.out.println("position: " + position +
                " it took " + (System.currentTimeMillis() - start) + " ms" +
                " to find the search key");

    }

    private static int[] generateRandomArray() {

        // Generating a random object with a predefined seed
        // will always generate the same sequence of random numbers
        Random r = new Random(SEED);

        int [] array = new int[LENGTH];

        for(int i=0;i<array.length;i++){
            array[i] = r.nextInt(LENGTH);
        }
        return array;
    }

}
