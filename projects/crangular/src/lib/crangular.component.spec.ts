import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrangularComponent } from './crangular.component';

describe('CrangularComponent', () => {
  let component: CrangularComponent;
  let fixture: ComponentFixture<CrangularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrangularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrangularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
