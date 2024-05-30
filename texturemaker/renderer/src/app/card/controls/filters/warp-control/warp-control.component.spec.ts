import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarpControlComponent } from './warp-control.component';

describe('WarpControlComponent', () => {
  let component: WarpControlComponent;
  let fixture: ComponentFixture<WarpControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarpControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarpControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
