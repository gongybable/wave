import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../services/http.service';
import { PayRoll, UploadRes } from '../models/data.model';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // variable holds the report data returned from API
  public payroll: PayRoll[] = [];
  // variable indicates an file is uploaded or not
  public uploaded: boolean = false;
  // variable indicates error in the api
  public appError: boolean = false;
  // variable indicates file upload has a duplicate reportId or not
  public duplicateFile: boolean = false;

  constructor( private service: HttpClient ) { }

  public ngOnInit() {
    // try to get the payroll reports on initialization
    this.getData();
  }

  // function to upload the file
  public onChange(event: any) {
    let file = event.srcElement.files;

    if (file.length) {
      this.duplicateFile = false;
      this.uploaded = false;

      this.service.uploadFile(file).subscribe((res: UploadRes) => {
        if (res.duplicateReportId) {
          this.duplicateFile = true;
        } else {
          this.uploaded = true;
          this.getData();
        }
      }, (err: any) => {
        this.appError = true;
      });
    }

  }

  public close(trigger: boolean) {
    this.uploaded = false;
  }

  // function to get payroll data
  private getData() {
    this.service.getReport().subscribe((data: PayRoll[]) => {
      this.appError = false;
      this.payroll = data;
    }, (err: any) => {
      this.appError = true;
    });
  }
}