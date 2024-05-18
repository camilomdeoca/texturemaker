import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorleyNoiseComponent } from './worley-noise.component';

describe('WorleyNoiseComponent', () => {
  let component: WorleyNoiseComponent;
  let fixture: ComponentFixture<WorleyNoiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorleyNoiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorleyNoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
