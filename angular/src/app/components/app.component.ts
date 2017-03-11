import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../services/http.service';
import { PayRoll, UploadRes } from '../models/data.model';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public payroll: PayRoll[] = [];
  public uploaded: boolean = false;
  public appError: boolean = false;
  public duplicateFile: boolean = false;

  constructor( private service: HttpClient ) { }

  public ngOnInit() {
    this.getData();
  }

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

  private getData() {
    this.service.getReport().subscribe((data: PayRoll[]) => {
      this.appError = false;
      this.payroll = data;
    }, (err: any) => {
      this.appError = true;
    });
  }
}