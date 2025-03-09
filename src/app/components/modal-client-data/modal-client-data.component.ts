import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IClient } from '../../shared/models/client.model';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

export enum enTypeModalClientData {
  CREATING = 'creating',
  EDITING = 'editing',
  DELETING = 'deleting',
}

@Component({
  selector: 'app-modal-client-data',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './modal-client-data.component.html',
  styleUrl: './modal-client-data.component.scss',
})
export class ModalClientDataComponent implements OnInit {
  @Input() type!: enTypeModalClientData;
  @Input() clientData!: IClient;
  @Input() messageService!: MessageService;
  @Output() submit = new EventEmitter();

  public enTypeModalClientData = enTypeModalClientData;

  nameModel = '';
  salaryModel: number = 0;
  companyValuationModel: number = 0;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.type === this.enTypeModalClientData.EDITING) {
      this.nameModel = this.clientData.name;
      this.salaryModel = this.clientData.salary;
      this.companyValuationModel = this.clientData.companyValuation;
    }
  }

  showInputs() {
    return [
      this.enTypeModalClientData.EDITING,
      this.enTypeModalClientData.CREATING,
    ].includes(this.type);
  }

  onSave() {
    if (this.showInputs() && !this.isValidInput()) {
      return;
    }

    if (this.type === this.enTypeModalClientData.EDITING) {
      this.submit.emit({
        id: this.clientData.id,
        name: this.nameModel,
        salary: this.salaryModel,
        companyValuation: this.companyValuationModel,
      });
      return;
    }

    if (this.type === this.enTypeModalClientData.DELETING) {
      this.submit.emit({
        id: this.clientData.id,
      });
      return;
    }

    this.submit.emit({
      name: this.nameModel,
      salary: this.salaryModel,
      companyValuation: this.companyValuationModel,
    });
  }

  close() {
    this.activeModal.close();
  }

  getButtonText() {
    if (this.type === this.enTypeModalClientData.EDITING) {
      return 'Editar cliente';
    }
    if (this.type === this.enTypeModalClientData.CREATING) {
      return 'Criar cliente';
    }
    return 'Excluir cliente';
  }

  private isValidInput(): boolean {
    if (!this.nameModel) {
      this.messageService.add({
        severity: 'error',
        summary: 'Nome é obrigatório',
        life: 3000,
      });
      return false;
    }

    if (!this.salaryModel || this.salaryModel < 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Salário não pode ser nulo ou negativo',
        life: 3000,
      });
      return false;
    }

    if (!this.companyValuationModel || this.companyValuationModel < 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'valor da empresa não pode ser nulo ou negativo',
        life: 3000,
      });
      return false;
    }

    return true;
  }
}
