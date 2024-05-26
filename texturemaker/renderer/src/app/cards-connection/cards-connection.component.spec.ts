import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsConnectionComponent } from './cards-connection.component';

describe('CardsConnectionComponent', () => {
  let component: CardsConnectionComponent;
  let fixture: ComponentFixture<CardsConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
