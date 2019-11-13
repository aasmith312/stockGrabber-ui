import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorQuoteComponent } from './sector-quote.component';

describe('SectorQuoteComponent', () => {
  let component: SectorQuoteComponent;
  let fixture: ComponentFixture<SectorQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
