import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BranchUploadInvoiceService} from '../app/services/branch/branch-upload-invoice.service';
import {JsonToCsvService} from './services/jsonToCsv/json-to-csv.service';
import { ErrorComponent } from './error/error.component';
import { ExcelService } from './services/excel.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
     BrowserAnimationsModule,
     DeviceDetectorModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
     ReactiveFormsModule, 
     NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      fullScreenBackdrop: true,
      backdropBorderRadius: '4px',
      primaryColour: '#fcdb04',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  exports:[
  ],
  providers: [
    BranchUploadInvoiceService,
     ExcelService,
    JsonToCsvService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
