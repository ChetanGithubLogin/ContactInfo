import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ContactServiceService} from '../contact-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.sass']
})
export class UpdateFormComponent implements OnInit, OnChanges {

  @Input() dataToModify = null;
  @Output() hideMod = new EventEmitter();
  editcontactForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
              private contactService: ContactServiceService, private spinner: NgxSpinnerService) {
      this.editcontactForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        status: [false],
        phone: ['', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/), Validators.required]]
      });
    }

    ngOnChanges(changes: SimpleChanges) {
          this.formInit();
    }

  ngOnInit(): void {
  }
  formInit() {
    this.editcontactForm.patchValue({
        firstName: this.dataToModify.firstName,
        lastName: this.dataToModify.lastName,
        email: this.dataToModify.emailAddress,
        confirmEmail: this.dataToModify.confirmEmail,
        status: this.dataToModify.status,
        phone: this.dataToModify.phoneNumber
    });
  }
  get f() { return this.editcontactForm.controls; }
  get isEmailMismatch() { return this.editcontactForm.getError('emailMismatch'); }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.editcontactForm.invalid) {
            return;
        }
        // display form values on success
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));
        if (this.editcontactForm.valid){
          this.spinner.show();
          const param = {
            firstName: this.editcontactForm.controls.firstName.value,
            lastName: this.editcontactForm.controls.lastName.value,
            phoneNumber: this.editcontactForm.controls.phone.value,
            emailAddress: this.editcontactForm.controls.email.value,
            status: this.editcontactForm.controls.status.value,
          };
          this.contactService.updateContactList(param , this.dataToModify.id).subscribe((res) => {
            console.log(res);
            // to demostrate data is saved to actual db
            setTimeout(() => {
              this.spinner.hide();
              this.editModal();
            }, 5000);
          }, error => {
            console.log(error);
            this.spinner.hide();
          });
      }
    }

    onCancel() {
        this.submitted = false;
        this.editcontactForm.patchValue({
          firstName: this.dataToModify.firstName,
          lastName: this.dataToModify.lastName,
          email: this.dataToModify.emailAddress,
          status: this.dataToModify.status,
          phone: this.dataToModify.phoneNumber
      });
    }
    editModal(){
      this.hideMod.emit(true);
    }

}
