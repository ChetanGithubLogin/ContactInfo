import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ContactServiceService} from '../contact-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.sass'],
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private contactService: ContactServiceService,
              private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
  }
  formInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      status: [false],
      phone: ['', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/), Validators.required]]
    },{
      validator: (form:FormGroup) => form.get('email').value !== form.get('confirmEmail').value ?
        { emailMismatch: true } : null
    });
  }
  get f() { return this.contactForm.controls; }
  get isEmailMismatch() { return this.contactForm.getError('emailMismatch')}

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }
        // display form values on success
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));
        if(this.contactForm.valid){
          this.spinner.show();
          const param = {
            id: Math.random() + 1,
            firstName: this.contactForm.controls.firstName.value,
            lastName: this.contactForm.controls.lastName.value,
            phoneNumber: this.contactForm.controls.phone.value,
            emailAddress: this.contactForm.controls.email.value,
            status: this.contactForm.controls.status.value,
          };
          this.contactService.addContact(param).subscribe((res) => {
            console.log(res);
            // to demostrate data is saved to actual db
            setTimeout(() => {
              this.spinner.hide();
              this.router.navigate(['/home']);
            }, 5000);
          }, error => {
            console.log(error);
            this.spinner.hide();
          })
      }
    }

    onReset() {
        this.submitted = false;
        this.contactForm.reset();
    }
}


