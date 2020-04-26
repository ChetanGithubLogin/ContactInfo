import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contactForm/contactList/contact-list.component';
import { UpdateFormComponent } from './contactForm/updateForm/update-form.component';
import {AddContactComponent} from './contactForm/add-contact/add-contact.component'


const routes: Routes = [
    { path: 'home',
      component: ContactListComponent
    },
    { path: 'addOrModify',
      component: AddContactComponent
    },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
