import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddReception } from './add-reception';

describe('AddReception', () => {
  let component: AddReception;
  let fixture: ComponentFixture<AddReception>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReception],
    }).compileComponents();

    fixture = TestBed.createComponent(AddReception);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
