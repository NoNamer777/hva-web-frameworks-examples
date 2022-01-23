##  File Upload Example - Back-end part
This project aims at explaining how to implement a file upload solution for the backend layer.

### Notes

This is a Spring Boot application. To run it you should invoke the main method of the `nl.hva.wf.fileupload.FileUploadBeApplication` class. It will start a tomcat server running on port 8080.

To test if the upload feature is working properly, you can send a POST request to the address `localhost:8080/rest/upload`, by specifying a multipart form-data format, with key with name file and type file.

The application is prepared to upload files with a maximum of 300mb. Settings can be changed in `src/main/resources/application.properties`

Files are stored in the folder `/tmp`. You can change the path in the class `nl.hva.wf.fileupload.service.StorageService`.