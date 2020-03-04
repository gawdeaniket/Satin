import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { 
    //this.globalvalue();
  }

  globalvalue(){
     var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
     logininfo.endpoint = 'http://13.234.13.58:7777/';
     return logininfo;
  }

}
