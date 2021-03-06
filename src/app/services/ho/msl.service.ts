import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import {EnvironmentService} from '../environment/environment.service'

@Injectable({
  providedIn: 'root'
})
export class MslService {
  commonValue:any ;
  constructor(private httpClient: HttpClient,private envir: EnvironmentService) {
    this.commonValue =  this.envir.globalvalue();
   }   
   getList(){
    this.commonValue =  this.envir.globalvalue();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/msl/'+this.commonValue.client_id,  { headers: headers })
      .subscribe((data)=>{
        resolve(data);
      })
    })
   }
   PostList(uploadData){
    const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/msl/'+this.commonValue.client_id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.httpClient.put(endpoint,  uploadData,{ headers: headers })
      .subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
        reject(error);
      })
    })
   }
   uploadApprove(fileToUpload){
    this.commonValue =  this.envir.globalvalue();
    const formData: FormData = new FormData();
    let endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-msl-file/'+this.commonValue.client_id+"?is_validated=false";
    formData.append('msl-file', fileToUpload);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.httpClient.put(endpoint, formData, { headers: headers })
      .subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
         reject(error);
      })
    })
  }
  Approvefile(fileToUpload){
    this.commonValue =  this.envir.globalvalue();
    const formData: FormData = new FormData();
    let endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-msl-file/'+this.commonValue.client_id+'?is_validated=true';
    formData.append('msl-file', fileToUpload);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {    
      this.httpClient.put(endpoint, formData, { headers: headers })
      .subscribe((data)=>{
        resolve(data);
      },
      (error)=>{ 
        reject(error);
      })
    })
  }
}
