import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  private getContactListUrl = '/people';
  constructor(private http: HttpClient) {}

  getContactList(): Observable<any> {
    return this.http.get(this.getContactListUrl);
  }
  addContact(param): Observable<any> {
    return this.http.post(this.getContactListUrl, param);
  }
  updateContactList(param, id): Observable<any> {
    return this.http.put(this.getContactListUrl + '/' + id , param);
  }
  deleteContactList(id): Observable<any> {
    return this.http.delete(this.getContactListUrl + '/' + id);
  }
}
