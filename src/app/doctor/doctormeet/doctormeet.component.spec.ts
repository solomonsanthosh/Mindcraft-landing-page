import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctormeetComponent } from './doctormeet.component';

describe('DoctormeetComponent', () => {
  let component: DoctormeetComponent;
  let fixture: ComponentFixture<DoctormeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctormeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctormeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
