import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilemanagerApiService {

  private baseURL = "http://filemanager-api.test/api";

  constructor(private http: HttpClient) { }

  getFiles() {
    return this.http.get(this.baseURL+'/files');
  }

  getFileDetails(id: string) {
    return this.http.get(this.baseURL+'/file/'+id);
  }

  uploadFile(formData: any) {
    return this.http.post(this.baseURL+'/file/upload', formData);
  }

  editFile(formData: any) {
    return this.http.post(this.baseURL+'/file/edit/', formData);
  }
}
