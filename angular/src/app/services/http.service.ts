import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpClient {

  private endpoint: string;
  private options: RequestOptions;

  constructor(private http: Http) {
    this.endpoint = 'http://0.0.0.0:8000/api/';
    this.options = new RequestOptions(new Headers());
  }

  // function to send http request to get payroll report
  public getReport(): Observable<any> {
    return this.get(this.endpoint + 'report', this.options);
  }

  // function to send http request to upload file
  public uploadFile(files: File[]): Observable<any> {
    let formData:FormData = new FormData();

    formData.append('file', files[0], files[0].name);

    return this.post(this.endpoint + 'upload', formData, this.options);
  }

  // function to send http get request
  private get(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(url, options)
      .map(this.parseResponse)
      .catch(this.handleError);
  }

  // function to send http post request
  private post(url: string, params: {}, options?: RequestOptions): Observable<any> {
    return this.http.post(url, params, options)
      .map(this.parseResponse)
      .catch(this.handleError);
  }

  // response parser
  private parseResponse(resp: Response) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp.json();
    }

    const errMsg = `${resp.status} - ${resp.statusText}`;
    throw new Error(errMsg);
  }

  // error handler
  private handleError(error: Error) {
    const errMsg = error.message ? error.message : error.toString();
    return Observable.throw(errMsg);
  }
}