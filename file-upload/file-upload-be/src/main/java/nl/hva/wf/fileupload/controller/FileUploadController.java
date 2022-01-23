package nl.hva.wf.fileupload.controller;

import nl.hva.wf.fileupload.model.UploadFileResponse;
import nl.hva.wf.fileupload.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController

/**
 * Allows uploading files via HTTP
 */
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @PostMapping("/rest/upload")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = storageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

}
