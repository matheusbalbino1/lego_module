import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inputChange event when user types', () => {
    spyOn(component.inputChange, 'emit'); // Espiona o evento @Output()

    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputElement.value = 'Test User';
    inputElement.dispatchEvent(new Event('input')); // Simula a digitação no campo

    fixture.detectChanges();

    expect(component.inputChange.emit).toHaveBeenCalledWith('Test User');
  });
});
