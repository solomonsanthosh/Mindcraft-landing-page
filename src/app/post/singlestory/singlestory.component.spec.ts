import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglestoryComponent } from './singlestory.component';

describe('SinglestoryComponent', () => {
  let component: SinglestoryComponent;
  let fixture: ComponentFixture<SinglestoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglestoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglestoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
