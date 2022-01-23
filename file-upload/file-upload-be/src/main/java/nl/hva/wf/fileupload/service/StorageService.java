package nl.hva.wf.fileupload.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * An example of a storage service that just saves the file in the local file system.
 * It can be rewritten, to connect to other storage solutions
 */
@Service
public class StorageService {

    // pointing to the folder that will store the file
    private static final String storageLocation = "/tmp/storage";

    private Path fileStorageLocationObject;

    public StorageService() {
        this.fileStorageLocationObject = Paths.get(storageLocation).toAbsolutePath().normalize();
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocationObject.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new StorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }


}
