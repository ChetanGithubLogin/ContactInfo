import { Component, TemplateRef, OnInit, ViewChild, Input, Output , EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  @Input() title: string;
  messages: string[];
  constructor() {}

  ngOnInit(){}
  showModal() {
    this.messages = [];
    this.modal.show();
  }
  hideModal() {
    this.messages = [];
    this.modal.hide();
  }
  handler(type: string, $event: ModalDirective) {
    this.messages.push(
      `event ${type} is fired${$event.dismissReason
        ? ', dismissed by ' + $event.dismissReason
        : ''}`
    );
  }
}
