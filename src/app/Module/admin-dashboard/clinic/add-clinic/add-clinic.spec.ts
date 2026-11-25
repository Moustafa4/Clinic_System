import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClinic } from './add-clinic';

describe('AddClinic', () => {
  let component: AddClinic;
  let fixture: ComponentFixture<AddClinic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClinic],
    }).compileComponents();

    fixture = TestBed.createComponent(AddClinic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
