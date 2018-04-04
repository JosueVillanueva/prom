import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewresponsableComponent } from './newresponsable.component';

describe('NewresponsableComponent', () => {
  let component: NewresponsableComponent;
  let fixture: ComponentFixture<NewresponsableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewresponsableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
