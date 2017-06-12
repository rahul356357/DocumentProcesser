import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import {FilesystemService} from '../fileupload/filesystem.service'
@Component({
  selector: 'app-fileupload2',
  templateUrl: './fileupload2.component.html',
  styleUrls: ['./fileupload2.component.css']
})
export class Fileupload2Component implements OnInit {

 public uploader : FileUploader = new FileUploader({
    url: `http://localhost:3000/api/files?token=` + this
      .authService
      .getToken(),
      autoUpload:true,
      removeAfterUpload:true,
      authTokenHeader:"x-access-token",
      authToken:this.authService.getToken()
  })

  constructor(private authService : AuthenticationService ,private filesystem:FilesystemService ) {

    this.uploader.onCompleteItem = (item : any, response :any, status : any, headers : any) => {
      this.filesystem.getAllData().subscribe((res) =>{
});
    };
  }
  ngOnInit() {
  }
delete(item){
console.log(item);

}
}
