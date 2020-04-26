import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from '../../contactForm/contactList/contact-list.component';
import { UpdateFormComponent } from '../../contactForm/updateForm/update-form.component';

@Component({
  selector: 'app-megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.sass']
})
export class MegamenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
