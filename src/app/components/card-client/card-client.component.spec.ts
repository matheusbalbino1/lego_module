import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClientComponent, IKindClick } from './card-client.component';
import { IClientSelect } from '../../shared/models/client.model';

describe('CardClientComponent', () => {
  let component: CardClientComponent;
  let fixture: ComponentFixture<CardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardClientComponent);
    component = fixture.componentInstance;
    component.clientData = {
      name: 'John Doe',
      salary: 5000,
      companyValuation: 1000000,
      selected: false,
    } as IClientSelect;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly format salary and company valuation', () => {
    expect(component.formatToCurrency(5000).replace(/\s/g, ' ')).toBe(
      'R$ 5.000,00'
    );
    expect(component.formatToCurrency(1000000).replace(/\s/g, ' ')).toBe(
      'R$ 1.000.000,00'
    );
  });

  it('should display client name correctly', () => {
    const nameElement: HTMLElement =
      fixture.nativeElement.querySelector('.name strong');
    expect(nameElement.textContent).toContain('John Doe');
  });

  it('should emit SELECT event when clicking the select button', () => {
    spyOn(component.onClickButtons, 'emit');

    const selectButton: HTMLElement = fixture.nativeElement.querySelector(
      'button:nth-child(1)'
    );
    if (selectButton) {
      selectButton.click();
      expect(component.onClickButtons.emit).toHaveBeenCalledWith(
        IKindClick.SELECT
      );
    }
  });

  it('should emit REMOVE event when clicking the remove button if client is selected', () => {
    spyOn(component.onClickButtons, 'emit');

    component.clientData.selected = true;
    fixture.detectChanges();

    const removeButton: HTMLElement = fixture.nativeElement.querySelector(
      'button:nth-child(1)'
    );
    if (removeButton) {
      removeButton.click();
      expect(component.onClickButtons.emit).toHaveBeenCalledWith(
        IKindClick.REMOVE
      );
    }
  });

  it('should emit EDIT event when clicking the edit button', () => {
    spyOn(component.onClickButtons, 'emit');

    const editButton: HTMLElement = fixture.nativeElement.querySelector(
      'button:nth-child(2)'
    );
    if (editButton) {
      editButton.click();
      console.log('####################');
      console.log(editButton);
      expect(component.onClickButtons.emit).toHaveBeenCalledWith(
        IKindClick.EDIT
      );
    }
  });

  it('should emit DELETE event when clicking the delete button', () => {
    spyOn(component.onClickButtons, 'emit');

    const deleteButton: HTMLElement = fixture.nativeElement.querySelector(
      'button:nth-child(3)'
    );
    if (deleteButton) {
      deleteButton.click();
      expect(component.onClickButtons.emit).toHaveBeenCalledWith(
        IKindClick.DELETE
      );
    }
  });

  it('should hide edit and delete buttons when isSelectedClientPage is true', () => {
    component.isSelectedClientPage = true;
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector(
      'button:nth-child(3)'
    );
    const deleteButton = fixture.nativeElement.querySelector(
      'button:nth-child(4)'
    );

    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
  });
});
