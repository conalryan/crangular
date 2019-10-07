import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendargridComponent } from './calendargrid.component';

describe('CalendargridComponent', () => {
  let component: CalendargridComponent;
  let fixture: ComponentFixture<CalendargridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendargridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendargridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
