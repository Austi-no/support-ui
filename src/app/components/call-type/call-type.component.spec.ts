import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTypeComponent } from './call-type.component';

describe('CallTypeComponent', () => {
  let component: CallTypeComponent;
  let fixture: ComponentFixture<CallTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
