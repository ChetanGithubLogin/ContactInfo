import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ContactServiceService } from '../contact-service.service';
import { Subject } from 'rxjs';
import { Person } from './../personModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DataTableDirective } from 'angular-datatables';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @ViewChild('testModal', { static: false }) testModal: ModalComponent;
  @ViewChild('deleteModal', { static: false }) deleteModal: ModalComponent;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  title = 'Modify Details';
  datatoSend = null;
  deleteId = null;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private contactService: ContactServiceService,
    private spinner: NgxSpinnerService, private chref: ChangeDetectorRef,private alertService: AlertService) { }

  ngOnInit(): void {
    // setting up dtOption
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      responsive: true
    };
    this.getContactList();
  }

  // get table data from DB.json file
  getContactList() {
    this.spinner.show();
    this.contactService.getContactList().subscribe((data) => {
      console.log(data);
      this.persons = data;
      // initilizing change detection
      this.chref.detectChanges();
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      // adding setTimeout to create server resp sitution 
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);

    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  // calling Edit Popup;
  editRow(obj) {
    console.log(this.testModal);
    this.datatoSend = null;
    this.datatoSend = JSON.parse(JSON.stringify(obj));
    this.testModal.showModal();
  }
  // calling delete Popup;
  deleteRow(id) {
    this.deleteId = id;
    this.deleteModal.showModal();
  }


  // delete YES button click handler
  yesClick(e) {
    console.log(e);
    this.spinner.show();
    this.contactService.deleteContactList(this.deleteId).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.beforeRerender();
      this.deleteModal.hideModal();
      this.alertService.success('Data deleted successfully.');

    }, error => {
      console.log(error);
      this.spinner.hide();
      this.deleteModal.hideModal();
      this.alertService.danger('Something went wrong');
    });

  }
  // delete No button click handler
  noClick() {
    this.deleteId = null;
    this.deleteModal.hideModal();
  }
  // @output property handler
  hideEditModal(e) {
    this.testModal.hideModal();
    this.beforeRerender();
    this.alertService.success('Data updated successfully.');
  }
  // re render table once the data changed by user action 
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  // before render call the get method
  beforeRerender() {
    this.contactService.getContactList().subscribe((data) => {
      console.log(data);
      this.persons = data;
      this.rerender();
    }, error => {
      console.log(error);
    });
  }
}
