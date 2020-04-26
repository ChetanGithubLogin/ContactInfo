import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contactForm/contactList/contact-list.component';
import { UpdateFormComponent } from './contactForm/updateForm/update-form.component';
import { MegamenuComponent } from './shared/megamenu/megamenu.component';
import { ModalComponent } from './shared/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AddContactComponent } from './contactForm/add-contact/add-contact.component';
import { PhoneMaskDirective } from './contactForm/phone.directive'; 
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// Import your library
import { AlertModule } from 'ngx-alerts';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    UpdateFormComponent,
    MegamenuComponent,
    ModalComponent,
    AddContactComponent, PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, NgxSpinnerModule,DataTablesModule,BrowserAnimationsModule,TooltipModule.forRoot(),
    ModalModule.forRoot(),
    // Specify your library as an import (set timeout to -1 for unlimited timeout,
    // the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
