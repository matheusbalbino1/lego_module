import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import {
  enTypeModalClientData,
  ModalClientDataComponent,
} from './components/modal-client-data/modal-client-data.component';
import { CardClientComponent } from './components/card-client/card-client.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IClient } from './shared/models/client.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    ButtonComponent,
    InputComponent,
    ModalClientDataComponent,
    CardClientComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lego_module';

  client: IClient = {
    id: 1,
    companyValuation: 21312,
    name: 'Nome testee',
    salary: 999,
  };

  constructor(
    private ngbModal: NgbModal,
    private messageService: MessageService
  ) {}

  openModalCreating() {
    const modalRef = this.ngbModal.open(ModalClientDataComponent);
    const modalInstanceRef = modalRef.componentInstance;

    modalInstanceRef.type = enTypeModalClientData.CREATING;
    modalInstanceRef.messageService = this.messageService;
    modalInstanceRef.submit.subscribe(() => {
      modalRef.dismiss();
    });
  }

  openModalEditing() {
    const modalRef = this.ngbModal.open(ModalClientDataComponent);
    const modalInstanceRef = modalRef.componentInstance;

    modalInstanceRef.type = enTypeModalClientData.EDITING;
    modalInstanceRef.clientData = this.client;
    modalInstanceRef.messageService = this.messageService;
    modalInstanceRef.submit.subscribe(() => {
      modalRef.dismiss();
    });
  }

  openModalDeleting() {
    const modalRef = this.ngbModal.open(ModalClientDataComponent);
    const modalInstanceRef = modalRef.componentInstance;

    modalInstanceRef.type = enTypeModalClientData.DELETING;
    modalInstanceRef.clientData = this.client;
    modalInstanceRef.messageService = this.messageService;
    modalInstanceRef.submit.subscribe(() => {
      modalRef.dismiss();
    });
  }
}
