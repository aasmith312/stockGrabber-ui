import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateQuoteComponent } from './date-quote.component';

describe('DateQuoteComponent', () => {
  let component: DateQuoteComponent;
  let fixture: ComponentFixture<DateQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
