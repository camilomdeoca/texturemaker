import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCorrectControlComponent } from './color-correct-control.component';

describe('ColorCorrectControlComponent', () => {
  let component: ColorCorrectControlComponent;
  let fixture: ComponentFixture<ColorCorrectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorCorrectControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorCorrectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
