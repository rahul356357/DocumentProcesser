import {Component, OnInit, OnDestroy} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import {FilesystemService} from './filesystem.service'
import {Filename} from './filename.model';
@Component({selector: 'app-fileupload2', templateUrl: './fileupload.component.html', styleUrls: ['./fileupload.component.css']})
export class FileuploadComponent implements OnInit {
  public select : boolean;
  public checked : boolean;
  public token : string;
  public filename:Array<Object>;
  public selectedarray=[];

  public uploader : FileUploader = new FileUploader({
    url: `http://localhost:3000/api/files?token=` + this
      .authService
      .getToken(),
      autoUpload:true,
      authTokenHeader:"x-access-token",
      authToken:this.authService.getToken()
  })
  constructor(private authService : AuthenticationService ,private filesystem:FilesystemService ) {
    this.uploader.autoUpload.true;
    this.uploader.onCompleteItem = (item : any, response :any, status : any, headers : any) => {
      this.filesystem.getAllData().subscribe((res) =>{
     this.filename = res });
    };
  }

  ngOnInit() { 
   this.filesystem.getAllData().subscribe((res) =>{
     console.log(res)
     this.filename = res
});

  }

  selectAll(event) {
    console.log(event.target.checked + "select")
    this.select = !this.select
    this.checked = true;
    console.log(this.select)
    return this.select;
  }

  clicked(event, item) {
    console.log(event.target.checked + "checked")
    this.checked = false
    console.log(item)
    this.selectedarray.push(item._id);
    console.log(this.selectedarray)
  }

  notInitiated(item) {
    if (item.progress == 0) {
      return true
    } else 
      return false;
    }
  
  between(item) {
    if (item.progress > 0 && item.progress < 99) {
      return true
    } else 
      return false;
    }
  completed(item) {
    if (item.progress == 100) {
      return true
    } else {
      return false
    }
  }

}