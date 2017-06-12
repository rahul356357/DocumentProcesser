import { Component,Injectable ,OnInit, Inject, Input, EventEmitter, ViewChild, Output,
trigger,
state,
style,
animate,
transition, OnChanges} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { DomSanitizer} from '@angular/platform-browser';
import {FilesystemService} from '../fileupload/filesystem.service';
@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css'],
  animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class FileViewComponent implements OnInit {
  myfile1="../../assets/test1.pdf";
  myfile2="../../assets/test2.pdf";
  filePathArray : Array<string> = [this.myfile1, this.myfile2];
  filePathArray2 :Array<string>;
  @ViewChild('childModal') public childModal: ModalDirective;

  // Modal properties
    @ViewChild('modal')
    modal: any;
    index: number ;
    uploadedfilename:string;
    fileName: string;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string = 'static';

 viewPDF(index:number){
this.index=1
   this.index = index;
   this.fileName = this.filePathArray[index].split('/')[this.filePathArray[index].split('/').length - 1];
   this.childModal.show();
 }
 viewPDF2()
 {
     
 }
  constructor(public sanitizer: DomSanitizer, private filesystem:FilesystemService) {
  }

  ngOnInit() { 
  this.filesystem.getAllData().subscribe((res)=>{
      this.filePathArray2= res;
      console.log(this.filePathArray2)
  })
    }
    ngOnChanges(){
    this.filesystem.getAllData().subscribe((res)=>{
      this.filePathArray2= res;
      console.log(this.filePathArray2)
  })
    }


}
