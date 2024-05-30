import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorizeControlComponent } from './colorize-control.component';

describe('ColorizeControlComponent', () => {
  let component: ColorizeControlComponent;
  let fixture: ComponentFixture<ColorizeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorizeControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorizeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
