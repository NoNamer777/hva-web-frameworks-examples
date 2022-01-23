package nl.hva.wf.fileupload.service;

import java.io.IOException;

public class StorageException extends RuntimeException {
    public StorageException(String s, IOException ex) {
    }
}
