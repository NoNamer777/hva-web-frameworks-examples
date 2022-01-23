package nl.hva.springbasics.binarysearch;

import nl.hva.springbasics.sort.SortAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BinarySearch {

    @Autowired
    private SortAlgorithm sortAlgorithm;

    /**
     * This example injects the sort algorithm via constructor.
     * It is also possible injecting the object via setter
     * @param sortAlgorithm
     */
    public BinarySearch(SortAlgorithm sortAlgorithm) {
        this.sortAlgorithm = sortAlgorithm;
    }

    public int search(int[] array, int key) {

        sortAlgorithm.sort(array);

        return search(array,0,array.length - 1, key);
    }

    public int search(int [] sortedArray, int low, int high, int key) {

        if(high < low)
            return -1;

        int middle = (low + high) / 2;

        if(key == sortedArray[middle]) {
            return middle;
        } else if(key < sortedArray[middle]) {
            return search(sortedArray,0,middle -1, key);
        } else {
            return search(sortedArray,middle + 1, high, key);
        }

    }

}
