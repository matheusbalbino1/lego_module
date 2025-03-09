import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClientSelect } from '../../shared/models/client.model';

export enum IKindClick {
  SELECT = 'select',
  EDIT = 'edit',
  DELETE = 'delete',
  REMOVE = 'remove',
}

@Component({
  selector: 'app-card-client',
  imports: [CommonModule],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss',
})
export class CardClientComponent {
  public enumClickButtons = IKindClick;

  @Output() onClickButtons = new EventEmitter<IKindClick>();
  @Input() clientData!: IClientSelect;
  @Input() isSelectedClientPage = false;

  formatToCurrency(amount: number): string {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
