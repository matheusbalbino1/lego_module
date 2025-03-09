import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the "outline" class when the outline input is true', () => {
    component.outline = true;
    fixture.detectChanges();

    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('outline')).toBeTrue();
  });

  it('should not apply the "outline" class when the outline input is false', () => {
    component.outline = false;
    fixture.detectChanges();

    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('outline')).toBeFalse();
  });
});
