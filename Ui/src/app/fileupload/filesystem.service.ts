import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {AuthenticationService} from '../authentication.service';
import {Filename} from './filename.model';
@Injectable()
export class FilesystemService {
  constructor(private http : Http, private authservice : AuthenticationService) {}
  getAllData():Observable<any>{ 
    return this.http.get(`http://localhost:3000/api/files?token=` + this.authservice.getToken())
    .map((res:Response)=>{
      console.log(res.json().files)
      return res.json().files;
    })
  }

}
