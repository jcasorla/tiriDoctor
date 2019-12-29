import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../file.service';
import {saveAs} from 'file-saver';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';


const uri = 'http://localhost:8000/api/file/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[FileService]
})
export class UploadComponent implements OnInit {
  @Input() pat : any;
  showlist=false;
  uploader:FileUploader = new FileUploader({url:uri});

  attachmentList:any = [];

  constructor(private _fileService:FileService){

      this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
          this.attachmentList.push(JSON.parse(response));
      }
  }
  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('uid', this.pat._id); //note comma separating key and value
      
     };
  }
  showList(){
    this.showlist=true;
  }
  hideList(){
    this.showlist=false;
  }

  download(index){
      // var filename = this.attachmentList[index].uploadname;
      var filename = this.pat.file[index].filename;
      console.log(filename);

      this._fileService.downloadFile(filename)
      .subscribe(
          data => saveAs(data, filename),
          error => console.error(error)
      );
  }

 

}
