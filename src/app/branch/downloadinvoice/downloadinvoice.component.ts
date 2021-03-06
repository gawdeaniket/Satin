import { Component, OnInit } from '@angular/core';
import {DownloadInvoiceService} from '../../services/branch/download-invoice.service';
import {Router} from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-downloadinvoice',
  templateUrl: './downloadinvoice.component.html',
  styleUrls: ['./downloadinvoice.component.scss']
})
export class DownloadinvoiceComponent implements OnInit {
  public InvoiceRecords:any[] = [];
  received_startDate:any;
  received_endDate:any;
  received_datefiltercheck:any;
  order: string = 'invoice_id';
  reverse: boolean = false;
  receivedSearchText:any;
  p:number = 1;
  minDate1:any;
  maxDate1;any;
  minDate2:any;
  maxDate2:any;
  loaders:boolean = true;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private download_service:DownloadInvoiceService,
              private _router:Router) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange',showWeekNumbers: false });
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
    }
    if(logininfo.role != 'BRANCH'){
      this._router.navigate(['home']);
    }
  }
  dateset(){
    this.minDate2 = this.received_startDate;
  }
  datesetend($event){
    this.maxDate1 = this.received_endDate;
  }
  ngOnInit() {
    this.minDate1 = new Date();
    this.maxDate1 = new Date();
    this.maxDate2 = new Date();
    this.maxDate1.setDate(this.maxDate1.getDate() );
    this.maxDate2.setDate(this.maxDate1.getDate() );
    this.download_service.downloadInvoice().then((data:any)=>{
      if(!data){
        this.loaders = false;
      }
      this.InvoiceRecords = data;
      for(let i=0;i<data.length;i++){
        this.InvoiceRecords[i].invoice_id = data[i].invoice_id;
        this.InvoiceRecords[i].customer_address = data[i].address;
        this.InvoiceRecords[i].customer_name = data[i].name;
        this.InvoiceRecords[i].customer_phone = data[i].phone_number;
        this.InvoiceRecords[i].disbursal_date = data[i].disbursal_date;
        this.InvoiceRecords[i].status = data[i].status;
        this.InvoiceRecords[i].invoice_url = data[i].invoice_url;
        this.InvoiceRecords[i].product_name = data[i].product_name;
        this.InvoiceRecords[i].received_date = data[i].received_date;
        this.InvoiceRecords[i].selected = false;
        this.InvoiceRecords[i].dateformat_disbursal = data[i].disbursal_date.match(/\d+/g).reverse().join('-');
        this.InvoiceRecords[i].dateformat_received = data[i].received_date.match(/\d+/g).reverse().join('-');
        if(i == data.length -1 ){
          this.loaders = false;
        }
      }
    }).catch((error)=>{
      this.loaders = false;
    })
  }
  clearDate(){
    this.received_startDate = '';
    this.received_endDate = '';
  }
  Selected(event,i){
    this.InvoiceRecords[i].selected = !this.InvoiceRecords[i].selected;
  }
  DateFilter(){
     if(this.received_startDate && this.received_endDate){
      this.received_datefiltercheck = true;
    }
    else{
      alert("please Enter Valid StartDate and EndDate ");
    }
  }

  selectall(){
    for(let i = 0 ;i<this.InvoiceRecords.length;i++){
      this.InvoiceRecords[i].selected = true;
    }
  }

  clearall(){
    for(let i = 0 ;i<this.InvoiceRecords.length;i++){
      this.InvoiceRecords[i].selected = false;
    }
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    if(this.reverse){
    this.InvoiceRecords.sort(function(a, b){
    var x =  a[value].toLowerCase()  ;
    var y = b[value].toLowerCase()  ;
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
    });
  }else {
    this.InvoiceRecords.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });
  }
    this.order = value;
  }
  // downloadinvoice(index){
  //   var markItem:any[] = []
  //   for(let i=0; i<this.InvoiceRecords.length;i++){
  //     if(this.InvoiceRecords[i].selected){
  //       markItem.push(this.InvoiceRecords[i].invoice_url);
  //     }
  //     if(i === this.InvoiceRecords.length-1){
  //       let thefile = {};
  //       thefile = new Blob(markItem, { type: 'application/octet-stream' });
  //       let url = window.URL.createObjectURL(thefile);
  //       window.open(url);
  //     }
  //   }
  // }
}


