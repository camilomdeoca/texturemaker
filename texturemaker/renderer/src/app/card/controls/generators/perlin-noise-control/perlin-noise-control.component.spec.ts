import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlinNoiseControlComponent } from './perlin-noise-control.component';

describe('PerlinNoiseControlComponent', () => {
  let component: PerlinNoiseControlComponent;
  let fixture: ComponentFixture<PerlinNoiseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerlinNoiseControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerlinNoiseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
