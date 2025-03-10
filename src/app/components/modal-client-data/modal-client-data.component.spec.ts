import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  enTypeModalClientData,
  ModalClientDataComponent,
} from './modal-client-data.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IClient } from '../../shared/models/client.model';

describe('ModalClientDataComponent', () => {
  let component: ModalClientDataComponent;
  let fixture: ComponentFixture<ModalClientDataComponent>;
  let mockActiveModal = jasmine.createSpyObj('NgbActiveModal', [
    'dismiss',
    'close',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalClientDataComponent],
      providers: [{ provide: NgbActiveModal, useValue: mockActiveModal }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalClientDataComponent);
    component = fixture.componentInstance;
    component.clientData = {
      id: 1,
      name: 'John Doe',
      salary: 5000,
      companyValuation: 1000000,
    } as IClient;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize client data when in EDITING mode', () => {
    component.type = enTypeModalClientData.EDITING;
    component.ngOnInit();

    expect(component.nameModel).toBe('John Doe');
    expect(component.salaryModel).toBe(5000);
    expect(component.companyValuationModel).toBe(1000000);
  });

  it('should return true for showInputs() when in EDITING or CREATING mode', () => {
    component.type = enTypeModalClientData.EDITING;
    expect(component.showInputs()).toBeTrue();

    component.type = enTypeModalClientData.CREATING;
    expect(component.showInputs()).toBeTrue();
  });

  it('should return false for showInputs() when in DELETING mode', () => {
    component.type = enTypeModalClientData.DELETING;
    expect(component.showInputs()).toBeFalse();
  });

  it('should close the modal when close() is called', () => {
    component.close();
    expect(mockActiveModal.close).toHaveBeenCalled();
  });
});
