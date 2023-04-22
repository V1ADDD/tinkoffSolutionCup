import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpendingComponent } from './new-spending.component';

describe('NewSpendingComponent', () => {
  let component: NewSpendingComponent;
  let fixture: ComponentFixture<NewSpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
