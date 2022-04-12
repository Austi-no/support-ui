import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClientUserComponent } from './manage-client-user.component';

describe('ManageClientUserComponent', () => {
  let component: ManageClientUserComponent;
  let fixture: ComponentFixture<ManageClientUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClientUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClientUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
