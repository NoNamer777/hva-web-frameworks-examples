import { Component, OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  percentCompleted = 0;
  isUploaded = false;
  fileName = '';
  fileType = '';

  ngOnInit(): void {}

  constructor(private fuService: FileUploadService) {}

  upload(files: File[]) {
    const file = files[0];
    console.log(file.name);
    this.isUploaded = false;
    this.fileName = '';
    this.fileType = '';

    const formData = new FormData();
    formData.append('file', file);
    this.fuService.uploadWithProgress(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.isUploaded = true;
          this.fileName = event.body.fileName;
          this.fileType = event.body.fileType;
        }
      });
  }
}
