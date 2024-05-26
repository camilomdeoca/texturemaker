import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorleyNoiseControlComponent } from './worley-noise-control.component';

describe('WorleyNoiseControlComponent', () => {
  let component: WorleyNoiseControlComponent;
  let fixture: ComponentFixture<WorleyNoiseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorleyNoiseControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorleyNoiseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
