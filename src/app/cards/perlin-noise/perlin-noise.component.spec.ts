import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlinNoiseComponent } from './perlin-noise.component';

describe('PerlinNoiseComponent', () => {
  let component: PerlinNoiseComponent;
  let fixture: ComponentFixture<PerlinNoiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerlinNoiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerlinNoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
